"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import type { InventoryRow, StoredOrder } from "@/lib/store/types";
import { formatPkr } from "@/lib/utils";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [inventory, setInventory] = useState<InventoryRow[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      const [oRes, iRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/inventory"),
      ]);
      if (!oRes.ok || !iRes.ok) {
        setError("Could not load dashboard data.");
        return;
      }
      const oData = await oRes.json();
      const iData = await iRes.json();
      setOrders(oData.orders ?? []);
      setInventory(iData.inventory ?? []);
    })();
  }, []);

  const pending = orders.filter((o) => o.status === "pending_confirmation").length;
  const active = orders.filter((o) => !["delivered", "cancelled"].includes(o.status)).length;
  const lowStock = inventory.filter((i) => i.fulfilment === "in_stock" && i.stockQty <= 3);

  return (
    <AdminShell>
      <h1 className="font-display text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-muted">Orders and inventory at a glance.</p>
      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-sm text-muted">Pending confirmation</p>
          <p className="mt-1 font-display text-3xl">{pending}</p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-sm text-muted">Active orders</p>
          <p className="mt-1 font-display text-3xl">{active}</p>
        </div>
        <div className="rounded-card border border-border bg-surface p-5">
          <p className="text-sm text-muted">Low stock SKUs</p>
          <p className="mt-1 font-display text-3xl">{lowStock.length}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl">Recent orders</h2>
            <Link href="/admin/orders" className="text-sm text-accent underline">
              View all
            </Link>
          </div>
          <ul className="space-y-2">
            {orders.slice(0, 5).map((o) => (
              <li key={o.orderNumber}>
                <Link
                  href={`/admin/orders/${o.orderNumber}`}
                  className="block rounded-lg border border-border bg-surface px-4 py-3 text-sm hover:border-accent"
                >
                  <span className="font-medium">{o.orderNumber}</span>
                  <span className="text-muted"> · {o.name} · {formatPkr(o.totalPkr)}</span>
                </Link>
              </li>
            ))}
            {orders.length === 0 && <p className="text-sm text-muted">No orders yet.</p>}
          </ul>
        </section>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl">Low stock</h2>
            <Link href="/admin/inventory" className="text-sm text-accent underline">
              Inventory
            </Link>
          </div>
          <ul className="space-y-2">
            {lowStock.slice(0, 8).map((i) => (
              <li
                key={i.productId}
                className="rounded-lg border border-border bg-surface px-4 py-3 text-sm"
              >
                {i.name} — <span className="font-medium">{i.stockQty}</span> left
              </li>
            ))}
            {lowStock.length === 0 && (
              <p className="text-sm text-muted">No in-stock items at or below 3 units.</p>
            )}
          </ul>
        </section>
      </div>
    </AdminShell>
  );
}
