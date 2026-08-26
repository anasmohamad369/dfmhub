import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default async function FeaturedProducts() {
  const products = await getFeaturedProducts();

  if (!products || products.length === 0) {
    return null; // Don't render section if no products
  }

  const lightningProducts = products.filter(p => p.category === "LIGHTNING_PROTECTION");
  const earthingProducts = products.filter(p => p.category === "STRUCTURAL_EARTHING");

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16 space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-400 text-sm font-semibold tracking-wide">
            <ShieldCheck className="w-4 h-4" />
            <span>Industrial Grade Solutions</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Protection Systems</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Discover our certified range of chemical earthing electrodes and advanced lightning arresters designed for critical infrastructure.
          </p>
        </div>

        <div className="mt-16 text-center">
          <Link href="/product">
            <Button variant="outline" className="rounded-full border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 gap-2 h-12 px-8 font-medium">
              View Complete Catalog
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
