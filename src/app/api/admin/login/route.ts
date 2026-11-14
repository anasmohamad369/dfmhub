import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const envUser = process.env.ADMIN_USERNAME;
    const envPass = process.env.ADMIN_PASSWORD;

    // No fallback credentials: login is disabled until both are set in the environment.
    if (!envUser || !envPass) {
      console.error("[Admin Login] ADMIN_USERNAME / ADMIN_PASSWORD are not set");
      return NextResponse.json(
        { success: false, error: "Admin login is not configured" },
        { status: 503 }
      );
    }

    const isUserValid =
      typeof username === "string" &&
      username.trim().toLowerCase() === envUser.toLowerCase();

    const isPassValid = typeof password === "string" && password === envPass;

    if (isUserValid && isPassValid) {
      return NextResponse.json({
        success: true,
        message: "Admin authentication successful",
        token: `dfm_admin_token_${Date.now()}`,
        user: {
          username: username.trim(),
          role: "ADMIN",
        },
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid Admin username or password" },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Authentication failed server error" },
      { status: 500 }
    );
  }
}
