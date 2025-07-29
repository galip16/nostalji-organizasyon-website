export default function Hero() {

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };
    return (
        <section
            id="home"
            className="h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-pink-100 text-center"
        >
            <h2 className="text-4xl md:text-6xl font-extrabold text-pink-600">
                Nostaljik Tatlarla Organizasyonlar
            </h2>
            <p className="mt-4 text-lg text-gray-700">
                Düğünler, doğum günleri, şirket etkinlikleri için pamuk şeker, Osmanlı macunu, salep ve daha fazlası!
            </p>
            <button
                onClick={scrollToContact}
                className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600"
            > Hemen İletişime Geç
            </button>
        </section>
    );
}
