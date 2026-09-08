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
 * Enregistrement de la commande.
 * Version actuelle : simulation locale.
 * Pour brancher Google Sheets, remplacer uniquement le contenu de cette
 * fonction par un fetch POST vers l'URL du Google Apps Script.
 */
export async function submitOrder(order: Order): Promise<{ success: boolean; order: Order }> {
  await new Promise((r) => setTimeout(r, 600));
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
