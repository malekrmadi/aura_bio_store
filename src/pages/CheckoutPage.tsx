import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShieldCheck, Truck } from "lucide-react";
import { OrderSummary } from "@/components/OrderSummary";
import { clearBuyNowItem, getBuyNowItem, useCart } from "@/lib/cart";
import { governorates } from "@/data/governorates";
import {
  buildOrder,
  getDeliveryFee,
  submitOrder,
  type Customer,
  type OrderItem,
} from "@/services/orderService";

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
    if (direct) {
      const buyNow = getBuyNowItem();
      setItems(buyNow ? [buyNow] : []);
      setReady(true);
    } else {
      setItems(cart.items);
      setReady(true);
    }
  }, [direct, cart.items.length]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (customer.name.trim().length < 3) e['name'] = "Merci d'indiquer votre nom et prénom.";
    const phone = customer.phone.replace(/\s/g, "");
    if (!/^(\+216)?[2-59]\d{7}$/.test(phone)) e['phone'] = "Numéro tunisien invalide (8 chiffres).";
    if (!customer.governorate) e['governorate'] = "Choisissez votre gouvernorat.";
    if (customer.city.trim().length < 2) e['city'] = "Indiquez votre ville / délégation.";
    if (customer.address.trim().length < 5) e['address'] = "Indiquez votre adresse complète.";
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
        <h1 className="text-2xl font-bold">Aucun produit à commander</h1>
        <Link to="/produits" className="btn-base btn-primary mt-6">
          Voir les produits
        </Link>
      </div>
    );
  }

  const field = "mt-1 w-full rounded-xl border border-input bg-card px-4 py-3 text-base outline-none focus:border-primary";

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-bold">Finaliser ma commande</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Pas de compte, pas de paiement en ligne. Vous payez à la réception.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-border bg-card p-5" noValidate>
          <div>
            <label htmlFor="name" className="text-sm font-medium">Nom et prénom *</label>
            <input
              id="name"
              className={field}
              maxLength={100}
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              placeholder="Ex : Amel Ben Ali"
            />
            {errors['name'] && <p className="mt-1 text-xs text-destructive">{errors['name']}</p>}
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-medium">Téléphone *</label>
            <input
              id="phone"
              type="tel"
              inputMode="tel"
              className={field}
              maxLength={20}
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              placeholder="Ex : 20 123 456"
            />
            {errors['phone'] && <p className="mt-1 text-xs text-destructive">{errors['phone']}</p>}
          </div>

          <div>
            <label htmlFor="gov" className="text-sm font-medium">Gouvernorat *</label>
            <select
              id="gov"
              className={field}
              value={customer.governorate}
              onChange={(e) => setCustomer({ ...customer, governorate: e.target.value })}
            >
              <option value="">Choisir…</option>
              {governorates.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {errors['governorate'] && <p className="mt-1 text-xs text-destructive">{errors['governorate']}</p>}
          </div>

          <div>
            <label htmlFor="city" className="text-sm font-medium">Ville / Délégation *</label>
            <input
              id="city"
              className={field}
              maxLength={100}
              value={customer.city}
              onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
            />
            {errors['city'] && <p className="mt-1 text-xs text-destructive">{errors['city']}</p>}
          </div>

          <div>
            <label htmlFor="address" className="text-sm font-medium">Adresse *</label>
            <input
              id="address"
              className={field}
              maxLength={300}
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              placeholder="Rue, numéro, quartier"
            />
            {errors['address'] && <p className="mt-1 text-xs text-destructive">{errors['address']}</p>}
          </div>

          <div>
            <label htmlFor="note" className="text-sm font-medium">
              Note / complément d'adresse (optionnel)
            </label>
            <textarea
              id="note"
              rows={3}
              maxLength={300}
              className={field}
              value={customer.note}
              onChange={(e) => setCustomer({ ...customer, note: e.target.value })}
            />
          </div>

          <div className="rounded-xl bg-secondary p-4 text-sm">
            <p className="flex items-center gap-2 font-medium">
              <ShieldCheck className="h-4 w-4 text-primary" /> Paiement à la livraison
            </p>
            <p className="mt-1 text-muted-foreground">Vous payez à la réception de votre commande.</p>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <Truck className="h-4 w-4 text-primary" /> Livraison partout en Tunisie — {deliveryFee} DT
            </p>
          </div>

          <button type="submit" disabled={sending} className="btn-base btn-primary w-full py-4 text-lg disabled:opacity-70">
            {sending ? "Envoi en cours…" : "CONFIRMER MA COMMANDE"}
          </button>
        </form>

        <aside className="h-fit lg:sticky lg:top-24">
          <OrderSummary items={items} deliveryFee={deliveryFee} />
        </aside>
      </div>
    </div>
  );
}
