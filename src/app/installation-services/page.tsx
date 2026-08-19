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
      question:
        "What is structural earthing and lightning protection system installation?",
      answer:
        "Structural earthing and lightning protection installation involves creating a coordinated electrical path through the building's earthing, bonding and lightning protection network. The installation follows approved drawings and includes site coordination, inspection, testing and final documentation.",
    },
    {
      question:
        "Does DFMHUB provide structural earthing and lightning protection installation?",
      answer:
        "Yes. DFMHUB provides integrated structural earthing and lightning protection installation and testing support based on approved project drawings, BOQ, technical specifications and consultant requirements.",
    },
    {
      question: "Can DFMHUB install a system designed by another consultant?",
      answer:
        "Yes. DFMHUB can execute an approved structural earthing and lightning protection design prepared by the project's consultant, designer or EPC team.",
    },
    {
      question: "What testing is carried out after installation?",
      answer:
        "Depending on project requirements, testing can include electrical continuity testing, earth resistance testing, visual inspection, test-joint inspection, connection verification and installation quality checks.",
    },
    {
      question: "Why is continuity testing important in structural earthing?",
      answer:
        "Continuity testing helps confirm that designated earthing, bonding and lightning-current paths are electrically interconnected and that there are no unintended breaks in the installed network.",
    },
    {
      question:
        "What is checked during a lightning protection system inspection?",
      answer:
        "An inspection typically checks conductor routing, connections, fixing quality, mechanical damage, corrosion, bonding points, test joints, accessibility and overall compliance with the approved installation drawings.",
    },
    {
      question: "What is a test joint inspection?",
      answer:
        "A test joint inspection checks whether the test joint is correctly installed, accessible, mechanically secure and suitable for disconnecting the conductor during periodic inspection and testing.",
    },
    {
      question:
        "Why should concealed earthing connections be inspected before concreting?",
      answer:
        "Once concrete is poured, many structural earthing connections become inaccessible. Pre-concreting inspection allows connection quality, conductor routing and continuity to be checked before the work is permanently concealed.",
    },
    {
      question: "Does DFMHUB provide earth resistance testing?",
      answer:
        "Yes. Where required by the project scope, DFMHUB can carry out earth resistance testing using suitable test methods and calibrated instruments.",
    },
    {
      question: "What quality checks are carried out during installation?",
      answer:
        "Quality checks can include conductor routing, connection tightness, fixing quality, material compatibility, bonding continuity, mechanical protection, test-point accessibility and general workmanship.",
    },
    {
      question: "What documents are provided after installation and testing?",
      answer:
        "Depending on the agreed scope, handover documentation can include continuity test results, earth resistance readings, inspection records, installation photographs, marked-up drawings, as-built information and site quality checklists.",
    },
    {
      question:
        "Is structural earthing and lightning protection treated as one integrated system?",
      answer:
        "They perform different functions, but their interfaces should be coordinated. DFMHUB executes them as an integrated site installation to maintain continuity, bonding and proper connection with the earth-termination system.",
    },
    {
      question:
        "Which projects require structural earthing and lightning protection installation?",
      answer:
        "These systems are commonly used in data centres, industrial plants, high-rise buildings, factories, warehouses, commercial buildings, hospitals, IT campuses, PEB structures and infrastructure projects, subject to the approved engineering design.",
    },
    {
      question: "When should structural earthing installation start?",
      answer:
        "Structural earthing installation should ideally begin during the foundation and RCC construction stages so that concealed connections can be installed and inspected before concreting.",
    },
    {
      question:
        "Can DFMHUB inspect an existing earthing and lightning protection system?",
      answer:
        "Yes. Existing systems can be inspected for visible damage, corrosion, loose connections, continuity issues, test-joint condition and other installation concerns.",
    },
    {
      question: "How can I get an installation quotation from DFMHUB?",
      answer:
        "Share the approved drawings, BOQ, project location, technical specifications, building type and current construction stage. DFMHUB can review the scope and provide an installation and testing proposal.",
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
              <Link href="/" className="hover:text-amber-400">
                Home
              </Link>
              <span>&gt;</span>
              <span className="text-amber-400 font-bold">
                Installation Services
              </span>
            </div>

            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
              INSTALLATION SERVICES
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Structural Earthing and Lightning Protection Installation &amp;
              Testing By DFMHUB
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
              Directly employed crews, method statements, height-safety
              compliance and instrument-traceable test records — delivered as
              one accountable scope alongside our manufacturing.
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

      {/* Overview Section */}
      <section className="w-full bg-white text-slate-900 py-12 sm:py-16 lg:py-20 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-left">
          <p className="text-base sm:text-lg lg:text-xl text-slate-800 leading-relaxed font-medium">
            DFMHUB provides integrated Structural Earthing and Lightning
            Protection System installation and testing support for commercial
            buildings, industrial facilities, data centres, high-rise
            developments, factories, warehouses, PEB structures and
            infrastructure projects.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            Our scope is focused on executing the approved design correctly at
            site and ensuring that the complete earthing and lightning
            protection network works as one coordinated system. Installation is
            carried out with attention to conductor routing, structural bonding,
            test points, earth-termination connections, material compatibility,
            fixing quality and coordination with civil, electrical, MEP, roofing
            and structural teams.
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-medium">
            Approved Drawings → Site Coordination → Installation → Inspection →
            Testing → Documentation
          </p>
        </div>
      </section>

      {/* Why Choose DFMHUB Section */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-7xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              Why Choose DFMHUB?
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
              DFMHUB supports projects where installation quality, coordination and documented testing are critical.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 p-8 sm:p-10 text-center space-y-8">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800">
              Our installation and testing support includes:
            </h3>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm sm:text-base text-slate-700 font-medium">
              {[
                "Integrated Site Execution",
                "Civil & MEP Coordination",
                "Pre-Concreting Inspection",
                "Continuity Testing",
                "Earth Resistance Testing",
                "Test Joint Inspection",
                "Installation Quality Checks",
                "Final Verification",
                "Handover Documentation",
              ].map((item, index) => (
                <span key={index} className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#081021] rounded-xl text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent z-0" />
             <div className="relative z-10 space-y-4">
               <h3 className="text-xl sm:text-2xl font-bold text-white">
                 Need Installation &amp; Testing Support?
               </h3>
               <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
                 If your project already has an approved Structural Earthing and Lightning Protection System design, share the BOQ.
               </p>
               <div className="pt-4">
                 <Link
                   href="/contact-us"
                   className="inline-flex items-center space-x-2 bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-md transition-all shadow-lg"
                 >
                   <span>Request Installation Quote</span>
                   <ArrowRight className="w-4 h-4" />
                 </Link>
               </div>
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
              <div
                key={i}
                className="flex items-start space-x-3 text-xs sm:text-sm text-slate-300 font-normal"
              >
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
