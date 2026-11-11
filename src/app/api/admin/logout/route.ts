import { NextResponse } from "next/server";

import { clearAdminCookieOptions } from "@/lib/store/admin-auth";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(clearAdminCookieOptions());
  return res;
}
