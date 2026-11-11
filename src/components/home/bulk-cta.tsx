"use client";

import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function BulkCta() {
  return (
    <Reveal>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="relative overflow-hidden rounded-card bg-accent px-6 py-10 text-accent-ink sm:px-10">
          <div
            className="pointer-events-none absolute -end-8 -top-8 h-40 w-40 rounded-full bg-white/10"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-10 -start-6 h-32 w-32 rounded-full bg-lavender/30"
            aria-hidden
          />
          <h2 className="relative font-display text-2xl sm:text-3xl">Bulk & corporate gifting</h2>
          <p className="relative mt-2 max-w-xl text-sm text-white/85">
            Eid hampers, employee gifts, and wedding favours — tell us the occasion and quantity.
          </p>
          <Button asChild variant="secondary" className="relative mt-6 border-0">
            <Link href="/bulk">Request a quote</Link>
          </Button>
        </div>
      </section>
    </Reveal>
  );
}
