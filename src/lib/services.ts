export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  h1: string;
  summary: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  intro: string[];
  highlights: string[];
  suits: string[];
  seoTitle: string;
  seoDescription: string;
  faq: Faq[];
};

export const SERVICES: Service[] = [
  {
    slug: "pamuk-seker",
    name: "Pamuk Şeker",
    h1: "Bursa'da Pamuk Şeker Organizasyonu",
    summary:
      "Çocukların da büyüklerin de vazgeçilmezi: mekânınızda anında hazırlanan rengarenk pamuk şeker.",
    image: "/images/pamuk-seker-3.webp",
    imageWidth: 1065,
    imageHeight: 1600,
    imageAlt: "Pamuk şekerini yiyip gülen çocuk",
    intro: [
      "Pamuk şeker, hangi organizasyonda olursa olsun ilk akla gelen nostaljik tatlardan biri. Misafirleriniz daha şeker hazırlanırken etrafa toplanır; hem tatlı hem de gösteri gibi bir ikram olur.",
      "Bursa'nın tüm ilçelerinde, 2002'den beri düğün, doğum günü, anaokulu ve şirket etkinliklerinde pamuk şeker hizmeti veriyoruz. Davetli sayınıza ve etkinliğin süresine göre size özel bir teklif hazırlıyoruz.",
    ],
    highlights: [
      "Misafirlerin gözü önünde taze hazırlanır",
      "Renk ve lezzet seçenekleri etkinliğin temasına göre belirlenir",
      "Çocuk ve yetişkin her yaş grubunda ilgi görür",
      "Diğer nostaljik tatlarla birlikte paket yapılabilir",
    ],
    suits: ["Doğum günü", "Anaokulu ve okul etkinliği", "Düğün ve nişan", "Kurumsal etkinlik"],
    seoTitle: "Bursa Pamuk Şeker Organizasyonu",
    seoDescription:
      "Bursa'da düğün, doğum günü, anaokulu ve kurumsal etkinlikler için pamuk şeker hizmeti. Tüm ilçelere geliyoruz, 2002'den beri. Ücretsiz teklif için arayın.",
    faq: [
      {
        q: "Pamuk şeker hizmeti için ne kadar önceden haber vermeliyim?",
        a: "Etkinlik tarihinizin müsait olup olmadığını öğrenmek için tarihi kesinleştirir kesinleştirmez bize yazmanızı öneririz. Hafta sonları ve sezon dönemlerinde takvimimiz hızlı dolabiliyor.",
      },
      {
        q: "Pamuk şekeri başka ürünlerle birlikte alabilir miyim?",
        a: "Evet. Pamuk şeker; patlamış mısır, Osmanlı macunu, salep ve şerbet gibi diğer ürünlerimizle birlikte tek bir teklifte planlanabilir.",
      },
    ],
  },
  {
    slug: "osmanli-macunu",
    name: "Osmanlı Macunu",
    h1: "Bursa'da Osmanlı Macunu İkramı",
    summary:
      "Geleneksel renkli macunlar, çubuklarıyla birlikte misafirlerinize yüzyıllık bir lezzet yaşatır.",
    image: "/images/osmanli-macunu-2.webp",
    imageWidth: 786,
    imageHeight: 577,
    imageAlt: "Osmanlı macunu tezgâhında renkli macunlar",
    intro: [
      "Osmanlı macunu, renkli ve çubuğa sarılarak sunulan geleneksel bir tat. Tezgâhı başında hazırlandığı için ister istemez herkesin dikkatini çeker ve etkinliğinize nostaljik bir hava katar.",
      "Bursa ve çevre ilçelerde düğün, nişan, kına, açılış ve çocuk etkinliklerinde macun hizmeti veriyoruz. Etkinliğinizin büyüklüğüne ve temasına göre planlıyoruz.",
    ],
    highlights: [
      "Misafirler için gösterisi de olan bir ikram",
      "Geleneksel görünümüyle fotoğraflarda öne çıkar",
      "Her yaştan misafirin ilgisini çeker",
      "Salep ve şerbetle birlikte tam bir nostalji köşesi kurulabilir",
    ],
    suits: ["Düğün, nişan ve kına", "Kurumsal açılış", "Doğum günü", "Okul ve anaokulu etkinliği"],
    seoTitle: "Bursa Osmanlı Macunu Organizasyonu",
    seoDescription:
      "Bursa'da düğün, nişan, açılış ve doğum günlerinde Osmanlı macunu ikramı. Tüm ilçelere hizmet, 2002'den beri deneyim. Hemen ücretsiz teklif alın.",
    faq: [
      {
        q: "Osmanlı macunu hangi etkinliklerde tercih ediliyor?",
        a: "Düğün, nişan, kına, açılış töreni, doğum günü ve okul etkinliklerinde sıkça tercih ediliyor. Misafirlerin hem tadına hem de hazırlanışına ilgi gösterdiği bir ikram.",
      },
      {
        q: "Macunu salep ve şerbetle birlikte isteyebilir miyim?",
        a: "Elbette. Macun, salep ve şerbeti bir arada planlayarak etkinliğinize tek bir 'nostalji köşesi' kurabiliriz.",
      },
    ],
  },
  {
    slug: "patlamis-misir",
    name: "Patlamış Mısır",
    h1: "Bursa'da Patlamış Mısır Organizasyonu",
    summary:
      "Sıcak, taze patlamış mısır ve şık kutularıyla etkinliklerin en sevilen atıştırmalığı.",
    image: "/images/popcorn-1.webp",
    imageWidth: 1600,
    imageHeight: 1067,
    imageAlt: "Kırmızı beyaz kutularda patlamış mısır",
    intro: [
      "Patlamış mısır, kalabalık etkinliklerde en pratik ve en sevilen ikramlardan biri. Kırmızı beyaz kutularında, sıcak sıcak servis edildiğinde hem çocukları hem büyükleri mutlu ediyor.",
      "Bursa'nın tüm ilçelerinde doğum günü, anaokulu, okul şenliği, düğün ve şirket etkinliklerinde patlamış mısır hizmeti veriyoruz.",
    ],
    highlights: [
      "Sıcak ve taze servis",
      "Şık kutularla hem pratik hem görsel bir ikram",
      "Kalabalık davetlilerde hızlı servis",
      "Pamuk şekerle birlikte klasik bir ikili",
    ],
    suits: ["Doğum günü", "Okul şenliği", "Kurumsal etkinlik", "Düğün ve nişan"],
    seoTitle: "Bursa Patlamış Mısır Organizasyonu",
    seoDescription:
      "Bursa'da doğum günü, okul şenliği, düğün ve kurumsal etkinlikler için sıcak patlamış mısır hizmeti. Tüm ilçelere geliyoruz. Ücretsiz teklif alın.",
    faq: [
      {
        q: "Kalabalık etkinliklerde patlamış mısır yetişir mi?",
        a: "Davetli sayınızı ve etkinlik süresini bize söylemeniz yeterli. Buna göre planlama yapıyoruz ve teklifinizi hazırlıyoruz.",
      },
      {
        q: "Okul ve anaokulu etkinliklerine geliyor musunuz?",
        a: "Evet, Bursa'nın tüm ilçelerindeki anaokulu ve okul etkinliklerine hizmet veriyoruz.",
      },
    ],
  },
  {
    slug: "osmanli-serbeti",
    name: "Osmanlı Şerbeti",
    h1: "Bursa'da Osmanlı Şerbeti İkramı",
    summary:
      "Geleneksel şerbetçi dokunuşuyla sunulan, serinleten ve nostalji katan bir ikram.",
    image: "/images/osmanli-serbeti-1.webp",
    imageWidth: 1600,
    imageHeight: 1600,
    imageAlt: "Osmanlı şerbetçisi çocuğa şerbet ikram ediyor",
    intro: [
      "Osmanlı şerbeti, etkinliklere hem serinlik hem de eski İstanbul ve Bursa çarşılarının havasını getirir. Geleneksel sunumuyla misafirlerinizin en çok konuşacağı ikramlardan biri olur.",
      "Düğün, nişan, açılış ve kurumsal etkinliklerinizde Bursa'nın tüm ilçelerinde şerbet hizmeti veriyoruz.",
    ],
    highlights: [
      "Geleneksel sunum ve görünüm",
      "Sıcak havalarda serinletici bir ikram",
      "Etkinliğe temalı bir atmosfer katar",
      "Macun ve salep ile birlikte planlanabilir",
    ],
    suits: ["Düğün ve nişan", "Kurumsal etkinlik ve açılış", "Bayram ve festival etkinlikleri"],
    seoTitle: "Bursa Osmanlı Şerbeti Organizasyonu",
    seoDescription:
      "Bursa'da düğün, açılış ve kurumsal etkinliklerde geleneksel Osmanlı şerbeti ikramı. Tüm ilçelere hizmet, 2002'den beri. Ücretsiz teklif için yazın.",
    faq: [
      {
        q: "Osmanlı şerbeti hangi mevsimde tercih ediliyor?",
        a: "Yaz aylarında serinletici olarak, diğer mevsimlerde ise nostaljik bir ikram olarak her dönem tercih edilebiliyor.",
      },
      {
        q: "Şerbeti etkinlik temasına uygun sunabilir misiniz?",
        a: "Etkinliğinizin konseptini ve mekânı bize anlatın, sunumu buna uygun planlayalım.",
      },
    ],
  },
  {
    slug: "salep",
    name: "Salep",
    h1: "Bursa'da Salep İkramı",
    summary:
      "Kış etkinliklerinin yıldızı: bol tarçınlı, sıcak sıcak sunulan geleneksel salep.",
    image: "/images/salep-1.webp",
    imageWidth: 1024,
    imageHeight: 1536,
    imageAlt: "Tarçınlı sıcak salep fincanı",
    intro: [
      "Soğuk günlerde sıcak bir fincan salepten güzeli yoktur. Salep ikramı; açılış, düğün, kına ve kış organizasyonlarında misafirlerinizi ısıtır ve etkinliğe sıcak bir hava katar.",
      "Bursa'nın tüm ilçelerinde düğün, açılış, okul ve kurumsal etkinliklerde salep hizmeti veriyoruz.",
    ],
    highlights: [
      "Sıcak ve tarçınla servis",
      "Soğuk havalarda en çok tercih edilen ikramlardan",
      "Geleneksel görünümüyle şık bir sunum",
      "Osmanlı macunuyla birlikte nostaljik bir köşe oluşturur",
    ],
    suits: ["Kış düğünleri ve kına", "Açılış ve kurumsal etkinlik", "Okul ve belediye etkinlikleri"],
    seoTitle: "Bursa Salep Organizasyonu",
    seoDescription:
      "Bursa'da kış etkinlikleri, düğün, açılış ve kurumsal organizasyonlar için sıcak salep ikramı. Tüm ilçelere hizmet. Hemen ücretsiz teklif alın.",
    faq: [
      {
        q: "Salep hizmeti sadece kış aylarında mı veriliyor?",
        a: "Salep en çok soğuk havalarda tercih ediliyor, ancak klimalı mekânlardaki etkinlikler için yılın her döneminde planlama yapabiliriz.",
      },
      {
        q: "Salep ile hangi ikramlar birlikte tercih ediliyor?",
        a: "Genellikle Osmanlı macunu ve patlamış mısırla birlikte, kış etkinliklerine uygun bir paket olarak tercih ediliyor.",
      },
    ],
  },
  {
    slug: "palyaco",
    name: "Palyaço ve Yüz Boyama",
    h1: "Bursa'da Palyaço ve Yüz Boyama Hizmeti",
    summary:
      "Yüz boyama ve eğlenceli gösterilerle çocukların unutamayacağı anlar.",
    image: "/images/palyaco-1.webp",
    imageWidth: 1536,
    imageHeight: 1024,
    imageAlt: "Palyaço, çocuğun yüzünü boyuyor",
    intro: [
      "Palyaço ve yüz boyama, çocuk etkinliklerinin en sevilen parçası. Çocuklar sıraya girip yüzlerini boyatır, gösterilerle eğlenir ve etkinlik boyunca hareketli bir atmosfer oluşur.",
      "Bursa'nın tüm ilçelerinde doğum günü, anaokulu, okul şenliği ve düğün çocuk köşelerinde palyaço ve yüz boyama hizmeti veriyoruz.",
    ],
    highlights: [
      "Çocuklar için yüz boyama",
      "Eğlenceli gösteri ve etkileşim",
      "Pamuk şeker ve mısırla birlikte komple bir çocuk programı",
      "Doğum günü, anaokulu ve düğün çocuk alanları için uygun",
    ],
    suits: ["Doğum günü", "Anaokulu ve okul etkinliği", "Düğünlerde çocuk köşesi"],
    seoTitle: "Bursa Palyaço ve Yüz Boyama Hizmeti",
    seoDescription:
      "Bursa'da doğum günü, anaokulu ve düğünler için palyaço ve yüz boyama hizmeti. Tüm ilçelere geliyoruz. Ücretsiz teklif için hemen arayın.",
    faq: [
      {
        q: "Palyaço ve yüz boyama hangi yaş grubuna uygun?",
        a: "Genellikle okul öncesi ve ilkokul çağındaki çocuklar için tercih ediliyor. Yaş grubunuzu söylerseniz programı ona göre planlayalım.",
      },
      {
        q: "Palyaço hizmetini pamuk şeker ve mısırla birlikte alabilir miyim?",
        a: "Evet. Çocuk etkinlikleri için pamuk şeker, patlamış mısır ve palyaço hizmetini tek teklifte birleştirebiliyoruz.",
      },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
