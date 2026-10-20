export type EventType = {
  slug: string;
  name: string;
  h1: string;
  summary: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  intro: string[];
  recommended: string[]; // service slugs
  seoTitle: string;
  seoDescription: string;
};

export const EVENTS: EventType[] = [
  {
    slug: "dugun",
    name: "Düğün, Nişan ve Kına",
    h1: "Bursa'da Düğün, Nişan ve Kına İçin Nostaljik İkramlar",
    summary: "Misafirlerinizin hem tadını hem hatırasını unutmayacağı nostaljik ikram köşeleri.",
    image: "/images/osmanli-serbeti-1.webp",
    imageWidth: 1600,
    imageHeight: 1600,
    imageAlt: "Osmanlı şerbetçisi ve çarşı atmosferi",
    intro: [
      "Düğün, nişan ve kına gibi özel günlerde klasik ikramların yanına nostaljik bir köşe eklemek, misafirlerinize farklı bir deneyim yaşatır. Osmanlı macunu, şerbet, salep ve pamuk şeker; hem tat hem görsel olarak davetinize renk katar.",
      "Bursa'nın tüm ilçelerinde, mekânınızın düzenine ve davetli sayınıza göre size özel plan hazırlıyoruz.",
    ],
    recommended: ["osmanli-macunu", "osmanli-serbeti", "salep", "pamuk-seker"],
    seoTitle: "Bursa Düğün ve Nişan Organizasyonu İkramları",
    seoDescription:
      "Bursa'da düğün, nişan ve kınada Osmanlı macunu, şerbet, salep ve pamuk şeker ikramı. Tüm ilçelere hizmet, 2002'den beri. Ücretsiz teklif alın.",
  },
  {
    slug: "dogum-gunu",
    name: "Doğum Günü",
    h1: "Bursa'da Doğum Günü Organizasyonu: Pamuk Şeker, Mısır ve Palyaço",
    summary: "Çocukların en çok seveceği ikramlar ve eğlence tek pakette.",
    image: "/images/palyaco-1.webp",
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: "Palyaço ve çocuklar doğum günü eğlencesinde",
    intro: [
      "Doğum günü partisinde çocukların en çok bahsettiği şeyler genellikle pamuk şeker, patlamış mısır ve palyaço olur. Bunları tek teklifte toplayıp programı davetli sayınıza göre planlıyoruz.",
      "Evde, salonda ya da bahçede; Bursa'nın tüm ilçelerinde doğum günü organizasyonunuzda yanınızdayız.",
    ],
    recommended: ["pamuk-seker", "patlamis-misir", "palyaco", "osmanli-macunu"],
    seoTitle: "Bursa Doğum Günü Organizasyonu",
    seoDescription:
      "Bursa'da çocuk doğum günleri için pamuk şeker, patlamış mısır, Osmanlı macunu ve palyaço hizmeti. Tüm ilçelere geliyoruz. Ücretsiz teklif alın.",
  },
  {
    slug: "kurumsal",
    name: "Kurumsal Etkinlik ve Açılış",
    h1: "Bursa'da Kurumsal Etkinlik ve Açılışlar İçin Nostaljik İkramlar",
    summary: "Açılış, lansman ve şirket etkinliklerinde misafirlerin hatırlayacağı farklı bir ikram.",
    image: "/images/osmanli-macunu-2.webp",
    imageWidth: 786,
    imageHeight: 577,
    imageAlt: "Osmanlı macunu tezgâhı",
    intro: [
      "Açılış, lansman, personel günü ve aile pikniği gibi kurumsal etkinliklerde nostaljik ikramlar ilgi çeker ve etkinliğinizi akılda kalıcı kılar. Marka renklerinize ve etkinlik temasına göre planlama yapabiliriz.",
      "Küçük işletmelerden büyük kurumlara kadar Bursa'daki tüm ilçelerde hizmet veriyoruz.",
    ],
    recommended: ["pamuk-seker", "osmanli-macunu", "salep", "osmanli-serbeti", "patlamis-misir"],
    seoTitle: "Bursa Kurumsal Etkinlik ve Açılış Organizasyonu",
    seoDescription:
      "Bursa'da açılış, lansman ve kurumsal etkinlikler için pamuk şeker, Osmanlı macunu, salep ve şerbet ikramı. Tüm ilçelere hizmet. Hemen teklif alın.",
  },
  {
    slug: "anaokulu",
    name: "Anaokulu ve Okul Etkinlikleri",
    h1: "Bursa'da Anaokulu ve Okul Etkinlikleri İçin Eğlence ve İkram",
    summary: "Okul şenliği, yıl sonu ve özel gün etkinlikleri için çocukların sevdiği ikramlar.",
    image: "/images/pamuk-seker-1.webp",
    imageWidth: 1064,
    imageHeight: 1600,
    imageAlt: "Pamuk şeker yiyen çocuk ve veli",
    intro: [
      "Anaokulu ve okul etkinliklerinde çocukların yüzünü güldüren ikramlar ve eğlence, etkinliğin en güzel anılarından biri olur. Pamuk şeker, patlamış mısır ve palyaço ile yüz boyama; yıl sonu şenliği, 23 Nisan ve özel günler için tercih ediliyor.",
      "Bursa'nın tüm ilçelerindeki okul ve anaokullarına, öğrenci sayısına göre planlama yaparak hizmet veriyoruz.",
    ],
    recommended: ["pamuk-seker", "patlamis-misir", "palyaco"],
    seoTitle: "Bursa Anaokulu ve Okul Etkinliği Organizasyonu",
    seoDescription:
      "Bursa'da anaokulu ve okul şenlikleri için pamuk şeker, patlamış mısır, palyaço ve yüz boyama. Tüm ilçelere geliyoruz. Ücretsiz teklif alın.",
  },
];

