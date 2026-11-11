import type { Product } from "@/data/catalogue";
import { leadTimeLabel } from "@/data/catalogue";
import { cn } from "@/lib/utils";

export function LeadTimeBadge({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block text-xs text-muted",
        className,
      )}
    >
      {leadTimeLabel(product)}
    </span>
  );
}
