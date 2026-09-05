import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Server,
  Hospital,
  Building,
  Factory,
  Train,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Layers,
} from "lucide-react";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";
import { Testing } from "@/components/Testing";
import ProductCarousel from "@/components/ProductCarousel";
import { getProductsByCategory } from "@/lib/products";

import { getDynamicMetadata, getDynamicHeroImage } from "@/lib/seo";

const defaultMetadata = {
  title: "Structural Earthing & Chemical Earthing (IS 3043) | DFMHUB",
  description:
    "Foundation rebar bonding, copper bonded and chemical electrodes, earth bars and enhancement compound sized from a Wenner soil resistivity survey to IS 3043:2018.",
  alternates: {
    canonical: "https://www.dfmhub.com/structural-earthing",
  },
};

export async function generateMetadata() {
  return await getDynamicMetadata("/structural-earthing", defaultMetadata);
}


export default async function StructuralEarthingPage() {
  const heroImage = await getDynamicHeroImage("/structural-earthing", "/images/earthing-hero.png");
  const products = await getProductsByCategory("STRUCTURAL_EARTHING");

  const lplMatrix = [
    {
      level: "LPL I",
      roman: "I",
      detail:
        "Highest level of protection for critical and high-risk structures.",
    },
    {
      level: "LPL II",
      roman: "II",
      detail:
        "High level of protection for commercial and industrial buildings.",
    },
    {
      level: "LPL III",
      roman: "III",
      detail:
        "Standard level of protection for common structures with moderate risk.",
    },
    {
      level: "LPL IV",
      roman: "IV",
      detail:
        "Basic level of protection for structures with low lightning risk exposure.",
    },
  ];

  const components = [
    {
      title: "10 mm Copper Bonded Conductor",
      spec: "ARK-CU10",
      desc: "Copper-bonded round conductor used for dedicated earthing and lightning current paths within suitable structural earthing designs.",
    },
    {
      title: "Rebar Bonding Clamp",
      spec: "ARK-RB10",
      desc: "Designed to create a mechanically secure electrical connection between compatible reinforcement bars and earthing conductors.",
    },
    {
      title: "Fixed Earthing Terminal",
      spec: "ARK-ES1",
      desc: "Provides an accessible connection point from the concealed structural earthing network for future bonding and earthing connections.",
    },
    {
      title: "Fixed Earthing Terminal with SS Tails",
      spec: "ARK-ES3",
      desc: "Multi-point terminal arrangement designed for integration with reinforcement and designated structural bonding points.",
    },
    {
      title: "Fixed Earthing Terminal with Copper Tails",
      spec: "ARK-ES5",
      desc: "Multi-tail termination arrangement providing multiple bonding paths between the structural network and accessible earthing point.",
    },
    {
      title: "Diagonal Rebar Clamp",
      spec: "ARK-DL10",
      desc: "Connector used where the conductor and reinforcement arrangement requires a suitable diagonal connection.",
    },
    {
      title: "Cross Connector for Round Conductors",
      spec: "ARK-CR10",
      desc: "Used for cross-connections between compatible round conductors within the earthing or lightning protection network.",
    },
    {
      title: "Cross Connector for Strips",
      spec: "ARK-CR02",
      desc: "Provides mechanical and electrical connection between compatible flat conductor arrangements.",
    },
    {
      title: "Straight Connector",
      spec: "ARK-SL01",
      desc: "Used for joining compatible conductors to maintain continuity along the designed earthing route.",
    },
    {
      title: "U-Bolt Clamp",
      spec: "ARK-UB01",
      desc: "Mechanical connection component for suitable conductor-to-structural metal applications.",
    },
    {
      title: "Strip Holder Clamp",
      spec: "ARK-SH01",
      desc: "Supports and maintains the designed routing of flat earthing conductors.",
    },
    {
      title: "Equipotential Bonding Bar",
      spec: "ARK-EQ01",
      desc: "Creates a common bonding point for designated metallic services, earthing connections and lightning protection bonding requirements.",
    },
  ];

  const comparisonData = [
    {
      param: "System approach",
      ark: "Coordinated structural earthing range",
      generic: "Often individual components",
    },
    {
      param: "Engineering support",
      ark: "Available",
      generic: "May be limited",
    },
    {
      param: "Product documentation",
      ark: "Available for applicable products",
      generic: "Varies",
    },
    {
      param: "Material verification",
      ark: "Defined product specifications",
      generic: "May vary",
    },
    {
      param: "Testing",
      ark: "Based on applicable product/test requirements",
      generic: "Should be independently verified",
    },
    {
      param: "Drawing support",
      ark: "Available",
      generic: "Often not included",
    },
    {
      param: "Project customization",
      ark: "Available",
      generic: "Usually standard products",
    },
    {
      param: "Installation guidance",
      ark: "Available",
      generic: "Supplier-dependent",
    },
    {
      param: "Traceability",
      ark: "Product-specific",
      generic: "May be limited",
    },
    {
      param: "Technical support",
      ark: "DFMHUB engineering support",
      generic: "Supplier-dependent",
    },
  ];

  const cities = [
    {
      name: "Bengaluru",
      state: "Karnataka · South India",
      url: "/structural-earthing/bengaluru",
    },
    {
      name: "Chennai",
      state: "Tamil Nadu · South India",
      url: "/structural-earthing/chennai",
    },
    {
      name: "Hyderabad",
      state: "Telangana · South India",
      url: "/structural-earthing/hyderabad",
    },
    {
      name: "Pune",
      state: "Maharashtra · West India",
      url: "/structural-earthing/pune",
    },
  ];

  const earthingFaqs = [
    {
      question: "What is structural earthing?",
      answer:
        "Structural earthing is an engineered method of integrating suitable reinforcement, dedicated earthing conductors and bonding points into a building's earthing network.",
    },
    {
      question:
        "Is structural earthing the same as conventional earth pit earthing?",
      answer:
        "No. Structural earthing uses the building foundation and structural network as part of the earthing arrangement. Conventional earthing generally relies primarily on dedicated electrodes installed in the surrounding soil. The final project may use a coordinated combination of earthing methods.",
    },
    {
      question: "Can RCC reinforcement be used for earthing?",
      answer:
        "Suitable reinforcement may form part of an engineered earthing or lightning protection arrangement when its electrical continuity, connections and installation satisfy the applicable design requirements.",
    },
    {
      question: "Which standard applies to structural earthing in India?",
      answer:
        "IS 3043 is an important Indian reference for earthing. Where the structural network forms part of a lightning protection system, IEC 62305 and relevant IEC 62561 component standards may also apply.",
    },
    {
      question: "What is a rebar bonding clamp?",
      answer:
        "A rebar bonding clamp provides a mechanical and electrical connection between compatible reinforcement and conductors used in the structural earthing or lightning protection network.",
    },
    {
      question: "What is a fixed earthing terminal?",
      answer:
        "A fixed earthing terminal provides an accessible connection point from the concealed structural earthing network for equipment bonding, earthing or lightning protection connections.",
    },
    {
      question: "When should structural earthing be designed?",
      answer:
        "Ideally, it should be coordinated during the structural and MEP design stages, before foundation and RCC work progresses.",
    },
    {
      question: "Can structural earthing be used in high-rise buildings?",
      answer:
        "Yes. Structural earthing can be particularly useful for high-rise RCC buildings where coordinated vertical bonding, equipotential bonding and lightning protection paths need to be considered from the design stage.",
    },
    {
      question: "Does DFMHUB provide structural earthing design?",
      answer:
        "Yes. DFMHUB provides engineering support covering structural earthing layouts, product selection, BOQ preparation and technical documentation based on available project inputs.",
    },
    {
      question: "Where are ARK Structural Earthing products available?",
      answer:
        "DFMHUB supports structural earthing projects across India, including Bengaluru, Chennai, Hyderabad, Pune and Mumbai.",
    },
  ];

  return (
    <div className="w-full transition-colors duration-200">
      {/* Section 1: Hero Section (DARK NAVY - CONCISE HERO TEXT) */}
      <section className="relative bg-[#081021] text-white overflow-hidden py-16 sm:py-20 lg:py-24 border-b border-slate-800">
        <div className="absolute inset-0 z-0 opacity-80">
          <Image
            src={heroImage}
            alt="Structural Earthing foundation rod installation"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#081021] via-[#081021]/95 to-[#081021]/80 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
              <Link href="/" className="hover:text-amber-400 transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <span className="text-amber-400 font-bold">
                Structural Earthing
              </span>
            </div>

            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
              ARK MAKE · STRUCTURAL EARTHING
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-tight tracking-tight">
              Structural Earthing Systems
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-normal">
              Engineered rebar bonding, foundation earthing, and equipotential
              protection networks for modern RCC structures.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href="/tool"
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

      {/* Section 1.5: WHAT IS A STRUCTURAL EARTHING SYSTEM? (CLEAN PLAIN TEXT) */}
      {/* <section className="w-full bg-white text-slate-900 py-12 sm:py-16 lg:py-20 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
            What is a Structural Earthing System?
          </h2>

          <div className="space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
            <p>
              A Structural Earthing System uses the reinforcement and foundation
              of an RCC structure as part of a coordinated earthing and
              lightning protection network.
            </p>
            <p>
              Instead of treating earthing as an activity carried out only after
              construction, the required conductors, rebar connections, earth
              termination points and bonding connections are planned during the
              structural stage itself.
            </p>
            <p>
              The ARK Structural Earthing System by DFMHUB provides engineered
              components for creating reliable electrical continuity through
              foundations, columns, slabs and designated bonding points.
            </p>
          </div>

          <div className="pt-4">
            <span className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider block mb-3">
              It is suitable for:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {[
                "High-rise buildings",
                "Data centres",
                "Hospitals",
                "Commercial buildings",
                "Industrial facilities",
                "Metro and infrastructure projects",
              ].map((item) => (
                <span
                  key={item}
                  className="bg-slate-100 text-slate-800 border border-slate-300 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Section 2: INTRODUCTION & COMPLIANCE (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              INTRODUCTION & COMPLIANCE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-4">
            <div className="lg:col-span-6 space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              <div>
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
                    What is a Structural Earthing System?
                  </h2>
                  <br />
                  <p>
                    A Structural Earthing System uses the reinforcement and
                    foundation of an RCC structure as part of a coordinated
                    earthing and lightning protection network.
                  </p>
                  <p>
                    Instead of treating earthing as an activity carried out only
                    after construction, the required conductors, rebar
                    connections, earth termination points and bonding
                    connections are planned during the structural stage itself.
                  </p>
                  <p>
                    The ARK Structural Earthing System by DFMHUB provides
                    engineered components for creating reliable electrical
                    continuity through foundations, columns, slabs and
                    designated bonding points.
                  </p>
                  <div className="pt-4">
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 uppercase tracking-wider block mb-3">
                      It is suitable for:
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {[
                        "High-rise buildings",
                        "Data centres",
                        "Hospitals",
                        "Commercial buildings",
                        "Industrial facilities",
                        "Metro and infrastructure projects",
                      ].map((item) => (
                        <span
                          key={item}
                          className="bg-slate-100 text-slate-800 border border-slate-300 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <br />
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
                    How a Structural Earthing Network is Built
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 max-w-4xl leading-relaxed font-normal">
                    A structural earthing network is created progressively as
                    the RCC structure is built.
                  </p>
                  <p className="font-medium  text-slate-800">
                    Foundation Network &rarr; Rebar Connections &rarr; Vertical
                    Earthing Routes &rarr; Floor-Level Connections &rarr;
                    Equipotential Bonding &rarr; Lightning Protection Interface
                  </p>
                  <p>
                    Selected reinforcement bars and dedicated conductors are
                    interconnected to create electrically continuous paths
                    through the structure.
                  </p>
                  <p>
                    The final arrangement depends on the building design,
                    electrical system, lightning protection design,
                    fault-current requirements and consultant specifications.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative w-full h-[420px] sm:h-[800px] rounded-xl overflow-hidden shadow-xl border border-slate-200">
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

      {/* Section 2.5: PRODUCT COMPARISON TABLE (LIGHT GRAY) */}
      {/* <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              PRODUCT COMPARISON
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              ARK Structural Earthing vs Generic Products
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[#09101f] text-white">
                  <th className="py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider w-1/3">
                    Parameter
                  </th>
                  <th className="py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 w-1/3">
                    ARK Make by DFMHUB
                  </th>
                  <th className="py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 w-1/3">
                    Generic / Unverified Products
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={row.param}
                    className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}
                  >
                    <td className="py-3.5 px-6 font-semibold text-slate-900">
                      {row.param}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-amber-700 bg-amber-50/30">
                      {row.ark}
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">
                      {row.generic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-100/80 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-xl">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              The correct comparison is not simply ARK versus another brand. Consultants and EPC contractors should compare material specifications, applicable test evidence, installation requirements, traceability and engineering support before approving any structural earthing component.
            </p>
          </div>
        </div>
      </section> */}

      {/* section 3 */}
      {/* section 3 */}

      <Testing matrix={lplMatrix} />

      {/* Section 4: 12 ARK MAKE COMPONENTS (WHITE) */}
      {/* <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              SYSTEM COMPONENTS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-2">
              ARK Structural Earthing System Components
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              ARK provides a coordinated range of components for structural
              earthing and structural lightning protection applications.
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
      </section> */}
{products && products.length > 0 && (
      <ProductCarousel products={products} title="Structural Earthing Products" subtitle="Explore our engineered components for creating reliable electrical continuity through foundations." />
)}
      {/* product comparision */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              PRODUCT COMPARISON
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
              ARK Structural Earthing vs Generic Products
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm bg-white">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-[#09101f] text-white">
                  <th className="py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider w-1/3">
                    Parameter
                  </th>
                  <th className="py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 w-1/3">
                    ARK Make by DFMHUB
                  </th>
                  <th className="py-4 px-6 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300 w-1/3">
                    Generic / Unverified Products
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {comparisonData.map((row, idx) => (
                  <tr
                    key={row.param}
                    className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"}
                  >
                    <td className="py-3.5 px-6 font-semibold text-slate-900">
                      {row.param}
                    </td>
                    <td className="py-3.5 px-6 font-medium text-amber-700 bg-amber-50/30">
                      {row.ark}
                    </td>
                    <td className="py-3.5 px-6 text-slate-600">
                      {row.generic}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-slate-100/80 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-xl">
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              The correct comparison is not simply ARK versus another brand.
              Consultants and EPC contractors should compare material
              specifications, applicable test evidence, installation
              requirements, traceability and engineering support before
              approving any structural earthing component.
            </p>
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
              Soil conditions differ sharply between metros — so do our
              electrode designs.
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
