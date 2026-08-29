"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import AddBlogForm from "@/modules/blog/presentation/components/AddBlogForm";
import { useBlogDetailQuery } from "@/modules/blog/application/use-cases/useBlogQueries";
import { Button } from "@/components/ui/button";
import AdminHeader from "@/components/AdminHeader";

function BlogEditorContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const slug = searchParams.get("slug") || "";
  const paramReadonly = searchParams.get("readonly") === "true" || searchParams.get("mode") === "view";

  const [isReadonly, setIsReadonly] = useState<boolean>(paramReadonly);

  useEffect(() => {
    setIsReadonly(paramReadonly);
  }, [paramReadonly]);

  const { data: blog, isLoading } = useBlogDetailQuery(slug);

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
      <div className="py-20 text-center space-y-3 font-poppins">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
        <p className="text-xs text-slate-500 font-semibold">Loading blog article for editor...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-poppins">
      {/* Top Navigation Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => router.push("/admin")}
            className="h-9 px-3.5 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Admin Console</span>
          </Button>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <Link href="/admin" className="hover:text-amber-500">Admin</Link>
              <span>/</span>
              <span className="text-amber-500 font-semibold">
                {isReadonly ? "View Blog" : isEdit ? "Edit Blog" : "Create Blog"}
              </span>
            </div>
            <h1 className="text-base font-bold text-slate-900 dark:text-white">
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
          router.push("/admin");
        }}
      />
    </div>
  );
}

export default function BlogEditorPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 font-poppins">
      <AdminHeader title="Blog Editor" />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
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
      </main>
    </div>
  );
}
