import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import ProductDetailView from "@/components/product/ProductDetailView";
import JsonLd from "@/components/JsonLd";

interface Props {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found | DFMHUB Systems",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfmhub.com";
  const canonicalUrl = `${baseUrl}/product/${product.slug}`;
  const ogImageUrl = product.imageUrl || `${baseUrl}/images/lps-hero.png`;

  return {
    title: `${product.title} (IS 3043 / IEC 62305 Certified)`,
    description: `${product.description.slice(0, 160)} Engineered for Solar EPC & MEP projects. Request B2B quotes.`,
    keywords: [
      product.title,
      product.category,
      "chemical earthing electrode",
      "lightning protection system",
      "DFMHUB ARK Make",
      "IS 3043 grounding",
      "IEC 62305 earthing",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${product.title} | DFMHUB Grounding & Lightning Systems`,
      description: product.description.slice(0, 200),
      url: canonicalUrl,
      type: "article",
      siteName: "DFMHUB Systems",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${product.title} Technical Drawing`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: product.description.slice(0, 200),
      images: [ogImageUrl],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfmhub.com";
  const productUrl = `${baseUrl}/product/${product.slug}`;

  // Stacked JSON-LD Schema Graphs for LLM Extraction & Knowledge Graphs
  const schemas: Record<string, any>[] = [
    // 1. BreadcrumbList Schema
    {
      "@type": "BreadcrumbList",
      "@id": `${productUrl}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: baseUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: `${baseUrl}/product`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: product.title,
          item: productUrl,
        },
      ],
    },
    // 2. Product Schema
    {
      "@type": "Product",
      "@id": `${productUrl}/#product`,
      name: product.title,
      image: product.imageUrl ? [product.imageUrl] : [`${baseUrl}/images/lps-hero.png`],
      description: product.description,
      brand: {
        "@type": "Brand",
        name: product.brand || "ARK Make",
      },
      category: product.category,
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: product.price ? product.price.toString() : "3500",
        availability: product.inStock !== false ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
        url: productUrl,
        seller: {
          "@type": "Organization",
          name: "DFMHUB Systems",
        },
      },
    },
  ];

  // 3. FAQPage Schema (if dynamic faqs exist on product)
  if (Array.isArray(product.faqs) && product.faqs.length > 0) {
    const faqList = product.faqs as Array<{ question?: string; answer?: string }>;
    schemas.push({
      "@type": "FAQPage",
      "@id": `${productUrl}/#faq`,
      mainEntity: faqList
        .filter((faq) => faq.question && faq.answer)
        .map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
    });
  }

  return (
    <>
      <JsonLd data={schemas} />
      <ProductDetailView product={product} />
    </>
  );
}
