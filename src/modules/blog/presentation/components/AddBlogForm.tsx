"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogSchema, BlogFormValues, CATEGORY_OPTIONS } from "../../domain/validation/blog.schema";
import { BlogRecord } from "../../domain/entities/blog.entity";
import { useCreateBlogMutation, useUpdateBlogMutation } from "../../application/use-cases/useBlogQueries";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle2, AlertCircle, Send, Edit3, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import ImageUploader from "@/components/ImageUploader";

export interface AddBlogFormProps {
  initialData?: BlogRecord;
  isEdit?: boolean;
  readonly?: boolean;
  onSuccessCallback?: () => void;
  onToggleReadonly?: (newReadonlyState: boolean) => void;
}

export default function AddBlogForm({
  initialData,
  isEdit = false,
  readonly = false,
  onSuccessCallback,
  onToggleReadonly,
}: AddBlogFormProps) {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const createBlogMutation = useCreateBlogMutation();
  const updateBlogMutation = useUpdateBlogMutation();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema) as any,
    defaultValues: {
      title: initialData?.title || "",
      slug: initialData?.slug || "",
      category: initialData?.category || "LIGHTNING_PROTECTION",
      readTime: initialData?.readTime || "5 MIN READ",
      summary: initialData?.summary || "",
      content: initialData?.content || "",
      imageUrl: initialData?.imageUrl || "",
      author: initialData?.author || "DFMHUB Engineering Team",
    },
  });

  // Re-sync form default values if initialData changes
  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title || "",
        slug: initialData.slug || "",
        category: initialData.category || "LIGHTNING_PROTECTION",
        readTime: initialData.readTime || "5 MIN READ",
        summary: initialData.summary || "",
        content: initialData.content || "",
        imageUrl: initialData.imageUrl || "",
        author: initialData.author || "DFMHUB Engineering Team",
      });
    }
  }, [initialData, form]);

  const isSubmitting = createBlogMutation.isPending || updateBlogMutation.isPending;

  const onSubmit = async (values: BlogFormValues) => {
    if (readonly) return;
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      if (isEdit && initialData?.id) {
        await updateBlogMutation.mutateAsync({
          id: initialData.id,
          ...values,
        });
        setSuccessMsg("Blog post updated successfully!");
        setTimeout(() => {
          router.push("/admin/blogs/editor");
        }, 1000);
      } else {
        await createBlogMutation.mutateAsync(values);
        setSuccessMsg("Blog post published successfully!");
        form.reset({
          title: "",
          slug: "",
          category: "LIGHTNING_PROTECTION",
          readTime: "5 MIN READ",
          summary: "",
          content: "",
          author: "DFMHUB Engineering Team",
        });
        if (onSuccessCallback) {
          setTimeout(() => {
            onSuccessCallback();
          }, 1000);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save blog post.");
    }
  };

  return (
    <Card className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
      {/* Minimal Top Header */}
      <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          {/* Clearly Visible Back Button */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin")}
            className="h-9 px-3 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 font-semibold text-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-slate-700 dark:text-slate-200" />
            <span>Back</span>
          </Button>

          <h2 className="text-base font-semibold text-slate-900 dark:text-white tracking-tight">
            {readonly ? "View Blog" : isEdit ? "Edit Blog" : "Create Blog"}
          </h2>
        </div>

        {/* Toggle Mode Button */}
        {onToggleReadonly && readonly && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onToggleReadonly(false)}
            className="h-9 text-xs font-semibold shrink-0 flex items-center gap-1 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </Button>
        )}
      </div>

      {/* Success Alert */}
      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-700 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Category Dropdown */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel required className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Blog Category
                </FormLabel>
                <FormControl>
                  <div className="w-full">
                    <Select
                      value={field.value}
                      onChange={readonly ? () => {} : field.onChange}
                      options={CATEGORY_OPTIONS.map((cat) => ({
                        value: cat.value,
                        label: cat.label,
                        badgeClass: cat.badgeClass,
                      }))}
                      placeholder="Select Category..."
                      className={`w-full text-xs ${readonly ? "pointer-events-none opacity-80" : ""}`}
                      align="left"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Article Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel required className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Article Title
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={readonly}
                    placeholder="Enter article title..."
                    className="text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Custom URL Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Custom URL Slug
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={readonly}
                      placeholder="Custom slug (optional)..."
                      className="text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Estimated Read Time */}
            <FormField
              control={form.control}
              name="readTime"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Read Time
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={readonly}
                      placeholder="e.g. 5 MIN READ"
                      className="text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Cover / Banner Image Uploader */}
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Featured Cover Image (Optional)
                </FormLabel>
                <FormControl>
                  <ImageUploader
                    label="Upload Article Cover Image"
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={readonly}
                    description="Upload a high-quality banner image for this blog post."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Short Summary */}
          <FormField
            control={form.control}
            name="summary"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel required className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Short Summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={readonly}
                    rows={3}
                    placeholder="Brief article summary..."
                    className="text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Full Article Content */}
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel required className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Full Article Content
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    disabled={readonly}
                    rows={8}
                    placeholder="Full article content..."
                    className="min-h-[160px] text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Author Name */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Author / Engineering Team
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={readonly}
                    placeholder="e.g. DFMHUB Technical Team"
                    className="text-xs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Action */}
          {!readonly && (
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="primary"
                size="sm"
                className="w-full sm:w-auto font-semibold text-xs h-9 px-4"
              >
                <span>
                  {isSubmitting
                    ? isEdit
                      ? "Saving Changes..."
                      : "Publishing..."
                    : isEdit
                    ? "Update Blog Post"
                    : "Publish Blog Post"}
                </span>
                <Send className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          )}
        </form>
      </Form>
    </Card>
  );
}
