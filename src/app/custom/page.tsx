"use client";

import { FormEvent, useState } from "react";

import { PageBanner } from "@/components/layout/page-banner";
import { Button } from "@/components/ui/button";
import { brandName, whatsappHref } from "@/lib/utils";

export default function CustomPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(
      whatsappHref(
        `Custom order request for ${brandName}\nName: ${name}\nPhone: ${phone}\nDetails: ${details}`,
      ),
      "_blank",
    );
    setSent(true);
  }

  return (
    <>
      <PageBanner
        background="collection"
        title="Custom order"
        subtitle="Tell us the occasion, colours, and size — we reply on WhatsApp with a quote."
      />
      <div className="mx-auto max-w-xl px-4 py-12">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm font-medium">
            Name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
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
          <label className="block text-sm font-medium">
            What should we make?
            <textarea
              required
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2"
              placeholder="Occasion, colours, reference…"
            />
          </label>
          <Button type="submit" size="lg">
            Continue on WhatsApp
          </Button>
          {sent && (
            <p className="text-sm text-muted">WhatsApp should open with your request prefilled.</p>
          )}
        </form>
      </div>
    </>
  );
}
