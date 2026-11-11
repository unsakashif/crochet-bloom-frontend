"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const STORAGE_KEY = "cb-announce-dismissed";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setVisible(sessionStorage.getItem(STORAGE_KEY) !== "1");
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-accent text-accent-ink">
      <p className="px-10 py-2 text-center text-xs sm:text-sm">
        Free shipping on orders over Rs 5,000 · Nationwide COD available
      </p>
      <button
        type="button"
        aria-label="Dismiss announcement"
        className="absolute end-2 top-1/2 -translate-y-1/2 rounded p-1 hover:bg-white/10"
        onClick={() => {
          sessionStorage.setItem(STORAGE_KEY, "1");
          setVisible(false);
        }}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
