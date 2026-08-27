import ProductsClient from "./ProductsClient";
import AdminHeader from "@/components/AdminHeader";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-16">
      <AdminHeader title="Products" />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsClient />
      </main>
    </div>
  );
}
