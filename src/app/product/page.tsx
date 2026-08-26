import React from "react";
import Link from "next/link";
import ProductCatalogClient from "@/components/product/ProductCatalogClient";
import { getAllProducts } from "@/lib/products";
import { ProductRecord } from "@/modules/product";

export const metadata = {
  title: "Product Catalog | Lightning Protection & Structural Earthing | DFMHUB",
  description:
    "Explore certified ARK Make lightning protection systems and structural earthing products manufactured to IS 3043 and IEC 62305 standards.",
  keywords: [
    "Lightning Protection Catalog",
    "Structural Earthing Catalog",
    "ARK Make products",
    "Chemical Earthing Electrodes",
    "Copper Bonded Earth Rods",
    "Air Terminals",
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
  const initialCategory = resolvedSearchParams.category || resolvedSearchParams.type || null;

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
    <div className="w-full min-h-screen bg-white dark:bg-[#060a14] text-slate-900 dark:text-white transition-colors duration-200">
      {/* Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-900 dark:text-white font-semibold">Product Catalog</span>
        </div>
      </div>

      {/* Main Interactive Product Catalog Module */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <ProductCatalogClient
          initialProducts={initialProducts}
          initialCategory={initialCategory}
        />
      </main>
    </div>
  );
}
