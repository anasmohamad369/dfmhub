import { Metadata } from "next";
import { prisma } from "@/lib/prisma";

function normalizePath(rawPath: string): { cleanPath: string; variations: string[] } {
  const withLeading = rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  const cleanPath = withLeading.length > 1 && withLeading.endsWith("/") ? withLeading.slice(0, -1) : withLeading;
  const withTrailing = cleanPath + "/";
  return {
    cleanPath,
    variations: [cleanPath, withTrailing, rawPath, withLeading],
  };
}

export async function getDynamicMetadata(
  path: string,
  defaultMetadata: Metadata
): Promise<Metadata> {
  try {
    const { cleanPath, variations } = normalizePath(path);

    let seoRecord = await prisma.seoMetadata.findUnique({
      where: { path: cleanPath },
    });

    if (!seoRecord) {
      seoRecord = await prisma.seoMetadata.findFirst({
        where: {
          path: {
            in: variations,
            mode: "insensitive",
          },
        },
      });
    }

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
    const { cleanPath, variations } = normalizePath(path);

    let seoRecord = await prisma.seoMetadata.findUnique({
      where: { path: cleanPath },
      select: { ogImage: true },
    });

    if (!seoRecord) {
      seoRecord = await prisma.seoMetadata.findFirst({
        where: {
          path: {
            in: variations,
            mode: "insensitive",
          },
        },
        select: { ogImage: true },
      });
    }

    return seoRecord?.ogImage || defaultImage;
  } catch (error) {
    return defaultImage;
  }
}
