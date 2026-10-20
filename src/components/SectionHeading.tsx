export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-berry-600">{eyebrow}</p>
      )}
      <Tag className="mt-2 font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
        {title}
      </Tag>
      {children && <div className="mt-4 text-lg leading-relaxed text-muted">{children}</div>}
    </div>
  );
}
