import { cn } from "@/lib/utils";

export type TimelineEvent = {
  key: string;
  label: string;
  at: string | null;
  done: boolean;
};

export function OrderTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <ol className="relative space-y-0 border-s-2 border-border ms-3">
      {events.map((e) => (
        <li key={e.key} className="relative pb-6 ps-6 last:pb-0">
          <span
            className={cn(
              "absolute -start-[9px] top-1 h-4 w-4 rounded-full border-2",
              e.done ? "border-accent bg-accent" : "border-border bg-surface",
            )}
          />
          <p className={cn("text-sm font-medium", e.done ? "text-ink" : "text-muted")}>{e.label}</p>
          {e.at ? (
            <p className="text-xs text-muted">{e.at}</p>
          ) : (
            <p className="text-xs text-muted">Pending</p>
          )}
        </li>
      ))}
    </ol>
  );
}
