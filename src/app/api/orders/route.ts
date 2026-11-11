import { NextResponse } from "next/server";

import { placeOrder } from "@/lib/store/orders-db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await placeOrder({
      phone: String(body.phone ?? ""),
      name: String(body.name ?? ""),
      email: body.email ? String(body.email) : undefined,
      city: String(body.city ?? ""),
      address: String(body.address ?? ""),
      shippingPkr: Number(body.shippingPkr ?? 0),
      lines: Array.isArray(body.lines) ? body.lines : [],
    });
    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to place order";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
