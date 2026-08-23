"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/AdminHeader";
import AddBlogForm from "../components/AddBlogForm";

export default function CreateBlogContainer() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070d19] text-slate-900 dark:text-slate-100 p-4 sm:p-6 lg:p-8 font-poppins">
      <div className="max-w-7xl mx-auto space-y-6">
        <AdminHeader />

        <div className="max-w-4xl mx-auto">
          <AddBlogForm
            isEdit={false}
            readonly={false}
            onSuccessCallback={() => {
              router.push("/dashboard");
            }}
          />
        </div>
      </div>
    </div>
  );
}
