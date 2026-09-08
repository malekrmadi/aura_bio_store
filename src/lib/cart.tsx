import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { OrderItem } from "@/services/orderService";

const STORAGE_KEY = "aura-bio-cart";

type CartContextValue = {
  items: OrderItem[];
  count: number;
  subtotal: number;
  addItem: (item: OrderItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: OrderItem) =>
      setItems((prev) => {
        const existing = prev.find((i) => i.productId === item.productId);
        if (!existing) return [...prev, item];
        return prev.map((i) =>
          i.productId === item.productId
            ? {
                ...i,
                quantity: i.quantity + item.quantity,
                unitPrice: item.unitPrice,
                offerLabel: item.offerLabel,
                lineTotal: Number(
                  ((i.quantity + item.quantity) * item.unitPrice).toFixed(2),
                ),
              }
            : i,
        );
      });

    const updateQuantity = (productId: string, quantity: number) =>
      setItems((prev) =>
        prev
          .map((i) =>
            i.productId === productId
              ? {
                  ...i,
                  quantity: Math.max(1, quantity),
                  lineTotal: Number((Math.max(1, quantity) * i.unitPrice).toFixed(2)),
                }
              : i,
          )
          .filter((i) => i.quantity > 0),
      );

    return {
      items,
      count: items.reduce((s, i) => s + i.quantity, 0),
      subtotal: items.reduce((s, i) => s + i.lineTotal, 0),
      addItem,
      updateQuantity,
      removeItem: (productId: string) =>
        setItems((prev) => prev.filter((i) => i.productId !== productId)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart doit être utilisé dans CartProvider");
  return ctx;
}

const BUY_NOW_KEY = "aura-bio-buy-now";

export function setBuyNowItem(item: OrderItem) {
  try {
    window.sessionStorage.setItem(BUY_NOW_KEY, JSON.stringify(item));
  } catch {
    /* ignore */
  }
}

export function getBuyNowItem(): OrderItem | null {
  try {
    const raw = window.sessionStorage.getItem(BUY_NOW_KEY);
    return raw ? (JSON.parse(raw) as OrderItem) : null;
  } catch {
    return null;
  }
}

export function clearBuyNowItem() {
  try {
    window.sessionStorage.removeItem(BUY_NOW_KEY);
  } catch {
    /* ignore */
  }
}
