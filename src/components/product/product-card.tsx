"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { LeadTimeBadge } from "@/components/product/lead-time-badge";
import { PriceBlock } from "@/components/product/price-block";
import { Button } from "@/components/ui/button";
import type { Product } from "@/data/catalogue";
import { useCartStore } from "@/store/cart";

export function ProductCard({ product }: { product: Product }) {
  const addProduct = useCartStore((s) => s.addProduct);
  const reduce = useReducedMotion();

  return (
    <motion.article
      className="group flex flex-col"
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-accent-soft">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/25 to-transparent opacity-0 transition group-hover:opacity-100" />
        </div>
        <h3 className="mt-3 text-sm font-medium hover:text-accent">{product.name}</h3>
      </Link>
      <PriceBlock
        pricePkr={product.pricePkr}
        compareAtPkr={product.compareAtPkr}
        size="sm"
        className="mt-1"
      />
      <LeadTimeBadge product={product} className="mt-0.5" />
      <Button
        type="button"
        size="sm"
        variant="secondary"
        className="mt-2 w-full"
        onClick={() => addProduct(product)}
      >
        Quick add
      </Button>
    </motion.article>
  );
}
