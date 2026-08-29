import { z } from "zod";

export const CATEGORY_OPTIONS = [
  { value: "LIGHTNING_PROTECTION", label: "Lightning Protection", badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
  { value: "STRUCTURAL_EARTHING", label: "Structural Earthing", badgeClass: "bg-blue-500/10 text-blue-600 border-blue-500/30" },
  { value: "STANDARDS", label: "Standards & Compliance", badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30" },
  { value: "TESTING", label: "Earth Resistance Testing", badgeClass: "bg-purple-500/10 text-purple-600 border-purple-500/30" },
  { value: "SURGE_PROTECTION", label: "Surge Protection (SPD)", badgeClass: "bg-rose-500/10 text-rose-600 border-rose-500/30" },
  { value: "MAINTENANCE", label: "LPS Maintenance", badgeClass: "bg-indigo-500/10 text-indigo-600 border-indigo-500/30" },
] as const;

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(150, { message: "Title cannot exceed 150 characters" }),
  slug: z.string().optional(),
  category: z
    .string()
    .min(1, { message: "Please select a category (e.g. Lightning Protection or Structural Earthing)" }),
  readTime: z.string().default("5 min read"),
  summary: z
    .string()
    .min(10, { message: "Summary must be at least 10 characters long" })
    .max(300, { message: "Summary cannot exceed 300 characters" }),
  content: z
    .string()
    .min(20, { message: "Content must be at least 20 characters long" }),
  imageUrl: z.string().optional(),
  author: z.string().default("DFMHUB Engineering Team"),
});

export type BlogFormValues = z.infer<typeof blogSchema>;

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
