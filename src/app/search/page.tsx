import { Suspense } from "react";

import { PageBanner } from "@/components/layout/page-banner";
import { ProductGrid } from "@/components/shop/product-grid";
import { SearchForm } from "@/components/shop/search-form";
import { listProducts } from "@/data/catalogue";

type SearchParams = Record<string, string | string[] | undefined>;

function first(v: string | string[] | undefined): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v;
}

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const q = first(searchParams.q) ?? "";
  const products = q ? listProducts({ q, sort: "bestselling" }) : [];

  return (
    <>
      <PageBanner
        background="shop"
        title="Search"
        subtitle="Find crochet bouquets, amigurumi, baby sets, and more."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="max-w-xl">
          <Suspense fallback={null}>
            <SearchForm initialQuery={q} />
          </Suspense>
        </div>
        {q ? (
          <>
            <p className="mt-4 text-sm text-muted">
              {products.length} result{products.length === 1 ? "" : "s"} for &ldquo;{q}&rdquo;
              {products.length === 0 && " — try bouquet, bunny, or yarn."}
            </p>
            <ProductGrid products={products} />
          </>
        ) : (
          <p className="mt-6 text-muted">Search crochet gifts…</p>
        )}
      </div>
    </>
  );
}
