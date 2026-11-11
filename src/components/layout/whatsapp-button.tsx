"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

import { whatsappHref } from "@/lib/utils";

export function WhatsAppButton() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  if (pathname?.startsWith("/checkout")) return null;

  return (
    <motion.a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 end-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft sm:bottom-6"
      aria-label="Chat on WhatsApp"
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={reduce ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      whileHover={reduce ? undefined : { scale: 1.08 }}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden>
        <path d="M20.5 3.5A11 11 0 0 0 2.1 16.7L1 22l5.5-1.4A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-3.2.8.9-3.1-.2-.3A9 9 0 1 1 12 20.5zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-3.6-3.1c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.4s-.9.9-.9 2.1.9 2.5 1 2.6a10.5 10.5 0 0 0 4.2 3.5c1.5.6 2.1.7 2.9.6.4-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3s-.2-.2-.5-.3z" />
      </svg>
    </motion.a>
  );
}
