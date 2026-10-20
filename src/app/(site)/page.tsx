import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, HeartHandshake, MessageCircle, Truck } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryGrid } from "@/components/GalleryGrid";
import { Faq } from "@/components/Faq";
import { QuoteForm } from "@/components/QuoteForm";
import { JsonLd } from "@/components/JsonLd";
import { SERVICES } from "@/lib/services";
import { EVENTS, GENERAL_FAQ } from "@/lib/events";
import { getGallery } from "@/lib/gallery";
import { DISTRICTS, SITE, yearsOfExperience } from "@/lib/site";
import { faqJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: { absolute: "Bursa Nostaljik Tatlar ve Organizasyon | Pamuk Şeker, Osmanlı Macunu | Nostalji Şekerleme" },
  description:
    "Bursa'nın tüm ilçelerinde düğün, doğum günü, anaokulu ve kurumsal etkinlikler için pamuk şeker, Osmanlı macunu, patlamış mısır, salep, şerbet ve palyaço. 2002'den beri. Ücretsiz teklif.",
  alternates: { canonical: "/" },
};

const STEPS = [
  {
    icon: MessageCircle,
    title: "Bize yazın veya arayın",
    text: "Etkinlik tarihini, ilçeyi ve yaklaşık davetli sayısını paylaşın.",
  },
  {
    icon: CalendarDays,
    title: "Ücretsiz teklifinizi alın",
    text: "İhtiyacınıza uygun ürün ve hizmetlerle size özel teklif hazırlıyoruz.",
  },
  {
    icon: Truck,
    title: "Biz mekânınıza gelelim",
    text: "Etkinlik günü ekibimiz mekânınıza gelir, siz misafirlerinizle ilgilenirsiniz.",
  },
];

export default async function HomePage() {
  const gallery = await getGallery();

  return (
    <>
      <JsonLd data={faqJsonLd(GENERAL_FAQ)} />
      <Hero />

      {/* Hizmetler */}
      <section id="hizmetler" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <SectionHeading eyebrow="Hizmetlerimiz" title="Etkinliğinize nostalji katan lezzetler">
          Her biri geleneksel tarifler ve gösterisiyle misafirlerinizin ilgisini çeker. İstediğiniz kadarını tek
          teklifte birleştirebilirsiniz.
        </SectionHeading>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <li key={s.slug}>
              <Link
                href={`/hizmetler/${s.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-berry-100 bg-paper shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-berry-100">
                  <Image
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    quality={75}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-semibold text-ink">{s.name}</h3>
                  <p className="mt-2 flex-1 text-muted">{s.summary}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-bold text-berry-700">
                    Detaylar ve teklif
                    <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Organizasyon türleri */}
      <section id="organizasyonlar" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="Organizasyonlar" title="Her özel gün için yanınızdayız">
          Etkinlik türünüze göre hazırladığımız paketleri inceleyin.
        </SectionHeading>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {EVENTS.map((e) => (
            <li key={e.slug}>
              <Link
                href={`/organizasyonlar/${e.slug}`}
                className="group relative block h-full overflow-hidden rounded-3xl bg-berry-900 text-white"
              >
                <Image
                  src={e.image}
                  alt={e.imageAlt}
                  fill
                  sizes="(min-width:640px) 50vw, 100vw"
                  quality={60}
                  className="object-cover opacity-55 transition duration-500 group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="relative flex min-h-60 flex-col justify-end bg-gradient-to-t from-berry-900/90 via-berry-900/30 to-transparent p-7">
                  <h3 className="font-display text-2xl font-semibold">{e.name}</h3>
                  <p className="mt-1 text-white/90">{e.summary}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-bold text-berry-200">
                    İncele <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Nasıl çalışıyoruz */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="Nasıl çalışıyoruz?" title="Teklif almak çok kolay" />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-3xl border border-berry-100 bg-paper p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-berry-600 text-white">
                  <step.icon className="size-6" aria-hidden="true" />
                </span>
                <span className="font-display text-4xl font-semibold text-berry-200">{i + 1}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Galeri */}
      <section id="galeri" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="Galeri" title="Etkinliklerimizden kareler" />
        <div className="mt-12">
          <GalleryGrid items={gallery.slice(0, 9)} showFilters={false} />
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 rounded-full border-2 border-berry-600 px-6 py-3 font-bold text-berry-700 transition hover:bg-berry-50"
          >
            Tüm galeriyi gör <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* Hakkımızda */}
      <section id="hakkimizda" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <div className="grid items-center gap-10 rounded-[2rem] bg-berry-50 p-8 sm:p-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <SectionHeading eyebrow="Hakkımızda" title={`${SITE.foundedYear}'den beri Bursa'nın nostaljik tatları`} align="left">
              <p>
                {yearsOfExperience()} yılı aşkın süredir Bursa'da aile işletmesi olarak çalışıyoruz. Bugüne kadar
                yaklaşık {SITE.eventCount.toLocaleString("tr-TR")} organizasyonda; düğünlerde, doğum günlerinde,
                anaokullarında ve şirket etkinliklerinde görev aldık.
              </p>
              <p className="mt-4">
                Amacımız basit: Geleneksel lezzetleri bugünün etkinliklerine taşıyıp misafirlerinizin yüzünü
                güldürmek. Küçük bir doğum günü de olsa büyük bir kurumsal açılış da olsa aynı özenle çalışıyoruz.
              </p>
            </SectionHeading>
          </div>
          <dl className="grid grid-cols-2 gap-4 lg:col-span-2">
            {[
              [`${SITE.foundedYear}`, "kuruluş yılı"],
              [`${yearsOfExperience()}+`, "yıllık deneyim"],
              [`${SITE.eventCount.toLocaleString("tr-TR")}+`, "organizasyon"],
              ["17", "ilçeye hizmet"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-paper p-5 text-center shadow-sm">
                <dt className="font-display text-4xl font-semibold text-berry-600">{n}</dt>
                <dd className="mt-1 text-sm font-bold text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Hizmet bölgesi */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="Hizmet bölgemiz" title="Bursa'nın tüm ilçelerindeyiz">
          {SITE.baseDistrict} merkezliyiz, aşağıdaki tüm ilçelere etkinliğinize gelip hizmet veriyoruz.
        </SectionHeading>
        <ul className="mt-8 flex flex-wrap justify-center gap-2.5">
          {DISTRICTS.map((d) => (
            <li key={d} className="rounded-full border border-berry-200 bg-paper px-4 py-2 font-bold text-ink">
              {d}
            </li>
          ))}
        </ul>
      </section>

      {/* SSS */}
      <section className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <SectionHeading eyebrow="Sık sorulan sorular" title="Merak ettikleriniz" />
        <div className="mt-10">
          <Faq items={GENERAL_FAQ} />
        </div>
      </section>

      {/* Teklif formu */}
      <section id="teklif" className="mx-auto max-w-3xl px-4 pt-24 sm:px-6">
        <QuoteForm />
      </section>
    </>
  );
}
