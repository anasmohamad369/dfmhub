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
import EarthLineApp from "@/components/EarthLineApp";
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
  lpsFaqs: { question: string; answer: string }[];
  earthingFaqs: { question: string; answer: string }[];
}

const cityRegistry: Record<string, CityData> = {
  bengaluru: {
    name: "Bengaluru",
    slug: "bengaluru",
    state: "Karnataka",
    region: "Bengaluru and greater Karnataka",
    areas:
      "Whitefield, Electronic City, Peenya, Bommasandra, Anekal, Devanahalli/KIADB Aerospace Park, Hebbal, Yeshwanthpur",
    sectors:
      "Data centres, IT campuses, aerospace and defence facilities, biotech facilities, factories, warehouses, commercial buildings and high-rise developments",
    soil: "areas of red/lateritic soil and granitic terrain",
    storm:
      "around 45 thunder days annually, with higher thunderstorm activity during April and May",
    desc: "DFMHUB is a Bengaluru (Bangalore) based manufacturer of ARK External Lightning Protection System components, providing free preliminary lightning risk assessment, IS/IEC 62305-based design, product supply, installation, testing and Consultant & CIEG approval assistance.",
    heroSubtext: "We support data centres, IT campuses, industrial facilities, aerospace facilities, warehouses, commercial buildings and high-rise projects across Bengaluru.",
    subofsub: "Risk Assessment → Design → ARK Products → Installation → Testing",
    climateRiskHeading: "Lightning Protection Designed for Bengaluru Conditions",
    climateRiskPara1:
      "Bengaluru experiences seasonal thunderstorm activity, particularly during the pre-monsoon period. Lightning protection requirements therefore need to be evaluated for the individual structure rather than using a standard LPS arrangement.",
    climateData: "DFMHUB considers:",
    climateRiskPara2:
      "Building Height | Dimensions | Roof Layout | Occupancy | Rooftop Equipment | Incoming Services | Surrounding Structures",
    climateRiskPara3:
      "These inputs are evaluated through an IS/IEC 62305-2 based Lightning Risk Assessment before developing the Lightning Protection System design.",
    soilHeading: "Bengaluru Soil & Site Conditions",
    soilPara1:
      "Ground conditions across Bengaluru vary due to red/lateritic soils, granitic formations, development patterns and seasonal moisture variations",
    soilPara2:
      "Where earth-termination design requires soil data, site-specific soil resistivity testing should be considered instead of assuming a standard earth electrode arrangement.",
    soilPara3: "This helps the LPS design reflect the actual project conditions.",
    productsHeading: "ARK Lightning Protection Products for Bengaluru Projects",
    productsList: [
      "Air Terminal Rods",
      "8 mm Aluminium Conductors",
      "Roof & Parapet Holders",
      "Standing Seam Clamps",
      "Metal Roof Clamps",
      "Cross & Straight Connectors",
      "Down Conductor Holders",
      "Test Joints",
      "Equipotential Bonding Bars",
      "Lightning Flash Counters",
    ],
    productsNote:
      "Products are supplied with relevant technical documentation and applicable IEC 62561 test evidence for consultant and project review.",
    riskAssessmentTitle: "Free Lightning Risk Assessment",
    riskAssessmentText1:
      "DFMHUB offers a Free Preliminary Lightning Risk Assessment in Bengaluru.",
    riskAssessmentText2:
      "Simply share your project location, building dimensions, height, building use and available drawings. Our engineering team evaluates the project based on IS/IEC 62305-2 principles and helps identify the appropriate next steps for LPS design.",
    riskAssessmentSteps:
      "Risk Assessment → Design → ARK Product Selection → Installation → Testing",
    supportTitle: " Design, Supply, Installation & Testing of Lightning Protection System by DFMHUB",
    supportServices: [
      "Free Lightning Risk Assessment",
      "IS/IEC 62305-based LPS Design",
      "ARK Product Supply",
      "Installation & Testing",
      "Consultant Approval Assistance",
      "CIEG Approval Assistance",
      "Test Reports & As-Built Documentation",
    ],
    supportLocationsText:
      "DFMHUB supports Lightning Protection System requirements for projects across: Whitefield, Electronic City, Peenya, Bommasandra, Anekal, Devanahalli / KIADB Aerospace Park, Hebbal, Yeshwanthpur and surrounding Bengaluru industrial areas",
    ctaText:
      "Looking for a Lightning Protection System in Bengaluru? Start with a Free Lightning Risk Assessment by DFMHUB.",
    metaTitle: "Lightning Protection System in Bengaluru | DFMHUB",
    metaDescription:
      "Lightning Protection System in Bengaluru by DFMHUB. Get free risk assessment, IEC 62305-based design, ARK products, installation, testing and approval support.",
    keywords:
      "Lightning Protection System in Bengaluru, Lightning Protection System Bengaluru, Lightning Protection System Manufacturer in Bengaluru, Lightning Protection System Supplier in Bengaluru, External Lightning Protection System Bengaluru, Lightning Protection System Design Bengaluru, Lightning Protection System Installation Bengaluru, Lightning Risk Assessment Bengaluru, IEC 62305 Lightning Protection, IEC 62561 LPS Components, ARK Lightning Protection System, Lightning Protection System for Data Centres Bengaluru, Industrial Lightning Protection Bengaluru, Lightning Protection Company Bengaluru",
    lpsFaqs: [
      {
        question:
          "Who is a Lightning Protection System manufacturer in Bengaluru?",
        answer:
          "DFMHUB manufactures ARK Make External Lightning Protection System components in Bengaluru and provides engineering support covering risk assessment, LPS design, product supply, installation, testing and documentation.",
      },
      {
        question:
          "Does DFMHUB manufacture Lightning Protection Systems in Bangalore?",
        answer:
          "Yes. DFMHUB is based in Bengaluru (Bangalore) and manufactures and supplies ARK Lightning Protection System components for industrial, commercial, infrastructure and high-rise projects.",
      },
      {
        question:
          "Which standard is used for Lightning Protection System design in Bengaluru?",
        answer:
          "Lightning protection design can be carried out with reference to IS/IEC 62305, including IEC 62305-2 for Lightning Risk Assessment and IEC 62305-3 for protection of structures and external LPS design. Project-specific consultant specifications and applicable Indian requirements should also be considered.",
      },
      {
        question: "Does DFMHUB provide a free Lightning Risk Assessment?",
        answer:
          "Yes. DFMHUB offers a free preliminary Lightning Risk Assessment. Share the project location, building dimensions, height, building use and available drawings for an initial engineering review.",
      },
      {
        question:
          "Does DFMHUB provide Lightning Protection System installation in Bengaluru?",
        answer:
          "Yes. DFMHUB supports LPS design, ARK product supply, installation, testing, inspection and handover documentation for Bengaluru projects.",
      },
      {
        question: "Are ARK Lightning Protection components tested?",
        answer:
          "Applicable ARK components are supplied with relevant technical documentation and IEC 62561 test evidence, depending on the component and project requirement.",
      },
      {
        question:
          "Can ARK Lightning Protection Systems be used for data centres?",
        answer:
          "Yes. ARK Lightning Protection System components can be considered for data centres, IT campuses, industrial facilities and other critical buildings, subject to project-specific risk assessment, engineering and consultant specifications.",
      },
      {
        question:
          "Is the same Lightning Protection System suitable for every building?",
        answer:
          "No. LPS requirements depend on factors such as building dimensions, height, occupancy, location, rooftop equipment, incoming services and surrounding structures. A project-specific risk assessment should be completed before finalising the design.",
      },
      {
        question:
          "Does soil condition affect Lightning Protection System design in Bengaluru?",
        answer:
          "Where the LPS earth-termination system depends on ground conditions, soil characteristics and resistivity can affect the engineering approach. Site-specific soil resistivity measurements may therefore be required.",
      },
      {
        question:
          "What information does DFMHUB need to prepare an LPS design?",
        answer:
          "Ideally provide the project location, building dimensions, building height, roof plan, building use, electrical layout and project specification. These inputs help the engineering team evaluate the risk and prepare the appropriate LPS design and BOQ.",
      },
    ],
    earthingFaqs: [],
  },
  chennai: {
    name: "Chennai",
    slug: "chennai",
    state: "Tamil Nadu",
    region: "Chennai and greater Tamil Nadu",
    areas:
      "Sriperumbudur, Oragadam, Maraimalai Nagar, Ambattur, Guindy, Ennore, OMR",
    sectors:
      "Automotive manufacturing plants, port & petrochemical facilities, hardware manufacturing, data centers",
    soil: "coastal plain with sandy deposits, clayey soils, alluvium and varying groundwater influence",
    storm:
      "35-50 thunderstorm days annually, concentrated during the northeast monsoon season",
    desc: "DFMHUB provides ARK External Lightning Protection Systems in Chennai, covering free preliminary lightning risk assessment, IS/IEC 62305-based design, manufacturer-direct product supply, installation, testing and Consultant & statutory approval assistance.",
    heroSubtext:
      "ARK components are manufactured by DFMHUB and supplied for industrial plants, IT facilities, data centres, warehouses, commercial buildings, infrastructure and high-rise projects across Chennai and surrounding industrial regions.",
    subofsub:
      "Risk Assessment → Design → ARK Products → Installation → Testing",
    climateRiskHeading:
      "Lightning Protection for Chennai Conditions",
    climateRiskPara1:
      "Chennai's coastal location, high humidity, monsoon weather and salt-laden atmosphere create demanding conditions for exposed Lightning Protection System components.",
    climateData: "DFMHUB evaluates:",
    climateRiskPara2:
      "Building Height | Roof Geometry | Coastal Exposure | Occupancy | Rooftop Equipment | Incoming Services | Surrounding Structures",
    climateRiskPara3:
      "These inputs are considered through an IS/IEC 62305-2 based Lightning Risk Assessment before developing the LPS design. Material compatibility and corrosion resistance are particularly important for Chennai projects.",
    soilHeading: "Chennai Coastal & Ground Conditions",
    soilPara1:
      "Chennai is located on a coastal plain with ground conditions that can include sandy deposits, clayey soils, alluvium and varying groundwater influence.",
    soilPara2:
      "Earth-termination performance should therefore not be assumed from a standard electrode arrangement. Where required, site-specific soil resistivity testing can be considered to support the earth-termination design.",
    soilPara3:
      "For coastal and industrial environments, the selection of exposed LPS materials should also consider humidity, salt exposure, corrosion and compatibility between different metals.",
    productsHeading: "ARK Products for Chennai Projects",
    productsList: [
      "Air Terminal Rods",
      "8 mm Aluminium Conductors",
      "Roof & Parapet Holders",
      "Standing Seam Clamps",
      "Metal Roof Clamps",
      "Stainless Steel Connectors",
      "Down Conductor Holders",
      "Test Joints",
      "Equipotential Bonding Bars",
      "Lightning Flash Counters",
    ],
    productsNote:
      "For Chennai projects, product selection particularly considers: Corrosion Resistance | Material Compatibility | Coastal Exposure | Roof Type | Mechanical Stability. Applicable products are supported with relevant technical documentation and IEC 62561 test evidence.",
    riskAssessmentTitle: "Free Lightning Risk Assessment",
    riskAssessmentText1:
      "DFMHUB offers a Free Preliminary Lightning Risk Assessment in Chennai.",
    riskAssessmentText2:
      "Simply share your project location, building dimensions, height, building use and available drawings. Our engineering team evaluates the project based on IS/IEC 62305-2 principles and helps identify the appropriate next steps for LPS design.",
    riskAssessmentSteps:
      "Risk Assessment → Design → ARK Product Selection → Installation → Testing",
    supportTitle:
      " Design, Supply, Installation & Testing of Lightning Protection System by DFMHUB",
    supportServices: [
      "Free Lightning Risk Assessment",
      "IS/IEC 62305-based LPS Design",
      "ARK Product Supply",
      "Installation & Testing",
      "Consultant Approval Assistance",
      "CIEG Approval Assistance",
      "Test Reports & As-Built Documentation",
    ],
    supportLocationsText:
      "DFMHUB supports Lightning Protection System requirements for projects across: Sriperumbudur, Oragadam, Maraimalai Nagar, Ambattur, Guindy, Ennore, OMR and surrounding Chennai industrial areas",
    ctaText:
      "Looking for a Lightning Protection System in Chennai? Start with a Free Lightning Risk Assessment by DFMHUB.",
    metaTitle: "Lightning Protection System in Chennai – ARK Make by DFMHUB",
    metaDescription:
      "DFMHUB provides ARK External Lightning Protection Systems in Chennai. Free risk assessment, IS/IEC 62305-based design, product supply, installation & testing.",
    keywords:
      "Lightning Protection System in Chennai, Lightning Protection System Chennai, Lightning Protection System Manufacturer in Chennai, Lightning Protection System Supplier in Chennai, External Lightning Protection System Chennai, Lightning Protection System Design Chennai, Lightning Protection System Installation Chennai, Lightning Risk Assessment Chennai, IEC 62305 Lightning Protection, IEC 62561 LPS Components, ARK Lightning Protection System, Lightning Protection System for Data Centres Chennai, Industrial Lightning Protection Chennai, Lightning Protection Company Chennai",
    lpsFaqs: [
      {
        question: "Who supplies ARK Lightning Protection Systems in Chennai?",
        answer:
          "DFMHUB supplies ARK External Lightning Protection System components in Chennai with engineering support for risk assessment, design, installation and testing.",
      },
      {
        question: "Is DFMHUB a Lightning Protection System manufacturer?",
        answer:
          "Yes. DFMHUB manufactures ARK Lightning Protection System components in Bengaluru and provides manufacturer-direct supply and engineering support for Chennai projects.",
      },
      {
        question: "Why is corrosion resistance important for Chennai LPS projects?",
        answer:
          "Chennai's humid and coastal environment can accelerate corrosion of exposed metallic components. Appropriate material selection, compatible connections and corrosion-resistant components are therefore important.",
      },
      {
        question: "Which standard is used for Lightning Protection System design?",
        answer:
          "LPS design can be carried out with reference to IS/IEC 62305, including IEC 62305-2 for risk management and IEC 62305-3 for protection of structures.",
      },
      {
        question: "Does DFMHUB provide a free Lightning Risk Assessment in Chennai?",
        answer:
          "Yes. Share the project location, dimensions, height, building use and available drawings for a preliminary engineering review.",
      },
      {
        question: "Does DFMHUB provide LPS installation in Chennai?",
        answer:
          "Yes. Support can include design, product supply, installation, inspection, continuity testing and handover documentation.",
      },
      {
        question: "Are ARK products suitable for coastal locations?",
        answer:
          "Product suitability depends on the design, environmental exposure and material compatibility. ARK offers component options suitable for projects where corrosion resistance is an important consideration.",
      },
    ],
    earthingFaqs: [
      {
        question:
          "How do you protect earthing components from salt corrosion in Chennai?",
        answer:
          "We use heavy 250-micron copper bonded electrodes and tinned copper tapes welded exothermically to resist marine soil corrosion.",
      },
      {
        question:
          "What earth resistance value is required for Chennai industrial facilities?",
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
    areas:
      "HITEC City, Gachibowli, Genome Valley, Pashamylaram, Patancheru, Jeedimetla, Shamshabad",
    sectors:
      "Pharma & life sciences plants, data centres, IT campuses, defence research facilities",
    soil: "granite and granite-gneiss formations with red loamy soils and hard-rock ground conditions",
    storm:
      "40-55 thunderstorm days annually with severe lightning activity during monsoon onset",
    desc: "DFMHUB provides ARK External Lightning Protection Systems in Hyderabad, including free preliminary lightning risk assessment, IS/IEC 62305-based engineering, manufacturer-direct product supply, installation, testing and documentation support.",
    heroSubtext:
      "Solutions are suitable for data centres, IT campuses, pharma facilities, industrial plants, warehouses, commercial buildings and high-rise developments across Hyderabad.",
    subofsub:
      "Risk Assessment → Design → ARK Products → Installation → Testing",
    climateRiskHeading:
      "Lightning Protection for Hyderabad Conditions",
    climateRiskPara1:
      "Hyderabad experiences seasonal thunderstorm and lightning activity, while its rapid growth has created large concentrations of data centres, IT buildings, pharmaceutical facilities and industrial projects containing sensitive electronic infrastructure.",
    climateData: "DFMHUB evaluates:",
    climateRiskPara2:
      "Building Height | Roof Geometry | Occupancy | Critical Equipment | Incoming Services | Rooftop Installations | Surrounding Structures",
    climateRiskPara3:
      "The project is then reviewed using IS/IEC 62305-2 Lightning Risk Assessment principles before the LPS design is finalised.",
    soilHeading: "Hyderabad Soil & Ground Conditions",
    soilPara1:
      "Hyderabad is widely characterised by granite and granite-gneiss formations with red loamy soils and hard-rock ground conditions.",
    soilPara2:
      "Ground characteristics can vary substantially across the metropolitan and industrial regions.",
    soilPara3:
      "For projects where earth-termination performance depends on the surrounding soil, site-specific soil resistivity testing should be considered rather than adopting a standard earth electrode arrangement.",
    productsHeading: "ARK Products for Hyderabad Projects",
    productsList: [
      "Air Terminal Rods",
      "8 mm Aluminium Conductors",
      "Roof & Parapet Holders",
      "Standing Seam Clamps",
      "Metal Roof Clamps",
      "Cross & Straight Connectors",
      "Down Conductor Holders",
      "Test Joints",
      "Equipotential Bonding Bars",
      "Lightning Flash Counters",
    ],
    productsNote:
      "For Hyderabad projects, component selection can consider: Building Height | Rooftop Equipment | Data & Electronic Infrastructure | Roof Type | Environmental Exposure | Required Conductor Routing. Relevant products are supported by applicable IEC 62561 test evidence and technical documentation.",
    riskAssessmentTitle: "Free Lightning Risk Assessment in Hyderabad",
    riskAssessmentText1:
      "DFMHUB offers a Free Preliminary Lightning Risk Assessment in Hyderabad.",
    riskAssessmentText2:
      "Share project location, building dimensions, height, building use, roof plan, and available drawings. Our engineering team can evaluate the project using IS/IEC 62305-2 principles and recommend the next steps for LPS design.",
    riskAssessmentSteps:
      "Risk Assessment → Design → ARK Product Selection → Installation → Testing",
    supportTitle:
      " Design, Supply, Installation & Testing of Lightning Protection System by DFMHUB",
    supportServices: [
      "Free Lightning Risk Assessment",
      "IS/IEC 62305-based LPS Design",
      "ARK Product Supply",
      "Installation & Testing",
      "Consultant Approval Assistance",
      "CIEG Approval Assistance",
      "Test Reports & As-Built Documentation",
    ],
    supportLocationsText:
      "DFMHUB supports Lightning Protection System requirements for projects across: HITEC City, Gachibowli, Genome Valley, Pashamylaram, Patancheru, Jeedimetla, Shamshabad and surrounding Hyderabad industrial areas",
    ctaText:
      "Looking for a Lightning Protection System in Hyderabad? Start with a Free Lightning Risk Assessment by DFMHUB.",
    metaTitle: "Lightning Protection System in Hyderabad – ARK Make by DFMHUB",
    metaDescription:
      "DFMHUB provides ARK External Lightning Protection Systems in Hyderabad. Free preliminary risk assessment, IS/IEC 62305 engineering, product supply, installation & testing.",
    keywords:
      "Lightning Protection System in Hyderabad, Lightning Protection System Hyderabad, Lightning Protection System Manufacturer in Hyderabad, Lightning Protection System Supplier in Hyderabad, External Lightning Protection System Hyderabad, Lightning Protection System Design Hyderabad, Lightning Protection System Installation Hyderabad, Lightning Risk Assessment Hyderabad, IEC 62305 Lightning Protection, IEC 62561 LPS Components, ARK Lightning Protection System, Lightning Protection System for Data Centres Hyderabad, Industrial Lightning Protection Hyderabad, Lightning Protection Company Hyderabad",
    lpsFaqs: [
      {
        question: "Who supplies ARK Lightning Protection Systems in Hyderabad?",
        answer:
          "DFMHUB supplies ARK External Lightning Protection System components in Hyderabad and supports projects with risk assessment, design, installation and testing.",
      },
      {
        question: "Is DFMHUB a Lightning Protection System manufacturer?",
        answer:
          "Yes. DFMHUB manufactures ARK LPS components in Bengaluru and provides manufacturer-direct product supply and engineering support for Hyderabad projects.",
      },
      {
        question: "What ground conditions are common in Hyderabad?",
        answer:
          "Hyderabad is largely associated with granite, granite-gneiss and hard-rock geology, with red loamy soils in many locations. Site conditions should still be verified before finalising an earth-termination design.",
      },
      {
        question: "Is Lightning Protection important for Hyderabad data centres?",
        answer:
          "Data centres and IT facilities require project-specific lightning risk evaluation because they contain critical electronic systems, incoming services and rooftop equipment that can affect the overall protection strategy.",
      },
      {
        question: "Does DFMHUB provide a free Lightning Risk Assessment?",
        answer:
          "Yes. Share the location, building dimensions, height, building use and available drawings for a preliminary assessment.",
      },
      {
        question: "Which standard is used for LPS design?",
        answer:
          "Lightning Protection System engineering can be carried out with reference to IS/IEC 62305, including IEC 62305-2 for risk assessment.",
      },
      {
        question: "Does DFMHUB provide installation and testing in Hyderabad?",
        answer:
          "Yes. Support can include installation, inspection, continuity testing, test-joint checks, quality checks and handover documentation.",
      },
    ],
    earthingFaqs: [
      {
        question:
          "How do you achieve low earth resistance in Hyderabad's granitic soil?",
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
    areas:
      "Pimpri-Chinchwad (PCMC), Chakan, Talegaon, Ranjangaon, Hinjawadi, Hadapsar, Bhosari",
    sectors:
      "Automotive & EV plants, engineering MIDC units, IT parks, heavy machinery plants",
    soil: "Deccan basalt and hard-rock geology, with varying soil depth and ground characteristics",
    storm: "50-65 thunderstorm days per year with intense pre-monsoon strikes",
    desc: "DFMHUB provides ARK External Lightning Protection Systems in Pune, supporting projects through free preliminary lightning risk assessment, IS/IEC 62305-based design, manufacturer-direct product supply, installation, testing and project documentation.",
    heroSubtext:
      "We support automotive plants, manufacturing facilities, warehouses, IT campuses, data centres, commercial buildings and industrial projects across Pune and surrounding industrial corridors.",
    subofsub:
      "Risk Assessment → Design → ARK Products → Installation → Testing",
    climateRiskHeading: "Lightning Protection for Pune Conditions",
    climateRiskPara1:
      "Pune combines seasonal thunderstorms, monsoon rainfall, expanding industrial development and large numbers of metal-roofed manufacturing and warehouse structures. A Lightning Protection System should therefore be engineered for the specific building rather than selected as a standard arrangement.",
    climateData: "DFMHUB considers:",
    climateRiskPara2:
      "Building Height | Roof Geometry | Structural Type | Occupancy | Rooftop Equipment | Incoming Services | Surrounding Structures",
    climateRiskPara3:
      "These inputs are evaluated using IS/IEC 62305-2 risk assessment principles.",
    soilHeading: "Pune Soil & Ground Conditions",
    soilPara1:
      "Pune and the surrounding region are strongly influenced by Deccan basalt and hard-rock geology, with soil depth and ground characteristics varying significantly between locations.",
    soilPara2:
      "Dry-season conditions can also affect earth-termination performance.",
    soilPara3:
      "Where required, soil resistivity testing should therefore be carried out before finalising the earth-termination design rather than assuming a standard electrode configuration.",
    productsHeading: "ARK Products for Pune Projects",
    productsList: [
      "Air Terminal Rods",
      "8 mm Aluminium Conductors",
      "Parapet Holders",
      "Flat Roof Holders",
      "Standing Seam Clamps",
      "Metal Roof Clamps",
      "Cross Connectors",
      "Straight Connectors",
      "Down Conductor Holders",
      "Test Joints",
      "Equipotential Bonding Bars",
      "Lightning Flash Counters",
    ],
    productsNote:
      "For Pune's industrial and warehouse projects, product selection can consider: Metal Roof Type | Standing Seams | PEB Construction | Conductor Routing | Mechanical Stability | Outdoor Exposure. Applicable products are supported with relevant IEC 62561 test evidence and technical documentation.",
    riskAssessmentTitle: "Free Lightning Risk Assessment in Pune",
    riskAssessmentText1:
      "DFMHUB offers a Free Preliminary Lightning Risk Assessment in Pune.",
    riskAssessmentText2:
      "Share project location, building dimensions, height, building use, roof type, and available architectural/electrical drawings. Our engineering team can evaluate the inputs using IS/IEC 62305-2 principles and recommend the appropriate next steps.",
    riskAssessmentSteps:
      "Risk Assessment → Design → ARK Product Selection → Installation → Testing",
    supportTitle:
      " Design, Supply, Installation & Testing of Lightning Protection System by DFMHUB",
    supportServices: [
      "Free Lightning Risk Assessment",
      "IS/IEC 62305-based LPS Design",
      "ARK Product Supply",
      "Installation & Testing",
      "Consultant Approval Assistance",
      "CIEG Approval Assistance",
      "Test Reports & As-Built Documentation",
    ],
    supportLocationsText:
      "DFMHUB supports Lightning Protection System requirements for projects across: Pimpri-Chinchwad (PCMC), Chakan, Talegaon, Ranjangaon, Hinjawadi, Hadapsar, Bhosari and surrounding Pune industrial areas",
    ctaText:
      "Looking for a Lightning Protection System in Pune? Start with a Free Lightning Risk Assessment by DFMHUB.",
    metaTitle: "Lightning Protection System in Pune – ARK Make by DFMHUB",
    metaDescription:
      "DFMHUB provides ARK External Lightning Protection Systems in Pune. Free preliminary risk assessment, IS/IEC 62305 design, product supply, installation & testing.",
    keywords:
      "Lightning Protection System in Pune, Lightning Protection System Pune, Lightning Protection System Manufacturer in Pune, Lightning Protection System Supplier in Pune, External Lightning Protection System Pune, Lightning Protection System Design Pune, Lightning Protection System Installation Pune, Lightning Risk Assessment Pune, IEC 62305 Lightning Protection, IEC 62561 LPS Components, ARK Lightning Protection System, Lightning Protection System for Data Centres Pune, Industrial Lightning Protection Pune, Lightning Protection Company Pune",
    lpsFaqs: [
      {
        question: "Who supplies Lightning Protection Systems in Pune?",
        answer:
          "DFMHUB supplies ARK External Lightning Protection System components in Pune and provides risk assessment, design, installation and testing support.",
      },
      {
        question: "Is DFMHUB a manufacturer or trader?",
        answer:
          "DFMHUB manufactures ARK Lightning Protection System components and provides manufacturer-direct supply for Pune projects.",
      },
      {
        question: "Does Pune's hard-rock geology affect earthing?",
        answer:
          "Ground conditions can affect earth-termination performance. Pune and surrounding areas include significant basaltic hard-rock formations, so site-specific soil resistivity testing may be required.",
      },
      {
        question: "Can ARK LPS be used for PEB and industrial buildings?",
        answer:
          "Yes. ARK includes conductor holders, standing seam clamps, metal roof clamps, connectors and other components suitable for LPS designs on many industrial and PEB structures.",
      },
      {
        question: "Does DFMHUB provide a free Lightning Risk Assessment in Pune?",
        answer:
          "Yes. Share basic building dimensions, location, height, building use, roof information and available drawings for preliminary review.",
      },
      {
        question: "Which standard is used for LPS design?",
        answer:
          "Design can be carried out with reference to IS/IEC 62305, including risk assessment and external Lightning Protection System requirements.",
      },
      {
        question: "Does DFMHUB provide installation and testing?",
        answer:
          "Yes. Support can cover installation, continuity testing, test-joint inspection, quality checks and handover documentation.",
      },
    ],
    earthingFaqs: [
      {
        question:
          "How do you prevent earthing failure in Pune's black cotton soil during summer?",
        answer:
          "We use moisture-retaining conductive cement compound around driven copper rods, penetrating below the active soil shrink layer.",
      },
      {
        question:
          "What earth resistance value is targeted for Pune automotive plants?",
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
  const pageTitle =
    city.metaTitle ||
    `Lightning Protection System in ${city.name}, ${city.state} | DFMHUB`;
  const pageDesc =
    city.metaDescription ||
    `DFMHUB manufactures ARK Make lightning protection systems for ${city.sectors} across ${city.areas} in ${city.name}, ${city.state}. Free site survey & IS/IEC 62305 design consultation.`;
  const pageKeywords =
    city.keywords || `Lightning Protection System in ${city.name}`;

  return {
    title: pageTitle,
    description: pageDesc,
    keywords: pageKeywords,
    alternates: {
      canonical: `https://dfmhub.vercel.app/lightning-protection-system/${city.slug}`,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: `https://dfmhub.vercel.app/lightning-protection-system/${city.slug}`,
      siteName: "DFMHUB - ARK Lightning Protection Systems",
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
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
    (c) => c.slug !== city.slug,
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.lpsFaqs.map((faq) => ({
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
        item: "https://dfmhub.vercel.app/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Lightning Protection System",
        item: "https://dfmhub.vercel.app/lightning-protection-system",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: city.name,
        item: `https://dfmhub.vercel.app/lightning-protection-system/${city.slug}`,
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `DFMHUB - Lightning Protection System in ${city.name}`,
    description: city.metaDescription || city.desc,
    url: `https://dfmhub.vercel.app/lightning-protection-system/${city.slug}`,
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
              <Link href="/" className="hover:text-amber-400">
                Home
              </Link>
              <span>&gt;</span>
              <Link
                href="/lightning-protection-system"
                className="hover:text-amber-400"
              >
                Lightning Protection System
              </Link>
              <span>&gt;</span>
              <span className="text-amber-400 font-bold">{city.name}</span>
            </div>

            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
              LIGHTNING PROTECTION SYSTEM · {city.name.toUpperCase()}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              Lightning Protection System Manufacturer in {city.name} – ARK Make
            </h1>

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4">
            <p className="text-lg max-w-4xl">
              {city.desc ||
                `DFMHUB manufactures ARK Make lightning protection systems and delivers full design, installation and testing across ${city.region} — from ${city.areas.split(", ")[0]} to ${city.areas.split(", ").slice(-1)[0]}.`}
            </p>

            {city.heroSubtext && (
              <p className="text-lg max-w-4xl">
                {city.heroSubtext}
              </p>
            )}
            {city.subofsub && (
              <p className="font-bold text-lg max-w-4xl">
                {city.subofsub}
              </p>
            )}
            <div className="flex w-full">
              <button className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md shadow-lg transition-all flex items-center justify-center space-x-2">
                <span>CLICK HERE TO GET A FREE DESIGN CONSULTATION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="max-w-4xl space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {/* Climate & Risk */}
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
                <p className="text-slate-700 leading-relaxed">{city.climateRiskPara3}</p>
              </div>
            ) : (
              <p>
                {city.name} sees {city.storm}. That strike density drives the
                IS/IEC 62305-2 risk calculation upward, and for {city.sectors}{" "}
                the result is usually Lightning Protection Level I or II — a
                tighter mesh, more down conductors and fully coordinated surge
                protection.
              </p>
            )}

            {/* Soil Conditions */}
            {city.soilHeading ? (
              <div className="space-y-3 pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  {city.soilHeading}
                </h2>
                <p className="text-slate-700 leading-relaxed">
                  {city.soilPara1}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {city.soilPara2}
                </p>
                <p className="text-slate-700 leading-relaxed">
                  {city.soilPara3}
                </p>
              </div>
            ) : (
              <p>
                Earthing is the other half of the problem. Ground around{" "}
                {city.name} is characterised by {city.soil}, so we run a Wenner
                four-pin soil resistivity survey before design and select copper
                bonded, deep-bore or chemical electrodes accordingly, rather
                than defaulting to standard three-metre pits that dry out.
              </p>
            )}

            {!city.climateRiskHeading && (
              <>
                <p>
                  Our {city.name} team handles roof and facade installation on
                  occupied buildings with permit-to-work and height-safety
                  controls, then hands over fall-of-potential earth resistance
                  readings for every electrode, continuity across every test
                  link, as-built drawings and IEC 62561 material certificates
                  for fire NOC, insurance and audit use.
                </p>
                <p>
                  Regular project work in the region covers {city.sectors}, with
                  material supply to EPC and electrical contractors across{" "}
                  {city.areas} and emergency post-strike inspection typically
                  attended within 24 to 48 hours.
                </p>
              </>
            )}
          </div>

          {/* Products List section for City */}
          {city.productsList && (
            <div className="border-t border-slate-200 pt-8 space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {city.productsHeading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                ARK External Lightning Protection System components include:              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {city.productsList.map((item) => (
                  <span
                    key={item}
                    className="bg-amber-50 text-amber-900 border border-amber-200 text-xs px-3 py-1.5 rounded-lg font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
              {city.productsNote && (
                <p className="text-xs sm:text-sm text-slate-500 italic pt-1">
                  {city.productsNote}
                </p>
              )}
            </div>
          )}

          {/* Free Risk Assessment Banner */}
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
               DFMHUB provides one coordinated solution for Lightning Protection Systems in {city.name}
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
                    Lightning Protection Support Across {city.name}
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
                        Planning a {city.name} project? Send your roof plan,
                        building height and project specification to DFMHUB for
                        LPS engineering.
                      </p>
                    </div>
                    <Link
                      href="/contact-us"
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg whitespace-nowrap transition-all shrink-0"
                    >
                      GET FREE RISK ASSESSMENT
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Section 3: ARK MAKE COMPONENTS DELIVERED ACROSS CITY (LIGHT GRAY) */}
        {/* <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
                SUPPLIED IN {city.name.toUpperCase()}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
                ARK Make components delivered across {city.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-normal">
                Project quantities with test certificates, batch traceability and
                scheduled site delivery.
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
        </section> */}

      {/* Section 4: QUESTIONS PEOPLE ASK (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-10">
            Frequently Asked Questions
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

      {/* Section: EarthLine App */}
      {/* <section className="w-full bg-[#12151a]">
        <EarthLineApp />
      </section> */}

      {/* Section 6: TALK TO AN ENGINEER / FORM (LIGHT GRAY) */}
      <section className="w-full bg-[#f1f5f9] text-slate-900 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
