import { list, put } from "@vercel/blob";
import { SEED_GALLERY, type GalleryItem } from "./gallery-data";

export * from "./gallery-data";

const MANIFEST_PATH = "gallery/manifest.json";

export const isBlobConfigured = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

/** Galeriyi okur. Blob yoksa veya henüz kayıt yoksa başlangıç galerisini döner. */
export async function getGallery(): Promise<GalleryItem[]> {
  if (!isBlobConfigured()) return SEED_GALLERY;
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
    const manifest = blobs.find((b) => b.pathname === MANIFEST_PATH);
    if (!manifest) return SEED_GALLERY;
    const res = await fetch(`${manifest.url}?v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return SEED_GALLERY;
    const data = (await res.json()) as GalleryItem[];
    return Array.isArray(data) ? data : SEED_GALLERY;
  } catch (err) {
    console.error("Galeri okunamadı, başlangıç galerisi gösteriliyor:", err);
    return SEED_GALLERY;
  }
}

export async function saveGallery(items: GalleryItem[]) {
  await put(MANIFEST_PATH, JSON.stringify(items), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}
