import { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";

export const revalidate = 86400; // Edge revalidation every 24 hours

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.dfmhub.com";

  const cities = ["bengaluru", "chennai", "hyderabad", "pune", "mumbai", "ahmedabad"];

  const blogSlugs = [
    "is-iec-62305-lightning-protection-design-guide",
    "earth-resistance-testing-fall-of-potential-clamp-on",
    "structural-earthing-vs-conventional-earth-pits",
    "spd-coordination-why-one-surge-device-at-panel-is-never-enough",
    "annual-lps-maintenance-checklist-facility-teams",
  ];

  const staticPages = [
    "",
    "/about-us",
    "/contact-us",
    "/lightning-protection-system",
    "/structural-earthing",
    "/installation-services",
    "/blog",
    "/product",
  ];

  const staticEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Fetch dynamic products from Prisma DB
  let dbProductEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();
    dbProductEntries = products.map((prod) => ({
      url: `${baseUrl}/product/${prod.slug}`,
      lastModified: prod.updatedAt ? new Date(prod.updatedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));
  } catch (error) {
    console.error("Failed to fetch products for sitemap generation:", error);
  }

  const cityLpsEntries = cities.map((city) => ({
    url: `${baseUrl}/lightning-protection-system/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const cityEarthingEntries = cities.map((city) => ({
    url: `${baseUrl}/structural-earthing/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  const blogEntries = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...dbProductEntries,
    ...cityLpsEntries,
    ...cityEarthingEntries,
    ...blogEntries,
  ];
}

