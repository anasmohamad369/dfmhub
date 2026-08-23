"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, ShieldCheck, Globe, RefreshCw, AlertCircle } from "lucide-react";
import AddBlogForm from "@/components/AddBlogForm";
import { useBlogDetailQuery } from "@/hooks/useBlogQueries";
import { Button } from "@/components/ui/button";

function BlogEditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = searchParams.get("slug") || "";
  const paramReadonly = searchParams.get("readonly") === "true" || searchParams.get("mode") === "view";

  const [isReadonly, setIsReadonly] = useState<boolean>(paramReadonly);

  useEffect(() => {
    setIsReadonly(paramReadonly);
  }, [paramReadonly]);

  const { data: blog, isLoading, isError } = useBlogDetailQuery(slug);

  const isEdit = !!slug && !!blog;

  const handleToggleReadonly = (newState: boolean) => {
    setIsReadonly(newState);
    const newParams = new URLSearchParams(searchParams.toString());
    if (newState) {
      newParams.set("readonly", "true");
    } else {
      newParams.delete("readonly");
      newParams.delete("mode");
    }
    router.replace(`/admin/blogs/editor?${newParams.toString()}`);
  };

  if (slug && isLoading) {
    return (
      <div className="py-20 text-center space-y-3">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold">Loading blog article for editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="w-10 h-10 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Link href="/dashboard" className="hover:text-amber-500">Admin</Link>
              <span>/</span>
              <span className="text-amber-500 font-semibold">
                {isReadonly ? "View Blog" : isEdit ? "Edit Blog" : "Create Blog"}
              </span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              {blog ? blog.title : "Technical Blog Editor"}
            </h1>
          </div>
        </div>

      </div>

      {/* Main Blog Form Container */}
      <AddBlogForm
        initialData={blog}
        isEdit={isEdit}
        readonly={isReadonly}
        onToggleReadonly={handleToggleReadonly}
        onSuccessCallback={() => {
          router.push("/dashboard");
        }}
      />
    </div>
  );
}

export default function BlogEditorPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-poppins">
      <div className="max-w-5xl mx-auto space-y-6">
        <Suspense
          fallback={
            <div className="py-20 text-center text-xs text-slate-400">
              Loading editor environment...
            </div>
          }
        >
          <BlogEditorContent />
        </Suspense>
      </div>
    </div>
  );
}
