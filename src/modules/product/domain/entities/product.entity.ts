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
  highlights: string[];
}

export const PRODUCT_CATEGORIES: CategoryInfo[] = [
  {
    key: "LIGHTNING_PROTECTION",
    title: "Lightning Protection",
    tagline: "IS/IEC 62305 & IEC 62561 Compliant Systems",
    description:
      "Complete lightning protection solutions designed to protect buildings, infrastructure, and critical systems from lightning-related damage.",
    badgeLabel: "IS/IEC 62305",
    badgeClass:
      "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400 dark:border-amber-500/30",
    highlights: [
      "Air Terminals & Finials",
      "Down Conductors & Clamps",
      "Test Joints & Disconnectors",
      "Surge Protection Devices",
    ],
  },
  {
    key: "STRUCTURAL_EARTHING",
    title: "Structural Earthing",
    tagline: "IS 3043 & IEC 62561 Compliant Systems",
    description:
      "Reliable structural earthing solutions designed for safe electrical grounding, fault dissipation, and long-term infrastructure protection.",
    badgeLabel: "IS 3043",
    badgeClass:
      "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400 dark:border-blue-500/30",
    highlights: [
      "Foundation Rebar Bonding",
      "Chemical Earth Electrodes",
      "Copper Bonded Conductors",
      "Equipotential Earth Bars",
    ],
  },
];
