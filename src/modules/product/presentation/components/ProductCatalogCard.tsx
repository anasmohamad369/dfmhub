"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  CheckCircle2,
  Factory,
  Shield,
  Zap,
  ShieldCheck,
  Check,
} from "lucide-react";
import { ProductRecord } from "../../domain/entities/product.entity";
import { getProductUrl } from "@/lib/products";


interface ProductCatalogCardProps {
  product: ProductRecord;
}

export default function ProductCatalogCard({ product }: ProductCatalogCardProps) {
  const isLightning = product.category === "LIGHTNING_PROTECTION";
  const categoryLabel = isLightning ? "Lightning Protection" : "Structural Earthing";

  // Parse features if present
  let featureList: string[] = [];
  if (Array.isArray(product.features)) {
    featureList = product.features.map((f: any) =>
      typeof f === "string" ? f : String(f.value || f)
    );
  } else if (typeof product.features === "string") {
    try {
      const parsed = JSON.parse(product.features);
      if (Array.isArray(parsed)) {
        featureList = parsed.map((f: any) =>
          typeof f === "string" ? f : String(f.value || f)
        );
      } else {
        featureList = product.features.split(",").map((f) => f.trim());
      }
    } catch {
      featureList = product.features.split(",").map((f) => f.trim());
    }
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/80 dark:hover:border-amber-500/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full bg-slate-50 dark:bg-slate-950/60 overflow-hidden flex items-center justify-center p-4 border-b border-slate-100 dark:border-slate-800/80">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-600 space-y-2">
            <Shield className="w-10 h-10 stroke-[1.5]" />
            <span className="text-xs font-medium">No Image Available</span>
          </div>
        )}

        {/* Category Badge Top Left */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="outline"
            className={`text-[11px] font-semibold backdrop-blur-md shadow-sm ${
              isLightning
                ? "bg-amber-50/90 dark:bg-amber-950/90 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-800"
                : "bg-orange-50/90 dark:bg-orange-950/90 text-orange-700 dark:text-orange-300 border-orange-300 dark:border-orange-800"
            }`}
          >
            {isLightning ? (
              <Zap className="w-3 h-3 mr-1 text-amber-500" />
            ) : (
              <ShieldCheck className="w-3 h-3 mr-1 text-orange-500" />
            )}
            <span>{categoryLabel}</span>
          </Badge>
        </div>

        {/* Stock Status Top Right */}
        <div className="absolute top-3 right-3">
          {product.inStock ? (
            <span className="inline-flex items-center gap-1 bg-emerald-50/90 dark:bg-emerald-950/90 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-full border border-emerald-200/80 dark:border-emerald-800 backdrop-blur-sm shadow-sm">
              <CheckCircle2 className="w-3 h-3" />
              <span>IN STOCK</span>
            </span>
          ) : (
            <span className="bg-slate-100/90 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 text-[10px] font-medium px-2 py-0.5 rounded-full border border-slate-300 dark:border-slate-700 backdrop-blur-sm">
              Made to order
            </span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Brand, Code & Application Meta */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
            {product.productCode && (
              <span className="font-mono text-[11px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                {product.productCode}
              </span>
            )}
            {product.brand && (
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                {product.brand}
              </span>
            )}
            {product.brand && product.primaryApplication && <span>•</span>}
            {product.primaryApplication && (
              <span className="inline-flex items-center gap-1">
                <Factory className="w-3 h-3 text-slate-400" />
                <span className="truncate max-w-[180px]">{product.primaryApplication}</span>
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link href={getProductUrl(product)} className="block">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-snug line-clamp-2">
              {product.title}
            </h3>
          </Link>

          {/* Short Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-normal">
            {product.description}
          </p>

          {/* Feature Highlights Preview */}
          {featureList.length > 0 && (
            <div className="pt-2 space-y-1">
              {featureList.slice(0, 2).map((feat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400"
                >
                  <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="line-clamp-1">{feat}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer: Price / CTA */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
              Pricing
            </span>
            <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              {product.price && product.price > 0
                ? `₹${product.price.toLocaleString("en-IN")}`
                : "Custom Quote"}
            </span>
          </div>

          <Link href={getProductUrl(product)}>
            <Button
              size="sm"
              className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-500 dark:hover:bg-amber-600 text-white font-semibold text-xs h-9 px-3.5 rounded-lg group/btn shadow-sm shadow-amber-500/20"
            >
              <span>View Product</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
