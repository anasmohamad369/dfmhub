import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    slug?: string;
    title: string;
    description: string;
    price: number | null;
    category: string;
    imageUrl: string | null;
    features: any;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  let featureList: string[] = [];
  if (Array.isArray(product.features)) {
    featureList = product.features.map((f: any) => typeof f === 'string' ? f : String(f.value || f));
  } else if (typeof product.features === "string") {
    featureList = product.features.split(",").map(f => f.trim());
  }

  return (
    <Card className="overflow-hidden flex flex-col group border-slate-200 dark:border-slate-800 transition-all hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-900 bg-white dark:bg-slate-900">
      <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">
            No Image Available
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge className="bg-emerald-500/90 hover:bg-emerald-500 text-white shadow-sm backdrop-blur-sm">
            {product.category === "LIGHTNING_PROTECTION" ? "Lightning" : "Earthing"}
          </Badge>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col mt-0">
        {product.slug ? (
          <Link href={`/product/${product.slug}`} className="block">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              {product.title}
            </h3>
          </Link>
        ) : (
          <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-2 mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            {product.title}
          </h3>
        )}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
        
        {featureList.length > 0 && (
          <ul className="text-xs text-slate-500 dark:text-slate-500 space-y-1 mb-4 flex-1">
            {featureList.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-emerald-500" />
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="font-bold text-lg text-slate-900 dark:text-white">
            {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "Get Quote"}
          </span>
          <Link href="/request-quote">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-4 h-9 shadow-md shadow-emerald-500/20">
              <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
              Inquire
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
