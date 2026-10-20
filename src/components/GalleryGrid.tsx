"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { CATEGORIES, categoryLabel, type GalleryItem } from "@/lib/gallery-data";

export function GalleryGrid({
  items,
  showFilters = true,
}: {
  items: GalleryItem[];
  showFilters?: boolean;
}) {
  const [active, setActive] = useState<string>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const usedCategories = useMemo(
    () => CATEGORIES.filter((c) => items.some((i) => i.category === c.slug)),
    [items],
  );
  const visible = useMemo(
    () => (active === "all" ? items : items.filter((i) => i.category === active)),
    [items, active],
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) => (i === null ? i : (i + dir + visible.length) % visible.length)),
    [visible.length],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [openIndex, close, step]);

  const current = openIndex !== null ? visible[openIndex] : null;

  return (
    <div>
      {showFilters && usedCategories.length > 1 && (
        <div className="mb-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Galeri kategorileri">
          {[{ slug: "all", label: "Tümü" }, ...usedCategories].map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(c.slug)}
              aria-pressed={active === c.slug}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                active === c.slug
                  ? "border-berry-600 bg-berry-600 text-white"
                  : "border-berry-200 bg-paper text-ink hover:border-berry-600"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <ul className="columns-2 gap-3 sm:gap-4 lg:columns-3 [&>li]:mb-3 sm:[&>li]:mb-4">
        {visible.map((item, i) => (
          <li key={item.id} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl bg-berry-100 shadow-md transition hover:shadow-xl"
              aria-label={`${item.title} - ${item.type === "video" ? "videoyu aç" : "büyüt"}`}
            >
              {item.type === "video" && !item.poster ? (
                <div
                  className="grid w-full place-items-center bg-berry-900"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                />
              ) : (
                <Image
                  src={item.type === "video" ? item.poster! : item.url}
                  alt={item.title}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width:1024px) 33vw, 50vw"
                  quality={75}
                  loading="lazy"
                  className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
                />
              )}
              {item.type === "video" && (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-14 place-items-center rounded-full bg-white/90 text-berry-600 shadow-lg">
                    <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
                  </span>
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-50 flex flex-col bg-black"
          onClick={close}
        >
          <div className="flex items-center justify-between p-4 text-white" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-semibold text-white/80">
              {categoryLabel(current.category)} · {openIndex! + 1}/{visible.length}
            </p>
            <button
              type="button"
              onClick={close}
              aria-label="Kapat"
              className="grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
            >
              <X className="size-6" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16">
            {visible.length > 1 && (
              <button
                type="button"
                aria-label="Önceki"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                className="absolute left-2 z-10 grid size-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30 sm:left-4"
              >
                <ChevronLeft className="size-7" />
              </button>
            )}

            <div onClick={(e) => e.stopPropagation()} className="flex max-h-full max-w-full justify-center">
              {current.type === "video" ? (
                <video
                  key={current.id}
                  src={current.url}
                  poster={current.poster}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[78dvh] max-w-full rounded-xl bg-black"
                />
              ) : (
                <Image
                  key={current.id}
                  src={current.url}
                  alt={current.title}
                  width={current.width}
                  height={current.height}
                  sizes="100vw"
                  quality={80}
                  className="max-h-[78dvh] w-auto max-w-full rounded-xl object-contain"
                />
              )}
            </div>

            {visible.length > 1 && (
              <button
                type="button"
                aria-label="Sonraki"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                className="absolute right-2 z-10 grid size-12 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30 sm:right-4"
              >
                <ChevronRight className="size-7" />
              </button>
            )}
          </div>

          <p className="p-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
            {current.title}
          </p>
        </div>
      )}
    </div>
  );
}
