import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  options?: string;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  promo: string | null;
  add: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  applyPromo: (code: string) => boolean;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      promo: null,
      add: (item) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === item.id && i.options === item.options);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i === existing ? { ...i, quantity: i.quantity + (item.quantity ?? 1) } : i,
              ),
            };
          }
          return { items: [...s.items, { ...item, quantity: item.quantity ?? 1 }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === id ? { ...i, quantity: qty } : i))
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [], promo: null }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      applyPromo: (code) => {
        const valid = ["BOGO", "FAMILY30", "WKND25", "NIGHTOWL"].includes(code.toUpperCase());
        if (valid) set({ promo: code.toUpperCase() });
        return valid;
      },
    }),
    { name: "pizzahub-cart" },
  ),
);

export const cartTotals = (items: CartItem[], promo: string | null) => {
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discountPct =
    promo === "FAMILY30"
      ? 0.3
      : promo === "WKND25"
        ? 0.25
        : promo === "BOGO" || promo === "NIGHTOWL"
          ? 0.15
          : 0;
  const discount = subtotal * discountPct;
  const delivery = subtotal > 25 || subtotal === 0 ? 0 : 2.99;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + delivery + tax;
  return { subtotal, discount, delivery, tax, total };
};
