"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";

export function SearchForm({ initialQuery = "" }: { initialQuery?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initialQuery);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search gifts, bouquets, baby sets…"
        className="h-11 flex-1 rounded-lg border border-border bg-surface px-3 text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
        aria-label="Search products"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
