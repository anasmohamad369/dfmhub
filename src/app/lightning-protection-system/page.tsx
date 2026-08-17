import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, ShieldCheck, Zap, Layers, CheckCircle2, Info, Check, Link2, Building2, ClipboardCheck, FileText, Shield } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import {Testing} from "@/components/Testing";

export const metadata = {
  title: "Lightning Protection System Manufacturer in India | ARK Make by DFMHUB",
  description:
    "ARK Make Lightning Protection System by DFMHUB offers engineered air terminals, conductors, clamps, connectors and LPS components for industrial, commercial and infrastructure projects in India.",
  keywords:
    "lightning protection system, lightning protection system manufacturer, lightning protection system India, ARK lightning protection system, external lightning protection system, conventional lightning protection system, IEC 62305 lightning protection, IEC 62561 components, lightning protection products, DFMHUB lightning protection",
  alternates: {
    canonical: "https://dfmhub.vercel.app/lightning-protection-system",
  },
  openGraph: {
    title: "Lightning Protection System Manufacturer in India | ARK Make by DFMHUB",
    description:
      "ARK Make Lightning Protection System by DFMHUB offers engineered air terminals, conductors, clamps, connectors and LPS components for industrial, commercial and infrastructure projects in India.",
    url: "https://dfmhub.vercel.app/lightning-protection-system",
    siteName: "DFMHUB - ARK Lightning Protection Systems",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lightning Protection System Manufacturer in India | ARK Make by DFMHUB",
    description:
      "ARK Make Lightning Protection System by DFMHUB offers engineered air terminals, conductors, clamps, connectors and LPS components for industrial, commercial and infrastructure projects in India.",
  },
};

