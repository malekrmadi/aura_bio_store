import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, ShoppingBag, Truck, Leaf } from "lucide-react";
import { getProductBySlug } from "@/services/productService";
import { ProductGallery } from "@/components/ProductGallery";
import { OfferSelector, QuantitySelector } from "@/components/OfferSelector";
import { Badge, Price, SectionTitle, Stars } from "@/components/Price";
import { Faq } from "@/components/Faq";
import { setBuyNowItem, useCart } from "@/lib/cart";
import type { OrderItem } from "@/services/orderService";

export const Route = createFileRoute("/produits/$slug")({
  loader: ({ params }) => {
    const product = getProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Produit introuvable — Aura Bio" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.product;
    const description = `${p.shortDescription} — ${p.price} DT. Livraison partout en Tunisie, paiement à la livraison.`;
    return {
      meta: [
        { title: `${p.name} — Aura Bio` },
        { name: "description", content: description },
        { property: "og:title", content: `${p.name} — Aura Bio` },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: `/produits/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/produits/${params.slug}` }],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [offerIndex, setOfferIndex] = useState(0);
  const [extra, setExtra] = useState(1);
  const [added, setAdded] = useState(false);

  const offer = product.offers[offerIndex] ?? {
    quantity: 1,
    price: product.price,
    label: "1 produit",
  };
  const quantity = offer.quantity > 1 ? offer.quantity : extra;
  const total = offer.quantity > 1 ? offer.price : offer.price * extra;
  const unitPrice = Number((total / quantity).toFixed(2));

  const item = useMemo<OrderItem>(
    () => ({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] ?? "",
      quantity,
      unitPrice,
      lineTotal: total,
      offerLabel: `${offer.label} — ${total} DT`,
    }),
    [product, quantity, unitPrice, total, offer.label],
  );

  const orderNow = () => {
    setBuyNowItem(item);
    navigate({ to: "/commande", search: { direct: true } });
  };

  const addToCart = () => {
    addItem(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="pb-28 md:pb-10">
      <div className="container-page py-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <div className="flex flex-wrap gap-2">
              {product.badge && <Badge>{product.badge}</Badge>}
              {product.oldPrice && product.oldPrice > product.price && (
                <Badge tone="soft">{`-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`}</Badge>
              )}
            </div>

            <h1 className="mt-3 text-3xl">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Stars rating={5} />
              <span>({product.reviews.length} avis)</span>
            </div>

            <div className="mt-4">
              <Price price={total} oldPrice={product.oldPrice ? product.oldPrice * quantity : undefined} size="lg" />
            </div>

            <p className="mt-3 text-base leading-relaxed text-foreground/90">{product.description}</p>

            <div className="mt-6">
              <h2 className="mb-3 text-lg">Choisissez votre offre</h2>
              <OfferSelector offers={product.offers} selected={offerIndex} onSelect={setOfferIndex} />
            </div>

            {offer.quantity === 1 && (
              <div className="mt-4">
                <QuantitySelector value={extra} onChange={setExtra} />
              </div>
            )}

            <div className="mt-6 grid gap-3">
              <button type="button" onClick={orderNow} className="btn-base btn-primary w-full py-4 text-lg">
                Commander maintenant — {total} DT
              </button>
              <button type="button" onClick={addToCart} className="btn-base btn-outline w-full">
                <ShoppingBag className="h-4 w-4" />
                {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
              </button>
            </div>

            <div className="mt-5 grid gap-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-primary" /> Livraison partout en Tunisie — paiement à la livraison
              </p>
              <p className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-primary" /> Ingrédients naturels
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BÉNÉFICES */}
      <section className="container-page py-10">
        <SectionTitle title="Pourquoi l'utiliser ?" />
        <ul className="mx-auto grid max-w-2xl gap-3">
          {product.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* INGRÉDIENTS */}
      <section className="bg-secondary/50 py-10">
        <div className="container-page">
          <SectionTitle title="Les ingrédients" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {product.ingredients.map((ing) => (
              <div key={ing} className="rounded-2xl bg-card p-5 text-center">
                <Leaf className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-2 text-sm font-medium">{ing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODE D'UTILISATION */}
      <section className="container-page py-10">
        <SectionTitle title="Comment l'utiliser ?" />
        <ol className="mx-auto grid max-w-xl gap-3">
          {product.usage.map((step, i) => (
            <li key={step} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-sm">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* CONTENU VISUEL */}
      {product.contentBlocks.length > 0 && (
        <section className="container-page pb-10">
          <SectionTitle title="En savoir plus" />
          <div className="grid gap-6 md:grid-cols-3">
            {product.contentBlocks.map((block) => (
              <figure key={block.image} className="overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src={block.image}
                  alt={block.title ?? product.name}
                  loading="lazy"
                  className="w-full object-cover"
                />
                {(block.title || block.text) && (
                  <figcaption className="p-4">
                    {block.title && <h3 className="text-base">{block.title}</h3>}
                    {block.text && <p className="mt-1 text-sm text-muted-foreground">{block.text}</p>}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* AVIS */}
      <section className="bg-secondary/50 py-10">
        <div className="container-page">
          <SectionTitle title="Avis clients" />
          <div className="grid gap-4 md:grid-cols-3">
            {product.reviews.map((r) => (
              <div key={r.name + r.text} className="rounded-2xl bg-card p-5">
                <Stars rating={r.rating} />
                <p className="mt-2 text-sm leading-relaxed">« {r.text} »</p>
                <p className="mt-3 text-xs font-medium text-muted-foreground">
                  {r.name} — {r.city}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-10">
        <SectionTitle title="Questions fréquentes" />
        <div className="mx-auto max-w-2xl">
          <Faq items={product.faq} />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-page pb-12">
        <div className="rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground">
          <h2 className="text-2xl text-primary-foreground">Prêt à prendre soin de vous ?</h2>
          <button
            type="button"
            onClick={orderNow}
            className="btn-base mt-5 bg-background py-4 text-lg text-primary hover:bg-cream"
          >
            Commander maintenant — {total} DT
          </button>
          <p className="mt-3 text-xs opacity-90">Paiement à la livraison • Livraison partout en Tunisie</p>
        </div>
      </section>

      {/* STICKY MOBILE */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
        <button type="button" onClick={orderNow} className="btn-base btn-primary w-full py-4 text-base">
          Commander — {total} DT
        </button>
      </div>

      <div className="container-page pb-6 text-center text-sm">
        <Link to="/produits" className="text-primary underline">
          ← Voir tous les produits
        </Link>
      </div>
    </div>
  );
}
