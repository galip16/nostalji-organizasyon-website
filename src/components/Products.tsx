import { useState, useEffect, useRef } from "react";
import pamuk from "../assets/pamuk-seker-1.jpg";
import macun from "../assets/osmanli-macunu-1.png";
import popcorn from "../assets/popcorn-1.jpg";
import serbet from "../assets/osmanli-serbeti-1.jpg";
import palyaco from "../assets/palyaco-1.png";
import salep from "../assets/salep-1.png";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* Products Data */
const products = [
  {
    name: "Pamuk Şeker",
    img: pamuk,
    desc: "Rengarenk pamuk şekerlerle organizasyonlarınıza tatlı bir dokunuş katıyoruz.",
  },
  {
    name: "Osmanlı Macunu",
    img: macun,
    desc: "Geleneksel Osmanlı macunu, misafirlerinize unutulmaz bir tat deneyimi yaşatır.",
  },
  {
    name: "Patlamış Mısır",
    img: popcorn,
    desc: "Sıcak ve taze patlamış mısır, etkinliklerde keyifli atıştırmalık.",
  },
  {
    name: "Osmanlı Şerbeti",
    img: serbet,
    desc: "Doğal malzemelerden hazırlanan Osmanlı şerbetiyle serin bir mola.",
  },
  {
    name: "Palyaço",
    img: palyaco,
    desc: "Yüz boyama ve birçok eğlenceli gösteriyle çocuklara unutulmaz anlar yaşatıyoruz.",
  },
  {
    name: "Salep",
    img: salep,
    desc: "Sıcak ve doğal salep ikramıyla etkinliklerinize kış havası katıyoruz.",
  },
];

export default function Products() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  /* Screen Size Listener */
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setIsMobile(true);
        setVisibleCount(1);
      } else if (width < 1024) {
        setIsMobile(false);
        setVisibleCount(2);
      } else {
        setIsMobile(false);
        setVisibleCount(3);
      }

      setIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* Auto Slide */
  const startAutoSlide = () => {
    if (isMobile) return;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setIndex((prev) =>
        (prev + 1) % (products.length - visibleCount + 1)
      );
    }, 3000);
  };

  /* Start on Mount */
  useEffect(() => {
    startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [visibleCount, isMobile]);

  /* Controls */
  const handlePrev = () => {
    setIndex((prev) => Math.max(prev - 1, 0));
    startAutoSlide();
  };

  const handleNext = () => {
    setIndex((prev) =>
      Math.min(prev + 1, products.length - visibleCount)
    );
    startAutoSlide();
  };

  return (
    <section
      id="products"
      className="min-h-[calc(100vh-80px)] py-16 px-6 bg-pink-50"
    >
      <div className="max-w-6xl mt-8 mx-auto flex flex-col justify-center">

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mb-10">
          Ürünlerimiz
        </h2>

        <div className="relative">

          {/* LEFT ARROW (Not Mobile) */}
          {!isMobile && (
            <button
              onClick={handlePrev}
              disabled={index === 0}
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-pink-100 disabled:opacity-50 z-10"
            >
              <ChevronLeft size={28} />
            </button>
          )}

          {/* MOBILE LIST */}
          {isMobile ? (
            <div className="grid grid-cols-1 gap-6">
              {products.map((p) => (
                <ProductCard key={p.name} product={p} />
              ))}
            </div>
          ) : (
            /* SLIDER */
            <div
              className="overflow-hidden"
              onMouseEnter={() =>
                intervalRef.current &&
                clearInterval(intervalRef.current)
              }
              onMouseLeave={startAutoSlide}
            >
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${
                    (index * 100) / visibleCount
                  }%)`,
                }}
              >
                {products.map((p) => (
                  <div
                    key={p.name}
                    className="flex-none px-3"
                    style={{ width: `${100 / visibleCount}%` }}
                  >
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RIGHT ARROW (Not Mobile) */}
          {!isMobile && (
            <button
              onClick={handleNext}
              disabled={index >= products.length - visibleCount}
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-pink-100 disabled:opacity-50 z-10"
            >
              <ChevronRight size={28} />
            </button>
          )}

        </div>
      </div>
    </section>
  );
}

/* Card Component */

type Product = {
  name: string;
  img: string;
  desc: string;
};

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform flex flex-col h-full">

      <img
        src={product.img}
        alt={product.name}
        className="w-full aspect-[4/3] object-cover"
      />

      <div className="p-4 flex flex-col flex-1">

        <h3 className="text-lg font-semibold text-pink-600">
          {product.name}
        </h3>

        <p className="mt-2 text-gray-600 text-sm flex-1">
          {product.desc}
        </p>

      </div>
    </div>
  );
}