export default function LightningProtectionPage() {
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

  const lplMatrix = [
    { level: "LPL I", roman: "I", detail: "Highest level of protection for critical and high-risk structures." },
    { level: "LPL II", roman: "II", detail: "High level of protection for commercial and industrial buildings." },
    { level: "LPL III", roman: "III", detail: "Standard level of protection for common structures with moderate risk." },
    { level: "LPL IV", roman: "IV", detail: "Basic level of protection for structures with low lightning risk exposure." },
  ];

  const comparisonData = [
    {
      factor: "System approach",
      ark: "Complete LPS component range",
      generic: "May be individual components",
    },
    {
      factor: "Design basis",
      ark: "IEC 62305 engineering approach",
      generic: "Depends on supplier",
    },
    {
      factor: "Component standard",
      ark: "Applicable IEC 62561 requirements",
      generic: "Must be independently verified",
    },
    {
      factor: "Material specification",
      ark: "Defined by product datasheet",
      generic: "May vary",
    },
    {
      factor: "Testing documentation",
      ark: "Available for applicable tested products",
      generic: "Availability varies",
    },
    {
      factor: "Engineering support",
      ark: "Available",
      generic: "Supplier dependent",
    },
    {
      factor: "Risk assessment support",
      ark: "Available",
      generic: "May not be available",
    },
    {
      factor: "Product selection support",
      ark: "Available",
      generic: "Varies",
    },
    {
      factor: "Installation support",
      ark: "Available",
      generic: "Varies",
    },
    {
      factor: "Project documentation",
      ark: "Can be provided based on scope",
      generic: "Varies",
    },
  ];

  const components = [
    {
      title: "Air Terminal Rod",
      spec: "ARK-AT01",
      desc: "Solid copper, aluminium and stainless-steel finials with machined multi-point tips, supplied in 0.5 m to 3 m lengths to IS/IEC 62305-3 rolling sphere design.",
    },
    {
      title: "8mm Aluminium Down Conductor",
      spec: "ARK-AL08",
      desc: "Solid aluminium round conductor for roof-level air-termination meshes and down-conductor routes in external lightning protection systems.",
    },
    {
      title: "Parapet Holder Clamps",
      spec: "ARK-PH08",
      desc: "UV-resistant conductor holder for securing 8 mm round conductors along parapets while maintaining a neat and stable routing arrangement.",
    },
    {
      title: "Standing Seam Holder Clamp",
      spec: "ARK-SS01",
      desc: "Clamp arrangement for routing lightning protection conductors on standing-seam metal roofs with secure mechanical fixing.",
    },
    {
      title: "Metal Roof Holder Clamp",
      spec: "ARK-SS02",
      desc: "Conductor fixing clamp designed for secure routing of lightning protection conductors across suitable metal roofing systems.",
    },
    {
      title: "Roof Conductor Holder Clamp",
      spec: "ARK-SS03",
      desc: "Roof-mounted holder for maintaining stable positioning and defined routing of round conductors across suitable roof surface.",
    },
    {
      title: "Cross Connector Clamp",
      spec: "ARK-CRS01",
      desc: "SS connector for secure cross-connections between compatible 8-10 mm round conductors in lightning protection networks.",
    },
    {
      title: "Straight Connectors",
      spec: "ARK-SL01",
      desc: "Straight connector for electrically and mechanically joining 8–10 mm round conductors to create continuous LPS conductor routes.",
    },
    {
      title: "Test Joint",
      spec: "ARK-TL01",
      desc: "Disconnect able test joint for connecting round conductors while providing an accessible point for inspection and electrical testing.",
    },
    {
      title: "Multi-Point Bonding",
      spec: "ARK-EQ01",
      desc: "Equipotential bonding bar for connecting metallic services, LPS conductors and other bonding connections to a common equipotential point, helping reduce dangerous potential differences during lightning events.",
    },
    {
      title: "Down Conductor Holder Clamp",
      spec: "ARK-ST01",
      desc: "Stainless steel fixing clamp for supporting and routing compatible flat conductor strips along walls and structural surfaces.",
    },
    {
      title: "Lightning Flash Counter",
      spec: "ARK-LC01",
      desc: "LPS inspection, maintenance records and post-strike assessment without requiring an external power supply.",
    },
  ];

  const cities = [
    { name: "Bengaluru", state: "Karnataka · South India", url: "/lightning-protection-system/bengaluru" },
    { name: "Chennai", state: "Tamil Nadu · South India", url: "/lightning-protection-system/chennai" },
    { name: "Hyderabad", state: "Telangana · South India", url: "/lightning-protection-system/hyderabad" },
    { name: "Pune", state: "Maharashtra · West India", url: "/lightning-protection-system/pune" },
  ];

  const lpsFaqs = [
    {
      question: "What is a Lightning Protection System?",
      answer:
        "A Lightning Protection System is an engineered arrangement used to intercept lightning and provide a controlled path for lightning current, reducing the risk of physical damage to a structure and danger to people.",
    },
    {
      question: "What are the main components of a Lightning Protection System?",
      answer:
        "The principal external LPS elements are the air-termination system, down-conductor system and earth-termination system. The complete protection concept can also require equipotential bonding and surge protection measures.",
    },
    {
      question: "What standard is used for Lightning Protection System design?",
      answer:
        "IEC 62305 is one of the principal international standards used for lightning protection design and risk management. Applicable Indian standards, NBC provisions and project specifications should also be checked.",
    },
    {
      question: "What is IEC 62561?",
      answer:
        "IEC 62561 is a series of standards covering Lightning Protection System Components. Different parts address different component categories.",
    },
    {
      question: "What is IEC 62561-1?",
      answer:
        "IEC 62561-1 specifies requirements and tests for metallic LPS connection components such as clamps, connectors, bonding and bridging components, expansion pieces and test joints.",
    },
    {
      question: "What is the Rolling Sphere Method?",
      answer:
        "The Rolling Sphere Method is an IEC 62305 design method used to identify parts of a structure that may be exposed to direct lightning strikes and to determine suitable air-termination locations.",
    },
    {
      question: "What are LPL I, II, III and IV?",
      answer:
        "They are Lightning Protection Levels defined within the IEC 62305 framework. LPL I uses the most stringent lightning protection parameters, followed by LPL II, III and IV.",
    },
    {
      question: "Does every building require the same Lightning Protection Level?",
      answer:
        "No. The appropriate protection measures should be determined through risk assessment and applicable regulatory/project requirements.",
    },
    {
      question: "Is an air terminal alone a complete Lightning Protection System?",
      answer:
        "No. An air terminal is only part of the system. A properly engineered external LPS also requires down conductors, connections and an earth-termination arrangement.",
    },
    {
      question: "Does ARK Make provide only products?",
      answer:
        "No. DFMHUB can support product supply as well as LPS engineering, product selection, BOQ preparation, technical documentation and installation guidance depending on project scope.",
    },
    {
      question: "Can ARK Make LPS be used for data centres?",
      answer:
        "Yes, ARK LPS components can form part of lightning protection designs for data centres. Such facilities require careful coordination of external LPS, bonding, separation distance and surge protection because of their sensitive electronic infrastructure.",
    },
    {
      question: "Is ARK Make suitable for solar projects?",
      answer:
        "ARK Make components can be used for appropriately engineered solar-project LPS applications, subject to project design, material compatibility and consultant specifications.",
    },
    {
      question: "How do I select a Lightning Protection System manufacturer?",
      answer:
        "Compare manufacturers based on engineering capability, applicable test documentation, material specifications, component compatibility, manufacturing quality, technical support and ability to provide traceable documentation—not price alone.",
    },
    {
      question: "Where are ARK Make Lightning Protection products manufactured?",
      answer:
        "ARK Make is the Lightning Protection System product brand of DFMHUB, an Indian manufacturer with its manufacturing facility in Bengaluru.",
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": lpsFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://dfmhub.vercel.app/",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Lightning Protection System",
        "item": "https://dfmhub.vercel.app/lightning-protection-system",
      },
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "DFMHUB",
    "url": "https://dfmhub.vercel.app/",
    "description": "ARK Make Lightning Protection System by DFMHUB offers engineered air terminals, conductors, clamps, connectors and LPS components.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "addressCountry": "IN",
    },
  };

  return (
    <div className="w-full transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#081021] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/lps-hero.png"
            alt="Lightning protection roof system"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#081021] via-[#081021]/90 to-transparent z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-amber-400">Home</Link>
              <span>&gt;</span>
              <span className="text-amber-400 font-bold">Lightning Protection System</span>
            </div>

            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
              ARK MAKE · LIGHTNING PROTECTION SYSTEM
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Complete lightning protection systems, designed to the level your risk assessment demands
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
              ARK Lightning Protection System by DFMHUB offers engineered external LPS components, design support, testing and installation solutions aligned with IEC 62305 and IEC 62561.            </p>

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
        </div>
      </section>

      {/* Section 2: INTRODUCTION & COMPLIANCE (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-10">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              INTRODUCTION & COMPLIANCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              What is a Lightning Protection System?
            </h2>
            <p className="text-base sm:text-lg text-slate-700 max-w-4xl leading-relaxed font-normal">
              A Lightning Protection System (LPS) is an engineered system designed to intercept a direct lightning strike and provide a controlled path for lightning current to flow safely without causing unacceptable physical damage to the structure.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Detailed Content Paragraphs */}
            <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              <p>
                ARK – Lightning Protection System by DFMHUB consists of: <strong className="text-slate-900 font-semibold">Air-Termination System</strong> → <strong className="text-slate-900 font-semibold">Down-Conductor System</strong> → <strong className="text-slate-900 font-semibold">Connection & Fixing Components</strong> → <strong className="text-slate-900 font-semibold">Earth-Termination System</strong>
              </p>
              <p>
                Protection against electrical and electronic system failures caused by lightning electromagnetic effects requires additional measures, including appropriate bonding, separation and surge protective measures.
              </p>
              <p>
                ARK is not positioned as simply a collection of clamps and conductors. The objective is to provide an engineered LPS solution—from risk assessment and design to component selection, installation support, inspection and testing.
              </p>
              <p>
                The system is designed around the principles of <strong className="font-bold text-slate-900">IEC 62305</strong> and uses lightning protection components selected and tested with reference to applicable parts of the <strong className="font-bold text-slate-900">IEC 62561</strong> series.
              </p>
            </div>

            {/* Image Column */}
            <div className="lg:col-span-6">
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden shadow-xl border border-slate-200">
                <Image
                  src="/images/lps-components-flatlay.png"
                  alt="ARK Make LPS components type-tested hardware flatlay"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2.5: COMPARISON EVALUATION (LIGHT GRAY) */}
      <section className="w-full bg-slate-50 text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              COMPARISON EVALUATION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              ARK Lightning Protection System vs Generic Lightning Protection Components
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Instead of comparing products only on price, EPCs and consultants should evaluate whether the components support the engineering requirements of the complete LPS.
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white mb-10">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 px-6 bg-slate-100/90 text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider w-1/3">
                      Evaluation Factor
                    </th>
                    <th className="py-4 px-6 bg-amber-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider w-1/3">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-white" />
                        <span>ARK Approach</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider w-1/3">
                      Typical Unspecified/Generic Product
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={row.factor}
                      className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/80 transition-colors" : "bg-slate-50/40 hover:bg-slate-50 transition-colors"}
                    >
                      <td className="py-4 px-6 font-semibold text-slate-900 border-r border-slate-100">
                        {row.factor}
                      </td>
                      <td className="py-4 px-6 text-amber-900 font-medium bg-amber-50/30 border-r border-slate-100">
                        <span className="inline-flex items-center gap-1.5 text-amber-700 font-semibold">
                          <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          {row.ark}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {row.generic}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Important Callout Alert Box */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-5 sm:p-6 shadow-sm flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Important Note:</span>
              This comparison does not imply that every competing product is non-compliant. Consultants and buyers should compare manufacturers using the same criteria: material specification, applicable test reports, dimensional consistency, standards, traceability, installation requirements and engineering support.
            </div>
          </div>
        </div>
      </section>



      <Testing matrix={lplMatrix} />

      

      {/* Section 4: 12 ARK MAKE COMPONENTS (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              SYSTEM COMPONENTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              ARK - External Lightning Protection Components
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Every item is manufactured or sourced against IEC 62561 type-test evidence and supplied with batch traceability.
            </p>
           
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {components.map((comp) => (
              <div
                key={comp.title}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col"
              >
                <div className="bg-[#09101f] text-white p-4">
                  <h3 className="font-bold text-sm sm:text-base text-white">
                    {comp.title}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-bold text-amber-400 uppercase tracking-wider block mt-1">
                    {comp.spec}
                  </span>
                </div>
                <div className="p-5 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal flex-grow bg-white">
                  {comp.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: LOCATIONS (LIGHT GRAY) */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              LOCATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-1">
              Lightning protection by city
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              City-specific soil, storm data and installation teams.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cities.map((city) => (
              <Link
                key={city.name}
                href={city.url}
                className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-400 transition-all block group"
              >
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Lightning Protection System in {city.name}
                </h3>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  {city.state}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: FAQ (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10">
            Lightning protection — frequently asked questions
          </h2>
          <FAQAccordion items={lpsFaqs} />
        </div>
      </section>

      {/* Section 7: TALK TO AN ENGINEER / FORM (LIGHT GRAY) */}
      <section className="w-full bg-[#f1f5f9] text-slate-900 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

