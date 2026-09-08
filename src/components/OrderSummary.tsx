import type { OrderItem } from "@/services/orderService";

export function OrderSummary({
  items,
  deliveryFee,
}: {
  items: OrderItem[];
  deliveryFee: number;
}) {
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <h2 className="text-lg">Résumé de la commande</h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.offerLabel ?? `Quantité : ${item.quantity}`}
              </p>
            </div>
            <span className="shrink-0 text-sm font-semibold">{item.lineTotal} DT</span>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
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
    </div>
  );
}
