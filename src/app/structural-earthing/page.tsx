import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
  title: "Structural Earthing & Chemical Earthing (IS 3043) | DFMHUB",
  description:
    "Foundation rebar bonding, copper bonded and chemical electrodes, earth bars and enhancement compound sized from a Wenner soil resistivity survey to IS 3043:2018.",
};

export default function StructuralEarthingPage() {
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

  const testMethods = [
    {
      title: "Soil resistivity",
      desc: "Wenner four-pin survey at multiple spacings, before design.",
    },
    {
      title: "Earth resistance",
      desc: "Fall-of-potential (3-pole / 4-pole) at 62% rule with plateau verification.",
    },
    {
      title: "Continuity & bonding",
      desc: "Low-resistance ohmmeter across joints, test links and bonding bars.",
    },
  ];

  const components = [
    {
      title: "ARK Copper Bonded Earth Rods",
      spec: "14/17.2/20 MM, 250 M CU",
      desc: "High-tensile steel core with molecularly bonded 250-micron copper coating for driven-depth installation and 20+ year design life to IEC 62561-2.",
    },
    {
      title: "ARK Pure Copper Earth Electrodes",
      spec: "SOLID CU, 25-50 MM DIA",
      desc: "Solid copper electrodes for highly corrosive coastal, saline and chemical plant soils where bonded rods are not acceptable.",
    },
    {
      title: "ARK Chemical / Maintenance-Free Electrodes",
      spec: "48/76 MM, 1-3 M",
      desc: "Backfill-charged electrodes with crystalline salt reservoirs that stabilise resistance in rocky and high-resistivity soils.",
    },
    {
      title: "ARK GI & Copper Earthing Strips",
      spec: "25X3 TO 75X12 MM",
      desc: "Hot-dip galvanised and copper earthing strips for equipotential ring conductors, grid mats and structural bonding runs.",
    },
    {
      title: "ARK Earth Enhancement Compound",
      spec: "BENTONITE / CONDUCTIVE CEMENT",
      desc: "Non-corrosive, low-resistivity backfill that reduces electrode-to-soil contact resistance and retains moisture through dry seasons.",
    },
    {
      title: "ARK Structural Rebar Bonding Clamps",
      spec: "CAST CU ALLOY, 8-32 MM REBAR",
      desc: "Clamps and weld kits that turn foundation reinforcement into a certified structural earth electrode as permitted by IS 3043 and IEC 62305-3.",
    },
    {
      title: "ARK Earth Pit Chambers",
      spec: "POLYMER / RCC, A15-D400",
      desc: "Load-rated inspection chambers with tamper-resistant covers keeping every electrode accessible for periodic testing.",
    },
    {
      title: "ARK Earth Bars & Disconnecting Links",
      spec: "CU BAR WITH SS LINKS",
      desc: "Main earth bars with removable links, enabling isolated resistance testing of each electrode branch.",
    },
    {
      title: "ARK Exothermic Welding System",
      spec: "MOULDS, POWDER, IGNITION",
      desc: "Permanent low-impedance joints for rod-to-tape, tape-to-tape, tape-to-rebar and cable-to-structure connections.",
    },
    {
      title: "ARK Rod Couplers, Driving Heads & Tips",
      spec: "SILICON BRONZE / HARDENED STEEL",
      desc: "Threaded couplers, spikes and driving studs for extending electrodes to 6 m+ depth without damaging the copper bond.",
    },
    {
      title: "ARK Earthing Accessories & Clamps",
      spec: "ROD-TO-TAPE, U-BOLT, A/B TYPE",
      desc: "Full range of gunmetal and copper alloy clamps for cable, tape, rod and pipe terminations across the earthing network.",
    },
    {
      title: "ARK Earth Marking Plates & Labels",
      spec: "ENGRAVED SS / BRASS",
      desc: "Permanent identification for earth pits, bonding bars and test links to keep as-built records auditable.",
    },
  ];

  const cities = [
    { name: "Bengaluru", state: "Karnataka · South India", url: "/structural-earthing/bengaluru" },
    { name: "Chennai", state: "Tamil Nadu · South India", url: "/structural-earthing/chennai" },
    { name: "Hyderabad", state: "Telangana · South India", url: "/structural-earthing/hyderabad" },
    { name: "Pune", state: "Maharashtra · West India", url: "/structural-earthing/pune" },
  ];

  const earthingFaqs = [
    {
      question: "What is structural earthing?",
      answer:
        "Structural earthing uses the building's own foundation reinforcement — pile caps, raft slabs, plinth beams and column cages — as an earth electrode, bonded with clamps or exothermic welds and brought out to test links. It is explicitly permitted by IS 3043 and IEC 62305-3 and normally gives a lower, more stable impedance than isolated earth pits.",
    },
    {
      question: "What earth resistance value is acceptable?",
      answer:
        "IS 3043 sets values by application: below 1 Ω for large substations and critical facilities, below 5 Ω for most LPS and equipment earths in commercial buildings, and below 2 Ω for data centres and pharma plants. The value must hold in the dry season, not only after monsoon.",
    },
    {
      question: "Why is soil resistivity testing done before design?",
      answer:
        "Electrode length, count and type are all driven by resistivity. A Wenner four-pin survey at increasing pin spacings reveals how resistivity changes with depth, showing whether driven rods, deep-bore electrodes or a horizontal grid mat will actually reach conductive strata.",
    },
    {
      question: "Copper bonded rods or GI pipe electrodes?",
      answer:
        "GI pipe electrodes corrode and lose contact within a few years in most Indian soils. Copper bonded rods with a 250-micron molecularly bonded coating to IEC 62561-2 hold a 20+ year design life, and solid copper electrodes are used in saline coastal or chemically aggressive ground.",
    },
    {
      question: "Why exothermic welding instead of bolted clamps?",
      answer:
        "An exothermic weld is a molecular copper-to-copper joint with the same current capacity as the conductor. It cannot loosen, corrode at the interface, or increase in resistance over time — all common failure modes of buried bolted connections.",
    },
    {
      question: "Should lightning protection earth and electrical earth be separate?",
      answer:
        "No. IS/IEC 62305 and IS 3043 both require a single common bonding network. Separate, unbonded earths create dangerous potential differences during a strike. Different functional earths are bonded at the main equipotential bar, directly or through SPDs where isolation is needed.",
    },
    {
      question: "Can earth resistance be reduced without more electrodes?",
      answer:
        "Often yes — by using earth enhancement compound such as bentonite or conductive cement around existing electrodes, extending rods deeper with couplers to reach moist strata, or converting to a chemical electrode. Adding rods in parallel only helps if they are spaced at least their own driven length apart.",
    },
  ];

  return (
    <div className="w-full transition-colors duration-200">
      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#081021] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/earthing-hero.png"
            alt="Structural Earthing foundation rod installation"
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
              <span className="text-amber-400 font-bold">Structural Earthing</span>
            </div>

            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
              ARK MAKE · STRUCTURAL EARTHING
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Structural earthing that stays low-impedance for the life of the building
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
              Foundation rebar bonding, copper bonded and chemical electrodes, exothermic welding, earth bars and enhancement compound — designed from measured soil resistivity to IS 3043:2018 and IEC 62561.
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
              Why the foundation is the most reliable electrode on site
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed font-normal">
              A raft or pile-cap reinforcement cage puts hundreds of square metres of steel in permanent contact with moist soil — an electrode no cluster of 3 m pits can match.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-4">
            <div className="lg:col-span-6 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <p>
                Structural earthing bonds that reinforcement into a certified earth electrode using rebar clamps or exothermic welds, cross-bonded at multiple levels of the cage and brought out to accessible test links above plinth level. IS 3043:2018 and IEC 62305-3 both recognise foundation earthing, and IEC 62561-7 covers the enhancement compounds used alongside it.
              </p>
              <p>
                The advantages are practical: stable resistance through the dry season, no land consumed by pit clusters on tight urban plots, no risk of an electrode being cut during later landscaping, and a large equipotential reference that limits step and touch potential across the slab.
              </p>
              <p>
                The constraint is timing. Structural earthing must be built with the structure. DFMHUB works alongside the civil contractor at foundation stage, with photographic and test records taken before every pour — and supplements it with driven, deep-bore or chemical electrodes where the design demands lower values.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl overflow-hidden shadow-xl border border-slate-200">
                <Image
                  src="/images/earthing-hero.png"
                  alt="ARK Make Structural Earthing foundation clamp and copper rod"
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
              Codes and test methods we work to
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

          {/* Test Methods Matrix */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testMethods.map((item) => (
              <div key={item.title} className="space-y-1">
                <span className="text-base sm:text-lg font-bold text-amber-400 block">
                  {item.title}
                </span>
                <span className="text-xs text-slate-400 block leading-relaxed font-normal">
                  {item.desc}
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
              12 ARK Make structural earthing components
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Electrodes, bonding hardware, welding systems, chambers and accessories — supplied with test certificates and batch traceability.
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
              Structural earthing by city
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Soil conditions differ sharply between metros — so do our electrode designs.
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
                  Structural Earthing in {city.name}
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
            Structural earthing — frequently asked questions
          </h2>
          <FAQAccordion items={earthingFaqs} />
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

