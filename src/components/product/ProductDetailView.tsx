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
  Maximize2,
  X,
  FileText,
  Clock,
  Truck,
  Award,
  PhoneCall,
  Check,
  Layers,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { getProductUrl } from "@/lib/products";
import { RichDescription, stripHtml } from "@/components/product/RichDescription";

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
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Inquiry Form State
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setIsSubmitting(true);

    try {
      const payload = {
        productTitle: product.title,
        productCode: product.productCode || "",
        companyName,
        contactPerson,
        email,
        phone,
        message,
        source: "PRODUCT_PAGE",
        category: categoryName,
      };

      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const errorData = await res.json();
        setFormError(
          errorData.error || "Failed to submit quotation request. Please try again.",
        );
      }
    } catch (err: any) {
      setFormError(
        err.message || "Failed to submit quotation request. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const canonicalPath = getProductUrl(product);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfmhub.com";
  const currentProductUrl = `${baseUrl}${canonicalPath}`;

  const whatsappMessage = `*PRODUCT INQUIRY — DFMHUB* ⚡\n\n*Product:* ${product.title}\n*Code:* ${product.productCode || "N/A"}\n*Category:* ${categoryName}\n${product.brand ? `*Brand:* ${product.brand}\n` : ""}${product.primaryApplication ? `*Application:* ${product.primaryApplication}\n` : ""}\n*Product Page:* ${currentProductUrl}\n\nHello DFMHUB Team, I would like to get technical details, datasheets, and pricing quotation for this product.`;

  const whatsappProductUrl = `https://wa.me/919483564777?text=${encodeURIComponent(whatsappMessage)}`;

  const scrollToQuote = () => {
    const el = document.getElementById("quote-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-[#060b13] pb-24 font-poppins">
      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activeImageSrc}
            alt={product.title}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-12 space-y-8">
        {/* Breadcrumb Bar */}
        <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500 dark:text-slate-400 flex-wrap gap-y-1">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <Link href="/product" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Products
          </Link>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <Link
            href={`/product?category=${product.category}`}
            className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
          >
            {categoryName}
          </Link>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[280px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* ========================================================================= */}
        {/* 1. HERO SHOWCASE CARD: Big Gallery (Left) + Executive Overview & Action (Right) */}
        {/* ========================================================================= */}
        <section className="rounded-3xl border border-slate-200/90 bg-white dark:border-slate-800/90 dark:bg-slate-900/90 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10 items-start">
            
            {/* Left Column: Premium Large Image Showcase */}
            <div className="lg:col-span-6 flex flex-col space-y-4">
              <div className="relative w-full aspect-[4/3] sm:aspect-square max-h-[480px] rounded-2xl bg-gradient-to-b from-slate-50 via-white to-slate-100/60 dark:from-slate-950/80 dark:via-slate-900 dark:to-slate-950 border border-slate-200/80 dark:border-slate-800 flex items-center justify-center p-6 sm:p-10 overflow-hidden group shadow-inner">
                
                {/* Floating Top Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md shadow-xs ${
                      isLightning
                        ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30"
                        : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30"
                    }`}
                  >
                    {isLightning ? (
                      <Zap className="w-3.5 h-3.5 mr-1 text-amber-500 fill-amber-500/20" />
                    ) : (
                      <Shield className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                    )}
                    <span>{categoryName}</span>
                  </Badge>

                  {product.productCode && (
                    <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-900/80 text-white dark:bg-slate-800 dark:text-slate-200 rounded-full backdrop-blur-md shadow-xs border border-white/10">
                      {product.productCode}
                    </span>
                  )}
                </div>

                {/* Stock Status Top Right */}
                <div className="absolute top-4 right-4 z-10">
                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 backdrop-blur-md shadow-xs">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>IN STOCK</span>
                    </span>
                  ) : (
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-semibold px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 backdrop-blur-md">
                      Made to Order
                    </span>
                  )}
                </div>

                {/* Main Product Hero Image */}
                {activeImageSrc ? (
                  <img
                    src={activeImageSrc}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="text-center text-xs text-slate-400 space-y-2">
                    <Shield className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
                    <span>No image available</span>
                  </div>
                )}

                {/* Lightbox Zoom Button */}
                {activeImageSrc && (
                  <button
                    type="button"
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 shadow-md border border-slate-200/80 dark:border-slate-700 hover:bg-amber-500 hover:text-white dark:hover:bg-amber-500 dark:hover:text-white transition-all cursor-pointer group-hover:opacity-100 sm:opacity-80"
                    title="Click to view full size"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Thumbnails Strip */}
              {galleryList.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {galleryList.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveThumb(idx)}
                      className={`relative w-16 h-16 rounded-xl overflow-hidden bg-white dark:bg-slate-900 border-2 p-1.5 flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                        activeThumb === idx
                          ? "border-amber-500 shadow-md ring-2 ring-amber-500/30 scale-102"
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

              {/* Quick Assurance Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <Award className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>IS 3043 / IEC 62305</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <Factory className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Direct OEM Supply</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Pan-India Dispatch</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/80 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Inspected</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Metadata, Quick Specs & CTAs */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Brand & Application Eyebrow */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {product.brand && (
                    <span className="px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80">
                      Brand: {product.brand}
                    </span>
                  )}
                  {product.primaryApplication && (
                    <span className="inline-flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <Factory className="w-3.5 h-3.5 text-amber-500" />
                      <span>{product.primaryApplication}</span>
                    </span>
                  )}
                </div>

                {/* Main Product Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-3xl font-medium  tracking-tight text-slate-900 dark:text-white leading-[1.2]">
                  {product.title}
                </h1>

                {/* Sub-header Highlight Box */}
                <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-1">
                  <div className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Engineered Lightning & Earthing Component</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-[13px]">
                    Manufactured to strict industrial standards for commercial, solar EPC, substation, and industrial infrastructure installations.
                  </p>
                </div>

                {/* 4 Quick At-a-Glance Specification Tiles */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 space-y-0.5">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Manufacturer</span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {product.brand || "ARK Make"} / DFMHUB
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 space-y-0.5">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Product Code</span>
                    <p className="text-xs sm:text-sm font-mono font-bold text-amber-600 dark:text-amber-400 truncate">
                      {product.productCode || "N/A"}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 space-y-0.5">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Application</span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {product.primaryApplication || "External Lightning Protection"}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 space-y-0.5">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Compliance</span>
                    <p className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 truncate">
                      IS 3043 & IEC 62305
                    </p>
                  </div>
                </div>
              </div>

              {/* Price & Action Area */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div>
                    {/* <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Procurement Pricing
                    </span> */}
                    {/* <div className="text-2xl font-black text-slate-900 dark:text-white">
                      {product.price ? `₹${product.price.toLocaleString("en-IN")}` : "B2B Project Pricing"}
                    </div> */}
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800/80">
                    ⚡ Factory Quotes within 2 Hours
                  </span>
                </div>

                {/* Primary Dual CTAs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Quote Trigger */}
                  <Button
                    type="button"
                    onClick={scrollToQuote}
                    className="h-12 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Request Official Quote</span>
                  </Button>

                  {/* WhatsApp CTA */}
                  <a
                    href={whatsappProductUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 border border-emerald-400/30 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 fill-white/20" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                    <span>Tech Desk: <strong className="text-slate-700 dark:text-slate-300 font-semibold">+91 94835 64777</strong></span>
                  </span>
                  <span>Pan-India EPC Network</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. BODY CONTENT: Left Column (Documentation & Specs) + Right Column (Quote Form) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Full Technical Dossier */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Full Product Description & Engineering Scope */}
            {product.description && (
              <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Product Description & Engineering Scope
                      </h2>
                      <p className="text-xs text-slate-400">
                        Detailed technical specifications, material performance & installation guidelines
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    <Layers className="w-3.5 h-3.5 text-amber-500" /> Technical Data
                  </span>
                </div>

                {/* Rich Description Output */}
                <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-normal space-y-4">
                  <RichDescription content={product.description} />
                </div>
              </section>
            )}

            {/* 2. Technical Specifications Table */}
            {specifications.length > 0 && (
              <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
                      <ListChecks className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        Technical Specifications
                      </h2>
                      <p className="text-xs text-slate-400">
                        Exact material properties and physical parameters
                      </p>
                    </div>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <tbody>
                      {specifications.map((spec: any, idx: number) => (
                        <tr
                          key={idx}
                          className={`border-b border-slate-100 last:border-0 dark:border-slate-800/80 transition-colors ${
                            idx % 2 === 0
                              ? "bg-slate-50/70 dark:bg-slate-950/40"
                              : "bg-white dark:bg-slate-900"
                          }`}
                        >
                          <td className="w-2/5 sm:w-1/3 px-5 py-3.5 sm:px-6 sm:py-4 font-semibold text-slate-600 dark:text-slate-300">
                            {spec.property}
                          </td>
                          <td className="px-5 py-3.5 sm:px-6 sm:py-4 font-semibold text-slate-900 dark:text-slate-100">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 3. Key Features & Advantages */}
            {features.length > 0 && (
              <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Key Features & Engineering Advantages
                    </h2>
                    <p className="text-xs text-slate-400">
                      Why EPC contractors and MEP consultants standardize on ARK Make
                    </p>
                  </div>
                </div>

                <ul className="grid gap-3.5 sm:grid-cols-2">
                  {features.map((feature: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm hover:border-amber-400/60 dark:hover:border-amber-600/60 transition-colors"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 4. Applications & Use Cases */}
            {useCases.length > 0 && (
              <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Recommended Applications
                    </h2>
                    <p className="text-xs text-slate-400">
                      Approved project sectors and installation environments
                    </p>
                  </div>
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {useCases.map((useCase: string, idx: number) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm"
                    >
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400">
                        <Zap className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        {useCase}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 5. Frequently Asked Questions (Accordion) */}
            {faqs.length > 0 && (
              <section className="rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-sm space-y-5">
                <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <HelpCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      Frequently Asked Questions
                    </h2>
                    <p className="text-xs text-slate-400">
                      Common technical queries and installation guidance
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 px-6 py-2">
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq: any, index: number) => (
                      <AccordionItem
                        key={index}
                        value={`faq-${index}`}
                        className="border-b border-slate-200/70 last:border-0 dark:border-slate-800 py-1"
                      >
                        <AccordionTrigger className="py-4 text-left text-xs sm:text-sm font-bold text-slate-800 hover:no-underline hover:text-amber-600 dark:text-slate-200 dark:hover:text-amber-400">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Quotation Request Card */}
          <aside id="quote-section" className="lg:col-span-4 scroll-mt-24">
            <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-200/90 dark:border-slate-800 relative overflow-hidden">
              
              {/* Top Accent Gradient Line */}

              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                    Request Pricing & Submittal
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Direct manufacturer quote & technical DWG drawings
                  </p>
                </div>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      Quotation Request Received!
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed px-2">
                      Our technical engineering and sales team is reviewing your requirements for <strong className="text-slate-800 dark:text-slate-200">{product.title}</strong> and will contact you shortly.
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSubmitted(false)}
                    className="w-full text-xs font-semibold rounded-xl mt-2 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-3.5">
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <Label
                      htmlFor="companyName"
                      className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Company / Organization <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="companyName"
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="e.g. Adani Solar / L&T / Sterling & Wilson"
                      required
                      className="h-10 text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="contactPerson"
                      className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Contact Person <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                      id="contactPerson"
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      placeholder="e.g. Rajesh Sharma"
                      required
                      className="h-10 text-xs rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label
                        htmlFor="workEmail"
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Work Email <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        id="workEmail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rajesh@company.com"
                        required
                        className="h-10 text-xs rounded-xl"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="mobileNumber"
                        className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                      >
                        Mobile Phone <span className="text-rose-500">*</span>
                      </Label>
                      <Input
                        id="mobileNumber"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98200 12345"
                        required
                        className="h-10 text-xs rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="projectRequirement"
                      className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Project Requirements / Quantity <span className="text-slate-400 font-normal">(Optional)</span>
                    </Label>
                    <Textarea
                      id="projectRequirement"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify required quantity, conductor size, delivery location..."
                      className="text-xs min-h-[75px] py-2.5 rounded-xl resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer mt-1"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Quotation Request</span>
                      </>
                    )}
                  </Button>

                  {/* WhatsApp Quick Alternative */}
                  <a
                    href={whatsappProductUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-emerald-200 dark:border-emerald-800/80 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Prefer WhatsApp? Instant Chat</span>
                  </a>

                  <div className="pt-2 text-center space-y-1">
                    <p className="text-[11px] text-slate-400">
                      ⚡ Average response time: <strong className="text-slate-600 dark:text-slate-300">Under 2 hours</strong>
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Confidential B2B procurement · No spam guaranteed
                    </p>
                  </div>
                </form>
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
