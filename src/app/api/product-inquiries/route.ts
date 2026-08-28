import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendAutomatedWhatsAppNotification } from "@/lib/whatsapp";

function generateInquiryId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomStr = "";
  for (let i = 0; i < 7; i++) {
    randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `inq-${randomStr}`;
}

async function ensureTableExists() {
  try {
    await (prisma as any).$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "product_inquiries" (
        "id" TEXT PRIMARY KEY,
        "productTitle" TEXT NOT NULL,
        "productSlug" TEXT,
        "category" TEXT,
        "contactPerson" TEXT NOT NULL,
        "companyName" TEXT NOT NULL,
        "phoneNumber" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "message" TEXT,
        "status" TEXT NOT NULL DEFAULT 'NEW',
        "assignedTo" TEXT,
        "remarks" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
  } catch (err) {
    console.warn("Table verification warning for product_inquiries:", err);
  }
}

// POST: Create a new Product Inquiry
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      productTitle,
      productSlug,
      category,
      contactPerson,
      companyName,
      phoneNumber,
      email,
      message,
    } = body;

    if (!productTitle || !contactPerson || !companyName || !phoneNumber || !email) {
      return NextResponse.json(
        { error: "Missing required fields (productTitle, contactPerson, companyName, phoneNumber, email)" },
        { status: 400 }
      );
    }

    await ensureTableExists();
    const id = generateInquiryId();

    // 1. Trigger Automated Background WhatsApp Dispatch to Admin Number (919483564777)
    const waDispatchResult = await sendAutomatedWhatsAppNotification({
      productTitle: productTitle.trim(),
      category: category ? category.trim() : undefined,
      contactPerson: contactPerson.trim(),
      companyName: companyName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim(),
      message: message ? message.trim() : undefined,
    });

    const adminPhone = process.env.WHATSAPP_ADMIN_PHONE || "919483564777";
    const waMessage = `*New Product Quotation Request — DFMHUB* ⚡\n\n*Product:* ${productTitle}\n*Category:* ${category || "N/A"}\n*Company:* ${companyName.trim()}\n*Contact Person:* ${contactPerson.trim()}\n*Phone:* ${phoneNumber.trim()}\n*Email:* ${email.trim()}\n${message ? `*Project Details:* ${message.trim()}\n` : ""}\n_Sent directly from DFMHUB Website_`;
    const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodeURIComponent(waMessage)}`;

    let savedRecord: any = null;

    try {
      const sqlResult: any = await (prisma as any).$queryRawUnsafe(
        `INSERT INTO "product_inquiries" ("id", "productTitle", "productSlug", "category", "contactPerson", "companyName", "phoneNumber", "email", "message", "status", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'NEW', NOW(), NOW())
         RETURNING *`,
        id,
        productTitle.trim(),
        productSlug ? productSlug.trim() : null,
        category ? category.trim() : null,
        contactPerson.trim(),
        companyName.trim(),
        phoneNumber.trim(),
        email.trim(),
        message ? message.trim() : null
      );

      savedRecord = Array.isArray(sqlResult) ? sqlResult[0] : sqlResult;
    } catch (sqlErr) {
      // Fallback to Prisma ORM
      savedRecord = await (prisma as any).productInquiry.create({
        data: {
          id,
          productTitle: productTitle.trim(),
          productSlug: productSlug ? productSlug.trim() : null,
          category: category ? category.trim() : null,
          contactPerson: contactPerson.trim(),
          companyName: companyName.trim(),
          phoneNumber: phoneNumber.trim(),
          email: email.trim(),
          message: message ? message.trim() : null,
          status: "NEW",
        },
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: savedRecord,
        whatsappUrl,
        whatsappDispatched: waDispatchResult.sent,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("API /api/product-inquiries POST error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

// GET: Fetch all Product Inquiries
export async function GET() {
  try {
    await ensureTableExists();
    try {
      const sqlResult: any = await (prisma as any).$queryRawUnsafe(
        `SELECT * FROM "product_inquiries" ORDER BY "createdAt" DESC`
      );
      return NextResponse.json({ data: sqlResult || [] }, { status: 200 });
    } catch (sqlErr) {
      const records = await (prisma as any).productInquiry.findMany({
        orderBy: { createdAt: "desc" },
      });
      return NextResponse.json({ data: records }, { status: 200 });
    }
  } catch (error: any) {
    console.error("API /api/product-inquiries GET error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}

// PATCH: Update Product Inquiry status or assignment
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status, assignedTo, remarks } = body;

    if (!id) {
      return NextResponse.json({ error: "Missing required id" }, { status: 400 });
    }

    await ensureTableExists();

    try {
      const setClauses: string[] = ['"updatedAt" = NOW()'];
      const values: any[] = [];
      let paramIdx = 1;

      if (status !== undefined) {
        setClauses.push(`"status" = $${paramIdx++}`);
        values.push(status);
      }
      if (assignedTo !== undefined) {
        setClauses.push(`"assignedTo" = $${paramIdx++}`);
        values.push(assignedTo);
      }
      if (remarks !== undefined) {
        setClauses.push(`"remarks" = $${paramIdx++}`);
        values.push(remarks);
      }

      values.push(id);
      const sqlQuery = `UPDATE "product_inquiries" SET ${setClauses.join(", ")} WHERE "id" = $${paramIdx} RETURNING *`;

      const sqlResult: any = await (prisma as any).$queryRawUnsafe(sqlQuery, ...values);
      const updatedRecord = Array.isArray(sqlResult) ? sqlResult[0] : sqlResult;
      return NextResponse.json({ success: true, data: updatedRecord }, { status: 200 });
    } catch (sqlErr) {
      const updateData: any = {};
      if (status !== undefined) updateData.status = status;
      if (assignedTo !== undefined) updateData.assignedTo = assignedTo;
      if (remarks !== undefined) updateData.remarks = remarks;

      const updatedRecord = await (prisma as any).productInquiry.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json({ success: true, data: updatedRecord }, { status: 200 });
    }
  } catch (error: any) {
    console.error("API /api/product-inquiries PATCH error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