export const getEvent = (slug: string) => EVENTS.find((e) => e.slug === slug);

export const GENERAL_FAQ = [
  {
    q: "Bursa'nın hangi ilçelerine hizmet veriyorsunuz?",
    a: "Bursa'nın tüm ilçelerinde hizmet veriyoruz: Osmangazi, Nilüfer, Yıldırım, Mudanya, Gemlik, İnegöl, Mustafakemalpaşa, Karacabey, Orhangazi ve diğer tüm ilçeler.",
  },
  {
    q: "Fiyatlar nasıl belirleniyor?",
    a: "Fiyat; seçtiğiniz ürünlere, davetli sayısına, etkinliğin süresine ve mekâna göre değişiyor. Bu yüzden her etkinlik için ayrı ve ücretsiz teklif hazırlıyoruz. Telefon veya WhatsApp'tan bilgi vermeniz yeterli.",
  },
  {
    q: "Teklif almak için neye ihtiyacınız var?",
    a: "Etkinlik tarihi, ilçe/mekân, yaklaşık davetli sayısı ve istediğiniz ürünler. Bunları WhatsApp'tan yazmanız ya da sitedeki formu doldurmanız yeterli.",
  },
  {
    q: "Ne kadar önceden rezervasyon yaptırmalıyım?",
    a: "Tarihinizin müsait olup olmadığını öğrenmek için tarihi kesinleştirir kesinleştirmez bize ulaşmanızı öneririz. Hafta sonları ve yoğun dönemlerde takvimimiz hızlı doluyor.",
  },
  {
    q: "Birden fazla ürünü bir arada alabilir miyim?",
    a: "Evet. Pamuk şeker, Osmanlı macunu, patlamış mısır, salep, şerbet ve palyaço hizmetini tek teklifte birleştirebiliyoruz.",
  },
  {
    q: "Ne zamandan beri hizmet veriyorsunuz?",
    a: "2002'den beri Bursa'da hizmet veriyoruz. Bugüne kadar yaklaşık 1500 organizasyonda görev aldık.",
  },
];
