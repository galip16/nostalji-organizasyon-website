export default function About() {
  return (
    <section
      id="about"
      className="h-screen flex flex-col justify-center py-16 px-6 bg-white text-center"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">
          Biz Kimiz?
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Yıllardır düğünler, doğum günleri, şirket etkinlikleri ve anaokulu organizasyonlarında
          nostaljik tatlar sunuyoruz. Pamuk şeker, Osmanlı macunu, patlamış mısır,
          salep ve Osmanlı şerbeti gibi geleneksel lezzetleri modern bir dokunuşla sizlerle buluşturuyoruz.
        </p>
      </div>
    </section>
  );
}
