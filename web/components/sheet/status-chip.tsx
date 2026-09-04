/**
 * A status cell, drawn the way the real sheet draws it.
 *
 * The product does not have chips. `courier/Code.gs` writes the status as
 * conditional formatting on a square cell — a fill and a font colour — and its
 * own comment says why the rounded Sheets dropdown was rejected: Sheets picks
 * the chip's text colour itself, so the exact `fg` of each status is lost, and
 * a dropdown on a Blotter-owned column invites a student to change a value that
 * gets overwritten fifteen minutes later. *"A square cell that is always right
 * beats a pill that lies."*
 *
 * This file used to draw the pill, with a caret, in five colours, two of which
 * named states the product has never had. That is what is being corrected.
 *
 * The fill is the whole cell, not an object inside it, so the caller gives the
 * cell no padding of its own and passes the row's vertical padding as `pad`.
 */

import { cn } from "@/lib/cn";

/** The eight the contract allows, in `VALID_STATUSES` order. */
export const STATUSES = [
  "Not emailed",
  "Bounced",
  "Sent",
  "Replied",
  "Call scheduled",
  "Call done",
  "Call cancelled",
  "Closed",
] as const;

export type ProductStatus = (typeof STATUSES)[number];

/**
 * Two names the product never had.
 *
 * `lib/sheet-data.ts` and `components/section-3/day-timeline.tsx` still write
 * them and are outside this change. Keeping them in the union is what lets
 * those two files compile; nothing in this directory, the hero or Section 02
 * uses either. Delete both, and the `Status` alias with them, once those files
 * are rebuilt against the real column list.
 */
export type LegacyStatus = "Call completed" | "No reply";

export type Status = ProductStatus | LegacyStatus;

/**
 * `STATUS_STYLE`, copied out of `courier/Code.gs`. Background then text.
 *
 * Written as literals rather than as `chip-*` tokens because `globals.css` is
 * missing four of the eight — `Bounced` has no token at all, and `chip-sent-*`
 * still holds the retired pair (#e8eaed on #5f6368) that Jon could not read on
 * a live sheet and could not tell apart from `Closed` and `Not emailed`. Half a
 * table in tokens and half in hex would be worse than either.
 */
const STATUS_STYLE: Record<Status, { bg: string; fg: string }> = {
  /* No fill at all, so it recedes behind every row that wants something. */
  "Not emailed": { bg: "#ffffff", fg: "#a4a8ac" },
  Bounced: { bg: "#fce8e6", fg: "#c5221f" },
  /* The only grey with a background, which is what makes the three legible
     apart from each other. */
  Sent: { bg: "#dfe3e8", fg: "#3c4043" },
  Replied: { bg: "#d7e7fb", fg: "#1a56a8" },
  "Call scheduled": { bg: "#e5ddf7", fg: "#5b3fa8" },
  "Call done": { bg: "#d7f0dd", fg: "#1e6b34" },
  "Call cancelled": { bg: "#fbeacb", fg: "#8a5a00" },
  /* The whole row is greyed and struck through besides. */
  Closed: { bg: "#ffffff", fg: "#a4a8ac" },
  "Call completed": { bg: "#d7f0dd", fg: "#1e6b34" },
  "No reply": { bg: "#fbeacb", fg: "#8a5a00" },
};

interface StatusCellProps {
  status: Status;
  /**
   * The row's vertical padding, as a utility. The fill has to reach the
   * gridlines above and below, so it carries the padding the surrounding cells
   * carry instead of sitting inside it.
   */
  pad?: string;
  className?: string;
}

export function StatusCell({ status, pad = "py-2.5", className }: StatusCellProps) {
  const { bg, fg } = STATUS_STYLE[status];
  return (
    <span
      className={cn("block px-1 text-center whitespace-nowrap", pad, className)}
      style={{ background: bg, color: fg }}
    >
      {status}
    </span>
  );
}

/**
 * The old name, for `section-3/day-timeline.tsx`. Remove it when that file is
 * rebuilt; nothing else imports it.
 */
export { StatusCell as StatusChip };
