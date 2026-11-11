import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const CUSTOMER_COOKIE = "cb_customer";

const COOKIE_TTL_SECONDS = 60 * 60 * 24 * 14; // 14 days

function secret() {
  return process.env.CB_CUSTOMER_SECRET || "crochet-bloom-local-customer-secret";
}

export function hashCustomerPassword(password: string): string {
  return createHmac("sha256", secret()).update(`pw:${password}`).digest("hex");
}

export function verifyCustomerPassword(passwordHash: string, password: string): boolean {
  const expected = hashCustomerPassword(password);
  try {
    const a = Buffer.from(passwordHash);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createCustomerToken(customerId: string): string {
  const exp = Date.now() + COOKIE_TTL_SECONDS * 1000;
  const body = `${customerId}:${exp}`;
  return `${body}.${sign(body)}`;
}

export function verifyCustomerToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }
  const [customerId, expStr] = body.split(":");
  const exp = Number(expStr);
  if (!customerId || !Number.isFinite(exp) || Date.now() > exp) return null;
  return customerId;
}

export function customerCookieOptions(token: string) {
  return {
    name: CUSTOMER_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_TTL_SECONDS,
    secure: process.env.NODE_ENV === "production",
  };
}

export function clearCustomerCookieOptions() {
  return {
    name: CUSTOMER_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export function getCustomerIdFromRequest(): string | null {
  const jar = cookies();
  return verifyCustomerToken(jar.get(CUSTOMER_COOKIE)?.value);
}
