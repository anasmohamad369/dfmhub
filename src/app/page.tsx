import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShieldCheck,
  Compass,
  Factory,
  Wrench,
  FileCheck2,
  Zap,
  ArrowRight,
  MapPin,
  ChevronRight,
  MessageCircle,
  FileSpreadsheet,
  CheckCircle2,
} from "lucide-react";
import StandardsTab from "@/components/StandardsTab";
import FAQAccordion from "@/components/FAQAccordion";
import ContactForm from "@/components/ContactForm";
import FeaturedProducts from "@/components/home/FeaturedProducts";

import { getDynamicMetadata, getDynamicHeroImage } from "@/lib/seo";

const defaultMetadata = {
  title: "ARK Make Lightning Protection & Earthing Systems | DFMHUB",
  description:
    "DFMHUB is India's premier manufacturer of ARK Make Lightning Protection and Structural Earthing Systems in Bengaluru. Engineered to IS 3043 & IEC 62305 standards. Connect with our pan-India dealer network for reliable B2B procurement.",
  keywords: [
    "Lightning Protection System manufacturer in India",
    "Structural Earthing System manufacturer",
    "ARK Make earthing products",
    "DFMHUB lightning protection",
    "Copper bonded earth rods manufacturer",
  ],
  alternates: {
    canonical: "https://www.dfmhub.com",
  },
};

export async function generateMetadata() {
  return await getDynamicMetadata("/", defaultMetadata);
}


