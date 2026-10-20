import { DISTRICTS, SITE } from "./site";

export const abs = (path: string) => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    image: abs("/opengraph-image.jpg"),
    logo: abs("/logo.png"),
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: String(SITE.foundedYear),
    // Ev adresi olduğu için açık adres yayınlanmıyor; sadece bölge bilgisi var.
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.baseDistrict,
      addressRegion: SITE.city,
      addressCountry: "TR",
    },
    areaServed: [
      { "@type": "City", name: SITE.city },
      ...DISTRICTS.map((d) => ({ "@type": "AdministrativeArea", name: `${d}, ${SITE.city}` })),
    ],
    sameAs: [SITE.instagram],
    knowsAbout: [
      "Pamuk şeker",
      "Osmanlı macunu",
      "Patlamış mısır",
      "Salep",
      "Osmanlı şerbeti",
      "Palyaço ve yüz boyama",
      "Düğün ve doğum günü organizasyonu",
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceJsonLd(opts: { name: string; description: string; path: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: abs(opts.path),
    image: abs(opts.image),
    provider: { "@id": `${SITE.url}/#business` },
    areaServed: { "@type": "City", name: SITE.city },
  };
}
