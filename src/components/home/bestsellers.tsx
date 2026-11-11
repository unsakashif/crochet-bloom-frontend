"use client";

import Image from "next/image";

import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/motion/reveal";
import { listProducts } from "@/data/catalogue";
import { BRAND_BACKGROUNDS } from "@/lib/brand-backgrounds";

export function Bestsellers() {
  const products = listProducts({ sort: "bestselling" }).filter((p) => p.bestseller).slice(0, 4);

  return (
    <section className="relative overflow-hidden py-12">
      <Image
        src={BRAND_BACKGROUNDS.sectionCraft}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#3a2430]/72" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#3a2430]/40 via-transparent to-[#3a2430]/55" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="font-display text-2xl text-white sm:text-3xl">Bestsellers</h2>
          <p className="mt-1 text-sm text-white/80">Handmade crochet favourites from our studio.</p>
        </Reveal>
        <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((p, i) => (
            <li key={p.id}>
              <Reveal delay={0.06 * i}>
                <ProductCard product={p} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
