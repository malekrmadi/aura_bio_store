import { useSearchParams, Link } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { getCategories, getProductsByCategory } from "@/services/productService";

export function ProductsPage() {
  const [searchParams] = useSearchParams();
  const categorie = searchParams.get("categorie");
  const active = categorie ?? "all";
  const list = getProductsByCategory(active);

  return (
    <div className="container-page py-8">
      <h1 className="text-3xl font-bold">Nos produits</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Des soins naturels simples et efficaces, livrés partout en Tunisie.
      </p>

      <div className="-mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2">
        {getCategories().map((c) => (
          <Link
            key={c.id}
            to={c.id === "all" ? "/produits" : `/produits?categorie=${encodeURIComponent(c.id)}`}
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

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
