import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/store/admin-auth";

export const runtime = "nodejs";

/** Lets an authenticated admin browse the storefront without losing the admin session. */
export async function POST() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "cb_store_preview",
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  });
  return res;
}
