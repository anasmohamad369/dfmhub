import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Layers, Sparkles } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ProductCatalogClient from "@/components/product/ProductCatalogClient";
import { getAllProducts } from "@/lib/products";
import { ProductRecord } from "@/modules/product";

export const metadata = {
  title: "ARK Make Product Catalog | Lightning Protection & Structural Earthing | DFMHUB",
  description:
    "Explore the complete range of certified ARK Make lightning protection systems and structural earthing products manufactured to IS 3043 and IEC 62305 standards.",
  keywords: [
    "Lightning Protection Catalog",
    "Structural Earthing Catalog",
    "ARK Make products",
    "Chemical Earthing Electrodes",
    "Copper Bonded Earth Rods",
    "Air Terminals",
    "Earthing Clamps",
    "DFMHUB Catalog",
  ],
  alternates: {
    canonical: "https://dfmhub.vercel.app/product",
  },
};

export default async function ProductCatalogPage({
  searchParams,
}: {
  searchParams?: Promise<{ type?: string; category?: string }> | { type?: string; category?: string };
}) {
  const resolvedSearchParams = searchParams ? await Promise.resolve(searchParams) : {};
  const initialCategory = resolvedSearchParams.type || resolvedSearchParams.category || "ALL";

  let initialProducts: ProductRecord[] = [];
  try {
    const rawProducts = await getAllProducts();
    initialProducts = (rawProducts || []).map((p: any) => ({
      ...p,
      createdAt: p.createdAt ? p.createdAt.toISOString() : new Date().toISOString(),
      updatedAt: p.updatedAt ? p.updatedAt.toISOString() : new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error loading products on server:", error);
    initialProducts = [];
  }

  return (
    <div className="w-full transition-colors duration-200">
      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#081021] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-amber-400 font-bold">Product Catalog</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>ARK MAKE · CERTIFIED PRODUCT CATALOG</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Engineered Lightning Protection &amp; Structural Earthing Systems
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
            Explore our comprehensive catalog of certified air terminals, down conductors, chemical earthing electrodes, rebar clamps, and structural bonding components designed for critical infrastructure.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact-us"
              className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>REQUEST TECHNICAL BOQ / QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tool"
              className="bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md border border-slate-700 transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>IS/IEC 62305 RISK CALCULATOR</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Product Catalog Interactive Grid */}
      <section className="w-full bg-[#f8fafc] dark:bg-[#070d19] text-slate-900 dark:text-slate-100 py-12 sm:py-16 lg:py-20 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProductCatalogClient
            initialProducts={initialProducts}
            initialCategory={initialCategory}
          />
        </div>
      </section>

      {/* Section 3: Contact Form Consultation Section */}
      <section className="w-full bg-[#f1f5f9] dark:bg-[#040914] text-slate-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
