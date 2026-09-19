import type { OrderItem, Order } from "@/services/orderService";
import type { Product } from "@/data/products";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

/**
 * ID du Pixel Meta (Facebook Ads).
 * Peut être défini via la variable d'environnement VITE_META_PIXEL_ID dans votre fichier .env.
 */
export const META_PIXEL_ID =
  (import.meta.env["VITE_META_PIXEL_ID"] as string | undefined) || "1471739124847033";

let isInitialized = false;

/**
 * Initialise l'extrait JavaScript Meta Pixel si un ID est configuré.
 */
export function initMetaPixel(): void {
  if (isInitialized || typeof window === "undefined") return;

  if (!META_PIXEL_ID) {
    console.info(
      "[Meta Pixel] Aucun VITE_META_PIXEL_ID configuré dans le fichier .env. Le suivi Meta Pixel fonctionnera en mode simulation (log console).",
    );
  }

  // Code officiel snippet Meta Pixel
  /* eslint-disable */
  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(
    window,
    document,
    "script",
    "https://connect.facebook.net/en_US/fbevents.js",
  );
  /* eslint-enable */

  if (META_PIXEL_ID) {
    window.fbq?.("init", META_PIXEL_ID);
  }
  isInitialized = true;
}

/**
 * Envoie un événement personnalisé ou standard au Pixel Meta.
 */
function trackEvent(eventName: string, data?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  if (window.fbq && META_PIXEL_ID) {
    window.fbq("track", eventName, data);
  }
}

/**
 * Événement : PageView (à chaque changement de page)
 */
export function trackPageView(): void {
  trackEvent("PageView");
}

/**
 * Événement : ViewContent (lors de la consultation d'une fiche produit)
 */
export function trackViewContent(product: Product): void {
  trackEvent("ViewContent", {
    content_name: product.name,
    content_category: product.category,
    content_ids: [product.id],
    content_type: "product",
    value: product.price,
    currency: "TND",
  });
}

/**
 * Événement : AddToCart (au clic sur Ajouter au panier)
 */
export function trackAddToCart(item: OrderItem): void {
  trackEvent("AddToCart", {
    content_name: item.name,
    content_ids: [item.productId],
    content_type: "product",
    value: item.lineTotal,
    currency: "TND",
    quantity: item.quantity,
  });
}

/**
 * Événement : InitiateCheckout (lors de l'accès à la caisse ou clic Commander maintenant)
 */
export function trackInitiateCheckout(items: OrderItem[], total: number): void {
  trackEvent("InitiateCheckout", {
    content_ids: items.map((i) => i.productId),
    content_type: "product",
    num_items: items.reduce((acc, i) => acc + i.quantity, 0),
    value: total,
    currency: "TND",
  });
}

/**
 * Événement : Purchase (lorsque la commande est validée avec succès)
 */
export function trackPurchase(order: Order): void {
  trackEvent("Purchase", {
    content_ids: order.items.map((i) => i.productId),
    content_type: "product",
    value: order.total,
    currency: "TND",
    num_items: order.items.reduce((acc, i) => acc + i.quantity, 0),
    order_id: order.orderId,
  });
}
