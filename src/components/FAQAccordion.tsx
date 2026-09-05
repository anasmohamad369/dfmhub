"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items?: FAQItem[];
}

export const homeFaqs: FAQItem[] = [
  {
    question: "What does DFMHUB manufacture?",
    answer:
      "DFMHUB manufactures ARK Make components for external lightning protection and structural earthing systems. The range includes air terminals, conductors, clamps, connectors, test links, earth electrodes, rebar bonding components and earthing accessories.",
  },
  {
    question: "Does DFMHUB provide complete lightning protection solutions?",
    answer:
      "Yes. DFMHUB supports lightning risk assessment, system design, BOQ preparation, ARK Make product supply, installation, testing and project documentation.",
  },
  {
    question: "Which standards are followed for lightning protection and earthing?",
    answer:
      "Systems are designed and evaluated against applicable requirements of IS/IEC 62305, IEC 62561, IS 3043, NBC 2016 and project-specific consultant specifications.",
  },
  {
    question: "Are ARK Make lightning protection components tested?",
    answer:
      "Applicable ARK Make components are tested against relevant IEC 62561 requirements. Product-specific test reports and technical documents can be submitted for consultant or procurement review.",
  },
  {
    question: "What is the difference between lightning protection and earthing?",
    answer:
      "A lightning protection system intercepts and safely conducts lightning current towards earth. The earthing system disperses the current into the ground and supports equipotential bonding. Both must be properly coordinated.",
  },
  {
    question: "Does every building require the same lightning protection system?",
    answer:
      "No. The design depends on the building’s location, dimensions, height, occupancy, construction, incoming services, rooftop equipment and calculated lightning risk. An assessment should be completed before selecting the protection method.",
  },
  {
    question: "Can DFMHUB review an existing LPS or earthing system?",
    answer:
      "Yes. DFMHUB can review existing installations, drawings and test reports and recommend inspections, continuity checks, earth resistance tests or corrective improvements.",
  },
  {
    question: "Is a free preliminary risk assessment available?",
    answer:
      "Yes. Customers can submit project details for an initial engineering review. A detailed IS/IEC 62305-2 calculation, site survey, certified report or final design may require a separately defined scope.",
  },
  {
    question: "Which industries does DFMHUB serve?",
    answer:
      "DFMHUB supports data centres, substations, high-rise buildings, manufacturing plants, warehouses, solar projects, commercial developments and other critical infrastructure projects.",
  },
  {
    question: "Does DFMHUB provide installation and testing support?",
    answer:
      "Yes. Support is available for installation, supervision, continuity testing, earth resistance measurement, inspection, commissioning and handover documentation, depending on the project scope.",
  },
  {
    question: "Can DFMHUB supply customised components?",
    answer:
      "Yes. Customised conductors, clamps, supports and earthing components can be evaluated based on approved drawings, material specifications, dimensions, quantities and testing requirements.",
  },
  {
    question: "Does DFMHUB supply products across India?",
    answer:
      "Yes. DFMHUB supports product supply and project requirements across India, with service coverage highlighted for Bengaluru, Chennai, Hyderabad and Pune.",
  },
  {
    question: "How can I request a quotation?",
    answer:
      "Share the project location, drawings, BOQ, technical specification and required quantities through the enquiry form or WhatsApp. The DFMHUB team will review the requirement and recommend suitable ARK Make products and services.",
  },
];

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const faqs = items || homeFaqs;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

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
    <div className="w-full space-y-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full py-6 px-6 sm:px-8 flex items-center justify-between text-left focus:outline-none hover:bg-slate-50/60 transition-colors cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-bold text-slate-900 pr-6 leading-snug">
                {faq.question}
              </span>
              <div
                className={`p-2 rounded-full bg-slate-100 shrink-0 transition-transform duration-300 ${
                  isOpen
                    ? "rotate-180 bg-amber-100 text-amber-600"
                    : "text-slate-500 hover:bg-slate-200"
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </div>
            </button>
            {isOpen && (
              <div className="px-6 sm:px-8 pb-7 pt-3 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100/80">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


