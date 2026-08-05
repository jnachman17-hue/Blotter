/**
 * A single Gmail or Calendar activity cue.
 *
 * Authority: 01-HERO.md section 7. The three cues use exact copy and are
 * illustrative, not exhaustive. Preserve compact size, restrained source
 * identification, one concise primary line, one small timestamp line, and
 * supporting visual weight relative to the spreadsheet.
 *
 * Section 7 forbids message previews, subject lines, message bodies, avatars,
 * photographs, bank logos, extra metadata, additional cues for Priya Shah or
 * Daniel Kim, and larger marketing-card treatments. Nothing here may grow into
 * any of those.
 */

import { CalendarMark, GmailMark } from "@/components/google-marks";
import type { ActivityCue } from "@/lib/sheet-data";

export function ActivityCueCard({ cue }: { cue: ActivityCue }) {
  return (
    <div className="flex w-[236px] items-center gap-2.5 rounded-lg border border-sheet-border bg-sheet-chrome px-3 py-2 shadow-[0_1px_2px_rgba(60,64,67,0.12),0_4px_12px_-6px_rgba(60,64,67,0.22)]">
      {cue.source === "gmail" ? <GmailMark /> : <CalendarMark />}
      <div className="min-w-0">
        <div className="text-[13px] leading-[17px] font-semibold whitespace-nowrap text-ink">
          {cue.primary}
        </div>
        <div className="text-[11.5px] leading-[15px] whitespace-nowrap text-ink-muted">
          {cue.timestamp}
        </div>
      </div>
    </div>
  );
}
