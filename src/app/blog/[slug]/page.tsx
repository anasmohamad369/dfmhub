import React from "react";
import BlogDetailClient from "@/components/BlogDetailClient";

import { getDynamicMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  const path = `/blog/${slug}`;
  const defaultMeta = {
    title: `${formattedTitle} | DFMHUB Technical Blog`,
    description: "Technical guide on lightning protection, earthing standards and electrical system compliance.",
    alternates: {
      canonical: `https://www.dfmhub.com${path}`,
    },
  };

  return await getDynamicMetadata(path, defaultMeta);
}


export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
