import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dfmhub.vercel.app";

  const cities = ["bengaluru", "chennai", "hyderabad", "pune"];

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
    "/lightning-protection-system",
    "/structural-earthing",
    "/installation-services",
    "/blog",
  ];

  const staticEntries = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const cityLpsEntries = cities.map((city) => ({
    url: `${baseUrl}/lightning-protection-system/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const cityEarthingEntries = cities.map((city) => ({
    url: `${baseUrl}/structural-earthing/${city}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const blogEntries = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticEntries,
    ...cityLpsEntries,
    ...cityEarthingEntries,
    ...blogEntries,
  ];
}
