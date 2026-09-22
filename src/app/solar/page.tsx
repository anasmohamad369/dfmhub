import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  CheckCircle2,
  Info,
  Check,
  Building2,
  FileText,
  Sun,
  Anchor,
  Factory,
  Compass,
  Award,
  MapPin,
  ChevronRight,
  MessageCircle,
  ClipboardCheck,
  Shield,
  Activity,
  Cpu,
  FileCheck2,
  Wrench,
  Link2,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import ProductCarousel from "@/components/ProductCarousel";
import { getProductsByCategory, getAllProducts } from "@/lib/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfmhub.com";
const pageUrl = `${siteUrl}/solar`;

export const metadata: Metadata = {
  title: "Solar Earthing & Lightning Protection Accessories | ARK Make DFMHUB",
  description:
    "DFMHUB manufactures ARK solar earthing and lightning protection accessories for solar farms, rooftop and floating solar projects across India. Get a project quote.",
  keywords:
    "Solar Earthing and Lightning Protection Accessories, Solar earthing accessories manufacturer in India, Solar lightning protection system, Solar earthing materials supplier India, Solar farm earthing accessories, ARK Make solar accessories, BOS Earthing Clamp ARK-HG01, Floating solar earthing, Rooftop solar lightning protection",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Solar Earthing & Lightning Protection Accessories | ARK Make DFMHUB",
    description:
      "DFMHUB manufactures ARK solar earthing and lightning protection accessories for solar farms, rooftop and floating solar projects across India. Get a project quote.",
    url: pageUrl,
    siteName: "DFMHUB - ARK Solar Earthing & Lightning Protection Systems",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${siteUrl}/images/solar-earthing-hero.jpg`,
        width: 1200,
        height: 630,
        alt: "Solar Earthing and Lightning Protection Accessories by DFMHUB",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Earthing & Lightning Protection Accessories | ARK Make DFMHUB",
    description:
      "DFMHUB manufactures ARK solar earthing and lightning protection accessories for solar farms, rooftop and floating solar projects across India. Get a project quote.",
    images: [`${siteUrl}/images/solar-earthing-hero.jpg`],
  },
};

export default async function SolarEarthingLpsPage() {
  // Fetch real products from DB for the interactive carousel
  let products = await getProductsByCategory("LIGHTNING_PROTECTION", 8);
  if (!products || products.length === 0) {
    products = await getAllProducts();
  }

  const whatsappQuoteUrl = `https://wa.me/919483564777?text=${encodeURIComponent(
    "Hello DFMHUB Team, I would like to upload my Solar Project Earthing & Lightning Protection BOQ for an engineering review and price quote."
  )}`;

  const earthingComponents = [
    {
      title: "BOS Earthing Clamp",
      spec: "ARK-HG01",
      desc: "Bonding and earthing connection for compatible solar module frames or mounting structures where positive mechanical electrical continuity is specified.",
      features: ["Positive tooth bite penetrates anodized coating", "Corrosion resistant hardware", "Quick torque-controlled fastening"],
    },
    {
      title: "GI Earthing Strip",
      spec: "ARK-GI Series",
      desc: "Hot-dip galvanised steel flat strip for main array perimeter earthing grids and supplementary bonding in accordance with IS 3043.",
      features: ["Uniform 86+ micron zinc coating", "High mechanical tensile strength", "Pan-India bulk reel/strip supply"],
    },
    {
      title: "Copper Earthing Strip",
      spec: "ARK-CU Series",
      desc: "99.9% pure electrolytic tough pitch (ETP) copper strip for inverter rooms, transformer stations, and high-conductivity grounding busbars.",
      features: ["99.9% electrolytic grade copper", "High short-circuit withstand capacity", "Low electrical resistivity"],
    },
    {
      title: "10 mm Copper Bonded Conductor",
      spec: "ARK-CU10",
      desc: "Molecularly bonded copper over high-tensile steel core for array earthing rings, down conductors, and buried grid interconnections.",
      features: ["250+ micron copper bonding", "Flexible and easy to lay in trenches", "Immune to copper scrap theft"],
    },
    {
      title: "Earth Pit Inspection Cover",
      spec: "ARK-EP01",
      desc: "Heavy-duty poly-plastic & FRP earth inspection chamber providing quick access for regular earth resistance measurement and maintenance checks.",
      features: ["5+ Ton load bearing rating", "UV & weather stabilized polymer", "Clear identification marker tag"],
    },
    {
      title: "Chemical Earthing Compound",
      spec: "ARK-CH01",
      desc: "Environmentally safe, carbon & mineral-based soil enhancement compound engineered to maintain low earth resistance in dry/sandy solar terrain.",
      features: ["Non-leaching & non-corrosive", "IEC 62561-7 compliant", "Maintains moisture retention year-round"],
    },
    {
      title: "Equipotential Bonding Bar",
      spec: "ARK-EQ01",
      desc: "Centralised copper busbar with disconnecting link for bonding string inverters, tracker motors, DC combiner boxes, and structure rings.",
      features: ["Tinned copper busbar base", "Removable test link for audits", "Supplied with insulating standoff bases"],
    },
    {
      title: "SS & GI U-Bolt Clamp",
      spec: "ARK-UB01",
      desc: "Precision mechanical clamp for joining conductors to pipe-type foundation piles, module mounting torque tubes, and driven earth rods.",
      features: ["High gripping torque without deformation", "Stainless Steel 304/316 or HDG", "Zero loose contact risk"],
    },
    {
      title: "Four-Way Cross Connectors",
      spec: "ARK-CRS Series",
      desc: "Heavy-duty cross connector for secure orthogonal jointing of flat strips and round conductors in grid mesh ground layouts.",
      features: ["Tested to IEC 62561-1", "Dual bolt clamping pressure", "Eliminates unreliable site welding"],
    },
    {
      title: "Custom Solar Structure Clamps",
      spec: "Custom ARK Series",
      desc: "Tailored bonding brackets engineered for specific tracker torque tubes, fixed-tilt purlins, and specialized solar structural profiles.",
      features: ["Manufactured to client drawings", "Factory batch tested", "Short turnaround delivery"],
    },
  ];

  const lpsComponents = [
    {
      title: "Air Terminal Finial Rod",
      spec: "ARK-AT01",
      desc: "Solid electrolytic copper, aluminium, and stainless-steel interceptor finial with machined multi-point discharge tip.",
      features: ["0.5 m to 3 m lengths", "IS/IEC 62305-3 compliant", "Superior discharge efficiency"],
    },
    {
      title: "4m Galvanised Tripod Mast",
      spec: "ARK-AT04",
      desc: "Free-standing or fixed elevated tripod air terminal mast for inverter stations, control rooms, and solar farm substations.",
      features: ["High wind-speed withstand rating", "Heavy-duty hot-dip galvanised structure", "Pre-drilled down conductor guides"],
    },
    {
      title: "Heavy-Duty Base Mounting Plate",
      spec: "ARK-AT16",
      desc: "Rigid flat/pitched surface mounting base for securing air terminals to concrete rooftops, transformer walls, and tracker posts.",
      features: ["Multiple anchor hole positions", "Available in Brass, Al & GI", "Secure mechanical anchoring"],
    },
    {
      title: "8 mm Aluminium Down Conductor",
      spec: "ARK-AL08",
      desc: "Solid smooth aluminium round conductor wire engineered for rooftop air termination meshes and down conductor routes.",
      features: ["Lightweight & non-staining", "Easy hand bending on site", "High current carrying capacity"],
    },
    {
      title: "UV-Resistant Parapet Holder",
      spec: "ARK-PH08",
      desc: "Engineered nylon/polypropylene clamp designed to guide 8mm round conductor along parapet coping without masonry drilling.",
      features: ["UV stabilized polymer", "Snap-fit conductor locking", "Maintains neat aesthetic alignment"],
    },
    {
      title: "Weighted Flat Roof Conductor Holder",
      spec: "ARK-FL08",
      desc: "Concrete-filled or ballast base holder for routing conductors across flat industrial solar rooftops without membrane piercing.",
      features: ["No roof penetration required", "Prevents waterproofing leaks", "Withstands heavy wind drag"],
    },
    {
      title: "Aluminium Expansion Piece",
      spec: "ARK-EP08",
      desc: "Preformed bridge piece designed to absorb linear thermal expansion and contraction across long continuous solar array conductor runs.",
      features: ["Prevents fastener pull-out", "Accommodates 40°C+ thermal swing", "Ensures continuous conductivity"],
    },
    {
      title: "Standing-Seam Metal Roof Clamp",
      spec: "ARK-SS01",
      desc: "Non-penetrating mechanical clamp designed to lock conductor routes directly onto standing seam metal roof ribs on industrial sheds.",
      features: ["Zero roof perforation", "Preserves factory roof warranty", "High clamp tear-off strength"],
    },
    {
      title: "Trapezoidal Profile Roof Clamp",
      spec: "ARK-SS02",
      desc: "Conductor holder for trapezoidal ribbed industrial roofs with EPDM weather sealing washers and stainless steel fixings.",
      features: ["EPDM water-tight sealing", "Fits standard sheet profiles", "Corrosion resistant SS fasteners"],
    },
    {
      title: "Parallel Straight Connector",
      spec: "ARK-SL01",
      desc: "Two-screw mechanical joint component for creating continuous electrical links between successive 8-10mm conductor reels.",
      features: ["High contact surface area", "IEC 62561-1 tested", "Low contact resistance"],
    },
    {
      title: "Disconnecting Test Joint",
      spec: "ARK-TL01",
      desc: "Accessible test link box placed at 1.5m above ground to isolate earth termination from the down conductor during maintenance checks.",
      features: ["Easy disconnect for megger testing", "Clear weatherproof housing", "Standardized testing point"],
    },
    {
      title: "Lightning Strike Counter",
      spec: "ARK-LC01",
      desc: "Non-resettable electromagnetic pulse flash counter recording direct lightning discharge events on the solar plant down-conductor.",
      features: ["No external battery needed", "Registers up to 999,999 strikes", "IP67 outdoor weatherproof rating"],
    },
  ];

  const standardsList = [
    {
      code: "IS/IEC 62305 (Parts 1–4)",
      title: "Protection Against Lightning",
      desc: "Governs lightning risk assessment, rolling sphere air-termination geometry, down-conductor spacing, and LEMP protection for PV fields.",
    },
    {
      code: "IS 3043:2018",
      title: "Code of Practice for Earthing",
      desc: "Indian standard detailing grounding grid design, fault-current dissipation, touch/step voltage safety, and electrode specifications.",
    },
    {
      code: "IEC 62561 (Parts 1–7)",
      title: "LPS Components (LPSC)",
      desc: "Defines testing and construction requirements for clamps, bonding connectors, conductors, earth pit chambers, and soil enhancing compounds.",
    },
    {
      code: "IEC 60364-7-712",
      title: "Solar Photovoltaic (PV) Systems",
      desc: "Specifies electrical installation safety rules, equipotential bonding requirements, and DC-side isolation for solar PV power systems.",
    },
    {
      code: "IEC 61643-31 / IS 16571",
      title: "Surge Protective Devices (SPDs)",
      desc: "Governs performance, testing, and selection of Type 1 & Type 2 SPDs connected to the DC side of solar installations up to 1500V.",
    },
    {
      code: "CEA Regulations 2019",
      title: "Technical Safety Standards",
      desc: "Central Electricity Authority mandatory statutory guidelines for the safety and grounding of grid-tied renewable generation plants in India.",
    },
  ];

  const comparisonData = [
    {
      factor: "System Engineering Approach",
      ark: "Engineered solar package mapped to site drawings & IEC 62305",
      generic: "Random loose parts bought from generic unverified suppliers",
    },
    {
      factor: "BOS Clamp Compatibility",
      ark: "Penetrates anodization layer reliably without galvanic corrosion",
      generic: "Often non-standard hardware causing loose contacts & hot-spots",
    },
    {
      factor: "Galvanising & Coating Quality",
      ark: "86+ micron HDG coating & 250+ micron pure copper bonding",
      generic: "Sub-standard zinc or thin electroplating failing in 2–3 years",
    },
    {
      factor: "Component Testing Evidence",
      ark: "Tested to applicable IEC 62561 standards with traceable test reports",
      generic: "No type-test certificates; fails consultant technical audits",
    },
    {
      factor: "BOQ Line-Item Mapping",
      ark: "Dedicated technical review to eliminate mismatches before dispatch",
      generic: "Supplier provides whatever is in stock; requires site alterations",
    },
    {
      factor: "Application Diversity",
      ark: "Tailored ranges for Ground Utility, Floating PV & Industrial Sheds",
      generic: "One-size-fits-all products unsuitable for specialized terrain",
    },
    {
      factor: "Pan-India Site Delivery",
      ark: "Coordinated batch dispatches with packing lists to remote project sites",
      generic: "Frequent delivery delays and missing hardware in transport",
    },
  ];

  const faqs = [
    {
      question: "Why do solar power plants require dedicated earthing and lightning protection?",
      answer:
        "Solar plants feature extensive metallic structures, high-voltage DC string cables, inverter transformers, and sensitive SCADA monitoring equipment spread across open, exposed terrain. A coordinated earthing and lightning protection system prevents dangerous touch/step voltages for maintenance personnel, averts direct strike physical damage, and safeguards string inverters from transient surge overvoltages.",
    },
    {
      question: "What is the function of the BOS Earthing Clamp (ARK-HG01)?",
      answer:
        "The ARK-HG01 BOS Earthing Clamp provides an electrically continuous and mechanically secure connection between the solar PV module aluminium frame and the metallic mounting structure (MMS). It incorporates precision serrations that pierce the non-conductive anodized layer of the module frame to ensure a low-resistance path to earth.",
    },
    {
      question: "Which conductor material is best for solar farm earthing: GI or Copper?",
      answer:
        "Hot-Dip Galvanised (GI) strip is standard for large-scale utility array perimeter grounding due to its high mechanical strength, cost-effectiveness, and compatibility with galvanized steel mounting structures. Copper or copper-bonded conductors are generally specified for inverter rooms, transformer neutrals, control buildings, and high-resistivity soils where maximum conductivity and corrosion resistance are paramount.",
    },
    {
      question: "How is lightning protection designed for large-scale ground solar fields?",
      answer:
        "Solar farm lightning protection is designed using the Rolling Sphere, Protection Angle, or Mesh methods defined in IS/IEC 62305. The assessment determines whether utility structures require elevated air terminals (such as 4m tripod masts) or if structure-integrated conductors and coordinated surge protective devices (SPDs) provide the required protection level.",
    },
    {
      question: "Can an air terminal or lightning rod alone protect an entire solar plant?",
      answer:
        "No. A lightning arrestor or air terminal is only the interception point. A functional external LPS requires an engineered down-conductor network, test joints, equipotential bonding with the inverter grounds, a low-impedance earth termination network, and coordinated Type 1/Type 2 SPDs to mitigate electromagnetic pulse (LEMP) damage.",
    },
    {
      question: "What special earthing considerations apply to Floating Solar PV projects?",
      answer:
        "Floating solar projects operate in high-humidity aquatic environments with constant wave motion. They require highly flexible conductors that tolerate mechanical flexing without fatigue, 316-grade stainless steel hardware to prevent galvanic water corrosion, and specialized bonding bridges at the floating-to-shore electrical boundary.",
    },
    {
      question: "How do you install lightning protection on rooftop solar without penetrating the roof?",
      answer:
        "On commercial and industrial roofs, DFMHUB provides non-penetrating standing-seam clamps (ARK-SS01) that grip the metal standing seams directly, or weighted ballast conductor holders (ARK-FL08) for flat membrane roofs. This ensures complete lightning conductor routing while preserving roof waterproofing warranties.",
    },
    {
      question: "What standards apply to ARK Solar Earthing and LPS accessories?",
      answer:
        "ARK Make accessories are manufactured and selected with reference to IS/IEC 62305 (Parts 1–4), IS 3043:2018 (Earthing Practice), IEC 62561 (Parts 1–7 for Component Testing), IEC 60364-7-712 (Solar PV Installations), and CEA Technical Standards.",
    },
    {
      question: "Can DFMHUB manufacture custom earthing clamps for specific mounting structures?",
      answer:
        "Yes. DFMHUB provides custom engineering and manufacturing for specialized tracker torque tubes, custom purlin geometries, and non-standard conductor gauges based on drawings and approved EPC BOQ specifications.",
    },
    {
      question: "How quickly can DFMHUB quote a solar project BOQ?",
      answer:
        "When EPC contractors or consultants provide their itemised BOQ, single-line diagrams (SLD), and specification sheets, our technical engineering team typically provides product line-item mapping and commercial quotes within 24 to 48 business hours.",
    },
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Solar Earthing & Lightning Protection",
        item: pageUrl,
      },
    ],
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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "DFMHUB",
    url: siteUrl,
    description:
      "DFMHUB manufactures ARK solar earthing and lightning protection accessories for solar farms, rooftop and floating solar projects across India.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  };

  return (
    <div className="w-full transition-colors duration-200">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      {/* ========================================================= */}
      {/* SECTION 1: HERO SECTION (DEEP NAVY #070d19 WITH AMBIENT GLOW) */}
      {/* ========================================================= */}
      <section className="relative bg-[#070d19] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d19] via-[#091325]/90 to-slate-900/60 z-10" />
        <div className="absolute inset-0 z-0 opacity-40">
          <Image
            src="/images/solar-earthing-hero.jpg"
            alt="ARK Solar Earthing and Lightning Protection Accessories on utility scale solar farm"
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="text-amber-400 font-bold">
                Solar Earthing &amp; Lightning Protection
              </span>
            </div>

            {/* Top Tagline Badge */}
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-xs font-bold text-amber-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>ARK MAKE · SOLAR FARMS · ROOFTOP · FLOATING PV · PAN-INDIA SUPPLY</span>
            </div>

            {/* Main Page Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-[1.15] tracking-tight">
              Solar Earthing &amp; Lightning Protection Accessories <br />
              <span className="text-amber-400 underline decoration-amber-500/50 underline-offset-8">
                Engineered to IS 3043 &amp; IS/IEC 62305.
              </span>
            </h1>

            {/* Subtitle / Excerpt */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
              DFMHUB manufactures and supplies ARK Make certified solar earthing and external lightning protection hardware for utility-scale solar farms, industrial rooftop PV arrays, and floating solar installations across India.
            </p>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-14 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:shadow-emerald-900/30 transition-all flex items-center justify-center space-x-2 border border-emerald-400/30 shrink-0"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>UPLOAD BOQ &amp; PRICE CHECK</span>
              </a>

              <a
                href="#boq-quote"
                className="h-14 px-6 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center justify-center space-x-2 shrink-0"
              >
                <span>GET PROJECT QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#accessories"
                className="h-14 px-6 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-slate-700 hover:border-amber-500/50 transition-all flex items-center justify-center space-x-2 shadow-lg shrink-0"
              >
                <span>EXPLORE PRODUCTS</span>
                <ChevronRight className="w-5 h-5 text-amber-400" />
              </a>
            </div>
          </div>

          {/* Metric Stats Banner (Matching Home Page) */}
          <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-bold text-amber-500 block">500+ MWp</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                SOLAR CAPACITY PROTECTED
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-bold text-amber-500 block">25+ YRS</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                CORROSION RESISTANCE
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-bold text-amber-500 block">100%</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                TYPE-TESTED TO IEC 62561
              </span>
            </div>
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl font-bold text-amber-500 block">PAN-INDIA</span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                SITE DISPATCH &amp; SUPPORT
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 2: WHY IT MATTERS (REDESIGNED PREMIUM AESTHETIC) */}
      {/* ========================================================= */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-12 max-w-4xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              ENGINEERING CHALLENGE IN SOLAR PV
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Why Coordinated Earthing &amp; Lightning Protection Matter in Solar Plants
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Utility-scale solar farms, industrial rooftop installations, and floating PV arrays encompass thousands of conductive module frames, high-voltage DC string cables, inverters, and sensitive SCADA networks spread over wide, exposed terrain.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            {/* Left Column: 3 High-Impact Cards Instead of Plain Text */}
            <div className="lg:col-span-7 space-y-5">

              {/* Feature 1 */}
              <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400/70 transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                  <ShieldCheck className="w-6 h-6 text-amber-600" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Step &amp; Touch Potential Protection for Field Personnel
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    In multi-megawatt solar plants, ground fault currents create dangerous localized potential gradients. An engineered equipotential grid dissipates fault energy safely to prevent shock hazards for O&amp;M teams.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400/70 transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                  <Activity className="w-6 h-6 text-amber-600" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Galvanic Corrosion &amp; Positive Contact Integrity
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Combining aluminium module frames with galvanized or copper grounding without certified bimetallic clamps triggers electrochemical corrosion, resulting in high-resistance hotspots and fire risks.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-amber-400/70 transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
                  <Zap className="w-6 h-6 text-amber-600" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Direct Strike &amp; Electromagnetic Pulse (LEMP) Defense
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    A lightning strike to an unshielded PV table propagates destructive transient surges down DC cables into central inverters and tracker electronics. Coordinated air-terminals and SPDs eliminate catastrophic downtime.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: Visual Card with Image & Callout Box */}
            <div className="lg:col-span-5 space-y-5">
              <div className="relative w-full h-[280px] sm:h-[340px] rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                <Image
                  src="/images/solar-earthing-hero.jpg"
                  alt="ARK Make Solar Earthing and Lightning Protection hardware installation on PV array"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block mb-1">
                    ENGINEERED SOLAR BOS HARDWARE
                  </span>
                  <p className="text-xs sm:text-sm font-medium text-slate-200">
                    ARK Make BOS clamps &amp; conductors installed across multi-megawatt solar plants.
                  </p>
                </div>
              </div>

              {/* High-Contrast Engineering Callout */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#091325] text-white border border-amber-500/40 shadow-lg space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <span className="font-bold text-sm sm:text-base text-amber-400">
                    ARK Make by DFMHUB — Engineering-Led Supply
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  There is no single universal earthing layout suitable for every solar project. DFMHUB reviews your plant layout, soil resistivity, DC string architecture, and structural geometry to provide an exact, standards-compliant BOQ.
                </p>
              </div>
            </div>

          </div>

          {/* Process Flow Ribbon */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-sm">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-3">
              Coordinated Solar Plant Earthing &amp; LPS Flow:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
              <span className="bg-white border border-slate-300 px-3.5 py-1.5 rounded-lg shadow-xs">Module Frame (BOS Clamps)</span>
              <span className="text-amber-500 font-bold">&rarr;</span>
              <span className="bg-white border border-slate-300 px-3.5 py-1.5 rounded-lg shadow-xs">Mounting Structure Continuity</span>
              <span className="text-amber-500 font-bold">&rarr;</span>
              <span className="bg-white border border-slate-300 px-3.5 py-1.5 rounded-lg shadow-xs">Array Perimeter Conductors</span>
              <span className="text-amber-500 font-bold">&rarr;</span>
              <span className="bg-white border border-slate-300 px-3.5 py-1.5 rounded-lg shadow-xs">Equipotential Inverter Bonding</span>
              <span className="text-amber-500 font-bold">&rarr;</span>
              <span className="bg-white border border-slate-300 px-3.5 py-1.5 rounded-lg shadow-xs">Low-Resistance Earth Termination</span>
              <span className="text-amber-500 font-bold">&rarr;</span>
              <span className="bg-amber-500 text-white px-3.5 py-1.5 rounded-lg shadow-sm">Coordinated External LPS Interface</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 3: DESIGN & TESTING STANDARDS (DARK NAVY #040812) */}
      {/* ========================================================= */}
      <section className="w-full bg-[#040812] text-white py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

          <div>
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-2">
              DESIGN &amp; TESTING STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              The Codes Every ARK Make Solar System Is Built To
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed font-normal">
              Designed as per IS/IEC 62305, IS 3043, and tested in accordance with the IEC 62561 series, ARK Make accessories ensure durable safety across diverse Indian soil chemistries and climatic zones.
            </p>
          </div>

          {/* 6 Standards Grid with Amber Borders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {standardsList.map((std) => (
              <div
                key={std.code}
                className="bg-[#08101e] border border-slate-800 hover:border-amber-500/60 p-5 rounded-2xl transition-all space-y-2.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-md">
                    {std.code}
                  </span>
                  <ShieldCheck className="w-5 h-5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                </div>
                <h3 className="font-bold text-sm sm:text-base text-white tracking-wide group-hover:text-amber-300 transition-colors">
                  {std.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Compliance Assurance Banner */}
          <div className="border border-amber-500/80 rounded-2xl p-6 bg-[#08101e] flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ClipboardCheck className="w-7 h-7 text-amber-400" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-amber-400 text-xs sm:text-sm tracking-wider uppercase">
                ENGINEERED FOR COMPLIANCE. BUILT FOR SOLAR LIFECYCLE RELIABILITY.
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Every ARK component is delivered with verifiable mill test certificates (MTC), galvanising test reports, and IEC 62561 type-test records required for CEA, DISCOM, and Third-Party Technical Audits.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 4: REAL PRODUCT CAROUSEL (FROM DATABASE) */}
      {/* ========================================================= */}
      {/* 1 */}

      {/* ========================================================= */}
      {/* SECTION 5: 10 ARK SOLAR EARTHING ACCESSORIES (#f8fafc) */}
      {/* ========================================================= */}
      <section id="accessories" className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10 max-w-4xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              SOLAR EARTHING ACCESSORIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              ARK Solar Earthing &amp; Bonding Hardware Catalog
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Manufactured with high-conductivity materials and robust corrosion protection for repeatable, fault-tolerant solar plant connections.
            </p>
          </div>

          {/* Grid of Component Cards (Matching LPS & Earthing Pages) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {earthingComponents.map((comp) => (
              <div
                key={comp.title}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="bg-[#09101f] text-white p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors">
                      {comp.title}
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block mt-1">
                      {comp.spec}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                </div>
                <div className="p-5 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal flex-grow bg-white space-y-3">
                  <p>{comp.desc}</p>
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {comp.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical Specification Table */}
          <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 px-6 bg-slate-100/90 text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider w-1/3">
                      Component Name
                    </th>
                    <th className="py-4 px-6 bg-amber-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider w-1/4">
                      ARK Model Code
                    </th>
                    <th className="py-4 px-6 bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider">
                      Solar Project Function
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {earthingComponents.map((item, idx) => (
                    <tr
                      key={item.title}
                      className={idx % 2 === 0 ? "bg-white hover:bg-slate-50/80 transition-colors" : "bg-slate-50/40 hover:bg-slate-50 transition-colors"}
                    >
                      <td className="py-3.5 px-6 font-semibold text-slate-900 border-r border-slate-100">
                        {item.title}
                      </td>
                      <td className="py-3.5 px-6 text-amber-800 font-mono font-bold bg-amber-50/30 border-r border-slate-100">
                        {item.spec}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">
                        {item.desc}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 6: 12 ARK EXTERNAL LPS COMPONENTS (WHITE) */}
      {/* ========================================================= */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10 max-w-4xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              EXTERNAL LIGHTNING PROTECTION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              ARK External LPS Components for Solar Installations
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Type-tested air terminals, conductor clamps, non-penetrating rooftop holders, and lightning event counters.
            </p>
          </div>

          {/* Grid of LPS Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {lpsComponents.map((comp) => (
              <div
                key={comp.title}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                <div className="bg-[#09101f] text-white p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-400 transition-colors">
                      {comp.title}
                    </h3>
                    <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block mt-1">
                      {comp.spec}
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                </div>
                <div className="p-5 text-slate-600 text-xs sm:text-sm leading-relaxed font-normal flex-grow bg-white space-y-3">
                  <p>{comp.desc}</p>
                  <div className="pt-2 border-t border-slate-100 space-y-1.5">
                    {comp.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 7: APPLICATION SECTORS (GROUND, FLOATING, ROOFTOPS) */}
      {/* ========================================================= */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">

          <div className="max-w-4xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              SECTOR SOLUTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              Application-Specific Solar Engineering
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Different solar installations pose unique environmental and structural challenges. ARK Make accessories are tailored for utility ground mounts, aquatic floating solar arrays, and industrial C&amp;I rooftops.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Card 1: Utility Ground Mount */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Sun className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Ground-Mounted Solar Farms
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Utility-scale solar fields span hundreds of acres. Protection focuses on array perimeter ring earthing, low-impedance substation grounding, 4m elevated tripod masts, and BOS module clamps across thousands of tracker rows.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Heavy-duty Hot Dip Galvanised strips</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Chemical earthing for arid desert soils</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Rolling sphere 4m tripod air terminals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Floating Solar */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Anchor className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Floating Solar PV Projects
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Floating arrays on reservoirs operate in 100% relative humidity with continuous wave motion. Requires highly flexible conductors, 316-grade stainless steel hardware, and specialized shore-to-water transition bonding.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>SS 316 marine-grade bonding clamps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Flexibility joints for wave oscillation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Shore transition bonding terminals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: C&I Rooftop Solar */}
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Building2 className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Commercial Rooftop Solar
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Industrial sheds require non-penetrating standing seam clamps (ARK-SS01) or ballast roof holders to preserve factory waterproofing warranties while maintaining safe separation distances from existing LPS networks.
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Non-penetrating standing seam clamps</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Lightweight 8mm round aluminium wire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Separation distance calculation support</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 8: COMPARISON EVALUATION (MATCHING LPS PAGE) */}
      {/* ========================================================= */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="mb-10 max-w-4xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              COMPARISON EVALUATION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              ARK Engineered Solar Accessories vs Generic Unspecified Hardware
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              Solar EPC contractors and project consultants should evaluate whether earthing accessories support the long-term 25-year design life of the solar power plant.
            </p>
          </div>

          {/* High-Contrast Comparison Table */}
          <div className="w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg bg-white mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-4 px-6 bg-slate-100/90 text-slate-900 font-bold text-xs sm:text-sm uppercase tracking-wider w-1/3">
                      Evaluation Criteria
                    </th>
                    <th className="py-4 px-6 bg-amber-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider w-1/3">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-white" />
                        <span>ARK Engineered Approach</span>
                      </div>
                    </th>
                    <th className="py-4 px-6 bg-slate-800 text-slate-200 font-bold text-xs sm:text-sm uppercase tracking-wider w-1/3">
                      Generic Unspecified Market Materials
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

          {/* Important Info Note */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-5 sm:p-6 shadow-sm flex items-start gap-4">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
              <Info className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-xs sm:text-sm leading-relaxed text-slate-700">
              <span className="font-bold text-slate-900 block mb-1">Procurement Advisory:</span>
              Failure of low-cost grounding hardware represents the single most common cause of solar field inverter tripping and warranty disputes. Specifying batch-tested ARK Make components eliminates installation rejection risks during final plant handover.
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 9: 10-POINT PROCUREMENT CHECKLIST (#f8fafc) */}
      {/* ========================================================= */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

          <div className="max-w-3xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              EPC QUOTATION GUIDELINES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
              10-Point Solar BOQ Review Checklist
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Share the following project parameters for rapid 24-hour BOQ mapping and line-item quotation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              "1. Plant Capacity (MW/MWp)",
              "2. Project Installation Type",
              "3. Array General Arrangement (GA)",
              "4. Single Line Diagram (SLD)",
              "5. Itemised Material BOQ",
              "6. Conductor Gauge & Material",
              "7. Module Mounting Structure Detail",
              "8. Substation & Inverter Layout",
              "9. Soil Resistivity (Wenner Test)",
              "10. Delivery Schedule & Site Location",
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3 text-xs sm:text-sm font-semibold text-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 10: FAQS (INTERACTIVE ACCORDION) */}
      {/* ========================================================= */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-4xl">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              Solar Earthing &amp; Lightning Protection — FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Technical answers regarding BOS clamps, rolling sphere coverage, floating solar protection, and BOQ review.
            </p>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ========================================================= */}
      {/* SECTION 11: BOQ QUOTE CONTACT FORM (#f1f5f9) */}
      {/* ========================================================= */}
      <section id="boq-quote" className="w-full bg-[#f1f5f9] text-slate-900 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              PROJECT QUOTATION &amp; BOQ REVIEW
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
              Need Solar Earthing or Lightning Protection Materials?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Planning a utility-scale solar farm, rooftop PV plant, or floating solar project? Share your drawings, BOQ, or project specifications. Our engineering team in Bengaluru will prepare an itemised quotation with batch-test certifications.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
