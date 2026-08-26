"use client";

import React, { useState, useMemo } from "react";
import { Search, X, RefreshCw, PackageX, Sparkles, Filter } from "lucide-react";
import { useProductsQuery } from "../../application/use-cases/useProductQueries";
import { ProductRecord } from "../../domain/entities/product.entity";
import ProductTypeSelector from "./ProductTypeSelector";
import ProductCatalogCard from "./ProductCatalogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductCatalogClientProps {
  initialProducts?: ProductRecord[];
  initialCategory?: string;
}

export default function ProductCatalogClient({
  initialProducts = [],
  initialCategory = "ALL",
}: ProductCatalogClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: products = initialProducts,
    isLoading,
    isError,
    refetch,
  } = useProductsQuery(undefined, initialProducts);

  // Calculate product counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      ALL: products.length,
      LIGHTNING_PROTECTION: 0,
      STRUCTURAL_EARTHING: 0,
    };

    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category]++;
      } else {
        counts[p.category] = 1;
      }
    });

    return counts;
  }, [products]);

  // Filter products by selected category and search query
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        selectedCategory === "ALL" || p.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const titleMatch = p.title?.toLowerCase().includes(q);
      const descMatch = p.description?.toLowerCase().includes(q);
      const brandMatch = p.brand?.toLowerCase().includes(q);
      const appMatch = p.primaryApplication?.toLowerCase().includes(q);

      return titleMatch || descMatch || brandMatch || appMatch;
    });
  }, [products, selectedCategory, searchQuery]);

  const activeCategoryTitle =
    selectedCategory === "LIGHTNING_PROTECTION"
      ? "Lightning Protection Systems"
      : selectedCategory === "STRUCTURAL_EARTHING"
      ? "Structural Earthing Solutions"
      : "Complete Industrial Range";

  return (
    <div className="space-y-12">
      {/* 1. Category Selection Component */}
      <ProductTypeSelector
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        categoryCounts={categoryCounts}
      />

      {/* 2. Product Search & Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Active Category Title & Count */}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest">
                STEP 2 · PRODUCTS
              </span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-xs text-slate-500 font-semibold">
                {filteredProducts.length} {filteredProducts.length === 1 ? "Item" : "Items"} Found
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {activeCategoryTitle}
            </h3>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80 md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search products, brands, applications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-9 h-11 rounded-xl bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-amber-500 text-xs sm:text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Badges */}
        {(selectedCategory !== "ALL" || searchQuery) && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Active Filters:
            </span>

            {selectedCategory !== "ALL" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 text-[11px] font-semibold">
                <span>
                  Type:{" "}
                  {selectedCategory === "LIGHTNING_PROTECTION"
                    ? "Lightning Protection"
                    : "Structural Earthing"}
                </span>
                <button
                  onClick={() => setSelectedCategory("ALL")}
                  className="hover:text-amber-950 dark:hover:text-amber-100"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-[11px] font-semibold">
                <span>Keyword: &quot;{searchQuery}&quot;</span>
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-slate-950 dark:hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            <button
              onClick={() => {
                setSelectedCategory("ALL");
                setSearchQuery("");
              }}
              className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline ml-auto"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* 3. Loading State */}
      {isLoading && (
        <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <RefreshCw className="w-8 h-8 text-amber-500 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Loading products from catalog...
          </p>
        </div>
      )}

      {/* 4. Error State */}
      {isError && (
        <div className="py-14 text-center space-y-4 bg-rose-50 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-900/40 p-6">
          <p className="text-base font-bold text-rose-700 dark:text-rose-300">
            Unable to load products from catalog at this moment.
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

      {/* 5. Empty State */}
      {!isLoading && !isError && filteredProducts.length === 0 && (
        <div className="py-20 text-center space-y-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
          <div className="w-14 h-14 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <PackageX className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              No products found
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {searchQuery
                ? `No products matching "${searchQuery}" in ${
                    selectedCategory === "ALL" ? "any category" : activeCategoryTitle
                  }.`
                : "No products available in this category at the moment."}
            </p>
          </div>

          <Button
            onClick={() => {
              setSelectedCategory("ALL");
              setSearchQuery("");
            }}
            size="sm"
            className="bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold px-4 h-9"
          >
            Show All Products
          </Button>
        </div>
      )}

      {/* 6. Products Grid */}
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
