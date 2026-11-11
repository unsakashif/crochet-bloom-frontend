import { NextResponse } from "next/server";

import {
  createCustomerToken,
  customerCookieOptions,
} from "@/lib/store/customer-auth";
import { clearAdminCookieOptions, validateAdminCredentials, createAdminToken, adminCookieOptions } from "@/lib/store/admin-auth";
import { authenticateCustomer } from "@/lib/store/orders-db";

export const runtime = "nodejs";

/**
 * Unified sign-in:
 * - Admin username/password → admin session
 * - Otherwise treat as customer phone + password
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const identifier = String(body.identifier ?? body.phone ?? body.username ?? "").trim();
    const password = String(body.password ?? "");

    if (validateAdminCredentials(identifier, password)) {
      const token = createAdminToken();
      const res = NextResponse.json({ role: "admin", user: { name: "Admin" } });
      res.cookies.set(adminCookieOptions(token));
      res.cookies.set(clearCustomerCookieFromAdmin());
      res.cookies.set({
        name: "cb_store_preview",
        value: "",
        path: "/",
        maxAge: 0,
      });
      return res;
    }

    const customer = await authenticateCustomer(identifier, password);
    const token = createCustomerToken(customer.id);
    const res = NextResponse.json({ role: "customer", customer });
    res.cookies.set(customerCookieOptions(token));
    // Clear admin if any
    res.cookies.set(clearAdminCookieOptions());
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign in failed";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}

function clearCustomerCookieFromAdmin() {
  return {
    name: "cb_customer",
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}
