import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getDeliveryFee } from "@/services/orderService";
import { trackInitiateCheckout } from "@/lib/metaPixel";

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const deliveryFee = getDeliveryFee();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    trackInitiateCheckout(items, subtotal + deliveryFee);
    navigate("/commande");
  };

  if (items.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-bold">سلة التسوق فارغة • Votre panier est vide</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          اكتشف منتجاتنا الطبيعية واطلب الآن مع التوصيل لجميع الولايات.
        </p>
        <Link to="/produits" className="btn-base btn-primary mt-6 text-base font-bold">
          تصفح المنتجات • Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-bold">سلة التسوق • Mon panier</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <ul className="grid gap-4">
          {items.map((item) => (
            <li
              key={item.productId}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-xs"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-20 w-20 shrink-0 rounded-xl object-cover border border-border"
              />
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      to={`/produits/${item.slug}`}
                      className="truncate font-semibold text-base hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.unitPrice} DT / للقطعة</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Supprimer"
                    onClick={() => removeItem(item.productId)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center rounded-full border border-border bg-background">
                    <button
                      type="button"
                      aria-label="Diminuer"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Augmenter"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-bold text-primary text-lg">{item.lineTotal} DT</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-lg font-bold">ملخص الطلب • Total</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">المجموع الفرعي (Sous-total)</dt>
              <dd className="font-semibold">{subtotal} DT</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">التوصيل (Livraison)</dt>
              <dd className="font-semibold">{deliveryFee} DT</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <dt>المجموع الكلي (Total)</dt>
              <dd className="text-primary text-xl">{subtotal + deliveryFee} DT</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={handleProceedToCheckout}
            className="btn-base btn-primary mt-5 w-full py-4 text-lg font-bold shadow-md shadow-primary/20"
          >
            تأكيد الطلب — Passer la commande
          </button>
          <Link to="/produits" className="btn-base mt-2 w-full text-sm text-muted-foreground hover:text-foreground">
            مواصلة التسوق • Continuer mes achats
          </Link>
        </aside>
      </div>
    </div>
  );
}

