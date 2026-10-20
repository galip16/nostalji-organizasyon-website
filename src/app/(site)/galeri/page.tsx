import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { getGallery } from "@/lib/gallery";
import { breadcrumbJsonLd } from "@/lib/seo";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Galeri: Bursa Organizasyon Fotoğraf ve Videoları",
  description:
    "Düğün, doğum günü, anaokulu ve kurumsal etkinliklerimizden pamuk şeker, Osmanlı macunu, patlamış mısır, salep, şerbet ve palyaço fotoğrafları ve videoları.",
  alternates: { canonical: "/galeri" },
};

export default async function GalleryPage() {
  const items = await getGallery();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana sayfa", path: "/" },
          { name: "Galeri", path: "/galeri" },
        ])}
      />
      <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
        <SectionHeading as="h1" eyebrow="Galeri" title="Etkinliklerimizden kareler">
          Bursa'da gerçekleştirdiğimiz organizasyonlardan fotoğraf ve videolar.
        </SectionHeading>
        <div className="mt-12">
          <GalleryGrid items={items} />
        </div>
      </section>
      <div className="pt-24">
        <CtaBand />
      </div>
    </>
  );
}
