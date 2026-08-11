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
  lpsFaqs: { question: string; answer: string }[];
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
    lpsFaqs: [
      {
        question: "Who is the best lightning protection system manufacturer in Bengaluru?",
        answer:
          "DFMHUB manufactures and supplies ARK Make lightning protection systems across Bengaluru and greater Karnataka. We handle the full chain in-house — IS/IEC 62305-2 risk assessment, air termination design, IEC 62561 type-tested components, installation and documented earth resistance testing — for projects in Peenya, Whitefield, Electronic City, Devanahalli / KIADB Aerospace Park and surrounding industrial belts.",
      },
      {
        question: "What does a lightning protection system cost in Bengaluru?",
        answer:
          "Cost depends on protection level, roof area and structure height. A typical LPL III installation for a mid-size commercial building in Bengaluru works out to a per-square-metre rate driven by conductor length, number of down conductors and earth electrode count. DFMHUB provides an itemised bill of materials with the design so you can compare like-for-like, and site surveys within Bengaluru are free.",
      },
      {
        question: "Is lightning protection mandatory for buildings in Bengaluru?",
        answer:
          "The National Building Code 2016 (Part 8) and local Karnataka fire and electrical inspectorate approvals require lightning protection for tall, public and hazardous-occupancy buildings. In practice, plan sanction, factory licensing and fire NOC in Bengaluru all expect a compliant LPS with earth resistance test records, and insurers routinely ask for the same evidence.",
      },
      {
        question: "How many thunderstorm days does Bengaluru get, and how does that affect design?",
        answer:
          "Bengaluru sees roughly 45-60 thunderstorm days a year, with intense pre-monsoon strikes in April-May. That strike density feeds directly into the IS/IEC 62305-2 risk calculation and usually pushes IT campuses & data centres and other critical facilities in the city to LPL I or II, which means a tighter mesh, more down conductors and coordinated surge protection.",
      },
      {
        question: "What soil conditions affect earthing for lightning protection in Bengaluru?",
        answer:
          "Sites around Bengaluru typically have hard red laterite and granitic gneiss with high dry-season resistivity (typically 80-300 Ω·m). We run a Wenner four-pin soil resistivity survey before design, then select driven copper-bonded rods, deep-bore electrodes or chemical electrodes with enhancement compound so that the LPS earth stays within the target resistance year-round, not just in monsoon.",
      },
      {
        question: "How long does lightning protection installation take in Bengaluru?",
        answer:
          "A standard commercial building in Bengaluru is completed in 5 to 12 working days after material dispatch, depending on facade access and roof complexity. Large industrial sheds in Peenya or Whitefield usually run two to four weeks with a phased handover so production is not interrupted.",
      },
      {
        question: "Do you provide earth resistance testing and certification in Bengaluru?",
        answer:
          "Yes. Every Bengaluru installation is handed over with fall-of-potential earth resistance readings for each electrode, continuity readings across every test link, an as-built drawing set, IEC 62561 material test certificates and a compliance statement suitable for fire NOC, insurance and client audits. Annual re-testing contracts are available city-wide.",
      },
      {
        question: "Which areas of Bengaluru do you serve?",
        answer:
          "We cover the whole Bengaluru metropolitan region including Peenya, Whitefield, Electronic City, Devanahalli / KIADB Aerospace Park, Bommasandra, Hebbal, Yeshwanthpur, with regular project work for IT campuses & data centres, aerospace and defence units, biotech labs, high-rise residential towers. Emergency inspection after a strike event is normally attended within 24 to 48 hours.",
      },
    ],
    earthingFaqs: [
      {
        question: "Why choose structural earthing over traditional earth pits in Bengaluru?",
        answer:
          "Bengaluru's rocky red soil has high resistivity during dry months. Structural earthing utilizes the building's massive foundation rebar grid as a permanent, low-impedance electrode compliant with IS 3043 and IEC 62305-3.",
      },
      {
        question: "What earth resistance value can be achieved for Bengaluru facilities?",
        answer:
          "We engineer structural earthing grids in Bengaluru to reach below 1 Ω for substations and data centres, and below 5 Ω for commercial LPS installations, maintaining stability year-round.",
      },
      {
        question: "Are exothermic welds required for foundation earthing in Bengaluru?",
        answer:
          "Yes, exothermic welds provide a permanent molecular bond that cannot corrode or loosen over the lifespan of the concrete structure in Bengaluru.",
      },
      {
        question: "Which standards govern structural earthing in Karnataka?",
        answer:
          "All designs comply strictly with IS 3043:2018, IS/IEC 62305-3, and National Building Code 2016 Part 8.",
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
    lpsFaqs: [
      {
        question: "Who is the leading lightning protection manufacturer in Chennai?",
        answer:
          "DFMHUB manufactures ARK Make systems and supplies automotive plants, data centres, and industrial facilities across Sriperumbudur, Oragadam, OMR, and Ambattur with complete IS/IEC 62305 compliance.",
      },
      {
        question: "What does a lightning protection system cost in Chennai?",
        answer:
          "Cost is determined by protection level (LPL I to IV) and marine-grade corrosion specs (tinned copper or SS 316). We offer itemized BOM proposals and free site surveys in Chennai.",
      },
      {
        question: "Is lightning protection mandatory for commercial buildings in Chennai?",
        answer:
          "Yes, NBC 2016 Part 8 and Tamil Nadu Electrical Inspectorate mandate compliant LPS and earth resistance certificates for building plan sanctions and fire NOCs.",
      },
      {
        question: "How does coastal humidity impact lightning protection design in Chennai?",
        answer:
          "High salt spray requires tinned copper conductors or 316-grade stainless steel air terminals to prevent atmospheric corrosion over decades of exposure.",
      },
      {
        question: "What soil conditions affect earthing in Chennai?",
        answer:
          "Coastal alluvial soil gives good conductivity, but tidal moisture variations require deep-driven copper bonded rods with sealed test chambers to maintain <1 Ω ground resistance.",
      },
      {
        question: "How long does installation take in Chennai industrial parks?",
        answer:
          "Commercial towers take 5 to 10 days; large manufacturing facilities in Oragadam or Sriperumbudur take 2 to 4 weeks with zero plant downtime.",
      },
      {
        question: "Do you provide earth resistance testing and compliance certificates in Chennai?",
        answer:
          "Yes. Full fall-of-potential test reports, continuity certificates, as-built drawings, and IEC 62561 test evidence are delivered at handover for fire and insurance NOCs.",
      },
      {
        question: "Which areas of Chennai are covered?",
        answer:
          "Whole Chennai region including Sriperumbudur, Oragadam, Ambattur, OMR, Guindy, Ennore, and Maraimalai Nagar.",
      },
    ],
    earthingFaqs: [
      {
        question: "How do you protect earthing components from salt corrosion in Chennai?",
        answer:
          "We use heavy 250-micron copper bonded electrodes and tinned copper tapes welded exothermically to resist marine soil corrosion.",
      },
      {
        question: "What earth resistance value is required for Chennai industrial facilities?",
        answer:
          "Below 1 Ω for data centres and critical automotive substations, maintained year-round despite tidal shifts.",
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
    lpsFaqs: [
      {
        question: "Who is the best lightning protection system manufacturer in Hyderabad?",
        answer:
          "DFMHUB manufactures ARK Make systems and supplies pharma units, data centres, and IT campuses across HITEC City, Gachibowli, Genome Valley, and Patancheru with turnkey engineering.",
      },
      {
        question: "What is the cost of lightning protection in Hyderabad?",
        answer:
          "Cost depends on protection level (LPL I for pharma & data centres). DFMHUB provides free site surveys and itemized BOM quotes across Hyderabad.",
      },
      {
        question: "Is LPS compliance required for pharma plants and data centres in Hyderabad?",
        answer:
          "Yes, Telangana Fire & Electrical Inspectorate NOCs and USFDA/GMP audits for pharma plants require certified IS/IEC 62305 lightning protection.",
      },
      {
        question: "How does Hyderabad's rocky ground impact earthing design?",
        answer:
          "Hard granitic rock requires deep-bore chemical earth electrodes and bentonite enhancement compounds to reach low target resistance.",
      },
      {
        question: "What is the storm risk profile in Hyderabad?",
        answer:
          "40-55 thunderstorm days per year with intense ground flash density, pushing high-value facilities to LPL I or II rolling sphere mesh protection.",
      },
      {
        question: "How long does LPS installation take in Hyderabad?",
        answer:
          "5 to 12 days for commercial towers in HITEC City; 2 to 4 weeks for pharma complexes in Genome Valley or Patancheru.",
      },
      {
        question: "Do you issue test certificates for Hyderabad installations?",
        answer:
          "Yes, fall-of-potential earth resistance test readings, continuity logs, as-builts, and IEC 62561 certificates are included in the handover pack.",
      },
      {
        question: "Which areas in Hyderabad do you serve?",
        answer:
          "Entire Hyderabad metropolitan area including HITEC City, Gachibowli, Genome Valley, Patancheru, Shamshabad, and Jeedimetla.",
      },
    ],
    earthingFaqs: [
      {
        question: "How do you achieve low earth resistance in Hyderabad's granitic soil?",
        answer:
          "By drilling deep vertical boreholes and embedding copper bonded chemical electrodes in conductive earth enhancement compound.",
      },
      {
        question: "What earthing value is standard for Hyderabad data centres?",
        answer:
          "Below 1 Ω earth resistance, tested using 3-pole fall-of-potential method as mandated by IS 3043.",
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
    lpsFaqs: [
      {
        question: "Who manufactures and installs lightning protection systems in Pune?",
        answer:
          "DFMHUB manufactures ARK Make systems and delivers turnkey design, installation, and testing across PCMC, Chakan, Ranjangaon, and Hinjawadi.",
      },
      {
        question: "What does lightning protection cost for MIDC factories in Pune?",
        answer:
          "Pricing is based on structure height, roof area, and required LPL rating. Free site surveys and itemized BOMs are provided for all Pune MIDC projects.",
      },
      {
        question: "Is lightning protection mandatory for factories in Pune?",
        answer:
          "Yes, MIDC building bylaws, DISH factory inspectorate rules, and NBC 2016 Part 8 require compliant LPS with annual inspection certificates.",
      },
      {
        question: "How does black cotton soil in Pune affect earthing?",
        answer:
          "Black cotton soil shrinks in summer, causing standard pits to dry out. We install deep-driven copper bonded rods with chemical enhancement compound to maintain stable resistance.",
      },
      {
        question: "What is Pune's lightning exposure level?",
        answer:
          "50-65 thunderstorm days per year, requiring LPL I or II rolling sphere mesh protection for automotive and electronics manufacturing.",
      },
      {
        question: "What is the installation timeline for Pune industrial units?",
        answer:
          "5 to 10 days for IT parks in Hinjawadi; 2 to 4 weeks for large automotive plants in Chakan or Ranjangaon.",
      },
      {
        question: "Do you provide test documentation for MIDC & Fire NOCs in Pune?",
        answer:
          "Yes, full fall-of-potential test reports, continuity logs, as-built drawings, and IEC 62561 material test certificates.",
      },
      {
        question: "Which industrial zones in Pune are covered?",
        answer:
          "All Pune MIDC zones: Chakan, Talegaon, Ranjangaon, Bhosari, PCMC, Hinjawadi, Hadapsar, and Pirangut.",
      },
    ],
    earthingFaqs: [
      {
        question: "How do you prevent earthing failure in Pune's black cotton soil during summer?",
        answer:
          "We use moisture-retaining conductive cement compound around driven copper rods, penetrating below the active soil shrink layer.",
      },
      {
        question: "What earth resistance value is targeted for Pune automotive plants?",
        answer:
          "Below 1 Ω for main electrical substations and below 5 Ω for equipment and LPS earths per IS 3043:2018.",
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
    return { title: "Lightning Protection System | DFMHUB" };
  }
  return {
    title: `Lightning Protection System in ${city.name}, ${city.state} | IS/IEC 62305`,
    description: `DFMHUB manufactures ARK Make lightning protection systems for ${city.sectors} across ${city.areas} in ${city.name}, ${city.state}. Free site survey & IS/IEC 62305 design consultation.`,
    alternates: {
      canonical: `https://dfmhub.vercel.app/lightning-protection-system/${city.slug}`,
    },
    openGraph: {
      title: `Lightning Protection System in ${city.name} | DFMHUB`,
      description: `ARK Make components, risk assessment, installation and testing in ${city.name}, ${city.state}.`,
    },
  };
}

export default async function LightningProtectionCityPage({
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
      title: "ARK Air Terminals (Franklin Rods)",
      spec: "CU / AL / SS 18-25 MM DIA",
      desc: "Solid copper, aluminium and stainless steel finials with machined multi-point tips, supplied in 0.5 m to 3 m lengths to IS/IEC 62305-3 rolling sphere design.",
    },
    {
      title: "ARK Mesh Conductors & Tapes",
      spec: "25X3, 25X6, 32X6 MM",
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
  ];

  return (
    <div className="w-full transition-colors duration-200">
      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#070d19] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d19] via-[#091325]/90 to-transparent z-10" />
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/lps-hero.png"
            alt={`Lightning Protection System in ${city.name}`}
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
              <Link href="/lightning-protection-system" className="hover:text-amber-400">Lightning Protection System</Link>
              <span>&gt;</span>
              <span className="text-amber-400 font-bold">{city.name}</span>
            </div>

            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
              LIGHTNING PROTECTION SYSTEM · {city.name.toUpperCase()}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Lightning Protection System in {city.name}
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
              DFMHUB manufactures ARK Make lightning protection systems and delivers full design, installation and testing across {city.region} — from {city.areas.split(", ")[0]} to {city.areas.split(", ").slice(-1)[0]}.
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
              <p>
                {city.name} sees {city.storm}. That strike density drives the IS/IEC 62305-2 risk calculation upward, and for {city.sectors} the result is usually Lightning Protection Level I or II — a tighter mesh, more down conductors and fully coordinated surge protection.
              </p>
              <p>
                Earthing is the other half of the problem. Ground around {city.name} is characterised by {city.soil}, so we run a Wenner four-pin soil resistivity survey before design and select copper bonded, deep-bore or chemical electrodes accordingly, rather than defaulting to standard three-metre pits that dry out.
              </p>
              <p>
                Our {city.name} team handles roof and facade installation on occupied buildings with permit-to-work and height-safety controls, then hands over fall-of-potential earth resistance readings for every electrode, continuity across every test link, as-built drawings and IEC 62561 material certificates for fire NOC, insurance and audit use.
              </p>
              <p>
                Regular project work in the region covers {city.sectors}, with material supply to EPC and electrical contractors across {city.areas} and emergency post-strike inspection typically attended within 24 to 48 hours.
              </p>
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
              href="/lightning-protection-system"
              className="inline-flex items-center text-xs font-bold text-amber-600 hover:text-amber-700 uppercase tracking-wider"
            >
              <span>VIEW THE COMPLETE LIGHTNING PROTECTION SYSTEM RANGE</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: QUESTIONS PEOPLE ASK (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10">
            Lightning Protection System in {city.name} — questions people ask
          </h2>
          <FAQAccordion items={city.lpsFaqs} />
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
              Lightning Protection System in other cities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCities.map((other) => (
              <Link
                key={other.slug}
                href={`/lightning-protection-system/${other.slug}`}
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
