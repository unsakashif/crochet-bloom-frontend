import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/store/admin-auth";
import { setStockQty } from "@/lib/store/orders-db";

export const runtime = "nodejs";

export async function PATCH(
  request: Request,
  { params }: { params: { productId: string } },
) {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const row = await setStockQty(params.productId, Number(body.stockQty));
    return NextResponse.json({ item: row });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Update failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
