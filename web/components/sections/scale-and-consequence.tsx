/**
 * Section 2: the scale of a recruiting cycle, and its consequence.
 *
 * Authority: 02-SECTION-2-SCALE-AND-CONSEQUENCE.md. Every visible string here
 * is exact copy from section 5 of that specification and may not be reworded.
 * The order is fixed by section 4 and may not be rearranged: eyebrow,
 * headline, four figures, qualification, time proof, supporting paragraph,
 * consequence visual with two external annotations, closing. There is no CTA,
 * by section 5 and the section 18 acceptance criteria.
 *
 * Section 12 forbids repeating any hero device here: no second spreadsheet,
 * no maintained-zone yellow, no cue-to-row connectors, no ownership
 * underlines. The hero's background field has resolved to white by this point
 * for the same reason.
 *
 * Section 14: the whole argument reads in a static screenshot. Nothing here
 * animates.
 */

import { GmailMessage, GMAIL_W, GMAIL_H } from "@/components/section-2/gmail-message";
import { PageBox, PAGE_BOX_W } from "@/components/layout/page-box";

/**
 * The four recruiting-volume figures (section 5).
 *
 * Section 7 governs the treatment: typography-led, immediately scannable, no
 * icons, no animation, no chart furniture, and explicitly no explanatory
 * microcopy beneath any individual number. Section 7's card rule bans four
 * equal rounded rectangles, filled metric tiles, heavy shadows and bordered
 * KPI boxes, so the sequence is set on open ground under one hairline.
 *
 * `628` carries more scale than the other three deliberately. It is the number
 * the first email annotation reaches back to, `One thread buried in 628
 * emails`, so leading with it ties the top of the section to its consequence
 * and gives the row the nonuniform balance section 7 permits. Ratified by Jon
 * on August 5, 2026.
 */
const FIGURES = [
  { value: "628", label: "Recruiting emails", lead: true },
  { value: "68", label: "Coffee chats", lead: false },
  { value: "19", label: "Applications", lead: false },
  { value: "30", label: "Interview rounds", lead: false },
] as const;

function VolumeFigures() {
  return (
    <div className="mt-12 border-t border-rule pt-8">
      <div className="grid grid-cols-[1.35fr_1fr_1fr_1fr] items-end gap-x-8">
        {FIGURES.map((f) => (
          <div key={f.label}>
            <div
              className={
                f.lead
                  ? "text-[76px] leading-[0.9] font-semibold tracking-[-0.04em] tabular-nums text-ink"
                  : "text-[58px] leading-[0.9] font-semibold tracking-[-0.035em] tabular-nums text-ink"
              }
            >
              {f.value}
            </div>
            <div className="mt-3 text-small text-ink-muted">{f.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Qualification and the subordinate time-savings proof (section 8).
 *
 * Both are supporting proof rather than a fifth figure, so they sit below the
 * row in the same small proof-note family. `~60 hours saved` carries the
 * typographic emphasis section 8 asks for; the rest of the line stays compact,
 * with the methodology directly beneath. No icon, no card, no badge, no loud
 * highlight colour.
 */
function ProofNotes() {
  return (
    <div className="mt-9 grid grid-cols-[1fr_auto] items-start gap-x-16">
      <p className="max-w-[520px] text-micro leading-[1.6] text-ink-faint">
        * Representative workload from a high-intensity Summer Analyst 2028
        recruiting cycle that resulted in a JPMorgan offer.
      </p>

      <div className="max-w-[420px] border-l border-navy-400/40 pl-5">
        <p className="text-small leading-[1.5] text-ink-muted">
          <span className="font-semibold text-navy-900">~60 hours saved</span> on
          manual tracker administration over one recruiting cycle
        </p>
        <p className="mt-2 text-micro leading-[1.55] text-ink-faint">
          Estimated from manual Gmail and Calendar logging, tracker updates, and
          recurring reconciliation across the case-study recruiting cycle.
        </p>
      </div>
    </div>
  );
}

/**
 * The consequence visual and its two annotations (sections 10 and 11).
 *
 * The annotations stay outside the Gmail interface, cover nothing, and carry a
 * short leader tick rather than an arrow, because section 11 forbids arrows
 * that would imply Blotter is already acting. They frame the visual
 * diagonally, which associates each line with the email without adding
 * meaningful height.
 *
 * The email scales uniformly to the page's bounding box. Section 15 allows
 * exactly that and forbids cropping meaningful content.
 */
function ConsequenceVisual() {
  const scale = PAGE_BOX_W / GMAIL_W;

  return (
    <div className="mt-16">
      <p className="mb-3 flex items-center gap-3 text-[14px] font-medium text-navy-900">
        <span aria-hidden="true" className="h-px w-6 shrink-0 bg-navy-400" />
        One thread buried in 628 emails
      </p>

      {/*
        A hairline and a faint lift, nothing more. Section 10 forbids replacing
        the full Gmail view with a floating email card, so the frame stays a
        screenshot boundary rather than card furniture.
      */}
      <div
        className="overflow-hidden rounded-xl border border-sheet-border shadow-[0_1px_2px_rgba(60,64,67,0.1)]"
        style={{ width: PAGE_BOX_W, height: GMAIL_H * scale }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <GmailMessage />
        </div>
      </div>

      <p className="mt-3 flex items-center justify-end gap-3 text-[14px] font-medium text-navy-900">
        A stale tracker does not direct you back before the deadline passes
        <span aria-hidden="true" className="h-px w-6 shrink-0 bg-navy-400" />
      </p>
    </div>
  );
}

/* ---------------------------------------------------------------- section */

export function ScaleAndConsequence() {
  return (
    <section className="pt-24 pb-28">
      <PageBox>
        <p className="flex items-start gap-3 text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase">
              <span
                aria-hidden="true"
                className="mt-[0.35em] h-[0.9em] w-[2px] shrink-0 bg-navy-500"
              />
              The scale of a recruiting cycle
            </p>

            {/* 900px keeps the headline on one line; it measures 869px. */}
            <h2 className="mt-5 max-w-[900px] text-h2 leading-[1.12] font-semibold tracking-[-0.025em] text-ink">
              Your manual tracker was never built to keep up with this.
            </h2>

            <VolumeFigures />
            <ProofNotes />

            {/*
              Exact three sentences, section 9. Section 9 permits but does not
              require modest emphasis on "inevitably falls behind reality".
              Ratified by Jon on August 5, 2026: it is the hinge of the
              argument, so it carries weight.
            */}
            <p className="mt-16 max-w-[680px] text-lede leading-[1.65] text-ink-muted">
              Recruiting activity changes continuously across hundreds of emails,
              coffee chats, applications, and interview rounds. A manual tracker
              changes only when you remember to update it, so at this volume it{" "}
              <span className="font-medium text-ink">
                inevitably falls behind reality
              </span>
              . Deadlines, follow-ups, and next steps begin slipping through the
              cracks.
            </p>

        <ConsequenceVisual />

        <p className="mt-16 max-w-[680px] text-lede leading-[1.65] text-ink-muted">
          Once you stop trusting the tracker, you are back to reconstructing your
          process from Gmail, Calendar, memory, and scattered notes. That is when
          follow-ups, thank-you notes, and next steps begin falling through the
          cracks.
        </p>
      </PageBox>
    </section>
  );
}
