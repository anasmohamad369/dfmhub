import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get("timeframe") || "all"; // "today", "7d", "30d", "all"

    let startDate: Date | undefined;
    const now = new Date();

    if (timeframe === "today") {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (timeframe === "7d") {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (timeframe === "30d") {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const whereCondition = startDate ? { createdAt: { gte: startDate } } : {};

    // 1. Total Page Views
    const totalViews = await prisma.pageView.count({
      where: whereCondition,
    });

    // 2. Total Inquiries & Registrations
    const totalInquiries = await prisma.productInquiry.count();
    const totalRegistrations = await prisma.projectRegistration.count();

    // 3. Page Views grouped by path
    const pageBreakdownRaw = await prisma.pageView.groupBy({
      by: ["path"],
      where: whereCondition,
      _count: { path: true },
      orderBy: { _count: { path: "desc" } },
      take: 20,
    });

    // Fetch representative titles for paths
    const pageBreakdown = await Promise.all(
      pageBreakdownRaw.map(async (item) => {
        const sampleRecord = await prisma.pageView.findFirst({
          where: { path: item.path },
          select: { title: true },
          orderBy: { createdAt: "desc" },
        });

        const count = item._count.path;
        const percentage = totalViews > 0 ? Math.round((count / totalViews) * 100) : 0;

        return {
          path: item.path,
          title: sampleRecord?.title || item.path,
          views: count,
          percentage: percentage,
        };
      })
    );

    // 4. Device Distribution
    const devicesRaw = await prisma.pageView.groupBy({
      by: ["device"],
      where: whereCondition,
      _count: { device: true },
    });

    const deviceStats = {
      desktop: 0,
      mobile: 0,
      tablet: 0,
    };

    devicesRaw.forEach((d) => {
      if (d.device === "mobile") deviceStats.mobile = d._count.device;
      else if (d.device === "tablet") deviceStats.tablet = d._count.device;
      else deviceStats.desktop = d._count.device;
    });

    // 5. Referrer Breakdown
    const referrersRaw = await prisma.pageView.groupBy({
      by: ["referrer"],
      where: whereCondition,
      _count: { referrer: true },
      orderBy: { _count: { referrer: "desc" } },
      take: 8,
    });

    const referrers = referrersRaw.map((r) => {
      let refName = r.referrer || "Direct / Internal";
      if (refName.includes("google")) refName = "Google Search";
      else if (refName.includes("bing")) refName = "Bing Search";
      else if (refName.includes("linkedin")) refName = "LinkedIn";
      else if (refName.includes("whatsapp")) refName = "WhatsApp";
      else if (refName === "" || refName === "Direct") refName = "Direct / Bookmark";

      return {
        source: refName,
        count: r._count.referrer,
      };
    });

    // 6. Recent 20 Real-time Hits
    const recentActivity = await prisma.pageView.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        path: true,
        title: true,
        device: true,
        createdAt: true,
        referrer: true,
      },
    });

    return NextResponse.json({
      summary: {
        totalViews,
        totalInquiries,
        totalRegistrations,
        timeframe,
      },
      pageBreakdown,
      deviceStats,
      referrers,
      recentActivity,
    });
  } catch (error: any) {
    console.error("GET /api/admin/analytics error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch analytics" }, { status: 500 });
  }
}
