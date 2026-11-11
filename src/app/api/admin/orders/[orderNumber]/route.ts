import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/store/admin-auth";
import { readStore, transitionOrder } from "@/lib/store/orders-db";
import type { OrderStatus } from "@/lib/store/types";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: { orderNumber: string } },
) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const store = await readStore();
  const order = store.orders.find(
    (o) => o.orderNumber.toUpperCase() === params.orderNumber.toUpperCase(),
  );
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ order });
}

export async function PATCH(
  request: Request,
  { params }: { params: { orderNumber: string } },
) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const status = String(body.status ?? "") as OrderStatus;
    const order = await transitionOrder(params.orderNumber, status);
    return NextResponse.json({ order });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Transition failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
