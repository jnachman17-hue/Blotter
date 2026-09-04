/**
 * A single Gmail or Calendar activity cue.
 *
 * Authority: 01-HERO.md section 7 for the restraint — compact size, quiet
 * source identification, one concise primary line, supporting visual weight
 * relative to the spreadsheet. Section 7 forbids message previews, subject
 * lines, message bodies, avatars, photographs, bank logos and larger marketing
 * treatments, and none of that comes back here.
 *
 * **The second line changed on September 3, 2026**, and it is the one place
 * this departs from section 7, which asks for a timestamp there. A timestamp
 * says when Blotter noticed. It does not say what Blotter did, and the whole
 * claim of the page is that one event moves several columns at once: a reply
 * lands and the status, the clock and the attempt count all move together. So
 * the line now carries the cells that changed. The date is not lost — the row
 * the connector points at has `Last contact` in it.
 */

import { CalendarMark, GmailMark } from "@/components/google-marks";

export interface CellChange {
  /** The column heading, exactly as the sheet writes it. */
  column: string;
  /** Omitted where the cell was empty before. */
  from?: string;
  to: string;
}

export interface ActivityCue {
  source: "gmail" | "calendar";
  /** What happened, in the reader's words rather than the engine's. */
  event: string;
  /** When it happened, as a notification would say it: `Jan 16 · 10:42 AM`. */
  when: string;
  /**
   * The cells the event moved. Kept as the record of what the row does; not
   * drawn. A card that listed them was tried on September 3, 2026 and reverted
   * on September 4 on Jon's ruling: the card is a notification, and the
   * animation already shows the cells change. Listing them made it a changelog.
   */
  moved: CellChange[];
  /** Zero-based index of the hero row this cue maps to. */
  targetRow: number;
}

export function ActivityCueCard({ cue }: { cue: ActivityCue }) {
  return (
    <div className="flex items-start gap-2.5 rounded-lg border border-sheet-border bg-sheet-chrome px-3 py-[6px] shadow-[0_1px_2px_rgba(60,64,67,0.12),0_4px_12px_-6px_rgba(60,64,67,0.22)]">
      <span className="mt-[1px] shrink-0">
        {cue.source === "gmail" ? <GmailMark /> : <CalendarMark />}
      </span>
      <div className="min-w-0">
        <div className="text-[13px] leading-[16px] font-semibold whitespace-nowrap text-ink">
          {cue.event}
        </div>
        <div className="mt-[2px] text-[11.5px] leading-[14px] whitespace-nowrap text-ink-muted">
          {cue.when}
        </div>
      </div>
    </div>
  );
}
