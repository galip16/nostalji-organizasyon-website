"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { ArrowDown, ArrowUp, ArrowUpToLine, LoaderCircle, LogOut, Play, Trash2, Upload } from "lucide-react";
import { CATEGORIES, type GalleryItem } from "@/lib/gallery-data";

const MAX_VIDEO_MB = 150;

type Task = {
  key: string;
  name: string;
  status: "hazırlanıyor" | "yükleniyor" | "kaydediliyor" | "tamam" | "hata";
  progress: number;
  error?: string;
};

/* ---------- Tarayıcıda görsel/video hazırlama ---------- */

async function imageToWebp(file: File, maxSide = 1800) {
  let bmp: ImageBitmap;
  try {
    bmp = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch {
    throw new Error("Bu fotoğraf okunamadı. JPG veya PNG olarak deneyin (iPhone HEIC desteklenmeyebilir).");
  }
  const scale = Math.min(1, maxSide / Math.max(bmp.width, bmp.height));
  const width = Math.round(bmp.width * scale);
  const height = Math.round(bmp.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.getContext("2d")!.drawImage(bmp, 0, 0, width, height);
  bmp.close();
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/webp", 0.82));
  if (!blob) throw new Error("Fotoğraf dönüştürülemedi.");
  return { blob, width, height };
}

async function videoInfo(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const v = document.createElement("video");
    v.preload = "metadata";
    v.muted = true;
    v.playsInline = true;
    v.src = url;
    await new Promise<void>((res, rej) => {
      v.onloadedmetadata = () => res();
      v.onerror = () => rej(new Error("Bu video tarayıcıda okunamadı. MP4 (H.264) biçiminde deneyin."));
    });
    v.currentTime = Math.min(0.6, (v.duration || 1) / 2);
    await new Promise<void>((res) => {
      v.onseeked = () => res();
      setTimeout(res, 3000);
    });
    const scale = Math.min(1, 1200 / Math.max(v.videoWidth, v.videoHeight));
    const w = Math.round(v.videoWidth * scale);
    const h = Math.round(v.videoHeight * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(v, 0, 0, w, h);
    const poster = await new Promise<Blob | null>((res) => canvas.toBlob(res, "image/webp", 0.8));
    if (!poster) throw new Error("Videonun kapak görseli oluşturulamadı.");
    return { width: v.videoWidth, height: v.videoHeight, poster };
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function api(method: string, body?: unknown, query = "") {
  const res = await fetch(`/api/admin/gallery${query}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "İşlem başarısız.");
  return data.items as GalleryItem[];
}

/* ---------- Panel ---------- */

export function AdminDashboard({ initialItems, blobReady }: { initialItems: GalleryItem[]; blobReady: boolean }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [category, setCategory] = useState(CATEGORIES[0].slug);
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notice, setNotice] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const patchTask = (key: string, patch: Partial<Task>) =>
    setTasks((t) => t.map((x) => (x.key === key ? { ...x, ...patch } : x)));

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    const list = Array.from(files);
    const newTasks: Task[] = list.map((f, i) => ({
      key: `${Date.now()}-${i}`,
      name: f.name,
      status: "hazırlanıyor",
      progress: 0,
    }));
    setTasks((t) => [...newTasks, ...t]);

    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      const key = newTasks[i].key;
      try {
        const id = crypto.randomUUID();
        const isVideo = file.type.startsWith("video/");
        if (!isVideo && !file.type.startsWith("image/")) throw new Error("Sadece fotoğraf veya video yüklenebilir.");
        if (isVideo && file.size > MAX_VIDEO_MB * 1024 * 1024)
          throw new Error(`Video çok büyük (en fazla ${MAX_VIDEO_MB} MB). Daha kısa veya düşük çözünürlüklü deneyin.`);

        let payload: Omit<GalleryItem, "id" | "createdAt">;

        if (isVideo) {
          const info = await videoInfo(file);
          patchTask(key, { status: "yükleniyor", progress: 2 });
          const posterRes = await upload(`gallery/posters/${id}.webp`, info.poster, {
            access: "public",
            handleUploadUrl: "/api/admin/upload",
            contentType: "image/webp",
          });
          const ext = file.name.split(".").pop()?.toLowerCase() || "mp4";
          const videoRes = await upload(`gallery/videos/${id}.${ext}`, file, {
            access: "public",
            handleUploadUrl: "/api/admin/upload",
            multipart: file.size > 5 * 1024 * 1024,
            contentType: file.type || "video/mp4",
            onUploadProgress: ({ percentage }) => patchTask(key, { progress: Math.max(2, Math.round(percentage)) }),
          });
          payload = {
            type: "video",
            url: videoRes.url,
            poster: posterRes.url,
            width: info.width,
            height: info.height,
            category,
            title: title.trim() || "Etkinlik videosu",
          };
        } else {
          const { blob, width, height } = await imageToWebp(file);
          patchTask(key, { status: "yükleniyor", progress: 5 });
          const res = await upload(`gallery/images/${id}.webp`, blob, {
            access: "public",
            handleUploadUrl: "/api/admin/upload",
            contentType: "image/webp",
            onUploadProgress: ({ percentage }) => patchTask(key, { progress: Math.max(5, Math.round(percentage)) }),
          });
          payload = {
            type: "image",
            url: res.url,
            width,
            height,
            category,
            title: title.trim() || "Etkinlik fotoğrafı",
          };
        }

        patchTask(key, { status: "kaydediliyor", progress: 100 });
        setItems(await api("POST", payload));
        patchTask(key, { status: "tamam" });
      } catch (err) {
        patchTask(key, { status: "hata", error: err instanceof Error ? err.message : "Yükleme başarısız." });
      }
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  async function run(id: string, fn: () => Promise<GalleryItem[]>) {
    setBusyId(id);
    setNotice(null);
    try {
      setItems(await fn());
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "İşlem başarısız.");
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const uploading = tasks.some((t) => t.status === "yükleniyor" || t.status === "hazırlanıyor" || t.status === "kaydediliyor");

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Image src="/logo.png" alt="Nostalji Şekerleme" width={640} height={322} className="h-12 w-auto" />
          <h1 className="font-display text-2xl font-semibold text-ink">Galeri Yönetimi</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/galeri" target="_blank" className="rounded-full border border-berry-200 px-4 py-2 text-sm font-bold text-berry-700 hover:bg-berry-50">
            Siteyi aç
          </Link>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-muted hover:bg-berry-50">
            <LogOut className="size-4" aria-hidden="true" /> Çıkış
          </button>
        </div>
      </header>

      {!blobReady && (
        <div className="mt-6 rounded-2xl border border-amber-300 bg-amber-50 p-5 text-amber-900">
          <p className="font-bold">Dosya depolama henüz bağlanmamış.</p>
          <p className="mt-1 text-sm">
            Vercel projenizde <b>Storage → Blob</b> üzerinden bir <b>Public</b> depo oluşturup projeye bağlayın.
            Bağlayınca <code>BLOB_READ_WRITE_TOKEN</code> otomatik eklenir; sonra siteyi yeniden yayınlayın.
          </p>
        </div>
      )}

      {/* Yükleme */}
      <section className="mt-8 rounded-3xl border border-berry-100 bg-paper p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-xl font-semibold text-ink">Fotoğraf / video ekle</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-bold">
            Kategori
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-berry-200 bg-white px-4 py-3 text-base"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-bold">
            Açıklama (isteğe bağlı)
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={120}
              placeholder="Örn. Nilüfer'de doğum günü organizasyonu"
              className="mt-1.5 w-full rounded-xl border border-berry-200 bg-white px-4 py-3 text-base"
            />
          </label>
        </div>

        <label
          className={`mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-berry-200 bg-berry-50/60 px-6 py-10 text-center transition hover:border-berry-600 ${
            !blobReady ? "pointer-events-none opacity-50" : ""
          }`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            void handleFiles(e.dataTransfer.files);
          }}
        >
          <Upload className="size-8 text-berry-600" aria-hidden="true" />
          <span className="text-lg font-bold text-ink">Dosyaları seçin veya buraya bırakın</span>
          <span className="text-sm text-muted">
            Fotoğraflar otomatik küçültülür. Videolar için MP4 önerilir (en fazla {MAX_VIDEO_MB} MB).
          </span>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept="image/*,video/*"
            disabled={!blobReady}
            className="sr-only"
            onChange={(e) => void handleFiles(e.target.files)}
          />
        </label>

        {tasks.length > 0 && (
          <ul className="mt-5 space-y-2">
            {tasks.slice(0, 8).map((t) => (
              <li key={t.key} className="rounded-xl bg-white px-4 py-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate font-semibold text-ink">{t.name}</span>
                  <span
                    className={`shrink-0 font-bold ${
                      t.status === "hata" ? "text-red-700" : t.status === "tamam" ? "text-green-700" : "text-berry-700"
                    }`}
                  >
                    {t.status === "yükleniyor" ? `%${t.progress}` : t.status}
                  </span>
                </div>
                {t.status === "yükleniyor" && (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-berry-100">
                    <div className="h-full bg-berry-600 transition-all" style={{ width: `${t.progress}%` }} />
                  </div>
                )}
                {t.error && <p className="mt-1 text-red-700">{t.error}</p>}
              </li>
            ))}
          </ul>
        )}
        {uploading && <p className="mt-3 text-sm font-semibold text-muted">Yükleme sürerken bu sayfayı kapatmayın.</p>}
      </section>

      {/* Liste */}
      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-ink">Galerideki öğeler ({items.length})</h2>
          <p className="hidden text-sm text-muted sm:block">Sıralama sitedeki sırayla aynıdır; ilk 9 öğe ana sayfada görünür.</p>
        </div>

        {notice && (
          <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-800">
            {notice}
          </p>
        )}

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const thumb = item.type === "video" ? item.poster : item.url;
            const busy = busyId === item.id;
            return (
              <li key={item.id} className="overflow-hidden rounded-2xl border border-berry-100 bg-paper shadow-sm">
                <div className="relative aspect-[4/3] bg-berry-100">
                  {thumb && (
                    <Image src={thumb} alt={item.title} fill sizes="(min-width:1024px) 33vw, 50vw" quality={60} className="object-cover" />
                  )}
                  {item.type === "video" && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white">
                      <Play className="size-3 fill-current" aria-hidden="true" /> Video
                    </span>
                  )}
                  {busy && (
                    <span className="absolute inset-0 grid place-items-center bg-white/70">
                      <LoaderCircle className="size-8 animate-spin text-berry-600" aria-label="İşleniyor" />
                    </span>
                  )}
                </div>
                <div className="space-y-3 p-4">
                  <input
                    defaultValue={item.title}
                    maxLength={120}
                    aria-label="Açıklama"
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (v && v !== item.title) void run(item.id, () => api("PATCH", { id: item.id, title: v }));
                    }}
                    className="w-full rounded-lg border border-berry-100 bg-white px-3 py-2 text-sm font-semibold"
                  />
                  <select
                    value={item.category}
                    aria-label="Kategori"
                    onChange={(e) => void run(item.id, () => api("PATCH", { id: item.id, category: e.target.value }))}
                    className="w-full rounded-lg border border-berry-100 bg-white px-3 py-2 text-sm"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                      <IconBtn label="En başa al" disabled={idx === 0 || busy} onClick={() => run(item.id, () => api("PATCH", { id: item.id, move: "top" }))}>
                        <ArrowUpToLine className="size-4" />
                      </IconBtn>
                      <IconBtn label="Yukarı taşı" disabled={idx === 0 || busy} onClick={() => run(item.id, () => api("PATCH", { id: item.id, move: -1 }))}>
                        <ArrowUp className="size-4" />
                      </IconBtn>
                      <IconBtn label="Aşağı taşı" disabled={idx === items.length - 1 || busy} onClick={() => run(item.id, () => api("PATCH", { id: item.id, move: 1 }))}>
                        <ArrowDown className="size-4" />
                      </IconBtn>
                    </div>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => {
                        if (confirm("Bu öğe galeriden kalıcı olarak silinsin mi?"))
                          void run(item.id, () => api("DELETE", undefined, `?id=${encodeURIComponent(item.id)}`));
                      }}
                      className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold text-red-700 hover:bg-red-50 disabled:opacity-40"
                    >
                      <Trash2 className="size-4" aria-hidden="true" /> Sil
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {items.length === 0 && <p className="mt-6 rounded-2xl bg-paper p-8 text-center text-muted">Galeri boş. Yukarıdan fotoğraf veya video ekleyin.</p>}
      </section>
    </div>
  );
}

function IconBtn({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="grid size-9 place-items-center rounded-full border border-berry-100 text-ink hover:bg-berry-50 disabled:opacity-30"
    >
      {children}
    </button>
  );
}
