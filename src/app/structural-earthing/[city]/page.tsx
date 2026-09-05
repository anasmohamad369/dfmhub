import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  MapPin,
  ShieldCheck,
  Zap,
} from "lucide-react";
import FAQAccordion from "@/components/FAQAccordion";
import ContactForm from "@/components/ContactForm";
import { notFound } from "next/navigation";
import { getDynamicMetadata, getDynamicHeroImage } from "@/lib/seo";

export const dynamic = "force-dynamic";


interface CityData {
  name: string;
  slug: string;
  state: string;
  region: string;
  areas: string;
  sectors: string;
  soil: string;
  storm: string;
  desc?: string;
  heroSubtext?: string;
  subofsub?: string;
  climateRiskHeading?: string;
  climateRiskPara1?: string;
  climateData?: string;
  climateRiskPara2?: string;
  climateRiskPara3?: string;
  soilHeading?: string;
  soilPara1?: string;
  soilPara2?: string;
  soilPara3?: string;
  productsHeading?: string;
  productsList?: string[];
  productsNote?: string;
  riskAssessmentTitle?: string;
  riskAssessmentText1?: string;
  riskAssessmentText2?: string;
  riskAssessmentSteps?: string;
  supportTitle?: string;
  supportServices?: string[];
  supportLocationsText?: string;
  ctaText?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string;
  earthingIntro?: {
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
    areas:
      "Whitefield | Electronic City | Peenya | Bommasandra | Anekal | Hebbal | Yeshwanthpur | Devanahalli / Aerospace Park",
    sectors:
      "Data Centres | IT Campuses | High-Rise Buildings | Hospitals | Industrial Plants | Commercial Buildings | Infrastructure Projects",
    soil: "granite and gneiss terrain with red loamy, sandy and lateritic soils",
    storm: "45-60 thunderstorm days annually",
    desc: "DFMHUB is a Bengaluru (Bangalore) based manufacturer of ARK Structural Earthing System components, providing engineering support for foundation earthing, RCC rebar bonding, fixed earthing terminals, equipotential bonding, installation coordination, continuity testing and project documentation.",
    heroSubtext:
      "The system is designed to integrate earthing provisions into the building structure during construction instead of treating earthing as an activity to be added after the RCC work is completed.",
    subofsub:
      "Engineering Review → Earthing Design → ARK Products → RCC Coordination → Testing → Documentation",
    climateRiskHeading: "Structural Earthing for Bengaluru Conditions",
    climateRiskPara1:
      "Bengaluru Urban is predominantly associated with granite and gneiss terrain with red loamy, sandy and lateritic soils. Ground conditions can vary considerably across developed areas, making site-specific engineering preferable to assuming a standard earthing arrangement.",
    climateData: "For Bengaluru projects, the earthing design may consider:",
    climateRiskPara2:
      "Soil Conditions | Foundation Type | RCC Layout | Fault Current | Electrical Loads | LPS Interface | Equipment Bonding | Project Specifications",
    climateRiskPara3:
      "Where required, soil resistivity measurements can be used as an engineering input.",
    soilHeading: "ARK Structural Earthing System",
    soilPara1:
      "The ARK system can integrate: Foundation Earthing Network → Rebar Bonding → Vertical Earthing Paths → Fixed Earthing Terminals → Equipment Bonding → Lightning Protection Interface.",
    soilPara2:
      "Suitable structural reinforcement may form part of the earthing/bonding network where permitted by the project design and applicable standards and where electrical continuity is verified.",
    soilPara3: "",
    productsHeading: "ARK Structural Earthing Products",
    productsList: [
      "10 mm Copper Bonded Conductor",
      "Rebar Bonding Clamps",
      "Diagonal Clamps",
      "Cross Connectors",
      "Straight Connectors",
      "Fixed Earthing Terminals",
      "Earth Studs with Copper Tail",
      "Equipotential Bonding Bars",
      "Strip / Conductor Holders",
      "Project-Specific Bonding Accessories",
    ],
    productsNote:
      "Applicable components can be supplied with relevant material, electrical resistivity, salt-spray, mechanical and chemical test documentation, depending on product and project requirements.",
    riskAssessmentTitle: "Free Structural Earthing Design Review",
    riskAssessmentText1:
      "DFMHUB offers a Free Structural Earthing Design Review in Bengaluru.",
    riskAssessmentText2:
      "Share your foundation layout, RCC drawings, building dimensions, and project specification. Our engineering team reviews the inputs and assists in integrating structural earthing provisions into the building design.",
    riskAssessmentSteps:
      "Drawing Review → Earthing Layout → Rebar Bonding → RCC Coordination → Continuity Testing → Inspection → As-Built Documentation",
    supportTitle: "Design, Installation & Testing Support",
    supportServices: [
      "Drawing Review",
      "Earthing Layout",
      "Rebar Bonding",
      "RCC Coordination",
      "Continuity Testing",
      "Inspection Before Concreting",
      "As-Built Documentation",
    ],
    supportLocationsText:
      "Support is available across: Whitefield | Electronic City | Peenya | Bommasandra | Anekal | Hebbal | Yeshwanthpur | Devanahalli / Aerospace Park. Typical applications: Data Centres | IT Campuses | High-Rise Buildings | Hospitals | Industrial Plants | Commercial Buildings | Infrastructure Projects.",
    ctaText:
      "Looking for a Structural Earthing System in Bengaluru? Start with a Free Structural Earthing Design Review by DFMHUB.",
    metaTitle:
      "Structural Earthing System Manufacturer in Bengaluru – ARK Make",
    metaDescription:
      "DFMHUB manufactures ARK Structural Earthing System components in Bengaluru. Foundation earthing, RCC rebar bonding, design review, testing & documentation.",
    keywords:
      "Structural Earthing System in Bengaluru, Structural Earthing Bengaluru, Structural Earthing Manufacturer Bengaluru, Foundation Earthing Bengaluru, Rebar Bonding Bengaluru, Fixed Earthing Terminals Bengaluru, Equipotential Bonding Bengaluru, IS 3043 Structural Earthing, ARK Structural Earthing",
    earthingFaqs: [
      {
        question: "What is a Structural Earthing System?",
        answer:
          "It is an engineered earthing and bonding network coordinated with the building foundation and structural reinforcement to establish reliable electrical continuity and earthing paths.",
      },
      {
        question: "When should structural earthing be planned?",
        answer:
          "Ideally during the foundation and RCC design stage, before reinforcement connections become concealed.",
      },
      {
        question: "Does Bengaluru soil affect the earthing design?",
        answer:
          "Yes. Granite/gneiss terrain and varying red loamy and lateritic soils mean site conditions should be considered instead of applying one electrode arrangement to every project.",
      },
      {
        question: "Does DFMHUB provide structural earthing design support?",
        answer:
          "Yes. DFMHUB supports design review, product selection, installation coordination, continuity testing and documentation.",
      },
      {
        question:
          "Can structural earthing interface with a Lightning Protection System?",
        answer:
          "Yes, where permitted by the LPS design and applicable standards. Suitable structural reinforcement and dedicated conductors may form coordinated current paths when continuity and connection requirements are satisfied.",
      },
    ],
  },
  chennai: {
    name: "Chennai",
    slug: "chennai",
    state: "Tamil Nadu",
    region: "Chennai and greater Tamil Nadu",
    areas:
      "Ambattur | Guindy | Manali | OMR | Taramani | Siruseri | Oragadam | Sriperumbudur | Maraimalai Nagar",
    sectors:
      "Automotive Plants | Electronics Manufacturing | Data Centres | IT Parks | High-Rise Buildings | Industrial Facilities | Commercial Projects",
    soil: "coastal and alluvial formations with combinations of sand, clay, gravel and lateritic formations",
    storm: "35-50 thunderstorm days annually",
    desc: "DFMHUB provides ARK Structural Earthing Systems in Chennai, combining engineering design, manufacturer-direct product supply, RCC coordination, installation support, continuity testing and documentation.",
    heroSubtext:
      "The system is particularly suited to projects where earthing needs to be incorporated into the foundation and RCC construction from the beginning.",
    subofsub:
      "Design → ARK Products → Rebar Bonding → RCC Coordination → Testing",
    climateRiskHeading: "Chennai Coastal & Ground Conditions",
    climateRiskPara1:
      "Chennai and its surrounding region include coastal and alluvial formations with combinations of sand, clay, gravel and lateritic formations, while groundwater conditions can also be influenced by proximity to the coast.",
    climateData: "For structural earthing, Chennai projects should pay particular attention to:",
    climateRiskPara2:
      "Coastal Exposure | Moisture | Salinity | Material Compatibility | Corrosion Resistance | Foundation Conditions",
    climateRiskPara3:
      "Material selection around embedded and exposed interfaces should consider the possibility of corrosion and incompatible metal combinations.",
    soilHeading: "ARK Structural Earthing Products for Chennai",
    soilPara1:
      "For Chennai projects, component selection can place additional emphasis on corrosion resistance and material compatibility.",
    soilPara2: "",
    soilPara3: "",
    productsHeading: "ARK Structural Earthing Products for Chennai",
    productsList: [
      "10 mm Copper Bonded Conductors",
      "Rebar Bonding Clamps",
      "Fixed Earthing Terminals",
      "Earth Studs",
      "Cross Connectors",
      "Diagonal Clamps",
      "Straight Connectors",
      "Equipotential Bonding Bars",
    ],
    productsNote:
      "For Chennai projects, component selection can place additional emphasis on corrosion resistance and material compatibility.",
    riskAssessmentTitle: "Free Structural Earthing Design Review",
    riskAssessmentText1:
      "Share your: Foundation Drawing + RCC/Rebar Drawing + Electrical SLD + Building Use + Project Earthing Specification.",
    riskAssessmentText2:
      "DFMHUB can recommend suitable: Foundation Routes | Rebar Connections | Earthing Terminals | Equipment Bonding Points | LPS Interfaces.",
    riskAssessmentSteps:
      "Connection Inspection → Continuity Testing → Fixed-Terminal Inspection → Quality Checks → Photo Records → As-Built Documentation",
    supportTitle: "Installation & Quality Control",
    supportServices: [
      "Connection Inspection",
      "Continuity Testing",
      "Fixed-Terminal Inspection",
      "Quality Checks",
      "Photo Records",
      "As-Built Documentation",
    ],
    supportLocationsText:
      "Support across: Ambattur | Guindy | Manali | OMR | Taramani | Siruseri | Oragadam | Sriperumbudur | Maraimalai Nagar. Applications include: Automotive Plants | Electronics Manufacturing | Data Centres | IT Parks | High-Rise Buildings | Industrial Facilities | Commercial Projects.",
    ctaText:
      "Looking for a Structural Earthing System in Chennai? Start with a Free Structural Earthing Design Review by DFMHUB.",
    metaTitle: "Structural Earthing System in Chennai – ARK Make by DFMHUB",
    metaDescription:
      "DFMHUB provides ARK Structural Earthing Systems in Chennai. Engineering design, product supply, rebar bonding, RCC coordination, testing & documentation.",
    keywords:
      "Structural Earthing System in Chennai, Structural Earthing Chennai, Structural Earthing Manufacturer Chennai, Foundation Earthing Chennai, Rebar Bonding Chennai, Fixed Earthing Terminals Chennai, Equipotential Bonding Chennai",
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
    areas:
      "HITEC City | Gachibowli | Financial District | Genome Valley | Medchal | Patancheru | Jeedimetla | Shamshabad",
    sectors:
      "Data Centres | IT Campuses | Pharma | Life Sciences | Hospitals | Industrial Plants | Warehouses | High-Rise Buildings",
    soil: "crystalline granite and granite-gneiss formations, including weathered and fractured hard-rock zones",
    storm: "40-55 thunderstorm days annually",
    desc: "DFMHUB provides ARK Structural Earthing Systems in Hyderabad for data centres, IT campuses, pharmaceutical facilities, industrial plants, hospitals and high-rise projects.",
    heroSubtext:
      "Solutions can cover: Foundation Earthing Design → Rebar Bonding → Fixed Earthing Terminals → Equipment Bonding → Testing → Documentation",
    subofsub:
      "Foundation Earthing Design → Rebar Bonding → Fixed Earthing Terminals → Equipment Bonding → Testing → Documentation",
    climateRiskHeading: "Hyderabad Soil & Ground Conditions",
    climateRiskPara1:
      "Hyderabad and surrounding areas are substantially associated with crystalline granite and granite-gneiss formations, including weathered and fractured hard-rock zones.",
    climateData: "Engineering considerations:",
    climateRiskPara2:
      "These conditions make it important to distinguish between the structural bonding network and the final earth-termination requirements rather than assuming that one standard pit arrangement will work everywhere.",
    climateRiskPara3:
      "Hyderabad projects such as data centres, IT facilities, pharma plants and laboratories can have extensive electrical, electronic and mechanical services requiring coordinated equipotential bonding.",
    soilHeading: "Structural Earthing for Critical Facilities",
    soilPara1:
      "The structural earthing design can identify: Foundation Routes | Rebar Bonding Points | Vertical Paths | Equipment Terminals | Equipotential Bonding | Lightning Protection Interfaces.",
    soilPara2: "",
    soilPara3: "",
    productsHeading: "ARK Products",
    productsList: [
      "10 mm Copper Bonded Conductors",
      "Rebar Bonding Clamps",
      "Earth Studs",
      "Fixed Earthing Terminals",
      "Cross Connectors",
      "Diagonal Clamps",
      "Straight Connectors",
      "Equipotential Bonding Bars",
    ],
    productsNote:
      "ARK Structural Earthing components for Hyderabad critical facilities and industrial developments. Supported by technical documentation.",
    riskAssessmentTitle: "Free Structural Earthing Design Review",
    riskAssessmentText1:
      "Share: RCC Drawings + Foundation Plan + Electrical SLD + Equipment Details + Project Earthing Specification.",
    riskAssessmentText2:
      "DFMHUB can review the project and recommend suitable structural earthing architecture.",
    riskAssessmentSteps:
      "Pre-Concreting Inspection → Continuity Testing → Connection Verification → Terminal Inspection → Photo Documentation → As-Built Drawings",
    supportTitle: "Installation & Testing",
    supportServices: [
      "Pre-Concreting Inspection",
      "Continuity Testing",
      "Connection Verification",
      "Terminal Inspection",
      "Photo Documentation",
      "As-Built Drawings",
    ],
    supportLocationsText:
      "Supported across: HITEC City | Gachibowli | Financial District | Genome Valley | Medchal | Patancheru | Jeedimetla | Shamshabad. Applications: Data Centres | IT Campuses | Pharma | Life Sciences | Hospitals | Industrial Plants | Warehouses | High-Rise Buildings.",
    ctaText:
      "Looking for a Structural Earthing System in Hyderabad? Start with a Free Structural Earthing Design Review by DFMHUB.",
    metaTitle: "Structural Earthing System in Hyderabad – ARK Make by DFMHUB",
    metaDescription:
      "DFMHUB provides ARK Structural Earthing Systems in Hyderabad. Foundation earthing, rebar bonding, fixed terminals, testing & documentation.",
    keywords:
      "Structural Earthing System in Hyderabad, Structural Earthing Hyderabad, Structural Earthing Manufacturer Hyderabad, Foundation Earthing Hyderabad, Rebar Bonding Hyderabad, Fixed Earthing Terminals Hyderabad, Equipotential Bonding Hyderabad",
    earthingFaqs: [
      {
        question: "Is structural earthing suitable for Hyderabad data centres?",
        answer:
          "Yes, where it forms part of a properly engineered earthing and bonding strategy designed around the facility's electrical architecture and project specifications.",
      },
      {
        question: "Does Hyderabad hard-rock geology affect earthing?",
        answer:
          "It can influence the earth-termination portion of the system, which is why actual site conditions and soil resistivity should be considered where applicable.",
      },
      {
        question: "When should rebar bonding be inspected?",
        answer:
          "Preferably before concreting, because the connections may become permanently concealed.",
      },
      {
        question: "Can structural earthing integrate with lightning protection?",
        answer:
          "Yes. Where allowed by the LPS design and applicable standards, suitable structural elements may contribute to coordinated lightning-current paths.",
      },
    ],
  },
  pune: {
    name: "Pune",
    slug: "pune",
    state: "Maharashtra",
    region: "Pune and greater Maharashtra",
    areas:
      "Pimpri-Chinchwad | Chakan | Talegaon | Ranjangaon | Hinjawadi | Kharadi | Hadapsar",
    sectors:
      "Automotive Plants | Engineering Industries | Data Centres | IT Facilities | Warehouses | Commercial Buildings | High-Rises",
    soil: "Deccan Trap basalt and hard-rock terrain",
    storm: "50-65 thunderstorm days per year",
    desc: "DFMHUB provides ARK Structural Earthing Systems for Pune projects, covering foundation earthing engineering, rebar bonding products, fixed earthing points, installation coordination, continuity testing and documentation.",
    heroSubtext:
      "We support automotive plants, manufacturing facilities, warehouses, IT campuses, data centres, commercial buildings and industrial projects across Pune and surrounding industrial corridors.",
    subofsub:
      "Foundation Review → Earthing Network → Rebar Bonding Locations → Fixed Terminals → Electrical/LPS Interfaces → Inspection → Testing",
    climateRiskHeading: "Pune Ground Conditions",
    climateRiskPara1:
      "Pune District is predominantly Deccan Trap basalt, and Maharashtra's GSDA describes the Pune region as largely hard-rock terrain. This makes project-specific evaluation important where the structural network interfaces with the earth-termination system.",
    climateData: "Design inputs may include:",
    climateRiskPara2:
      "Foundation Type | Basalt/Hard-Rock Conditions | Soil Resistivity | Fault Current | Building Type | RCC Layout | Equipment Earthing Requirements",
    climateRiskPara3:
      "The final arrangement should be based on the project's electrical design and fault-current requirements rather than a generic resistance target.",
    soilHeading: "ARK Structural Earthing for Industrial Pune",
    soilPara1:
      "Pune's strong automotive, engineering, manufacturing and warehouse base makes early earthing coordination particularly useful for large RCC and industrial developments.",
    soilPara2:
      "Designed for construction-stage integration: Critical connections are planned before RCC works conceal them. Suitable for complex industrial projects where bonding points coordinate with equipment and electrical earthing requirements.",
    soilPara3:
      "Manufacturer-direct ARK components manufactured by DFMHUB, supported by engineering drawings, inspection records and test results as part of the handover package.",
    productsHeading: "ARK Structural Earthing Products for Pune",
    productsList: [
      "Copper Bonded Conductors",
      "Rebar Bonding Clamps",
      "Diagonal Clamps",
      "Fixed Earthing Terminals",
      "Earth Studs",
      "Cross & Straight Connectors",
      "Equipotential Bonding Bars",
    ],
    productsNote:
      "ARK Structural Earthing components for Pune industrial and warehouse developments. Relevant products are supported by technical documentation.",
    riskAssessmentTitle: "Free Design Review in Pune",
    riskAssessmentText1:
      "Send: Structural Drawings + Foundation Details + Electrical SLD + Earthing Specification + Project Location.",
    riskAssessmentText2:
      "DFMHUB can review the structural and electrical interfaces and prepare an appropriate approach.",
    riskAssessmentSteps:
      "RCC Coordination → Connection Inspection → Continuity Checks → Test-Point Inspection → Quality Documentation → As-Built Drawings",
    supportTitle: "Installation & Testing",
    supportServices: [
      "RCC Coordination",
      "Connection Inspection",
      "Continuity Checks",
      "Test-Point Inspection",
      "Quality Documentation",
      "As-Built Drawings",
    ],
    supportLocationsText:
      "Supported across: Pimpri-Chinchwad | Chakan | Talegaon | Ranjangaon | Hinjawadi | Kharadi | Hadapsar. Applications: Automotive Plants | Engineering Industries | Data Centres | IT Facilities | Warehouses | Commercial Buildings | High-Rises.",
    ctaText:
      "Looking for a Structural Earthing System in Pune? Start with a Free Structural Earthing Design Review by DFMHUB.",
    metaTitle: "Structural Earthing System in Pune – ARK Make by DFMHUB",
    metaDescription:
      "DFMHUB provides ARK Structural Earthing Systems in Pune. Foundation earthing, rebar bonding, fixed earthing points, installation, testing & documentation.",
    keywords:
      "Structural Earthing System in Pune, Structural Earthing Pune, Structural Earthing Manufacturer Pune, Foundation Earthing Pune, Rebar Bonding Pune, Fixed Earthing Terminals Pune, Equipotential Bonding Pune",
    earthingFaqs: [
      {
        question: "Why does Pune geology matter for earthing?",
        answer:
          "Much of Pune is underlain by basaltic hard rock, so earth-termination performance can vary depending on weathering, fractures and overlying soil conditions.",
      },
      {
        question: "Is structural earthing suitable for factories?",
        answer:
          "Yes. It can provide a coordinated bonding and earthing network for industrial RCC structures when engineered according to fault-current and equipment requirements.",
      },
      {
        question: "Should soil resistivity testing still be performed?",
        answer:
          "Where earth-electrode or earth-termination design depends on soil characteristics, site-specific testing can be valuable.",
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
  const pageTitle =
    city.metaTitle ||
    `Structural Earthing System Manufacturer in ${city.name} – ARK Make | DFMHUB`;
  const pageDesc =
    city.metaDescription ||
    `DFMHUB manufactures ARK Structural Earthing System components in ${city.name}. Foundation earthing, RCC rebar bonding, design review, testing & documentation.`;
  const pageKeywords =
    city.keywords || `Structural Earthing System in ${city.name}`;

  const defaultMeta = {
    title: pageTitle,
    description: pageDesc,
    keywords: pageKeywords,
    alternates: {
      canonical: `https://www.dfmhub.com/structural-earthing/${city.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://www.dfmhub.com/structural-earthing/${city.slug}`,
      siteName: "DFMHUB - ARK Structural Earthing Systems",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image" as const,
      title: pageTitle,
      description: pageDesc,
    },
  };

  return await getDynamicMetadata(
    `/structural-earthing/${city.slug}`,
    defaultMeta
  );
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

  const heroImage = await getDynamicHeroImage(
    `/structural-earthing/${city.slug}`,
    "/images/earthing-hero.png"
  );

  const otherCities = Object.values(cityRegistry).filter(
    (c) => c.slug !== city.slug
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.earthingFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.dfmhub.com/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Structural Earthing",
        item: "https://www.dfmhub.com/structural-earthing",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: `https://www.dfmhub.com/structural-earthing/${city.slug}`,
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `DFMHUB - Structural Earthing System in ${city.name}`,
    description: city.metaDescription || city.desc,
    url: `https://www.dfmhub.com/structural-earthing/${city.slug}`,
    telephone: "+919483564777",
    address: {
      "@type": "PostalAddress",
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "IN",
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      {/* Section 1: Hero Section (DARK NAVY) */}
      <section className="relative bg-[#070d19] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-r from-[#070d19] via-[#091325]/90 to-transparent z-10" />
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src={heroImage}
            alt={`Structural Earthing in ${city.name}`}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-amber-400">
                Home
              </Link>
              <span>&gt;</span>
              <Link
                href="/structural-earthing"
                className="hover:text-amber-400"
              >
                Structural Earthing
              </Link>
              <span>&gt;</span>
              <span className="text-amber-400 font-bold">{city.name}</span>
            </div>

            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
              STRUCTURAL EARTHING SYSTEM · {city.name.toUpperCase()}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              {city.metaTitle ||
                `Structural Earthing System Manufacturer in ${city.name} – ARK Make`}
            </h1>

            {/* <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal max-w-3xl">
              {city.desc ||
                `DFMHUB manufactures ARK Structural Earthing System components in ${city.name}, providing engineering support for foundation earthing, rebar bonding, fixed earthing terminals and testing.`}
            </p> */}

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact-us"
                className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>GET FREE STRUCTURAL EARTHING DESIGN REVIEW</span>
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

      {/* Section 2: MAIN CONTENT (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4">
            <p className="text-lg max-w-4xl text-slate-800 leading-relaxed">
              {city.desc}
            </p>

            {city.heroSubtext && (
              <p className="text-lg max-w-4xl text-slate-700 leading-relaxed">
                {city.heroSubtext}
              </p>
            )}
            {city.subofsub && (
              <p className="font-bold text-lg max-w-4xl text-amber-700">
                {city.subofsub}
              </p>
            )}
            <div className="flex w-full pt-2">
              <Link
                href="/tool"
                className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md shadow-lg transition-all flex items-center justify-center space-x-2"
              >
                <span>GET FREE STRUCTURAL EARTHING DESIGN REVIEW</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="max-w-4xl space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {/* Structural Earthing for City Conditions */}
            {city.climateRiskHeading ? (
              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {city.climateRiskHeading}
                </h2>

                <p className="text-slate-700 leading-relaxed">
                  {city.climateRiskPara1}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {city.climateData}
                </p>
                <p className="text-slate-700 leading-relaxed font-semibold">
                  {city.climateRiskPara2}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {city.climateRiskPara3}
                </p>
              </div>
            ) : null}

            {/* Soil / System Conditions */}
            {city.soilHeading ? (
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {city.soilHeading}
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {city.soilPara1}
                </p>
                {city.soilPara2 && (
                  <p className="text-slate-700 leading-relaxed">
                    {city.soilPara2}
                  </p>
                )}
                {city.soilPara3 && (
                  <p className="text-slate-700 leading-relaxed">
                    {city.soilPara3}
                  </p>
                )}
              </div>
            ) : null}

            {/* Legacy earthingIntro fallback if climateRiskHeading is missing */}
            {!city.climateRiskHeading && city.earthingIntro && (
              <div className="space-y-4">
                <p>{city.earthingIntro.p1}</p>
                <p>{city.earthingIntro.p2}</p>
                <p>{city.earthingIntro.p3}</p>
                <p>{city.earthingIntro.p4}</p>
              </div>
            )}
          </div>

          {/* Products List section for City */}
          {city.productsList && (
            <div className="border-t border-slate-200 pt-8 space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {city.productsHeading || "ARK Structural Earthing Products"}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                ARK Structural Earthing components include:
              </p>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {city.productsList.map((item) => (
                  <span
                    key={item}
                    className="bg-amber-50 text-amber-900 border border-amber-200 text-xs sm:text-sm px-3.5 py-2 rounded-xl font-semibold shadow-xs"
                  >
                    • {item}
                  </span>
                ))}
              </div>
              {city.productsNote && (
                <p className="text-xs sm:text-sm text-slate-600 italic pt-2 leading-relaxed">
                  {city.productsNote}
                </p>
              )}
            </div>
          )}

          {/* Design Review Banner */}
          {city.riskAssessmentTitle && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 sm:p-8 space-y-3 text-slate-900">
              <h3 className="text-lg sm:text-xl font-bold text-amber-700 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <span>{city.riskAssessmentTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                {city.riskAssessmentText1}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                {city.riskAssessmentText2}
              </p>
              {city.riskAssessmentSteps && (
                <div className="pt-2 text-xs font-bold text-amber-800 tracking-wide uppercase">
                  {city.riskAssessmentSteps}
                </div>
              )}
            </div>
          )}

          {/* Support Services list */}
          {city.supportTitle && (
            <div className="border-t border-slate-200 pt-8 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                {city.supportTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                DFMHUB provides complete engineering, material supply and testing support for Structural Earthing Systems in {city.name}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {city.supportServices?.map((service) => (
                  <div
                    key={service}
                    className="flex items-center gap-2 text-xs sm:text-sm text-slate-800 bg-slate-50 border border-slate-200/80 p-3.5 rounded-xl font-medium"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>

              {city.supportLocationsText && (
                <div className="pt-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal bg-slate-50/60 border border-slate-200/60 p-5 rounded-xl">
                  <h4 className="font-bold text-slate-900 text-sm mb-2">
                    Structural Earthing Projects Across {city.name}
                  </h4>
                  <p>{city.supportLocationsText}</p>
                </div>
              )}

              {city.ctaText && (
                <div className="pt-2">
                  <div className="bg-slate-900 text-white p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-base text-amber-400">
                        {city.ctaText}
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Planning a project in {city.name}? Share your foundation layout and RCC drawings with DFMHUB for a structural earthing design review.
                      </p>
                    </div>
                    <Link
                      href="/contact-us"
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg whitespace-nowrap transition-all shrink-0"
                    >
                      GET FREE DESIGN REVIEW
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section 4: QUESTIONS PEOPLE ASK (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10">
            Frequently Asked Questions
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
