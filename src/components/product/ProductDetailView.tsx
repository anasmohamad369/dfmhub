"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Factory,
  HelpCircle,
  ListChecks,
  Target,
  Zap,
  Mail,
  Shield,
} from "lucide-react";

interface ProductDetailViewProps {
  product: any;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
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

  const specifications = parseList(product.specifications);

  const features = parseList(product.features).map((item: any) =>
    typeof item === "string" ? item : item?.value || String(item)
  );

  const useCases = parseList(product.useCases).map((item: any) =>
    typeof item === "string" ? item : item?.value || String(item)
  );

  const faqs = parseList(product.faqs);

  const isLightning = product.category === "LIGHTNING_PROTECTION";

  const categoryUrl = isLightning
    ? "/lightning-protection-system"
    : "/structural-earthing";

  const categoryName = isLightning
    ? "Lightning Protection"
    : "Structural Earthing";

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950">


      <main className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* Product Overview Card */}
        <section className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-4 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left: Product Image */}
            <div className="md:col-span-5">
              <div className=" w-full rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200/70 dark:border-slate-800 flex items-center justify-center">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="text-center text-xs text-slate-400">
                    <Shield className="w-8 h-8 mx-auto mb-2 text-slate-300 dark:text-slate-700" />
                    <span>No image available</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Meta & Content */}
            <div className="md:col-span-7 h-full flex flex-col justify-between  space-y-4">
              <div>
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge
                    variant="outline"
                    className="border-amber-200 bg-amber-50 text-[11px] font-medium text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300"
                  >
                    {categoryName}
                  </Badge>

                  {product.inStock ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      In Stock
                    </span>
                  ) : (
                    <span className="text-[11px] font-medium text-slate-400">
                      Made to order
                    </span>
                  )}
                </div>

                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white leading-snug">
                  {product.title}
                </h1>

                {/* Brand & Application Meta */}
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  {product.brand && (
                    <div>
                      Brand: <span className="font-semibold text-slate-700 dark:text-slate-200">{product.brand}</span>
                    </div>
                  )}

                  {product.primaryApplication && (
                    <div className="inline-flex items-center gap-1">
                      <Factory className="h-3.5 w-3.5 text-amber-500" />
                      <span>Application: <strong className="font-semibold text-slate-700 dark:text-slate-200">{product.primaryApplication}</strong></span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {product.description}
                  </p>
                )}
              </div>

              {/* Inquire Action */}
              <div className="border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
                <Link href="/contact">
                  <Button
                    size="sm"
                    className="bg-slate-900 hover:bg-slate-800 dark:bg-amber-600 dark:hover:bg-amber-700 text-white text-xs font-semibold h-9 px-4 rounded-lg"
                  >
                    <Mail className="w-3.5 h-3.5 mr-1.5" />
                    Inquire About This Product
                  </Button>
                </Link>

                <span className="text-xs text-slate-400">
                  IS 3043 & IEC 62305 Compliant
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        {specifications.length > 0 && (
          <ProductSection
            icon={<ListChecks className="h-4 w-4" />}
            title="Technical Specifications"
            description="Technical data and specifications."
          >
            <div className="overflow-hidden rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900">
              <table className="w-full text-left text-xs">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {specifications.map((spec: any, index: number) => (
                    <tr key={index} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30">
                      <td className="w-1/3 bg-slate-50/50 dark:bg-slate-950/30 px-4 py-2.5 font-medium text-slate-700 dark:text-slate-300 border-r border-slate-100 dark:border-slate-800">
                        {spec.property}
                      </td>
                      <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ProductSection>
        )}

        {/* Key Features */}
        {features.length > 0 && (
          <ProductSection
            icon={<Zap className="h-4 w-4" />}
            title="Key Features"
            description="Core engineering features of this product."
          >
            <div className="grid gap-2.5 sm:grid-cols-2">
              {features.map((feature: string, index: number) => (
                <div
                  key={index}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs"
                >
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  <span className="text-slate-600 dark:text-slate-300 leading-normal">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </ProductSection>
        )}

        {/* Use Cases */}
        {useCases.length > 0 && (
          <ProductSection
            icon={<Target className="h-4 w-4" />}
            title="Applications & Use Cases"
            description="Typical deployment scenarios."
          >
            <div className="grid gap-2.5 sm:grid-cols-3">
              {useCases.map((useCase: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs"
                >
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
                    <Target className="h-3 w-3" />
                  </div>
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {useCase}
                  </span>
                </div>
              ))}
            </div>
          </ProductSection>
        )}

        {/* FAQs */}
        {faqs.length > 0 && (
          <ProductSection
            icon={<HelpCircle className="h-4 w-4" />}
            title="Frequently Asked Questions"
            description="Common queries and technical answers."
          >
            <div className="rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-slate-900 px-4 py-1">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq: any, index: number) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border-b border-slate-100 last:border-0 dark:border-slate-800"
                  >
                    <AccordionTrigger className="py-3 text-left text-xs sm:text-sm font-semibold text-slate-800 hover:no-underline hover:text-amber-600 dark:text-slate-200 dark:hover:text-amber-400">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-3 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </ProductSection>
        )}
      </main>
    </div>
  );
}

function ProductSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
          {icon}
        </div>
        <div>
          <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}