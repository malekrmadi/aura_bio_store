import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { Check, ShoppingBag, Truck, Leaf, ShieldCheck, Flame, Send, CheckCircle2, Loader2 } from "lucide-react";
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
    if (customer.name.trim().length === 0)
      e['name'] = "يرجى كتابة الاسم واللقب • Indiquez votre nom.";
    const digitsOnly = customer.phone.replace(/\D/g, "");
    if (digitsOnly.length !== 8)
      e['phone'] = "يرجى كتابة 8 أرقام • Numéro invalide (8 chiffres).";
    if (!customer.governorate)
      e['governorate'] = "يرجى اختيار الولاية • Choisissez votre gouvernorat.";
    if (customer.address.trim().length === 0)
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
    "mt-1.5 w-full rounded-xl border border-emerald-200/90 bg-white dark:bg-card px-4 py-3 text-base text-foreground font-medium outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 shadow-xs transition-all";

  return (
    <div className="pb-12">
      <div className="container-page py-6">
        <div className="grid gap-8 lg:grid-cols-2 items-start">
          <ProductGallery images={product.images} name={product.name} fullImage={product.fullImage} />

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

            {product.offers && product.offers.length > 1 && (
              <>
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
              </>
            )}

            {/* FORMULAIRE DE COMMANDE DIRECT ET ATTIRANT */}
            <div
              ref={formRef}
              id="order-form"
              className="mt-8 rounded-3xl border-2 border-emerald-600/40 bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-amber-500/10 p-5 sm:p-7 shadow-2xl scroll-mt-6 backdrop-blur-sm relative overflow-hidden"
            >
              {/* Badge Top Banner */}
              <div className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-800 text-white text-center py-2.5 px-4 rounded-2xl text-xs sm:text-sm font-bold shadow-md mb-5 flex items-center justify-center gap-2">
                <Flame className="h-4 w-4 text-amber-300 animate-pulse fill-amber-300" />
                <span>طلب سريع ومباشر — الدفع عند الاستلام بعد المعاينة 🚚</span>
              </div>

              <div className="flex items-center gap-3 pb-4 border-b border-emerald-900/10">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-emerald-700 text-amber-300 font-extrabold text-xl shadow-sm">
                  ✓
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-foreground">استمارة الطلب المباشر</h2>
                  <p className="text-xs text-muted-foreground font-medium">ادخل معلوماتك هنا للدفع عند الاستلام</p>
                </div>
              </div>

              {/* Récapitulatif rapide de l'offre sélectionnée */}
              <div className="mt-4 rounded-2xl bg-emerald-900 text-white p-4 flex items-center justify-between shadow-lg border border-emerald-700/50">
                <div className="flex items-center gap-3">
                  <img src={product.images[0]} alt={product.name} className="h-14 w-14 rounded-xl object-cover border-2 border-emerald-600 shadow-sm" />
                  <div>
                    <p className="font-bold text-sm text-white">{offer.label}</p>
                    <p className="text-xs text-emerald-200">التوصيل : {deliveryFee} DT</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-emerald-200 font-medium">المجموع الكلي</p>
                  <p className="text-xl font-black text-amber-300">{finalGrandTotal} DT</p>
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
                    placeholder="Nom et prénom"
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
                    placeholder="22 123 456"
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
                    placeholder="Adresse complète"
                    maxLength={300}
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value, city: e.target.value })}
                  />
                  {errors['address'] && <p className="mt-1 text-xs font-semibold text-destructive">{errors['address']}</p>}
                </div>

                <div className="rounded-xl bg-emerald-950/5 dark:bg-emerald-950/30 p-3.5 text-xs font-medium space-y-2 border border-emerald-600/20 mt-1">
                  <p className="flex items-center gap-2 text-foreground font-bold">
                    <ShieldCheck className="h-4 w-4 text-emerald-700 shrink-0" />
                    <span>الدفع عند الاستلام بعد معاينة طلبيتك</span>
                  </p>
                  <p className="flex items-center gap-2 text-foreground font-bold">
                    <Truck className="h-4 w-4 text-emerald-700 shrink-0" />
                    <span>توصيل سريع لجميع الولايات (24h-72h) — {deliveryFee} DT</span>
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className={`btn-base w-full py-4 text-xl font-bold rounded-2xl shadow-xl transition-all duration-200 mt-2 ${
                    sending
                      ? "bg-emerald-800 text-white cursor-wait opacity-90 scale-[0.99]"
                      : "bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-700 hover:to-emerald-900 text-white shadow-emerald-700/30 hover:scale-[1.01] active:scale-[0.98]"
                  }`}
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-3">
                      <Loader2 className="h-6 w-6 animate-spin text-amber-300" />
                      <span className="animate-pulse text-base sm:text-lg">جاري إرسال طلبك... يرجى الانتظار</span>
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2.5">
                      <Send className="h-5 w-5 text-amber-300" />
                      <span>تأكيد الطلب الآن — {finalGrandTotal} DT</span>
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
            <li key={b} className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-xs">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
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
              <div key={ing} className="rounded-2xl bg-card p-5 text-center shadow-xs border border-border/60">
                <Leaf className="mx-auto h-6 w-6 text-emerald-600" />
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
            <li key={step} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-xs">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-700 text-sm font-bold text-white">
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
                <p className="mt-3 text-xs font-bold text-emerald-700">
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

      {/* RETURN TO ALL PRODUCTS LINK */}
      <div className="container-page py-6 text-center text-sm">
        <Link to="/produits" className="text-emerald-700 hover:text-emerald-800 underline font-medium">
          ← العودة لبقية المنتجات (Tous les produits)
        </Link>
      </div>
    </div>
  );
}

