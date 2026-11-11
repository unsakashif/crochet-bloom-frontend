"use client";

import { FormEvent, useEffect, useState } from "react";

import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import type { InventoryRow } from "@/lib/store/types";

export default function AdminInventoryPage() {
  const [rows, setRows] = useState<InventoryRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    const res = await fetch("/api/admin/inventory");
    if (!res.ok) {
      setError("Failed to load inventory");
      return;
    }
    const data = await res.json();
    const inv = (data.inventory ?? []) as InventoryRow[];
    setRows(inv);
    const next: Record<string, string> = {};
    for (const r of inv) next[r.productId] = String(r.stockQty);
    setDrafts(next);
  }

  useEffect(() => {
    void load();
  }, []);

  async function save(e: FormEvent, productId: string) {
    e.preventDefault();
    setMessage("");
    setError("");
    const stockQty = Number(drafts[productId]);
    const res = await fetch(`/api/admin/inventory/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stockQty }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "Update failed");
      return;
    }
    setMessage(`Updated ${data.item.name}`);
    await load();
  }

  return (
    <AdminShell>
      <h1 className="font-display text-3xl">Inventory</h1>
      <p className="mt-1 text-sm text-muted">
        In-stock items decrement on checkout. Made-to-order rows stay at 0 unless you set capacity
        manually.
      </p>
      {message && <p className="mt-4 text-sm text-success">{message}</p>}
      {error && <p className="mt-4 text-sm text-danger">{error}</p>}

      <div className="mt-6 overflow-x-auto rounded-card border border-border bg-surface">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-border bg-accent-soft/50 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">SKU</th>
              <th className="px-4 py-3">Fulfilment</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Reserved</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.productId} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3 text-muted">{r.sku}</td>
                <td className="px-4 py-3">{r.fulfilment.replace(/_/g, " ")}</td>
                <td className="px-4 py-3">
                  <input
                    type="number"
                    min={0}
                    value={drafts[r.productId] ?? "0"}
                    onChange={(e) =>
                      setDrafts((d) => ({ ...d, [r.productId]: e.target.value }))
                    }
                    className="h-9 w-20 rounded border border-border bg-canvas px-2"
                  />
                </td>
                <td className="px-4 py-3">{r.reservedQty}</td>
                <td className="px-4 py-3">
                  <form onSubmit={(e) => save(e, r.productId)}>
                    <Button type="submit" size="sm" variant="secondary">
                      Save
                    </Button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
