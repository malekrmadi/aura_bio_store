import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "Conditions générales — Aura Bio" },
      {
        name: "description",
        content: "Conditions de commande, de livraison et d'utilisation des produits Aura Bio.",
      },
      { property: "og:title", content: "Conditions générales — Aura Bio" },
      { property: "og:description", content: "Conditions de commande et de livraison Aura Bio." },
      { property: "og:url", content: "/conditions" },
    ],
    links: [{ rel: "canonical", href: "/conditions" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-3xl">Conditions générales</h1>
      <div className="mt-6 grid gap-4 text-sm leading-relaxed text-foreground/90">
        <p>
          Les commandes passées sur ce site sont confirmées par téléphone avant expédition. Le
          paiement se fait à la livraison, en espèces.
        </p>
        <p>
          Nos produits sont des produits cosmétiques de soin. Ils ne remplacent pas un avis médical
          et ne constituent pas un traitement. En cas de réaction inhabituelle, cessez l'utilisation.
        </p>
        <p>
          Tenir hors de portée des enfants. Usage externe uniquement. Éviter le contact avec les yeux.
        </p>
        <p>
          Les prix sont indiqués en dinars tunisiens (DT) et peuvent évoluer. Les frais de livraison
          sont ajoutés au montant de la commande.
        </p>
      </div>
    </div>
  );
}
