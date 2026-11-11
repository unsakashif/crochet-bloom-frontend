"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SparkleField } from "@/components/visuals/sparkle-field";
import { BRAND_BACKGROUNDS } from "@/lib/brand-backgrounds";
import { brandName } from "@/lib/utils";

export default function NotFound() {
  const reduce = useReducedMotion();

  return (
    <div className="relative isolate min-h-[70vh] overflow-hidden">
      <Image
        src={BRAND_BACKGROUNDS.home}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-[#3a2430]/70" />
      <SparkleField />
      <div className="relative mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center text-white">
        <motion.p
          className="font-script text-3xl text-[#f3dde4]"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          oops — tangled stitch
        </motion.p>
        <h1 className="mt-2 font-display text-3xl sm:text-4xl">Page not found</h1>
        <p className="mt-3 text-white/85">
          That link doesn&apos;t lead anywhere in {brandName}. Let&apos;s untangle it.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button asChild variant="secondary" className="border-white/30 bg-white/15 text-white">
            <Link href="/shop">Shop all</Link>
          </Button>
          <Button asChild variant="ghost" className="text-white hover:bg-white/10 hover:text-white">
            <Link href="/new-arrivals">New arrivals</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
