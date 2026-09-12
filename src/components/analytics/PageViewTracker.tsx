"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

// Block tracking for suspicious extensions, bot probes, and known spam patterns
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
];

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Skip tracking for admin and API routes to avoid skewing public analytics
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || pathname.startsWith("/api")) {
      return;
    }

    // Skip tracking junk extensions (e.g. .php, .xml, .asp)
    if (BLOCKED_EXTENSIONS.test(pathname)) {
      return;
    }

    // Skip tracking known spam keyword paths
    const lowerPath = pathname.toLowerCase();
    if (SPAM_PATTERNS.some((pattern) => lowerPath.includes(pattern))) {
      return;
    }

    const currentUrl = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Deduplicate rapid re-renders on the same URL
    if (lastTracked.current === currentUrl) {
      return;
    }
    lastTracked.current = currentUrl;

    const trackView = async () => {
      try {
        const title = typeof document !== "undefined" ? document.title : "";

        // Do NOT track 404 pages or pages flagged as noindex
        if (title.toLowerCase().includes("404") || title.toLowerCase().includes("not found")) {
          return;
        }

        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (robotsMeta && robotsMeta.getAttribute("content")?.toLowerCase().includes("noindex")) {
          return;
        }

        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            title: title,
            referrer: typeof document !== "undefined" ? document.referrer : "",
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          }),
        });
      } catch (err) {
        // Silently ignore tracking errors to not impact user experience
      }
    };

    // Delay slightly to allow document.title and route render to finalize
    const timer = setTimeout(trackView, 500);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
