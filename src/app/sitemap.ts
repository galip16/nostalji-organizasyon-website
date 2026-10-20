import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { EVENTS } from "@/lib/events";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...SERVICES.map((s) => ({
      url: `${SITE.url}/hizmetler/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...EVENTS.map((e) => ({
      url: `${SITE.url}/organizasyonlar/${e.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${SITE.url}/galeri`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/iletisim`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];
}
