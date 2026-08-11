import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, MapPin, ShieldCheck, Zap } from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import ContactForm from "@/components/ContactForm";
import { notFound } from "next/navigation";

interface CityData {
  name: string;
  slug: string;
  state: string;
  region: string;
  areas: string;
  sectors: string;
  soil: string;
  storm: string;
  earthingIntro: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
  };
  earthingFaqs: { question: string; answer: string }[];
}

const cityRegistry: Record<string, CityData> = {
  bengaluru: {
    name: "Bengaluru",
    slug: "bengaluru",
    state: "Karnataka",
    region: "Bengaluru and greater Karnataka",
    areas: "Peenya, Whitefield, Electronic City, Devanahalli / KIADB Aerospace Park, Bommasandra, Hebbal, Yeshwanthpur",
    sectors: "IT campuses & data centres, aerospace and defence units, biotech labs, high-rise residential towers",
    soil: "hard red laterite and granitic gneiss with high dry-season resistivity (typically 80-300 Ω·m)",
    storm: "roughly 45-60 thunderstorm days a year, with intense pre-monsoon strikes in April-May",
    earthingIntro: {
      p1: "Ground conditions decide the design. Around Bengaluru we typically encounter hard red laterite and granitic gneiss with high dry-season resistivity (typically 80-300 Ω·m), which is why every project starts with a Wenner four-pin resistivity survey rather than an assumed electrode count.",
      p2: "On new construction we bond the foundation reinforcement itself — pile caps, rafts and column cages — with rebar clamps and exothermic welds, cross-bonded at multiple levels and brought out to test links above plinth. This gives a far more stable impedance than isolated pits through Bengaluru's dry months, and consumes no additional land on tight plots in Peenya or Electronic City.",
      p3: "Where the design demands lower values we supplement with copper bonded rods, deep-bore or chemical electrodes and low-resistivity enhancement compound. Roughly 45-60 thunderstorm days a year, with intense pre-monsoon strikes in April-May also makes seasonal re-testing worthwhile, and we offer scheduled testing contracts city-wide.",
      p4: "Typical clients in Bengaluru include IT campuses & data centres, aerospace and defence units, biotech labs, high-rise residential towers. Bulk ARK Make earthing material is supplied to contractors across Peenya, Whitefield, Electronic City with test certificates and batch traceability.",
    },
    earthingFaqs: [
      {
        question: "Who supplies structural earthing systems in Bengaluru?",
        answer:
          "DFMHUB manufactures ARK Make structural earthing products — copper bonded rods, rebar bonding clamps, exothermic weld kits, earth bars and chambers — and delivers design-plus-installation packages across Bengaluru, Karnataka. Work is executed to IS 3043:2018 and IEC 62561 with documented test results.",
      },
      {
        question: "What earth resistance value should I target in Bengaluru?",
        answer:
          "IS 3043 sets practical limits by application: under 1 Ω for large substations, under 5 Ω for LPS and equipment earths in most commercial buildings, and under 1-2 Ω for data centres and pharma facilities. Because Bengaluru has hard red laterite and granitic gneiss with high dry-season resistivity (typically 80-300 Ω·m), meeting those values often needs deep-bore or chemical electrodes with enhancement compound rather than standard 3 m pits.",
      },
      {
        question: "Why is structural earthing better than conventional earth pits in Bengaluru?",
        answer:
          "Foundation reinforcement gives a very large, permanently moist contact area, so impedance is lower and far more stable through Bengaluru's dry season than isolated pits. It also saves land on tight urban plots in Peenya and Electronic City, and cannot be damaged later by landscaping or excavation.",
      },
      {
        question: "Can structural earthing be retrofitted to an existing building in Bengaluru?",
        answer:
          "Partially. Exposed pile caps, plinth beams and column starter bars can be bonded after the fact, but full foundation earthing must be built with the structure. For existing buildings in Bengaluru we usually combine accessible rebar bonding with supplementary deep-bore electrodes to reach the required resistance.",
      },
      {
        question: "How does Bengaluru soil affect electrode selection?",
        answer:
          "With hard red laterite and granitic gneiss with high dry-season resistivity (typically 80-300 Ω·m), plain GI pipe electrodes corrode or lose contact quickly. We specify 250-micron copper bonded rods, solid copper electrodes for corrosive coastal or chemical exposure, and bentonite or conductive-cement backfill so resistance stays stable across seasons in Bengaluru.",
      },
      {
        question: "How often should earthing be tested in Bengaluru?",
        answer:
          "Annually as a minimum, and after any major electrical modification or lightning event. Facilities in Bengaluru handling IT campuses & data centres typically test every six months. DFMHUB provides scheduled testing with instrument-traceable reports for each earth pit and bonding bar.",
      },
      {
        question: "Do you supply earthing materials in bulk to contractors in Bengaluru?",
        answer:
          "Yes. ARK Make earth rods, strips, clamps, chambers, exothermic weld kits and enhancement compound are supplied in project quantities to EPC and electrical contractors across Bengaluru, with test certificates, batch traceability and scheduled site delivery to Peenya, Whitefield, Electronic City.",
      },
      {
        question: "Which industries in Bengaluru do you work with?",
        answer:
          "Our Bengaluru project list is concentrated in IT campuses & data centres, aerospace and defence units, biotech labs, high-rise residential towers, spanning greenfield construction, plant expansion and compliance retrofits across Peenya, Whitefield, Electronic City, Devanahalli / KIADB Aerospace Park.",
      },
    ],
  },
  chennai: {
    name: "Chennai",
    slug: "chennai",
    state: "Tamil Nadu",
    region: "Chennai and greater Tamil Nadu",
    areas: "Sriperumbudur, Oragadam, Maraimalai Nagar, Ambattur, Guindy, Ennore, OMR",
    sectors: "Automotive manufacturing plants, port & petrochemical facilities, hardware manufacturing, data centers",
    soil: "coastal saline clay and alluvial soil with variable dry-season resistivity (15-90 Ω·m)",
    storm: "35-50 thunderstorm days annually, concentrated during the northeast monsoon season",
    earthingIntro: {
      p1: "Ground conditions decide the design. Around Chennai we encounter coastal saline clay and alluvial soil with high salt content, where electrode selection is driven by corrosion resistance and tidal ground moisture shifts.",
      p2: "On new construction we bond the foundation reinforcement cage using heavy rebar clamps or exothermic welds, creating an equipotential mesh that limits step and touch potentials across high-rise slabs and factory bays in Oragadam and Sriperumbudur.",
      p3: "To prevent atmospheric and soil corrosion in marine air, we deploy 250-micron copper bonded rods or solid copper electrodes with conductive backfill, maintaining <1 Ω earth resistance across seasons.",
      p4: "Typical clients in Chennai include automotive OEMs, tier-1 suppliers, port facilities, data centres, and commercial IT parks across OMR, Ambattur, and Sriperumbudur.",
    },
    earthingFaqs: [
      {
        question: "Who supplies structural earthing systems in Chennai?",
        answer:
          "DFMHUB manufactures ARK Make structural earthing components — 250-micron copper bonded rods, SS 316 rebar clamps, exothermic welding supplies, and test links — serving automotive, port, and industrial hubs across Chennai and Tamil Nadu.",
      },
      {
        question: "What earth resistance value should I target in Chennai?",
        answer:
          "IS 3043 requires below 1 Ω for critical power substations and data centres, and below 5 Ω for general equipment earthing. Coastal alluvial soils yield good conductivity, but seasonal tidal variations require deep-driven electrodes with conductive enhancement compound.",
      },
      {
        question: "Why is structural earthing better than conventional earth pits in Chennai?",
        answer:
          "Foundation rebar grids embedded in moist soil maintain low, stable resistance year-round, eliminating pit degradation caused by coastal salt exposure and monsoon flooding.",
      },
      {
        question: "Can structural earthing be retrofitted to an existing building in Chennai?",
        answer:
          "Exposed pile caps and plinth beams can be retrofitted with rebar bonding clamps, supplemented by chemical electrodes for facilities in Sriperumbudur and Oragadam.",
      },
      {
        question: "How does Chennai soil affect electrode selection?",
        answer:
          "Saline coastal soil accelerates corrosion of standard GI pipes. We specify 250-micron copper bonded rods or solid copper electrodes to ensure a 20+ year design life to IEC 62561-2.",
      },
      {
        question: "How often should earthing be tested in Chennai?",
        answer:
          "Annual testing is mandatory for fire NOC and insurance renewals; coastal industrial facilities in Ennore and Ambattur often test every 6 months due to high humidity.",
      },
      {
        question: "Do you supply earthing materials in bulk to contractors in Chennai?",
        answer:
          "Yes. ARK Make copper bonded rods, earthing tapes, exothermic weld kits, and chambers are supplied in bulk with batch test certificates across Sriperumbudur, Oragadam, and OMR.",
      },
      {
        question: "Which industries in Chennai do you work with?",
        answer:
          "Automotive assembly plants, port and petrochemical facilities, electronics manufacturing units, data centres, and commercial towers across Chennai.",
      },
    ],
  },
  hyderabad: {
    name: "Hyderabad",
    slug: "hyderabad",
    state: "Telangana",
    region: "Hyderabad and greater Telangana",
    areas: "HITEC City, Gachibowli, Genome Valley, Pashamylaram, Patancheru, Jeedimetla, Shamshabad",
    sectors: "Pharma & life sciences plants, data centres, IT campuses, defence research facilities",
    soil: "hard granitic rock and rocky terrain with high dry-season resistivity (150-500 Ω·m)",
    storm: "40-55 thunderstorm days annually with severe lightning activity during monsoon onset",
    earthingIntro: {
      p1: "Ground conditions decide the design. Around Hyderabad we encounter hard granitic rock and high-resistivity soil (150-500 Ω·m), requiring deep-drilled boreholes and chemical enhancement to achieve target earth impedance.",
      p2: "Structural foundation bonding connects high-rise raft reinforcement directly into the ground grid, providing a massive equipotential plane across HITEC City and Gachibowli IT complexes.",
      p3: "Where soil depth is minimal over granite, deep-bore chemical electrodes surrounded by bentonite backfill maintain sub-1 Ω readings essential for pharma cleanrooms in Genome Valley and Patancheru.",
      p4: "We supply contractors and EPCs across Cyberabad with certified ARK Make copper bonded rods, rebar clamps, exothermic weld powder, and inspection chambers.",
    },
    earthingFaqs: [
      {
        question: "Who supplies structural earthing systems in Hyderabad?",
        answer:
          "DFMHUB manufactures and installs ARK Make structural earthing products across Hyderabad, Cyberabad, and Telangana, serving pharma plants in Genome Valley, IT hubs in HITEC City, and industrial zones in Patancheru.",
      },
      {
        question: "What earth resistance value should I target in Hyderabad?",
        answer:
          "Target below 1 Ω for pharma plants and data centres, and below 5 Ω for commercial LPS. Hyderabad's hard granitic terrain (150-500 Ω·m resistivity) requires deep boreholes filled with conductive backfill compound.",
      },
      {
        question: "Why is structural earthing better than conventional earth pits in Hyderabad?",
        answer:
          "Using the deep foundation reinforcement cage of high-rises and factory blocks provides a wide ground contact area that bypasses shallow dry granitic rock layer.",
      },
      {
        question: "Can structural earthing be retrofitted to an existing building in Hyderabad?",
        answer:
          "Plinth beam reinforcement and starter bars can be bonded with exothermic welds, supplemented by deep vertical chemical electrodes in granitic boreholes.",
      },
      {
        question: "How does Hyderabad soil affect electrode selection?",
        answer:
          "High soil resistivity makes standard GI pits ineffective. We deploy deep-driven copper bonded rods and chemical electrodes encased in bentonite or conductive cement backfill.",
      },
      {
        question: "How often should earthing be tested in Hyderabad?",
        answer:
          "At least once a year per IS 3043 and NBC 2016 Part 8. Critical pharma and data centre facilities in HITEC City test biannually.",
      },
      {
        question: "Do you supply earthing materials in bulk to contractors in Hyderabad?",
        answer:
          "Yes, project quantities of ARK Make rods, exothermic weld powders, graphite moulds, and earth bars are delivered directly to sites across Cyberabad and Patancheru.",
      },
      {
        question: "Which industries in Hyderabad do you work with?",
        answer:
          "Pharma & life sciences facilities, data centres, IT campuses, defence research units, and high-rise residential projects.",
      },
    ],
  },
  pune: {
    name: "Pune",
    slug: "pune",
    state: "Maharashtra",
    region: "Pune and greater Maharashtra",
    areas: "Pimpri-Chinchwad (PCMC), Chakan, Talegaon, Ranjangaon, Hinjawadi, Hadapsar, Bhosari",
    sectors: "Automotive & EV plants, engineering MIDC units, IT parks, heavy machinery plants",
    soil: "black cotton soil and basalt rock with seasonal shrinking and high dry resistivity (100-350 Ω·m)",
    storm: "50-65 thunderstorm days per year with intense pre-monsoon strikes",
    earthingIntro: {
      p1: "Ground conditions decide the design. Around Pune we encounter expanding/shrinking black cotton soil over hard basalt rock, which causes traditional shallow pits to pull away from surrounding soil during dry summer months.",
      p2: "Structural foundation earthing bonds deep pile caps and raft slabs below the shrink line, ensuring stable year-round earth resistance for heavy automotive plants in Chakan and PCMC.",
      p3: "We supplement structural rebar grids with 250-micron copper bonded driven rods and moisture-retaining conductive cement compound to comply with IS 3043:2018.",
      p4: "Our Pune team serves automotive OEMs, EV manufacturers, engineering MIDC units, and IT parks in Hinjawadi with design, supply, installation, and DISH audit compliance certification.",
    },
    earthingFaqs: [
      {
        question: "Who supplies structural earthing systems in Pune?",
        answer:
          "DFMHUB manufactures ARK Make earthing components and delivers turnkey design, supply, and installation across Pune MIDC belts including Chakan, PCMC, Ranjangaon, and Hinjawadi.",
      },
      {
        question: "What earth resistance value should I target in Pune?",
        answer:
          "Under 1 Ω for heavy manufacturing plant substations and IT data hubs; under 5 Ω for general machinery earthing to IS 3043:2018.",
      },
      {
        question: "Why is structural earthing better than conventional earth pits in Pune?",
        answer:
          "Pune's black cotton soil shrinks severely in summer, pulling away from traditional earth pits. Structural foundation bonding stays deep in stable moisture strata.",
      },
      {
        question: "Can structural earthing be retrofitted to an existing building in Pune?",
        answer:
          "Partial retrofits via column starter bar bonding and perimeter ring conductors are routinely executed for MIDC factory expansions in Chakan and Bhosari.",
      },
      {
        question: "How does Pune soil affect electrode selection?",
        answer:
          "Shrinking black cotton soil and underlying basalt rock demand 250-micron copper bonded rods and moisture-retaining conductive cement compounds to maintain constant contact.",
      },
      {
        question: "How often should earthing be tested in Pune?",
        answer:
          "Annual testing before monsoon onset is recommended to verify impedance levels for DISH factory inspectorate and insurance compliance.",
      },
      {
        question: "Do you supply earthing materials in bulk to contractors in Pune?",
        answer:
          "Yes. ARK Make copper bonded rods, GI & copper tapes, exothermic weld kits, and inspection chambers are supplied with test certificates across all MIDC zones.",
      },
      {
        question: "Which industries in Pune do you work with?",
        answer:
          "Automotive & EV plants, heavy engineering MIDC units, IT parks in Hinjawadi, and commercial real estate developments.",
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(cityRegistry).map((city) => ({ city }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const resolvedParams = await params;
  const citySlug = resolvedParams.city.toLowerCase();
  const city = cityRegistry[citySlug];
  if (!city) {
    return { title: "Structural Earthing | DFMHUB" };
  }
  return {
    title: `Structural Earthing in ${city.name}, ${city.state} | IS 3043 & IEC 62305-3`,
    description: `DFMHUB manufactures ARK Make structural earthing components — copper bonded rods, rebar clamps, exothermic weld kits for ${city.sectors} across ${city.name}, ${city.state}.`,
    alternates: {
      canonical: `https://dfmhub.vercel.app/structural-earthing/${city.slug}`,
    },
    openGraph: {
      title: `Structural Earthing in ${city.name} | DFMHUB`,
      description: `Foundation rebar bonding, copper bonded rods and chemical electrodes engineered for ${city.name} ground conditions.`,
    },
  };
}

export default async function StructuralEarthingCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const resolvedParams = await params;
  const citySlug = resolvedParams.city.toLowerCase();
  const city = cityRegistry[citySlug];

  if (!city) {
    notFound();
  }

  const otherCities = Object.values(cityRegistry).filter(
    (c) => c.slug !== city.slug
  );

  const componentCards = [
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
  ];

  return (
    <div className="w-full transition-colors duration-200">
      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#070d19] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d19] via-[#091325]/90 to-transparent z-10" />
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/earthing-hero.png"
            alt={`Structural Earthing in ${city.name}`}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-amber-400">Home</Link>
              <span>&gt;</span>
              <Link href="/structural-earthing" className="hover:text-amber-400">Structural Earthing</Link>
              <span>&gt;</span>
              <span className="text-amber-400 font-bold">{city.name}</span>
            </div>

            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
              STRUCTURAL EARTHING · {city.name.toUpperCase()}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Structural Earthing in {city.name}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
              ARK Make structural earthing designed, manufactured and installed for projects across {city.region} — foundation rebar bonding, electrodes, exothermic welding and documented testing to IS 3043:2018.
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
                className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md border border-slate-700 transition-all flex items-center justify-center"
              >
                INSTALLATION SERVICES
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: WHY CITY PROJECTS NEED A CITY-SPECIFIC DESIGN (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              {city.name.toUpperCase()}, {city.state.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Why {city.name} projects need a city-specific design
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              <p>{city.earthingIntro.p1}</p>
              <p>{city.earthingIntro.p2}</p>
              <p>{city.earthingIntro.p3}</p>
              <p>{city.earthingIntro.p4}</p>
            </div>

            {/* Coverage Summary Box */}
            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h3 className="font-bold text-slate-900 text-lg border-b border-slate-200 pb-3">
                {city.name} coverage
              </h3>

              <div className="space-y-4 text-xs text-slate-700 font-normal">
                <div>
                  <span className="text-amber-600 font-bold text-[11px] uppercase tracking-wider block mb-1">
                    AREAS SERVED
                  </span>
                  <p className="leading-relaxed">{city.areas}</p>
                </div>

                <div>
                  <span className="text-amber-600 font-bold text-[11px] uppercase tracking-wider block mb-1">
                    SECTORS
                  </span>
                  <p className="leading-relaxed">{city.sectors}</p>
                </div>

                <div>
                  <span className="text-amber-600 font-bold text-[11px] uppercase tracking-wider block mb-1">
                    SOIL PROFILE
                  </span>
                  <p className="leading-relaxed">{city.soil}</p>
                </div>

                <div>
                  <span className="text-amber-600 font-bold text-[11px] uppercase tracking-wider block mb-1">
                    STORM EXPOSURE
                  </span>
                  <p className="leading-relaxed">{city.storm}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: ARK MAKE COMPONENTS DELIVERED ACROSS CITY (LIGHT GRAY) */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              SUPPLIED IN {city.name.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              ARK Make components delivered across {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Project quantities with test certificates, batch traceability and scheduled site delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {componentCards.map((comp) => (
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

          <div className="pt-8">
            <Link
              href="/structural-earthing"
              className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider"
            >
              <span>VIEW THE COMPLETE STRUCTURAL EARTHING RANGE</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: QUESTIONS PEOPLE ASK (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10">
            Structural Earthing in {city.name} — questions people ask
          </h2>
          <FAQAccordion items={city.earthingFaqs} />
        </div>
      </section>

      {/* Section 5: OTHER LOCATIONS (DARK NAVY) */}
      <section className="w-full bg-[#060b14] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2">
              OTHER LOCATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Structural Earthing in other cities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCities.map((other) => (
              <Link
                key={other.slug}
                href={`/structural-earthing/${other.slug}`}
                className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 hover:border-amber-500/60 transition-all block group"
              >
                <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {other.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-normal">
                  {other.state}
                </p>
              </Link>
            ))}
          </div>
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
