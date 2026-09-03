import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function generatePrjId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomStr = "";
  for (let i = 0; i < 7; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `prj-${randomStr}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      registrationId,
      userFullName,
      userPhone,
      userEmail,
      siteName,
      location,
      occupancy,
      dimensions,
      soilType,
      climateZone,
      avgResistance,
      targetResistance,
      checklistScore,
      lplClass,
      riskR1,
    } = body;

    const customId = generatePrjId();
    let savedRecord: any = null;

    // Strategy 1: Direct SQL Execution into project_details
    try {
      const sqlResult: any = await (prisma as any).$queryRawUnsafe(
        `INSERT INTO "project_details" ("id", "registrationId", "userFullName", "userPhone", "userEmail", "siteName", "location", "occupancy", "dimensions", "soilType", "climateZone", "avgResistance", "targetResistance", "checklistScore", "lplClass", "riskR1", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
         RETURNING *`,
        customId,
        registrationId || null,
        userFullName || "Guest User",
        userPhone || "N/A",
        userEmail || "N/A",
        siteName || "Unnamed Project",
        location || "Unspecified Location",
        occupancy || "General",
        dimensions || "—",
        soilType || "Standard",
        climateZone || "Standard",
        avgResistance || "—",
        targetResistance || "—",
        checklistScore || "—",
        lplClass || "Class IV",
        riskR1 || "—"
      );

      if (Array.isArray(sqlResult) && sqlResult.length > 0) {
        savedRecord = sqlResult[0];
      }
    } catch (sqlErr: any) {
      console.error("Project SQL insert error:", sqlErr);
    }

    // Strategy 2: Prisma Client Fallback
    if (!savedRecord) {
      try {
        savedRecord = await (prisma as any).projectDetail.create({
          data: {
            id: customId,
            registrationId: registrationId || null,
            userFullName: userFullName || "Guest User",
            userPhone: userPhone || "N/A",
            userEmail: userEmail || "N/A",
            siteName: siteName || "Unnamed Project",
            location: location || "Unspecified Location",
            occupancy: occupancy || "General",
            dimensions: dimensions || "—",
            soilType: soilType || "Standard",
            climateZone: climateZone || "Standard",
            avgResistance: avgResistance || "—",
            targetResistance: targetResistance || "—",
            checklistScore: checklistScore || "—",
            lplClass: lplClass || "Class IV",
            riskR1: riskR1 || "—",
          },
        });
      } catch (prismaErr: any) {
        console.error("Prisma client insert error:", prismaErr);
      }
    }

    if (!savedRecord) {
      return NextResponse.json(
        { success: false, error: "Failed to store project details in database" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project details saved successfully",
        data: savedRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/projects POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let records: any = [];
    try {
      records = await (prisma as any).$queryRawUnsafe(
        `SELECT * FROM "project_details" ORDER BY "createdAt" DESC`
      );
    } catch (e) {
      records = await (prisma as any).projectDetail.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ success: true, data: records });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch project details", message: error.message },
      { status: 500 }
    );
  }
}
