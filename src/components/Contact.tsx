export default function Contact() {
  return (
    <section id="contact" className="min-h-[calc(100vh-80px)] py-16 px-6 bg-gray-50 text-center flex flex-col justify-center">
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
          ✉️ bursanostaljiorganizasyon@gmail.com
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

       <div className="max-w-6xl mx-auto mt-12 text-center">
        {/* Title */}
        <h2 className="text-xl md:text-xl font-bold text-pink-600 mb-4">
          Instagram'da Bizi Takip Edin
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
          Paylaşımlarımızı kaçırmayın!
        </p>

        {/* Follow Button */}
        <a
          href="https://www.instagram.com/bursa_nostalji_sekerleme/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
          <span>@bursa_nostalji_sekerleme</span>
        </a>
      </div>
    </section>
  );
}
