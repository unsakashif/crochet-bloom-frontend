import { NextResponse } from "next/server";

import { clearAdminCookieOptions } from "@/lib/store/admin-auth";
import { clearCustomerCookieOptions } from "@/lib/store/customer-auth";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(clearAdminCookieOptions());
  res.cookies.set(clearCustomerCookieOptions());
  res.cookies.set({
    name: "cb_store_preview",
    value: "",
    path: "/",
    maxAge: 0,
  });
  return res;
}
