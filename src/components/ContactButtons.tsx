import { MessageCircle, Phone } from "lucide-react";
import { SITE, waLink } from "@/lib/site";

type Props = {
  message?: string;
  size?: "md" | "lg";
  className?: string;
  /** Koyu zeminlerde arama butonunu beyaz yapar */
  tone?: "light" | "dark";
};

export function ContactButtons({
  message = "Merhaba, organizasyonumuz için teklif almak istiyorum.",
  size = "lg",
  className = "",
  tone = "light",
}: Props) {
  const pad = size === "lg" ? "px-6 py-3.5 text-base" : "px-5 py-2.5 text-sm";
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-[#1fa855] font-bold text-white shadow-lg shadow-green-900/20 transition hover:bg-[#188a45] ${pad}`}
      >
        <MessageCircle className="size-5" aria-hidden="true" />
        WhatsApp'tan Teklif Al
      </a>
      <a
        href={`tel:${SITE.phone}`}
        className={`inline-flex items-center justify-center gap-2 rounded-full font-bold transition ${pad} ${
          tone === "dark"
            ? "bg-white text-berry-700 hover:bg-berry-50"
            : "border-2 border-berry-600 text-berry-700 hover:bg-berry-50"
        }`}
      >
        <Phone className="size-5" aria-hidden="true" />
        {SITE.phoneDisplay}
      </a>
    </div>
  );
}
