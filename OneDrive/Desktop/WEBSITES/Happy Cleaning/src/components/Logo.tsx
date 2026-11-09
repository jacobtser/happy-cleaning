export function Logo({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`} aria-label="Happy Cleaning Services">
      <span
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
          light ? "bg-cream text-forest" : "bg-forest text-cream"
        }`}
      >
        <svg viewBox="0 0 44 44" className="h-7 w-7" aria-hidden="true">
          <path
            d="M22 8.5c.75 6.7 4.8 10.75 11.5 11.5-6.7.75-10.75 4.8-11.5 11.5-.75-6.7-4.8-10.75-11.5-11.5C17.2 19.25 21.25 15.2 22 8.5Z"
            fill="currentColor"
          />
          <circle cx="33.5" cy="10" r="1.8" fill="#e8b65c" />
          <circle cx="11" cy="33" r="1.2" fill="#e56c4e" />
        </svg>
      </span>
      <span className="flex flex-col">
        <span
          className={`font-display text-[1.28rem] font-semibold leading-[0.9] tracking-[-0.02em] ${
            light ? "text-cream" : "text-forest"
          }`}
        >
          Happy Cleaning
        </span>
        <span
          className={`mt-1 text-[0.5rem] font-extrabold uppercase leading-none tracking-[0.34em] ${
            light ? "text-cream/60" : "text-muted"
          }`}
        >
          services
        </span>
      </span>
    </span>
  );
}
