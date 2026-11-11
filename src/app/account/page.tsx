"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { fetchSession, signOut, type AuthSession } from "@/lib/auth-client";
import { formatPkr } from "@/lib/utils";
import type { StoredOrder } from "@/lib/store/types";
import { STATUS_LABELS } from "@/lib/store/types";

export default function AccountDashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [orders, setOrders] = useState<StoredOrder[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await fetchSession();
      if (cancelled) return;
      if (s.role === "admin") {
        router.replace("/admin");
        return;
      }
      if (s.role === "guest") {
        router.replace("/auth/sign-in?next=/account");
        return;
      }
      setSession(s);
      const res = await fetch(
        `/api/orders/mine?phone=${encodeURIComponent(s.customer.phoneNormalized)}`,
      );
      if (res.ok) {
        const data = await res.json();
        if (!cancelled) setOrders(data.orders ?? []);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  async function onLogout() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  if (!session || session.role !== "customer") {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-muted">Loading your dashboard…</div>
    );
  }

  const { customer } = session;
  const active = orders.filter((o) => !["delivered", "cancelled"].includes(o.status));

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="font-script text-xl text-accent">your space ♡</p>
      <h1 className="font-display text-3xl sm:text-4xl">Hi, {customer.name.split(" ")[0]}</h1>
      <p className="mt-2 text-sm text-muted">
        {customer.phoneNormalized}
        {customer.email ? ` · ${customer.email}` : ""}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Orders</p>
          <p className="mt-1 font-display text-3xl">{orders.length}</p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-wide text-muted">In progress</p>
          <p className="mt-1 font-display text-3xl">{active.length}</p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-xs uppercase tracking-wide text-muted">Quick links</p>
          <div className="mt-2 flex flex-col gap-1 text-sm">
            <Link href="/account/orders" className="text-accent underline">
              All orders
            </Link>
            <Link href="/wishlist" className="text-accent underline">
              Wishlist
            </Link>
            <Link href="/track" className="text-accent underline">
              Track a parcel
            </Link>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="mb-4 flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl">Recent orders</h2>
          <Link href="/shop" className="text-sm text-accent underline">
            Continue shopping
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="rounded-card border border-dashed border-border bg-surface/60 px-5 py-10 text-center">
            <p className="text-sm text-muted">No orders yet.</p>
            <Button asChild className="mt-4">
              <Link href="/shop">Browse the shop</Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {orders.slice(0, 5).map((o) => (
              <li key={o.orderNumber} className="rounded-card border border-border bg-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-medium">{o.orderNumber}</p>
                    <p className="text-sm text-muted">
                      {STATUS_LABELS[o.status]} · {formatPkr(o.totalPkr)}
                    </p>
                  </div>
                  <Link
                    href={`/track?order=${encodeURIComponent(o.orderNumber)}`}
                    className="text-sm text-accent underline"
                  >
                    Track
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild variant="secondary">
          <Link href="/account/orders">View all orders</Link>
        </Button>
        <Button type="button" variant="ghost" onClick={onLogout}>
          Sign out
        </Button>
      </div>
    </div>
  );
}
