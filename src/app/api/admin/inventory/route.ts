import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/store/admin-auth";
import { readStore } from "@/lib/store/orders-db";

export const runtime = "nodejs";

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const store = await readStore();
  return NextResponse.json({ inventory: store.inventory });
}
