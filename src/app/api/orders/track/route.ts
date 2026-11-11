import { NextResponse } from "next/server";

import { findOrder } from "@/lib/store/orders-db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const order = searchParams.get("order") ?? "";
  const phone = searchParams.get("phone") ?? "";
  if (!order.trim() || !phone.trim()) {
    return NextResponse.json({ error: "Order number and phone are required" }, { status: 400 });
  }
  const found = await findOrder(order, phone);
  if (!found) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }
  return NextResponse.json({ order: found });
}
