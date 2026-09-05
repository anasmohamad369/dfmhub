import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import BlogListClient from "@/components/BlogListClient";

import { getDynamicMetadata } from "@/lib/seo";

const defaultMetadata = {
  title: "Technical Blog | Lightning Protection & Structural Earthing | DFMHUB",
  description:
    "Standards interpretation, field test methods and design decisions — written for facility managers, consultants and electrical contractors working in India.",
  alternates: {
    canonical: "https://www.dfmhub.com/blog",
  },
};

export async function generateMetadata() {
  return await getDynamicMetadata("/blog", defaultMetadata);
}


export default function BlogIndexPage() {
  return (
    <div className="w-full transition-colors duration-200">
      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#081021] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <span>&gt;</span>
            <span className="text-amber-400 font-bold">Blog</span>
          </div>

          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
            TECHNICAL BLOG &amp; KNOWLEDGE BASE
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Lightning protection and earthing, explained by the engineers who install it
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
            Standards interpretation, field test methods and design decisions — written for facility managers, consultants and electrical contractors working in India.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/tool"
              className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>GET A FREE DESIGN CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/installation-services"
              className="bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md border border-slate-700 transition-all flex items-center justify-center"
            >
              INSTALLATION SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Blog Grid with TanStack Query & Category Pills */}
      <section className="w-full bg-[#f8fafc] dark:bg-[#070d19] text-slate-900 dark:text-slate-100 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogListClient />
        </div>
      </section>

      {/* Section 3: Contact Form Section */}
      <section className="w-full bg-[#f1f5f9] dark:bg-[#040914] text-slate-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
