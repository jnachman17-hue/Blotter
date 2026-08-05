/**
 * Canonical spreadsheet data.
 *
 * Every value here is fixed by a ratified build specification. Do not invent,
 * extend, or "improve" a row: 01-HERO section 6 forbids adding Email, Group,
 * Notes, Priority, Location, LinkedIn, Owner, Stage, or any other field to the
 * hero, and 05-SECTION-5 fixes the ten-column preservation view exactly.
 *
 * The five contacts are consistent across every surface on January 16, 2026.
 */

import type { SheetColumn, SheetRow } from "@/components/sheet/sheet-grid";

/* ------------------------------------------------------- hero (01-HERO §6) */

/*
 * Widths reproduce the measured geometry of the ratified hero at a 1006px
 * SheetWindow: 43px row gutter, manual zone 43 to 415, maintained zone 415 to
 * 1005. Manual columns sum to 372, maintained to 590.
 */
export const HERO_COLUMNS: SheetColumn[] = [
  // Manual zone totals 372px. Widths fit the longest value in each column
  // without clipping: "Sarah Chen", "Vice President", "Morgan Stanley".
  { header: "Name", width: "w-[108px]" },
  { header: "Title", width: "w-[126px]", kind: "italic" },
  { header: "Firm", width: "w-[138px]" },
  { header: "Status", width: "w-[132px]", kind: "status" },
  { header: "Next move", width: "w-[156px]" },
  { header: "Last contact", width: "w-[112px]" },
  { header: "Days", width: "w-[56px]", align: "right" },
  { header: "Call", width: "w-[134px]" },
];

export const HERO_ROWS: SheetRow[] = [
  {
    // Cue-linked: "Sarah Chen replied", Jan 16 10:42 AM
    emphasised: true,
    cells: [
      "Sarah Chen",
      "Associate",
      "JPMorgan",
      { status: "Replied" },
      "Reply to Sarah",
      "1/16/26",
      "0",
      null,
    ],
  },
  {
    // Cue-linked: "Coffee chat with Marcus Lee", Jan 17 2:00 PM
    emphasised: true,
    cells: [
      "Marcus Lee",
      "Analyst",
      "Evercore",
      { status: "Call scheduled" },
      "Attend coffee chat",
      "1/15/26",
      "1",
      "1/17 @ 2:00 PM",
    ],
  },
  {
    // No cue. Retains baseline maintained tint, not de-emphasised.
    cells: [
      "Priya Shah",
      "Vice President",
      "Lazard",
      { status: "Call completed" },
      "Send thank-you",
      "1/16/26",
      "0",
      "Completed 1/16",
    ],
  },
  {
    // No cue. Retains baseline maintained tint.
    cells: [
      "Daniel Kim",
      "Associate",
      "Morgan Stanley",
      { status: "No reply" },
      "Bump thread",
      "1/11/26",
      "5",
      null,
    ],
  },
  {
    // Cue-linked: "Email sent to Alex Morgan", Jan 16 8:18 AM.
    // Next move is genuinely blank. The em dash in the source asset was
    // removed on Jon's instruction, August 4, 2026.
    emphasised: true,
    cells: [
      "Alex Morgan",
      "Analyst",
      "Centerview",
      { status: "Sent" },
      null,
      "1/16/26",
      "0",
      null,
    ],
  },
];

/* ------------------------------ hero activity cues (01-HERO §7, exact copy) */

export interface ActivityCue {
  source: "gmail" | "calendar";
  primary: string;
  timestamp: string;
  /** Zero-based index of the hero row this cue maps to. */
  targetRow: number;
}

export const HERO_CUES: ActivityCue[] = [
  {
    source: "gmail",
    primary: "Sarah Chen replied",
    timestamp: "Jan 16 · 10:42 AM",
    targetRow: 0,
  },
  {
    source: "calendar",
    primary: "Coffee chat with Marcus Lee",
    timestamp: "Jan 17 · 2:00 PM",
    targetRow: 1,
  },
  {
    source: "gmail",
    primary: "Email sent to Alex Morgan",
    timestamp: "Jan 16 · 8:18 AM",
    targetRow: 4,
  },
];
