"use client";

import React from "react";
import Link from "next/link";
import { RefreshCw, AlertCircle, Calendar, User, ChevronLeft } from "lucide-react";
import { useBlogDetailQuery } from "../../application/use-cases/useBlogQueries";
import ContactForm from "@/components/ContactForm";
import { CATEGORY_OPTIONS } from "../../domain/validation/blog.schema";

interface BlogDetailClientProps {
  slug: string;
}

export default function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const { data: post, isLoading, isError, error } = useBlogDetailQuery(slug);

  const getCategoryLabel = (catKey?: string) => {
    if (!catKey) return "TECHNICAL ARTICLE";
    const found = CATEGORY_OPTIONS.find((c) => c.value === catKey);
    if (found) return found.label.toUpperCase();
    if (catKey === "EARTHING") return "STRUCTURAL EARTHING";
    return catKey.replace("_", " ").toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 bg-[#070d19] text-white">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs text-slate-400 font-semibold">Loading technical article...</p>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 bg-[#070d19] text-white space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-rose-500" />
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <p className="text-sm text-slate-400 max-w-md">
          {error?.message || "The blog post you are looking for does not exist or has been removed."}
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Blogs</span>
        </Link>
      </div>
    );
  }

  // Format content paragraphs
  const paragraphs = post.content
    ? post.content.split("\n\n").filter((p) => p.trim() !== "")
    : [post.summary];

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "14 July 2026";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.createdAt || "2026-07-14",
    author: {
      "@type": "Organization",
      name: post.author || "DFMHUB Technical Team",
    },
    publisher: {
      "@type": "Organization",
      name: "DFMHUB Systems",
    },
  };

  return (
    <div className="w-full transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Header Banner (DARK NAVY) */}
      <section className="bg-[#070d19] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-2">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <span>&gt;</span>
            <Link href="/blog" className="hover:text-amber-400">Blog</Link>
            <span>&gt;</span>
            <span className="text-amber-400 font-bold truncate max-w-[200px]">
              {post.title}
            </span>
          </div>

          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
            {getCategoryLabel(post.category)}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-xs text-slate-400 font-normal pt-2">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-500" />
              <span>{formattedDate}</span>
            </div>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span>{post.author || "DFMHUB Engineering Team"}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Content (WHITE) */}
      <section className="w-full bg-white dark:bg-[#070d19] text-slate-900 dark:text-slate-100 py-12 sm:py-16 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Summary Lead */}
          <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 border-l-4 border-l-amber-500">
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
              {post.summary}
            </p>
          </div>

          {/* Article Body Paragraphs */}
          <div className="space-y-6 pt-2">
            {paragraphs.map((para, idx) => (
              <p
                key={idx}
                className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-normal leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>

          {/* Return to Blog Button */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline uppercase tracking-wider"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to all blog articles</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full bg-[#f1f5f9] dark:bg-[#040914] text-slate-900 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
