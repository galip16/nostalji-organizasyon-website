import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { ContactButtons } from "@/components/ContactButtons";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { EVENTS, getEvent } from "@/lib/events";
import { SERVICES } from "@/lib/services";
import { breadcrumbJsonLd } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) return {};
  const path = `/organizasyonlar/${e.slug}`;
  return {
    title: e.seoTitle,
    description: e.seoDescription,
    alternates: { canonical: path },
    openGraph: { title: e.seoTitle, description: e.seoDescription, url: path, images: [{ url: e.image }] },
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = getEvent(slug);
  if (!e) notFound();

  const path = `/organizasyonlar/${e.slug}`;
  const recommended = SERVICES.filter((s) => e.recommended.includes(s.slug));
  const message = `Merhaba, Bursa'da ${e.name.toLowerCase()} için teklif almak istiyorum.`;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana sayfa", path: "/" },
          { name: "Organizasyonlar", path: "/#organizasyonlar" },
          { name: e.name, path },
        ])}
      />

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <nav aria-label="Sayfa yolu" className="text-sm font-semibold text-muted">
          <Link href="/" className="hover:text-berry-700">Ana sayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/#organizasyonlar" className="hover:text-berry-700">Organizasyonlar</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{e.name}</span>
        </nav>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{e.h1}</h1>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
              {e.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ContactButtons message={message} className="mt-8" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-berry-100 shadow-xl">
            <Image
              src={e.image}
              alt={e.imageAlt}
              fill
              preload
              sizes="(min-width:1024px) 50vw, 100vw"
              quality={75}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <SectionHeading title={`${e.name} için önerdiğimiz hizmetler`} />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/hizmetler/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-berry-100 bg-paper transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] bg-berry-100">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    quality={75}
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-semibold text-ink">{s.name}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{s.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-berry-700">
                    Detaylar <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="pt-24">
        <CtaBand message={message} />
      </div>
    </>
  );
}
