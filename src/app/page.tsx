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
  BookOpen,
  ChevronRight,
} from "lucide-react";
import StandardsTab from "@/components/StandardsTab";
import FAQAccordion from "@/components/FAQAccordion";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "DFMHUB (DFM HUB) | Lightning Protection System & Structural Earthing Manufacturer",
  description:
    "Official website of DFMHUB (DFM HUB). We manufacture ARK Make lightning protection systems and structural earthing components — IS/IEC 62305 & IS 3043 design, supply, installation and testing across India.",
  keywords: [
    "DFMHUB",
    "DFM HUB",
    "DFM HUB Systems",
    "DFMHUB Engineering",
    "DFM HUB Lightning Protection",
    "DFMHUB Earthing",
  ],
  alternates: {
    canonical: "https://dfmhub.vercel.app",
  },
};

export default function HomePage() {
  const coreFeatures = [
    {
      icon: ShieldCheck,
      title: "IS/IEC 62305 Risk Assessment",
      desc: "Quantified risk study that fixes the protection level before a single component is priced.",
    },
    {
      icon: Compass,
      title: "Rolling Sphere Design",
      desc: "Air termination modelled on your actual roof geometry, not a generic rod-count rule of thumb.",
    },
    {
      icon: Factory,
      title: "In-House Manufacturing",
      desc: "ARK Make components produced and type-tested to IEC 62561 with batch traceability.",
    },
    {
      icon: Wrench,
      title: "Certified Installation",
      desc: "Trained crews for facade, roof and foundation work, with height-safety compliance.",
    },
    {
      icon: FileCheck2,
      title: "Documented Testing",
      desc: "Fall-of-potential earth resistance and continuity records for every electrode and test link.",
    },
    {
      icon: Zap,
      title: "Coordinated Surge Protection",
      desc: "Type 1, 2 and 3 SPD staging so transients never reach sensitive equipment.",
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

  return (
    <div className="w-full transition-colors duration-200">
      {/* Module 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#070d19] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d19] via-[#091325]/90 to-slate-900/60 z-10" />
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/lps-hero.png"
            alt="Lightning protection roof system"
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

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight">
              Lightning Protection Systems & Structural Earthing, engineered to{" "}
              <span className="text-amber-500 underline decoration-amber-500 underline-offset-8">
                IS/IEC 62305.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
              DFMHUB manufactures, designs, installs and tests complete lightning protection and earthing systems for data centres, pharma plants, high-rise towers and manufacturing facilities across India.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact-us"
                className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>REQUEST A FREE SITE ASSESSMENT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/lightning-protection-system"
                className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md border border-slate-700 transition-all flex items-center justify-center"
              >
                EXPLORE SYSTEMS
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
              <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-amber-500 block">24</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">SYSTEM COMPONENTS MANUFACTURED</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-amber-500 block">4</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">METRO ENGINEERING TEAMS</span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-4xl font-bold text-amber-500 block">100%</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">DOCUMENTED TEST HANDOVER</span>
            </div>
          </div>
        </div>
      </section>

      {/* Module 2: WHAT WE DO Section (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              WHAT WE DO
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              One accountable partner from risk assessment to signed test report
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed font-normal">
              Most lightning protection failures in India come from split responsibility — one party designs, another supplies, a third installs. DFMHUB owns the whole chain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-400/60 transition-all space-y-3 group"
                >
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
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Lightning Protection System — ARK Make
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    Air terminations, mesh and down conductors, test links, bonding and coordinated SPDs, designed by rolling sphere method to the protection level your risk assessment demands.
                  </p>
                </div>
                <Link
                  href="/lightning-protection-system"
                  className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider pt-2"
                >
                  VIEW THE SYSTEM <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>

            {/* Card 2: Structural Earthing */}
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="relative h-52 sm:h-64">
                <Image
                  src="/images/earthing-hero.png"
                  alt="Structural Earthing ARK Make"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Structural Earthing — ARK Make
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    Foundation rebar bonding, copper bonded and chemical electrodes, earth bars and enhancement compound sized from a Wenner soil resistivity survey to IS 3043:2018.
                  </p>
                </div>
                <Link
                  href="/structural-earthing"
                  className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider pt-2"
                >
                  VIEW THE SYSTEM <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Module 4: Compliance & Standards Section (DARK NAVY) */}
      <section className="w-full">
        <StandardsTab />
      </section>

      {/* Module 5: City Locations Section (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              LOCATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              City engineering teams across India
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 font-normal">
              Local survey, local installation crews and city-specific soil and storm data behind every design.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <div
                key={city.name}
                className="bg-slate-50 p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2 text-amber-600 mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      {city.state}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {city.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                    {city.sectors}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/80 space-y-2 text-xs font-medium">
                  <Link
                    href={city.lpsUrl}
                    className="block text-amber-600 hover:text-amber-700 hover:underline"
                  >
                    Lightning protection in {city.name} →
                  </Link>
                  <Link
                    href={city.earthingUrl}
                    className="block text-amber-600 hover:text-amber-700 hover:underline"
                  >
                    Structural earthing in {city.name} →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Module 6: Technical Blog Section (LIGHT GRAY) */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              INSIGHTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              From the DFMHUB technical blog
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 shadow-sm hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
                    {post.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-snug mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Module 7: FAQ Section (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10">
            Frequently asked questions
          </h2>
          <FAQAccordion />
        </div>
      </section>

      {/* Module 8: Talk to an Engineer / Quote Form (LIGHT GRAY) */}
      <section className="w-full bg-[#f1f5f9] text-slate-900 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

