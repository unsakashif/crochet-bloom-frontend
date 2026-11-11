"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { listOccasions } from "@/data/catalogue";

export function OccasionChips() {
  const occasions = listOccasions();

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Reveal>
        <h2 className="font-display text-2xl sm:text-3xl">Shop by occasion</h2>
        <p className="mt-1 text-sm text-muted">Find the right gift quickly.</p>
      </Reveal>
      <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {occasions.map((o, i) => (
          <li key={o.slug}>
            <Reveal delay={0.05 * i}>
              <Link
                href={`/occasions/${o.slug}`}
                className="group relative block overflow-hidden rounded-card border border-border shadow-soft"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={o.imageUrl}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-110"
                    sizes="160px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3 text-center text-sm font-medium text-white">
                    {o.label}
                  </span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
