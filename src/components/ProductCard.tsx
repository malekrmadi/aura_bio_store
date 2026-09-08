import { Link } from "react-router-dom";
import type { Product } from "@/data/products";
import { Badge, Price } from "@/components/Price";

export function ProductCard({ product }: { product: Product }) {
  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : null;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        to={`/produits/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {product.badge && <Badge>{product.badge}</Badge>}
          {discount && <Badge tone="soft">{`-${discount}%`}</Badge>}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-lg leading-snug">{product.name}</h3>
        <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-1">
          <Price price={product.price} oldPrice={product.oldPrice} />
        </div>
        <Link
          to={`/produits/${product.slug}`}
          className="btn-base btn-primary mt-3 w-full"
        >
          Voir le produit
        </Link>
      </div>
    </article>
  );
}

