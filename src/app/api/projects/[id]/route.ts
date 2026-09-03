import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    let record: any = null;

    // Strategy 1: Direct SQL Execution
    try {
      const sqlResult: any = await (prisma as any).$queryRawUnsafe(
        `SELECT * FROM "project_details" WHERE "id" = $1 LIMIT 1`,
        id
      );
      if (Array.isArray(sqlResult) && sqlResult.length > 0) {
        record = sqlResult[0];
      }
    } catch (sqlErr) {
      console.error("Single project SQL fetch error:", sqlErr);
    }

    // Strategy 2: Prisma Client Fallback
    if (!record) {
      try {
        record = await (prisma as any).projectDetail.findUnique({
          where: { id },
        });
      } catch (prismaErr) {
        console.error("Prisma single project fetch error:", prismaErr);
      }
    }

    if (!record) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Internal server error", message: error.message },
      { status: 500 }
    );
  }
}
