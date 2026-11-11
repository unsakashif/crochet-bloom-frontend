export function SparkleField({ className = "" }: { className?: string }) {
  const dots = [
    { t: "12%", l: "8%", d: "0s" },
    { t: "22%", l: "88%", d: "0.4s" },
    { t: "68%", l: "12%", d: "0.8s" },
    { t: "78%", l: "82%", d: "1.2s" },
    { t: "40%", l: "70%", d: "0.2s" },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {dots.map((d, i) => (
        <span
          key={i}
          className="animate-sparkle absolute text-accent/50"
          style={{ top: d.t, left: d.l, animationDelay: d.d }}
        >
          ✦
        </span>
      ))}
    </div>
  );
}
