"use client";

import React from "react";
import { Zap, ShieldCheck, ArrowRight, CheckCircle2, Layers } from "lucide-react";
import { PRODUCT_CATEGORIES, ProductCategory } from "../../domain/entities/product.entity";

interface ProductTypeSelectorProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

export default function ProductTypeSelector({
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
}: ProductTypeSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest block mb-1">
            STEP 1 · SELECT SYSTEM TYPE
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Choose Product Category
          </h2>
        </div>

        {/* Quick Filter Pill Buttons */}
        <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => onSelectCategory("ALL")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              selectedCategory === "ALL"
                ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Types</span>
            {categoryCounts.ALL !== undefined && (
              <span className="ml-1 text-[10px] opacity-70">({categoryCounts.ALL})</span>
            )}
          </button>

          {PRODUCT_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => onSelectCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {cat.key === "LIGHTNING_PROTECTION" ? (
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                ) : (
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                )}
                <span>{cat.title}</span>
                {categoryCounts[cat.key] !== undefined && (
                  <span className="ml-0.5 text-[10px] opacity-70">({categoryCounts[cat.key]})</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Prominent Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PRODUCT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.key;
          const isLightning = cat.key === "LIGHTNING_PROTECTION";
          const count = categoryCounts[cat.key];

          return (
            <div
              key={cat.key}
              onClick={() => onSelectCategory(isSelected ? "ALL" : cat.key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelectCategory(isSelected ? "ALL" : cat.key);
                }
              }}
              className={`relative text-left rounded-2xl p-6 sm:p-7 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group overflow-hidden ${
                isSelected
                  ? isLightning
                    ? "bg-amber-50/60 dark:bg-amber-950/20 border-amber-500 shadow-lg shadow-amber-500/10"
                    : "bg-blue-50/60 dark:bg-blue-950/20 border-blue-500 shadow-lg shadow-blue-500/10"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 shadow-sm hover:shadow-md"
              }`}
            >
              {/* Active Selection Ribbon / Indicator */}
              {isSelected && (
                <div
                  className={`absolute top-0 right-0 px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-bl-xl text-white flex items-center gap-1 ${
                    isLightning ? "bg-amber-600" : "bg-blue-600"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Selected Type</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${
                      isLightning
                        ? isSelected
                          ? "bg-amber-500 text-white border-amber-600"
                          : "bg-amber-100/70 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900/60 group-hover:bg-amber-500 group-hover:text-white"
                        : isSelected
                        ? "bg-blue-600 text-white border-blue-700"
                        : "bg-blue-100/70 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/60 group-hover:bg-blue-600 group-hover:text-white"
                    }`}
                  >
                    {isLightning ? (
                      <Zap className="w-6 h-6" />
                    ) : (
                      <ShieldCheck className="w-6 h-6" />
                    )}
                  </div>

                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cat.badgeClass}`}
                  >
                    {cat.badgeLabel}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                      {cat.title}
                    </h3>
                    {count !== undefined && (
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                        {count} {count === 1 ? "Product" : "Products"}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold tracking-wide uppercase">
                    {cat.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal pt-1">
                    {cat.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                    Key Solutions Included:
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {cat.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            isLightning ? "bg-amber-500" : "bg-blue-500"
                          }`}
                        />
                        <span className="truncate">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 pt-3 flex items-center justify-between text-xs font-bold">
                <span
                  className={`inline-flex items-center gap-1.5 transition-colors ${
                    isSelected
                      ? isLightning
                        ? "text-amber-700 dark:text-amber-400"
                        : "text-blue-700 dark:text-blue-400"
                      : "text-slate-700 dark:text-slate-300 group-hover:text-amber-600 dark:group-hover:text-amber-400"
                  }`}
                >
                  <span>{isSelected ? "Filtering by this type" : `Explore ${cat.title}`}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>

                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">
                  {isSelected ? "Click to deselect" : "Click to view products"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
