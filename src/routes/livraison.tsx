import { createFileRoute } from "@tanstack/react-router";
import { DELIVERY_FEE } from "@/data/governorates";

export const Route = createFileRoute("/livraison")({
  head: () => ({
    meta: [
      { title: "Livraison — Aura Bio" },
      {
        name: "description",
        content: `Livraison partout en Tunisie pour ${DELIVERY_FEE} DT, paiement à la livraison, délai de 24 à 72 heures.`,
      },
      { property: "og:title", content: "Livraison — Aura Bio" },
      { property: "og:description", content: "Livraison partout en Tunisie, paiement à la livraison." },
      { property: "og:url", content: "/livraison" },
    ],
    links: [{ rel: "canonical", href: "/livraison" }],
  }),
  component: DeliveryPage,
});

function DeliveryPage() {
  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-3xl">Livraison</h1>
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
