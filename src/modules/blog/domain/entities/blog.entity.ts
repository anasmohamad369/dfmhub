export interface BlogRecord {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string;
  imageUrl?: string | null;
  author: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BlogCategory =
  | "LIGHTNING_PROTECTION"
  | "STRUCTURAL_EARTHING"
  | "STANDARDS"
  | "TESTING"
  | "SURGE_PROTECTION"
  | "MAINTENANCE";
