"use client";

import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

import { OrderTimeline } from "@/components/order/order-timeline";
import { Button } from "@/components/ui/button";
import { formatPkr } from "@/lib/utils";
import type { StoredOrder } from "@/lib/store/types";
import { STATUS_LABELS } from "@/lib/store/types";

function TrackBody() {
  const params = useSearchParams();
  const [orderNumber, setOrderNumber] = useState(params.get("order") ?? "");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!orderNumber.trim() || !phone.trim()) {
      setError("Enter both order number and phone.");
      setOrder(null);
      return;
    }
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const qs = new URLSearchParams({
        order: orderNumber.trim(),
        phone: phone.trim(),
      });
      const res = await fetch(`/api/orders/track?${qs}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Order not found.");
      } else {
        setOrder(data.order as StoredOrder);
      }
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="font-display text-3xl">Track order</h1>
      <p className="mt-1 text-sm text-muted">
        No login needed. Use the order number from your confirmation and the phone used at checkout.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="text-sm text-danger" role="alert">
            {error}
          </p>
        )}
        <label className="block text-sm font-medium">
          Order number
          <input
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
            placeholder="CB-…"
          />
        </label>
        <label className="block text-sm font-medium">
          Phone
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
            placeholder="03001234567"
          />
        </label>
        <Button type="submit" disabled={loading}>
          {loading ? "Looking up…" : "Track"}
        </Button>
      </form>

      {order && (
        <div className="mt-10 space-y-4">
          <div className="rounded-card border border-border bg-surface p-5">
            <p className="text-sm text-muted">Order</p>
            <p className="font-display text-xl">{order.orderNumber}</p>
            <p className="mt-1 text-sm">
              Status: <span className="font-medium">{STATUS_LABELS[order.status]}</span>
            </p>
            <p className="text-sm text-muted">Promised by {order.promisedDateLabel}</p>
            <p className="mt-2 text-sm font-medium">{formatPkr(order.totalPkr)} COD</p>
          </div>
          <OrderTimeline events={order.events} />
        </div>
      )}
    </div>
  );
}

export default function TrackPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-xl px-4 py-10">Loading…</div>}>
      <TrackBody />
    </Suspense>
  );
}
