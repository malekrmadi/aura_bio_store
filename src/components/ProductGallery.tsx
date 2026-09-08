import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-border bg-muted">
        <img
          src={images[active]}
          alt={`${name} — photo ${active + 1}`}
          className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={img + i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Voir la photo ${i + 1}`}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${
                i === active ? "border-primary" : "border-border"
              }`}
            >
              <img
                src={img}
                alt={`${name} miniature ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
