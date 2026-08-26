"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, RefreshCw, PackageX, Zap, ShieldCheck, ChevronRight } from "lucide-react";
import { useProductsQuery } from "../../application/use-cases/useProductQueries";
import { ProductRecord, PRODUCT_CATEGORIES } from "../../domain/entities/product.entity";
import ProductTypeSelector from "./ProductTypeSelector";
import ProductCatalogCard from "./ProductCatalogCard";
import { Button } from "@/components/ui/button";

interface ProductCatalogClientProps {
  initialProducts?: ProductRecord[];
  initialCategory?: string | null;
}

export default function ProductCatalogClient({
  initialProducts = [],
  initialCategory = null,
}: ProductCatalogClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Read category from search params or initial prop
  const urlCategory = searchParams.get("category") || searchParams.get("type") || initialCategory;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    urlCategory && urlCategory !== "ALL" ? urlCategory : null
  );

  useEffect(() => {
    const cat = searchParams.get("category") || searchParams.get("type");
    if (cat && cat !== "ALL") {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const {
    data: products = initialProducts,
    isLoading,
    isError,
    refetch,
  } = useProductsQuery(undefined, initialProducts);

  // Calculate product counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      LIGHTNING_PROTECTION: 0,
      STRUCTURAL_EARTHING: 0,
    };

    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      }
    });

    return counts;
  }, [products]);

  const handleSelectCategory = (catKey: string | null) => {
    setSelectedCategory(catKey);
    if (catKey) {
      router.push(`/product?category=${catKey}`, { scroll: false });
    } else {
      router.push(`/product`, { scroll: false });
    }
  };

  // Filter products by selected category
  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return [];
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  const activeCategoryInfo = PRODUCT_CATEGORIES.find((c) => c.key === selectedCategory);

  // 1. IF NO CATEGORY SELECTED: Show the two hero category cards
  if (!selectedCategory) {
    return (
      <div className="py-4">
        <ProductTypeSelector
          onSelectCategory={(cat) => handleSelectCategory(cat)}
          categoryCounts={categoryCounts}
        />
      </div>
    );
  }

  // 2. IF CATEGORY IS SELECTED: Show category products page with Back button
  return (
    <div className="space-y-8 pt-2">
      {/* Navigation Header with Back button & Category switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="space-y-2">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => handleSelectCategory(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors uppercase tracking-wider cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to All Categories</span>
          </button>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {activeCategoryInfo ? activeCategoryInfo.title : "Category"} Components
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
            {selectedCategory === "STRUCTURAL_EARTHING"
              ? "Foundation rebar bonding clamps, chemical electrodes, and equipotential earth bars."
              : "Air terminals, down conductors, fixing clamps, and surge protective devices."}
          </p>
        </div>

        {/* Category Switcher Buttons */}
        {/* <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0 self-start sm:self-center">
          {PRODUCT_CATEGORIES.map((cat) => {
            const isCurrent = cat.key === selectedCategory;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleSelectCategory(cat.key)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat.key === "LIGHTNING_PROTECTION" ? (
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                )}
                <span>{cat.title}</span>
                <span className="text-[10px] text-slate-400">({categoryCounts[cat.key] ?? 0})</span>
              </button>
            );
          })}
        </div> */}
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Loading {activeCategoryInfo?.title} products...
          </p>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="py-14 text-center space-y-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/40 p-6">
          <p className="text-base font-bold text-rose-700 dark:text-rose-300">
            Unable to load products at this moment.
          </p>
          <Button
            onClick={() => refetch()}
            variant="outline"
            size="sm"
            className="border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40"
          >
            Retry Connection
          </Button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && filteredProducts.length === 0 && (
        <div className="py-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <PackageX className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              No products available
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              There are currently no products listed under {activeCategoryInfo?.title}.
            </p>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && !isError && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCatalogCard key={product.id || product.slug} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
