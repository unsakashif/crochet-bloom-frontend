export type OrderStatus =
  | "pending_confirmation"
  | "confirmed"
  | "in_production"
  | "quality_check"
  | "ready_to_ship"
  | "shipped"
  | "delivered"
  | "cancelled";

export type OrderEvent = {
  key: string;
  label: string;
  at: string | null;
  done: boolean;
};

export type OrderLine = {
  productId: string;
  slug: string;
  name: string;
  unitPricePkr: number;
  quantity: number;
  colour?: string;
  fulfilment: "made_to_order" | "in_stock";
};

export type StoredOrder = {
  orderNumber: string;
  phone: string;
  phoneNormalized: string;
  name: string;
  email?: string;
  city: string;
  address: string;
  lines: OrderLine[];
  subtotalPkr: number;
  shippingPkr: number;
  totalPkr: number;
  status: OrderStatus;
  events: OrderEvent[];
  promisedDateLabel: string;
  createdAt: string;
  updatedAt: string;
};

export type InventoryRow = {
  productId: string;
  slug: string;
  name: string;
  sku: string;
  stockQty: number;
  reservedQty: number;
  fulfilment: "made_to_order" | "in_stock";
};

export type CustomerAccount = {
  id: string;
  name: string;
  phone: string;
  phoneNormalized: string;
  email?: string;
  passwordHash: string;
  createdAt: string;
};

export type AppStore = {
  inventory: InventoryRow[];
  orders: StoredOrder[];
  customers: CustomerAccount[];
};

export const STATUS_FLOW: OrderStatus[] = [
  "pending_confirmation",
  "confirmed",
  "in_production",
  "quality_check",
  "ready_to_ship",
  "shipped",
  "delivered",
];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending_confirmation: "Pending confirmation",
  confirmed: "Confirmed",
  in_production: "In production",
  quality_check: "Quality check",
  ready_to_ship: "Ready to ship",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function nextStatuses(current: OrderStatus): OrderStatus[] {
  if (current === "cancelled" || current === "delivered") return [];
  const idx = STATUS_FLOW.indexOf(current);
  const next: OrderStatus[] = [];
  if (idx >= 0 && idx < STATUS_FLOW.length - 1) {
    next.push(STATUS_FLOW[idx + 1]!);
  }
  if (current === "pending_confirmation" || current === "confirmed") {
    next.push("cancelled");
  }
  return next;
}

export function buildEventsForStatus(status: OrderStatus, createdAt: string): OrderEvent[] {
  const stamp = (iso: string) =>
    new Date(iso).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "Asia/Karachi",
    });

  if (status === "cancelled") {
    return [
      { key: "placed", label: "Order placed", at: stamp(createdAt), done: true },
      { key: "cancelled", label: "Cancelled", at: stamp(new Date().toISOString()), done: true },
    ];
  }

  const chain = STATUS_FLOW;
  const currentIdx = chain.indexOf(status);
  return chain.map((s, i) => ({
    key: s,
    label: STATUS_LABELS[s],
    at: i <= currentIdx ? stamp(i === 0 ? createdAt : new Date().toISOString()) : null,
    done: i <= currentIdx,
  }));
}
