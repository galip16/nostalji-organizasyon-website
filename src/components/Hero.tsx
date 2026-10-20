import { BadgeCheck, MapPin, PartyPopper } from "lucide-react";
import { SITE, yearsOfExperience } from "@/lib/site";
import { ContactButtons } from "./ContactButtons";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-berry-900 sm:min-h-[calc(100svh-5rem)]">
      <video
        className="hero-video absolute inset-0 -z-20 size-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster="/images/hero-poster.webp"
        aria-hidden="true"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(74,15,39,0.72)_0%,rgba(74,15,39,0.55)_45%,rgba(74,15,39,0.82)_100%)]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-bold text-white backdrop-blur">
          <MapPin className="size-4" aria-hidden="true" />
          Bursa'nın tüm ilçelerine hizmet
        </p>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-semibold leading-[1.1] text-white sm:text-6xl">
          Bursa'da nostaljik tatlarla{" "}
          <span className="text-berry-200">unutulmaz organizasyonlar</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
          Düğün, doğum günü, anaokulu ve kurumsal etkinliklerinizde pamuk şeker, Osmanlı macunu, patlamış mısır,
          salep, şerbet ve palyaço ile misafirlerinize farklı bir deneyim yaşatıyoruz.
        </p>

        <ContactButtons className="mt-8" tone="dark" />

        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-white">
          <li className="flex items-center gap-2 font-bold">
            <BadgeCheck className="size-5 text-berry-200" aria-hidden="true" />
            {SITE.foundedYear}'den beri · {yearsOfExperience()} yıllık deneyim
          </li>
          <li className="flex items-center gap-2 font-bold">
            <PartyPopper className="size-5 text-berry-200" aria-hidden="true" />
            ~{SITE.eventCount.toLocaleString("tr-TR")} organizasyonda görev aldık
          </li>
        </ul>
      </div>
    </section>
  );
}
