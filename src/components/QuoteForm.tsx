"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { DISTRICTS, SITE, waLink } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { EVENTS } from "@/lib/events";

const input =
  "mt-1.5 w-full rounded-xl border border-berry-200 bg-white px-4 py-3 text-base text-ink placeholder:text-muted/60 focus:border-berry-600 focus:outline-none focus:ring-2 focus:ring-berry-200";

export function QuoteForm({ defaultService }: { defaultService?: string }) {
  const [services, setServices] = useState<string[]>(defaultService ? [defaultService] : []);

  function toggle(name: string) {
    setServices((prev) => (prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]));
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const date = get("tarih");
    const lines = [
      "Merhaba, organizasyonumuz için teklif almak istiyorum.",
      "",
      `Ad Soyad: ${get("ad")}`,
      get("tur") && `Etkinlik türü: ${get("tur")}`,
      date && `Tarih: ${new Date(date).toLocaleDateString("tr-TR")}`,
      get("ilce") && `İlçe: ${get("ilce")}`,
      get("kisi") && `Yaklaşık davetli sayısı: ${get("kisi")}`,
      services.length > 0 && `İstenen hizmetler: ${services.join(", ")}`,
      get("not") && `Not: ${get("not")}`,
    ].filter(Boolean);
    window.open(waLink(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-berry-100 bg-paper p-6 shadow-xl shadow-berry-900/5 sm:p-8"
    >
      <h2 className="font-display text-2xl font-semibold text-ink">Teklif formu</h2>
      <p className="mt-1 text-muted">
        Formu doldurun, WhatsApp'ta hazır mesaj olarak açılsın. Tek dokunuşla bize iletirsiniz.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold sm:col-span-2">
          Adınız Soyadınız *
          <input name="ad" required autoComplete="name" className={input} placeholder="Ad Soyad" />
        </label>

        <label className="block text-sm font-bold">
          Etkinlik türü
          <select name="tur" className={input} defaultValue="">
            <option value="">Seçiniz</option>
            {EVENTS.map((e) => (
              <option key={e.slug}>{e.name}</option>
            ))}
            <option>Diğer</option>
          </select>
        </label>

        <label className="block text-sm font-bold">
          Etkinlik tarihi
          <input name="tarih" type="date" className={input} />
        </label>

        <label className="block text-sm font-bold">
          İlçe
          <select name="ilce" className={input} defaultValue="">
            <option value="">Seçiniz</option>
            {DISTRICTS.map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </label>

        <label className="block text-sm font-bold">
          Yaklaşık davetli sayısı
          <input name="kisi" inputMode="numeric" className={input} placeholder="Örn. 100" />
        </label>

        <fieldset className="sm:col-span-2">
          <legend className="text-sm font-bold">İstediğiniz hizmetler</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {SERVICES.map((s) => {
              const on = services.includes(s.name);
              return (
                <button
                  type="button"
                  key={s.slug}
                  onClick={() => toggle(s.name)}
                  aria-pressed={on}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    on
                      ? "border-berry-600 bg-berry-600 text-white"
                      : "border-berry-200 bg-white text-ink hover:border-berry-600"
                  }`}
                >
                  {s.name}
                </button>
              );
            })}
          </div>
        </fieldset>

        <label className="block text-sm font-bold sm:col-span-2">
          Eklemek istedikleriniz
          <textarea name="not" rows={3} className={input} placeholder="Mekân, saat, özel istekler…" />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#1fa855] px-6 py-4 text-lg font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-[#188a45]"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        WhatsApp'ta Gönder
      </button>
      <p className="mt-3 text-center text-sm text-muted">
        Ya da doğrudan arayın:{" "}
        <a href={`tel:${SITE.phone}`} className="font-bold text-berry-700 underline">
          {SITE.phoneDisplay}
        </a>
      </p>
    </form>
  );
}
