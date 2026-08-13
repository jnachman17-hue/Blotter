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

/**
 * The label, identical at every placement.
 *
 * `See how Blotter works` until August 6, 2026, when Jon changed it to
 * `Try Blotter Now`. The change is forced rather than cosmetic: the old label
 * promised a demonstration, and the funnel kept that promise with the
 * three-frame product experience. He cut the three frames, so the old label
 * would have been writing a cheque the funnel could no longer cash.
 *
 * Supersedes `WS4-SPEC.md` and `07-SECTION-7` §9, both of which ratify the old
 * string. Nothing here may say `early access`, `waitlist` or `beta` — WS3
 * forbids any availability signal before the terminal screen.
 *
 * If the platform variant is ever built, it must carry this exact label too.
 * WS3 requires the two funnels stay comparable, and the CTA is the first thing
 * that would diverge.
 *
 * ## `Fix my tracker`, August 13, 2026
 *
 * Jon's ruling, under the voice change. First person, so it reads as the
 * visitor's own thought rather than the site's instruction, and it is the only
 * thing on the page the product literally does.
 *
 * **What it deliberately is not.** Jon's opening idea was `Get my job` or
 * `Find me a job`, and the shape was right while the promise was not: the FAQ
 * says Blotter neither writes outreach nor teaches technicals, the boundary
 * chips refuse mass outreach, and the closing banner says recruiting will still
 * suck. A button promising a job is the single claim on this page a stranger
 * could take apart in one reply, and the page's credibility currently rests on
 * refusing to overpromise.
 *
 * **One label at every placement, and that is a measurement rule rather than a
 * taste one.** WS3 permits multiple CTAs precisely because they all enter one
 * funnel and `cta_location` tells them apart. Different labels per placement
 * would confound label with position, and `cta_location` — the only placement
 * evidence this test has produced — would stop meaning anything.
 */
export const CTA_LABEL = "Fix my tracker";

/*
 * Shape rule for the page: interactive elements are pills, surfaces are 12px.
 * The spreadsheet keeps its own Google Sheets radii and is exempt.
 */
const cta = cva(
  [
    "inline-flex items-center justify-center rounded-full font-medium",
    "transition-[transform,background-color] duration-150 ease-out",
    "active:scale-[0.98]",
    // 44px minimum touch target (WS5 accessibility baseline)
    "min-h-11",
  ],
  {
    variants: {
      tone: {
        primary: "bg-navy-900 text-white hover:bg-navy-800",
        onDark: "bg-white text-closing hover:bg-white/90",
      },
      size: {
        default: "px-6 text-[0.95rem]",
        large: "px-8 text-base",
        compact: "px-5 text-sm",
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
