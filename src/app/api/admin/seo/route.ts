import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/seo - List all SEO metadata records or query by path
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path");

    if (path) {
      const seoRecord = await prisma.seoMetadata.findUnique({
        where: { path },
      });
      return NextResponse.json(seoRecord || null);
    }

    const allRecords = await prisma.seoMetadata.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json(allRecords);
  } catch (error: any) {
    console.error("GET /api/admin/seo error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch SEO metadata" }, { status: 500 });
  }
}

// POST /api/admin/seo - Create or Upsert SEO metadata record
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      path,
      title,
      description,
      keywords,
      ogTitle,
      ogDescription,
      ogImage,
      canonicalUrl,
      noIndex,
      structuredData,
    } = body;

    if (!path || !title) {
      return NextResponse.json({ error: "Page route path and title are required" }, { status: 400 });
    }

    // Normalize path to ensure leading slash
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    const upsertedRecord = await prisma.seoMetadata.upsert({
      where: { path: normalizedPath },
      update: {
        title,
        description: description || null,
        keywords: keywords || null,
        ogTitle: ogTitle || null,
        ogDescription: ogDescription || null,
        ogImage: ogImage || null,
        canonicalUrl: canonicalUrl || null,
        noIndex: Boolean(noIndex),
        structuredData: structuredData || null,
      },
      create: {
        path: normalizedPath,
        title,
        description: description || null,
        keywords: keywords || null,
        ogTitle: ogTitle || null,
        ogDescription: ogDescription || null,
        ogImage: ogImage || null,
        canonicalUrl: canonicalUrl || null,
        noIndex: Boolean(noIndex),
        structuredData: structuredData || null,
      },
    });

    return NextResponse.json(upsertedRecord);
  } catch (error: any) {
    console.error("POST /api/admin/seo error:", error);
    return NextResponse.json({ error: error.message || "Failed to save SEO metadata" }, { status: 500 });
  }
}
