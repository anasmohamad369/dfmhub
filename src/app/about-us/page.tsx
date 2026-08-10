import React from "react";
import Link from "next/link";
import { Factory, ShieldCheck, Cpu, HardHat, FileText } from "lucide-react";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "About DFMHUB | ARK Make Lightning Protection Manufacturer",
  description:
    "DFMHUB manufactures ARK Make lightning protection and structural earthing systems in India — in-house production, IEC 62561 type-tested components and certified installation teams.",
};

export default function AboutUsPage() {
  const capabilities = [
    {
      icon: Factory,
      title: "Manufacturing",
      desc: "ARK Make air terminals, conductors, clamps, electrodes and weld kits produced in-house with batch traceability and IEC 62561 type-test evidence.",
    },
    {
      icon: Cpu,
      title: "Engineering",
      desc: "In-house design cell running IS/IEC 62305-2 risk assessments, rolling sphere modeling and soil resistivity interpretation for every project.",
    },
    {
      icon: HardHat,
      title: "Execution",
      desc: "Directly employed installation crews with height-safety certification, working across roofs, facades and live foundation pours.",
    },
    {
      icon: FileText,
      title: "Assurance",
      desc: "Instrument-traceable earth resistance and continuity testing, as-built drawings and a compliance pack at handover.",
    },
  ];

  return (
    <div className="w-full transition-colors duration-200">
      {/* Section 1: Page Header / Hero Banner (DARK NAVY) */}
      <section className="w-full bg-[#081021] text-white py-16 sm:py-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-400">
              Home
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-bold">About Us</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            About DFMHUB
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl leading-relaxed font-normal">
            DFMHUB builds ARK Make lightning protection and structural earthing systems, then designs, installs and tests them — so a single team answers for compliance from first drawing to final test report.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact-us"
              className="bg-[#d97706] hover:bg-[#b45309] text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md shadow-lg transition-all flex items-center justify-center"
            >
              GET A FREE DESIGN CONSULTATION
            </Link>
            <Link
              href="/installation-services"
              className="bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 py-4 rounded-md border border-slate-700 transition-all flex items-center justify-center"
            >
              INSTALLATION SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2: WHO WE ARE (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left side text */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
                WHO WE ARE
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight">
                Closing the gap between engineering design, manufacturing quality, and site execution
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                On most Indian projects the LPS is split between a designer, a trader and a contractor. Nobody holds the full picture, and the failures show up years later as burnt equipment, failed audits and rejected insurance claims.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                DFMHUB was set up to close that gap. We manufacture the ARK Make product range, employ the engineers who size and model the system, and field our own installation and testing crews. When a client asks why a particular mesh size, electrode depth or SPD rating was chosen, the calculation is on file.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                That approach suits facilities where downtime is expensive — data centres, pharmaceutical plants, aerospace units, semiconductor and electronics manufacturing, telecom towers, solar parks, high-rise residential towers and public infrastructure.
              </p>
            </div>

            {/* Right side Info Card */}
            <div className="lg:col-span-5 bg-[#fffdf5] border border-amber-200/80 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
              <div className="flex items-center space-x-3.5 border-b border-amber-200/60 pb-4">
                <ShieldCheck className="w-8 h-8 text-amber-600 shrink-0" />
                <div>
                  <h3 className="font-bold text-slate-900 text-lg leading-tight">
                    ARK Make Engineering
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-normal">
                    Registered Office & Technical Center
                  </p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed font-normal">
                <p>
                  <strong className="text-slate-900 font-bold block mb-0.5">Registered Office:</strong>
                  Industrial Area, Peenya, Bengaluru, Karnataka 560058, India.
                </p>
                <p>
                  <strong className="text-slate-900 font-bold block mb-0.5">Enquiries:</strong>
                  sales@dfmhub.in · +91 98860 00000
                </p>
                <p>
                  <strong className="text-slate-900 font-bold block mb-0.5">Coverage:</strong>
                  Dedicated design & build engineering teams serving Bengaluru, Chennai, Hyderabad, Pune & Nationwide projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: CORE CAPABILITIES (LIGHT GRAY) */}
      <section className="w-full bg-[#f8fafc] text-slate-900 py-16 sm:py-20 lg:py-24 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
              CORE CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">
              End-to-end lightning & earthing infrastructure
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="bg-white border border-slate-200/80 rounded-xl p-6 sm:p-8 space-y-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 4: Talk to an Engineer / Form Section (LIGHT GRAY) */}
      <section className="w-full bg-[#f1f5f9] text-slate-900 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

