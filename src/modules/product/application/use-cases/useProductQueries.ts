import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductBySlug,
  fetchProductById,
} from "../../infrastructure/repositories/product.repository";
import { ProductRecord } from "../../domain/entities/product.entity";

export function useProductsQuery(category?: string, initialData?: ProductRecord[]) {
  return useQuery({
    queryKey: ["products", category || "ALL"],
    queryFn: () => fetchProducts(category),
    initialData: initialData && initialData.length > 0 ? initialData : undefined,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useProductDetailQuery(slug: string, initialData?: ProductRecord) {
  return useQuery({
    queryKey: ["productDetail", slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
    initialData: initialData || undefined,
  });
}

export function useProductByIdQuery(id: string) {
  return useQuery({
    queryKey: ["productById", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
  });
}
