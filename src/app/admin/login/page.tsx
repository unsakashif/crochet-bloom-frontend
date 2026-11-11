"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "@/lib/store/admin-credentials";

function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [username, setUsername] = useState(ADMIN_USERNAME);
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
        body: JSON.stringify({ identifier: username, password }),
      });
      const data = await res.json();
      if (!res.ok || data.role !== "admin") {
        setError(data.error || "Invalid admin credentials");
        setLoading(false);
        return;
      }
      const next = params.get("next") || "/admin";
      router.replace(next.startsWith("/admin") ? next : "/admin");
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
      <p className="font-script text-2xl text-accent">staff only</p>
      <h1 className="mt-1 font-display text-3xl">Admin sign in</h1>
      <p className="mt-2 text-sm text-muted">
        Local demo: <code className="text-ink">{ADMIN_USERNAME}</code> /{" "}
        <code className="text-ink">{ADMIN_PASSWORD}</code>
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {error && (
          <p className="rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
            {error}
          </p>
        )}
        <label className="block text-sm font-medium">
          Username
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
            autoComplete="username"
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
          />
        </label>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Enter console"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted">
        Customer?{" "}
        <Link href="/auth/sign-in" className="text-accent underline">
          Sign in here
        </Link>
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-sm text-muted">Loading…</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
