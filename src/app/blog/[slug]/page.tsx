import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";

interface RelatedArticle {
  title: string;
  slug: string;
}

interface BlogArticle {
  slug: string;
  category: string;
  title: string;
  date: string;
  readTime: string;
  leadText: string;
  sections: {
    heading?: string;
    paragraphs: string[];
  }[];
  relatedArticles: RelatedArticle[];
}

const testingArticle: BlogArticle = {
  slug: "earth-resistance-testing-fall-of-potential-clamp-on",
  category: "TESTING",
  title: "Earth Resistance Testing: Fall-of-Potential, Clamp-On and Which One to Trust",
  date: "2 June 2026",
  readTime: "6 min read",
  leadText:
    "The three field methods used on Indian sites, when each is valid, and the mistakes that produce falsely low readings.",
  sections: [
    {
      heading: "Fall-of-potential (3-pole / 4-pole)",
      paragraphs: [
        "The reference method in IS 3043. The electrode is disconnected at the test link, and current and potential spikes are driven along a straight line at 62% and 100% of a distance at least five times the electrode depth. A flat plateau in the readings confirms the result.",
      ],
    },
    {
      heading: "Clamp-on testing",
      paragraphs: [
        "Fast and non-invasive, but only valid on multi-electrode systems with a genuine parallel return path. On a single isolated electrode a clamp meter will simply be wrong.",
      ],
    },
    {
      heading: "Soil resistivity (Wenner four-pin)",
      paragraphs: [
        "Done before design, not after. Four equally spaced pins give apparent resistivity at increasing depths, which determines whether driven rods, deep-bore electrodes or a grid mat is the economic answer for the site.",
      ],
    },
  ],
  relatedArticles: [
    {
      title: "IS/IEC 62305 Lightning Protection Design: A Practical Guide for Indian Projects",
      slug: "is-iec-62305-lightning-protection-design-guide",
    },
    {
      title: "Structural Earthing vs Conventional Earth Pits: What Changes on a High-Rise",
      slug: "structural-earthing-vs-conventional-earth-pits",
    },
  ],
};

const structuralEarthingArticle: BlogArticle = {
  slug: "structural-earthing-vs-conventional-earth-pits",
  category: "EARTHING",
  title: "Structural Earthing vs Conventional Earth Pits: What Changes on a High-Rise",
  date: "21 April 2026",
  readTime: "7 min read",
  leadText:
    "Using foundation reinforcement as an earth electrode lowers impedance, saves land and is explicitly permitted by IS 3043 and IEC 62305-3.",
  sections: [
    {
      heading: "Why the foundation is the best electrode you already own",
      paragraphs: [
        "A pile cap or raft holds hundreds of square metres of steel in permanent contact with moist soil. Bonded correctly, it gives a lower and far more stable impedance than any cluster of 3 m pits, and it cannot be damaged by landscaping or excavation later.",
      ],
    },
    {
      heading: "Getting it right at the construction stage",
      paragraphs: [
        "Structural earthing has to be built with the structure. Rebar bonding clamps or exothermic welds are placed before concreting, cross-bonds are made at every level of the reinforcement cage, and stub-ups are brought out to test links above the plinth.",
        "Retrofitting is expensive and rarely as effective — this is a decision taken in the first months of a project, not at the fit-out stage.",
      ],
    },
  ],
  relatedArticles: [
    {
      title: "IS/IEC 62305 Lightning Protection Design: A Practical Guide for Indian Projects",
      slug: "is-iec-62305-lightning-protection-design-guide",
    },
    {
      title: "Earth Resistance Testing: Fall-of-Potential, Clamp-On and Which One to Trust",
      slug: "earth-resistance-testing-fall-of-potential-clamp-on",
    },
  ],
};

const spdArticle: BlogArticle = {
  slug: "spd-coordination-why-one-surge-device-at-panel-is-never-enough",
  category: "SURGE PROTECTION",
  title: "SPD Coordination: Why One Surge Device at the Panel Is Never Enough",
  date: "8 March 2026",
  readTime: "5 min read",
  leadText:
    "Type 1, Type 2 and Type 3 devices do different jobs. Here is how to stage them across an Indian LT distribution.",
  sections: [
    {
      heading: "Three stages, three duties",
      paragraphs: [
        "Type 1 SPDs at the main incomer handle partial lightning current (Iimp, 10/350 µs). Type 2 devices at sub-distribution clamp the residual to equipment-tolerable levels. Type 3 devices sit close to sensitive loads to control the last few hundred volts of let-through.",
      ],
    },
    {
      heading: "Coordination rules that get missed",
      paragraphs: [
        "Maintain the manufacturer's minimum cable length or decoupling inductance between stages, keep connecting leads under 0.5 m total, and bond every SPD earth to the same equipotential bar as the LPS down conductors. An uncoordinated SPD set can be worse than none at all.",
      ],
    },
  ],
  relatedArticles: [
    {
      title: "IS/IEC 62305 Lightning Protection Design: A Practical Guide for Indian Projects",
      slug: "is-iec-62305-lightning-protection-design-guide",
    },
    {
      title: "Earth Resistance Testing: Fall-of-Potential, Clamp-On and Which One to Trust",
      slug: "earth-resistance-testing-fall-of-potential-clamp-on",
    },
  ],
};

