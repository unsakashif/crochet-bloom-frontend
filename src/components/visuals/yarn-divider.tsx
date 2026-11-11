export function YarnDivider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2" aria-hidden>
      <svg viewBox="0 0 320 24" className="h-6 w-full max-w-md text-accent/40">
        <path
          className="animate-yarn"
          d="M4 12 C40 4, 80 20, 120 12 S200 4, 240 12 300 20, 316 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="160" cy="12" r="3" className="fill-accent/60" />
      </svg>
    </div>
  );
}
