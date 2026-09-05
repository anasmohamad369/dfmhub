import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Award,
  FileCheck2,
  ArrowRight,
  ChevronRight,
  Lock,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import JsonLd from "@/components/JsonLd";
import { getDynamicMetadata } from "@/lib/seo";

const defaultMetadata = {
  title: "Certifications & Test Reports | CPRI, ISO 9001, UL, MSME | DFMHUB",
  description:
    "DFMHUB ARK Make Lightning Protection and Earthing Systems are certified to ISO 9001:2015, CPRI type-tested, UL classified, and compliant with IS 3043 & IEC 62305 standards.",
  keywords: [
    "CPRI earthing test report",
    "ISO 9001 earthing manufacturer",
    "UL classified earthing rod",
    "MSME earthing manufacturer India",
    "IEC 62561 test certificates",
    "DFMHUB certifications",
  ],
  alternates: {
    canonical: "https://www.dfmhub.com/certification",
  },
};

export async function generateMetadata() {
  return await getDynamicMetadata("/certification", defaultMetadata);
}

export default async function CertificationPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfmhub.com";

  const certificationLogos = [
    {
      title: "ISO 9001-2015",
      subtitle: "Certified Company",
      image: "/images/certifications/iso.png",
      desc: "Quality Management System Certification",
    },
    {
      title: "UL CLASSIFIED",
      subtitle: "Safety Conformance",
      image: "/images/certifications/ul.png",
      desc: "Tested to International Grounding Standards",
    },
    {
      title: "CPRI TESTED",
      subtitle: "High Power Lab Tested",
      image: "/images/certifications/cpri.png",
      desc: "Short-Circuit & 40 kA Fault Current Rated",
    },
    {
      title: "MSME REGISTERED",
      subtitle: "Govt of India Enterprise",
      image: "/images/certifications/msme.png",
      desc: "Registered Indian Manufacturer",
    },
    {
      title: "IEC 62561-2:2018",
      subtitle: "For Copper Bonded Rods",
      image: "/images/certifications/iec.png",
      desc: "250-Micron Copper Bonding Test",
    },
    {
      title: "IEC 62561-7:2018",
      subtitle: "For Earth Enhancing Compounds",
      image: "/images/certifications/iec.png",
      desc: "Backfill Conductive Mixture Test",
    },

    {
      title: "RoHS",
      // subtitle: "TCLP Leaching Procedure",
      image: "/images/certifications/rohs.png",
     
    },
    {
      title: "Eco Friendly",
      // subtitle: "TCLP Leaching Procedure",
      image: "/images/certifications/eco.png",
      
    }
  
    
  ];

  const schemas = [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Certifications",
          item: `${baseUrl}/certification`,
        },
      ],
    },
    {
      "@type": "Organization",
      name: "DFMHUB - ARK Make Systems",
      url: baseUrl,
      logo: `${baseUrl}/image.png`,
    },
  ];

  return (
    <div className="w-full bg-[#f4f8fb] dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-200">
      <JsonLd data={schemas} />

      {/* Light Theme Banner Header */}
      <section className="relative bg-gradient-to-b from-sky-100/70 via-blue-50/50 to-[#f4f8fb] dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 py-14 sm:py-20 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-amber-400">
              Home
            </Link>
            <span>/</span>
            <span className="text-blue-600 dark:text-amber-400 font-bold">Our Certifications</span>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Our Certifications
            </h1>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium">
              Recognized and Accredited Achievements
            </p>
          </div>
        </div>
      </section>

      {/* Main Certification Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {certificationLogos.map((item, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-between text-center space-y-4 group"
            >
              <div className="w-full space-y-4 flex flex-col items-center">
                {/* Logo Box */}
                <div className="w-full h-28 flex items-center justify-center p-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Info */}
                <div className="space-y-1">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-amber-400">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

    
      </section>
    </div>
  );
}
