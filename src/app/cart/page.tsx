"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatPkr } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

export default function CartPage() {
  const { lines, count, subtotal, setQuantity, removeLine, clear } = useCartStore();

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-display text-3xl">Cart</h1>
      <p className="mt-1 text-sm text-muted">
        {count} item{count === 1 ? "" : "s"} · client cart (server cart in Phase 2)
      </p>

      {lines.length === 0 ? (
        <div className="mt-10">
          <p className="text-muted">Your cart is empty.</p>
          <Button asChild className="mt-4">
            <Link href="/shop">Continue shopping</Link>
          </Button>
        </div>
      ) : (
        <>
          <ul className="mt-8 space-y-4">
            {lines.map((line) => (
              <li
                key={`${line.productId}-${line.colour ?? ""}`}
                className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <Link
                    href={`/products/${line.slug}`}
                    className="font-medium hover:text-accent"
                  >
                    {line.name}
                  </Link>
                  {line.colour && <p className="text-sm text-muted">{line.colour}</p>}
                  <p className="text-xs text-muted">{line.leadTime}</p>
                  <p className="mt-1 text-sm">{formatPkr(line.unitPricePkr)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    Qty
                    <input
                      type="number"
                      min={1}
                      value={line.quantity}
                      onChange={(e) =>
                        setQuantity(line.productId, line.colour, Number(e.target.value) || 1)
                      }
                      className="h-9 w-16 rounded border border-border bg-surface px-2"
                    />
                  </label>
                  <p className="w-24 text-end text-sm font-medium">
                    {formatPkr(line.unitPricePkr * line.quantity)}
                  </p>
                  <button
                    type="button"
                    className="text-xs text-danger underline"
                    onClick={() => removeLine(line.productId, line.colour)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-2 border-t border-border pt-6">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-medium">{formatPkr(subtotal)}</span>
            </div>
            <p className="text-xs text-muted">
              Shipping estimated at checkout by city. Free shipping ladder from Rs 5,000.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/checkout">Checkout</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/shop">Keep shopping</Link>
            </Button>
            <button type="button" className="text-sm text-muted underline" onClick={clear}>
              Clear cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}
