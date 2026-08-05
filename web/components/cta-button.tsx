"use client";

/**
 * The one primary CTA used at all four placements.
 *
 * Authority: WS4-SPEC.md (label `See how Blotter works`),
 * PLAN-AMENDMENTS-2026-08-01.md (four origins, no separate `cta_clicked`
 * event — `funnel_started` carries the origin).
 *
 * Every placement enters the same canonical funnel. Nothing here may add
 * price, beta, account-connection, or permission language.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { track, type CtaLocation } from "@/lib/analytics";
import { useFunnel } from "@/lib/funnel-store";

/** The ratified label. Identical at every placement. */
export const CTA_LABEL = "See how Blotter works";

const cta = cva(
  [
    "inline-flex items-center justify-center rounded-md font-medium",
    "transition-[transform,background-color] duration-150 ease-out",
    "active:scale-[0.98]",
    // 44px minimum touch target (WS5 accessibility baseline)
    "min-h-11",
  ],
  {
    variants: {
      tone: {
        primary: "bg-ink text-white hover:bg-ink/90",
        onDark: "bg-white text-closing hover:bg-white/90",
      },
      size: {
        default: "px-5 text-[0.95rem]",
        large: "px-7 text-base",
        compact: "px-4 text-sm",
      },
      full: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: { tone: "primary", size: "default", full: false },
  },
);

interface CtaButtonProps
  extends VariantProps<typeof cta>,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  location: CtaLocation;
}

export function CtaButton({
  location,
  tone,
  size,
  full,
  className,
  ...props
}: CtaButtonProps) {
  const open = useFunnel((s) => s.open);

  function enterFunnel() {
    open(location);
    track("funnel_started", { cta_location: location });
  }

  return (
    <button
      type="button"
      onClick={enterFunnel}
      className={cn(cta({ tone, size, full }), className)}
      {...props}
    >
      {CTA_LABEL}
    </button>
  );
}
