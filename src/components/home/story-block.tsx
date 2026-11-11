"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { BRAND_BACKGROUNDS } from "@/lib/brand-backgrounds";

export function StoryBlock() {
  return (
    <Reveal>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card shadow-soft">
          <Image
            src={BRAND_BACKGROUNDS.story}
            alt="Crochet era collage — yarn, hooks, and cozy craft vibes"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="font-script text-2xl text-accent">handmade with love</p>
          <h2 className="mt-1 font-display text-2xl sm:text-3xl">Made by women artisans</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Crochet Bloom partners with in-house makers and home-based artisans across Pakistan.
            Every piece carries the rhythm of handwork — slight variation is part of the craft.
          </p>
          <Button asChild variant="secondary" className="mt-5">
            <Link href="/our-story">Our story</Link>
          </Button>
        </div>
      </section>
    </Reveal>
  );
}
