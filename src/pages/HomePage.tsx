import { Link } from "react-router-dom";
import { Leaf, Heart, Package, Flag } from "lucide-react";
import cover from "@/assets/cover aura bio.jpg";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/Price";
import { ReviewCarousel } from "@/components/ReviewCarousel";
import { getCategories, getFeaturedProducts, getHomeReviews } from "@/services/productService";

const reasons = [
  { icon: Leaf, title: "Ingrédients naturels", text: "Des formules simples et douces." },
  { icon: Heart, title: "Pensé pour votre bien-être", text: "Des soins du quotidien." },
  { icon: Flag, title: "Marque tunisienne", text: "Fabriquée et pensée en Tunisie." },
  { icon: Package, title: "Livraison en Tunisie", text: "Paiement à la livraison." },
];

export function HomePage() {
  const featured = getFeaturedProducts(4);
  const categories = getCategories().filter((c) => c.id !== "all");
  const reviews = getHomeReviews();

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <img
          src={cover}
          alt="Univers Aura Bio"
          className="h-[62vh] min-h-[380px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-page text-center">
            <h1 className="text-4xl sm:text-5xl font-bold">Aura Bio</h1>
            <p className="mt-3 text-lg font-medium sm:text-xl">Le soin naturel, simplement.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-foreground/90 sm:text-base">
              Découvrez notre soin d'exception pour nourrir et adoucir votre peau au quotidien.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link to="/produits" className="btn-base btn-primary">
                Découvrir nos produits
              </Link>
              {featured[0] && (
                <Link
                  to={`/produits/${featured[0].slug}`}
                  className="btn-base btn-outline bg-background/80"
                >
                  Commander maintenant
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CATÉGORIES */}
      <section className="container-page py-12">
        <SectionTitle title="Nos catégories" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/produits?categorie=${encodeURIComponent(c.id)}`}
              className="rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-sage"
            >
              <div className="text-2xl">{c.emoji}</div>
              <div className="mt-2 text-sm font-medium">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* PRODUIT STAR */}
      <section className="container-page py-6">
        <SectionTitle title="Notre produit star" subtitle="Choisissez votre offre, commandez, on vous livre." />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 justify-center max-w-4xl mx-auto">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/produits" className="btn-base btn-outline">
            Voir le produit
          </Link>
        </div>
      </section>

      {/* POURQUOI */}
      <section className="bg-secondary/50 py-12">
        <div className="container-page">
          <SectionTitle title="Pourquoi Aura Bio ?" />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl bg-card p-5 text-center">
                <r.icon className="mx-auto h-7 w-7 text-primary" />
                <h3 className="mt-3 text-base">{r.title}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVIS */}
      <section className="container-page py-12">
        <SectionTitle title="Ce que disent nos clientes" />
        <ReviewCarousel reviews={reviews} />
      </section>

      {/* BANNER */}
      <section className="container-page pb-14">
        <div className="rounded-3xl bg-primary px-6 py-10 text-center text-primary-foreground">
          <h2 className="text-2xl text-primary-foreground sm:text-3xl">
            Prenez soin de vous naturellement.
          </h2>
          <p className="mt-2 text-sm opacity-90">Découvrez nos offres du moment.</p>
          <Link
            to="/produits"
            className="btn-base mt-6 bg-background text-primary hover:bg-cream"
          >
            Voir les offres
          </Link>
        </div>
      </section>
    </>
  );
}
