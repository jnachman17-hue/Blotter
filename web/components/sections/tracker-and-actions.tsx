/**
 * Sections 4 and 5, merged into one section with two beats.
 *
 * Authority: `05-SECTION-5-PRESERVATION.md` and
 * `04-SECTION-4-OUTSTANDING-ACTIONS.md`, as overruled in part by Jon on
 * August 5, 2026. Both spec files carry an amendment table recording this.
 *
 * Why merged. The page was carrying three separate Google Sheets windows —
 * hero, Section 4, Section 5 — and however different the arguments are, a
 * reader files three tables as one repeated idea. The two beats are literally
 * two tabs of one file, which is what the product is: `Contacts` is the sheet
 * you already built, `Blotter` is the standardised view, `Outstanding` is the
 * derived list. `Contacts` sitting untouched in the tab strip is itself the
 * preservation proof.
 *
 * Beat order is deliberate. Preservation kills the switching-cost objection
 * first, then the action view delivers the payoff and carries the CTA. Both
 * ratified headlines survive intact and in their ratified order, so the merge
 * costs no copy — only a section boundary.
 *
 * The two beats mirror each other: beat 1 sets its headline left and its copy
 * right, beat 2 reverses them, so the section does not read as one long column.
 *
 * Exact copy, not rewritten: both headlines, both supporting lines, the three
 * reassurance claims, the CTA line and the CTA label. The counts reconcile as
 * ratified, 6 + 11 + 4 = 21.
 *
 * Nothing animates. The whole section survives a screenshot.
 */

import { CtaButton } from "@/components/cta-button";
import { PageBox } from "@/components/layout/page-box";
import {
  BlotterTab,
  OutstandingTab,
  Reassurance,
} from "@/components/section-45/parts";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------- exact copy */

const KEEP_H = "Keep the tracker you already built.";
const KEEP_SUB =
  "Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.";

const ACT_H = "Know exactly what needs your attention.";
const ACT_SUB =
  "Stop reconstructing your next moves from Gmail, Calendar, and memory. Blotter gives you one current view of every action you owe.";

/** `04-SECTION-4` §5. The CTA enters the funnel with `cta_location = actions`. */
const CTA_LINE = "Open your tracker and know what to do next.";

/* ------------------------------------------------------------------ pieces */

function Head({ h, sub, flip }: { h: string; sub: string; flip?: boolean }) {
  const title = (
    <h2
      className={cn(
        "font-display max-w-[16ch] flex-1 text-h2 leading-[1.12] font-bold tracking-[-0.02em] text-ink",
        flip && "text-right",
      )}
    >
      {h}
    </h2>
  );
  const body = (
    <p className="max-w-[52ch] flex-1 pt-1 text-body leading-[1.62] text-ink-muted">
      {sub}
    </p>
  );
  return (
    <div className="flex items-start gap-16">
      {flip ? body : title}
      {flip ? title : body}
    </div>
  );
}

/* ----------------------------------------------------------------- section */

export function TrackerAndActions() {
  return (
    <section className="field-settle pt-24 pb-28">
      <PageBox>
        {/* Beat 1 — preservation. No eyebrow, per `05-SECTION-5` §3. */}
        <Head h={KEEP_H} sub={KEEP_SUB} />
        <div className="mt-7">
          <Reassurance />
        </div>
        <div className="mt-10">
          <BlotterTab />
        </div>

        {/* Beat 2 — the action view. No eyebrow, per `04-SECTION-4` §4. */}
        <div className="mt-24">
          <Head h={ACT_H} sub={ACT_SUB} flip />
        </div>
        <div className="mt-10">
          <OutstandingTab />
        </div>

        {/*
          The page's second primary CTA. Right-aligned to sit under beat 2's
          flipped headline rather than restarting the section's left axis.
        */}
        <div className="mt-14 flex flex-col items-end gap-4">
          <p className="font-display text-[1.375rem] leading-[1.35] font-semibold tracking-[-0.015em] text-navy-900">
            {CTA_LINE}
          </p>
          <CtaButton location="actions" size="large" />
        </div>
      </PageBox>
    </section>
  );
}
