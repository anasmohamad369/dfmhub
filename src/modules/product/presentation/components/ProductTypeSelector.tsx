"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Building2,
  TrendingUp,
  CheckCircle,
  RefreshCw,
  Link2,
} from "lucide-react";
import { PRODUCT_CATEGORIES } from "../../domain/entities/product.entity";

interface ProductTypeSelectorProps {
  onSelectCategory: (category: string) => void;
  categoryCounts?: Record<string, number>;
}

export default function ProductTypeSelector({
  onSelectCategory,
  categoryCounts = {},
}: ProductTypeSelectorProps) {
  return (
    <div className="space-y-10 py-6">
      {/* Centered Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl  font-bold text-slate-900 dark:text-white tracking-tight">
          Where would you like to explore today?
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 font-normal">
          Choose a system category and start exploring engineered protection solutions.
        </p>
      </div>

      {/* Two Hero Category Cards with Clearly Visible Background Images & Primary Color */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 1. Lightning Protection Card */}
        <div
          onClick={() => onSelectCategory("LIGHTNING_PROTECTION")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectCategory("LIGHTNING_PROTECTION");
            }
          }}
          className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#070d18] text-white p-7 sm:p-9 flex flex-col justify-between group cursor-pointer shadow-2xl hover:border-amber-500 transition-all duration-300 min-h-[520px]"
        >
          {/* Background Image - Clearly and Vibrantly Visible */}
          <div className="absolute inset-0 z-0 opacity-45 group-hover:opacity-55 transition-opacity duration-500">
            <Image
              src="/images/lps-hero.png"
              alt="Lightning Protection"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Subtle gradient overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-[#060a14]/75 to-[#060a14]/35 z-0 pointer-events-none" />

          {/* Card Content Top */}
          <div className="relative z-10 space-y-6">
            {/* Top Pill Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-wide border border-amber-500/60 bg-amber-950/60 text-amber-400 backdrop-blur-md shadow-sm">
                Lightning Protection
              </span>
              {/* <span className="text-xs font-semibold text-slate-200 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full">
                {categoryCounts.LIGHTNING_PROTECTION ?? 1}{" "}
                {categoryCounts.LIGHTNING_PROTECTION === 1 ? "Product" : "Products"}
              </span> */}
            </div>

            {/* Main Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug drop-shadow-sm">
                Protect in <br />
                <span className="text-amber-400">
                  Lightning Protection
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed font-normal drop-shadow-sm">
                Complete lightning protection solutions designed to protect infrastructure and critical systems.
              </p>
            </div>

            {/* 4 Feature Bullet Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
                <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="drop-shadow-sm">IS/IEC 62305 Risk Assessment Compliance</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="drop-shadow-sm">Type-Tested to IEC 62561 with Batch Traceability</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="drop-shadow-sm">Air Terminals, Down Conductors &amp; Fixing Clamps</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
                <Link2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="drop-shadow-sm">Coordinated Surge Protection Devices (SPDs)</span>
              </div>
            </div>
          </div>

          {/* Bottom Primary Button */}
          <div className="relative z-10 pt-8 mt-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectCategory("LIGHTNING_PROTECTION");
              }}
              className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 cursor-pointer uppercase tracking-wider"
            >
              <span>Explore Lightning Protection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* 2. Structural Earthing Card */}
        <div
          onClick={() => onSelectCategory("STRUCTURAL_EARTHING")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onSelectCategory("STRUCTURAL_EARTHING");
            }
          }}
          className="relative rounded-3xl overflow-hidden border border-slate-800 bg-[#070d18] text-white p-7 sm:p-9 flex flex-col justify-between group cursor-pointer shadow-2xl hover:border-amber-500 transition-all duration-300 min-h-[520px]"
        >
          {/* Background Image - Clearly and Vibrantly Visible */}
          <div className="absolute inset-0 z-0 opacity-45 group-hover:opacity-55 transition-opacity duration-500">
            <Image
              src="/images/earthing-hero.png"
              alt="Structural Earthing"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Subtle gradient overlay to ensure text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-[#060a14]/75 to-[#060a14]/35 z-0 pointer-events-none" />

          {/* Card Content Top */}
          <div className="relative z-10 space-y-6">
            {/* Top Pill Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-wide border border-amber-500/60 bg-amber-950/60 text-amber-400 backdrop-blur-md shadow-sm">
                Structural Earthing
              </span>
              {/* <span className="text-xs font-semibold text-slate-200 bg-black/40 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full">
                {categoryCounts.STRUCTURAL_EARTHING ?? 1}{" "}
                {categoryCounts.STRUCTURAL_EARTHING === 1 ? "Product" : "Products"}
              </span> */}
            </div>

            {/* Main Title */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug drop-shadow-sm">
                Ground in <br />
                <span className="text-amber-400">
                  Structural Earthing
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-2 leading-relaxed font-normal drop-shadow-sm">
                Reliable structural earthing solutions designed for safe electrical grounding and fault dissipation.
              </p>
            </div>

            {/* 4 Feature Bullet Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="drop-shadow-sm">IS 3043:2018 Indian Earthing Standard</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
                <Lock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="drop-shadow-sm">Foundation Rebar Bonding &amp; Equipotential Bars</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
                <RefreshCw className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="drop-shadow-sm">High Conductivity Chemical Earth Electrodes</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-100 font-medium">
                <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="drop-shadow-sm">Exothermic Welding Kits &amp; Test Pits</span>
              </div>
            </div>
          </div>

          {/* Bottom Primary Button */}
          <div className="relative z-10 pt-8 mt-auto">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onSelectCategory("STRUCTURAL_EARTHING");
              }}
              className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-amber-500/25 cursor-pointer uppercase tracking-wider"
            >
              <span>Explore Structural Earthing</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
