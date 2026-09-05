import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getProductBySlug, categoryToSlug, getProductUrl } from "@/lib/products";
import ProductDetailView from "@/components/product/ProductDetailView";
import JsonLd from "@/components/JsonLd";
import { getDynamicMetadata } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string[] }> | { slug: string[] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const slugSegments = resolvedParams.slug || [];

  // Extract the product slug (last segment)
  const productSlug = slugSegments[slugSegments.length - 1];
  if (!productSlug) {
    return { title: "Product Not Found | DFMHUB Systems" };
  }

  const product = await getProductBySlug(productSlug);
  if (!product) {
    return { title: "Product Not Found | DFMHUB Systems" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfmhub.com";
  const path = getProductUrl(product);
  const canonicalUrl = `${baseUrl}${path}`;
  const ogImageUrl = product.imageUrl || `${baseUrl}/images/lps-hero.png`;

  const defaultMeta: Metadata = {
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

  return await getDynamicMetadata(path, defaultMeta);
}

export default async function ProductCatchAllPage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const slugSegments = resolvedParams.slug || [];

  if (slugSegments.length === 0) {
    redirect("/product");
  }

  // 1. Single Segment URL: /product/diagonal-clamp -> Redirect to /product/structural-earthing/diagonal-clamp
  if (slugSegments.length === 1) {
    const singleSlug = slugSegments[0];
    const product = await getProductBySlug(singleSlug);
    if (!product) {
      notFound();
    }
    const targetUrl = getProductUrl(product);
    redirect(targetUrl);
  }

  // 2. Multi Segment URL: /product/[category]/[product-slug]
  const [urlCategorySlug, productSlug] = slugSegments;
  const product = await getProductBySlug(productSlug);

  if (!product) {
    notFound();
  }

  const expectedCategorySlug = categoryToSlug(product.category);

  // If category in URL does not match product's real category, redirect to canonical URL
  if (urlCategorySlug !== expectedCategorySlug) {
    redirect(getProductUrl(product));
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfmhub.com";
  const productUrl = `${baseUrl}${getProductUrl(product)}`;

  const categoryName =
    product.category === "LIGHTNING_PROTECTION"
      ? "Lightning Protection"
      : product.category === "STRUCTURAL_EARTHING"
        ? "Structural Earthing"
        : "Accessories";

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
          name: categoryName,
          item: `${baseUrl}/product?category=${product.category}`,
        },
        {
          "@type": "ListItem",
          position: 4,
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
      category: categoryName,
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
