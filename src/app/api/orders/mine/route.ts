import { NextResponse } from "next/server";

import { ordersByPhone } from "@/lib/store/orders-db";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone") ?? "";
  if (!phone.trim()) {
    return NextResponse.json({ error: "Phone is required" }, { status: 400 });
  }
  const orders = await ordersByPhone(phone);
  return NextResponse.json({ orders });
}
