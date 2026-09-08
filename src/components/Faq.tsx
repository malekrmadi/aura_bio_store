import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {items.map((item, i) => (
        <div key={item.question}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
          >
            <span className="font-medium">{item.question}</span>
            <ChevronDown
              className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`}
            />
          </button>
          {open === i && (
            <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  );
}
