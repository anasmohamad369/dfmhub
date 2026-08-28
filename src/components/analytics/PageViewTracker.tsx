"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    // Skip tracking for admin and API routes to avoid skewing public analytics
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/dashboard") || pathname.startsWith("/api")) {
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
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: pathname,
            title: typeof document !== "undefined" ? document.title : "",
            referrer: typeof document !== "undefined" ? document.referrer : "",
            userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          }),
        });
      } catch (err) {
        // Silently ignore tracking errors to not impact user experience
      }
    };

    // Delay slightly to allow document.title to update
    const timer = setTimeout(trackView, 400);
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
