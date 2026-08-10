import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Technical Blog | Lightning Protection & Earthing | DFMHUB",
  description:
    "Standards interpretation, field test methods and design decisions — written for facility managers, consultants and electrical contractors working in India.",
};

export default function BlogIndexPage() {
  const posts = [
    {
      slug: "is-iec-62305-lightning-protection-design-guide",
      category: "STANDARDS",
      readTime: "8 MIN READ",
      title: "IS/IEC 62305 Lightning Protection Design: A Practical Guide for Indian Projects",
      summary:
        "How to run a risk assessment, pick a protection level, and translate rolling sphere radius into a buildable air termination layout.",
      date: "14 July 2026",
    },
    {
      slug: "earth-resistance-testing-fall-of-potential-clamp-on",
      category: "TESTING",
      readTime: "6 MIN READ",
      title: "Earth Resistance Testing: Fall-of-Potential, Clamp-On and Which One to Trust",
      summary:
        "The three field methods used on Indian sites, when each is valid, and the mistakes that produce falsely low readings.",
      date: "2 June 2026",
    },
    {
      slug: "structural-earthing-vs-conventional-earth-pits",
      category: "EARTHING",
      readTime: "7 MIN READ",
      title: "Structural Earthing vs Conventional Earth Pits: What Changes on a High-Rise",
      summary:
        "Using foundation reinforcement as an earth electrode lowers impedance, saves land and is explicitly permitted by IS 3043 and IEC 62305-3.",
      date: "21 April 2026",
    },
    {
      slug: "spd-coordination-why-one-surge-device-at-panel-is-never-enough",
      category: "SURGE PROTECTION",
      readTime: "5 MIN READ",
      title: "SPD Coordination: Why One Surge Device at the Panel Is Never Enough",
      summary:
        "Type 1, Type 2 and Type 3 devices do different jobs. Here is how to stage them across an Indian LT distribution.",
      date: "8 March 2026",
    },
    {
      slug: "annual-lps-maintenance-checklist-facility-teams",
      category: "MAINTENANCE",
      readTime: "4 MIN READ",
      title: "Annual LPS Maintenance Checklist for Facility Teams",
      summary:
        "A visual and instrumented inspection routine that keeps your system compliant and your insurance valid.",
      date: "11 February 2026",
    },
  ];

  return (
    <div className="w-full transition-colors duration-200">
      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#081021] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-400">Home</Link>
            <span>&gt;</span>
            <span className="text-amber-400 font-bold">Blog</span>
          </div>

          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
            BLOG
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Lightning protection and earthing, explained by the engineers who install it
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
            Standards interpretation, field test methods and design decisions — written for facility managers, consultants and electrical contractors working in India.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact-us"
              className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <span>GET A FREE DESIGN CONSULTATION</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/installation-services"
              className="bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md border border-slate-700 transition-all flex items-center justify-center"
            >
              INSTALLATION SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Blog Grid (LIGHT GRAY) */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-400/80 transition-all block group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 uppercase tracking-wider mb-3">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span className="text-slate-400 font-semibold">{post.readTime}</span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug mb-3">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-6">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                  <span>{post.date}</span>
                  <span className="font-bold text-amber-600 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Form Section (LIGHT GRAY) */}
      <section className="w-full bg-[#f1f5f9] text-slate-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
