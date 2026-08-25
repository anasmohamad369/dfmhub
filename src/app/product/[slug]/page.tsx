import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import ProductDetailView from "@/components/product/ProductDetailView";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
  // Handle both Next.js 14 and 15 params
  const resolvedParams = await Promise.resolve(params);
  
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
