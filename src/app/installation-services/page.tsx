import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
  title: "LPS & Earthing Installation Services | DFMHUB",
  description:
    "Directly employed installation crews for roof, facade and foundation lightning protection work with height-safety compliance, Fall-of-Potential testing & handover certification across India.",
};

export default function InstallationServicesPage() {
  const stages = [
    {
      step: "01 · Site survey",
      desc: "Structure measurement, roof equipment mapping, facade route study and Wenner four-pin soil resistivity readings at multiple spacings.",
    },
    {
      step: "02 · Risk assessment",
      desc: "IS/IEC 62305-2 calculation of R1 against tolerable risk, producing the required Lightning Protection Level and SPD class.",
    },
    {
      step: "03 · System design",
      desc: "Rolling sphere or mesh modelling, down conductor spacing, electrode sizing, bonding schedule, SPD coordination and a full bill of materials.",
    },
    {
      step: "04 · Manufacture & dispatch",
      desc: "ARK Make components produced to the approved BOM with IEC 62561 test certificates and batch traceability.",
    },
    {
      step: "05 · Installation",
      desc: "Air terminals, conductors and fixings; exothermic welds; earth pits and chambers; equipotential bonding; SPD wiring — by directly employed, height-certified crews.",
    },
    {
      step: "06 · Testing & handover",
      desc: "Fall-of-potential earth resistance per electrode, continuity across every test link, as-built drawings and a compliance pack.",
    },
  ];

  const scopeItems = [
    {
      title: "Lightning protection installation",
      desc: "Air termination networks, down conductors, test links, strike counters and coordinated Type 1/2/3 SPD sets.",
    },
    {
      title: "Structural earthing installation",
      desc: "Foundation rebar bonding, driven and deep-bore electrodes, grid mats, earth bars and enhancement compound backfill.",
    },
    {
      title: "Exothermic welding",
      desc: "Certified operators for copper-to-copper, copper-to-rebar and cable-to-structure molecular joints.",
    },
    {
      title: "Testing & certification",
      desc: "Earth resistance, soil resistivity, continuity and touch/step potential assessment with instrument-traceable reports.",
    },
    {
      title: "Compliance audits",
      desc: "Gap analysis of existing systems against IS/IEC 62305, IS 3043 and NBC 2016 Part 8, with a prioritised remediation scope.",
    },
    {
      title: "Annual maintenance",
      desc: "Scheduled inspection, re-testing and reporting to keep certification and insurance cover valid.",
    },
  ];

  const controls = [
    "Job-specific method statement and risk assessment issued before mobilisation",
    "Permit-to-work coordination with plant EHS teams, including hot-work permits for exothermic welding",
    "Stage-wise inspection sign-off before concealment of any buried or embedded conductor",
    "Full-body harness, twin lanyard and anchor-point plan for all roof and facade work",
    "Calibrated earth testers with certificates valid at the time of testing",
    "Photographic record of every welded joint and electrode before backfilling",
  ];

  const installationFaqs = [
    {
      question: "What is included in a DFMHUB installation package?",
      answer:
        "Site survey and soil resistivity testing, IS/IEC 62305-2 risk assessment, system design drawings, supply of ARK Make components, mechanical installation, bonding and SPD wiring, earth resistance and continuity testing, as-built drawings and a compliance handover pack.",
    },
    {
      question: "How long does a lightning protection installation take?",
      answer:
        "A typical commercial building takes 5 to 12 working days after material dispatch. Industrial sheds and multi-block campuses run two to six weeks, phased so plant operations continue.",
    },
    {
      question: "Can installation be done on an occupied or operating facility?",
      answer:
        "Yes. Roof and facade work is planned around shifts, with permit-to-work, height-safety harness systems and hot-work controls. Only the final bonding and SPD connections need a brief planned shutdown.",
    },
    {
      question: "Do you retrofit or repair existing lightning protection systems?",
      answer:
        "We audit existing installations against IS/IEC 62305, report on missing down conductors, broken bonds, corroded electrodes and uncoordinated SPDs, then quote a remediation scope with re-testing.",
    },
    {
      question: "Do you provide annual maintenance contracts?",
      answer:
        "Yes. AMC covers visual inspection, continuity testing across every test link, earth resistance measurement at each electrode, SPD status verification, strike counter logging and an updated compliance report.",
    },
    {
      question: "What documentation do we receive at handover?",
      answer:
        "As-built drawings, earth resistance and continuity test reports, IEC 62561 material test certificates, SPD datasheets, the risk assessment record and a signed compliance statement for fire NOC, insurance and client audits.",
    },
  ];

  return (
    <div className="w-full transition-colors duration-200">
      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#081021] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/standards-installation.png"
            alt="Engineers installing lightning protection system"
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
              <span className="text-amber-400 font-bold">Installation Services</span>
            </div>

            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
              INSTALLATION SERVICES
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Installation, testing and certification for LPS and structural earthing
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
              Directly employed crews, method statements, height-safety compliance and instrument-traceable test records — delivered as one accountable scope alongside our manufacturing.
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
        </div>
      </section>

      {/* Section 2: PROCESS (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Six stages from survey to signed handover
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stages.map((stg) => (
              <div
                key={stg.step}
                className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col space-y-3"
              >
                <span className="text-sm font-bold text-amber-600 block">
                  {stg.step}
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {stg.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: SCOPE (LIGHT GRAY) */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              SCOPE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              What our crews execute on site
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scopeItems.map((item) => (
              <div
                key={item.title}
                className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-2"
              >
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: SAFETY & QUALITY (DARK NAVY) */}
      <section className="w-full bg-[#060b14] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2">
              SAFETY & QUALITY
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              How work is controlled on site
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {controls.map((ctrl, i) => (
              <div key={i} className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300 font-normal">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <span className="leading-relaxed">{ctrl}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: FAQ (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10">
            Installation services — questions we get asked
          </h2>
          <FAQAccordion items={installationFaqs} />
        </div>
      </section>

      {/* Section 6: TALK TO AN ENGINEER / FORM (LIGHT GRAY) */}
      <section className="w-full bg-[#f1f5f9] text-slate-900 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

