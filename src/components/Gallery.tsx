import { useState } from "react";
import { X } from "lucide-react";
import pamukSeker from "../assets/pamuk-seker-3.jpg";
import popcorn from "../assets/popcorn-2.jpg";
import serbet from "../assets/osmanli-serbeti-2.jpg";
import macun from "../assets/osmanli-macunu-2.jpg";
import palyaco from "../assets/palyaco-2.png";
import salep from "../assets/salep-2.png";

const galleryItems = [
  {
    id: 1,
    thumbnail: pamukSeker,
    title: "Pamuk Şeker",
    desc: "Rengarenk pamuk şekerlerle organizasyonlarınıza tatlı bir dokunuş",
    videoUrl: "/videos/pamuk-seker.mp4",
  },
  {
    id: 2,
    thumbnail: macun,
    title: "Osmanlı Macunu",
    desc: "Geleneksel lezzetle misafirlerinize unutulmaz bir tat deneyimi",
    videoUrl: "/videos/osmanli-macunu.mp4",
  },
  {
    id: 3,
    thumbnail: popcorn,
    title: "Patlamış Mısır",
    desc: "Sıcak ve taze patlamış mısır ile keyifli atıştırmalık",
    videoUrl: "/videos/misir.mp4",
  },
  {
    id: 4,
    thumbnail: serbet,
    title: "Osmanlı Şerbeti",
    desc: "Doğal malzemelerden hazırlanan geleneksel şerbet",
    videoUrl: "/videos/serbet.mp4",
  },
  {
    id: 5,
    thumbnail: palyaco,
    title: "Palyaço",
    desc: "Yüz boyama ve eğlenceli gösterilerle unutulmaz anlar",
    videoUrl: "/videos/palyaco.mp4",
  },
  {
    id: 6,
    thumbnail: salep,
    title: "Salep",
    desc: "Sıcak ve doğal salep ikramıyla kış havası",
    videoUrl: "/videos/salep.mp4",
  },
];

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<
    typeof galleryItems[0] | null
  >(null);

  return (
    <section
      id="gallery"
      className="min-h-[calc(100vh-80px)] bg-pink-50 flex items-center"
    >
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-0">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-pink-600 mt-8 mb-8 md:mt-8 md:mb-12 lg:mt-0 lg:mb-12">
          Galeri
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {galleryItems.map((item) => (
            <GalleryCard
              key={item.id}
              item={item}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>
      </div>

      {selectedItem && (
        <VideoModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </section>
  );
}

type GalleryItem = {
  id: number;
  thumbnail: string;
  title: string;
  desc: string;
  videoUrl: string;
};

function GalleryCard({
  item,
  onClick,
}: {
  item: GalleryItem;
  onClick: () => void;
}) {
  return (
    <div
      // onClick={onClick} // active it after creating video files
      className="bg-white p-2 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform cursor-pointer flex flex-col h-full"
    >
      <h3 className="text-lg text-center font-semibold text-pink-600 pb-2 ">{item.title}</h3>
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full aspect-[4/3] object-cover rounded-xl"
      />
    </div>
  );
}

function VideoModal({
  item,
  onClose,
}: {
  item: GalleryItem;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:opacity-70 transition-opacity"
        >
          <X size={40} />
        </button>

        <h3 className="text-white text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
          {item.title}
        </h3>

        <div className="relative w-full rounded-xl overflow-hidden">
          <video
            className="w-full h-auto"
            src={item.videoUrl}
            controls
            autoPlay
            playsInline
          />
        </div>

        <p className="text-white/90 text-center mt-4 sm:mt-6 px-2">
          {item.desc}
        </p>
      </div>
    </div>
  );
}
