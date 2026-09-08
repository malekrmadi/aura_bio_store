export function Price({
  price,
  oldPrice,
  size = "md",
}: {
  price: number;
  oldPrice?: number | undefined;
  size?: "md" | "lg";
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-2">
      {oldPrice && oldPrice > price && (
        <span className="text-sm text-muted-foreground line-through">{oldPrice} DT</span>
      )}
      <span
        className={
          size === "lg"
            ? "text-3xl font-bold text-primary"
            : "text-xl font-bold text-primary"
        }
      >
        {price} DT
      </span>
    </div>
  );
}

export function Badge({ children, tone = "promo" }: { children: string; tone?: "promo" | "soft" }) {
  return (
    <span
      className={
        tone === "promo"
          ? "rounded-full bg-promo px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-background"
          : "rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-accent-foreground"
      }
    >
      {children}
    </span>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6 text-center">
      <h2 className="text-2xl sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

export function Stars({ rating = 5 }: { rating?: number }) {
  return (
    <span className="text-gold" aria-label={`${rating} sur 5`}>
      {"★".repeat(rating)}
      <span className="text-muted-foreground/40">{"★".repeat(5 - rating)}</span>
    </span>
  );
}
