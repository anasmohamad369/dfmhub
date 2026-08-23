"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
} from "@tanstack/react-table";
import { useBlogsQuery, useDeleteBlogMutation } from "../../application/use-cases/useBlogQueries";
import { BlogRecord } from "../../domain/entities/blog.entity";
import { CATEGORY_OPTIONS } from "../../domain/validation/blog.schema";
import { DataTable } from "@/components/DataTable";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  PlusCircle,
  Search,
  Trash2,
  ExternalLink,
  BookOpen,
  Calendar,
  Eye,
  Edit3,
} from "lucide-react";

export default function AdminBlogManager() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: blogs = [], isLoading, isError } = useBlogsQuery("ALL");
  const deleteMutation = useDeleteBlogMutation();

  const filteredBlogs = useMemo(() => {
    const normalizeCat = (c?: string) =>
      (c || "").toUpperCase().trim().replace(/\s+/g, "_");

    const targetCat = normalizeCat(selectedCategory);

    return blogs.filter((blog) => {
      const blogCat = normalizeCat(blog.category);
      const matchesCategory =
        selectedCategory === "ALL" ||
        blogCat === targetCat ||
        (targetCat === "STRUCTURAL_EARTHING" && blogCat === "EARTHING");

      const matchesSearch =
        searchQuery.trim() === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.slug.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the blog post "${title}"?`)) {
      try {
        await deleteMutation.mutateAsync(id);
      } catch (err: any) {
        alert(err.message || "Failed to delete blog post.");
      }
    }
  };

  const getCategoryBadge = (catKey: string) => {
    const found = CATEGORY_OPTIONS.find((c) => c.value === catKey);
    const label = found ? found.label : catKey.replace("_", " ");
    const badgeClass = found
      ? found.badgeClass
      : "bg-slate-500/10 text-slate-600 border border-slate-500/30 dark:text-slate-300";

    return (
      <span
        className={`px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider border whitespace-nowrap inline-block ${badgeClass}`}
      >
        {label}
      </span>
    );
  };

  // TanStack Table Column Definitions
  const columns = useMemo<ColumnDef<BlogRecord>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Article Title",
        cell: ({ row }) => (
          <div
            className="font-semibold text-slate-900 dark:text-slate-100 text-sm leading-snug truncate max-w-[260px] sm:max-w-[320px] lg:max-w-[400px]"
            title={row.original.title}
          >
            {row.original.title}
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
        accessorKey: "readTime",
        header: "Read Time",
        cell: ({ row }) => (
          <span className="text-xs text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
            {row.original.readTime}
          </span>
        ),
      },
      {
        accessorKey: "createdAt",
        header: "Date Created",
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
          const blog = row.original;
          return (
            <div className="flex items-center justify-end gap-1.5 whitespace-nowrap">
              <Link
                href={`/admin/blogs/view/${blog.slug}`}
                className="px-2.5 py-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors rounded-lg border border-blue-500/20 inline-flex items-center gap-1 text-xs font-semibold"
                title="View post details"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">View</span>
              </Link>

              <Link
                href={`/admin/blogs/edit/${blog.slug}`}
                className="px-2.5 py-1.5 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors rounded-lg border border-amber-500/20 inline-flex items-center gap-1 text-xs font-semibold"
                title="Edit post"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Edit</span>
              </Link>

              <Link
                href={`/blog/${blog.slug}`}
                target="_blank"
                className="p-1.5 text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-emerald-500/10"
                title="View on live website"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => handleDelete(blog.id, blog.title)}
                disabled={deleteMutation.isPending}
                className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-rose-500/10 cursor-pointer"
                title="Delete Post"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [deleteMutation.isPending]
  );

  // TanStack Table Instance for Blog Posts with Pagination
  const blogTable = useReactTable({
    data: filteredBlogs,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
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
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span>Blog Post Management Database</span>
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input
            placeholder="Search title, keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="w-full sm:w-64 text-xs"
          />

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => router.push("/admin/blogs/create")}
            className="h-9 px-4 font-semibold text-xs shrink-0 flex items-center gap-1.5 whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Post</span>
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

      {/* Blogs Data Table with Pagination */}
      <DataTable
        table={blogTable}
        isLoading={isLoading}
        loadingText="Loading blogs..."
        emptyText="No blog posts found for this filter."
      />
    </div>
  );
}
