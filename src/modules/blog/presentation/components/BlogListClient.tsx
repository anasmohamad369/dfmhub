"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, Layers } from "lucide-react";
import { useBlogsQuery } from "../../application/use-cases/useBlogQueries";
import { CATEGORY_OPTIONS } from "../../domain/validation/blog.schema";

export default function BlogListClient() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const { data: posts = [], isLoading, isError } = useBlogsQuery(selectedCategory);

  const getCategoryLabel = (catKey: string) => {
    const found = CATEGORY_OPTIONS.find((c) => c.value === catKey);
    if (found) return found.label;
    if (catKey === "EARTHING") return "Structural Earthing";
    return catKey.replace("_", " ");
  };

  const getCategoryBadgeColor = (catKey: string) => {
    switch (catKey) {
      case "LIGHTNING_PROTECTION":
        return "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20";
      case "STRUCTURAL_EARTHING":
      case "EARTHING":
        return "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20";
      case "STANDARDS":
        return "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      case "TESTING":
        return "text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20";
      case "SURGE_PROTECTION":
        return "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20";
      default:
        return "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 border-indigo-500/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* Sleek Minimal Category Filter Pills */}


      {/* Loading State */}
      {isLoading && (
        <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Fetching latest engineering posts...
          </p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="py-12 text-center text-rose-500 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/40">
          <p className="text-sm font-semibold">Unable to load blog articles at this moment.</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && posts.length === 0 && (
        <div className="py-16 text-center space-y-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Layers className="w-10 h-10 text-slate-400 mx-auto" />
          <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
            No articles found for this category.
          </p>
          <p className="text-xs text-slate-500">
            Select another category tab or check back soon for new technical posts.
          </p>
        </div>
      )}

      {/* Articles Grid */}
      {!isLoading && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id || post.slug}
              href={`/blog/${post.slug}`}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 hover:border-amber-400/80 transition-all block group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider mb-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full border text-[11px] font-medium ${getCategoryBadgeColor(
                      post.category
                    )}`}
                  >
                    {getCategoryLabel(post.category)}
                  </span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-400 dark:text-slate-500 font-medium">
                    {post.readTime}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug mb-3">
                  {post.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal mb-6">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <span className="font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
