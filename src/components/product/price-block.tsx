import { formatPkr, cn } from "@/lib/utils";

export function PriceBlock({
  pricePkr,
  compareAtPkr,
  className,
  size = "md",
}: {
  pricePkr: number;
  compareAtPkr?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const priceClass =
    size === "lg" ? "text-2xl font-semibold" : size === "sm" ? "text-sm font-medium" : "text-base font-medium";

  return (
    <div className={cn("flex flex-wrap items-baseline gap-2", className)}>
      <span className={priceClass}>{formatPkr(pricePkr)}</span>
      {compareAtPkr != null && compareAtPkr > pricePkr && (
        <span className="text-sm text-muted line-through">{formatPkr(compareAtPkr)}</span>
      )}
    </div>
  );
}
