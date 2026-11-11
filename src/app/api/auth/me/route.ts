import { NextResponse } from "next/server";

import { isAdminRequest } from "@/lib/store/admin-auth";
import { getCustomerIdFromRequest } from "@/lib/store/customer-auth";
import { getCustomerById } from "@/lib/store/orders-db";

export const runtime = "nodejs";

export async function GET() {
  if (isAdminRequest()) {
    return NextResponse.json({
      role: "admin" as const,
      user: { name: "Admin", username: "admin" },
    });
  }

  const customerId = getCustomerIdFromRequest();
  if (customerId) {
    const customer = await getCustomerById(customerId);
    if (customer) {
      return NextResponse.json({ role: "customer" as const, customer });
    }
  }

  return NextResponse.json({ role: "guest" as const });
}
