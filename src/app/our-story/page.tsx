import Link from "next/link";

import { PageBanner } from "@/components/layout/page-banner";
import { Button } from "@/components/ui/button";
import { brandName } from "@/lib/utils";

export default function OurStoryPage() {
  return (
    <>
      <PageBanner
        background="story"
        title="Our story"
        subtitle="Handmade crochet from artisans across Pakistan."
      />
      <div className="mx-auto max-w-3xl px-4 py-12">
        <p className="font-script text-2xl text-accent">handmade with love</p>
        <p className="mt-4 text-muted leading-relaxed">
          {brandName} is a handmade crochet label rooted in Pakistan. We work with in-house makers
          and home-based women artisans so every bouquet, baby set, and bridal piece carries real
          handwork — not factory sameness.
        </p>
        <p className="mt-4 text-muted leading-relaxed">
          Most pieces are made to order. Lead times sit beside the Add button so you know when a
          gift will ship. Cash on delivery and WhatsApp support are part of how our customers
          already buy.
        </p>
        <Button asChild className="mt-8">
          <Link href="/shop">Shop all</Link>
        </Button>
      </div>
    </>
  );
}
