/**
 * Section 6 parts, third build, August 6, 2026.
 *
 * Jon rejected the second build too. His diagnosis was right and it was
 * structural: the section stacked six different layout languages — a quote
 * block, a bordered diagram card, a table card, a two-column note, a
 * two-column text pair, a paragraph — and each was defensible against its own
 * spec clause while the whole read as chaos. The `01 / 02 03 / 04` shape
 * implied a flow that was never drawn. Orphan bullets and a floating statement
 * were leftover content parked in whitespace.
 *
 * His instruction: reduce the section massively, push the rest to the back
 * page, keep one visual flow of the four steps with icons, take the box off it
 * so it sits on the gradient, and incorporate the permissions material
 * minimally.
 *
 * Reference point, and it settled the macro question: Shortwave — a Gmail app
 * on restricted scopes that has to survive the same Google review — carries
 * none of this on its marketing site. It lives on a docs page, eleven headed
 * sections, prose only, no tables and no cards. The serious version of this is
 * a small section plus a real page behind it.
 *
 * So the section is now three things: a claim, a flow, and three service
 * columns. Everything else — the four steps in prose, the full matrix,
 * retention, deletion, the commitments, the provider detail and the FAQ — is on
 * `/privacy`.
 *
 * Still obeyed: every string verbatim, no eyebrow, no CTA, no seals or security
 * iconography, no simulated OAuth or permission toggles, no
 * checkmark-versus-X treatment, and nothing hidden behind an interaction.
 */

import { CalendarMark, GmailMark, SheetsMark } from "@/components/google-marks";
import {
  CheckSenderIcon,
  KeepIcon,
  ReadIcon,
  StopIcon,
} from "@/components/section-6/step-icons";
import { cn } from "@/lib/cn";
import { PERMISSIONS, PROCESSING_STEPS } from "@/lib/privacy-copy";

/* ------------------------------------------------------------------- the flow */

const ICONS = [CheckSenderIcon, StopIcon, ReadIcon, KeepIcon];

/**
 * The four steps as one flow, drawn on the page rather than inside a panel.
 *
 * Four beats of one story read left to right: first the sender is checked,
 * then nothing happens if there is no match, then the message is read if there
 * is, then only facts survive. The second beat is the exclusion and it is the
 * one the reader cares about, so it carries the struck mark and a muted ring
 * while the others are navy — colour does the branching that a fork diagram
 * would otherwise have to draw.
 *
 * The connector is a hairline running between the marks at their centre. It
 * stops before the last one, because the story does.
 */
export function ProcessingFlow() {
  return (
    <ol className="grid grid-cols-4 gap-x-8">
      {PROCESSING_STEPS.map((step, i) => {
        const Icon = ICONS[i];
        const excluded = i === 1;
        return (
          <li key={step.n}>
            <div className="flex items-center">
              <span
                className={cn(
                  "grid size-[52px] shrink-0 place-items-center rounded-full border bg-white",
                  excluded
                    ? "border-rule text-ink-faint"
                    : "border-navy-400/35 text-navy-800",
                )}
              >
                <Icon />
              </span>
              {i < PROCESSING_STEPS.length - 1 && (
                <span aria-hidden="true" className="h-px flex-1 bg-navy-400/25" />
              )}
            </div>

            <p className="mt-5 font-mono text-micro leading-none font-medium text-ink-faint tabular-nums">
              {step.n}
            </p>
            <h3
              className={cn(
                "mt-2 text-body leading-[1.35] font-semibold",
                excluded ? "text-ink-muted" : "text-ink",
              )}
            >
              {step.title}
            </h3>
            <p className="mt-2 text-small leading-[1.6] text-ink-muted">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

/* --------------------------------------------------------- the service columns */

const MARKS: Record<string, React.ReactNode> = {
  Gmail: <GmailMark width={19} height={14} />,
  "Google Calendar": <CalendarMark size={18} />,
  "Google Sheets": <SheetsMark size={18} />,
};

/**
 * The permissions matrix, turned ninety degrees and stripped of its chrome.
 *
 * The same exact content as the table, in three narrow columns instead of one
 * wide grid: the eye scans three short lists rather than tracking across a
 * 1,124px row, and the three columns end at roughly the same depth, which the
 * table never did. No header row, no borders, no alternating fills, no
 * container. `Can do` and `Cannot do` are told apart by a hairline and by the
 * bullet alone — a filled dot for what the connection does, an open ring for
 * what it cannot. §8's ban on the checkmark-versus-X treatment holds, and both
 * lists read at the same strength because a `Cannot do` list is a fact rather
 * than a warning.
 *
 * The column labels are the spec's own `Can do` and `Cannot do`, set small.
 */
export function ServicePermissions() {
  return (
    <div className="grid grid-cols-3 gap-x-12">
      {PERMISSIONS.map((row) => (
        <div key={row.service}>
          <h3 className="flex items-center gap-2.5 border-b border-rule pb-3 text-body leading-[1.4] font-semibold text-ink">
            {MARKS[row.service]}
            {row.service}
          </h3>

          <p className="mt-4 text-micro leading-none font-medium tracking-[0.09em] text-ink-faint uppercase">
            Can do
          </p>
          <ul className="mt-2.5 space-y-2">
            {row.can.map((line) => (
              <li key={line} className="flex gap-2.5 text-small leading-[1.55] text-ink-muted">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full bg-navy-500"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-micro leading-none font-medium tracking-[0.09em] text-ink-faint uppercase">
            Cannot do
          </p>
          <ul className="mt-2.5 space-y-2">
            {row.cannot.map((line) => (
              <li key={line} className="flex gap-2.5 text-small leading-[1.55] text-ink-muted">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-[5px] w-[5px] shrink-0 rounded-full border border-ink-faint/80"
                />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
