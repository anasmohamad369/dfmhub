export interface ProductRecord {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: number | null;
  category: ProductCategory | string;
  imageUrl: string | null;
  inStock: boolean;
  brand?: string | null;
  primaryApplication?: string | null;
  specifications?: any;
  features?: any;
  useCases?: any;
  faqs?: any;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export type ProductCategory =
  | "LIGHTNING_PROTECTION"
  | "STRUCTURAL_EARTHING"
  | "ACCESSORIES";

export interface CategoryInfo {
  key: ProductCategory;
  title: string;
  tagline: string;
  description: string;
  badgeLabel: string;
  badgeClass: string;
  image: string;
  highlights: string[];
  ctaLabel: string;
}

export const PRODUCT_CATEGORIES: CategoryInfo[] = [
  {
    key: "LIGHTNING_PROTECTION",
    title: "Lightning Protection",
    tagline: "Air-Termination & Surge Protection",
    description:
      "Engineered external LPS components and surge protection systems designed to protect infrastructure against direct lightning strikes.",
    badgeLabel: "Lightning Protection",
    badgeClass: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    image: "/images/lps-hero.png",
    highlights: [
      "IS/IEC 62305 Risk Assessment Compliance",
      "Type-Tested to IEC 62561 with Batch Traceability",
      "Air Terminals, Down Conductors & Fixing Clamps",
      "Coordinated Surge Protection Devices (SPDs)",
    ],
    ctaLabel: "Explore Lightning Protection",
  },
  {
    key: "STRUCTURAL_EARTHING",
    title: "Structural Earthing",
    tagline: "Foundation Rebar & Grounding Networks",
    description:
      "Reliable structural earthing and chemical electrode systems designed for safe electrical grounding and fault dissipation.",
    badgeLabel: "Structural Earthing",
    badgeClass: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    image: "/images/earthing-hero.png",
    highlights: [
      "IS 3043:2018 Indian Earthing Standard",
      "Foundation Rebar Bonding & Equipotential Bars",
      "High Conductivity Chemical Earth Electrodes",
      "Exothermic Welding Kits & Test Pits",
    ],
    ctaLabel: "Explore Structural Earthing",
  },
];
