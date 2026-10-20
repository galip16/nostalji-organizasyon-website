import { MessageCircle, Phone } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

/** Mobilde ekranın altında sabit duran Ara / WhatsApp çubuğu */
export function StickyContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-berry-100 bg-paper/95 p-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(74,15,39,0.12)] backdrop-blur md:hidden">
      <a
        href={`tel:${SITE.phone}`}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-berry-600 py-3 font-bold text-white active:bg-berry-700"
      >
        <Phone className="size-5" aria-hidden="true" />
        Hemen Ara
      </a>
      <a
        href={waLink("Merhaba, organizasyonumuz için teklif almak istiyorum.")}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1fa855] py-3 font-bold text-white active:bg-[#188a45]"
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
}
