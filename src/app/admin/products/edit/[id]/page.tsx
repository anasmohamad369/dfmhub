import ProductForm from "../../ProductForm";
import AdminHeader from "@/components/AdminHeader";
import { getProductById } from "@/lib/products";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  // Handle both Next.js 14 (object) and Next.js 15 (Promise) params correctly
  const resolvedParams = await Promise.resolve(params);
  const product = await getProductById(resolvedParams.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      <AdminHeader title="Edit Product" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductForm initialData={product} isEdit={true} />
      </main>
    </div>
  );
}
