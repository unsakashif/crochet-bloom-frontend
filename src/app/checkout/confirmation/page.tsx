"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { brandName, whatsappHref } from "@/lib/utils";

function ConfirmationBody() {
  const params = useSearchParams();
  const order = params.get("order") ?? "CB-DEMO";
  const date = params.get("date") ?? "—";

  return (
    <div className="mx-auto max-w-xl px-4 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-wider text-accent">Thank you</p>
      <h1 className="mt-2 font-display text-3xl sm:text-4xl">Order received</h1>
      <p className="mt-4 text-muted">
        We&apos;ll confirm your COD order by phone or WhatsApp. Create an account later to save
        addresses — guest checkout is complete.
      </p>
      <dl className="mt-8 space-y-3 rounded-card border border-border bg-surface p-6 text-start text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Order number</dt>
          <dd className="font-medium">{order}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted">Promised dispatch window</dt>
          <dd className="font-medium">by {date}</dd>
        </div>
      </dl>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href={`/track?order=${encodeURIComponent(order)}`}>Track order</Link>
        </Button>
        <Button asChild variant="secondary">
          <a href={whatsappHref(`Hi ${brandName}, I placed order ${order}.`)}>WhatsApp us</a>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/account">Create account (soon)</Link>
        </Button>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-center text-muted">Loading…</div>}>
      <ConfirmationBody />
    </Suspense>
  );
}
