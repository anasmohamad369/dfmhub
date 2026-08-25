import ProductForm from "../ProductForm";
import AdminHeader from "@/components/AdminHeader";

export default function NewProductPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AdminHeader title="Create Product" />
      <main className="p-4 md:p-8 max-w-7xl mx-auto">
        <ProductForm />
      </main>
    </div>
  );
}
