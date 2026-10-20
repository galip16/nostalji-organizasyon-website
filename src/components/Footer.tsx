import Image from "next/image";
import Link from "next/link";
import { DISTRICTS, SITE } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import { EVENTS } from "@/lib/events";
import { InstagramIcon } from "./icons";

export function Footer() {
  return (
    <footer className="mt-24 bg-berry-900 pb-24 text-white/85 md:pb-10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="inline-block rounded-2xl bg-paper p-3">
            <Image src="/logo.png" alt={`${SITE.name} logosu`} width={640} height={322} className="h-14 w-auto" />
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            2002'den beri Bursa'da düğün, doğum günü, okul ve kurumsal etkinliklerde nostaljik tatlar ve eğlence.
          </p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold hover:text-white"
          >
            <InstagramIcon className="size-5" />
            {SITE.instagramHandle}
          </a>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-white">Hizmetler</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link href={`/hizmetler/${s.slug}`} className="hover:text-white hover:underline">
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-white">Organizasyonlar</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {EVENTS.map((e) => (
              <li key={e.slug}>
                <Link href={`/organizasyonlar/${e.slug}`} className="hover:text-white hover:underline">
                  {e.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/galeri" className="hover:text-white hover:underline">
                Galeri
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-white">İletişim</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href={`tel:${SITE.phone}`} className="font-semibold text-white hover:underline">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="break-all hover:text-white hover:underline">
                {SITE.email}
              </a>
            </li>
            <li>
              {SITE.baseDistrict}, {SITE.city} merkezli
              <br />
              Bursa'nın tüm ilçelerine hizmet
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-6xl border-t border-white/15 px-4 pt-6 text-xs text-white/60 sm:px-6">
        <p>
          <span className="font-semibold text-white/80">Hizmet bölgeleri:</span> {DISTRICTS.join(", ")}
        </p>
        <p className="mt-3">
          © {new Date().getFullYear()} {SITE.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
