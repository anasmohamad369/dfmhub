"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, AlertCircle, ArrowLeft } from "lucide-react";
import AdminHeader from "@/components/AdminHeader";
import AddBlogForm from "../components/AddBlogForm";
import { useBlogDetailQuery } from "../../application/use-cases/useBlogQueries";
import { Button } from "@/components/ui/button";

interface EditBlogContainerProps {
  slug: string;
}

export default function EditBlogContainer({ slug }: EditBlogContainerProps) {
  const router = useRouter();
  const { data: blog, isLoading, isError } = useBlogDetailQuery(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center space-y-3 font-poppins">
        <RefreshCw className="w-8 h-8 text-amber-500 animate-spin" />
        <p className="text-xs text-slate-500 font-semibold">Loading blog article editor...</p>
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 font-poppins">
      <AdminHeader title="Edit Blog Article" />

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <AddBlogForm
            initialData={blog}
            isEdit={true}
            readonly={false}
            onSuccessCallback={() => {
              router.push("/admin");
            }}
          />
        </div>
      </main>
    </div>
  );
}
