import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} | Bursa Nostaljik Tatlar ve Organizasyon`,
    short_name: SITE.name,
    description: SITE.description,
    lang: "tr",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f0",
    theme_color: "#d6286c",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