export default async function HomePage() {
  const heroImage = await getDynamicHeroImage("/", "/images/lps-hero.png");

  const coreFeatures = [
    {
      icon: ShieldCheck,
      title: "IS/IEC 62305 Risk Assessment",
      desc: "Evaluate the structure and determine the appropriate protection level through our ARK-Guard Tool.",
    },
    {
      icon: Compass,
      title: "System Design & Engineering",
      desc: "Develop lightning protection and earthing solutions aligned with applicable standards and project requirements.",
    },
    {
      icon: Factory,
      title: "In-House Manufacturing",
      desc: "ARK Make components produced and type-tested to IEC 62561 with batch traceability.",
    },
    {
      icon: Wrench,
      title: "Installation & Commissioning",
      desc: "Execute installation with coordinated site-level responsibility.",
    },
    {
      icon: FileCheck2,
      title: "Testing & Verification",
      desc: "Verify system performance through appropriate electrical continuity and mechanical checks.",
    },
    {
      icon: Zap,
      title: "Documentation & Test Reports",
      desc: "Deliver drawings, test reports and project documentation required for CIEG/Equivalent Approvals.",
    },
  ];

  const cities = [
    {
      name: "Bengaluru",
      state: "Karnataka",
      sectors: "IT campuses & data centres, aerospace and defence units",
      lpsUrl: "/lightning-protection-system/bengaluru",
      earthingUrl: "/structural-earthing/bengaluru",
    },
    {
      name: "Chennai",
      state: "Tamil Nadu",
      sectors: "Automotive plants, port & petrochemical facilities",
      lpsUrl: "/lightning-protection-system/chennai",
      earthingUrl: "/structural-earthing/chennai",
    },
    {
      name: "Hyderabad",
      state: "Telangana",
      sectors: "Pharma & life sciences plants, data centres",
      lpsUrl: "/lightning-protection-system/hyderabad",
      earthingUrl: "/structural-earthing/hyderabad",
    },
    {
      name: "Pune",
      state: "Maharashtra",
      sectors: "Automotive & EV plants, engineering MIDC units",
      lpsUrl: "/lightning-protection-system/pune",
      earthingUrl: "/structural-earthing/pune",
    },
  ];

  const blogPosts = [
    {
      slug: "is-iec-62305-lightning-protection-design-guide",
      category: "Standards",
      title: "IS/IEC 62305 Lightning Protection Design: A Practical Guide for Indian Projects",
      excerpt:
        "How to run a risk assessment, pick a protection level, and translate rolling sphere radius into a buildable air termination layout.",
    },
    {
      slug: "earth-resistance-testing-methods-explained",
      category: "Testing",
      title: "Earth Resistance Testing: Fall-of-Potential, Clamp-On and Which One to Trust",
      excerpt:
        "The three field methods used on Indian sites, when each is valid, and the mistakes that produce falsely low readings.",
    },
    {
      slug: "structural-earthing-vs-conventional-earthing",
      category: "Earthing",
      title: "Structural Earthing vs Conventional Earth Pits: What Changes on a High-Rise",
      excerpt:
        "Using foundation reinforcement as an earth electrode lowers impedance, saves land and is explicitly permitted by IS 3043 and IEC 62305-3.",
    },
  ];

  const whatsappQuoteUrl = `https://wa.me/919483564777?text=${encodeURIComponent(
    "Hello DFMHUB Team, I would like to upload my quote/BOQ for a real rates price check."
  )}`;

  return (
    <div className="w-full transition-colors duration-200">
      {/* Module 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#070d19] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d19] via-[#091325]/90 to-slate-900/60 z-10" />
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src={heroImage}
            alt="Lightning Protection Systems & Structural Earthing"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>ARK MAKE · MANUFACTURED IN INDIA</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] tracking-tight">
              Lightning Protection Systems & Structural Earthing <br />
              <span className="text-amber-400 underline decoration-amber-500/50 underline-offset-8">
                Engineered to IS/IEC 62305.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
              DFMHUB manufactures, designs, installs and tests complete ARK Make - lightning protection and Structural earthing systems for Data centres, Sub Stations, high-rise towers and manufacturing facilities across India.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center justify-center space-x-2 border border-emerald-400/30 shrink-0"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>UPLOAD QUOTE & PRICE CHECK</span>
              </a>

              <Link
                href="/lightning-protection-system"
                className="h-14 px-6 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-center space-x-2 shadow-lg shrink-0"
              >
                <span>EXPLORE SYSTEMS</span>
                <ChevronRight className="w-5 h-5 text-amber-400" />
              </Link>
            </div>
          </div>

          {/* Metric Stats Banner */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-amber-500 block">1,200+</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">STRUCTURES PROTECTED</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-amber-500 block">24+</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">ARK MAKE COMPONENTS</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-amber-500 block">PAN-INDIA</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">DEALER NETWORK</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-amber-500 block">100%</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">DOCUMENTED HANDOVER</span>
            </div>
          </div>
        </div>
      </section>

      {/* Module 2: WHAT WE DO Section (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              WHAT WE DO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              From Lightning Risk to Protection —
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-normal">
              DFMHUB brings the entire chain under one roof from lightning risk assessment, system design and engineering to material supply, installation, testing and final documentation, we take end-to-end responsibility for the Earthing & Lightning protection system.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-400/60 transition-all space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-11 h-11 rounded-lg bg-amber-100/60 border border-amber-200 flex items-center justify-center text-amber-700 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Module 3: Featured Systems Showcase (LIGHT GRAY) */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Card 1: LPS */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative h-52 sm:h-64">
                <Image
                  src="/images/lps-hero.png"
                  alt="Lightning Protection System ARK Make"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                    IS/IEC 62305 COMPLIANT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Lightning Protection Systems
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Air termination mesh, down conductors, test points, and coordinated surge protection devices manufactured in-house to protect infrastructure against direct lightning strikes.
                  </p>
                </div>
                <Link
                  href="/lightning-protection-system"
                  className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider space-x-1"
                >
                  <span>Explore LPS Range & Cities</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Structural Earthing */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative h-52 sm:h-64">
                <Image
                  src="/images/lps-hero.png"
                  alt="Structural Earthing System ARK Make"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
                    IS 3043 & IEC 62561
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Structural Earthing Systems
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Foundation rebar bonding, copper bonded rods, chemical earth electrodes, exothermic welding kits, and earth inspection chambers built for maximum longevity.
                  </p>
                </div>
                <Link
                  href="/structural-earthing"
                  className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider space-x-1"
                >
                  <span>Explore Earthing Solutions</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: Featured Products Catalog */}
      <FeaturedProducts />

      {/* Standards Tab */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <StandardsTab />
        </div>
      </section>

      {/* Certifications & Accreditation Showcase */}
      <section className="w-full bg-[#eef4f8] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Our Certifications
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              Recognized and Accredited Achievements
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 flex items-center justify-center shadow-sm border border-slate-100 h-44 sm:h-48 group hover:shadow-md transition-shadow">
              <img
                src="/images/certifications/iso.png"
                alt="ISO 9001:2015 Certified Company"
                className="max-h-28 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 flex items-center justify-center shadow-sm border border-slate-100 h-44 sm:h-48 group hover:shadow-md transition-shadow">
              <img
                src="/images/certifications/ul.png"
                alt="UL Classified Grounding Conformance"
                className="max-h-28 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 flex items-center justify-center shadow-sm border border-slate-100 h-44 sm:h-48 group hover:shadow-md transition-shadow">
              <img
                src="/images/certifications/cpri.png"
                alt="CPRI Type Tested High Power Lab"
                className="max-h-28 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 flex items-center justify-center shadow-sm border border-slate-100 h-44 sm:h-48 group hover:shadow-md transition-shadow">
              <img
                src="/images/certifications/msme.png"
                alt="MSME Registered Govt of India"
                className="max-h-28 max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* View All Button */}
          <div className="flex justify-end pt-2">
            <Link
              href="/certification"
              className="inline-flex items-center justify-center bg-[#0052cc] hover:bg-[#0041b3] text-white font-semibold text-sm px-7 py-2.5 rounded-full shadow transition-colors"
            >
              View All
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-slate-50 text-slate-900 py-20 sm:py-28 border-t border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lightning Protection & Structural Earthing FAQs
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
              Everything you need to know about DFMHUB ARK Make products, standards compliance, design and services.
            </p>
          </div>

          <FAQAccordion />
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full bg-[#f1f5f9] text-slate-900 py-16 sm:py-24 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
