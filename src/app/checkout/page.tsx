"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

import { CheckoutStepper } from "@/components/checkout/checkout-stepper";
import { Button } from "@/components/ui/button";
import { PAKISTAN_CITIES, normalizePkPhone } from "@/data/catalogue";
import { formatPkr } from "@/lib/utils";
import { useCartStore } from "@/store/cart";

type Step = 0 | 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const { lines, subtotal, clear } = useCartStore();
  const [step, setStep] = useState<Step>(0);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Lahore");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const shipping = useMemo(() => (subtotal >= 5000 ? 0 : 250), [subtotal]);
  const total = subtotal + shipping;

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <h1 className="font-display text-3xl">Checkout</h1>
        <p className="mt-3 text-muted">Your cart is empty.</p>
        <Button asChild className="mt-6">
          <Link href="/shop">Shop bestsellers</Link>
        </Button>
      </div>
    );
  }

  function validateContact(): boolean {
    const normalized = normalizePkPhone(phone);
    if (!/^(\+92|0)?3\d{9}$/.test(phone.replace(/[\s-]/g, "")) && !/^\+923\d{9}$/.test(normalized)) {
      setError("Enter a valid Pakistan mobile number (e.g. 03001234567).");
      return false;
    }
    if (!name.trim()) {
      setError("Enter your name.");
      return false;
    }
    setError("");
    return true;
  }

  function validateAddress(): boolean {
    if (!address.trim() || address.trim().length < 8) {
      setError("Enter a full delivery address.");
      return false;
    }
    if (!city) {
      setError("Select a city.");
      return false;
    }
    setError("");
    return true;
  }

  async function placeOrder(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: normalizePkPhone(phone),
          name,
          email: email || undefined,
          city,
          address,
          shippingPkr: shipping,
          lines: lines.map((l) => ({
            productId: l.productId,
            slug: l.slug,
            name: l.name,
            unitPricePkr: l.unitPricePkr,
            quantity: l.quantity,
            colour: l.colour,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not place order.");
        setSubmitting(false);
        return;
      }
      const order = data.order as { orderNumber: string; promisedDateLabel: string };
      clear();
      router.push(
        `/checkout/confirmation?order=${encodeURIComponent(order.orderNumber)}&date=${encodeURIComponent(order.promisedDateLabel)}`,
      );
    } catch {
      setError("Network error — try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="font-display text-3xl">Checkout</h1>
      <p className="mt-1 text-sm text-muted">Guest checkout · Cash on delivery</p>
      <div className="mt-6">
        <CheckoutStepper current={step} />
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger" role="alert">
          {error}
        </p>
      )}

      {step === 0 && (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (validateContact()) setStep(1);
          }}
        >
          <label className="block text-sm font-medium">
            Phone <span className="text-danger">*</span>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="03001234567"
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
              autoComplete="tel"
            />
          </label>
          <label className="block text-sm font-medium">
            Name <span className="text-danger">*</span>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
              autoComplete="name"
            />
          </label>
          <label className="block text-sm font-medium">
            Email <span className="text-muted">(optional)</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
              autoComplete="email"
            />
          </label>
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Continue to address
          </Button>
        </form>
      )}

      {step === 1 && (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (validateAddress()) setStep(2);
          }}
        >
          <label className="block text-sm font-medium">
            City
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border border-border bg-surface px-3"
            >
              {PAKISTAN_CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-medium">
            Address
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2"
              placeholder="House / street / area"
            />
          </label>
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep(0)}>
              Back
            </Button>
            <Button type="submit">Continue to review</Button>
          </div>
        </form>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-4">
          <ul className="space-y-2 text-sm">
            {lines.map((l) => (
              <li key={`${l.productId}-${l.colour}`} className="flex justify-between gap-4">
                <span>
                  {l.name}
                  {l.colour ? ` · ${l.colour}` : ""} × {l.quantity}
                </span>
                <span>{formatPkr(l.unitPricePkr * l.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="space-y-1 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPkr(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping ({city})</span>
              <span>{shipping === 0 ? "Free" : formatPkr(shipping)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPkr(total)}</span>
            </div>
          </div>
          <p className="rounded-lg bg-accent-soft px-3 py-2 text-sm">
            Payment: Cash on delivery. We&apos;ll confirm your order by phone or WhatsApp.
          </p>
          <p className="text-sm text-muted">
            Deliver to {name}, {address}, {city} · {normalizePkPhone(phone)}
          </p>
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button type="button" onClick={() => setStep(3)}>
              Place order
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <form className="mt-8 space-y-4" onSubmit={placeOrder}>
          <p className="text-sm text-muted">
            Confirm placement. Your order is saved for tracking and for the admin console.
          </p>
          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep(2)} disabled={submitting}>
              Back
            </Button>
            <Button type="submit" size="lg" disabled={submitting}>
              {submitting ? "Placing…" : `Confirm COD order · ${formatPkr(total)}`}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
