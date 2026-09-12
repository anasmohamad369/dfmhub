import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function parseDevice(userAgent: string | undefined): "mobile" | "tablet" | "desktop" {
  if (!userAgent) return "desktop";
  const ua = userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return "mobile";
  }
  return "desktop";
}

const BLOCKED_EXTENSIONS = /\.(php|xml|asp|aspx|jsp|cgi|env|txt|bak|sql|action|do|ashx|json)$/i;

const SPAM_PATTERNS = [
  "fuck",
  "porn",
  "xxx",
  "casino",
  "poker",
  "viagra",
  "cialis",
  "essay",
  "term-paper",
  "research-paper",
  "cricket",
  "scorecard",
  "jarvis",
  "wp-admin",
  "wp-content",
  "wp-includes",
  "xmlrpc",
  "neighbors-wife",
  "injection-molding",
];

const BOT_USER_AGENTS = [
  "bot",
  "spider",
  "crawler",
  "scraper",
  "headless",
  "puppeteer",
  "selenium",
  "curl",
  "wget",
  "python",
  "postman",
  "go-http-client",
  "semrush",
  "ahrefs",
  "bytespider",
  "yandex",
  "baidu",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path, title, referrer, userAgent } = body;

    if (!path || typeof path !== "string") {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    const lowerPath = cleanPath.toLowerCase();

    // 1. Filter out excessive lengths
    if (cleanPath.length > 250) {
      return NextResponse.json({ success: true, ignored: "Path too long" });
    }

    // 2. Reject suspicious extensions
    if (BLOCKED_EXTENSIONS.test(cleanPath)) {
      return NextResponse.json({ success: true, ignored: "Blocked extension" });
    }

    // 3. Reject known spam keywords
    if (SPAM_PATTERNS.some((pattern) => lowerPath.includes(pattern))) {
      return NextResponse.json({ success: true, ignored: "Spam keyword detected" });
    }

    // 4. Reject 404 titles
    if (title && typeof title === "string") {
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes("404") || lowerTitle.includes("not found")) {
        return NextResponse.json({ success: true, ignored: "404 page view" });
      }
    }

    // 5. Reject automated crawler / scraper user agents
    if (userAgent && typeof userAgent === "string") {
      const lowerUA = userAgent.toLowerCase();
      if (BOT_USER_AGENTS.some((bot) => lowerUA.includes(bot))) {
        return NextResponse.json({ success: true, ignored: "Bot user agent ignored" });
      }
    }

    const device = parseDevice(userAgent);

    const pageView = await prisma.pageView.create({
      data: {
        path: cleanPath,
        title: title || cleanPath,
        referrer: referrer || "Direct",
        userAgent: userAgent || null,
        device: device,
      },
    });

    return NextResponse.json({ success: true, id: pageView.id });
  } catch (error: any) {
    console.error("POST /api/analytics/track error:", error);
    return NextResponse.json({ error: error.message || "Failed to record page view" }, { status: 500 });
  }
}
