import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Review } from "@/data/products";
import { Stars } from "@/components/Price";

export function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  if (reviews.length === 0) return null;
  const r = reviews[i] ?? reviews[0]!;

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-border bg-card p-6 text-center">
      <Stars rating={r.rating} />
      <p className="mt-3 text-base leading-relaxed">« {r.text} »</p>
      <p className="mt-3 text-sm font-medium text-muted-foreground">
        {r.name} — {r.city}
      </p>

      <div className="mt-5 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Avis précédent"
          onClick={() => setI((v) => (v - 1 + reviews.length) % reviews.length)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex gap-1.5">
          {reviews.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${idx === i ? "bg-primary" : "bg-border"}`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Avis suivant"
          onClick={() => setI((v) => (v + 1) % reviews.length)}
          className="grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-secondary"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
