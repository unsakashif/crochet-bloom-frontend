"use client";

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { brandName, whatsappHref } from "@/lib/utils";

export default function ReturnsPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [issue, setIssue] = useState("");
  const [fileName, setFileName] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(
      whatsappHref(
        `Issue report — ${brandName}\nOrder: ${orderNumber}\nIssue: ${issue}\nPhoto: ${fileName || "none attached (UI only)"}`,
      ),
      "_blank",
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="font-display text-3xl">Returns & damage</h1>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
        <p>
          Handmade items may vary slightly. If a parcel arrives damaged or clearly not as described,
          contact us within 48 hours of delivery with photos.
        </p>
        <p>
          Made-to-order custom pieces are generally non-returnable unless there is a quality fault we
          confirm. Placeholder policy — confirm final wording with the owner.
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-10 space-y-4 border-t border-border pt-8">
        <h2 className="font-display text-xl">Report an issue</h2>
        <label className="block text-sm font-medium">
          Order number
          <input
            required
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
          />
        </label>
        <label className="block text-sm font-medium">
          What happened?
          <textarea
            required
            rows={4}
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2"
          />
        </label>
        <label className="block text-sm font-medium">
          Photo (UI only — upload API in a later phase)
          <input
            type="file"
            accept="image/*"
            className="mt-1 block w-full text-sm"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
          />
        </label>
        <Button type="submit">Send via WhatsApp</Button>
      </form>
    </div>
  );
}
