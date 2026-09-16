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
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h2 className="text-lg font-bold flex justify-between items-center">
        <span>ملخص الطلب</span>
        <span className="text-xs font-normal text-muted-foreground">Résumé de la commande</span>
      </h2>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item.productId} className="flex items-center gap-3">
            <img
              src={item.image}
              alt={item.name}
              loading="lazy"
              className="h-14 w-14 shrink-0 rounded-lg object-cover border border-border"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-muted-foreground">
                {item.offerLabel ?? `الكمية : ${item.quantity}`}
              </p>
            </div>
            <span className="shrink-0 text-sm font-bold">{item.lineTotal} DT</span>
          </li>
        ))}
      </ul>

      <dl className="mt-4 space-y-2.5 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">المجموع الفرعي (Sous-total)</dt>
          <dd className="font-semibold">{subtotal} DT</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-muted-foreground">التوصيل (Livraison)</dt>
          <dd className="font-semibold">{deliveryFee} DT</dd>
        </div>
        <div className="flex justify-between border-t border-border pt-3 text-base font-bold">
          <dt className="text-foreground">المجموع الكلي (Total)</dt>
          <dd className="text-primary text-xl font-bold">{subtotal + deliveryFee} DT</dd>
        </div>
      </dl>
    </div>
  );
}

