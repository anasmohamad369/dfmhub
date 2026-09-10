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
  const allowedTags = /^(b|strong|mark|br|em|i|u|p|ul|ol|li|span)$/i;

  // Replace disallowed tags with empty string, but keep allowed ones
  clean = clean.replace(/<\/?([a-z0-9]+)([^>]*)>/gi, (match, tag, attrs) => {
    if (!allowedTags.test(tag)) {
      return "";
    }
    // For allowed tags, keep tag structure. If it's a self-closing or standard tag:
    if (/^br$/i.test(tag)) {
      return "<br/>";
    }
    const isClosing = match.startsWith("</");
    if (isClosing) {
      return `</${tag.toLowerCase()}>`;
    }
    return `<${tag.toLowerCase()}>`;
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
      className={`rich-product-description leading-relaxed font-normal ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}

export default RichDescription;
