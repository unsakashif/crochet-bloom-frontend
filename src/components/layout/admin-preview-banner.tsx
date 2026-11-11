"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { fetchSession } from "@/lib/auth-client";

/** Shown on the storefront when an admin is previewing the shop. */
export function AdminPreviewBanner() {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const s = await fetchSession();
      if (!cancelled && s.role === "admin") setShow(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function backToAdmin() {
    await fetch("/api/admin/exit-preview", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  if (!show) return null;

  return (
    <div className="border-b border-[#6b1c2a]/30 bg-[#3a2430] px-4 py-2 text-center text-sm text-white">
      Admin preview mode —{" "}
      <button
        type="button"
        className="font-medium underline underline-offset-2"
        onClick={backToAdmin}
      >
        Return to admin dashboard
      </button>
    </div>
  );
}
