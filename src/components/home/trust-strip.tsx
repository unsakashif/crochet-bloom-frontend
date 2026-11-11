"use client";

import { Reveal } from "@/components/motion/reveal";

const items = [
  "Handmade",
  "Lead time shown",
  "Cash on delivery",
  "Nationwide delivery",
  "WhatsApp support",
];

export function TrustStrip() {
  return (
    <Reveal>
      <section className="border-y border-border bg-surface/80 backdrop-blur-sm">
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-4 text-center text-xs sm:text-sm">
          {items.map((item) => (
            <li key={item} className="text-muted">
              <span className="me-2 inline-block text-accent">✦</span>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </Reveal>
  );
}
