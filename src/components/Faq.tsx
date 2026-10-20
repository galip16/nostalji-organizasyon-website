import { ChevronDown } from "lucide-react";

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="mx-auto max-w-3xl divide-y divide-berry-100 rounded-3xl border border-berry-100 bg-paper">
      {items.map((item) => (
        <details key={item.q} className="group px-5 py-1 sm:px-7">
          <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 text-left text-lg font-bold text-ink">
            {item.q}
            <ChevronDown
              className="size-5 shrink-0 text-berry-600 transition group-open:rotate-180"
              aria-hidden="true"
            />
          </summary>
          <p className="pb-5 leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
