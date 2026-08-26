import { z } from "zod";

export const CATEGORY_OPTIONS = [
  { value: "LIGHTNING_PROTECTION", label: "Lightning Protection" },
  { value: "STRUCTURAL_EARTHING", label: "Structural Earthing" },
  { value: "ACCESSORIES", label: "Accessories" },
];

export const productFormSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  slug: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().optional().nullable(),
  category: z.string().min(1, "Category is required"),
  imageUrl: z.string().optional().nullable(),
  inStock: z.boolean().default(true),
  brand: z.string().optional().nullable(),
  primaryApplication: z.string().optional().nullable(),
  specifications: z.any().optional(),
  features: z.any().optional(),
  useCases: z.any().optional(),
  faqs: z.any().optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
