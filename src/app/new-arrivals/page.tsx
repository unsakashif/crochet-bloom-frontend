import { PageBanner } from "@/components/layout/page-banner";
import { ProductGrid } from "@/components/shop/product-grid";
import { listNewArrivals } from "@/data/catalogue";

export default function NewArrivalsPage() {
  const products = listNewArrivals();

  return (
    <>
      <PageBanner
        background="newArrivals"
        title="New arrivals"
        subtitle="Fresh stitches just dropped — crochet pieces made for gifting season."
      />
      <div className="mx-auto max-w-6xl px-4 py-10">
        <ProductGrid products={products} />
      </div>
    </>
  );
}
