import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/store/admin-auth";

export const runtime = "nodejs";

export async function POST() {
  if (!isAdminRequest()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set({
    name: "cb_store_preview",
    value: "",
    path: "/",
    maxAge: 0,
  });
  return res;
}
