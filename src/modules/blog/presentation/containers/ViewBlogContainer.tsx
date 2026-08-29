"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RefreshCw, AlertCircle, ArrowLeft, Edit3, ExternalLink, Calendar, Clock, User, Tag, FileText, CheckCircle2 } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import { useBlogDetailQuery } from "../../application/use-cases/useBlogQueries";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CATEGORY_OPTIONS } from "../../domain/validation/blog.schema";

interface ViewBlogContainerProps {
  slug: string;
}

export default function ViewBlogContainer({ slug }: ViewBlogContainerProps) {
  const router = useRouter();
  const { data: blog, isLoading, isError } = useBlogDetailQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3 font-poppins">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs text-slate-500 font-semibold">Loading blog article preview...</p>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-4 font-poppins">
        <AlertCircle className="w-10 h-10 text-rose-500" />
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Blog Article Not Found</h2>
        <Button
          variant="outline"
          onClick={() => router.push("/admin")}
          className="mt-2 text-xs font-bold gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Admin Console</span>
        </Button>
      </div>
    );
  }

  const categoryObj = CATEGORY_OPTIONS.find((c) => c.value === blog.category);
  const categoryLabel = categoryObj?.label || blog.category;
  const categoryClass = categoryObj?.badgeClass || "bg-amber-500/10 text-amber-600 border-amber-500/30";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 font-poppins">
      <AdminHeader title="Blog Article Preview" />

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Action Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => router.push("/admin")}
              className="h-10 px-4 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-amber-500 hover:text-white font-semibold text-xs flex items-center gap-2 cursor-pointer transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Admin Console</span>
            </Button>

            <div className="flex items-center gap-3">
              <Link
                href={`/blog/${blog.slug}`}
                target="_blank"
                className="h-10 px-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:border-amber-500 text-xs font-semibold flex items-center gap-1.5 transition-all"
              >
                <span>View Live Article</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-500" />
              </Link>

              <Button
                type="button"
                onClick={() => router.push(`/admin/blogs/edit/${blog.slug}`)}
                className="h-10 px-5 bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs flex items-center gap-2 rounded-xl shadow-md cursor-pointer"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Article</span>
              </Button>
            </div>
          </div>

          {/* Main Article Preview Card */}
          <Card className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 overflow-hidden">
            {/* Header Metadata */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${categoryClass}`}>
                  {categoryLabel}
                </span>

                <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {blog.readTime}
                </span>

                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-mono text-[11px] font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Published
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                {blog.title}
              </h1>

              <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800 font-sans">
                <span className="flex items-center gap-1.5 font-medium">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  {blog.author}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Featured Image Banner */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-inner flex items-center justify-center">
              {blog.imageUrl ? (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950/40 flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <FileText className="w-12 h-12 text-amber-500/40" />
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">
                    DFMHUB Technical Article Banner
                  </span>
                  <span className="text-[11px] text-slate-500">No cover image uploaded</span>
                </div>
              )}
            </div>

            {/* Summary Callout Box */}
            <div className="p-5 rounded-2xl bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-amber-100 text-sm font-medium leading-relaxed">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                Executive Summary
              </div>
              <p>{blog.summary}</p>
            </div>

            {/* Full Article Content */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3">
                Full Article Content
              </div>
              <div className="prose dark:prose-invert max-w-none text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
                {blog.content}
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
