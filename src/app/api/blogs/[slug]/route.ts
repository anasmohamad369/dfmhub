import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SEED_BLOG_POSTS } from "../route";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Slug is required" }, { status: 400 });
    }

    let post: any = null;

    // Strategy 1: Direct SQL
    try {
      const dbResult: any = await (prisma as any).$queryRawUnsafe(
        `SELECT * FROM "blog_posts" WHERE "slug" = $1 LIMIT 1`,
        slug
      );
      if (Array.isArray(dbResult) && dbResult.length > 0) {
        post = dbResult[0];
      }
    } catch (e) {
      // Strategy 2: Prisma Client
      try {
        post = await (prisma as any).blogPost.findUnique({
          where: { slug },
        });
      } catch (e2) {
        console.error("Prisma blog fetch error:", e2);
      }
    }

    // Strategy 3: Fallback to seed posts
    if (!post) {
      post = SEED_BLOG_POSTS.find((seed) => seed.slug === slug);
    }

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error: any) {
    console.error("GET /api/blogs/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog post", message: error.message },
      { status: 500 }
    );
  }
}
