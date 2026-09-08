import { DELIVERY_FEE } from "@/data/governorates";

export function DeliveryPage() {
  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-3xl font-bold">Livraison</h1>
      <ul className="mt-6 grid gap-3 text-base">
        <li className="rounded-2xl border border-border bg-card p-5">
          Nous livrons dans les <strong>24 gouvernorats</strong> de Tunisie.
        </li>
        <li className="rounded-2xl border border-border bg-card p-5">
          Frais de livraison : <strong>{DELIVERY_FEE} DT</strong>.
        </li>
        <li className="rounded-2xl border border-border bg-card p-5">
          Délai habituel : <strong>24 à 72 heures</strong> après confirmation par téléphone.
        </li>
        <li className="rounded-2xl border border-border bg-card p-5">
          Paiement <strong>à la livraison</strong> : vous payez à la réception.
        </li>
      </ul>
    </div>
  );
}
