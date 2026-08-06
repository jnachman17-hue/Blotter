"use client";

/**
 * Shared funnel parts.
 *
 * The `Other` inputs and the payment marks live here because both are used by
 * more than one screen and both carry rules worth stating once.
 */

import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------ type */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-eyebrow leading-none font-medium tracking-[0.1em] text-navy-500 uppercase">
      {children}
    </p>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[1.5rem] leading-[1.25] font-bold tracking-[-0.02em] text-ink">
      {children}
    </h2>
  );
}

/* --------------------------------------------------------------- controls */

export function Primary({
  children,
  disabled,
  onClick,
  type = "button",
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center rounded-full px-6 text-[0.95rem] font-medium",
        "transition-[transform,background-color,opacity] duration-150 ease-out active:scale-[0.98]",
        disabled
          ? "cursor-not-allowed bg-navy-900/20 text-white"
          : "bg-navy-900 text-white hover:bg-navy-800",
      )}
    >
      {children}
    </button>
  );
}

export function BackLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-small font-medium text-ink-muted transition-colors duration-150 ease-out hover:text-ink"
    >
      {label}
    </button>
  );
}

/**
 * One option row, and the `Other` row carries its own input.
 *
 * Jon's ruling of August 6, 2026: `Other` is a text field, typing is required
 * before continuing, and what is typed is kept for analysis. It is a research
 * field — the point is to find the categories missing from the list — so an
 * empty `Other` is worth nothing and is treated as an incomplete answer.
 */
export function Choice({
  label,
  selected,
  onSelect,
  other,
}: {
  label: string;
  selected: boolean;
  onSelect: () => void;
  other?: { value: string; onChange: (v: string) => void; placeholder: string };
}) {
  const showInput = Boolean(other) && selected;

  return (
    <div
      className={cn(
        "rounded-lg border transition-colors duration-150 ease-out",
        selected ? "border-navy-500 bg-navy-500/[0.06]" : "border-rule bg-white",
      )}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          "flex min-h-12 w-full items-center justify-between px-4 py-3 text-left text-body",
          selected ? "text-ink" : "text-ink-read hover:text-ink",
        )}
      >
        {label}
        <span
          aria-hidden="true"
          className={cn(
            "grid size-[18px] shrink-0 place-items-center rounded-full border",
            selected ? "border-navy-500" : "border-rule",
          )}
        >
          {selected && <span className="size-[8px] rounded-full bg-navy-500" />}
        </span>
      </button>

      {showInput && (
        <div className="px-4 pb-3.5">
          <input
            type="text"
            value={other!.value}
            onChange={(e) => other!.onChange(e.target.value)}
            placeholder={other!.placeholder}
            autoFocus
            maxLength={80}
            className="block min-h-11 w-full rounded-lg border border-rule bg-white px-3.5 text-body text-ink outline-none transition-colors duration-150 ease-out focus:border-navy-500"
          />
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------------- marks */

/** A filled check. Included-items marks on the price screen. */
export function Check() {
  return (
    <span
      aria-hidden="true"
      className="mt-[0.1em] grid size-[18px] shrink-0 place-items-center rounded-full bg-navy-500"
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M1.8 5.2 3.9 7.3 8.2 2.9"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * The Apple Pay mark, drawn to Apple's proportions rather than imported.
 *
 * Apple publishes both the artwork and the rules for using it on a payment
 * button. **Before this goes anywhere public, replace this with Apple's own
 * asset and check the button against their Human Interface Guidelines** —
 * placement, minimum size, corner radius and the black/white/outline variants
 * are all specified, and a button that does not comply can fail review.
 *
 * Nothing here collects payment. WS3 forbids card fields entirely.
 */
export function ApplePayMark() {
  return (
    <span className="inline-flex items-center gap-[3px]">
      <svg width="16" height="19" viewBox="0 0 24 28" aria-hidden="true" fill="currentColor">
        <path d="M17.05 15.04c-.03-2.73 2.23-4.04 2.33-4.1-1.27-1.86-3.25-2.11-3.95-2.14-1.68-.17-3.28.99-4.13.99-.85 0-2.17-.97-3.57-.94-1.83.03-3.52 1.06-4.46 2.7-1.9 3.3-.49 8.19 1.36 10.87.9 1.31 1.98 2.79 3.39 2.73 1.36-.05 1.87-.88 3.52-.88 1.64 0 2.11.88 3.55.85 1.47-.02 2.4-1.34 3.3-2.65 1.04-1.52 1.47-2.99 1.5-3.07-.03-.01-2.88-1.1-2.91-4.36ZM14.38 7.15c.75-.91 1.25-2.17 1.11-3.43-1.08.04-2.38.72-3.15 1.62-.69.8-1.29 2.08-1.13 3.31 1.2.09 2.43-.61 3.17-1.5Z" />
      </svg>
      <span className="text-[1.05rem] font-medium tracking-[-0.01em]">Pay</span>
    </span>
  );
}
