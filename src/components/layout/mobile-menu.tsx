"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import { CATEGORIES, OCCASIONS } from "@/data/catalogue";
import { useLocale } from "@/lib/locale";
import { brandName, whatsappHref } from "@/lib/utils";

export function MobileMenu() {
  const { locale, toggleLocale } = useLocale();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-accent-soft lg:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/40" />
        <Dialog.Content className="fixed inset-0 z-50 flex flex-col bg-canvas p-6 outline-none">
          <div className="mb-6 flex items-center justify-between">
            <Dialog.Title className="font-display text-2xl text-accent">{brandName}</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg hover:bg-accent-soft"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex-1 space-y-8 overflow-y-auto">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Categories
              </p>
              <ul className="space-y-3">
                {CATEGORIES.map((c) => (
                  <li key={c.slug}>
                    <Dialog.Close asChild>
                      <Link
                        href={`/shop?category=${c.slug}`}
                        className="text-lg hover:text-accent"
                      >
                        {c.label}
                      </Link>
                    </Dialog.Close>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                Occasions
              </p>
              <ul className="flex flex-wrap gap-2">
                {OCCASIONS.map((o) => (
                  <li key={o.slug}>
                    <Dialog.Close asChild>
                      <Link
                        href={`/occasions/${o.slug}`}
                        className="inline-block rounded-full border border-border bg-surface px-3 py-1.5 text-sm"
                      >
                        {o.label}
                      </Link>
                    </Dialog.Close>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 border-t border-border pt-6">
              <Dialog.Close asChild>
                <Link href="/shop" className="block text-lg hover:text-accent">
                  Shop all
                </Link>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Link href="/occasions" className="block text-lg hover:text-accent">
                  Collections
                </Link>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Link href="/new-arrivals" className="block text-lg hover:text-accent">
                  New arrivals
                </Link>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Link href="/track" className="block text-lg hover:text-accent">
                  Track order
                </Link>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Link href="/auth/sign-in" className="block text-lg hover:text-accent">
                  Sign in
                </Link>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Link href="/auth/sign-up" className="block text-lg hover:text-accent">
                  Create account
                </Link>
              </Dialog.Close>
              <Dialog.Close asChild>
                <Link href="/account" className="block text-lg hover:text-accent">
                  My dashboard
                </Link>
              </Dialog.Close>
              <a href={whatsappHref()} className="block text-lg hover:text-accent">
                WhatsApp
              </a>
              <button type="button" onClick={toggleLocale} className="text-lg hover:text-accent">
                {locale === "en" ? "اردو" : "English"}
              </button>
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
