"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { Product } from "@/data/catalogue";
import { leadTimeLabel } from "@/data/catalogue";

/**
 * Optimistic client cart. Server-authoritative cart + guest-token cookie arrive in Phase 2.
 */
export type CartLine = {
  productId: string;
  slug: string;
  name: string;
  unitPricePkr: number;
  quantity: number;
  colour?: string;
  leadTime: string;
};

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addProduct: (product: Product, opts?: { colour?: string; quantity?: number }) => void;
  setQuantity: (productId: string, colour: string | undefined, quantity: number) => void;
  removeLine: (productId: string, colour?: string) => void;
  clear: () => void;
};

function lineKey(productId: string, colour?: string) {
  return `${productId}::${colour ?? ""}`;
}

function recompute(lines: CartLine[]) {
  return {
    lines,
    count: lines.reduce((n, l) => n + l.quantity, 0),
    subtotal: lines.reduce((n, l) => n + l.unitPricePkr * l.quantity, 0),
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      count: 0,
      subtotal: 0,
      addProduct: (product, opts) => {
        const colour = opts?.colour;
        const quantity = opts?.quantity ?? 1;
        const key = lineKey(product.id, colour);
        const existing = get().lines.find((l) => lineKey(l.productId, l.colour) === key);
        let next: CartLine[];
        if (existing) {
          next = get().lines.map((l) =>
            lineKey(l.productId, l.colour) === key
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          );
        } else {
          next = [
            ...get().lines,
            {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              unitPricePkr: product.pricePkr,
              quantity,
              colour,
              leadTime: leadTimeLabel(product),
            },
          ];
        }
        set(recompute(next));
      },
      setQuantity: (productId, colour, quantity) => {
        if (quantity <= 0) {
          get().removeLine(productId, colour);
          return;
        }
        const next = get().lines.map((l) =>
          lineKey(l.productId, l.colour) === lineKey(productId, colour)
            ? { ...l, quantity }
            : l,
        );
        set(recompute(next));
      },
      removeLine: (productId, colour) => {
        const next = get().lines.filter(
          (l) => lineKey(l.productId, l.colour) !== lineKey(productId, colour),
        );
        set(recompute(next));
      },
      clear: () => set({ lines: [], count: 0, subtotal: 0 }),
    }),
    { name: "cb-cart-v1" },
  ),
);
