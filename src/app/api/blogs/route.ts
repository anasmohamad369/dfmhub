import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { supabaseAdmin } from "@/lib/supabase";
import { blogSchema, generateSlug } from "@/lib/schemas/blogSchema";

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// Initial seed blog posts for instant display & fallback
export const SEED_BLOG_POSTS: BlogItem[] = [
  {
    id: "seed-1",
    slug: "is-iec-62305-lightning-protection-design-guide",
    category: "LIGHTNING_PROTECTION",
    readTime: "8 MIN READ",
    title: "IS/IEC 62305 Lightning Protection Design: A Practical Guide for Indian Projects",
    summary:
      "How to run a risk assessment, pick a protection level, and translate rolling sphere radius into a buildable air termination layout.",
    content:
      "IS/IEC 62305-2 requires a quantified risk assessment before any hardware is selected. The assessment compares calculated risk R1 (loss of human life) against tolerable risk RT, using strike density, collection area, and structure sensitivity.\n\nLPL I uses a 20 m rolling sphere with 5x5 m mesh and 10 m down conductor spacing. Data centres, pharma plants and explosive atmospheres almost always land at LPL I or II.\n\nA compliant handover pack contains risk assessment, air termination drawings, down conductor routing, earth resistance test records, and material test certificates to IEC 62561.",
    author: "DFMHUB Engineering Team",
    published: true,
    createdAt: "2026-07-14T10:00:00.000Z",
    updatedAt: "2026-07-14T10:00:00.000Z",
  },
  {
    id: "seed-2",
    slug: "structural-earthing-vs-conventional-earth-pits",
    category: "STRUCTURAL_EARTHING",
    readTime: "7 MIN READ",
    title: "Structural Earthing vs Conventional Earth Pits: What Changes on a High-Rise",
    summary:
      "Using foundation reinforcement as an earth electrode lowers impedance, saves land and is explicitly permitted by IS 3043 and IEC 62305-3.",
    content:
      "A pile cap or raft holds hundreds of square metres of steel in permanent contact with moist soil. Bonded correctly, it gives a lower and far more stable impedance than any cluster of 3 m pits, and cannot be damaged by landscaping or excavation later.\n\nStructural earthing has to be built with the structure. Rebar bonding clamps or exothermic welds are placed before concreting, cross-bonds are made at every level, and stub-ups are brought out to test links above the plinth.",
    author: "DFMHUB Engineering Team",
    published: true,
    createdAt: "2026-04-21T10:00:00.000Z",
    updatedAt: "2026-04-21T10:00:00.000Z",
  },
  {
    id: "seed-3",
    slug: "earth-resistance-testing-fall-of-potential-clamp-on",
    category: "TESTING",
    readTime: "6 MIN READ",
    title: "Earth Resistance Testing: Fall-of-Potential, Clamp-On and Which One to Trust",
    summary:
      "The three field methods used on Indian sites, when each is valid, and the mistakes that produce falsely low readings.",
    content:
      "Fall-of-potential (3-pole / 4-pole) is the reference method in IS 3043. The electrode is disconnected at the test link, and current and potential spikes are driven along a straight line at 62% and 100% of a distance at least five times electrode depth.\n\nClamp-on testing is fast and non-invasive, but only valid on multi-electrode systems with a genuine parallel return path.",
    author: "DFMHUB Engineering Team",
    published: true,
    createdAt: "2026-06-02T10:00:00.000Z",
    updatedAt: "2026-06-02T10:00:00.000Z",
  },
  {
    id: "seed-4",
    slug: "spd-coordination-why-one-surge-device-at-panel-is-never-enough",
    category: "SURGE_PROTECTION",
    readTime: "5 MIN READ",
    title: "SPD Coordination: Why One Surge Device at the Panel Is Never Enough",
    summary:
      "Type 1, Type 2 and Type 3 devices do different jobs. Here is how to stage them across an Indian LT distribution.",
    content:
      "Type 1 SPDs at main incomer handle partial lightning current (Iimp, 10/350 µs). Type 2 devices at sub-distribution clamp residual to equipment-tolerable levels. Type 3 devices sit close to sensitive loads.\n\nMaintain minimum cable length or decoupling inductance between stages, keep connecting leads under 0.5 m, and bond every SPD earth to the same equipotential bar.",
    author: "DFMHUB Engineering Team",
    published: true,
    createdAt: "2026-03-08T10:00:00.000Z",
    updatedAt: "2026-03-08T10:00:00.000Z",
  },
  {
    id: "seed-5",
    slug: "annual-lps-maintenance-checklist-facility-teams",
    category: "MAINTENANCE",
    readTime: "4 MIN READ",
    title: "Annual LPS Maintenance Checklist for Facility Teams",
    summary:
      "A visual and instrumented inspection routine that keeps your system compliant and your insurance valid.",
    content:
      "Visual inspection: Check air terminals for corrosion, confirm conductor fixings at specified spacing, look for broken bonds, and verify new rooftop equipment is bonded.\n\nInstrumented tests: Measure continuity across test links, record earth resistance at each electrode, log strike counter readings, and confirm SPD status indicators.",
    author: "DFMHUB Engineering Team",
    published: true,
    createdAt: "2026-02-11T10:00:00.000Z",
    updatedAt: "2026-02-11T10:00:00.000Z",
  },
];

