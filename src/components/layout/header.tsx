"use client";

import { Heart, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { MobileMenu } from "@/components/layout/mobile-menu";
import { UserMenu } from "@/components/layout/user-menu";
import { useLocale } from "@/lib/locale";
import { brandName } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

export function Header() {
  const router = useRouter();
  const count = useCartStore((s) => s.count);
  const { locale, toggleLocale } = useLocale();
  const [mounted, setMounted] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => setMounted(true), []);

  function onSearch(e: FormEvent) {
    e.preventDefault();
    const trimmed = q.trim();
    router.push(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search");
  }

  const cartCount = mounted ? count : 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <MobileMenu />
        <Link href="/" className="font-display text-xl tracking-tight text-accent sm:text-2xl">
          {brandName}
        </Link>

        <nav className="ms-6 hidden items-center gap-5 text-sm lg:flex">
          <Link href="/shop" className="hover:text-accent">
            Shop all
          </Link>
          <Link href="/occasions" className="hover:text-accent">
            Collections
          </Link>
          <Link href="/new-arrivals" className="hover:text-accent">
            New arrivals
          </Link>
          <Link href="/custom" className="hover:text-accent">
            Custom
          </Link>
          <Link href="/our-story" className="hover:text-accent">
            Our story
          </Link>
        </nav>

        <div className="ms-auto flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            className="hidden rounded-lg px-2 py-2 text-xs font-medium text-muted hover:bg-accent-soft hover:text-ink sm:inline-flex"
            onClick={toggleLocale}
            aria-label="Toggle language"
          >
            {locale === "en" ? "اردو" : "EN"}
          </button>
          <Link
            href="/search"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-accent-soft"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Link>
          <UserMenu />
          <Link
            href="/wishlist"
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-accent-soft"
            aria-label="Wishlist"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-accent-soft"
            aria-label={`Cart, ${cartCount} items`}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute end-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] text-accent-ink">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="border-t border-border/60 px-4 py-2 lg:hidden">
        <form
          onSubmit={onSearch}
          className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2"
        >
          <Search className="h-4 w-4 shrink-0 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search gifts, bouquets, baby sets…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="Search products"
          />
        </form>
      </div>
    </header>
  );
}
