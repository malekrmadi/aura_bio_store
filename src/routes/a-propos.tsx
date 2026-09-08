import { createFileRoute, Link } from "@tanstack/react-router";
import cover from "@/assets/cover.jpg.asset.json";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos — Aura Bio" },
      {
        name: "description",
        content:
          "Aura Bio est une marque tunisienne de soins naturels : des formules simples, douces et honnêtes pour le quotidien.",
      },
      { property: "og:title", content: "À propos — Aura Bio" },
      { property: "og:description", content: "Marque tunisienne de soins naturels." },
      { property: "og:url", content: "/a-propos" },
    ],
    links: [{ rel: "canonical", href: "/a-propos" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="text-3xl">À propos d'Aura Bio</h1>
      <img
        src={cover.url}
        alt="Univers naturel d'Aura Bio"
        loading="lazy"
        className="mt-6 w-full rounded-2xl object-cover"
      />
      <div className="mt-6 grid gap-4 text-base leading-relaxed text-foreground/90">
        <p>
          Aura Bio est une marque tunisienne née d'une idée simple : prendre soin de soi avec des
          produits naturels, faciles à utiliser et accessibles.
        </p>
        <p>
          Nous choisissons des ingrédients simples — huile de nigelle, cire d'abeille, beurres et
          huiles végétales — pour des soins du quotidien destinés à la peau, aux cheveux et au corps.
        </p>
        <p>
          Nous livrons partout en Tunisie et vous payez à la réception de votre commande. Une
          question ? Écrivez-nous sur WhatsApp, nous répondons avec plaisir.
        </p>
      </div>
      <Link to="/produits" className="btn-base btn-primary mt-8">
        Découvrir nos produits
      </Link>
    </div>
  );
}
