"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { BRAND_BACKGROUNDS } from "@/lib/brand-backgrounds";

const rungs = [
  { spend: "Rs 3,000", perk: "Free keychain with bouquet orders" },
  { spend: "Rs 5,000", perk: "Free shipping nationwide" },
  { spend: "Rs 8,000", perk: "Gift wrap + handwritten note" },
];

export function OfferBlock() {
  return (
    <section className="relative overflow-hidden border-y border-border">
      <Image
        src={BRAND_BACKGROUNDS.sectionStudio}
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#3a2430]/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3a2430]/55 via-[#3a2430]/35 to-[#3a2430]/50" />

      <div className="relative mx-auto max-w-6xl px-4 py-12">
        <Reveal>
          <h2 className="font-display text-2xl text-white sm:text-3xl">
            Bundle & free shipping ladder
          </h2>
          <p className="mt-1 text-sm text-white/80">Clear thresholds — no surprise fees at checkout.</p>
        </Reveal>
        <ol className="mt-6 grid gap-4 sm:grid-cols-3">
          {rungs.map((r, i) => (
            <Reveal key={r.spend} delay={0.08 * i}>
              <li className="rounded-card border border-border bg-surface/95 p-5 shadow-soft backdrop-blur-sm">
                <p className="font-script text-xl text-accent">Step {i + 1}</p>
                <p className="mt-1 font-display text-xl">{r.spend}</p>
                <p className="mt-1 text-sm text-muted">{r.perk}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
