import { prisma } from "./prisma";

export interface CreateProductInput {
  title: string;
  slug?: string;
  productCode?: string;
  description: string;
  price?: number;
  category: string;
  imageUrl?: string;
  images?: string[];
  inStock?: boolean;
  brand?: string;
  primaryApplication?: string;
  specifications?: any;
  features?: any;
  useCases?: any;
  faqs?: any;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

export function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export function categoryToSlug(category?: string | null): string {
  if (!category) return "structural-earthing";
  const norm = category.trim().toUpperCase().replace(/[-\s]+/g, "_");
  if (norm === "LIGHTNING_PROTECTION") return "lightning-protection";
  if (norm === "STRUCTURAL_EARTHING") return "structural-earthing";
  if (norm === "ACCESSORIES") return "accessories";
  return category.toLowerCase().trim().replace(/_/g, "-").replace(/\s+/g, "-");
}

export function slugToCategory(slug?: string | null): string {
  if (!slug) return "STRUCTURAL_EARTHING";
  const norm = slug.trim().toLowerCase().replace(/_/g, "-");
  if (norm === "lightning-protection" || norm === "lightning-protection-system") return "LIGHTNING_PROTECTION";
  if (norm === "structural-earthing") return "STRUCTURAL_EARTHING";
  if (norm === "accessories") return "ACCESSORIES";
  return slug.toUpperCase().trim().replace(/-/g, "_");
}

export function getProductUrl(product?: { slug?: string; category?: string | null } | null): string {
  if (!product || !product.slug) return "/product";
  const catSlug = categoryToSlug(product.category);
  return `/product/${catSlug}/${product.slug}`;
}


export async function getAllProducts() {
  return await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getProductById(id: string) {
  return await prisma.product.findUnique({
    where: { id },
  });
}

export async function getProductBySlug(slug: string) {
  return await prisma.product.findUnique({
    where: { slug },
  });
}

export async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      category: {
        in: ["LIGHTNING_PROTECTION", "STRUCTURAL_EARTHING"],
      },
      inStock: true,
    },
    orderBy: { createdAt: "desc" },
    take: 8,
  });
}

export async function getProductsByCategory(category: string, take?: number) {
  return await prisma.product.findMany({
    where: { category, inStock: true },
    orderBy: { createdAt: "desc" },
    take: take || undefined,
  });
}

export async function createProduct(input: CreateProductInput) {
  const slug = input.slug ? generateSlug(input.slug) : generateSlug(input.title);
  
  return await prisma.product.create({
    data: {
      title: input.title,
      productCode: input.productCode || null,
      slug,
      description: input.description,
      price: input.price,
      category: input.category,
      imageUrl: input.imageUrl,
      images: input.images || [],
      inStock: input.inStock ?? true,
      brand: input.brand,
      primaryApplication: input.primaryApplication,
      specifications: input.specifications,
      features: input.features,
      useCases: input.useCases,
      faqs: input.faqs,
    },
  });
}

export async function updateProduct(input: UpdateProductInput) {
  const { id, slug, ...rest } = input;
  const updateData: any = { ...rest };
  
  if (slug) {
    updateData.slug = generateSlug(slug);
  } else if (input.title) {
    updateData.slug = generateSlug(input.title);
  }

  return await prisma.product.update({
    where: { id },
    data: updateData,
  });
}

export async function deleteProduct(id: string) {
  return await prisma.product.delete({
    where: { id },
  });
}
