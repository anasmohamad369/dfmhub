"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, AlertCircle } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import AddBlogForm from "../components/AddBlogForm";
import { useBlogDetailQuery } from "../../application/use-cases/useBlogQueries";
import { Button } from "@/components/ui/button";

interface ViewBlogContainerProps {
  slug: string;
}

export default function ViewBlogContainer({ slug }: ViewBlogContainerProps) {
  const router = useRouter();
  const { data: blog, isLoading, isError } = useBlogDetailQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] flex items-center justify-center p-6 text-center space-y-3">
        <div>
          <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500 font-semibold">Loading blog article...</p>
        </div>
      </div>
    );
  }

  if (isError || !blog) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] flex items-center justify-center p-6 text-center space-y-4">
        <div>
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-2" />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Blog Article Not Found</h2>
          <Button
            variant="outline"
            onClick={() => router.push("/admin/blogs/editor")}
            className="mt-4 text-xs font-bold"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-poppins">
      <div className="max-w-7xl mx-auto space-y-6">
        <AdminHeader />

        <div className="max-w-4xl mx-auto">
          <AddBlogForm
            initialData={blog}
            isEdit={false}
            readonly={true}
            onToggleReadonly={() => {
              router.push(`/admin/blogs/edit/${blog.slug}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
