import React from "react";
import Link from "next/link";
import {
  Factory,
  ShieldCheck,
  Award,
  Truck,
  Target,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
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
    canonical: "https://dfmhub.vercel.app/about-us",
  },
};

export default function AboutUsPage() {
  const trustPillars = [
    {
      icon: Factory,
      title: "Direct Manufacturing",
      desc: "No middlemen. We produce ARK Make systems in our Bengaluru plant, ensuring cost-efficiency, strict quality control, and scalable production for large projects.",
    },
    {
      icon: ShieldCheck,
      title: "Standard Compliance",
      desc: "All ARK Make products are precision-engineered to align with the latest national (IS 3043) and international (IEC 62305) electrical safety codes.",
    },
    {
      icon: Award,
      title: "Technical Authority",
      desc: "We provide high-level technical guidance on selecting the right structural earthing setups based on specific soil resistivities and structural designs.",
    },
    {
      icon: Truck,
      title: "National Availability",
      desc: "Our widespread dealer network ensures that contractors have reliable, rapid access to our inventory anywhere in the country, preventing project delays.",
    },
  ];

  return (
    <div className="w-full transition-colors duration-200 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Section 1: Page Header / Hero Banner */}
      <section className="w-full bg-[#081021] text-white py-16 sm:py-24 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-bold">About Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-tight max-w-4xl">
            Manufacturers of ARK Make Structural Earthing & Lightning Protection Systems
          </h1>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <a
              href="https://wa.me/919483564777?text=Hello%20DFMHUB%20Team,%20I%20want%20to%20enquire%20about%20ARK%20Make%20products."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md shadow-lg transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Connect on WhatsApp</span>
            </a>
            <Link
              href="/contact-us"
              className="bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md border border-slate-700 transition-all flex items-center justify-center space-x-1"
            >
              <span>Request Consultation</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: Our Mission */}
      <section className="w-full bg-white dark:bg-slate-900 py-12 sm:py-16 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-md sm:text-base lg:text-md text-slate-700 dark:text-slate-300 max-w-7xl leading-relaxed font-normal">
            DFMHUB is a premier Indian manufacturer and supplier of advanced electrical safety solutions, widely recognized by engineers and contractors for our flagship ARK Make product line. Headquartered with a state-of-the-art manufacturing facility in Bengaluru, we engineer, produce, and distribute industry-leading Lightning Protection Systems and Structural Earthing Systems.
          </p>
          <br />
          <p className="text-md sm:text-base text-slate-700 dark:text-slate-300 max-w-7xl leading-relaxed font-normal">
            Through a robust, pan-India dealer network, DFMHUB safeguards commercial, industrial, and residential infrastructure against electrical faults and direct lightning strikes, ensuring unwavering compliance with stringent national and international safety standards.
          </p>
          <br />
          <div className="bg-amber-500/10 dark:bg-amber-950/40 border border-amber-500/30 rounded-2xl p-8 sm:p-10 space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center space-x-3">
              <Target className="w-7 h-7 text-amber-600 dark:text-amber-400 shrink-0" />
              <span>Our Mission</span>
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              To manufacture and supply world-class electrical safety systems that protect lives, secure infrastructure, and empower India&apos;s rapid development, all while maintaining the absolute highest standards of engineering integrity through our ARK Make product line.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: In house Manufacturing & Pan-India Reach */}
      <section className="w-full bg-slate-100/70 dark:bg-slate-950 py-16 sm:py-20 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            In house Manufacturing & Pan-India Reach
          </h2>

          <div className="space-y-4 text-xs sm:text-sm lg:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal max-w-5xl">
            <p>
              Our operations are anchored by our primary manufacturing unit in Bengaluru, India&apos;s technological and industrial hub. Operating our own facility allows DFMHUB to maintain absolute control over the entire production lifecycle—from raw material sourcing and metallurgical testing to final quality assurance.
            </p>
            <p>
              Because infrastructure development happens everywhere, safety cannot be restricted by geography. DFMHUB operates a vast and highly responsive dealer network across India. Whether your project is breaking ground in Mumbai, Pune, Chennai, Hyderabad or a remote industrial corridor, an authorized DFMHUB distributor is nearby to ensure timely delivery, on-the-ground support, and seamless procurement of ARK Make products.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Why Indian Industries Trust DFMHUB */}
      <section className="w-full bg-white dark:bg-slate-900 py-16 sm:py-24 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-4xl space-y-3">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why Indian Industries Trust DFMHUB
            </h2>
            <p className="text-xs sm:text-sm lg:text-base text-slate-600 dark:text-slate-400">
              When structural engineers, electrical contractors, and procurement managers evaluate earthing manufacturers, DFMHUB stands out for four critical reasons:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-xl border border-slate-200 dark:border-slate-700/80 shadow-sm space-y-4 hover:border-amber-500/50 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="w-full bg-[#f1f5f9] dark:bg-slate-950 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
