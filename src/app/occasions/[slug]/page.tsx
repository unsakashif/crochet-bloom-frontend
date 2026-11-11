import { notFound } from "next/navigation";

import { PageBanner } from "@/components/layout/page-banner";
import { ProductGrid } from "@/components/shop/product-grid";
import { OCCASIONS, getOccasion, listProducts } from "@/data/catalogue";

export function generateStaticParams() {
  return OCCASIONS.map((o) => ({ slug: o.slug }));
}

export default function OccasionDetailPage({ params }: { params: { slug: string } }) {
  const occasion = getOccasion(params.slug);
  if (!occasion) notFound();
  const products = listProducts({ occasion: occasion.slug, sort: "bestselling" });

  return (
    <>
      <PageBanner
        background="collection"
        title={occasion.label}
        subtitle={occasion.blurb}
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
