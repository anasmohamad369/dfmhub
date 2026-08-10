"use client";

import React from "react";

export default function StandardsTab() {
  const standards = [
    {
      code: "IS/IEC 62305 (Parts 1-4)",
      summary:
        "Risk assessment, physical damage protection, and protection of electrical & electronic systems.",
    },
    {
      code: "IS 3043:2018",
      summary:
        "Indian code of practice for earthing — electrode sizing, resistance limits and soil resistivity method.",
    },
    {
      code: "IEC 62561 (Parts 1-7)",
      summary:
        "Type-testing of LPS components: connections, conductors, electrodes, enhancing compounds and test links.",
    },
    {
      code: "NBC 2016, Part 8",
      summary:
        "National Building Code requirements for lightning protection of buildings in India.",
    },
    {
      code: "IEC 61643 / IS 16571",
      summary:
        "Selection and coordination of surge protective devices for low-voltage systems.",
    },
    {
      code: "NFPA 780 & NF C 17-102",
      summary:
        "International practice for LPS installation and early streamer emission terminals, where specified.",
    },
  ];

  return (
    <div className="w-full bg-[#060b14] text-white py-8 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Standards list */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-3">
                COMPLIANCE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                Standards we design and test against
              </h2>
            </div>

            <div className="space-y-6 pt-2">
              {standards.map((std) => (
                <div key={std.code} className="border-l-2 border-amber-500 pl-4 py-0.5">
                  <h4 className="font-bold text-amber-500 text-sm sm:text-base">
                    {std.code}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                    {std.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Site Image */}
          <div className="lg:col-span-6 h-full flex items-center justify-center">
            <div className="relative w-full h-[380px] sm:h-[480px] rounded-lg overflow-hidden border border-slate-800/80 shadow-2xl">
              <img
                src="/images/standards-installation.png"
                alt="Engineers installing lightning and earthing protection standards"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


