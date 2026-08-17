import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle,
  FileCheck,
  Headphones,
  Send,
  Building,
  HelpCircle,
  ChevronRight,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";
import ContactForm from "@/components/ContactForm";
import FAQAccordion from "@/components/FAQAccordion";

export const metadata = {
  title: "Contact Us | DFMHUB - Lightning Protection & Earthing Systems India",
  description:
    "Get in touch with DFMHUB for IS/IEC 62305 & IS 3043 compliant lightning protection systems, structural earthing components, earth resistance testing, and turnkey installations across India. Headquarters in Kamakshipalya, Bengaluru.",
  keywords: [
    "Contact DFMHUB",
    "Lightning protection manufacturer contact",
    "Earthing system enquiry Bengaluru",
    "Kamakshipalya industrial area earthing company",
    "ARK Make contact number",
    "Lightning risk assessment quote",
    "Earth resistance testing contact",
  ],
  alternates: {
    canonical: "https://dfmhub.vercel.app/contact-us",
  },
  openGraph: {
    title: "Contact DFMHUB | Lightning Protection & Structural Earthing Systems",
    description:
      "Reach DFMHUB engineering team for CAD drawing review, risk assessment, factory direct quotes, and pan-India installation services.",
    url: "https://dfmhub.vercel.app/contact-us",
  },
};

const contactFaqs = [
  {
    question: "How quickly can DFMHUB provide a lightning protection quote?",
    answer:
      "If you share basic structure parameters (building height, roof dimensions, location, soil resistivity if available, or architectural roof drawings), our engineering team generates an IS/IEC 62305 risk assessment summary, recommended layout, bill of materials, and fixed quotation within 24 working hours.",
  },
  {
    question: "Can I submit AutoCAD drawings (.dwg / .pdf) for review?",
    answer:
      "Yes! You can email your drawings directly to partner@dfmhub.com along with your enquiry details. Our technical design cell will overlay air termination mesh, down conductor paths, and earth pit grid locations.",
  },
  {
    question: "Do you offer emergency on-site earth resistance testing or audits?",
    answer:
      "Yes. DFMHUB provides rapid-dispatch technical teams for earth resistance testing (Fall-of-Potential method), surge protection device audits, and annual LPS maintenance verification across major industrial hubs including Bengaluru, Chennai, Hyderabad, and Pune.",
  },
  {
    question: "Where is DFMHUB's main manufacturing facility located?",
    answer:
      "Our main manufacturing plant and corporate office are located at No 418, 3rd Main Pette chennapa Industrial area Kamakshi Palya Bengaluru -560079.",
  },
  {
    question: "Do you support supply-only as well as turnkey installation?",
    answer:
      "We support both! Contractors and EPC firms can purchase ARK Make components (copper bonded rods, chemical earth compound, air terminals, test links, exothermic weld kits) directly from factory stock, or opt for our complete turnkey design, supply, installation, and compliance certification package.",
  },
];

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://dfmhub.vercel.app/contact-us/#webpage",
      url: "https://dfmhub.vercel.app/contact-us",
      name: "Contact DFMHUB Engineering & Manufacturing",
      description: "Official contact page for DFMHUB ARK Make lightning protection and structural earthing systems.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://dfmhub.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact Us",
            item: "https://dfmhub.vercel.app/contact-us",
          },
        ],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://dfmhub.vercel.app/#localbusiness",
      name: "DFMHUB Systems HQ",
      image: "https://dfmhub.vercel.app/images/logo.png",
      telephone: "+91-94835-64777",
      email: "partner@dfmhub.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No 418, 3rd Main Pette chennapa Industrial area Kamakshi Palya",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        postalCode: "560079",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.032,
        longitude: 77.525,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      priceRange: "₹₹₹",
    },
  ],
};

