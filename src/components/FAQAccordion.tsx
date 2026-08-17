"use client";

import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const defaultFaqs = [
    {
      question: "What does DFMHUB manufacture?",
      answer:
        "DFMHUB manufactures ARK Make lightning protection system components — air terminals, conductors, clamps, test links, surge protection devices — and a full structural earthing range including copper bonded rods, chemical electrodes, exothermic weld kits, earth bars and inspection chambers, all type-tested to IEC 62561.",
    },
    {
      question: "Which standards do DFMHUB systems comply with?",
      answer:
        "Every system is designed and installed to IS/IEC 62305 Parts 1-4, IS 3043:2018, IEC 62561 Parts 1-7, National Building Code 2016 Part 8, and IEC 61643 for surge protection. NFPA 780 and NF C 17-102 are followed where a project specification calls for them.",
    },
    {
      question: "Do you provide installation as well as materials?",
      answer:
        "Yes. DFMHUB offers a single-source package: risk assessment, system design, manufactured components, site installation by trained crews, earth resistance and continuity testing, and a documented handover pack for fire NOC, insurance and audit purposes.",
    },
    {
      question: "Which cities does DFMHUB serve?",
      answer:
        "We deliver projects across India with dedicated engineering teams for Bengaluru, Chennai, Hyderabad and Pune, and supply ARK Make products nationwide to EPC and electrical contractors.",
    },
    {
      question: "How do I get a lightning protection quote?",
      answer:
        "Share your roof plan, structure height, occupancy type and soil data through the enquiry form or call +91 94835 64777. DFMHUB returns a risk assessment summary, layout drawing, bill of materials and a fixed-price proposal, usually within one working day.",
    },
  ];

  const faqs = items || defaultFaqs;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <div className="w-full space-y-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border-b border-slate-200/90 pb-6 text-left"
        >
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
            {faq.question}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed max-w-5xl">
            {faq.answer}
          </p>
        </div>
      ))}
    </div>
  );
}


