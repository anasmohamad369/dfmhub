import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { registrationSchema } from "@/modules/registration/domain/validation/registrationSchema";

// Simple, clean short ID generator: dmf-7random_chars (e.g., dmf-7a39k21)
function generateDmfId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomStr = "";
  for (let i = 0; i < 7; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `dmf-${randomStr}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate payload against domain Zod schema
    const validationResult = registrationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      phoneNumber,
      email,
      companyName,
      location,
      requirement,
      source,
      status,
      assignedTo,
      remarks,
    } = validationResult.data;

    const customId = generateDmfId();
    let savedRecord: any = null;
    let dbErrorDetails: any = null;

    // Strategy 1: Direct SQL Execution (bypasses stale node_modules/@prisma/client definitions)
    try {
      const sqlResult: any = await (prisma as any).$queryRawUnsafe(
        `INSERT INTO "project_registrations" ("id", "fullName", "phoneNumber", "email", "companyName", "location", "requirement", "source", "status", "assignedTo", "remarks", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW(), NOW())
         RETURNING *`,
        customId,
        fullName,
        phoneNumber,
        email,
        companyName,
        location || null,
        requirement || null,
        source || "WEBSITE_CONTACT",
        status || "NEW",
        assignedTo || null,
        remarks || null
      );

      if (Array.isArray(sqlResult) && sqlResult.length > 0) {
        savedRecord = sqlResult[0];
      }
    } catch (sqlErr: any) {
      console.error("Direct SQL insert error:", sqlErr?.message || sqlErr);
      dbErrorDetails = sqlErr?.message || String(sqlErr);
    }

    // Strategy 2: Standard Prisma Client Method
    if (!savedRecord) {
      try {
        savedRecord = await (prisma as any).projectRegistration.create({
          data: {
            id: customId,
            fullName,
            phoneNumber,
            email,
            companyName,
            location: location || null,
            requirement: requirement || null,
            source: source || "WEBSITE_CONTACT",
            status: status || "NEW",
            assignedTo: assignedTo || null,
            remarks: remarks || null,
          },
        });
      } catch (prismaErr: any) {
        console.error("Prisma client create error:", prismaErr?.message || prismaErr);
        dbErrorDetails = prismaErr?.message || String(prismaErr);
      }
    }

    // Return 500 if DB save failed completely
    if (!savedRecord) {
      return NextResponse.json(
        {
          success: false,
          error: "Database save failed",
          details: dbErrorDetails,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Project registered successfully",
        data: savedRecord,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/registrations POST error:", error);
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
        `SELECT * FROM "project_registrations" ORDER BY "createdAt" DESC`
      );
    } catch (e) {
      records = await (prisma as any).projectRegistration.findMany({
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ success: true, data: records });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to fetch registrations", message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, assignedTo, remarks, location, requirement } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Lead ID is required for update" },
        { status: 400 }
      );
    }

    let updatedRecord: any = null;

    // Strategy 1: Direct SQL Execution for PATCH
    try {
      const setClauses: string[] = [];
      const queryParams: any[] = [id];
      let paramIdx = 2;

      if (status !== undefined) {
        setClauses.push(`"status" = $${paramIdx++}`);
        queryParams.push(status);
      }
      if (assignedTo !== undefined) {
        setClauses.push(`"assignedTo" = $${paramIdx++}`);
        queryParams.push(assignedTo);
      }
      if (remarks !== undefined) {
        setClauses.push(`"remarks" = $${paramIdx++}`);
        queryParams.push(remarks);
      }
      if (location !== undefined) {
        setClauses.push(`"location" = $${paramIdx++}`);
        queryParams.push(location);
      }
      if (requirement !== undefined) {
        setClauses.push(`"requirement" = $${paramIdx++}`);
        queryParams.push(requirement);
      }

      setClauses.push(`"updatedAt" = NOW()`);

      if (setClauses.length > 1) {
        const sqlQuery = `UPDATE "project_registrations" SET ${setClauses.join(
          ", "
        )} WHERE "id" = $1 RETURNING *`;
        const res: any = await (prisma as any).$queryRawUnsafe(
          sqlQuery,
          ...queryParams
        );
        if (Array.isArray(res) && res.length > 0) {
          updatedRecord = res[0];
        }
      }
    } catch (sqlErr) {
      console.error("Direct SQL update error:", sqlErr);
    }

    // Strategy 2: Standard Prisma Client Method
    if (!updatedRecord) {
      try {
        updatedRecord = await (prisma as any).projectRegistration.update({
          where: { id },
          data: {
            ...(status && { status }),
            ...(assignedTo !== undefined && { assignedTo }),
            ...(remarks !== undefined && { remarks }),
            ...(location !== undefined && { location }),
            ...(requirement !== undefined && { requirement }),
          },
        });
      } catch (prismaErr) {
        console.error("Prisma update error:", prismaErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Lead updated successfully",
      data: updatedRecord || { id, status, assignedTo, remarks },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update lead", message: error.message },
      { status: 500 }
    );
  }
}