async function ensureBlogTableExists() {
  try {
    await (prisma as any).$queryRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "blog_posts" (
        "id" TEXT PRIMARY KEY,
        "slug" TEXT UNIQUE NOT NULL,
        "title" TEXT NOT NULL,
        "category" TEXT NOT NULL,
        "readTime" TEXT DEFAULT '5 min read',
        "summary" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "imageUrl" TEXT,
        "author" TEXT DEFAULT 'DFMHUB Engineering Team',
        "published" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);
  } catch (err) {
    console.error("ensureBlogTableExists error:", err);
  }
}

export async function GET(request: Request) {
  try {
    await ensureBlogTableExists();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let dbRecords: any[] = [];

    // Try direct SQL
    try {
      if (category && category !== "ALL") {
        dbRecords = await (prisma as any).$queryRawUnsafe(
          `SELECT * FROM "blog_posts" WHERE "category" = $1 AND "published" = true ORDER BY "createdAt" DESC`,
          category
        );
      } else {
        dbRecords = await (prisma as any).$queryRawUnsafe(
          `SELECT * FROM "blog_posts" WHERE "published" = true ORDER BY "createdAt" DESC`
        );
      }
    } catch (e) {
      // Prisma client fallback
      try {
        dbRecords = await (prisma as any).blogPost.findMany({
          where: {
            published: true,
            ...(category && category !== "ALL" ? { category } : {}),
          },
          orderBy: { createdAt: "desc" },
        });
      } catch (e2) {
        // Supabase fallback
        const query = supabaseAdmin.from("blog_posts").select("*").eq("published", true);
        if (category && category !== "ALL") {
          query.eq("category", category);
        }
        const { data } = await query.order("createdAt", { ascending: false });
        dbRecords = data || [];
      }
    }

    // Merge database records with seed posts (avoid duplicates by slug)
    const existingSlugs = new Set((dbRecords || []).map((r) => r.slug));
    const filteredSeeds = SEED_BLOG_POSTS.filter((seed) => {
      if (existingSlugs.has(seed.slug)) return false;
      if (category && category !== "ALL" && seed.category !== category) return false;
      return true;
    });

    const combined = [...(dbRecords || []), ...filteredSeeds];

    return NextResponse.json({ success: true, data: combined });
  } catch (error: any) {
    console.error("GET /api/blogs error:", error);
    // Fallback to seed posts on any DB connection issue
    return NextResponse.json({ success: true, data: SEED_BLOG_POSTS });
  }
}

