import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
  title: "Lightning Protection Systems (IS/IEC 62305) | DFMHUB",
  description:
    "ARK Make air terminations, mesh and down conductors, test links, bonding and coordinated SPDs, designed by rolling sphere method to IS/IEC 62305.",
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
    { level: "LPL I", detail: "20 m sphere · 5x5 m mesh · 10 m spacing" },
    { level: "LPL II", detail: "30 m sphere · 10x10 m mesh · 10 m spacing" },
    { level: "LPL III", detail: "45 m sphere · 15x15 m mesh · 15 m spacing" },
    { level: "LPL IV", detail: "60 m sphere · 20x20 m mesh · 20 m spacing" },
  ];

  const components = [
    {
      title: "ARK Air Terminals (Franklin Rods)",
      spec: "CU / AL / SS 16-25 MM DIA",
      desc: "Solid copper, aluminium and stainless steel finials with machined multi-point tips, supplied in 0.5 m to 3 m lengths to IS/IEC 62305-3 rolling sphere design.",
    },
    {
      title: "ARK Mesh Conductors & Tapes",
      spec: "25X3, 25X6, 32X8 MM",
      desc: "Annealed copper, tinned copper and aluminium tapes for mesh-method air termination and roof-level ring conductors, tested for 100% cross-section continuity.",
    },
    {
      title: "ARK Down Conductors",
      spec: "CU TAPE / BARE CU / AL",
      desc: "Down conductors routed on shortest, straightest paths with defined bend radii, supplied with matched fixings for RCC, ACP, glass and metal facades.",
    },
    {
      title: "ARK DC Tape Clips & Saddles",
      spec: "SS / CU / PVC-LINED",
      desc: "Facade and roof fixing clips at 1 m horizontal / 1.5 m vertical spacing, with non-staining stand-off options for architectural surfaces.",
    },
    {
      title: "ARK Test Link / Inspection Joints",
      spec: "CU BIMETAL, IP65 ENCLOSURE",
      desc: "Disconnecting joints at 1.5-1.8 m above finished ground level for annual continuity and earth resistance testing without dismantling.",
    },
    {
      title: "ARK Exothermic Weld Kits & Moulds",
      spec: "GRAPHITE MOULDS, 25-250 G",
      desc: "Molecular copper-to-copper and copper-to-rebar welds that carry full lightning current and never loosen or corrode at the joint.",
    },
    {
      title: "ARK Bimetallic Connectors",
      spec: "CU-AL FRICTION WELDED",
      desc: "Prevents galvanic corrosion where aluminium down conductors meet copper earthing networks on coastal and industrial sites.",
    },
    {
      title: "ARK Early Streamer / ESE Terminals",
      spec: "OPTIONAL, NF C 17-102",
      desc: "ESE air terminals with mast, adaptor and strike counter for open yards, tank farms and stadium roofs where conventional meshes are impractical.",
    },
    {
      title: "ARK Lightning Event Counters",
      spec: "6-DIGIT, IP66",
      desc: "Field-mounted strike counters on down conductors for maintenance records, insurance evidence and audit trails.",
    },
    {
      title: "ARK Surge Protection Devices",
      spec: "TYPE 1 / 2 / 3, IEC 61643",
      desc: "Heavy-duty spark gap and MOV surge arresters rated to 100 kA 10/350 µs for main MDBs and sub-distribution boards.",
    },
    {
      title: "ARK Equipotential Bonding Bars",
      spec: "CU BAR, 10-20 WAY",
      desc: "Copper busbars with disconnect links for bonding metallic services, cable trays and structural steel at building entry points.",
    },
    {
      title: "ARK Earth Pit Chambers & Covers",
      spec: "POLYMER / RCC / CI, HEAVY DUTY",
      desc: "Inspection pits housing earth electrodes with removable covers rated for pedestrian and heavy vehicular wheel loads.",
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
      question: "What is a lightning protection system and what does it actually do?",
      answer:
        "A lightning protection system intercepts a strike at a designed point, conducts the current safely down the outside of the structure, and disperses it into the earth. It does not prevent lightning — it gives the current a controlled low-impedance path so that the building fabric, occupants and electrical systems are not part of it.",
    },
    {
      question: "How is the protection level decided?",
      answer:
        "By the IS/IEC 62305-2 risk assessment. Strike density, collection area, occupancy, internal systems and consequential loss are calculated and compared with the tolerable risk of 10⁻⁵. The result is Lightning Protection Level I to IV, which fixes rolling sphere radius, mesh size and down conductor spacing.",
    },
    {
      question: "What is the difference between the rolling sphere, mesh and protective angle methods?",
      answer:
        "Rolling sphere is the general method valid for any geometry — a sphere of 20 to 60 m radius is rolled over the structure and every touch point needs protection. The mesh method suits flat roofs, applying a 5x5 m to 20x20 m conductor grid. The protective angle method suits small, simple structures and masts within height limits.",
    },
    {
      question: "How many down conductors does a building need?",
      answer:
        "Spacing is set by protection level: 10 m for LPL I, 10 m for LPL II, 15 m for LPL III and 20 m for LPL IV, measured around the perimeter. Every down conductor takes the shortest, straightest route and terminates at its own earth electrode with a test link.",
    },
    {
      question: "Are ESE or early streamer terminals acceptable in India?",
      answer:
        "IS/IEC 62305 is based on conventional systems. ESE terminals to NF C 17-102 are used where a project specification calls for them — typically open yards, tank farms and large stadium roofs — and DFMHUB supplies them, but the earthing and bonding must still meet IS/IEC 62305 and IS 3043.",
    },
    {
      question: "Does a lightning protection system protect electronic equipment?",
      answer:
        "Only in combination with coordinated surge protection and equipotential bonding. External LPS handles the direct strike; Type 1, 2 and 3 SPDs plus a common bonding network control the conducted and induced transients that actually destroy electronics.",
    },
    {
      question: "How often must the system be inspected?",
      answer:
        "IEC 62305-3 recommends annual visual inspection with full testing every one to two years for LPL I and II systems, and after any lightning event, structural modification or new rooftop equipment installation.",
    },
  ];

  return (
    <div className="w-full transition-colors duration-200">
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
              Air termination, down conductors, bonding, earthing and coordinated surge protection — manufactured, designed, installed and tested by DFMHUB to IS/IEC 62305 and NBC 2016 Part 8.
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

      {/* Section 2: INTRODUCTION & COMPLIANCE (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              INTRODUCTION & COMPLIANCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              What a compliant lightning protection system contains
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed font-normal">
              A cloud-to-ground strike delivers up to 200 kA in microseconds. A compliant LPS gives that current a deliberate path so it never travels through reinforcement, cable trays, plumbing or people.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-4">
            <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <p>
                Under IS/IEC 62305 an installation is made of four parts. The{" "}
                <strong className="font-bold text-slate-900">air termination system</strong>{" "}
                intercepts the strike using rods, mesh conductors or catenary wires positioned by rolling sphere analysis. The{" "}
                <strong className="font-bold text-slate-900">down conductor system</strong>{" "}
                carries the current to earth by the shortest route, with spacing set by protection level. The{" "}
                <strong className="font-bold text-slate-900">earth termination system</strong>{" "}
                disperses it into the soil, sized from measured resistivity. Finally,{" "}
                <strong className="font-bold text-slate-900">equipotential bonding and SPDs</strong>{" "}
                stop dangerous potential differences and transients inside the building.
              </p>
              <p>
                DFMHUB delivers all four as one scope. Every ARK Make component is type-tested to the relevant part of IEC 62561, so the material submittal, the design calculation and the test report all point to the same standard — which is what auditors, insurers and fire authorities actually check.
              </p>
            </div>

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

      {/* Section 3: DESIGN & TESTING STANDARDS (DARK NAVY) */}
      <section className="w-full bg-[#060b14] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2">
              DESIGN & TESTING STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              The codes every ARK Make system is built to
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {standards.map((std) => (
              <div key={std.code} className="border-l-2 border-amber-500 pl-4 py-0.5">
                <h4 className="font-bold text-amber-500 text-sm sm:text-base">
                  {std.code}
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed font-normal">
                  {std.summary}
                </p>
              </div>
            ))}
          </div>

          {/* LPL Level Matrix */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {lplMatrix.map((item) => (
              <div key={item.level} className="space-y-1">
                <span className="text-lg sm:text-xl font-bold text-amber-400 block">
                  {item.level}
                </span>
                <span className="text-[11px] sm:text-xs text-slate-400 block font-medium">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: 12 ARK MAKE COMPONENTS (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              SYSTEM COMPONENTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              12 ARK Make lightning protection components
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

