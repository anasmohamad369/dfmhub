import React from "react";

/**
 * Strips all HTML tags and collapses whitespace.
 * Perfect for card snippet previews, search indices, and SEO meta tags.
 */
export function stripHtml(html?: string | null): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<\/li>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Sanitizes an HTML string to only allow safe text-formatting tags:
 * <b>, <strong>, <mark>, <br>, <em>, <i>, <u>, <p>, <ul>, <ol>, <li>, <span>
 * Disallows scripts, event handlers, styles, and dangerous tags.
 */
export function sanitizeRichDescription(html: string): string {
  if (!html) return "";

  // If the text contains no HTML tags but has newlines, convert newlines to <br/>
  const hasHtmlTag = /<[a-z][\s\S]*>/i.test(html);
  if (!hasHtmlTag) {
    return html.replace(/\n/g, "<br/>");
  }

  // Remove script, iframe, object, embed, form, input, style tags and their contents
  let clean = html.replace(
    /<(script|iframe|object|embed|form|input|style|link|meta)[\s\S]*?>[\s\S]*?<\/\1>/gi,
    ""
  );

  // Remove inline event handlers (e.g. onclick, onerror) and javascript: protocol
  clean = clean.replace(/\s+on[a-z]+\s*=\s*(['"]).*?\1/gi, "");
  clean = clean.replace(/\s+on[a-z]+\s*=[^\s>]+/gi, "");
  clean = clean.replace(/href\s*=\s*(['"])javascript:[\s\S]*?\1/gi, "");

// Whitelist of allowed tags
  const allowedTags = /^(b|strong|mark|br|em|i|u|p|ul|ol|li|span|h2|h3|h4|blockquote|a|code|hr|del|s)$/i;

  // Replace disallowed tags with empty string, but keep and format allowed ones
  clean = clean.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (match, tag, attrs) => {
    const lowerTag = tag.toLowerCase();
    if (!allowedTags.test(lowerTag)) {
      return "";
    }

    const isClosing = match.startsWith("</");
    if (isClosing) {
      return `</${lowerTag}>`;
    }

    // Special handling for self-closing / void tags
    if (lowerTag === "br") return "<br/>";
    if (lowerTag === "hr") return '<hr class="my-4 border-slate-200 dark:border-slate-800" />';

    // Special handling for hyperlinks: only allow safe http/https/mailto/tel/relative URLs
    if (lowerTag === "a") {
      const hrefMatch = attrs.match(/href\s*=\s*(['"])(.*?)\1/i);
      const rawHref = hrefMatch ? hrefMatch[2].trim() : "";
      const isSafe = /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(rawHref);
      if (!isSafe) {
        return "<span>";
      }
      return `<a href="${rawHref}" target="_blank" rel="noopener noreferrer" class="text-amber-600 dark:text-amber-400 underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-300 transition-colors">`;
    }

    if (lowerTag === "blockquote") {
      return '<blockquote class="border-l-4 border-amber-500 bg-amber-500/10 dark:bg-amber-500/5 px-4 py-2.5 my-3 rounded-r-xl italic text-slate-800 dark:text-amber-100">';
    }

    if (lowerTag === "mark") {
      return '<mark class="bg-amber-200/80 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 px-1.5 py-0.5 rounded font-medium">';
    }

    if (lowerTag === "h2") {
      return '<h2 class="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-4 mb-2 tracking-tight">';
    }

    if (lowerTag === "h3") {
      return '<h3 class="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mt-3 mb-1.5">';
    }

    if (lowerTag === "ul") {
      return '<ul class="list-disc list-inside space-y-1 my-2.5 pl-1">';
    }

    if (lowerTag === "ol") {
      return '<ol class="list-decimal list-inside space-y-1 my-2.5 pl-1">';
    }

    if (lowerTag === "code") {
      return '<code class="bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 font-mono text-xs px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">';
    }

    return `<${lowerTag}>`;
  });

  return clean;
}

interface RichDescriptionProps {
  content?: string | null;
  className?: string;
}

export function RichDescription({ content, className = "" }: RichDescriptionProps) {
  if (!content) return null;

  const sanitized = sanitizeRichDescription(content);

  return (
    <div
      className={`rich-product-description leading-relaxed font-normal text-slate-700 dark:text-slate-300 [&_p]:mb-2.5 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-1 [&_strong]:font-bold [&_b]:font-bold [&_strong]:text-slate-900 dark:[&_strong]:text-white [&_b]:text-slate-900 dark:[&_b]:text-white ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

export default RichDescription;
