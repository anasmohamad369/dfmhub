import { z } from "zod";

export const CATEGORY_OPTIONS = [
  { value: "LIGHTNING_PROTECTION", label: "Lightning Protection" },
  { value: "STRUCTURAL_EARTHING", label: "Structural Earthing" },
  { value: "ACCESSORIES", label: "Accessories" },
];

export const productFormSchema = z.object({
  title: z.string().min(1, "Product name is required"),
  slug: z.string().optional(),
  description: z.string().min(1, "Product description is required"),
  price: z.number().optional().nullable(),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  primaryApplication: z.string().min(1, "Primary application is required"),
  imageUrl: z.string().min(1, "At least one product image is required"),
  images: z.array(z.string()).optional().default([]),
  inStock: z.boolean().default(true),
  specifications: z
    .array(
      z.object({
        property: z.string().min(1, "Property name is required"),
        value: z.string().min(1, "Property value is required"),
      })
    )
    .min(1, "At least one technical specification is required"),
  features: z
    .array(
      z.object({
        value: z.string().min(1, "Feature point cannot be empty"),
      })
    )
    .min(1, "At least one key feature is required"),
  useCases: z
    .array(
      z.object({
        value: z.string().min(1, "Application area cannot be empty"),
      })
    )
    .min(1, "At least one use case / application area is required"),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional()
    .default([]),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
