import { DELIVERY_FEE } from "@/data/governorates";

export type OrderItem = {
  productId: string;
  slug: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  offerLabel?: string | undefined;
};

export type Customer = {
  name: string;
  phone: string;
  governorate: string;
  city: string;
  address: string;
  note?: string;
};

export type Order = {
  orderId: string;
  createdAt: string;
  notifyEmail: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: "cash_on_delivery";
  status: "pending";
};

export function getDeliveryFee(): number {
  return DELIVERY_FEE;
}

export function buildOrder(customer: Customer, items: OrderItem[]): Order {
  const subtotal = items.reduce((sum, i) => sum + i.lineTotal, 0);
  const deliveryFee = getDeliveryFee();
  return {
    orderId: generateOrderId(),
    createdAt: new Date().toISOString(),
    notifyEmail: "rmedimalik@gmail.com",
    customer,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    paymentMethod: "cash_on_delivery",
    status: "pending",
  };
}

function generateOrderId(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `AB-${n}`;
}

/**
 * URL Web App Google Apps Script.
 * Remplacez la valeur ci-dessous par l'URL de votre déploiement Google Apps Script,
 * ou définissez la variable VITE_GOOGLE_SHEETS_URL dans votre fichier .env.
 */
export const GOOGLE_SHEETS_WEBHOOK_URL =
  (import.meta.env["VITE_GOOGLE_SHEETS_URL"] as string | undefined) ||
  "https://script.google.com/macros/s/AKfycbxsGMFZxYqa2NQdsJFU9ksMn5jFNYXKsUA_7eLvqcnM5CbPrIThcGgZpOrfUHEAPhIu/exec"; // Exemple : "https://script.google.com/macros/s/.../exec"

export async function submitOrder(order: Order): Promise<{ success: boolean; order: Order }> {
  try {
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors", // recommandé pour contourner les restrictions CORS de Google Apps Script
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
    }
  } catch (err) {
    console.warn("Impossible d'envoyer la commande à Google Sheets :", err);
  }

  // Sauvegarde locale de secours (Backup localStorage)
  if (typeof window !== "undefined") {
    try {
      const key = "aura-bio-orders";
      const prev = JSON.parse(window.localStorage.getItem(key) ?? "[]");
      window.localStorage.setItem(key, JSON.stringify([...prev, order]));
    } catch {
      /* ignore */
    }
  }

  return { success: true, order };
}

