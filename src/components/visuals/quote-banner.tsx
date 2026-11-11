"use client";

import { Reveal } from "@/components/motion/reveal";

export function QuoteBanner({ text }: { text: string }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-xl px-4 py-6 text-center">
        <p className="dotted-frame font-script px-6 py-4 text-xl text-accent sm:text-2xl">{text}</p>
      </div>
    </Reveal>
  );
}
