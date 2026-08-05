/**
 * Google Sheets-style dropdown status chip.
 *
 * Authority: 01-HERO.md section 5 — "restrained Google Sheets-style dropdown
 * chips rather than full-cell status fills". Colours are sampled from the
 * ratified hero asset, which outranks the non-binding palette sketch in
 * 03-page-spec.md.
 *
 * The chip is presentational. It carries the caret glyph because real Sheets
 * dropdown chips do, but it is not interactive: every spreadsheet surface on
 * this page is static product proof.
 */

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const STATUSES = [
  "Replied",
  "Call scheduled",
  "Call completed",
  "No reply",
  "Sent",
] as const;

export type Status = (typeof STATUSES)[number];

/*
 * Metrics matched to hero-reference-v1.png, where the widest chip, "Call
 * completed", measures roughly 102px inside a 132px Status column. Earlier
 * values ran 11px wider and clipped once the sheet was pinned to Arial.
 */
const chip = cva(
  "inline-flex items-center gap-[3px] rounded-full px-[7px] py-[3px] text-[12.5px] leading-none whitespace-nowrap",
  {
    variants: {
      status: {
        Replied: "bg-chip-replied-bg text-chip-replied-fg",
        "Call scheduled": "bg-chip-scheduled-bg text-chip-scheduled-fg",
        "Call completed": "bg-chip-completed-bg text-chip-completed-fg",
        "No reply": "bg-chip-noreply-bg text-chip-noreply-fg",
        Sent: "bg-chip-sent-bg text-chip-sent-fg",
      },
    },
  },
);

interface StatusChipProps extends VariantProps<typeof chip> {
  status: Status;
  className?: string;
}

export function StatusChip({ status, className }: StatusChipProps) {
  return (
    <span className={cn(chip({ status }), className)}>
      {status}
      <svg
        width="7"
        height="4.5"
        viewBox="0 0 8 5"
        aria-hidden="true"
        className="shrink-0 opacity-60"
      >
        <path d="M0 0h8L4 5z" fill="currentColor" />
      </svg>
    </span>
  );
}
