"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

import { Button } from "@/components/ui/button";

function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Sign in failed");
        setLoading(false);
        return;
      }
      if (data.role === "admin") {
        router.replace("/admin");
      } else {
        const next = params.get("next") || "/account";
        router.replace(next);
      }
      router.refresh();
    } catch {
      setError("Network error — try again.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <p className="font-script text-2xl text-accent">welcome back ♡</p>
      <h1 className="mt-1 font-display text-3xl sm:text-4xl">Sign in</h1>
      <p className="mt-2 text-sm text-muted">
        Customers use phone + password. Admins use admin credentials on the same form.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
            {error}
          </p>
        )}
        <label className="block text-sm font-medium">
          Phone or admin username
          <input
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
            placeholder="03001234567"
            autoComplete="username"
            required
          />
        </label>
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
            autoComplete="current-password"
            required
          />
        </label>
        <Button type="submit" className="w-full" size="lg" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-sm text-muted">
        New here?{" "}
        <Link href="/auth/sign-up" className="font-medium text-accent underline">
          Create a customer account
        </Link>
      </p>
      <p className="mt-3 text-sm text-muted">
        Staff?{" "}
        <Link href="/admin/login" className="font-medium text-accent underline">
          Admin console login
        </Link>
      </p>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-14 text-sm text-muted">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}
