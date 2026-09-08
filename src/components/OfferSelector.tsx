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
            className={`flex items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left transition-colors ${
              isActive ? "border-primary bg-secondary" : "border-border bg-card hover:border-sage"
            }`}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold">{offer.label}</span>
                {offer.badge && (
                  <span className="rounded-full bg-promo px-2 py-0.5 text-[11px] font-bold text-background">
                    {offer.badge}
                  </span>
                )}
              </div>
              {offer.quantity > 1 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Soit {perUnit.toFixed(2).replace(".", ",")} DT / produit
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
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">Quantité</span>
      <div className="flex items-center rounded-full border border-border">
        <button
          type="button"
          aria-label="Diminuer"
          onClick={() => onChange(Math.max(1, value - 1))}
          className="grid h-11 w-11 place-items-center rounded-full hover:bg-secondary"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center font-semibold">{value}</span>
        <button
          type="button"
          aria-label="Augmenter"
          onClick={() => onChange(value + 1)}
          className="grid h-11 w-11 place-items-center rounded-full hover:bg-secondary"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
