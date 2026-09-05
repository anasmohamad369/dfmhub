import React from "react";
import { ShieldCheck, Award, Headphones, FileCheck2 } from "lucide-react";

export function RegistrationHeroSection() {
  return (
    <div className="lg:col-span-6 space-y-8">
      {/* Subheading Badge */}
      <div className="flex items-center gap-2">
        <span className="text-amber-600 dark:text-amber-500  text-md uppercase tracking-widest">
          Free Lightning Risk Assessment Tool
        </span>
        <div className="w-12 h-0.5 bg-amber-500/60 rounded-full" />
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1]">
        Assess Your Site&apos;s <br />
        <span className="text-amber-600 dark:text-amber-500">Lightning</span> Risk.
      </h1>

      {/* Sub-paragraph */}
      <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
        Use our free IS/IEC 62305 compliant tool to evaluate your site&apos;s lightning risk level and get instant engineering recommendations — no waiting, no callbacks.
      </p>

      {/* 3 Feature Badges */}
      <div className="grid grid-cols-3 gap-4 pt-2">
        <div className="flex flex-col items-start gap-2 border-r border-slate-200 dark:border-slate-800 pr-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white block">IS/IEC 62305</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">Standard Compliant</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 border-r border-slate-200 dark:border-slate-800 pr-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white block">Instant Results</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">No Waiting Required</span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white block">100% Free</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5">No Strings Attached</span>
          </div>
        </div>
      </div>

      {/* Bottom Card / Highlight Box */}
      <div className="bg-white/90 dark:bg-[#0b1329]/80 border border-amber-500/30 rounded-2xl p-5 flex items-center gap-4 shadow-xl shadow-amber-500/5 dark:shadow-none backdrop-blur-sm">
        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0">
          <FileCheck2 className="w-6 h-6" />
        </div>
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Complete Risk Report in Minutes
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
            Get a detailed assessment with actionable recommendations, powered by IS/IEC 62305 standards.
          </p>
        </div>
      </div>
    </div>
  );
}
