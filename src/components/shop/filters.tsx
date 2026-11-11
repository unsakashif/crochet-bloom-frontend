"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { CATEGORIES, OCCASIONS } from "@/data/catalogue";

export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (!value || value === "any") next.delete(key);
      else next.set(key, value);
      next.delete("page");
      const q = next.toString();
      router.push(q ? `${pathname}?${q}` : pathname);
    },
    [params, pathname, router],
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      <label className="flex flex-col gap-1 text-xs font-medium text-muted">
        Category
        <select
          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-ink"
          value={params.get("category") ?? ""}
          onChange={(e) => setParam("category", e.target.value)}
        >
          <option value="">All</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium text-muted">
        Occasion
        <select
          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-ink"
          value={params.get("occasion") ?? ""}
          onChange={(e) => setParam("occasion", e.target.value)}
        >
          <option value="">All</option>
          {OCCASIONS.map((o) => (
            <option key={o.slug} value={o.slug}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium text-muted">
        Availability
        <select
          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-ink"
          value={params.get("fulfilment") ?? "any"}
          onChange={(e) => setParam("fulfilment", e.target.value)}
        >
          <option value="any">Any</option>
          <option value="in_stock">In stock now</option>
          <option value="made_to_order">Made to order</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium text-muted">
        Sort
        <select
          className="h-10 rounded-lg border border-border bg-surface px-3 text-sm text-ink"
          value={params.get("sort") ?? "bestselling"}
          onChange={(e) => setParam("sort", e.target.value)}
        >
          <option value="bestselling">Bestselling</option>
          <option value="newest">Newest</option>
          <option value="price_asc">Price: low to high</option>
          <option value="price_desc">Price: high to low</option>
        </select>
      </label>
    </div>
  );
}
