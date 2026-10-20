import Link from "next/link";
import { ContactButtons } from "@/components/ContactButtons";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-28 text-center">
      <p className="font-display text-7xl font-semibold text-berry-200">404</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-ink">Aradığınız sayfa bulunamadı</h1>
      <p className="mt-3 text-lg text-muted">Ana sayfaya dönebilir ya da doğrudan bize ulaşabilirsiniz.</p>
      <div className="mt-8 flex flex-col items-center gap-6">
        <Link href="/" className="font-bold text-berry-700 underline">
          Ana sayfaya dön
        </Link>
        <ContactButtons className="justify-center" />
      </div>
    </section>
  );
}
