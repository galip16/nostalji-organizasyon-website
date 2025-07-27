export default function Contact() {
  return (
    <section id="contact" className="h-screen py-16 px-6 bg-gray-50 text-center flex flex-col justify-center">
      <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-6">
        İletişim
      </h2>
      <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
        Organizasyonlarınız için bize ulaşın!
      </p>

      <div className="flex flex-col items-center gap-4">
        <a href="tel:+905376370681" className="text-lg text-pink-600 hover:underline">
          📞 +90 537 637 06 81
        </a>
        <a href="mailto:info@organizasyon.com" className="text-lg text-pink-600 hover:underline">
          ✉️ info@organizasyon.com
        </a>
        <a
          href="https://wa.me/905376370681"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white py-3 px-6 rounded-full shadow hover:bg-green-600 transition"
        >
          WhatsApp’tan Yaz
        </a>
      </div>
    </section>
  );
}
