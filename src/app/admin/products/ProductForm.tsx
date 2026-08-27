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
import { 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Edit3, 
  ArrowLeft, 
  Trash2, 
  PlusCircle, 
  LayoutList, 
  Image as ImageIcon, 
  Info, 
  Sparkles, 
  HelpCircle, 
  Target 
} from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ProductGalleryUploader from "@/components/admin/ProductGalleryUploader";

const CATEGORY_OPTIONS = [
  { value: "LIGHTNING_PROTECTION", label: "Lightning Protection" },
  { value: "STRUCTURAL_EARTHING", label: "Structural Earthing" },
  { value: "ACCESSORIES", label: "Accessories" }
];

const productSchema = z.object({
  title: z.string().trim().min(1, "Product name is required"),
  description: z.string().trim().min(1, "Product description is required"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().trim().min(1, "Brand is required"),
  primaryApplication: z.string().trim().min(1, "Primary application is required"),
  price: z.string().optional(),
  imageUrl: z.string().min(1, "At least one product image (Main Image) is required"),
  images: z.array(z.string()).default([]),
  inStock: z.boolean().default(true),
  specifications: z
    .array(
      z.object({
        property: z.string().trim().min(1, "Property name is required"),
        value: z.string().trim().min(1, "Value is required"),
      })
    )
    .min(1, "At least one technical specification is required"),
  features: z
    .array(
      z.object({
        value: z.string().trim().min(1, "Feature point is required"),
      })
    )
    .min(1, "At least one key feature is required"),
  useCases: z
    .array(
      z.object({
        value: z.string().trim().min(1, "Application area is required"),
      })
    )
    .min(1, "At least one application area is required"),
  faqs: z
    .array(
      z.object({
        question: z.string().trim(),
        answer: z.string().trim(),
      })
    )
    .optional()
    .default([]),
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
  const effectiveIsEdit = isEdit || Boolean(initialData);

  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Helper to map DB string arrays to Form object arrays
  const mapStringArrayToForm = (arr: any, defaultSingleEmpty = false) => {
    if (Array.isArray(arr) && arr.length > 0) {
      if (typeof arr[0] === "string") return arr.map(v => ({ value: v }));
      return arr;
    }
    return defaultSingleEmpty ? [{ value: "" }] : [];
  };

  const mapSpecsToForm = (specs: any) => {
    if (Array.isArray(specs) && specs.length > 0) {
      return specs;
    }
    if (specs && typeof specs === "object") {
      return Object.entries(specs).map(([property, value]) => ({ property, value: String(value) }));
    }
    return [{ property: "", value: "" }];
  };

  const mapImagesArray = (data: any) => {
    if (Array.isArray(data?.images)) {
      return data.images.filter((img: any) => typeof img === "string" && img.trim() !== "");
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
      images: mapImagesArray(initialData),
      inStock: initialData?.inStock ?? true,
      specifications: mapSpecsToForm(initialData?.specifications),
      features: mapStringArrayToForm(initialData?.features, true),
      useCases: mapStringArrayToForm(initialData?.useCases, true),
      faqs: Array.isArray(initialData?.faqs) ? initialData.faqs : [],
    },
  });

  const { control, handleSubmit, reset, watch, setValue, formState: { errors } } = form;

  const specArray = useFieldArray({ control, name: "specifications" });
  const featArray = useFieldArray({ control, name: "features" });
  const useCaseArray = useFieldArray({ control, name: "useCases" });
  const faqArray = useFieldArray({ control, name: "faqs" });

  const watchedImageUrl = watch("imageUrl") || "";
  const watchedImages = watch("images") || [];

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
        images: mapImagesArray(initialData),
        inStock: initialData.inStock ?? true,
        specifications: mapSpecsToForm(initialData.specifications),
        features: mapStringArrayToForm(initialData.features, true),
        useCases: mapStringArrayToForm(initialData.useCases, true),
        faqs: Array.isArray(initialData.faqs) ? initialData.faqs : [],
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

      // Filter empty optional FAQ items
      const cleanFaqs = (values.faqs || []).filter(
        (f) => f.question?.trim() !== "" && f.answer?.trim() !== ""
      );

      // Clean up arrays before saving to DB
      const cleanData = {
        ...values,
        price: values.price ? parseFloat(values.price) : null,
        imageUrl: values.imageUrl,
        images: values.images || [],
        specifications: values.specifications?.filter(
          (s) => s.property?.trim() !== "" && s.value?.trim() !== ""
        ),
        features: values.features
          ?.map((f) => f.value?.trim())
          .filter((v) => v && v !== ""),
        useCases: values.useCases
          ?.map((u) => u.value?.trim())
          .filter((v) => v && v !== ""),
        faqs: cleanFaqs,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanData),
      });

      if (res.ok) {
        setSuccessMsg(effectiveIsEdit ? "Product updated successfully!" : "Product created successfully!");
        if (!effectiveIsEdit) {
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

  const SectionHeader = ({ title, desc, icon: Icon, required = false }: any) => (
    <div className="mb-4">
      <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <Icon className="w-4 h-4 text-amber-500" />
        <span>{title}</span>
        {required && <span className="text-rose-500 font-bold">*</span>}
      </h3>
      {desc && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{desc}</p>}
    </div>
  );

  return (
    <div className="w-full pb-12">
      {/* Top Header Controls */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push("/admin/products")}
            className="h-9 px-3.5 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-xs flex items-center gap-1.5 shrink-0 rounded-xl shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Button>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {readonly ? "View Product" : effectiveIsEdit ? "Edit Product" : "Add New Product"}
          </h2>
        </div>

        {onToggleReadonly && readonly && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onToggleReadonly(false)}
            className="h-9 text-xs font-semibold shrink-0 flex items-center gap-1 border-amber-500/40 text-amber-600 hover:bg-amber-500/10 rounded-xl"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </Button>
        )}
      </div>

      {successMsg && (
        <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-700 dark:text-emerald-400 text-sm font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-700 dark:text-rose-400 text-sm font-semibold flex items-center gap-2">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Single Unified Product Form Card */}
          <Card className="p-6 md:p-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm rounded-2xl space-y-8">
            
            {/* 1. Basic Information */}
            <div>
              <SectionHeader 
                title="Basic Information" 
                desc="Essential details about the product." 
                icon={Info} 
                required 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel required className="text-xs font-semibold text-slate-800 dark:text-slate-200">Product Name</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={readonly} placeholder="e.g. Pure Copper Chemical Earth Electrode" className="text-xs" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel required className="text-xs font-semibold text-slate-800 dark:text-slate-200">Category</FormLabel>
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
                      <FormLabel required className="text-xs font-semibold text-slate-800 dark:text-slate-200">Brand</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={readonly} placeholder="e.g. DFM-Safe" className="text-xs" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="primaryApplication"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel required className="text-xs font-semibold text-slate-800 dark:text-slate-200">Primary Application</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={readonly} placeholder="e.g. Substations & High Voltage Grids" className="text-xs" />
                      </FormControl>
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
                    <FormLabel required className="text-xs font-semibold text-slate-800 dark:text-slate-200">Product Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        {...field} 
                        disabled={readonly} 
                        rows={4} 
                        placeholder="Write a compelling description for this product..." 
                        className="text-xs resize-none" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 2. Product Media & Gallery */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <SectionHeader 
                title="Product Media & Gallery" 
                desc="Upload main hero photo (mandatory) and additional gallery angles." 
                icon={ImageIcon} 
                required 
              />
              <ProductGalleryUploader
                mainImage={watchedImageUrl}
                galleryImages={watchedImages}
                onMainImageChange={(url) => setValue("imageUrl", url, { shouldValidate: true })}
                onGalleryImagesChange={(urls) => setValue("images", urls, { shouldValidate: true })}
                disabled={readonly}
              />
              {errors.imageUrl && (
                <p className="text-[11px] font-semibold text-rose-500 mt-2">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>

            {/* 3. Technical Specifications */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <SectionHeader 
                title="Technical Specifications" 
                desc="Key-value pairs for technical data (e.g. Material, Diameter, Standard)." 
                icon={LayoutList} 
                required 
              />
              <div className="space-y-3 mt-4">
                {specArray.fields.map((field, index) => (
                  <div key={field.id} className="flex items-start gap-3">
                    <div className="flex-1 grid grid-cols-2 gap-3">
                      <FormField
                        control={control}
                        name={`specifications.${index}.property`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} disabled={readonly} placeholder="Property (e.g. Material)" className="text-xs" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={control}
                        name={`specifications.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input {...field} disabled={readonly} placeholder="Value (e.g. Pure Copper)" className="text-xs" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    {!readonly && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        onClick={() => specArray.remove(index)} 
                        disabled={specArray.fields.length === 1}
                        className="shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 border-slate-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                {errors.specifications && (
                  <p className="text-[11px] font-semibold text-rose-500">
                    {errors.specifications.message || "Please provide at least one valid technical specification."}
                  </p>
                )}

                {!readonly && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => specArray.append({ property: "", value: "" })} 
                    className="mt-2 text-xs font-semibold text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-100"
                  >
                    <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Specification
                  </Button>
                )}
              </div>
            </div>

            {/* 4. Key Features & Use Cases */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Key Features */}
              <div>
                <SectionHeader 
                  title="Key Features" 
                  desc="Core engineering feature points." 
                  icon={Sparkles} 
                  required 
                />
                <div className="space-y-3 mt-4">
                  {featArray.fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-3">
                      <div className="flex-1">
                        <FormField
                          control={control}
                          name={`features.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} disabled={readonly} placeholder="e.g. UL Listed and IEC 62561 compliant" className="text-xs" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {!readonly && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={() => featArray.remove(index)} 
                          disabled={featArray.fields.length === 1}
                          className="shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 border-slate-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {errors.features && (
                    <p className="text-[11px] font-semibold text-rose-500">
                      {errors.features.message || "Please provide at least one key feature."}
                    </p>
                  )}

                  {!readonly && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => featArray.append({ value: "" })} 
                      className="mt-2 text-xs font-semibold text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-100"
                    >
                      <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Feature
                    </Button>
                  )}
                </div>
              </div>

              {/* Use Cases / Applications */}
              <div>
                <SectionHeader 
                  title="Use Cases / Applications" 
                  desc="Deployment areas & installation sites." 
                  icon={Target} 
                  required 
                />
                <div className="space-y-3 mt-4">
                  {useCaseArray.fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-3">
                      <div className="flex-1">
                        <FormField
                          control={control}
                          name={`useCases.${index}.value`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} disabled={readonly} placeholder="e.g. Commercial Buildings & Substations" className="text-xs" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      {!readonly && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={() => useCaseArray.remove(index)} 
                          disabled={useCaseArray.fields.length === 1}
                          className="shrink-0 text-slate-400 hover:text-rose-500 hover:bg-rose-50 border-slate-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}

                  {errors.useCases && (
                    <p className="text-[11px] font-semibold text-rose-500">
                      {errors.useCases.message || "Please provide at least one use case / application area."}
                    </p>
                  )}

                  {!readonly && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => useCaseArray.append({ value: "" })} 
                      className="mt-2 text-xs font-semibold text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-100"
                    >
                      <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add Application
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* 5. Frequently Asked Questions (Optional) */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <SectionHeader 
                title="Frequently Asked Questions (Optional)" 
                desc="Anticipate customer queries. Leave empty if not applicable." 
                icon={HelpCircle} 
              />
              <div className="space-y-4 mt-4">
                {faqArray.fields.length === 0 ? (
                  <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 text-center">
                    <p className="text-xs text-slate-500">No FAQs added yet. (Optional section)</p>
                  </div>
                ) : (
                  faqArray.fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-3 p-4 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 rounded-xl relative">
                      <div className="flex-1 space-y-3">
                        <FormField
                          control={control}
                          name={`faqs.${index}.question`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input {...field} disabled={readonly} placeholder="Question (e.g. What is the expected service life?)" className="text-xs bg-white dark:bg-slate-900" />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={control}
                          name={`faqs.${index}.answer`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea {...field} disabled={readonly} placeholder="Answer..." className="text-xs bg-white dark:bg-slate-900 resize-none" rows={2} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      {!readonly && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => faqArray.remove(index)} 
                          className="shrink-0 text-slate-400 hover:text-rose-500 -mt-2 -mr-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))
                )}

                {!readonly && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => faqArray.append({ question: "", answer: "" })} 
                    className="mt-2 text-xs font-semibold text-amber-600 border-amber-200 bg-amber-50/50 hover:bg-amber-100"
                  >
                    <PlusCircle className="w-3.5 h-3.5 mr-1.5" /> Add FAQ
                  </Button>
                )}
              </div>
            </div>

            {/* 6. Stock Availability & Submit Actions */}
            <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
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
                    <FormLabel className="font-semibold text-slate-800 dark:text-slate-200 mb-1.5 cursor-pointer text-xs">
                      In Stock Availability
                    </FormLabel>
                  </FormItem>
                )}
              />

              {!readonly && (
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="default"
                    onClick={() => router.push("/admin/products")}
                    className="font-semibold text-xs h-10 px-5 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant="primary"
                    size="default"
                    className="font-bold text-xs h-10 px-6 bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white shadow-md rounded-xl"
                  >
                    <span>{loading ? "Saving..." : effectiveIsEdit ? "Update Product" : "Publish Product"}</span>
                    <Send className="w-4 h-4 ml-1.5" />
                  </Button>
                </div>
              )}
            </div>

          </Card>
        </form>
      </Form>
    </div>
  );
}
