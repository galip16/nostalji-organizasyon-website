import { Users, Sparkles, Cake, Building2 } from "lucide-react";

export default function About() {
  return (
<section
  id="about"
  className="min-h-[calc(100vh-80px)] bg-white flex items-center justify-center py-16"
>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-8">
          Biz Kimiz?
        </h2>
        <p className="text-lg text-gray-700 mb-12">
          Yıllardır düğünler, doğum günleri, şirket etkinlikleri ve anaokulu
          organizasyonlarında <span className="font-semibold text-pink-500">nostaljik tatlar</span> sunuyoruz.
          Pamuk şeker, Osmanlı macunu, patlamış mısır, salep ve Osmanlı şerbeti gibi
          geleneksel lezzetleri modern bir dokunuşla sizlerle buluşturuyoruz.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <Users className="w-10 h-10 text-pink-500 mb-4" />
            <h3 className="font-semibold text-lg text-pink-600">Deneyim</h3>
            <p className="text-gray-600 text-sm mt-2">
              Yıllardır binlerce etkinlikte lezzetlerimizle yer aldık.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <Sparkles className="w-10 h-10 text-pink-500 mb-4" />
            <h3 className="font-semibold text-lg text-pink-600">Nostalji</h3>
            <p className="text-gray-600 text-sm mt-2">
              Geleneksel tatları modern sunumlarla buluşturuyoruz.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <Cake className="w-10 h-10 text-pink-500 mb-4" />
            <h3 className="font-semibold text-lg text-pink-600">Her An’a Uygun</h3>
            <p className="text-gray-600 text-sm mt-2">
              Düğünlerden doğum günlerine, anaokullarından şirket etkinliklerine.
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-pink-50 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <Building2 className="w-10 h-10 text-pink-500 mb-4" />
            <h3 className="font-semibold text-lg text-pink-600">Kurumsal Güven</h3>
            <p className="text-gray-600 text-sm mt-2">
              Küçük aile şirketlerinden büyük kurumlara kadar herkes için çözüm üretiyoruz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
