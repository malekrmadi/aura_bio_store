import { products, categories, homeReviews, type Product } from "@/data/products";

/**
 * Couche de service produits.
 * Aujourd'hui : données locales (src/data/products.ts).
 * Demain : remplacer le corps de ces fonctions par un fetch vers
 * Google Sheets / Google Apps Script, sans toucher aux composants.
 */

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(limit = 4): Product[] {
  return products.slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
  if (!category || category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getCategories() {
  return categories;
}

export function getHomeReviews() {
  return homeReviews;
}
