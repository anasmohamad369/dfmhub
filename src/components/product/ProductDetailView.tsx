"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  CheckCircle2,
  Factory,
  HelpCircle,
  ListChecks,
  Target,
  Zap,
  Mail,
  Shield,
  Send,
  Loader2,
  AlertCircle,
  MessageCircle,
} from "lucide-react";

interface ProductDetailViewProps {
  product: any;
  relatedProducts?: any[];
}

export default function ProductDetailView({
  product,
  relatedProducts = [],
}: ProductDetailViewProps) {
  // Multi-Image Gallery State
  const [activeThumb, setActiveThumb] = useState(0);

  // Inquiry Form State
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  // Helper to parse JSON or Array
  const parseList = (data: any) => {
    if (Array.isArray(data)) return data;
    if (typeof data === "string") {
      try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  };

  // Build full gallery image list
  const galleryList: string[] = [];
  if (
    product.imageUrl &&
    typeof product.imageUrl === "string" &&
    product.imageUrl.trim() !== ""
  ) {
    galleryList.push(product.imageUrl.trim());
  }
  const extraImages = parseList(product.images);
  extraImages.forEach((img: any) => {
    if (
      typeof img === "string" &&
      img.trim() !== "" &&
      !galleryList.includes(img.trim())
    ) {
      galleryList.push(img.trim());
    }
  });

  // Specifications
  let specifications: { property: string; value: string }[] = [];
  if (Array.isArray(product.specifications)) {
    specifications = product.specifications;
  } else if (
    product.specifications &&
    typeof product.specifications === "object"
  ) {
    specifications = Object.entries(product.specifications).map(
      ([property, value]) => ({
        property,
        value: String(value),
      }),
    );
  }

  // Features
  const features = parseList(product.features).map((item: any) =>
    typeof item === "string" ? item : item?.value || String(item),
  );

  // Applications
  const useCases = parseList(product.useCases).map((item: any) =>
    typeof item === "string" ? item : item?.value || String(item),
  );

  // FAQs
  const faqs = parseList(product.faqs).filter(
    (f: any) => f?.question?.trim() && f?.answer?.trim(),
  );

  // Dynamic Tabs List
  const tabItems: { id: string; label: string }[] = [];
  if (features.length > 0) {
    tabItems.push({ id: "features", label: "Features" });
  }
  if (specifications.length > 0) {
    tabItems.push({ id: "specs", label: "Specifications" });
  }
  if (useCases.length > 0) {
    tabItems.push({ id: "apps", label: "Applications" });
  }

  const defaultTab = tabItems[0]?.id || "features";

  const isLightning = product.category === "LIGHTNING_PROTECTION";
  const categoryName = isLightning
    ? "Lightning Protection"
    : product.category === "STRUCTURAL_EARTHING"
      ? "Structural Earthing"
      : "Accessories";

  const activeImageSrc =
    galleryList[activeThumb] ||
    product.imageUrl ||
    "/products/copper_electrode.png";

  const [whatsappLink, setWhatsappLink] = useState("");

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !companyName.trim() ||
      !contactPerson.trim() ||
      !email.trim() ||
      !phone.trim()
    ) {
      setFormError("Please fill in all required fields.");
      return;
    }
    setFormError(null);
    setIsSubmitting(true);
    try {
      // 1. Save lead to dedicated Product Inquiries Database API & Trigger Automated Server-Side WhatsApp Dispatch
      const res = await fetch("/api/product-inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productTitle: product.title,
          productSlug: product.slug || "",
          category: categoryName,
          contactPerson: contactPerson.trim(),
          companyName: companyName.trim(),
          phoneNumber: phone.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to submit inquiry");
      }

      setSubmitted(true);
      setCompanyName("");
      setContactPerson("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (err: any) {
      setFormError(
        err.message || "Failed to submit quotation request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 pb-20">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-8">
        {/* Breadcrumb / Back Link */}
        <div>
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Catalog</span>
          </Link>
        </div>

        {/* 2-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left Column: Product Details & Tabs */}
          <div className="lg:col-span-8 space-y-8">
            {/* Product Overview Card */}
            <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
              <div className="grid md:grid-cols-12 gap-8 items-stretch">
                {/* Product Multi-Image Gallery */}
                <div className="md:col-span-5 flex flex-col justify-between space-y-3">
                  <div className="w-full h-48 sm:h-52 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center p-3 overflow-hidden relative group shrink-0">
                    {activeImageSrc ? (
                      <img
                        src={activeImageSrc}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="text-center text-xs text-slate-400">
                        <Shield className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                        <span>No image available</span>
                      </div>
                    )}
                  </div>

                  {/* Gallery Thumbnails */}
                  {galleryList.length > 1 && (
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {galleryList.map((imgUrl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveThumb(idx)}
                          className={`relative w-14 h-14 sm:w-14 sm:h-14 rounded-xl overflow-hidden bg-slate-50 dark:bg-slate-950/50 border-2 p-1 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                            activeThumb === idx
                              ? "border-amber-500 shadow-sm ring-2 ring-amber-500/20"
                              : "border-slate-200 dark:border-slate-800 hover:border-slate-300 opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img
                            src={imgUrl}
                            alt={`${product.title} thumb ${idx + 1}`}
                            className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Meta & Content */}
                <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                  <div className="space-y-3.5">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-block bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-semibold">
                        {categoryName}{" "}
                        {product.brand ? `| ${product.brand}` : ""}
                      </span>

                      {product.productCode && (
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900 font-mono tracking-wide">
                          Code: {product.productCode}
                        </span>
                      )}

                      {product.inStock ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-900">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          In Stock
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
                          Made to order
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                      {product.title}
                    </h1>

                    {/* Brand & Application Meta */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                      {product.brand && (
                        <div>
                          Brand:{" "}
                          <span className="font-semibold text-slate-700 dark:text-slate-200">
                            {product.brand}
                          </span>
                        </div>
                      )}

                      {product.primaryApplication && (
                        <div className="inline-flex items-center gap-1">
                          <Factory className="h-3.5 w-3.5 text-amber-500" />
                          <span>
                            Application:{" "}
                            <strong className="font-semibold text-slate-700 dark:text-slate-200">
                              {product.primaryApplication}
                            </strong>
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {product.description && (
                      <div className="pt-1">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                          Product Description
                        </h3>
                        <div className="relative">
                          <p
                            className={`text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed ${
                              !isDescExpanded ? "line-clamp-3" : ""
                            }`}
                          >
                            {product.description}
                          </p>
                          {product.description.length > 150 && (
                            <button
                              type="button"
                              onClick={() => setIsDescExpanded(!isDescExpanded)}
                              className="mt-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 hover:underline cursor-pointer inline-flex items-center gap-1"
                            >
                              {isDescExpanded ? "See less" : "...see more"}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Full-width Compliance Footer */}
              <div className="pt-4 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">
                  IS 3043 & IEC 62305 Compliant
                </span>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  Direct Manufacturer Supply
                </span>
              </div>
            </section>

            {/* Dynamic Tabs (Features, Specifications, Applications) */}
            {tabItems.length > 0 && (
              <section className="rounded-2xl min-h-[350px] border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-6">
                <Tabs defaultValue={defaultTab} className="w-full border-none">
                  <TabsList className="w-full h-12 justify-start gap-0 rounded-none border-b border-slate-200 bg-transparent p-0">
                    {tabItems.map((tab) => (
                      <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="
        relative h-full rounded-none border-0 bg-transparent
        px-5  text-slate-500
        shadow-none
        hover:text-[#d97706]
        data-[state=active]:text-[#d97706]
        data-[state=active]:shadow-none
        data-[state=active]:text-md
        after:absolute
        after:translate-y-1
        after:bottom-0
        after:left-0
        after:right-0
        after:h-[2px]
        after:bg-transparent
        after:content-['']

        data-[state=active]:after:bg-[#d97706]
      "
                      >
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {/* Features Tab */}
                  {features.length > 0 && (
                    <TabsContent value="features" className="pt-4 mt-0">
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {features.map((feature: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 text-xs"
                          >
                            <CheckCircle2 className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                            <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  )}

                  {/* Specifications Tab */}
                  {specifications.length > 0 && (
                    <TabsContent value="specs" className="pt-4 mt-0">
                      <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
                        <table className="w-full text-left text-sm border-collapse">
                          <tbody>
                            {specifications.map((spec: any, idx: number) => (
                              <tr
                                key={idx}
                                className={`border-b border-slate-200/80 last:border-0 dark:border-slate-800 transition-colors ${
                                  idx % 2 === 0
                                    ? "bg-slate-50/70 dark:bg-slate-950/40"
                                    : "bg-white dark:bg-slate-900"
                                }`}
                              >
                                <td className="w-2/5 sm:w-1/3 px-5 py-3.5 sm:px-6 sm:py-4 font-semibold text-slate-600 dark:text-slate-300">
                                  {spec.property}
                                </td>
                                <td className="px-5 py-3.5 sm:px-6 sm:py-4 font-medium text-slate-900 dark:text-slate-100">
                                  {spec.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </TabsContent>
                  )}

                  {/* Applications Tab */}
                  {useCases.length > 0 && (
                    <TabsContent value="apps" className="pt-4 mt-0">
                      <ul className="grid gap-3 sm:grid-cols-2">
                        {useCases.map((useCase: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 text-xs"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                              <Zap className="h-3.5 w-3.5" />
                            </div>
                            <span className="text-slate-700 dark:text-slate-300 font-medium">
                              {useCase}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  )}
                </Tabs>
              </section>
            )}

            {/* Frequently Asked Questions (Accordion) */}
            {faqs.length > 0 && (
              <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 px-5 py-1">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq: any, index: number) => (
                      <AccordionItem
                        key={index}
                        value={`faq-${index}`}
                        className="border-b border-slate-200/70 last:border-0 dark:border-slate-800"
                      >
                        <AccordionTrigger className="py-3.5 text-left text-xs sm:text-sm font-semibold text-slate-800 hover:no-underline hover:text-amber-600 dark:text-slate-200 dark:hover:text-amber-400">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Inquiry / Quotation Form (earthing_mart UI) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-7 shadow-lg border border-slate-200/90 dark:border-slate-800 border-t-4 border-t-amber-500">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mb-1.5">
                Get Price Quotation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                Submit this professional inquiry form to receive technical
                details, dwg drawings, and a pricing quote directly from the
                manufacturer.
              </p>

              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      Quotation Request Submitted!
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      Your inquiry for <strong className="text-slate-900 dark:text-white">{product.title}</strong> has been received and automatically dispatched to our sales and technical team via WhatsApp & Admin Console.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="w-full text-xs font-semibold rounded-xl"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="companyName"
                      className="normal-case text-xs font-semibold tracking-normal text-slate-800 dark:text-slate-200"
                    >
                      Company Name{" "}
                      <span className="text-rose-500 font-bold">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Adani Solar / L&T"
                      required
                      className="py-2.5 text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="contactPerson"
                      className="normal-case text-xs font-semibold tracking-normal text-slate-800 dark:text-slate-200"
                    >
                      Contact Person{" "}
                      <span className="text-rose-500 font-bold">*</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      required
                      className="py-2.5 text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="workEmail"
                      className="normal-case text-xs font-semibold tracking-normal text-slate-800 dark:text-slate-200"
                    >
                      Work Email{" "}
                      <span className="text-rose-500 font-bold">*</span>
                    </Label>
                    <Input
                      id="workEmail"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rajesh@company.com"
                      required
                      className="py-2.5 text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="mobileNumber"
                      className="normal-case text-xs font-semibold tracking-normal text-slate-800 dark:text-slate-200"
                    >
                      Mobile Number{" "}
                      <span className="text-rose-500 font-bold">*</span>
                    </Label>
                    <Input
                      id="mobileNumber"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98200 12345"
                      required
                      className="py-2.5 text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="projectRequirement"
                      className="normal-case text-xs font-semibold tracking-normal text-slate-800 dark:text-slate-200"
                    >
                      Project Requirement{" "}
                      <span className="text-slate-400 font-normal">
                        (Optional)
                      </span>
                    </Label>
                    <Textarea
                      id="projectRequirement"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify size, soil conditions, testing needs, quantity..."
                      className="text-xs min-h-[90px] py-2.5 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 mt-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </Button>

                  <p className="text-[11px] text-center text-slate-400 pt-1">
                    Your data is secure and will only be shared with verified
                    distributors.
                  </p>
                </form>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
