"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { productType } from "@/types";

export type CartItem = {
  product: productType;
  color: string;
  size: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  itemCount: number;
  total: number;
  addItem: (product: productType, color: string, size: string) => void;
  updateQuantity: (productId: string | number, color: string, size: string, quantity: number) => void;
  removeItem: (productId: string | number, color: string, size: string) => void;
  clearCart: () => void;
};

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      itemCount: 0,
      total: 0,

      addItem: (product: productType, color: string, size: string) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id && item.color === color && item.size === size,
          );

          if (existingItem) {
            const items = state.items.map((item) =>
              item === existingItem ? { ...item, quantity: item.quantity + 1 } : item,
            );
            return getTotals(items);
          }

          return getTotals([...state.items, { product, color, size, quantity: 1 }]);
        });
      },

      updateQuantity: (
        productId: string | number,
        color: string,
        size: string,
        quantity: number,
      ) => set((state) => {
        const items = state.items.flatMap((item) => {
          const isMatch = item.product.id === productId && item.color === color && item.size === size;
          return isMatch && quantity <= 0 ? [] : isMatch ? [{ ...item, quantity }] : [item];
        });
        return getTotals(items);
      }),

      removeItem: (productId: string | number, color: string, size: string) =>
        set((state) =>
          getTotals(
            state.items.filter(
              (item) => !(item.product.id === productId && item.color === color && item.size === size),
            ),
          ),
        ),

      clearCart: () => set({ items: [], itemCount: 0, total: 0 }),
    }),
    {
      name: "trend-lama-cart",
      partialize: (state) => ({
        items: state.items,
        itemCount: state.itemCount,
        total: state.total,
      }),
    },
  ),
);

const getTotals = (items: CartItem[]) => ({
  items,
  itemCount: items.reduce((count, item) => count + item.quantity, 0),
  total: items.reduce((total, item) => total + item.product.price * item.quantity, 0),
});
