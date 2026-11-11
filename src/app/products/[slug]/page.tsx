import { notFound } from "next/navigation";

import { ProductDetail } from "@/components/product/product-detail";
import { PRODUCTS, getProduct } from "@/data/catalogue";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
