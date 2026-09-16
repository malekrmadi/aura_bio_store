import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShieldCheck, Truck } from "lucide-react";
import { OrderSummary } from "@/components/OrderSummary";
import { clearBuyNowItem, getBuyNowItem, useCart } from "@/lib/cart";
import { governorateList } from "@/data/governorates";
import {
  buildOrder,
  getDeliveryFee,
  submitOrder,
  type Customer,
  type OrderItem,
} from "@/services/orderService";
import { trackInitiateCheckout, trackPurchase } from "@/lib/metaPixel";

const emptyCustomer: Customer = {
  name: "",
  phone: "",
  governorate: "",
  city: "",
  address: "",
  note: "",
};

export function CheckoutPage() {
  const [searchParams] = useSearchParams();
  const direct = searchParams.get("direct") === "true";
  const navigate = useNavigate();
  const cart = useCart();
  const [items, setItems] = useState<OrderItem[]>([]);
  const [ready, setReady] = useState(false);
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const deliveryFee = getDeliveryFee();

  useEffect(() => {
    let currentItems: OrderItem[] = [];
    if (direct) {
      const buyNow = getBuyNowItem();
      currentItems = buyNow ? [buyNow] : [];
    } else {
      currentItems = cart.items;
    }
    setItems(currentItems);
    setReady(true);

    if (currentItems.length > 0) {
      const subtotal = currentItems.reduce((s, i) => s + i.lineTotal, 0);
      trackInitiateCheckout(currentItems, subtotal + deliveryFee);
    }
  }, [direct, cart.items.length]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (customer.name.trim().length < 3)
      e['name'] = "يرجى كتابة الاسم واللقب بشكل صحيح • Indiquez votre nom & prénom.";
    const phone = customer.phone.replace(/\s/g, "");
    if (!/^(\+216)?[2-59]\d{7}$/.test(phone))
      e['phone'] = "رقم هاتف تونس غير صحيح (8 أرقام) • Numéro tunisien invalide (8 chiffres).";
    if (!customer.governorate)
      e['governorate'] = "يرجى اختيار الولاية • Choisissez votre gouvernorat.";
    if (customer.city.trim().length < 2)
      e['city'] = "يرجى كتابة المدينة / المعتمدية • Indiquez votre ville / معتمدية.";
    if (customer.address.trim().length < 5)
      e['address'] = "يرجى كتابة العنوان الكامل • Indiquez votre adresse complète.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate() || items.length === 0) return;
    setSending(true);
    const order = buildOrder(
      {
        ...customer,
        name: customer.name.trim().slice(0, 100),
        phone: customer.phone.trim().slice(0, 20),
        city: customer.city.trim().slice(0, 100),
        address: customer.address.trim().slice(0, 300),
        note: (customer.note ?? "").trim().slice(0, 300),
      },
      items,
    );
    const res = await submitOrder(order);
    setSending(false);
    if (!res.success) return;

    // Déclenchement de l'événement Meta Pixel Purchase
    trackPurchase(res.order);

    if (direct) clearBuyNowItem();
    else cart.clear();
    try {
      window.sessionStorage.setItem("aura-bio-last-order", JSON.stringify(res.order));
    } catch {
      /* ignore */
    }
    navigate("/confirmation");
  };

  if (ready && items.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-bold">لا يوجد منتجات للطلب • Aucun produit à commander</h1>
        <Link to="/produits" className="btn-base btn-primary mt-6 font-bold">
          تصفح المنتجات • Voir les produits
        </Link>
      </div>
    );
  }

  const field =
    "mt-1 w-full rounded-xl border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary transition-all focus:ring-2 focus:ring-primary/20";

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-bold">معلومات التوصيل والطلب • Finaliser ma commande</h1>
      <p className="mt-2 text-sm text-muted-foreground font-medium">
        لا تحتاج لإنشاء حساب ولا لبطاقة bank. الدفع عند الاستلام بعد معاينة طلبك (Paiement à la livraison).
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <form onSubmit={handleSubmit} className="grid gap-4.5 rounded-2xl border border-border bg-card p-6 shadow-sm" noValidate>
          <div>
            <label htmlFor="name" className="text-sm font-bold text-foreground block">
              الاسم واللقب * <span className="font-normal text-muted-foreground">(Nom et prénom)</span>
            </label>
            <input
              id="name"
              className={field}
              maxLength={100}
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            />
            {errors['name'] && <p className="mt-1 text-xs font-semibold text-destructive">{errors['name']}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-bold text-foreground block">
              رقم الهاتف * <span className="font-normal text-muted-foreground">(Téléphone)</span>
            </label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              className={field}
              maxLength={20}
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            />
            {errors['phone'] && <p className="mt-1 text-xs font-semibold text-destructive">{errors['phone']}</p>}
          </div>

          <div>
            <label htmlFor="gov" className="text-sm font-bold text-foreground block">
              الولاية * <span className="font-normal text-muted-foreground">(Gouvernorat)</span>
            </label>
            <select
              id="gov"
              className={field}
              value={customer.governorate}
              onChange={(e) => setCustomer({ ...customer, governorate: e.target.value })}
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
            <label htmlFor="city" className="text-sm font-bold text-foreground block">
              المدينة / المعتمدية * <span className="font-normal text-muted-foreground">(Ville / Délégation)</span>
            </label>
            <input
              id="city"
              className={field}
              maxLength={100}
              value={customer.city}
              onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
            />
            {errors['city'] && <p className="mt-1 text-xs font-semibold text-destructive">{errors['city']}</p>}
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-bold text-foreground block">
              العنوان الكامل * <span className="font-normal text-muted-foreground">(Adresse complète)</span>
            </label>
            <input
              id="address"
              className={field}
              maxLength={300}
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
            />
            {errors['address'] && <p className="mt-1 text-xs font-semibold text-destructive">{errors['address']}</p>}
          </div>

          <div>
            <label htmlFor="note" className="text-sm font-medium text-foreground block">
              ملاحظات إضافية / Note complémentaires <span className="text-xs text-muted-foreground">(اختياري / optionnel)</span>
            </label>
            <textarea
              id="note"
              rows={2}
              maxLength={300}
              className={field}
              value={customer.note}
              onChange={(e) => setCustomer({ ...customer, note: e.target.value })}
            />
          </div>

          <div className="rounded-xl bg-secondary/70 p-4 text-sm font-medium space-y-2 border border-border">
            <p className="flex items-center gap-2 text-foreground font-bold">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span>الدفع عند الاستلام (Paiement à la livraison)</span>
            </p>
            <p className="text-xs text-muted-foreground">تدفع للموصل نقداً عند تسلم طلبيتك.</p>
            <p className="flex items-center gap-2 text-foreground font-bold pt-1">
              <Truck className="h-4 w-4 text-primary shrink-0" />
              <span>توصيل لجميع الولايات (24h-72h) — {deliveryFee} DT</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={sending}
            className="btn-base btn-primary w-full py-4 text-xl font-bold shadow-lg shadow-primary/25 disabled:opacity-70 hover:scale-[1.01] transition-all"
          >
            {sending ? "جاري تسجيل الطلب..." : "تأكيد الطلب — CONFIRMER MA COMMANDE"}
          </button>
        </form>

        <aside className="h-fit lg:sticky lg:top-24">
          <OrderSummary items={items} deliveryFee={deliveryFee} />
        </aside>
      </div>
    </div>
  );
}