const maintenanceArticle: BlogArticle = {
  slug: "annual-lps-maintenance-checklist-facility-teams",
  category: "MAINTENANCE",
  title: "Annual LPS Maintenance Checklist for Facility Teams",
  date: "11 February 2026",
  readTime: "4 min read",
  leadText:
    "A visual and instrumented inspection routine that keeps your system compliant and your insurance valid.",
  sections: [
    {
      heading: "Visual inspection",
      paragraphs: [
        "Check air terminals for corrosion and mechanical damage, confirm conductor fixings at specified spacing, look for broken bonds at expansion joints, and verify that new rooftop equipment has been bonded into the existing mesh.",
      ],
    },
    {
      heading: "Instrumented tests",
      paragraphs: [
        "Measure continuity across every test link, record earth resistance at each electrode, log strike counter readings, and confirm SPD status indicators. IEC 62305-3 recommends annual inspection for LPL I and II systems, with a full test every two years.",
      ],
    },
  ],
  relatedArticles: [
    {
      title: "IS/IEC 62305 Lightning Protection Design: A Practical Guide for Indian Projects",
      slug: "is-iec-62305-lightning-protection-design-guide",
    },
    {
      title: "Earth Resistance Testing: Fall-of-Potential, Clamp-On and Which One to Trust",
      slug: "earth-resistance-testing-fall-of-potential-clamp-on",
    },
  ],
};

const blogArticlesData: Record<string, BlogArticle> = {
  "is-iec-62305-lightning-protection-design-guide": {
    slug: "is-iec-62305-lightning-protection-design-guide",
    category: "STANDARDS",
    title: "IS/IEC 62305 Lightning Protection Design: A Practical Guide for Indian Projects",
    date: "14 July 2026",
    readTime: "8 min read",
    leadText:
      "How to run a risk assessment, pick a protection level, and translate rolling sphere radius into a buildable air termination layout.",
    sections: [
      {
        heading: "Start with risk, not with rods",
        paragraphs: [
          "IS/IEC 62305-2 requires a quantified risk assessment before any hardware is selected. The assessment compares calculated risk R1 (loss of human life) against the tolerable risk RT of 10⁻⁵, using strike density, collection area, structure use, and internal system sensitivity.",
          "The output of that calculation is a Lightning Protection Level (LPL I to IV), which in turn fixes the rolling sphere radius, mesh size, and down conductor spacing for the project.",
        ],
      },
      {
        heading: "From protection level to layout",
        paragraphs: [
          "LPL I uses a 20 m rolling sphere with a 5x5 m mesh and 10 m down conductor spacing; LPL IV relaxes to 60 m, 20x20 m and 20 m respectively. Data centres, pharma plants and explosive atmospheres almost always land at LPL I or II.",
          "Model the rolling sphere across the actual roof geometry — parapets, chillers, antennas and lift machine rooms are the surfaces that get struck, and each needs either a terminal or a bonded conductive path.",
        ],
      },
      {
        heading: "Documentation that survives an audit",
        paragraphs: [
          "A compliant handover pack contains the risk assessment, air termination drawings, down conductor routing, earth resistance test records for each electrode, continuity readings across every test link, and material test certificates to IEC 62561.",
        ],
      },
    ],
    relatedArticles: [
      {
        title: "Earth Resistance Testing: Fall-of-Potential, Clamp-On and Which One to Trust",
        slug: "earth-resistance-testing-fall-of-potential-clamp-on",
      },
      {
        title: "Structural Earthing vs Conventional Earth Pits: What Changes on a High-Rise",
        slug: "structural-earthing-vs-conventional-earth-pits",
      },
    ],
  },

  "earth-resistance-testing-fall-of-potential-clamp-on": testingArticle,
  "earth-resistance-testing-methods-explained": testingArticle,

  "structural-earthing-vs-conventional-earth-pits": structuralEarthingArticle,
  "structural-earthing-vs-conventional-earthing": structuralEarthingArticle,

  "spd-coordination-why-one-surge-device-at-panel-is-never-enough": spdArticle,
  "surge-protection-device-coordination-india": spdArticle,

  "annual-lps-maintenance-checklist-facility-teams": maintenanceArticle,
  "lightning-protection-maintenance-checklist": maintenanceArticle,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogArticlesData[slug];
  if (!post) return { title: "Blog Article | DFMHUB" };
  return {
    title: `${post.title} | DFMHUB Technical Blog`,
    description: post.leadText,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogArticlesData[slug];

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.leadText,
    datePublished: "2026-07-14",
    author: {
      "@type": "Organization",
      name: "DFMHUB Technical Team",
    },
    publisher: {
      "@type": "Organization",
      name: "DFMHUB Systems",
      logo: {
        "@type": "ImageObject",
        url: "https://dfmhub.in/images/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://dfmhub.in/blog/${post.slug}`,
    },
  };

  return (
    <div className="w-full transition-colors duration-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {/* Header Banner (DARK NAVY) */}
      <section className="bg-[#070d19] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block">
            {post.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            {post.date} · {post.readTime}
          </p>
        </div>
      </section>

      {/* Main Article Content (WHITE) */}
      <section className="w-full bg-white text-slate-900 py-12 sm:py-16 border-b border-slate-200/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Lead Text */}
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {post.leadText}
          </p>

          {/* Section Blocks */}
          <div className="space-y-8 pt-2">
            {post.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                {sec.heading && (
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {sec.heading}
                  </h2>
                )}
                {sec.paragraphs.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Related Reading */}
          {post.relatedArticles && post.relatedArticles.length > 0 && (
            <div className="pt-8 border-t border-slate-200/80 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Related reading
              </h3>
              <div className="space-y-2">
                {post.relatedArticles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="block text-xs sm:text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline leading-snug"
                  >
                    {rel.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Form Section (LIGHT GRAY) */}
      <section className="w-full bg-[#f1f5f9] text-slate-900 py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
