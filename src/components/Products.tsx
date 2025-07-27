import pamuk from "../assets/pamuk-seker-1.jpg";
import macun from "../assets/osmanli-macunu-1.jpg";
import popcorn from "../assets/popcorn-1.jpg";
import serbet from "../assets/osmanli-serbeti-1.jpg";

const products = [
  { name: "Pamuk Şeker", img: pamuk, desc: "Rengarenk pamuk şekerlerle organizasyonlarınıza tatlı bir dokunuş katıyoruz." },
  { name: "Osmanlı Macunu", img: macun, desc: "Geleneksel Osmanlı macunu, misafirlerinize unutulmaz bir tat deneyimi yaşatır." },
  { name: "Patlamış Mısır", img: popcorn, desc: "Sıcak ve taze patlamış mısır, etkinliklerde keyifli atıştırmalık." },
  { name: "Osmanlı Şerbeti", img: serbet, desc: "Doğal malzemelerden hazırlanan Osmanlı şerbetiyle serin bir mola." },
];

export default function Products() {
  return (
    <section id="products" className="h-screen py-16 px-6 bg-pink-50">
      <div className="max-w-6xl mx-auto flex flex-col justify-center h-full">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-10">
          Ürünlerimiz
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div key={p.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform">
              <img src={p.img} alt={p.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-pink-600">{p.name}</h3>
                <p className="mt-2 text-gray-600 text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
