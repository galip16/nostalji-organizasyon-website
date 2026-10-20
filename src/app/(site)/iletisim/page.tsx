import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionHeading } from "@/components/SectionHeading";
import { InstagramIcon } from "@/components/icons";
import { JsonLd } from "@/components/JsonLd";
import { DISTRICTS, SITE, waLink } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "İletişim ve Ücretsiz Teklif | Bursa",
  description:
    "Bursa'da organizasyonunuz için ücretsiz teklif alın. Telefon: 0537 637 06 81. WhatsApp'tan yazın veya formu doldurun; tüm ilçelere hizmet veriyoruz.",
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  const cards = [
    { icon: Phone, label: "Arayın", value: SITE.phoneDisplay, href: `tel:${SITE.phone}` },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: "Mesaj yazın",
      href: waLink("Merhaba, organizasyonumuz için teklif almak istiyorum."),
      external: true,
    },
    { icon: Mail, label: "E-posta", value: SITE.email, href: `mailto:${SITE.email}` },
    { icon: InstagramIcon, label: "Instagram", value: SITE.instagramHandle, href: SITE.instagram, external: true },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 sm:px-6">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Ana sayfa", path: "/" },
          { name: "İletişim", path: "/iletisim" },
        ])}
      />
      <SectionHeading as="h1" eyebrow="İletişim" title="Bursa'da organizasyonunuz için teklif alın">
        Bize telefonla ya da WhatsApp'tan ulaşabilir veya aşağıdaki formu doldurabilirsiniz.
      </SectionHeading>

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center gap-4 rounded-2xl border border-berry-100 bg-paper p-5 transition hover:border-berry-600 hover:shadow-md"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-berry-50 text-berry-600">
                <c.icon className="size-6" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold text-muted">{c.label}</span>
                <span className="block break-words text-lg font-bold text-ink">{c.value}</span>
              </span>
            </a>
          ))}

          <div className="rounded-2xl bg-berry-50 p-5">
            <p className="flex items-center gap-2 font-bold text-ink">
              <MapPin className="size-5 text-berry-600" aria-hidden="true" />
              Hizmet bölgemiz
            </p>
            <p className="mt-2 text-muted">
              {SITE.baseDistrict}, {SITE.city} merkezliyiz. {DISTRICTS.join(", ")} dahil Bursa'nın tüm ilçelerine
              hizmet veriyoruz.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <QuoteForm />
        </div>
      </div>
    </section>
  );
}
