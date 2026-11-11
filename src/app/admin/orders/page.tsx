"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import type { StoredOrder } from "@/lib/store/types";
import { STATUS_LABELS } from "@/lib/store/types";
import { formatPkr } from "@/lib/utils";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/orders");
      if (!res.ok) {
        setError("Failed to load orders");
        return;
      }
      const data = await res.json();
      setOrders(data.orders ?? []);
    })();
  }, []);

  return (
    <AdminShell>
      <h1 className="font-display text-3xl">Orders</h1>
      <p className="mt-1 text-sm text-muted">All customer orders, newest first.</p>
      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-card border border-border bg-surface">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-accent-soft/50 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">City</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Placed</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.orderNumber} className="border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/orders/${o.orderNumber}`}
                    className="font-medium text-accent underline"
                  >
                    {o.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <div>{o.name}</div>
                  <div className="text-xs text-muted">{o.phoneNormalized}</div>
                </td>
                <td className="px-4 py-3">{o.city}</td>
                <td className="px-4 py-3">{formatPkr(o.totalPkr)}</td>
                <td className="px-4 py-3">{STATUS_LABELS[o.status]}</td>
                <td className="px-4 py-3 text-muted">
                  {new Date(o.createdAt).toLocaleString("en-GB", { timeZone: "Asia/Karachi" })}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  No orders yet. Place one from the storefront checkout.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
