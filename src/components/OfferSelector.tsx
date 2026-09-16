import type { Offer } from "@/data/products";
import { Minus, Plus } from "lucide-react";

export function OfferSelector({
  offers,
  selected,
  onSelect,
}: {
  offers: Offer[];
  selected: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="grid gap-3">
      {offers.map((offer, i) => {
        const perUnit = offer.price / offer.quantity;
        const isActive = i === selected;
        return (
          <button
            key={offer.label}
            type="button"
            onClick={() => onSelect(i)}
            className={`flex items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left transition-all ${
              isActive ? "border-primary bg-secondary/80 shadow-sm" : "border-border bg-card hover:border-sage"
            }`}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-base">{offer.label}</span>
                {offer.badge && (
                  <span className="rounded-full bg-promo px-2.5 py-0.5 text-[11px] font-bold text-background animate-pulse">
                    {offer.badge}
                  </span>
                )}
              </div>
              {offer.quantity > 1 && (
                <p className="mt-1 text-xs text-muted-foreground dir-rtl">
                  (فقط {perUnit.toFixed(2).replace(".", ",")} د.ت / للقطعة) • {offer.quantity} pièces
                </p>
              )}
            </div>
            <span className="shrink-0 text-lg font-bold text-primary">{offer.price} DT</span>
          </button>
        );
      })}
    </div>
  );
}

export function QuantitySelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-secondary/40 p-3">
      <span className="text-sm font-medium">الكمية • Quantité</span>
      <div className="flex items-center rounded-full border border-border bg-card">
        <button
          type="button"
          aria-label="Diminuer"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition-colors"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-bold text-base">{value}</span>
        <button
          type="button"
          aria-label="Augmenter"
          onClick={() => onChange(value + 1)}
          className="grid h-10 w-10 place-items-center rounded-full hover:bg-secondary transition-colors"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

