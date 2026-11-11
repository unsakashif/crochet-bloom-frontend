"use client";

import Link from "next/link";

import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/catalogue";
import { useWishlistStore } from "@/store/wishlist";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const products = productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-display text-3xl">Wishlist</h1>
      <p className="mt-1 text-sm text-muted">Saved on this device only until accounts launch.</p>
      {products.length === 0 ? (
        <div className="mt-10">
          <p className="text-muted">No saved items yet.</p>
          <Button asChild className="mt-4">
            <Link href="/shop">Browse shop</Link>
          </Button>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
