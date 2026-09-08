import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { getDeliveryFee } from "@/services/orderService";

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const deliveryFee = getDeliveryFee();

  if (items.length === 0) {
    return (
      <div className="container-page py-16 text-center">
        <h1 className="text-2xl font-bold">Votre panier est vide</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Découvrez nos soins naturels et faites-vous plaisir.
        </p>
        <Link to="/produits" className="btn-base btn-primary mt-6">
          Voir les produits
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-bold">Mon panier</h1>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <ul className="grid gap-4">
          {items.map((item) => (
            <li
              key={item.productId}
              className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="h-20 w-20 shrink-0 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link
                      to={`/produits/${item.slug}`}
                      className="truncate font-medium hover:text-primary"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.unitPrice} DT / unité</p>
                  </div>
                  <button
                    type="button"
                    aria-label="Supprimer"
                    onClick={() => removeItem(item.productId)}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-muted-foreground hover:bg-secondary"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <div className="flex items-center rounded-full border border-border">
                    <button
                      type="button"
                      aria-label="Diminuer"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Augmenter"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="grid h-9 w-9 place-items-center rounded-full hover:bg-secondary"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <span className="font-bold text-primary">{item.lineTotal} DT</span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-2xl border border-border bg-card p-5">
          <h2 className="text-lg font-semibold">Total</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Sous-total</dt>
              <dd>{subtotal} DT</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Livraison</dt>
              <dd>{deliveryFee} DT</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd className="text-primary">{subtotal + deliveryFee} DT</dd>
            </div>
          </dl>
          <Link to="/commande" className="btn-base btn-primary mt-5 w-full py-4">
            Passer la commande
          </Link>
          <Link to="/produits" className="btn-base mt-2 w-full text-sm text-muted-foreground">
            Continuer mes achats
          </Link>
        </aside>
      </div>
    </div>
  );
}
