import ProductsClient from "./ProductsClient";
import AdminHeader from "@/components/AdminHeader";

export default function AdminProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminHeader title="Products" />
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <ProductsClient />
      </main>
    </div>
  );
}
