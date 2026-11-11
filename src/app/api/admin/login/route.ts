import { NextResponse } from "next/server";

import {
  adminCookieOptions,
  createAdminToken,
  validateAdminCredentials,
} from "@/lib/store/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const username = String(body.username ?? "");
  const password = String(body.password ?? "");
  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const token = createAdminToken();
  const res = NextResponse.json({ ok: true, user: "admin" });
  res.cookies.set(adminCookieOptions(token));
  return res;
}
