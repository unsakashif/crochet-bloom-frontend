import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@/lib/store/admin-credentials";

export { ADMIN_PASSWORD, ADMIN_USERNAME };

export const ADMIN_COOKIE = "cb_admin";

const COOKIE_TTL_SECONDS = 60 * 60 * 12; // 12 hours

function secret() {
  return process.env.CB_ADMIN_SECRET || "crochet-bloom-local-admin-secret";
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createAdminToken(): string {
  const exp = Date.now() + COOKIE_TTL_SECONDS * 1000;
  const body = `admin:${exp}`;
  return `${body}.${sign(body)}`;
}

export function verifyAdminToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  const expected = sign(body);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  const [, expStr] = body.split(":");
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  return true;
}

export function adminCookieOptions(token: string) {
  return {
    name: ADMIN_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: COOKIE_TTL_SECONDS,
    secure: process.env.NODE_ENV === "production",
  };
}

export function clearAdminCookieOptions() {
  return {
    name: ADMIN_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
}

export function isAdminRequest(): boolean {
  const jar = cookies();
  return verifyAdminToken(jar.get(ADMIN_COOKIE)?.value);
}

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
