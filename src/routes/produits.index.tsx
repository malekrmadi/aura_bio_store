import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProductsByCategory } from "@/services/productService";

type Search = { categorie?: string | undefined };

export const Route = createFileRoute("/produits/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    categorie: typeof search['categorie'] === "string" ? (search['categorie'] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Nos produits — Aura Bio" },
      {
        name: "description",
        content:
          "Tous les soins naturels Aura Bio : soins des pieds, du corps, des cheveux, huiles naturelles et beauté. Livraison partout en Tunisie.",
      },
      { property: "og:title", content: "Nos produits — Aura Bio" },
      {
        property: "og:description",
        content: "Tous les soins naturels Aura Bio. Livraison partout en Tunisie.",
      },
      { property: "og:url", content: "/produits" },
    ],
    links: [{ rel: "canonical", href: "/produits" }],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { categorie } = Route.useSearch();
  const active = categorie ?? "all";
  const list = getProductsByCategory(active);

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl">Nos produits</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Des soins naturels simples et efficaces, livrés partout en Tunisie.
      </p>

      <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2">
        {getCategories().map((c) => (
          <Link
            key={c.id}
            to="/produits"
            search={c.id === "all" ? {} : { categorie: c.id }}
            className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active === c.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-sage"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
