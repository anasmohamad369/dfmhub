"use client";

import React from "react";
import Link from "next/link";
import {
  RefreshCw,
  AlertCircle,
  Calendar,
  User,
  ChevronLeft,
  Share2,
  Link2,
  ListTree,
  Tag,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import { useBlogDetailQuery } from "../../application/use-cases/useBlogQueries";
import ContactForm from "@/components/ContactForm";
import { CATEGORY_OPTIONS } from "../../domain/validation/blog.schema";

interface BlogDetailClientProps {
  slug: string;
}

export default function BlogDetailClient({ slug }: BlogDetailClientProps) {
  const { data: post, isLoading, isError, error } = useBlogDetailQuery(slug);

  const getCategoryLabel = (catKey?: string) => {
    if (!catKey) return "STANDARDS & COMPLIANCE";
    const found = CATEGORY_OPTIONS.find((c) => c.value === catKey);
    if (found) return found.label.toUpperCase();
    if (catKey === "EARTHING") return "STRUCTURAL EARTHING";
    return catKey.replace("_", " ").toUpperCase();
  };

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3 bg-white dark:bg-[#070d19] text-slate-900 dark:text-white font-poppins">
        <RefreshCw className="w-8 h-8 text-emerald-600 dark:text-emerald-400 animate-spin" />
        <p className="text-xs text-slate-500 font-semibold">Loading technical article...</p>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 bg-white dark:bg-[#070d19] text-slate-900 dark:text-white space-y-4 text-center font-poppins">
        <AlertCircle className="w-12 h-12 text-rose-500" />
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
          {error?.message || "The blog post you are looking for does not exist or has been removed."}
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Blogs</span>
        </Link>
      </div>
    );
  }

  const formattedDate = post.createdAt
    ? new Date(post.createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "August 25, 2026";

  // Extract headings for Table of Contents
  const extractHeadings = (content: string) => {
    const blocks = content.split("\n\n").filter((b) => b.trim() !== "");
    const headings: string[] = [];

    blocks.forEach((block) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
      if (lines.length === 1 && lines[0].length < 80 && !lines[0].includes(":") && !lines[0].startsWith("-")) {
        headings.push(lines[0]);
      }
    });

    return headings;
  };

  const headingsList = extractHeadings(post.content);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    image: post.imageUrl ? [post.imageUrl] : ["https://www.dfmhub.com/images/lps-hero.png"],
    datePublished: post.createdAt || "2026-08-25",
    author: {
      "@type": "Organization",
      name: post.author || "DFMHUB Technical Team",
    },
    publisher: {
      "@type": "Organization",
      name: "DFMHUB Systems",
    },
  };

  const tags = ["#Lightning Protection", "#IEC 62305", "#Industrial Safety", "#Surge Protection"];

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      alert("Article link copied to clipboard!");
    }
  };

  // Helper to render content with rich subheadings, numbered lists, bullet items, and callouts
  const renderFormattedContent = (content: string) => {
    const blocks = content.split("\n\n").filter((b) => b.trim() !== "");

    return blocks.map((block, idx) => {
      const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);

      // Check if block is a single heading line
      if (lines.length === 1 && lines[0].length < 80 && !lines[0].includes(":") && !lines[0].startsWith("-")) {
        const headingId = `section-${idx}`;
        return (
          <h2 key={idx} id={headingId} className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white pt-6 pb-2 tracking-tight flex items-center gap-2">
            <span>{lines[0]}</span>
          </h2>
        );
      }

      // Check if block is an italic or highlight quote / conclusion (e.g., "Never rely on single point grounding...")
      if (block.toLowerCase().startsWith("never rely on") || block.toLowerCase().startsWith("note:") || block.toLowerCase().startsWith("important:")) {
        return (
          <div key={idx} className="my-6 border-l-4 border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/20 p-5 rounded-r-2xl text-slate-800 dark:text-emerald-200 italic font-medium leading-relaxed shadow-xs">
            {block}
          </div>
        );
      }

      // Check if block contains key-value / bullet points
      const hasBullets = lines.some((l) => l.includes(":") || l.startsWith("- ") || l.startsWith("• ") || /^\d+\./.test(l));
      if (hasBullets) {
        return (
          <div key={idx} className="space-y-4 my-6 font-sans">
            {lines.map((line, lIdx) => {
              const colonIndex = line.indexOf(":");
              const isNumbered = /^\d+\./.test(line);

              if (colonIndex > 0 && colonIndex < 50) {
                const rawTitle = line.substring(0, colonIndex).replace(/^(\d+\.|[-•])\s*/, "").trim();
                const desc = line.substring(colonIndex + 1).trim();

                // Highlight title badge if special word like "Grid Mesh Density"
                const isHighlightedBadge = rawTitle.toLowerCase().includes("grid mesh") || rawTitle.toLowerCase().includes("density");

                return (
                  <div key={lIdx} className="flex items-start gap-3 text-sm sm:text-base leading-relaxed">
                    {isNumbered ? (
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400 min-w-[20px] text-sm">
                        {line.match(/^\d+\./)?.[0]}
                      </span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2.5" />
                    )}
                    <div>
                      {isHighlightedBadge ? (
                        <span className="bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-md font-bold text-sm mr-1.5 border border-emerald-500/30">
                          {rawTitle}
                        </span>
                      ) : (
                        <strong className="font-extrabold text-slate-900 dark:text-white">
                          {rawTitle}:{" "}
                        </strong>
                      )}
                      <span className="text-slate-700 dark:text-slate-300">{desc}</span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={lIdx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2.5" />
                  <span>{line.replace(/^(\d+\.|[-•])\s*/, "")}</span>
                </div>
              );
            })}
          </div>
        );
      }

      return (
        <p key={idx} className="text-sm sm:text-base text-slate-700 dark:text-slate-300 font-normal leading-relaxed">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="w-full bg-white dark:bg-[#070d19] text-slate-900 dark:text-slate-100 transition-colors duration-200 font-poppins pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Top Section Header */}
      <section className="w-full pt-8 pb-8 px-4 sm:px-6 lg:px-8 border-b border-slate-100 dark:border-slate-800/80">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Back Button */}
          <div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Blogs</span>
            </Link>
          </div>

          {/* Category Pill & Title */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider">
                {getCategoryLabel(post.category)}
              </span>
              <span className="text-xs text-slate-500 font-medium">Technical Guide</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-3xl">
              {post.summary}
            </p>
          </div>

          {/* Author Metadata Bar & Social Share */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="w-7 h-7 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                <User className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {post.author || "Earthing Solutions Team"}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {formattedDate}
              </span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>

            {/* Social Share Icon Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase text-slate-400 mr-1">
                SHARE:
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-600 transition-all flex items-center justify-center text-slate-600 dark:text-slate-300"
                title="Copy Link"
              >
                <Link2 className="w-3.5 h-3.5" />
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-600 transition-all flex items-center justify-center text-slate-600 dark:text-slate-300 font-mono text-[11px] font-bold"
                title="Share on Twitter"
              >
                X
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.dfmhub.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-600 transition-all flex items-center justify-center text-slate-600 dark:text-slate-300 font-mono text-[11px] font-bold"
                title="Share on LinkedIn"
              >
                in
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://www.dfmhub.com/blog/${post.slug}`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/20 hover:text-emerald-600 transition-all flex items-center justify-center text-slate-600 dark:text-slate-300 font-mono text-[11px] font-bold"
                title="Share on Facebook"
              >
                fb
              </a>
            </div>
          </div>

          {/* Full-Width Featured Cover Image */}
          {post.imageUrl && (
            <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl mt-6">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Main Content Grid: 2 Columns */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Article Body & Interactive Elements */}
          <div className="lg:col-span-8 space-y-8">
            {/* Table of Contents Card */}
            {headingsList.length > 0 && (
              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 space-y-3">
                <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <ListTree className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Table of Contents</span>
                </div>
                <ul className="space-y-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {headingsList.map((heading, i) => (
                    <li key={i} className="flex items-center gap-2 hover:text-emerald-600 transition-colors">
                      <span className="text-emerald-500 font-bold">&gt;</span>
                      <a href={`#section-${i}`}>{heading}</a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Article Content */}
            <div className="space-y-6">
              {renderFormattedContent(post.content)}
            </div>

            {/* Bottom SEO Tags Box */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5 shrink-0">
                <Tag className="w-3.5 h-3.5 text-emerald-500" />
                <span>ARTICLE SEO TOPICS & KEYWORDS</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Solutions Banner Card */}
            <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 text-white p-8 rounded-3xl overflow-hidden shadow-xl border border-emerald-500/20">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>EARTHING & SAFETY SOLUTIONS</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  DFMHUB ARK Make Systems
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
                  Protect your residential, commercial, or industrial setup with certified grounding solutions and turn-key installation services across India.
                </p>
                <div className="pt-2">
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs px-6 py-3 rounded-full transition-all shadow-md cursor-pointer"
                  >
                    <span>Visit Solutions / Request Quote</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Sidebar Widgets */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
            {/* Widget 1: Author Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {post.author || "Earthing Solutions Team"}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-medium">Electrical Grounding Experts</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal pt-1">
                Providing industry-certified guidance, grounding products, and technical testing for electrical safety compliance.
              </p>
            </div>

            {/* Widget 2: Article Tags Widget */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-3xl shadow-xs space-y-3">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Article Tags</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Widget 3: Technical Guidance CTA Card */}
            <div className="bg-[#047857] text-white p-6 rounded-3xl shadow-md space-y-4 border border-emerald-400/20">
              <div className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold tracking-tight">Need Technical Guidance?</h4>
                <p className="text-xs text-emerald-100 leading-relaxed mt-1">
                  Get expert recommendations on earth electrode sizing, soil resistivity calculations, and lightning protection.
                </p>
              </div>
              <Link
                href="/contact-us"
                className="block w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-[#047857] font-extrabold text-xs text-center transition-all shadow-xs cursor-pointer"
              >
                Request Consultation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      {/* <section className="w-full bg-[#f1f5f9] dark:bg-[#040914] text-slate-900 py-14 sm:py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section> */}
    </div>
  );
}
