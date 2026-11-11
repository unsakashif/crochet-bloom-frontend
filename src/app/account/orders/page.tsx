"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { fetchSession } from "@/lib/auth-client";
import { formatPkr } from "@/lib/utils";
import type { StoredOrder } from "@/lib/store/types";
import { STATUS_LABELS } from "@/lib/store/types";

export default function MyOrdersPage() {
  const [phone, setPhone] = useState("");
  const [lockedPhone, setLockedPhone] = useState(false);
  const [orders, setOrders] = useState<StoredOrder[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadForPhone(value: string) {
    setLoading(true);
    setError("");
    setOrders(null);
    try {
      const qs = new URLSearchParams({ phone: value.trim() });
      const res = await fetch(`/api/orders/mine?${qs}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not load orders.");
      } else {
        setOrders(data.orders as StoredOrder[]);
      }
    } catch {
      setError("Network error — try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      const s = await fetchSession();
      if (s.role === "customer") {
        setPhone(s.customer.phoneNormalized);
        setLockedPhone(true);
        await loadForPhone(s.customer.phoneNormalized);
      }
    })();
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Enter the phone number used at checkout.");
      return;
    }
    await loadForPhone(phone);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <Link href="/account" className="text-sm text-accent underline">
        ← Dashboard
      </Link>
      <h1 className="mt-3 font-display text-3xl">My orders</h1>
      <p className="mt-2 text-sm text-muted">
        {lockedPhone
          ? "Orders linked to your signed-in phone number."
          : "Look up orders with the phone used at checkout, or sign in to see them automatically."}
      </p>

      {!lockedPhone && (
        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end">
          <label className="block flex-1 text-sm font-medium">
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
            {loading ? "Loading…" : "Show orders"}
          </Button>
        </form>
      )}

      {lockedPhone && loading && <p className="mt-6 text-sm text-muted">Loading orders…</p>}

      {error && (
        <p className="mt-4 text-sm text-danger" role="alert">
          {error}
        </p>
      )}

      {orders && orders.length === 0 && (
        <p className="mt-8 text-sm text-muted">No orders found for that phone.</p>
      )}

      {orders && orders.length > 0 && (
        <ul className="mt-8 space-y-3">
          {orders.map((o) => (
            <li key={o.orderNumber} className="rounded-card border border-border bg-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium">{o.orderNumber}</p>
                  <p className="text-sm text-muted">
                    {STATUS_LABELS[o.status]} · {o.city} · promised {o.promisedDateLabel}
                  </p>
                  <p className="mt-1 text-sm">{formatPkr(o.totalPkr)}</p>
                </div>
                <Link
                  href={`/track?order=${encodeURIComponent(o.orderNumber)}`}
                  className="text-sm text-accent underline"
                >
                  Track
                </Link>
              </div>
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {o.lines.map((l) => (
                  <li key={`${l.productId}-${l.colour}`}>
                    {l.name}
                    {l.colour ? ` · ${l.colour}` : ""} × {l.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        {!lockedPhone && (
          <Button asChild>
            <Link href="/auth/sign-in?next=/account/orders">Sign in</Link>
          </Button>
        )}
        <Button asChild variant="secondary">
          <Link href={lockedPhone ? "/account" : "/"}>
            {lockedPhone ? "Back to dashboard" : "Home"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
