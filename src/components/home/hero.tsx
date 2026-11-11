"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SparkleField } from "@/components/visuals/sparkle-field";
import { BRAND_BACKGROUNDS } from "@/lib/brand-backgrounds";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[82vh] w-full overflow-hidden">
      {/* Owner-provided mood art as full-bleed home background */}
      <Image
        src={BRAND_BACKGROUNDS.home}
        alt="Handmade crochet mood — yarn, hook, scissors, and flower"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#3a2430]/80 via-[#8b3a4a]/40 to-[#3a2430]/15" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3a2430]/70 via-transparent to-[#3a2430]/30" />
      <SparkleField />

      <div className="relative mx-auto flex min-h-[82vh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:justify-center">
        <div className="max-w-xl text-accent-ink">
          <motion.p
            className="font-script text-2xl sm:text-3xl"
            style={{ color: "#f3dde4" }}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            handmade with love ♡
          </motion.p>
          <motion.h1
            className="mt-2 font-display text-4xl leading-tight sm:text-5xl md:text-6xl"
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
          >
            Crochet Bloom
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md text-sm text-white/90 sm:text-base"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
          >
            Timeless crochet gifts — bouquets, amigurumi, baby sets, and bridal pieces, made to order
            across Pakistan.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
          >
            <Button asChild size="lg">
              <Link href="/shop">Shop all</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="border-white/40 bg-white/15 text-white hover:bg-white/25"
            >
              <Link href="/new-arrivals">New arrivals</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/occasions">Collections</Link>
            </Button>
          </motion.div>
          <p className="mt-5 font-script text-xl text-white/85">
            little things create beautiful days ♡
          </p>
        </div>
      </div>
    </section>
  );
}
