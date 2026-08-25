"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { CheckCircle2, AlertCircle, Send, Edit3, ArrowLeft, Trash2, PlusCircle, LayoutList, Image as ImageIcon, Info, Sparkles, HelpCircle, Target } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "@/components/ImageUploader";

const CATEGORY_OPTIONS = [
  { value: "LIGHTNING_PROTECTION", label: "Lightning Protection" },
  { value: "STRUCTURAL_EARTHING", label: "Structural Earthing" },
  { value: "ACCESSORIES", label: "Accessories" }
];

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.string(),
  brand: z.string().optional(),
  primaryApplication: z.string().optional(),
  price: z.string().optional(),
  imageUrl: z.string().optional(),
  inStock: z.boolean().default(true),
  specifications: z.array(z.object({ property: z.string(), value: z.string() })).optional(),
  features: z.array(z.object({ value: z.string() })).optional(),
  useCases: z.array(z.object({ value: z.string() })).optional(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
});

type ProductFormValues = z.input<typeof productSchema>;

export interface ProductFormProps {
  initialData?: any;
  isEdit?: boolean;
  readonly?: boolean;
  onToggleReadonly?: (newReadonlyState: boolean) => void;
}

export default function ProductForm({
  initialData,
  isEdit = false,
  readonly = false,
  onToggleReadonly,
}: ProductFormProps) {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Helper to map DB string arrays to Form object arrays
  const mapStringArrayToForm = (arr: any) => {
    if (Array.isArray(arr)) {
      if (typeof arr[0] === "string") return arr.map(v => ({ value: v }));
      return arr;
    }
    return [];
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      category: initialData?.category || "LIGHTNING_PROTECTION",
      brand: initialData?.brand || "",
      primaryApplication: initialData?.primaryApplication || "",
      price: initialData?.price ? String(initialData.price) : "",
      imageUrl: initialData?.imageUrl || "",
      inStock: initialData?.inStock ?? true,
      specifications: initialData?.specifications || [],
      features: mapStringArrayToForm(initialData?.features),
      useCases: mapStringArrayToForm(initialData?.useCases),
      faqs: initialData?.faqs || [],
    },
  });

  const { control, handleSubmit, reset } = form;

  const specArray = useFieldArray({ control, name: "specifications" });
  const featArray = useFieldArray({ control, name: "features" });
  const useCaseArray = useFieldArray({ control, name: "useCases" });
  const faqArray = useFieldArray({ control, name: "faqs" });

  useEffect(() => {
    if (initialData) {
      reset({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "LIGHTNING_PROTECTION",
        brand: initialData.brand || "",
        primaryApplication: initialData.primaryApplication || "",
        price: initialData.price ? String(initialData.price) : "",
        imageUrl: initialData.imageUrl || "",
        inStock: initialData.inStock ?? true,
        specifications: initialData.specifications || [],
        features: mapStringArrayToForm(initialData.features),
        useCases: mapStringArrayToForm(initialData.useCases),
        faqs: initialData.faqs || [],
      });
    }
  }, [initialData, reset]);

  const onSubmit = async (values: ProductFormValues) => {
    if (readonly) return;
    setSuccessMsg(null);
    setErrorMsg(null);
    setLoading(true);

    try {
      const url = initialData ? `/api/products/${initialData.id}` : "/api/products";
      const method = initialData ? "PUT" : "POST";

      // Clean up arrays before saving to DB
      const cleanData = {
        ...values,
        price: values.price ? parseFloat(values.price) : null,
        features: values.features?.map(f => f.value).filter(v => v.trim() !== ""),
        useCases: values.useCases?.map(u => u.value).filter(v => v.trim() !== ""),
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });

      if (res.ok) {
        setSuccessMsg(isEdit ? "Product updated successfully!" : "Product created successfully!");
        if (!isEdit) {
          reset();
        }
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 1000);
      } else {
        const error = await res.json();
        setErrorMsg(error.error || "Failed to save product");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const SectionHeader = ({ title, desc, icon: Icon }: any) => (
    <div className="mb-4">
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <Icon className="w-4 h-4 text-amber-500" />
        {title}
      </h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{desc}</p>
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Minimal Top Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/products")}
            className="h-9 px-3 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 bg-white hover:bg-slate-50 font-semibold text-xs flex items-center gap-1.5 shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {readonly ? "View Product" : isEdit ? "Edit Product" : "Create Product"}
          </h2>
        </div>

        {onToggleReadonly && readonly && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onToggleReadonly(false)}
            className="h-9 text-xs font-semibold shrink-0 flex items-center gap-1 border-amber-500/40 text-amber-600 hover:bg-amber-500/10"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </Button>
        )}
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-700 text-sm font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 shadow-sm rounded-2xl">
            <SectionHeader title="Basic Information" desc="Essential details about the product." icon={Info} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel required className="text-xs font-semibold text-slate-800">Product Name</FormLabel>
                    <FormControl><Input {...field} disabled={readonly} placeholder="e.g. Pure Copper Chemical Earth Electrode" className="text-xs" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel required className="text-xs font-semibold text-slate-800">Category</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onChange={readonly ? () => { } : field.onChange}
                        options={CATEGORY_OPTIONS}
                        placeholder="Select Category..."
                        className={`w-full h-10 text-xs ${readonly ? "pointer-events-none opacity-80" : ""}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <FormField
                control={control}
                name="brand"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-semibold text-slate-800">Brand</FormLabel>
                    <FormControl><Input {...field} disabled={readonly} placeholder="e.g. DFM-Safe" className="text-xs" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="primaryApplication"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-xs font-semibold text-slate-800">Primary Application</FormLabel>
                    <FormControl><Input {...field} disabled={readonly} placeholder="e.g. Substations & High Voltage Grids" className="text-xs" /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel required className="text-xs font-semibold text-slate-800">Product Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={readonly} rows={4} placeholder="Write a compelling description for this product..." className="text-xs resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 shadow-sm rounded-2xl">
            <SectionHeader title="Product Media" desc="Main image for the catalog." icon={ImageIcon} />
            <FormField
              control={control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ImageUploader
                      label="Product Image"
                      value={field.value || ""}
                      onChange={field.onChange}
                      disabled={readonly}
                      description="SVG, PNG, JPG or GIF (max. 5MB)"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 shadow-sm rounded-2xl">
            <div className="flex items-start justify-between mb-2">
              <SectionHeader title="Technical Specifications" desc="Key-value pairs for technical data." icon={LayoutList} />
            </div>
            <div className="space-y-3 mt-4">
              {specArray.fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-3">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <FormField
                      control={control}
                      name={`specifications.${index}.property`}
                      render={({ field }) => (
                        <FormItem><FormControl><Input {...field} disabled={readonly} placeholder="Property (e.g. Material)" className="text-xs" /></FormControl></FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`specifications.${index}.value`}
                      render={({ field }) => (
                        <FormItem><FormControl><Input {...field} disabled={readonly} placeholder="Value (e.g. Pure Copper)" className="text-xs" /></FormControl></FormItem>
                      )}
                    />
                  </div>
                  {!readonly && (
                    <Button type="button" variant="outline" size="icon" onClick={() => specArray.remove(index)} className="shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 border-slate-200">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {!readonly && (
                <Button type="button" variant="outline" size="sm" onClick={() => specArray.append({ property: "", value: "" })} className="mt-2 text-xs font-semibold text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-100">
                  <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Specification
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 shadow-sm rounded-2xl">
            <div className="flex items-start justify-between mb-2">
              <SectionHeader title="Key Features" desc="Add a feature point" icon={Sparkles} />
            </div>
            <div className="space-y-3 mt-4">
              {featArray.fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-3">
                  <div className="flex-1">
                    <FormField
                      control={control}
                      name={`features.${index}.value`}
                      render={({ field }) => (
                        <FormItem><FormControl><Input {...field} disabled={readonly} placeholder="e.g. UL Listed and IEC 62561 compliant" className="text-xs" /></FormControl></FormItem>
                      )}
                    />
                  </div>
                  {!readonly && (
                    <Button type="button" variant="outline" size="icon" onClick={() => featArray.remove(index)} className="shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 border-slate-200">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {!readonly && (
                <Button type="button" variant="outline" size="sm" onClick={() => featArray.append({ value: "" })} className="mt-2 text-xs font-semibold text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-100">
                  <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Feature
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 shadow-sm rounded-2xl">
            <div className="flex items-start justify-between mb-2">
              <SectionHeader title="Use Cases / Applications" desc="Add an application area" icon={Target} />
            </div>
            <div className="space-y-3 mt-4">
              {useCaseArray.fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-3">
                  <div className="flex-1">
                    <FormField
                      control={control}
                      name={`useCases.${index}.value`}
                      render={({ field }) => (
                        <FormItem><FormControl><Input {...field} disabled={readonly} placeholder="e.g. Commercial Buildings" className="text-xs" /></FormControl></FormItem>
                      )}
                    />
                  </div>
                  {!readonly && (
                    <Button type="button" variant="outline" size="icon" onClick={() => useCaseArray.remove(index)} className="shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 border-slate-200">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {!readonly && (
                <Button type="button" variant="outline" size="sm" onClick={() => useCaseArray.append({ value: "" })} className="mt-2 text-xs font-semibold text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-100">
                  <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Application
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 shadow-sm rounded-2xl">
            <div className="flex items-start justify-between mb-2">
              <SectionHeader title="Frequently Asked Questions" desc="Anticipate customer queries." icon={HelpCircle} />
            </div>
            <div className="space-y-4 mt-4">
              {faqArray.fields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-3 p-4 border border-slate-100 bg-slate-50 rounded-xl relative">
                  <div className="flex-1 space-y-3">
                    <FormField
                      control={control}
                      name={`faqs.${index}.question`}
                      render={({ field }) => (
                        <FormItem><FormControl><Input {...field} disabled={readonly} placeholder="Question" className="text-xs bg-white" /></FormControl></FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`faqs.${index}.answer`}
                      render={({ field }) => (
                        <FormItem><FormControl><Textarea {...field} disabled={readonly} placeholder="Answer" className="text-xs bg-white resize-none" rows={2} /></FormControl></FormItem>
                      )}
                    />
                  </div>
                  {!readonly && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => faqArray.remove(index)} className="shrink-0 text-slate-400 hover:text-rose-500 -mt-2 -mr-2">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              {!readonly && (
                <Button type="button" variant="outline" size="sm" onClick={() => faqArray.append({ question: "", answer: "" })} className="mt-2 text-xs font-semibold text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-100">
                  <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add FAQ
                </Button>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 shadow-sm rounded-2xl flex items-center justify-between">
            <FormField
              control={control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormControl>
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={field.onChange}
                      disabled={readonly}
                      className="w-4 h-4 block rounded border-slate-300 text-amber-600 focus:ring-amber-600 cursor-pointer"
                    />
                  </FormControl>
                  <FormLabel className="font-semibold text-slate-800 mb-1.5 cursor-pointer">
                    In Stock Availability
                  </FormLabel>
                </FormItem>
              )}
            />

            {!readonly && (
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
                size="default"
                className="font-bold text-xs h-10 px-6 bg-slate-900 hover:bg-slate-800 text-white shadow-md rounded-xl"
              >
                <span>{loading ? "Saving..." : isEdit ? "Update Product" : "Publish Product"}</span>
                <Send className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </Card>
        </form>
      </Form>
    </div>
  );
}
