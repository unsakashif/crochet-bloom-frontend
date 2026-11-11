import { NextResponse } from "next/server";

import {
  createCustomerToken,
  customerCookieOptions,
} from "@/lib/store/customer-auth";
import { registerCustomer } from "@/lib/store/orders-db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customer = await registerCustomer({
      name: String(body.name ?? ""),
      phone: String(body.phone ?? ""),
      email: body.email ? String(body.email) : undefined,
      password: String(body.password ?? ""),
    });
    const token = createCustomerToken(customer.id);
    const res = NextResponse.json({ customer }, { status: 201 });
    res.cookies.set(customerCookieOptions(token));
    return res;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sign up failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
