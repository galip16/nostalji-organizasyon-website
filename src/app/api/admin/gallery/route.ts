import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { del } from "@vercel/blob";
import { isAdmin, sameOrigin } from "@/lib/auth";
import {
  CATEGORIES,
  getGallery,
  isBlobConfigured,
  saveGallery,
  type GalleryItem,
} from "@/lib/gallery";

const isBlobUrl = (u: unknown): u is string => {
  if (typeof u !== "string") return false;
  try {
    const url = new URL(u);
    return url.protocol === "https:" && url.hostname.endsWith(".public.blob.vercel-storage.com");
  } catch {
    return false;
  }
};

async function guard(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Geçersiz istek." }, { status: 403 });
  if (!(await isAdmin())) return NextResponse.json({ error: "Giriş yapmanız gerekiyor." }, { status: 401 });
  if (!isBlobConfigured())
    return NextResponse.json({ error: "Vercel Blob henüz bağlanmamış (BLOB_READ_WRITE_TOKEN yok)." }, { status: 503 });
  return null;
}

async function commit(items: GalleryItem[]) {
  await saveGallery(items);
  revalidatePath("/", "layout");
  return NextResponse.json({ items });
}

const validCategory = (c: unknown): c is string => typeof c === "string" && CATEGORIES.some((x) => x.slug === c);
const cleanTitle = (t: unknown) => (typeof t === "string" ? t.trim().slice(0, 120) : "");

export async function GET(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;
  return NextResponse.json({ items: await getGallery() });
}

/** Yeni öğe ekle (dosyalar tarayıcıdan zaten Blob'a yüklenmiş olur) */
export async function POST(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;

  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b) return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });

  const type = b.type === "video" ? "video" : b.type === "image" ? "image" : null;
  const width = Number(b.width);
  const height = Number(b.height);
  if (!type || !isBlobUrl(b.url) || !(width > 0) || !(height > 0) || !validCategory(b.category)) {
    return NextResponse.json({ error: "Eksik veya geçersiz alan." }, { status: 400 });
  }
  if (b.poster !== undefined && !isBlobUrl(b.poster)) {
    return NextResponse.json({ error: "Geçersiz kapak görseli." }, { status: 400 });
  }

  const item: GalleryItem = {
    id: crypto.randomUUID(),
    type,
    url: b.url,
    poster: typeof b.poster === "string" ? b.poster : undefined,
    width: Math.round(width),
    height: Math.round(height),
    category: b.category,
    title: cleanTitle(b.title) || "Etkinlik",
    createdAt: new Date().toISOString(),
  };
  const items = await getGallery();
  return commit([item, ...items]);
}

/** Başlık/kategori değiştir veya sırayı değiştir */
export async function PATCH(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;

  const b = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!b || typeof b.id !== "string") return NextResponse.json({ error: "Geçersiz veri." }, { status: 400 });

  const items = await getGallery();
  const idx = items.findIndex((i) => i.id === b.id);
  if (idx < 0) return NextResponse.json({ error: "Öğe bulunamadı." }, { status: 404 });

  if (b.move === -1 || b.move === 1) {
    const to = idx + (b.move as number);
    if (to >= 0 && to < items.length) [items[idx], items[to]] = [items[to], items[idx]];
  } else if (b.move === "top") {
    const [it] = items.splice(idx, 1);
    items.unshift(it);
  } else {
    if (b.title !== undefined) items[idx].title = cleanTitle(b.title) || items[idx].title;
    if (b.category !== undefined) {
      if (!validCategory(b.category)) return NextResponse.json({ error: "Geçersiz kategori." }, { status: 400 });
      items[idx].category = b.category;
    }
  }
  return commit(items);
}

export async function DELETE(req: Request) {
  const denied = await guard(req);
  if (denied) return denied;

  const id = new URL(req.url).searchParams.get("id");
  const items = await getGallery();
  const target = items.find((i) => i.id === id);
  if (!target) return NextResponse.json({ error: "Öğe bulunamadı." }, { status: 404 });

  const next = items.filter((i) => i.id !== id);
  const res = await commit(next);

  // Dosyaları Blob'dan da sil (başlangıç görselleri /images altında olduğu için atlanır)
  const toDelete = [target.url, target.poster].filter(isBlobUrl);
  if (toDelete.length) {
    try {
      await del(toDelete);
    } catch (err) {
      console.error("Blob silinemedi:", err);
    }
  }
  return res;
}
