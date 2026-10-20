import { ContactButtons } from "./ContactButtons";

export function CtaBand({
  title = "Etkinliğiniz için ücretsiz teklif alın",
  text = "Tarih, ilçe ve yaklaşık davetli sayısını yazmanız yeterli. Size kısa sürede dönüş yapıyoruz.",
  message,
}: {
  title?: string;
  text?: string;
  message?: string;
}) {
  return (
    <section className="px-4 sm:px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-berry-600 px-6 py-12 text-center text-white sm:px-12">
        <h2 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-white/90">{text}</p>
        <ContactButtons message={message} tone="dark" className="mt-8 justify-center" />
      </div>
    </section>
  );
}
