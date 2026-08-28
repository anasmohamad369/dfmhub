import React from "react";

interface JsonLdProps {
  data: Record<string, any> | Record<string, any>[];
}

/**
 * Server Component to render valid JSON-LD structured data graph in Next.js App Router.
 * Automatically wraps array items under a clean Schema.org @graph container.
 */
export default function JsonLd({ data }: JsonLdProps) {
  const schemaGraph = Array.isArray(data)
    ? {
        "@context": "https://schema.org",
        "@graph": data,
      }
    : {
        "@context": "https://schema.org",
        ...data,
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph) }}
    />
  );
}
