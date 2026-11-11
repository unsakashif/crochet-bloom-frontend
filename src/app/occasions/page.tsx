import Link from "next/link";

import { PageBanner } from "@/components/layout/page-banner";
import { listOccasions } from "@/data/catalogue";
import { BRAND_BACKGROUNDS } from "@/lib/brand-backgrounds";

export default function OccasionsPage() {
  const occasions = listOccasions();

  return (
    <>
      <PageBanner
        background="collection"
        title="Collections"
        subtitle="Shop by occasion — phone covers, garden party, cozy cardigans, bridal, and more."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {occasions.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/occasions/${o.slug}`}
                className="group relative block overflow-hidden rounded-card border border-border shadow-soft"
              >
                <div
                  className="relative aspect-[5/3] bg-cover bg-center"
                  style={{ backgroundImage: `url(${BRAND_BACKGROUNDS.collection})` }}
                >
                  <div className="absolute inset-0 bg-ink/45 transition group-hover:bg-ink/35" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5 text-white">
                    <h2 className="font-display text-2xl">{o.label}</h2>
                    <p className="mt-1 text-sm text-white/85">{o.blurb}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
