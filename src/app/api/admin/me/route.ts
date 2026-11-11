import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/store/admin-auth";

export const runtime = "nodejs";

export async function GET() {
  if (!isAdminRequest()) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({ authenticated: true, user: "admin" });
}
