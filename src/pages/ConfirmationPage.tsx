import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { Order } from "@/services/orderService";
import { SHOP_WHATSAPP } from "@/data/governorates";

export function ConfirmationPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("aura-bio-last-order");
      if (raw) setOrder(JSON.parse(raw) as Order);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-primary" />
        <h1 className="mt-4 text-2xl font-bold">Merci pour votre commande ! ❤️</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Votre commande a bien été enregistrée. Nous allons vous contacter prochainement pour la
          confirmer.
        </p>

        {order && (
          <dl className="mt-6 grid gap-2 rounded-2xl bg-secondary p-4 text-left text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Numéro de commande</dt>
              <dd className="font-semibold">{order.orderId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Nom</dt>
              <dd>{order.customer.name}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Téléphone</dt>
              <dd>{order.customer.phone}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-bold">
              <dt>Total</dt>
              <dd className="text-primary">{order.total} DT</dd>
            </div>
          </dl>
        )}

        <a
          href={`https://wa.me/${SHOP_WHATSAPP}`}
          target="_blank"
          rel="noreferrer"
          className="btn-base btn-outline mt-6 w-full"
        >
          <MessageCircle className="h-4 w-4" /> Besoin d'aide ? WhatsApp
        </a>
        <Link to="/produits" className="btn-base btn-primary mt-3 w-full">
          Continuer mes achats
        </Link>
      </div>
    </div>
  );
}
