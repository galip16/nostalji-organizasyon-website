export type GalleryCategory = {
  slug: string;
  label: string;
};

export const CATEGORIES: GalleryCategory[] = [
  { slug: "pamuk-seker", label: "Pamuk Şeker" },
  { slug: "osmanli-macunu", label: "Osmanlı Macunu" },
  { slug: "patlamis-misir", label: "Patlamış Mısır" },
  { slug: "osmanli-serbeti", label: "Osmanlı Şerbeti" },
  { slug: "salep", label: "Salep" },
  { slug: "palyaco", label: "Palyaço ve Yüz Boyama" },
  { slug: "etkinlik", label: "Etkinlikler" },
];

export const categoryLabel = (slug: string) =>
  CATEGORIES.find((c) => c.slug === slug)?.label ?? "Etkinlikler";

export type GalleryItem = {
  id: string;
  type: "image" | "video";
  url: string;
  /** Video için kapak görseli */
  poster?: string;
  width: number;
  height: number;
  category: string;
  title: string;
  createdAt: string;
};

/** Admin panelinden henüz hiçbir şey yüklenmediyse gösterilen başlangıç galerisi. */
export const SEED_GALLERY: GalleryItem[] = [
  { id: "seed-pamuk-3", type: "image", url: "/images/pamuk-seker-3.webp", width: 1065, height: 1600, category: "pamuk-seker", title: "Pamuk şekerini yiyip gülen çocuk", createdAt: "2026-01-01" },
  { id: "seed-palyaco-1", type: "image", url: "/images/palyaco-1.webp", width: 1536, height: 1024, category: "palyaco", title: "Palyaço, çocuğun yüzünü boyuyor", createdAt: "2026-01-02" },
  { id: "seed-macun-2", type: "image", url: "/images/osmanli-macunu-2.webp", width: 786, height: 577, category: "osmanli-macunu", title: "Osmanlı macunu tezgâhı", createdAt: "2026-01-03" },
  { id: "seed-popcorn-1", type: "image", url: "/images/popcorn-1.webp", width: 1600, height: 1067, category: "patlamis-misir", title: "Kutularda patlamış mısır", createdAt: "2026-01-04" },
  { id: "seed-salep-1", type: "image", url: "/images/salep-1.webp", width: 1024, height: 1536, category: "salep", title: "Tarçınlı sıcak salep", createdAt: "2026-01-05" },
  { id: "seed-serbet-1", type: "image", url: "/images/osmanli-serbeti-1.webp", width: 1600, height: 1600, category: "osmanli-serbeti", title: "Osmanlı şerbetçisi", createdAt: "2026-01-06" },
  { id: "seed-pamuk-1", type: "image", url: "/images/pamuk-seker-1.webp", width: 1064, height: 1600, category: "pamuk-seker", title: "Pamuk şeker ikramı", createdAt: "2026-01-07" },
  { id: "seed-popcorn-2", type: "image", url: "/images/popcorn-2.webp", width: 1600, height: 1060, category: "patlamis-misir", title: "Taze patlamış mısır", createdAt: "2026-01-08" },
  { id: "seed-palyaco-2", type: "image", url: "/images/palyaco-2.webp", width: 864, height: 1184, category: "palyaco", title: "Palyaço ve çocuklar", createdAt: "2026-01-09" },
  { id: "seed-pamuk-2", type: "image", url: "/images/pamuk-seker-2.webp", width: 1065, height: 1600, category: "pamuk-seker", title: "Pamuk şeker keyfi", createdAt: "2026-01-10" },
  { id: "seed-salep-2", type: "image", url: "/images/salep-2.webp", width: 754, height: 886, category: "salep", title: "Salep ikramı", createdAt: "2026-01-11" },
  { id: "seed-serbet-2", type: "image", url: "/images/osmanli-serbeti-2.webp", width: 660, height: 441, category: "osmanli-serbeti", title: "Geleneksel şerbet sunumu", createdAt: "2026-01-12" },
];
