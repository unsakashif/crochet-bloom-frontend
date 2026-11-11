"use client";

import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { LeadTimeBadge } from "@/components/product/lead-time-badge";
import { PriceBlock } from "@/components/product/price-block";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import {
  PAKISTAN_CITIES,
  type Product,
  leadTimeLabel,
  relatedProducts,
} from "@/data/catalogue";
import { cn, formatPkr, whatsappHref } from "@/lib/utils";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";

export function ProductDetail({ product }: { product: Product }) {
  const [colour, setColour] = useState(product.colours[0] ?? "");
  const [city, setCity] = useState<string>("Lahore");
  const addProduct = useCartStore((s) => s.addProduct);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const wished = useWishlistStore((s) => s.productIds.includes(product.id));
  const related = useMemo(() => relatedProducts(product), [product]);

  const deliveryNote =
    city === "Karachi" || city === "Lahore" || city === "Islamabad"
      ? `Est. courier ${city}: 1–3 days after dispatch · COD available`
      : `Est. courier ${city}: 2–5 days after dispatch · COD available`;

  return (
    <>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-card bg-accent-soft shadow-soft lg:sticky lg:top-28">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="pb-24 lg:pb-0">
          <p className="text-xs uppercase tracking-wider text-muted">{product.category}</p>
          <h1 className="mt-1 font-display text-3xl sm:text-4xl">{product.name}</h1>
          <PriceBlock
            pricePkr={product.pricePkr}
            compareAtPkr={product.compareAtPkr}
            size="lg"
            className="mt-3"
          />

          <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>
          <p className="mt-2 text-xs text-muted">
            Handmade variation is normal — each piece may differ slightly in stitch and shade.
          </p>

          <fieldset className="mt-6">
            <legend className="text-sm font-medium">Colour</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colours.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColour(c)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm",
                    colour === c
                      ? "border-accent bg-accent-soft text-ink"
                      : "border-border bg-surface hover:border-accent",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button type="button" size="lg" onClick={() => addProduct(product, { colour })}>
              Add to cart
            </Button>
            <Button
              type="button"
              size="lg"
              variant="secondary"
              onClick={() => toggleWish(product.id)}
              aria-pressed={wished}
            >
              <Heart className={cn("h-4 w-4", wished && "fill-accent text-accent")} />
              Wishlist
            </Button>
            <a
              href={whatsappHref(`Hi, I'm interested in ${product.name} (${colour}).`)}
              className="text-sm text-accent underline"
            >
              Order on WhatsApp
            </a>
          </div>
          <p className="mt-3 text-sm font-medium text-ink">{leadTimeLabel(product)}</p>

          <label className="mt-6 block text-sm font-medium">
            Delivery estimate by city
            <select
              className="mt-1 h-11 w-full max-w-xs rounded-lg border border-border bg-surface px-3 text-sm"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              {PAKISTAN_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <p className="mt-2 text-sm text-muted">{deliveryNote}</p>

          <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
            <div>
              <dt className="font-medium">Material</dt>
              <dd className="text-muted">{product.material}</dd>
            </div>
            <div>
              <dt className="font-medium">Care</dt>
              <dd className="text-muted">{product.care}</dd>
            </div>
            <div>
              <dt className="font-medium">Size note</dt>
              <dd className="text-muted">
                Size chart placeholder — exact dimensions published with catalogue photos in Phase 1.
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{formatPkr(product.pricePkr)}</p>
            <LeadTimeBadge product={product} />
          </div>
          <Button type="button" onClick={() => addProduct(product, { colour })}>
            Add
          </Button>
          <Button asChild variant="secondary">
            <a href={whatsappHref(`Hi, about ${product.name}`)}>WhatsApp</a>
          </Button>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="font-display text-2xl">Related</h2>
          <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {related.map((p) => (
              <li key={p.id}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted">
            <Link href="/shop" className="text-accent underline">
              Browse all products
            </Link>
          </p>
        </section>
      )}
    </>
  );
}
