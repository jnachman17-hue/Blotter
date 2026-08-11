/**
 * The consequence visual, collapsed to an inbox row.
 *
 * Ratified by Jon August 5, 2026, replacing the full 1180 by 560 Gmail message
 * view. His reasoning: the subject line carries the entire consequence, the
 * body is elaboration nobody needs to read, and the full view was taking more
 * space than the hero.
 *
 * This deviates from `02-SECTION-2` section 10, which forbids reducing the
 * full Gmail view to a single card and requires the folder rail, top
 * navigation and application rail. Jon is authority level 1 and the deviation
 * is deliberate. The full `GmailMessage` component is retained, verified
 * against the exact asset, in case a later section wants it.
 *
 * What survives unchanged: the sender, the subject, the date, the Gmail
 * palette and type. Nothing is reworded and nothing is invented. The muted
 * neighbouring rows carry no text at all, precisely so no email subject is
 * fabricated; they exist so that `One thread buried in 628 emails` describes
 * something the reader can actually see.
 *
 * CLAIM SAFETY, unchanged from section 10: this is an illustrative designed
 * scenario, not documentary evidence of a genuine Goldman Sachs email, and it
 * must never be described as authentic.
 */

import { GmailMark } from "@/components/google-marks";

function Checkbox() {
  return (
    <span
      aria-hidden="true"
      className="h-[13px] w-[13px] shrink-0 rounded-[2px] border-2 border-[#5f6368]"
    />
  );
}

function Star({ muted = false }: { muted?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="shrink-0 text-[14px]"
      style={{ color: muted ? "#dadce0" : "#9aa0a6" }}
    >
      ☆
    </span>
  );
}

/** A read, unremarkable neighbour. Deliberately textless. */
function MutedRow({ widths }: { widths: [number, number] }) {
  return (
    <div className="flex h-[34px] items-center gap-3 border-b border-[#f1f3f4] bg-[#f6f8fc] px-4 opacity-70">
      <Checkbox />
      <Star muted />
      <span
        aria-hidden="true"
        className="h-[7px] shrink-0 rounded-full bg-[#dadce0]"
        style={{ width: widths[0] }}
      />
      <span
        aria-hidden="true"
        className="h-[7px] rounded-full bg-[#e4e7ea]"
        style={{ width: widths[1] }}
      />
      <span className="flex-1" />
      <span
        aria-hidden="true"
        className="h-[7px] w-[34px] shrink-0 rounded-full bg-[#e4e7ea]"
      />
    </div>
  );
}

export function GmailInboxStrip({ width }: { width: number }) {
  return (
    <div
      className="gmail-type overflow-hidden rounded-xl border border-sheet-border bg-white shadow-[0_1px_2px_rgba(60,64,67,0.1)]"
      style={{ width }}
    >
      {/* Enough chrome to place it as Gmail, and no more. */}
      <div className="flex h-9 items-center gap-2 border-b border-[#e8eaed] px-4">
        <GmailMark width={22} height={17} />
        <span className="text-[14px] tracking-[-0.2px] text-[#5f6368]">Mail</span>
        <span className="ml-2 rounded-[3px] bg-[#e8eaed] px-[6px] py-[2px] text-[11px] text-[#444746]">
          Inbox
        </span>
        <span className="flex-1" />
        <span className="text-[12px] text-[#5f6368]">22,844</span>
      </div>

      <MutedRow widths={[128, 210]} />
      <MutedRow widths={[96, 260]} />

      {/* The one that mattered. Unread styling: white ground, bold text. */}
      <div className="flex h-[42px] items-center gap-3 border-y border-[#e8eaed] bg-white px-4 text-[13px] text-[#1f1f1f]">
        <Checkbox />
        <Star />
        <span className="w-[212px] shrink-0 truncate font-bold">
          Goldman Sachs Campus Recruiting
        </span>
        <span className="min-w-0 flex-1 truncate font-bold">
          RE: First Round Interview Invitation · Deadline Passed
        </span>
        <span className="shrink-0 text-[12px] font-bold">Jan 20</span>
      </div>

      <MutedRow widths={[112, 188]} />
      <MutedRow widths={[140, 232]} />
    </div>
  );
}

/* ----------------------------------------------------------------- on a phone */

/**
 * The same five rows, as a phone inbox.
 *
 * Scaled to fit, the desktop strip is 67px tall at 390 and unreadable — a
 * single 1124px inbox *row* squashed to a fifth of its size. This is not a
 * compromise on that: **a phone inbox genuinely is a stack of two-line rows**,
 * so the native form of the thing is also the legible one, and "one thread
 * buried in 628 emails" reads better when the neighbours are visible than when
 * the whole strip is a grey smear.
 *
 * `02-SECTION-2` §15 permits "a separately composed responsive translation",
 * which is exactly what this is. Its do-not-reopen list is honoured: the same
 * one email, the same sender, subject and date, no second spreadsheet, no
 * invented copy.
 *
 * The muted neighbours stay textless for the same reason they are textless on
 * desktop — inventing five plausible recruiting subject lines would put
 * fabricated email content on the page, and the claim-safety note above exists
 * to stop precisely that.
 */
function MutedRowPhone({ widths }: { widths: [number, number] }) {
  return (
    <div className="flex items-center gap-3 border-b border-[#f1f3f4] bg-[#f6f8fc] px-3 py-2.5 opacity-70">
      <Star muted />
      <span className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span
          aria-hidden="true"
          className="h-[7px] rounded-full bg-[#dadce0]"
          style={{ width: widths[0] }}
        />
        <span
          aria-hidden="true"
          className="h-[7px] max-w-full rounded-full bg-[#e4e7ea]"
          style={{ width: widths[1] }}
        />
      </span>
      <span
        aria-hidden="true"
        className="h-[7px] w-[26px] shrink-0 rounded-full bg-[#e4e7ea]"
      />
    </div>
  );
}

export function GmailInboxPhone() {
  return (
    <div className="gmail-type overflow-hidden rounded-xl border border-sheet-border bg-white shadow-[0_1px_2px_rgba(60,64,67,0.1)]">
      <div className="flex h-9 items-center gap-2 border-b border-[#e8eaed] px-3">
        <GmailMark width={20} height={15} />
        <span className="text-[13px] tracking-[-0.2px] text-[#5f6368]">Mail</span>
        <span className="ml-1 rounded-[3px] bg-[#e8eaed] px-[6px] py-[2px] text-[10px] text-[#444746]">
          Inbox
        </span>
        <span className="flex-1" />
        <span className="text-[11px] text-[#5f6368]">22,844</span>
      </div>

      <MutedRowPhone widths={[96, 150]} />
      <MutedRowPhone widths={[72, 190]} />

      {/*
        The one that mattered. Sender and date on the first line, subject on the
        second, which is how a phone inbox sets an unread thread — and it is
        what lets the full ratified subject render instead of truncating, since
        the deadline clause is the entire point of the row.
      */}
      <div className="flex items-start gap-3 border-y border-[#e8eaed] bg-white px-3 py-3 text-[#1f1f1f]">
        <Star />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-baseline gap-2">
            <span className="min-w-0 flex-1 truncate text-[13px] font-bold">
              Goldman Sachs Campus Recruiting
            </span>
            <span className="shrink-0 text-[11px] font-bold">Jan 20</span>
          </span>
          <span className="mt-0.5 text-[12.5px] leading-[1.35] font-bold">
            RE: First Round Interview Invitation · Deadline Passed
          </span>
        </span>
      </div>

      <MutedRowPhone widths={[84, 168]} />
      <MutedRowPhone widths={[108, 140]} />
    </div>
  );
}
