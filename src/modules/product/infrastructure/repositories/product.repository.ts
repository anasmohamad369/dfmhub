import { ProductRecord } from "../../domain/entities/product.entity";

export async function fetchProducts(category?: string): Promise<ProductRecord[]> {
  const url = category && category !== "ALL" ? `/api/products?category=${category}` : "/api/products";
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await res.json();
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.data)) {
    return data.data;
  }
  return [];
}

export async function fetchProductBySlug(slug: string): Promise<ProductRecord | null> {
  const res = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await res.json();
  if (Array.isArray(data)) {
    return data.find((p) => p.slug === slug) || null;
  }
  return data;
}

export async function fetchProductById(id: string): Promise<ProductRecord> {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  return await res.json();
}
