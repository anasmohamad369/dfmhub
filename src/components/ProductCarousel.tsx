"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures';

interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number | null;
  category: string;
  imageUrl: string | null;
  inStock: boolean;
}

interface ProductCarouselProps {
  products: Product[];
  title?: string;
  subtitle?: string;
}

export default function ProductCarousel({
  products,
  title = "Featured Products",
  subtitle = "Explore our top-rated solutions designed to meet your specific needs.",
}: ProductCarouselProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white text-slate-900 py-12 sm:py-16 lg:py-20 border-b border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-4xl">
          <span className="text-amber-600 font-bold text-xs uppercase tracking-widest block mb-2">
            PRODUCTS
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-3">
            {title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal">
            {subtitle}
          </p>
        </div>

        <div className="relative px-2 sm:px-4">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              dragFree: true,
            }}
            plugins={[WheelGesturesPlugin()]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {products.map((product) => (
                <CarouselItem
                  key={product.id}
                  className="pl-4 md:pl-6 basis-full sm:basis-[360px] md:basis-[420px]"
                >
                  <div className="group h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col">
                    <div className="relative w-full bg-white overflow-hidden flex items-center justify-center border-b border-slate-100">
                      {product.imageUrl ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={product.imageUrl}
                            alt={product.title}
                            width={500}
                            height={100}
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full bg-slate-100 flex items-center justify-center rounded-xl border border-slate-200 border-dashed">
                          <span className="text-slate-400 text-sm font-medium">No Image</span>
                        </div>
                      )}
                      
                      {product.inStock && (
                        <div className="absolute top-3 right-3 bg-emerald-100/90 text-emerald-700 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-sm border border-emerald-200/50">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>IN STOCK</span>
                        </div>
                      )}
                    </div>

                    <div className="p-5 flex flex-col flex-grow border-t border-slate-100">
                      <div className="flex-grow">
                        <Link href={`/product/${product.slug}`} className="block">
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>
                        <p className="text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
