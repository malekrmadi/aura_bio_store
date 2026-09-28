import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { Check, ShoppingBag, Truck, Leaf, ShieldCheck, Flame, Send, CheckCircle2 } from "lucide-react";
import { getProductBySlug } from "@/services/productService";
import { mainProduct } from "@/data/products";
import { ProductGallery } from "@/components/ProductGallery";
import { OfferSelector, QuantitySelector } from "@/components/OfferSelector";
import { Badge, Price, SectionTitle, Stars } from "@/components/Price";
import { Faq } from "@/components/Faq";
import { governorateList } from "@/data/governorates";
import {
  buildOrder,
  getDeliveryFee,
  submitOrder,
  type Customer,
  type OrderItem,
} from "@/services/orderService";
import { trackAddToCart, trackInitiateCheckout, trackPurchase, trackViewContent } from "@/lib/metaPixel";

const emptyCustomer: Customer = {
  name: "",
  phone: "",
  governorate: "",
  city: "",
  address: "",
  note: "",
};

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const [offerIndex, setOfferIndex] = useState(0);
  const [extra, setExtra] = useState(1);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [hasInitiatedCheckout, setHasInitiatedCheckout] = useState(false);
  const deliveryFee = getDeliveryFee();

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
  const finalGrandTotal = total + deliveryFee;

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

  const scrollToForm = () => {
    if (!hasInitiatedCheckout) {
      trackInitiateCheckout([item], finalGrandTotal);
      setHasInitiatedCheckout(true);
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleFormInteraction = () => {
    if (!hasInitiatedCheckout) {
      trackInitiateCheckout([item], finalGrandTotal);
      setHasInitiatedCheckout(true);
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (customer.name.trim().length < 3)
      e['name'] = "يرجى كتابة الاسم واللقب بشكل صحيح • Indiquez votre nom & prénom.";
    const phone = customer.phone.replace(/\s/g, "");
    if (!/^(\+216)?[2-59]\d{7}$/.test(phone))
      e['phone'] = "رقم هاتف تونس غير صحيح (8 أرقام) • Numéro invalide (8 chiffres).";
    if (!customer.governorate)
      e['governorate'] = "يرجى اختيار الولاية • Choisissez votre gouvernorat.";
    if (customer.address.trim().length < 3)
      e['address'] = "يرجى كتابة العنوان والمدينة • Indiquez votre adresse.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmitOrder = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSending(true);

    const order = buildOrder(
      {
        ...customer,
        name: customer.name.trim().slice(0, 100),
        phone: customer.phone.trim().slice(0, 20),
        governorate: customer.governorate,
        city: customer.city.trim() || customer.governorate,
        address: customer.address.trim().slice(0, 300),
        note: (customer.note ?? "").trim().slice(0, 300),
      },
      [item],
    );

    // Événement Meta Pixel Purchase
    trackPurchase(order);

    // Envoi vers le Webhook Google Sheets
    const res = await submitOrder(order);
    setSending(false);

    if (res.success) {
      try {
        window.sessionStorage.setItem("aura-bio-last-order", JSON.stringify(res.order));
      } catch {
        /* ignore */
      }
      navigate("/confirmation");
    }
  };

  const fieldClass =
    "mt-1 w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none focus:border-primary transition-all focus:ring-2 focus:ring-primary/20";

  return (
    <div className="pb-28 md:pb-10">
      <div className="container-page py-6">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
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

            <h1 className="mt-3 text-2xl sm:text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Stars rating={5} />
              <span>({product.reviews.length} تقييمات clients)</span>
            </div>

            <div className="mt-4">
              <Price price={total} oldPrice={product.oldPrice ? product.oldPrice * quantity : undefined} size="lg" />
            </div>

            <p className="mt-3 text-base leading-relaxed text-foreground/90 font-medium">{product.description}</p>

            <div className="mt-6">
              <h2 className="mb-3 text-lg font-bold flex justify-between items-center">
                <span>1. اختر العرض المناسب • Choisissez votre offre</span>
              </h2>
              <OfferSelector offers={product.offers} selected={offerIndex} onSelect={setOfferIndex} />
            </div>

            {offer.quantity === 1 && (
              <div className="mt-4">
                <QuantitySelector value={extra} onChange={setExtra} />
              </div>
            )}

            {/* FORMULAIRE DE COMMANDE DIRECT SUR LA MÊME PAGE */}
            <div ref={formRef} id="order-form" className="mt-8 rounded-3xl border-2 border-primary/40 bg-card p-5 sm:p-6 shadow-xl scroll-mt-6">
              <div className="flex items-center gap-2.5 pb-4 border-b border-border">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  2
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">استمارة الطلب المباشر</h2>
                  <p className="text-xs text-muted-foreground">ادخل معلوماتك هنا للدفع عند الاستلام</p>
                </div>
              </div>

              {/* Récapitulatif rapide de l'offre sélectionnée */}
              <div className="mt-4 rounded-xl bg-secondary/80 p-3 flex items-center justify-between text-sm">
                <div className="flex items-center gap-3">
                  <img src={product.images[0]} alt={product.name} className="h-12 w-12 rounded-lg object-cover border border-border" />
                  <div>
                    <p className="font-bold text-xs sm:text-sm">{offer.label}</p>
                    <p className="text-xs text-muted-foreground">التوصيل : {deliveryFee} DT</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">المجموع الكلي</p>
                  <p className="text-lg font-bold text-primary">{finalGrandTotal} DT</p>
                </div>
              </div>

              <form onSubmit={handleSubmitOrder} onFocus={handleFormInteraction} className="mt-5 grid gap-4" noValidate>
                <div>
                  <label htmlFor="name" className="text-sm font-bold text-foreground block">
                    الاسم واللقب * <span className="font-normal text-muted-foreground text-xs">(Nom et prénom)</span>
                  </label>
                  <input
                    id="name"
                    className={fieldClass}
                    maxLength={100}
                    value={customer.name}
                    onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  />
                  {errors['name'] && <p className="mt-1 text-xs font-semibold text-destructive">{errors['name']}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="text-sm font-bold text-foreground block">
                    رقم الهاتف * <span className="font-normal text-muted-foreground text-xs">(Téléphone - 8 chiffres)</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    className={fieldClass}
                    maxLength={20}
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  />
                  {errors['phone'] && <p className="mt-1 text-xs font-semibold text-destructive">{errors['phone']}</p>}
                </div>

                <div>
                  <label htmlFor="gov" className="text-sm font-bold text-foreground block">
                    الولاية * <span className="font-normal text-muted-foreground text-xs">(Gouvernorat)</span>
                  </label>
                  <select
                    id="gov"
                    className={fieldClass}
                    value={customer.governorate}
                    onChange={(e) => setCustomer({ ...customer, governorate: e.target.value, city: customer.city || e.target.value })}
                  >
                    <option value="">اختر الولاية... (Choisir votre gouvernorat)</option>
                    {governorateList.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.label}
                      </option>
                    ))}
                  </select>
                  {errors['governorate'] && <p className="mt-1 text-xs font-semibold text-destructive">{errors['governorate']}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="text-sm font-bold text-foreground block">
                    العنوان والمدينة * <span className="font-normal text-muted-foreground text-xs">(Adresse et Ville)</span>
                  </label>
                  <input
                    id="address"
                    className={fieldClass}
                    maxLength={300}
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value, city: e.target.value })}
                  />
                  {errors['address'] && <p className="mt-1 text-xs font-semibold text-destructive">{errors['address']}</p>}
                </div>

                <div className="rounded-xl bg-secondary/60 p-3.5 text-xs font-medium space-y-1.5 border border-border mt-1">
                  <p className="flex items-center gap-2 text-foreground font-bold">
                    <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                    <span>الدفع عند الاستلام بعد معاينة طلبيتك</span>
                  </p>
                  <p className="flex items-center gap-2 text-foreground font-bold">
                    <Truck className="h-4 w-4 text-primary shrink-0" />
                    <span>توصيل سريع لجميع الولايات (24h-72h) — {deliveryFee} DT</span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="btn-base btn-primary w-full py-4 text-xl font-bold shadow-lg shadow-primary/30 hover:scale-[1.01] transition-all disabled:opacity-70 mt-2"
                >
                  {sending ? (
                    "جاري تسجيل الطلب..."
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="h-5 w-5" />
                      تأكيد الطلب الآن — {finalGrandTotal} DT
                    </span>
                  )}
                </button>
              </form>
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
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
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

      {/* CTA FINAL DE SCROLL */}
      <section className="container-page pb-12">
        <div className="rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground shadow-xl">
          <h2 className="text-2xl sm:text-3xl text-primary-foreground font-bold">جاهز للعناية بشرتك ؟</h2>
          <p className="mt-2 text-sm opacity-90">اطلب الآن واستفد من التوصيل السريع والدفع عند الاستلام</p>
          <button
            type="button"
            onClick={scrollToForm}
            className="btn-base mt-6 bg-background py-4 px-8 text-xl font-bold text-primary hover:bg-cream shadow-md transition-all hover:scale-105"
          >
            اطلب الآن — {finalGrandTotal} DT
          </button>
          <p className="mt-3 text-xs opacity-90">الدفع عند الاستلام • التوصيل لجميع الولايات</p>
        </div>
      </section>

      {/* STICKY MOBILE BUTTON -> SCROLL DIRECT AU FORMULAIRE */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden shadow-lg">
        <button type="button" onClick={scrollToForm} className="btn-base btn-primary w-full py-4 text-lg font-bold">
          اطلب الآن — {finalGrandTotal} DT
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
