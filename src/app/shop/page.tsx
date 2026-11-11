import { Suspense } from "react";

import { PageBanner } from "@/components/layout/page-banner";
import { ProductGrid } from "@/components/shop/product-grid";
import { ShopFilters } from "@/components/shop/filters";
import {
  listProducts,
  type FulfilmentMode,
  type ProductFilters,
} from "@/data/catalogue";

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  const filters: ProductFilters = {
    category: first(searchParams.category),
    occasion: first(searchParams.occasion),
    fulfilment: (first(searchParams.fulfilment) as FulfilmentMode | "any" | undefined) ?? "any",
    sort: (first(searchParams.sort) as ProductFilters["sort"]) ?? "bestselling",
    q: first(searchParams.q),
  };
  const products = listProducts(filters);

  return (
    <>
      <PageBanner
        background="shop"
        title="Shop all"
        subtitle="Browse handmade crochet gifts — bouquets, amigurumi, baby sets, bags, and more."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mt-2">
          <Suspense fallback={<p className="text-sm text-muted">Loading filters…</p>}>
            <ShopFilters />
          </Suspense>
        </div>
        <p className="mt-4 text-sm text-muted">{products.length} crochet pieces</p>
        <ProductGrid products={products} />
      </div>
    </>
  );
}
