export default function Hero() {

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({behavior: "smooth"});
        }
    };

  return (
    <section className="relative h-[calc(100vh-80px)] flex items-center justify-center text-center">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-pink-100/40"></div>

      <div className="relative z-10 flex flex-col items-center px-6">
        <h2 className="text-4xl md:text-6xl font-extrabold text-pink-600 drop-shadow-md">
          Nostaljik Tatlarla Organizasyonlar
        </h2>
        <p className="mt-4 text-lg text-gray-800 drop-shadow">
          Düğünler, doğum günleri, şirket etkinlikleri için pamuk şeker, Osmanlı macunu, salep ve daha fazlası!
        </p>
  <button
                onClick={scrollToContact}
                className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            > Hemen İletişime Geç
            </button>
      </div>
    </section>
  );
}
