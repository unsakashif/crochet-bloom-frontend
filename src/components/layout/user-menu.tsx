"use client";

import { LogOut, Package, Settings, Shield, User, UserPlus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { fetchSession, signOut, type AuthSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export function UserMenu() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<AuthSession>({ role: "guest" });
  const [loaded, setLoaded] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await fetchSession();
      if (!cancelled) {
        setSession(s);
        setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  async function onLogout() {
    await signOut();
    setSession({ role: "guest" });
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  const label =
    session.role === "admin"
      ? "Admin"
      : session.role === "customer"
        ? session.customer.name.split(" ")[0]
        : "Account";

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className={cn(
          "inline-flex h-11 items-center gap-1.5 rounded-lg px-2 hover:bg-accent-soft",
          open && "bg-accent-soft",
        )}
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
      >
        <User className="h-5 w-5" />
        <span className="hidden max-w-[7rem] truncate text-xs font-medium sm:inline">
          {loaded ? label : "…"}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute end-0 z-50 mt-2 w-64 overflow-hidden rounded-card border border-border bg-surface shadow-soft"
        >
          {session.role === "guest" && (
            <div className="p-2">
              <p className="px-3 py-2 text-xs text-muted">Welcome to Crochet Bloom</p>
              <Link
                href="/auth/sign-in"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent-soft"
                onClick={() => setOpen(false)}
              >
                <User className="h-4 w-4 text-accent" />
                Sign in
              </Link>
              <Link
                href="/auth/sign-up"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent-soft"
                onClick={() => setOpen(false)}
              >
                <UserPlus className="h-4 w-4 text-accent" />
                Create account
              </Link>
              <div className="my-1 border-t border-border" />
              <Link
                href="/track"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent-soft"
                onClick={() => setOpen(false)}
              >
                <Package className="h-4 w-4 text-accent" />
                Track order
              </Link>
              <Link
                href="/admin/login"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-muted hover:bg-accent-soft hover:text-ink"
                onClick={() => setOpen(false)}
              >
                <Shield className="h-4 w-4" />
                Admin sign in
              </Link>
            </div>
          )}

          {session.role === "customer" && (
            <div className="p-2">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">{session.customer.name}</p>
                <p className="text-xs text-muted">{session.customer.phoneNormalized}</p>
              </div>
              <div className="my-1 border-t border-border" />
              <Link
                href="/account"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent-soft"
                onClick={() => setOpen(false)}
              >
                <Settings className="h-4 w-4 text-accent" />
                My dashboard
              </Link>
              <Link
                href="/account/orders"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent-soft"
                onClick={() => setOpen(false)}
              >
                <Package className="h-4 w-4 text-accent" />
                My orders
              </Link>
              <Link
                href="/wishlist"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent-soft"
                onClick={() => setOpen(false)}
              >
                Wishlist
              </Link>
              <div className="my-1 border-t border-border" />
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent-soft"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}

          {session.role === "admin" && (
            <div className="p-2">
              <div className="px-3 py-2">
                <p className="text-sm font-medium">Admin</p>
                <p className="text-xs text-muted">Console access</p>
              </div>
              <div className="my-1 border-t border-border" />
              <Link
                href="/admin"
                role="menuitem"
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent-soft"
                onClick={() => setOpen(false)}
              >
                <Shield className="h-4 w-4 text-accent" />
                Admin dashboard
              </Link>
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm hover:bg-accent-soft"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
