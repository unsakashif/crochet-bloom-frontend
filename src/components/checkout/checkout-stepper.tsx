import { cn } from "@/lib/utils";

const STEPS = ["Contact", "Address", "Review", "Place order"] as const;

export function CheckoutStepper({ current }: { current: number }) {
  return (
    <ol className="flex flex-wrap gap-2 sm:gap-4">
      {STEPS.map((label, i) => {
        const active = i === current;
        const done = i < current;
        return (
          <li
            key={label}
            className={cn(
              "flex items-center gap-2 text-sm",
              active ? "font-semibold text-accent" : done ? "text-ink" : "text-muted",
            )}
          >
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs",
                active || done ? "bg-accent text-accent-ink" : "bg-border text-muted",
              )}
            >
              {i + 1}
            </span>
            <span className="hidden sm:inline">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
