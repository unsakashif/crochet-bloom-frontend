"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { brandName, whatsappHref } from "@/lib/utils";

export default function BulkPage() {
  const [company, setCompany] = useState("");
  const [qty, setQty] = useState("50");
  const [occasion, setOccasion] = useState("Eid hampers");
  const [phone, setPhone] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(
      whatsappHref(
        `Bulk / corporate quote — ${brandName}\nCompany: ${company}\nQty: ${qty}\nOccasion: ${occasion}\nPhone: ${phone}`,
      ),
      "_blank",
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="font-display text-3xl">Bulk & corporate</h1>
      <p className="mt-2 text-sm text-muted">
        Eid hampers, employee gifts, and wedding favours. Share quantity and city for a quote.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium">
          Company / event
          <input
            required
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Approximate quantity
          <input
            required
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Occasion
          <input
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
          />
        </label>
        <label className="block text-sm font-medium">
          Phone
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
          />
        </label>
        <Button type="submit" size="lg">
          Request quote on WhatsApp
        </Button>
      </form>
    </div>
  );
}
