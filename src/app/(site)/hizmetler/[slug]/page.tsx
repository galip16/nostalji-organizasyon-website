import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { ContactButtons } from "@/components/ContactButtons";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { GalleryGrid } from "@/components/GalleryGrid";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { getGallery } from "@/lib/gallery";
import { SERVICES, getService } from "@/lib/services";
import { breadcrumbJsonLd, faqJsonLd, serviceJsonLd } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  const path = `/hizmetler/${s.slug}`;
  return {
    title: s.seoTitle,
    description: s.seoDescription,
    alternates: { canonical: path },
    openGraph: { title: s.seoTitle, description: s.seoDescription, url: path, images: [{ url: s.image }] },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const path = `/hizmetler/${s.slug}`;
  const gallery = (await getGallery()).filter((g) => g.category === s.slug).slice(0, 6);
  const others = SERVICES.filter((o) => o.slug !== s.slug);
  const message = `Merhaba, Bursa'da ${s.name.toLowerCase()} hizmeti için teklif almak istiyorum.`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Ana sayfa", path: "/" },
            { name: "Hizmetler", path: "/#hizmetler" },
            { name: s.name, path },
          ]),
          serviceJsonLd({ name: s.h1, description: s.seoDescription, path, image: s.image }),
          faqJsonLd(s.faq),
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6">
        <nav aria-label="Sayfa yolu" className="text-sm font-semibold text-muted">
          <Link href="/" className="hover:text-berry-700">Ana sayfa</Link>
          <span className="mx-2">/</span>
          <Link href="/#hizmetler" className="hover:text-berry-700">Hizmetler</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{s.name}</span>
        </nav>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">{s.h1}</h1>
            <p className="mt-5 text-xl leading-relaxed text-muted">{s.summary}</p>
            <ContactButtons message={message} className="mt-8" />
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-berry-100 shadow-xl">
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              preload
              sizes="(min-width:1024px) 50vw, 100vw"
              quality={75}
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
        <div className="space-y-5 text-lg leading-relaxed text-muted lg:col-span-3">
          <h2 className="font-display text-3xl font-semibold text-ink">{s.name} hizmetimiz hakkında</h2>
          {s.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-3xl bg-berry-50 p-7">
            <h3 className="font-display text-xl font-semibold text-ink">Neden bizi tercih etmelisiniz?</h3>
            <ul className="mt-4 space-y-3">
              {s.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-berry-600" aria-hidden="true" />
                  <span className="text-ink">{h}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-berry-100 bg-paper p-7">
            <h3 className="font-display text-xl font-semibold text-ink">Şunlar için ideal</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.suits.map((x) => (
                <li key={x} className="rounded-full bg-berry-50 px-4 py-1.5 text-sm font-bold text-berry-700">
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
          <SectionHeading title={`${s.name} etkinliklerimizden kareler`} />
          <div className="mt-10">
            <GalleryGrid items={gallery} showFilters={false} />
          </div>
        </section>
      )}

      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <SectionHeading title="Sık sorulan sorular" />
        <div className="mt-10">
          <Faq items={s.faq} />
        </div>
      </section>

      <section className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <SectionHeading title="Diğer hizmetlerimiz" />
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/hizmetler/${o.slug}`}
                className="group flex items-center justify-between gap-3 rounded-2xl border border-berry-100 bg-paper p-5 font-bold text-ink transition hover:border-berry-600"
              >
                {o.name}
                <ArrowRight className="size-4 text-berry-600 transition group-hover:translate-x-1" aria-hidden="true" />
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
