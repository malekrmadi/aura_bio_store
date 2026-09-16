import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Check, ShoppingBag, Truck, Leaf, ShieldCheck, Flame } from "lucide-react";
import { getProductBySlug } from "@/services/productService";
import { mainProduct } from "@/data/products";
import { ProductGallery } from "@/components/ProductGallery";
import { OfferSelector, QuantitySelector } from "@/components/OfferSelector";
import { Badge, Price, SectionTitle, Stars } from "@/components/Price";
import { Faq } from "@/components/Faq";
import { setBuyNowItem, useCart } from "@/lib/cart";
import type { OrderItem } from "@/services/orderService";
import { trackAddToCart, trackInitiateCheckout, trackViewContent } from "@/lib/metaPixel";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [offerIndex, setOfferIndex] = useState(0);
  const [extra, setExtra] = useState(1);
  const [added, setAdded] = useState(false);

  const product = (slug ? getProductBySlug(slug) : null) ?? mainProduct;

  // Déclenchement de l'événement Meta Pixel ViewContent à l'affichage du produit
  useEffect(() => {
    if (product) {
      trackViewContent(product);
    }
  }, [product]);

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
    trackInitiateCheckout([item], total);
    setBuyNowItem(item);
    navigate("/commande?direct=true");
  };

  const addToCart = () => {
    trackAddToCart(item);
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
            <div className="flex flex-wrap gap-2 items-center">
              {product.badge && <Badge>{product.badge}</Badge>}
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800 border border-amber-200">
                <Flame className="h-3.5 w-3.5 text-amber-600 fill-amber-600" />
                طلب مرتفع في تونس
              </span>
              {product.oldPrice && product.oldPrice > product.price && (
                <Badge tone="soft">{`توفير -${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%`}</Badge>
              )}
            </div>

            <h1 className="mt-3 text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Stars rating={5} />
              <span>({product.reviews.length} تقييمات clients)</span>
            </div>

            <div className="mt-4">
              <Price price={total} oldPrice={product.oldPrice ? product.oldPrice * quantity : undefined} size="lg" />
            </div>

            <p className="mt-3 text-base leading-relaxed text-foreground/90">{product.description}</p>

            <div className="mt-6">
              <h2 className="mb-3 text-lg font-bold flex justify-between items-center">
                <span>اختر العرض المناسب • Choisissez votre offre</span>
              </h2>
              <OfferSelector offers={product.offers} selected={offerIndex} onSelect={setOfferIndex} />
            </div>

            {offer.quantity === 1 && (
              <div className="mt-4">
                <QuantitySelector value={extra} onChange={setExtra} />
              </div>
            )}

            <div className="mt-6 grid gap-3">
              <button
                type="button"
                onClick={orderNow}
                className="btn-base btn-primary w-full py-4 text-xl font-bold shadow-lg shadow-primary/25 hover:scale-[1.01] transition-all"
              >
                اطلب الآن — Commander maintenant ({total} DT)
              </button>
              <button type="button" onClick={addToCart} className="btn-base btn-outline w-full py-3">
                <ShoppingBag className="h-4 w-4" />
                {added ? "تمت الإضافة للسلة ✓" : "أضف إلى السلة — Ajouter au panier"}
              </button>
            </div>

            <div className="mt-5 grid gap-2.5 rounded-2xl bg-secondary/60 p-4 text-sm font-medium">
              <p className="flex items-center gap-2 text-foreground">
                <Truck className="h-4 w-4 text-primary shrink-0" />
                <span>توصيل سريع لجميع الولايات 🇹🇳 (24h - 72h)</span>
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span>الدفع عند الاستلام بعد المعاينة (Paiement à la livraison)</span>
              </p>
              <p className="flex items-center gap-2 text-foreground">
                <Leaf className="h-4 w-4 text-primary shrink-0" />
                <span>مكونات طبيعية 100% غنية وفعالة</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BÉNÉFICES */}
      <section className="container-page py-10">
        <SectionTitle title="لماذا هذا المنتج ؟ • Pourquoi l'utiliser ?" />
        <ul className="mx-auto grid max-w-2xl gap-3">
          {product.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm font-medium">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* INGRÉDIENTS */}
      <section className="bg-secondary/50 py-10">
        <div className="container-page">
          <SectionTitle title="المكونات الطبيعية • Les ingrédients" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {product.ingredients.map((ing) => (
              <div key={ing} className="rounded-2xl bg-card p-5 text-center shadow-xs">
                <Leaf className="mx-auto h-6 w-6 text-primary" />
                <p className="mt-2 text-sm font-semibold">{ing}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODE D'UTILISATION */}
      <section className="container-page py-10">
        <SectionTitle title="طريقة الاستعمال • Comment l'utiliser ?" />
        <ol className="mx-auto grid max-w-xl gap-3">
          {product.usage.map((step, i) => (
            <li key={step} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="text-sm font-medium">{step}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* CONTENU VISUEL (AFFICHES) */}
      {product.contentBlocks.length > 0 && (
        <section className="container-page pb-10">
          <SectionTitle title="التفاصيل بالصور • En savoir plus" />
          <div className="grid gap-6 md:grid-cols-3">
            {product.contentBlocks.map((block) => (
              <figure key={block.image} className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                <img
                  src={block.image}
                  alt={block.title ?? product.name}
                  loading="lazy"
                  className="w-full object-cover"
                />
                {(block.title || block.text) && (
                  <figcaption className="p-4">
                    {block.title && <h3 className="text-base font-semibold">{block.title}</h3>}
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
          <SectionTitle title="آراء الحرفاء • Avis clients" />
          <div className="grid gap-4 md:grid-cols-3">
            {product.reviews.map((r) => (
              <div key={r.name + r.text} className="rounded-2xl bg-card p-5 border border-border shadow-xs">
                <Stars rating={r.rating} />
                <p className="mt-2 text-sm leading-relaxed font-medium">« {r.text} »</p>
                <p className="mt-3 text-xs font-bold text-primary">
                  {r.name} — {r.city} (حريف(ة) مؤكد(ة))
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page py-10">
        <SectionTitle title="الأسئلة الشائعة • Questions fréquentes" />
        <div className="mx-auto max-w-2xl">
          <Faq items={product.faq} />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-page pb-12">
        <div className="rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground shadow-xl">
          <h2 className="text-2xl sm:text-3xl text-primary-foreground font-bold">جاهز للعناية بشرتك ؟</h2>
          <p className="mt-2 text-sm opacity-90">اطلب الآن واستفد من التوصيل السريع والدفع عند الاستلام</p>
          <button
            type="button"
            onClick={orderNow}
            className="btn-base mt-6 bg-background py-4 px-8 text-xl font-bold text-primary hover:bg-cream shadow-md transition-all hover:scale-105"
          >
            اطلب الآن — Commander maintenant ({total} DT)
          </button>
          <p className="mt-3 text-xs opacity-90">الدفع عند الاستلام • التوصيل لجميع الولايات</p>
        </div>
      </section>

      {/* STICKY MOBILE */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden shadow-lg">
        <button type="button" onClick={orderNow} className="btn-base btn-primary w-full py-4 text-lg font-bold">
          اطلب الآن — {total} DT
        </button>
      </div>

      <div className="container-page pb-6 text-center text-sm">
        <Link to="/produits" className="text-primary underline font-medium">
          ← العودة لبقية المنتجات (Tous les produits)
        </Link>
      </div>
    </div>
  );
}

