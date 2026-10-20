export const SITE = {
  name: "Nostalji Şekerleme",
  tagline: "Bursa'da nostaljik tatlar ve organizasyon hizmeti",
  description:
    "Bursa'nın tüm ilçelerinde düğün, doğum günü, anaokulu ve kurumsal etkinlikler için pamuk şeker, Osmanlı macunu, patlamış mısır, salep, şerbet ve palyaço hizmeti. 2002'den beri, ücretsiz teklif.",
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://nostalji-organizasyon-website.vercel.app"
  ).replace(/\/$/, ""),
  phone: "+905376370681",
  phoneDisplay: "0537 637 06 81",
  whatsapp: "905376370681",
  email: "bursanostaljiorganizasyon@gmail.com",
  instagram: "https://www.instagram.com/bursa_nostalji_sekerleme/",
  instagramHandle: "@bursa_nostalji_sekerleme",
  foundedYear: 2002,
  eventCount: 1500,
  city: "Bursa",
  baseDistrict: "Osmangazi",
} as const;

export const DISTRICTS = [
  "Osmangazi",
  "Nilüfer",
  "Yıldırım",
  "Mudanya",
  "Gemlik",
  "İnegöl",
  "Mustafakemalpaşa",
  "Karacabey",
  "Orhangazi",
  "Gürsu",
  "Kestel",
  "Yenişehir",
  "İznik",
  "Keles",
  "Orhaneli",
  "Harmancık",
  "Büyükorhan",
] as const;

export function waLink(text?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function yearsOfExperience() {
  return new Date().getFullYear() - SITE.foundedYear;
}

export const NAV = [
  { href: "/#hizmetler", label: "Hizmetler" },
  { href: "/#organizasyonlar", label: "Organizasyonlar" },
  { href: "/galeri", label: "Galeri" },
  { href: "/#hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
] as const;
