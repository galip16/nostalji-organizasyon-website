import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { NAV, SITE } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-berry-100 bg-paper/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={`${SITE.name} ana sayfa`}>
          <Image
            src="/logo.png"
            alt={`${SITE.name} logosu`}
            width={640}
            height={322}
            preload
            className="h-12 w-auto sm:h-16"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana menü">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 font-semibold text-ink transition hover:bg-berry-50 hover:text-berry-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phone}`}
            className="hidden items-center gap-2 rounded-full bg-berry-600 px-5 py-2.5 font-bold text-white transition hover:bg-berry-700 sm:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
