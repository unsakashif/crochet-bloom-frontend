"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { OrderTimeline } from "@/components/order/order-timeline";
import { Button } from "@/components/ui/button";
import type { OrderStatus, StoredOrder } from "@/lib/store/types";
import { STATUS_LABELS, nextStatuses } from "@/lib/store/types";
import { formatPkr } from "@/lib/utils";

export default function AdminOrderDetailPage() {
  const params = useParams<{ orderNumber: string }>();
  const orderNumber = decodeURIComponent(params.orderNumber);
  const [order, setOrder] = useState<StoredOrder | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderNumber)}`);
    if (!res.ok) {
      setError("Order not found");
      setOrder(null);
      return;
    }
    const data = await res.json();
    setOrder(data.order);
    setError("");
  }, [orderNumber]);

  useEffect(() => {
    void load();
  }, [load]);

  async function advance(status: OrderStatus) {
    setBusy(true);
    setError("");
    const res = await fetch(`/api/admin/orders/${encodeURIComponent(orderNumber)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error || "Transition failed");
      return;
    }
    setOrder(data.order);
  }

  return (
    <AdminShell>
      <Link href="/admin/orders" className="text-sm text-accent underline">
        ← All orders
      </Link>
      <h1 className="mt-3 font-display text-3xl">{orderNumber}</h1>
      {error && <p className="mt-3 text-sm text-danger">{error}</p>}

      {!order && !error && <p className="mt-6 text-sm text-muted">Loading…</p>}

      {order && (
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="rounded-card border border-border bg-surface p-5 text-sm">
              <p>
                <span className="text-muted">Customer:</span> {order.name}
              </p>
              <p>
                <span className="text-muted">Phone:</span> {order.phoneNormalized}
              </p>
              {order.email && (
                <p>
                  <span className="text-muted">Email:</span> {order.email}
                </p>
              )}
              <p>
                <span className="text-muted">Ship to:</span> {order.address}, {order.city}
              </p>
              <p className="mt-2 font-medium">
                {formatPkr(order.totalPkr)} COD · {STATUS_LABELS[order.status]}
              </p>
              <p className="text-muted">Promised {order.promisedDateLabel}</p>
            </div>

            <ul className="rounded-card border border-border bg-surface p-5 text-sm">
              {order.lines.map((l) => (
                <li
                  key={`${l.productId}-${l.colour}`}
                  className="flex justify-between gap-4 border-b border-border py-2 last:border-0"
                >
                  <span>
                    {l.name}
                    {l.colour ? ` · ${l.colour}` : ""} × {l.quantity}
                    <span className="ms-2 text-xs text-muted">{l.fulfilment}</span>
                  </span>
                  <span>{formatPkr(l.unitPricePkr * l.quantity)}</span>
                </li>
              ))}
            </ul>

            <div>
              <p className="mb-2 text-sm font-medium">Advance status</p>
              <div className="flex flex-wrap gap-2">
                {nextStatuses(order.status).map((s) => (
                  <Button
                    key={s}
                    type="button"
                    size="sm"
                    variant={s === "cancelled" ? "secondary" : "primary"}
                    disabled={busy}
                    onClick={() => advance(s)}
                  >
                    Mark {STATUS_LABELS[s]}
                  </Button>
                ))}
                {nextStatuses(order.status).length === 0 && (
                  <p className="text-sm text-muted">No further transitions.</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl">Timeline</h2>
            <OrderTimeline events={order.events} />
          </div>
        </div>
      )}
    </AdminShell>
  );
}
