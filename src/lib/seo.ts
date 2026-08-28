import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

export async function getDynamicMetadata(
  path: string,
  defaultMetadata: Metadata
): Promise<Metadata> {
  try {
    const seoRecord = await prisma.seoMetadata.findUnique({
      where: { path },
    });

    if (!seoRecord) {
      return defaultMetadata;
    }

    const title = seoRecord.title || (defaultMetadata.title as string);
    const description = seoRecord.description || (defaultMetadata.description as string);
    const keywords = seoRecord.keywords
      ? seoRecord.keywords.split(",").map((k) => k.trim()).filter(Boolean)
      : defaultMetadata.keywords;
    const ogTitle = seoRecord.ogTitle || title;
    const ogDescription = seoRecord.ogDescription || description;
    const ogImage = seoRecord.ogImage;
    const canonicalUrl = seoRecord.canonicalUrl;

    const baseOg = defaultMetadata.openGraph || {};
    const baseTwitter = defaultMetadata.twitter || {};
    const baseAlternates = defaultMetadata.alternates || {};

    return {
      ...defaultMetadata,
      title: title,
      description: description,
      keywords: keywords,
      openGraph: {
        ...baseOg,
        title: ogTitle,
        description: ogDescription,
        images: ogImage
          ? [{ url: ogImage, alt: title }]
          : baseOg.images,
      },
      twitter: {
        ...baseTwitter,
        title: ogTitle,
        description: ogDescription,
        images: ogImage ? [ogImage] : baseTwitter.images,
      },
      alternates: canonicalUrl
        ? { ...baseAlternates, canonical: canonicalUrl }
        : baseAlternates,
      robots: seoRecord.noIndex
        ? { index: false, follow: false }
        : defaultMetadata.robots || { index: true, follow: true },
    };
  } catch (error) {
    console.error(`[SEO Helper] Error fetching dynamic metadata for path "${path}":`, error);
    return defaultMetadata;
  }
}

export async function getDynamicHeroImage(
  path: string,
  defaultImage: string
): Promise<string> {
  try {
    const seoRecord = await prisma.seoMetadata.findUnique({
      where: { path },
      select: { ogImage: true },
    });
    return seoRecord?.ogImage || defaultImage;
  } catch (error) {
    return defaultImage;
  }
}
