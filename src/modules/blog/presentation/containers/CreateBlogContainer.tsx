"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import AddBlogForm from "../components/AddBlogForm";

export default function CreateBlogContainer() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-16 font-poppins">
      <AdminHeader title="Create Blog Article" />

      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <AddBlogForm
            isEdit={false}
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
