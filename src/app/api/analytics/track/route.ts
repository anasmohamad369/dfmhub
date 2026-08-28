import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseDevice(userAgent: string | undefined): "mobile" | "tablet" | "desktop" {
  if (!userAgent) return "desktop";
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return "mobile";
  }
  return "desktop";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, title, referrer, userAgent } = body;

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const device = parseDevice(userAgent);

    const pageView = await prisma.pageView.create({
      data: {
        path: path.startsWith("/") ? path : `/${path}`,
        title: title || path,
        referrer: referrer || "Direct",
        userAgent: userAgent || null,
        device: device,
      },
    });

    return NextResponse.json({ success: true, id: pageView.id });
  } catch (error: any) {
    console.error("POST /api/analytics/track error:", error);
    return NextResponse.json({ error: error.message || "Failed to record page view" }, { status: 500 });
  }
}
