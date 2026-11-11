"use client";

import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import { BRAND_BACKGROUNDS } from "@/lib/brand-backgrounds";

const placeholders = [
  {
    name: "Ayesha K.",
    city: "Lahore",
    text: "Placeholder review — real verified reviews arrive with catalogue data.",
  },
  {
    name: "Hassan R.",
    city: "Karachi",
    text: "Placeholder review — do not treat as a customer quote.",
  },
  {
    name: "Sara M.",
    city: "Islamabad",
    text: "Placeholder review — owner will replace with moderated submissions.",
  },
];

export function Reviews() {
  return (
    <section className="relative overflow-hidden py-12">
      <Image
        src={BRAND_BACKGROUNDS.sectionCraft}
        alt=""
        fill
        className="object-cover object-[center_30%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[#3a2430]/75" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#3a2430]/50 via-transparent to-[#3a2430]/40" />

      <div className="relative mx-auto max-w-6xl px-4">
        <Reveal>
          <h2 className="font-display text-2xl text-white sm:text-3xl">Verified reviews</h2>
          <p className="mt-1 text-sm text-white/80">Placeholders only — no invented testimonials.</p>
        </Reveal>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {placeholders.map((r, i) => (
            <Reveal key={r.name} delay={0.07 * i}>
              <li className="rounded-card border border-white/20 bg-surface/95 p-5 shadow-soft backdrop-blur-sm">
                <p className="font-script text-lg text-accent">♡</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">&ldquo;{r.text}&rdquo;</p>
                <p className="mt-4 text-sm font-medium">
                  {r.name} · {r.city}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
