"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

import { BRAND_BACKGROUNDS, type BrandBackgroundKey } from "@/lib/brand-backgrounds";

export function PageBanner({
  background,
  title,
  subtitle,
  children,
  align = "start",
}: {
  background: BrandBackgroundKey;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  align?: "start" | "center";
}) {
  const reduce = useReducedMotion();
  const src = BRAND_BACKGROUNDS[background];

  return (
    <section className="relative isolate min-h-[42vh] overflow-hidden sm:min-h-[48vh]">
      <Image
        src={src}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#3a2430]/78 via-[#3a2430]/45 to-[#3a2430]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3a2430]/55 via-transparent to-[#3a2430]/20" />

      <div
        className={`relative mx-auto flex min-h-[42vh] max-w-6xl flex-col justify-end px-4 pb-10 pt-24 sm:min-h-[48vh] ${
          align === "center" ? "items-center text-center" : "items-start text-start"
        }`}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-xl"
        >
          <p className="font-script text-2xl text-[#f3dde4]">Crochet Bloom</p>
          <h1 className="mt-1 font-display text-3xl text-white sm:text-5xl">{title}</h1>
          {subtitle ? <p className="mt-3 text-sm text-white/90 sm:text-base">{subtitle}</p> : null}
          {children ? <div className="mt-5">{children}</div> : null}
        </motion.div>
      </div>
    </section>
  );
}
