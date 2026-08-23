import React from "react";
import BlogDetailClient from "@/components/BlogDetailClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const formattedTitle = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `${formattedTitle} | DFMHUB Technical Blog`,
    description: "Technical guide on lightning protection, earthing standards and electrical system compliance.",
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogDetailClient slug={slug} />;
}
