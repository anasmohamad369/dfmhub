import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

const UPLOAD_DIR =
  process.env.UPLOAD_DIR ||
  path.join(process.cwd(), "data", "uploads");

const EXT_TO_CONTENT_TYPE: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;

    // Prevent path traversal — use only the basename
    const safeName = path.basename(filename);
    if (!safeName || safeName !== filename || safeName.includes("..")) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    // Validate extension
    const ext = path.extname(safeName).toLowerCase();
    const contentType = EXT_TO_CONTENT_TYPE[ext];
    if (!contentType) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    const filePath = path.join(/* turbopackIgnore: true */ UPLOAD_DIR, safeName);

    // Verify the resolved path is still within UPLOAD_DIR
    const resolvedPath = path.resolve(/* turbopackIgnore: true */ filePath);
    const resolvedUploadDir = path.resolve(/* turbopackIgnore: true */ UPLOAD_DIR);
    if (!resolvedPath.startsWith(resolvedUploadDir + path.sep) && resolvedPath !== resolvedUploadDir) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    // Check file exists
    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = await fs.readFile(/* turbopackIgnore: true */ filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("File serving error:", error);
    return NextResponse.json(
      { error: "Failed to serve file" },
      { status: 500 }
    );
  }
}
