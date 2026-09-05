import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      title: "RoHS Compliant",
      subtitle: "Hazardous Substance Free",
      image: "/images/certifications/rohs.png",
      desc: "Environmental Safety Standards",
    },
    {
      title: "Eco Friendly",
      subtitle: "Non-Leaching Tested",
      image: "/images/certifications/eco.png",
      desc: "Eco Non-Hazardous Compound",
    },
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
    <div className="w-full transition-colors duration-200">
      <JsonLd data={schemas} />

      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#081021] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-400">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-amber-400 font-bold">Certifications</span>
          </div>

          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
            QUALITY ASSURANCE &amp; ACCREDITATIONS
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight max-w-4xl">
            Recognized and Accredited Quality Certifications
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-3xl font-normal">
            DFMHUB ARK Make Lightning Protection and Earthing Systems are certified to ISO 9001:2015, CPRI type-tested, UL classified, and compliant with IS 3043 &amp; IEC 62305 standards.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/tool"
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

      {/* Section 2: Certification Cards Grid */}
      <section className="w-full bg-[#f8fafc] dark:bg-[#070d19] text-slate-900 dark:text-slate-100 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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
                    {item.subtitle && (
                      <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {item.subtitle}
                      </p>
                    )}
                    {item.desc && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Contact Form Section */}
      <section className="w-full bg-[#f1f5f9] dark:bg-[#040914] text-slate-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
