"use client";

import { Building2, ClipboardCheck, FileText, Link2, Shield, Zap } from "lucide-react";
import { useState, useEffect } from "react";

export const Testing = ({matrix}: {matrix: any}) => {
    return (
        <>
             <section className="w-full bg-[#040812] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2">
              DESIGN & TESTING STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              The codes every ARK Make system is built to
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed font-normal">
              Designed as per IEC 62305 and tested in line with IEC 62561 series, ARK Make Lightning Protection Systems ensure reliable lightning protection for structures, people and critical systems.
            </p>
          </div>

          {/* 6 Standards Grid with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 pt-2">
            {/* Standard 1 */}
            <div className="flex items-start gap-4">
              <div className="relative w-10 h-10 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
                <Shield  className="w-10 h-10 stroke-[1.5]" />
                <Zap className="w-4 h-4 fill-amber-500 text-amber-500 absolute stroke-[1.5]" />
              </div>
              <div className="border-l-2 border-amber-500/80 pl-4 py-0.5 space-y-1">
                <h3 className="font-bold text-amber-400 text-sm sm:text-base tracking-wide">
                  IEC 62305 (Parts 1–4)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Risk management, physical damage protection, and protection of electrical & electronic systems.
                </p>
              </div>
            </div>

            {/* Standard 2 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
                <svg className="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v10" />
                  <path d="M4 12h16" />
                  <path d="M7 16h10" />
                  <path d="M10 20h4" />
                </svg>
              </div>
              <div className="border-l-2 border-amber-500/80 pl-4 py-0.5 space-y-1">
                <h3 className="font-bold text-amber-400 text-sm sm:text-base tracking-wide">
                  IS 3043:2018
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Indian code of practice for earthing – electrode sizing, resistance limits and soil resistivity method.
                </p>
              </div>
            </div>

            {/* Standard 3 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
                <Link2 className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="border-l-2 border-amber-500/80 pl-4 py-0.5 space-y-1">
                <h3 className="font-bold text-amber-400 text-sm sm:text-base tracking-wide">
                  IEC 62561 (Parts 1–7)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Requirements and tests for LPS components: connection components, conductors, electrodes, enhancing compounds and test links.
                </p>
              </div>
            </div>

            {/* Standard 4 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
                <Building2 className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="border-l-2 border-amber-500/80 pl-4 py-0.5 space-y-1">
                <h3 className="font-bold text-amber-400 text-sm sm:text-base tracking-wide">
                  NBC 2016, Part 8
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  National Building Code requirements for lightning protection of buildings in India.
                </p>
              </div>
            </div>

            {/* Standard 5 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
                <ClipboardCheck className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="border-l-2 border-amber-500/80 pl-4 py-0.5 space-y-1">
                <h3 className="font-bold text-amber-400 text-sm sm:text-base tracking-wide">
                  IEC 61643 / IS 16571
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  Selection and coordination of surge protective devices for low-voltage systems.
                </p>
              </div>
            </div>

            {/* Standard 6 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center shrink-0 text-amber-500 mt-0.5">
                <FileText className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="border-l-2 border-amber-500/80 pl-4 py-0.5 space-y-1">
                <h3 className="font-bold text-amber-400 text-sm sm:text-base tracking-wide">
                  NFPA 780 & NFC 17-102
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  International practice for LPS installation and early streamer emission terminals, where specified.
                </p>
              </div>
            </div>
          </div>

          {/* LPL Level Matrix */}
          <div className="pt-8 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-slate-800/80">
            {matrix.map((item : any, idx : any) => (
              <div key={item.level} className={`flex items-start gap-3.5 ${idx !== 0 ? 'lg:pl-6' : ''}`}>
                <div className="relative w-10 h-10 flex items-center justify-center shrink-0 text-amber-500">
                  <Shield className="w-10 h-10 stroke-[1.5]" />
                  <span className="absolute font-bold text-amber-400 text-xs">{item.roman}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm sm:text-base font-bold text-amber-400">
                    {item.level}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 leading-normal font-normal">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Banner Callout */}
          <div className="border border-amber-500/80 rounded-xl p-5 bg-[#08101e] flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center shrink-0 text-amber-400">
              <svg className="w-9 h-9 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">
                ENGINEERED FOR COMPLIANCE. BUILT FOR RELIABILITY.
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Each ARK Make component is designed, tested and manufactured to meet the relevant national and international standards for reliable performance in Indian soil conditions and tropical climates.
              </p>
            </div>
          </div>
        </div>
      </section>
        </>
    );
};