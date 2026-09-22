import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

// GET /api/admin/seo/[id] - Get single record
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const record = await prisma.seoMetadata.findUnique({
      where: { id },
    });

    if (!record) {
      return NextResponse.json({ error: "SEO Record not found" }, { status: 404 });
    }

    return NextResponse.json(record);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch record" }, { status: 500 });
  }
}

// PUT /api/admin/seo/[id] - Update record
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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

    const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : undefined;

    const updatedRecord = await prisma.seoMetadata.update({
      where: { id },
      data: {
        ...(normalizedPath && { path: normalizedPath }),
        ...(title !== undefined && { title }),
        description: description ?? null,
        keywords: keywords ?? null,
        ogTitle: ogTitle ?? null,
        ogDescription: ogDescription ?? null,
        ogImage: ogImage ?? null,
        canonicalUrl: canonicalUrl ?? null,
        noIndex: Boolean(noIndex),
        structuredData: structuredData ?? null,
      },
    });

    try {
      if (normalizedPath) revalidatePath(normalizedPath);
      if (updatedRecord.path && updatedRecord.path !== normalizedPath) {
        revalidatePath(updatedRecord.path);
      }
    } catch (e) {
      console.warn("Failed to revalidate path on update:", e);
    }

    return NextResponse.json(updatedRecord);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to update record" }, { status: 500 });
  }
}

// DELETE /api/admin/seo/[id] - Delete record
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const existing = await prisma.seoMetadata.findUnique({
      where: { id },
      select: { path: true },
    });

    await prisma.seoMetadata.delete({
      where: { id },
    });

    if (existing?.path) {
      try {
        revalidatePath(existing.path);
      } catch (e) {
        console.warn("Failed to revalidate path on delete:", existing.path, e);
      }
    }

    return NextResponse.json({ success: true, message: "SEO Record deleted" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to delete record" }, { status: 500 });
  }
}