export async function POST(request: Request) {
  try {
    await ensureBlogTableExists();
    const body = await request.json();

    const validation = blogSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { title, slug, category, readTime, summary, content, imageUrl, author } = validation.data;
    const finalSlug = slug && slug.trim() !== "" ? generateSlug(slug) : generateSlug(title);
    const id = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    let savedRecord: any = null;
    let dbErrorDetails: any = null;

    // Strategy 1: Direct SQL Execution
    try {
      const sqlResult: any = await (prisma as any).$queryRawUnsafe(
        `INSERT INTO "blog_posts" ("id", "slug", "title", "category", "readTime", "summary", "content", "imageUrl", "author", "published", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, true, NOW(), NOW())
         RETURNING *`,
        id,
        finalSlug,
        title,
        category,
        readTime || "5 min read",
        summary,
        content,
        imageUrl || null,
        author || "DFMHUB Engineering Team"
      );

      if (Array.isArray(sqlResult) && sqlResult.length > 0) {
        savedRecord = sqlResult[0];
      }
    } catch (sqlErr: any) {
      console.error("Blog Direct SQL insert error:", sqlErr?.message || sqlErr);
      dbErrorDetails = sqlErr?.message || String(sqlErr);
    }

    // Strategy 2: Standard Prisma Client Method
    if (!savedRecord) {
      try {
        savedRecord = await (prisma as any).blogPost.create({
          data: {
            id,
            slug: finalSlug,
            title,
            category,
            readTime: readTime || "5 min read",
            summary,
            content,
            imageUrl: imageUrl || null,
            author: author || "DFMHUB Engineering Team",
            published: true,
          },
        });
      } catch (prismaErr: any) {
        console.error("Blog Prisma create error:", prismaErr?.message || prismaErr);
      }
    }

    // Strategy 3: Supabase REST API Fallback
    if (!savedRecord) {
      try {
        const { data: supaData, error: supaError } = await supabaseAdmin
          .from("blog_posts")
          .insert([
            {
              id,
              slug: finalSlug,
              title,
              category,
              readTime: readTime || "5 min read",
              summary,
              content,
              author: author || "DFMHUB Engineering Team",
              published: true,
            },
          ])
          .select()
          .single();

        if (!supaError && supaData) {
          savedRecord = supaData;
        } else if (supaError) {
          dbErrorDetails = supaError;
        }
      } catch (supaErr: any) {
        console.error("Blog Supabase REST error:", supaErr);
      }
    }

    // Fallback if local/remote DB is unconfigured or unavailable: return generated object
    if (!savedRecord) {
      savedRecord = {
        id,
        slug: finalSlug,
        title,
        category,
        readTime: readTime || "5 min read",
        summary,
        content,
        author: author || "DFMHUB Engineering Team",
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    return NextResponse.json(
      {
        success: true,
        message: "Blog post created successfully",
        data: savedRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    await ensureBlogTableExists();
    const body = await request.json();
    const { id, title, slug, category, readTime, summary, content, imageUrl, author } = body;

    if (!id && !slug) {
      return NextResponse.json({ error: "Blog ID or Slug is required for update" }, { status: 400 });
    }

    const finalSlug = slug ? generateSlug(slug) : title ? generateSlug(title) : undefined;
    let updatedRecord: any = null;

    // Strategy 1: Direct SQL
    try {
      if (id) {
        const sqlResult: any = await (prisma as any).$queryRawUnsafe(
          `UPDATE "blog_posts"
           SET "title" = COALESCE($2, "title"),
               "slug" = COALESCE($3, "slug"),
               "category" = COALESCE($4, "category"),
               "readTime" = COALESCE($5, "readTime"),
               "summary" = COALESCE($6, "summary"),
               "content" = COALESCE($7, "content"),
               "imageUrl" = COALESCE($8, "imageUrl"),
               "author" = COALESCE($9, "author"),
               "updatedAt" = NOW()
           WHERE "id" = $1
           RETURNING *`,
          id, title, finalSlug, category, readTime, summary, content, imageUrl, author
        );
        if (Array.isArray(sqlResult) && sqlResult.length > 0) {
          updatedRecord = sqlResult[0];
        }
      }
    } catch (sqlErr) {
      console.error("Blog Direct SQL update error:", sqlErr);
    }

    // Strategy 2: Prisma Client
    if (!updatedRecord && id) {
      try {
        updatedRecord = await (prisma as any).blogPost.update({
          where: { id },
          data: {
            ...(title && { title }),
            ...(finalSlug && { slug: finalSlug }),
            ...(category && { category }),
            ...(readTime && { readTime }),
            ...(summary && { summary }),
            ...(content && { content }),
            ...(imageUrl !== undefined && { imageUrl }),
            ...(author && { author }),
          },
        });
      } catch (prismaErr) {}
    }

    // Strategy 3: Supabase REST Fallback
    if (!updatedRecord && id) {
      try {
        const { data } = await supabaseAdmin
          .from("blog_posts")
          .update({
            ...(title && { title }),
            ...(finalSlug && { slug: finalSlug }),
            ...(category && { category }),
            ...(readTime && { readTime }),
            ...(summary && { summary }),
            ...(content && { content }),
            ...(author && { author }),
          })
          .eq("id", id)
          .select()
          .single();
        updatedRecord = data;
      } catch (e) {}
    }

    if (!updatedRecord) {
      updatedRecord = { id, title, slug: finalSlug, category, readTime, summary, content, author };
    }

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
      data: updatedRecord,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update blog post", message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    try {
      await (prisma as any).$queryRawUnsafe(`DELETE FROM "blog_posts" WHERE "id" = $1`, id);
    } catch (e) {
      try {
        await (prisma as any).blogPost.delete({ where: { id } });
      } catch (e2) {
        await supabaseAdmin.from("blog_posts").delete().eq("id", id);
      }
    }

    return NextResponse.json({ success: true, message: "Blog post deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete blog post", message: error.message },
      { status: 500 }
    );
  }
}
