"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

import { AdminPreviewBanner } from "@/components/layout/admin-preview-banner";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

/** Public storefront chrome — hidden on admin console routes. */
export function StoreChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <main className="min-h-screen bg-[#f7f2f0]">{children}</main>;
  }

  return (
    <>
      <AdminPreviewBanner />
      <AnnouncementBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
