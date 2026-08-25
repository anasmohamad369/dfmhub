"use client";

import { useState, useEffect, useMemo } from "react";
import { DataTable } from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Edit3, Trash2, Sparkles, PlusCircle, Search, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";

const CATEGORY_OPTIONS = [
  { value: "LIGHTNING_PROTECTION", label: "Lightning Protection" },
  { value: "STRUCTURAL_EARTHING", label: "Structural Earthing" },
  { value: "ACCESSORIES", label: "Accessories" }
];

export default function ProductsClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [deleteProductInfo, setDeleteProductInfo] = useState<{ id: string; title: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = (id: string, title: string) => {
    setDeleteProductInfo({ id, title });
  };

  const confirmDelete = async () => {
    if (!deleteProductInfo) return;
    setIsDeleting(true);
    try {
      await fetch(`/api/products/${deleteProductInfo.id}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== deleteProductInfo.id));
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      setDeleteProductInfo(null);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "ALL" || product.category === selectedCategory;

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        q === "" ||
        product.title.toLowerCase().includes(q) ||
        (product.description && product.description.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const getCategoryBadge = (catKey: string) => {
    const found = CATEGORY_OPTIONS.find((c) => c.value === catKey);
    const label = found ? found.label : catKey.replace("_", " ");
    return (
      <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border whitespace-nowrap inline-block bg-slate-500/10 text-slate-600 border-slate-500/30 dark:text-slate-300">
        {label}
      </span>
    );
  };

  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Product Title",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            {row.original.imageUrl ? (
              <img src={row.original.imageUrl} alt="Product" className="w-10 h-10 object-cover rounded-md border border-slate-200 dark:border-slate-800" />
            ) : (
              <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[9px] text-slate-400 text-center leading-tight">No img</div>
            )}
            <div
              className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-snug truncate max-w-[200px] sm:max-w-[260px]"
              title={row.original.title}
            >
              {row.original.title}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <div className="whitespace-nowrap">
            {getCategoryBadge(row.original.category)}
          </div>
        ),
      },
      {
        accessorKey: "brand",
        header: "Brand",
        cell: ({ row }) => (
          <div className="text-sm text-slate-700 dark:text-slate-300">
            {row.original.brand || "-"}
          </div>
        ),
      },

      {
        accessorKey: "inStock",
        header: "Status",
        cell: ({ row }) => (
          <div>
            {row.original.inStock ? (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 dark:text-emerald-400">
                In Stock
              </span>
            ) : (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide bg-rose-500/10 text-rose-600 border border-rose-500/20 dark:text-rose-400">
                Out of Stock
              </span>
            )}
          </div>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Added On",
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
            <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>
              {new Date(row.original.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        ),
      },
      {
        id: "actions",
        header: () => <div className="text-right whitespace-nowrap">Actions</div>,
        cell: ({ row }) => {
          const product = row.original;
          return (
            <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
              <Link
                href={`/admin/products/edit/${product.id}`}
                className="px-2.5 py-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors rounded-lg border border-amber-500/20 inline-flex items-center gap-1 text-xs font-semibold"
                title="Edit product"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </Link>
              <button
                onClick={() => deleteProduct(product.id, product.title)}
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-500/10 cursor-pointer border border-transparent"
                title="Delete Product"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const table = useReactTable({
    data: filteredProducts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <Card className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 rounded-2xl backdrop-blur-md">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>Product Management Database</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64 text-xs"
          />

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => window.location.href = "/admin/products/new"}
            className="h-9 px-4 font-semibold text-xs shrink-0 flex items-center gap-1.5 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add Product</span>
          </Button>
        </div>
      </Card>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory("ALL")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
            selectedCategory === "ALL"
              ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
              : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
          }`}
        >
          All Categories
        </button>

        {CATEGORY_OPTIONS.map((cat) => {
          const isSelected = selectedCategory === cat.value;
          return (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                isSelected
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 font-semibold"
                  : "bg-slate-100 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      <DataTable table={table} isLoading={loading} emptyText="No products found." />

      <Dialog open={!!deleteProductInfo} onOpenChange={(open) => !open && setDeleteProductInfo(null)}>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogClose onClose={() => setDeleteProductInfo(null)} />
        </DialogHeader>
        
        <DialogContent>
          <DialogDescription className="text-sm">
            Are you sure you want to delete <span className="font-semibold text-slate-900 dark:text-slate-100">"{deleteProductInfo?.title}"</span>? This action cannot be undone.
          </DialogDescription>
        </DialogContent>
        
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setDeleteProductInfo(null)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="bg-rose-600 hover:bg-rose-700 text-white"
            onClick={confirmDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
