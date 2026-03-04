import { useState, useMemo } from "react";

type Breakdown = Record<string, number>;

const locationFees = {
    merkez: 0,
    ilce: 1000,
    disi: 2000,
};

const basePrices = {
    pamuk: 4000,
    macun: 3500,
    popcorn: 4000,
    serbet: 3000,
    salep: 2500,
    palyaco: 2000,
};

export default function Pricing() {

    const [time, setTime] = useState("aksam");
    const [type, setType] = useState("dugun");
    const [location, setLocation] = useState("merkez");
    const [people, setPeople] = useState(100);

    const [extraStand, setExtraStand] = useState(false);

    const [products, setProducts] = useState({
        pamuk: false,
        macun: false,
        popcorn: false,
        serbet: false,
        salep: false,
        palyaco: false,
    });

    const [palyacoCount, setPalyacoCount] = useState(1);


const calc = useMemo(() => {

  const servedPeople = extraStand ? people : Math.min(people, 400);
  const standMultiplier = extraStand ? 2 : 1;

  let breakdown: Breakdown = {};

  let standSubtotal = 0;
  let palyacoSubtotal = 0;

  /* STAND ÜRÜNLERİ */

  if (products.pamuk) {
    const price = basePrices.pamuk * standMultiplier;
    breakdown["Pamuk Şeker"] = price;
    standSubtotal += price;
  }

  if (products.macun) {
    const price = basePrices.macun * standMultiplier;
    breakdown["Osmanlı Macunu"] = price;
    standSubtotal += price;
  }

  if (products.popcorn) {
    const price = basePrices.popcorn * standMultiplier;
    breakdown["Patlamış Mısır"] = price;
    standSubtotal += price;
  }

  if (products.serbet) {
    const price =
      (basePrices.serbet + servedPeople * 15);
    breakdown["Osmanlı Şerbeti"] = price;
    standSubtotal += price;
  }

  if (products.salep) {
    const price =
      (basePrices.salep + servedPeople * 10) * standMultiplier;
    breakdown["Salep"] = price;
    standSubtotal += price;
  }

  /* PALYAÇO */

  if (products.palyaco) {
    palyacoSubtotal = palyacoCount * basePrices.palyaco;
    breakdown["Palyaço"] = palyacoSubtotal;
  }

  /* YOL */

  const road = locationFees[location as keyof typeof locationFees];
  breakdown["Yol Ücreti"] = road;

  /* STAND ÜRÜN SAYISI */

  const standProductCount = [
    products.pamuk,
    products.macun,
    products.popcorn,
    products.serbet,
    products.salep
  ].filter(Boolean).length;

  /* ÜRÜN İNDİRİMİ */

  let standDiscountRate = 0;

  if (standProductCount >= 3) standDiscountRate += 0.10;
  else if (standProductCount >= 2) standDiscountRate += 0.05;

  if (standMultiplier === 2 && standProductCount > 0)
    standDiscountRate += 0.05;

  if (time !== "aksam")
    standDiscountRate += 0.05;

  const standDiscount = standSubtotal * standDiscountRate;

  /* PALYAÇO İNDİRİMİ */

  let palyacoDiscount = 0;

  if (products.palyaco && palyacoCount >= 2) {
    palyacoDiscount = palyacoSubtotal * 0.05;
  }

  const subtotal =
    standSubtotal +
    palyacoSubtotal +
    road;

  const totalDiscount =
    standDiscount +
    palyacoDiscount;

  const total =
    subtotal -
    totalDiscount;

  return {
    breakdown,
    subtotal,
    totalDiscount,
    total,
  };

}, [
  products,
  people,
  location,
  palyacoCount,
  extraStand,
  time
]);

    const toggleProduct = (key: keyof typeof products) => {
        setProducts({
            ...products,
            [key]: !products[key],
        });
    };

    return (
        <section id="pricing" className="min-h-screen bg-pink-50 py-16 px-6">

            <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow">

                <h1 className="text-3xl font-bold text-pink-600 mb-10 text-center">
                    Organizasyon Fiyat Hesaplama
                </h1>

                {/* ZAMAN */}

                <div className="mb-6">
                    <h2 className="font-semibold mb-2">Organizasyon Zamanı</h2>

                    <select
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="sabah">Sabah</option>
                        <option value="ogle">Öğle</option>
                        <option value="aksam">Akşam</option>
                    </select>

                    <p className="text-sm text-gray-500 mt-1">
                        Gündüz organizasyonlarında %5 indirim uygulanır.
                    </p>
                </div>

                {/* TÜR */}

                <div className="mb-6">
                    <h2 className="font-semibold mb-2">Organizasyon Türü</h2>

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="dugun">Düğün</option>
                        <option value="sirket">Şirket Etkinliği</option>
                        <option value="anaokulu">Anaokulu Etkinliği</option>
                        <option value="senlik">Şenlik</option>
                        <option value="festival">Festival</option>
                    </select>
                </div>

                {/* YER */}

                <div className="mb-6">
                    <h2 className="font-semibold mb-2">Organizasyon Yeri</h2>

                    <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="border p-2 rounded w-full"
                    >
                        <option value="merkez">Bursa Merkez</option>
                        <option value="ilce">Bursa İlçeleri (+1000)</option>
                        <option value="disi">Bursa Dışı (+2000)</option>
                    </select>
                </div>

                {/* KİŞİ */}

                <div className="mb-6">
                    <h2 className="font-semibold mb-2">Kişi Sayısı</h2>

                    <input
                        type="number"
                        value={people}
                        onChange={(e) => setPeople(Number(e.target.value))}
                        className="border p-2 rounded w-full"
                        max={1000}
                        onKeyDown={()=> people > 1000 && setPeople(1000) }
                    />

                    {people > 400 && !extraStand && (
                        <p className="text-red-500 text-sm mt-2">
                            Tek stand maksimum 400 kişiye servis yapabilir.
                            Hesaplama 400 kişi üzerinden yapılacaktır.
                        </p>
                    )}
                </div>

                {/* EK STAND */}

                {people > 400 && (

                    <div className="mb-6">

                        <label className="flex gap-2 items-center">

                            <input
                                type="checkbox"
                                checked={extraStand}
                                onChange={() => setExtraStand(!extraStand)}
                            />

                            İkinci Stand Ekle (Fiyat iki katına çıkar)

                        </label>

                    </div>

                )}

                {/* ÜRÜNLER */}

                <div className="mb-8">

                    <h2 className="font-semibold mb-4">
                        Hangi ürünleri talep ediyorsunuz?
                    </h2>

                    <div className="grid grid-cols-2 gap-3">

                        {Object.keys(products).map((key) => (

                            <label
                                key={key}
                                className="flex gap-2 items-center border p-2 rounded"
                            >

                                <input
                                    type="checkbox"
                                    checked={products[key as keyof typeof products]}
                                    onChange={() =>
                                        toggleProduct(key as keyof typeof products)
                                    }
                                />

                                {key}

                            </label>

                        ))}

                    </div>

                </div>

                {/* PALYAÇO */}

                {products.palyaco && (

                    <div className="mb-8">

                        <h2 className="font-semibold mb-2">
                            Kaç Palyaço İstiyorsunuz?
                        </h2>

                        <input
                            type="number"
                            value={palyacoCount}
                            onChange={(e) =>
                                setPalyacoCount(Number(e.target.value))
                            }
                            className="border p-2 rounded w-full"
                        />

                        <p className="text-sm text-gray-500 mt-1">
                            2 veya daha fazla palyaçoda %5 indirim uygulanır.
                        </p>

                    </div>

                )}

                {/* FİYAT ÖZETİ */}

                <div className="bg-pink-50 p-6 rounded-xl">

                    <h2 className="text-xl font-semibold mb-4">
                        Fiyat Özeti
                    </h2>

                    {Object.entries(calc.breakdown).map(([k, v]) => (

                        <div
                            key={k}
                            className="flex justify-between text-sm mb-1"
                        >

                            <span>{k}</span>
                            <span>{v} TL</span>

                        </div>

                    ))}

                    <hr className="my-3" />

                    <div className="flex justify-between">
                        <span>Ara Toplam</span>
                        <span>{calc.subtotal.toFixed(0)} TL</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                        <span>İndirim</span>
                        <span>-{calc.totalDiscount.toFixed(0)} TL</span>
                    </div>

                    <div className="flex justify-between text-xl font-bold text-pink-600 mt-3">
                        <span>Toplam</span>
                        <span>{calc.total.toFixed(0)} TL</span>
                    </div>

                    {calc.total > 14000 && <span> Detaylar ve ekstra indirimler icin lütfen bizimle iletisim gecin.. </span>}

                </div>

            </div>

        </section>
    );
}