export default function ContactUsPage() {
  return (
    <div className="w-full transition-colors duration-200 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      {/* Hero Section */}
      <section className="w-full bg-[#081021] text-white py-14 sm:py-20 lg:py-24 border-b border-slate-800 relative overflow-hidden">
        {/* Background Subtle Accent Gradients */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-bold">Contact Us</span>
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5 fill-amber-400/20" />
              <span>ARK Make Technical Consultation & Factory Quotes</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Get in Touch with Our Engineering Team
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed font-normal">
              Need standard IS/IEC 62305 lightning risk assessment, structural earthing design, earth pit testing, or custom manufactured ARK Make components? We are here to help.
            </p>
          </div>

          {/* Quick Info Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center space-x-2 bg-slate-900/90 px-3.5 py-2 rounded-lg border border-slate-800">
              <CheckCircle className="w-4 h-4 text-amber-400" />
              <span>24-Hour Quote Turnaround</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/90 px-3.5 py-2 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>IS/IEC 62305 & IS 3043 Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/90 px-3.5 py-2 rounded-lg border border-slate-800">
              <Headphones className="w-4 h-4 text-amber-400" />
              <span>Direct Factory Engineering Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Action Cards Grid */}
      <section className="w-full py-12 sm:py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Direct Hotline & WhatsApp */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-6 space-y-4 hover:border-amber-500/50 hover:shadow-lg transition-all group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6" />
                  </div>
                  <a
                    href="https://wa.me/919483564777?text=Hello%20DFMHUB%20Team,%20I%20want%20to%20enquire%20about%20Lightning%20Protection%20%26%20Earthing."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                    title="Chat on WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                    Direct Phone & WhatsApp
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Call or WhatsApp Directly
                  </h3>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <a
                    href="tel:+919483564777"
                    className="block font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-sm"
                  >
                    +91 94835 64777
                  </a>
                </div>
              </div>
              <a
                href="https://wa.me/919483564777?text=Hello%20DFMHUB%20Team,%20I%20want%20to%20enquire%20about%20Lightning%20Protection%20%26%20Earthing."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase py-2.5 px-3 rounded shadow transition-all mt-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Card 2: Email Technical Sales */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-6 space-y-4 hover:border-amber-500/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  Drawings & Enquiries
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Email Technical Cell
                </h3>
              </div>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <a
                  href="mailto:partner@dfmhub.com"
                  className="block font-bold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-sm"
                >
                  partner@dfmhub.com
                </a>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                Send roof layout, soil data & BOQ
              </p>
            </div>

            {/* Card 3: HQ Plant Location */}
            <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl p-6 space-y-4 hover:border-amber-500/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                  Factory & HQ
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Kamakshipalya Plant, Bengaluru
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                No 418, 3rd Main Pette chennapa Industrial area Kamakshi Palya Bengaluru -560079
              </p>
              <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold pt-1">
                Plant Visit by Appointment
              </p>
            </div>

            {/* Card 4: Emergency Inspection */}
            <div className="bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 rounded-xl p-6 space-y-4 hover:border-amber-500/50 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center group-hover:scale-110 transition-transform font-bold">
                <Zap className="w-6 h-6 fill-slate-950" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                  Immediate Support
                </span>
                <h3 className="text-lg font-bold text-white">
                  Emergency Site Audit
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Active construction sites requiring urgent grounding compliance or post-surge diagnostics.
              </p>
              <a
                href="tel:+919483564777"
                className="inline-flex items-center space-x-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 underline pt-1"
              >
                <span>Dispatch Inspection Team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map & Office Locations Component */}
      <section className="w-full py-16 sm:py-24 bg-slate-100/70 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-amber-600 dark:text-amber-400 font-bold text-xl uppercase tracking-widest block">
              LOCATION & DIRECTIONS
            </span>
            <p className="text-xl sm:text-sm text-slate-600 dark:text-slate-400">
              Visit our manufacturing facility and registered technical center in Kamakshipalya Industrial Area, Bengaluru. Get directions, direct phone lines, and operating hours below.
            </p>
          </div>

          {/* Interactive Map Component */}
          <InteractiveMap />
        </div>
      </section>

      {/* Contact & Quotation Form Section */}
      <section className="w-full py-16 sm:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

    

      {/* FAQ Section */}
      {/* <section className="w-full py-16 sm:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-widest block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Contact & Project Quotation FAQs
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Have questions about submitting project drawings, requesting site audits, or lead times?
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md">
            <FAQAccordion items={contactFaqs} />
          </div>
        </div>
      </section> */}
    </div>
  );
}
