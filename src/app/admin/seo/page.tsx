import React from "react";
import AdminHeader from "@/components/AdminHeader";
import SeoManagerClient from "@/components/admin/SeoManagerClient";

export const metadata = {
  title: "SEO & Dynamic Meta Title Management | Admin Console",
  description: "DFMHUB Admin Console - Dynamic SEO and Meta Title Management.",
};

export default function AdminSeoPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      <AdminHeader title="SEO & Dynamic Titles" />
      <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <SeoManagerClient />
      </main>
    </div>
  );
}
