import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPkr(amount: number): string {
  return `Rs ${amount.toLocaleString("en-PK")}`;
}

export const brandName = process.env.NEXT_PUBLIC_BRAND_NAME ?? "Crochet Bloom";
export const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "920000000000";

export function whatsappHref(message?: string): string {
  const text = encodeURIComponent(message ?? `Hi ${brandName}, I'd like to ask about an order.`);
  return `https://wa.me/${whatsappNumber}?text=${text}`;
}
