"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/catalogue";

const PAGE_SIZE = 8;

export function ProductGrid({ products }: { products: Product[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const slice = useMemo(() => products.slice(0, visible), [products, visible]);
  const hasMore = visible < products.length;

  if (products.length === 0) {
    return (
      <p className="mt-10 text-muted">
        No products match these filters. Try clearing filters or{" "}
        <a href="/shop" className="text-accent underline">
          browse all
        </a>
        .
      </p>
    );
  }

  return (
    <div>
      <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {slice.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="mt-10 flex justify-center">
          <Button type="button" variant="secondary" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more
          </Button>
        </div>
      )}
    </div>
  );
}
