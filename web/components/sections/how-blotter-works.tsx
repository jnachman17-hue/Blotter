/**
 * Section 3: How Blotter works.
 *
 * Authority: `03-SECTION-3-HOW-BLOTTER-WORKS.md`, as overruled in part by Jon
 * on August 5, 2026. He rejected the formal-exact mechanism asset and
 * instructed the visual be rebuilt; that override is scoped to §2's asset
 * status, §7, §16's composition preservation, and the matching acceptance and
 * ratification lines. It is reasoned in `04-decision-log.md` and stamped at the
 * top of the build spec.
 *
 * Everything else in the spec is untouched and observed here:
 *
 *   §4  exact order — eyebrow, headline, supporting copy, stage labels,
 *       mechanism visual, boundary line, badges, closing line, no CTA
 *   §5  exact copy, reproduced verbatim below and not rewritten, shortened,
 *       combined or added to
 *   §9  boundary line on the section's reading axis, more prominent than
 *       supporting text, less than the headline, no card, icon or quote marks
 *   §10 no `YOU CONTROL` or `BLOTTER MAINTAINS` lists
 *   §11 all three badges together in one compact row, no icons, no cards, no
 *       oversized emphasis on `No AI slop`
 *   §12 closing line after the badges, separated enough that the two
 *       statements do not read as duplicated consecutive copy
 *   §15 the whole argument survives a static screenshot
 *   §17 no CTA, no price, no beta language, no OAuth or permissions content,
 *       no technical architecture
 *
 * The stage labels live inside `DayTimeline` because §8 requires they align
 * with the stages they name, which only the visual knows the geometry of.
 */

import { PageBox } from "@/components/layout/page-box";
import { BoundaryBlock } from "@/components/section-3/boundary-block";
import { DayTimeline } from "@/components/section-3/day-timeline";

/* --------------------------------------------------- exact copy, §5 verbatim */

const EYEBROW = "How Blotter works";

const HEADLINE = "You manage the relationships. Blotter maintains the moving parts.";

const SUPPORTING =
  "Add the contacts you are networking with and keep the context that matters to you. Blotter uses relevant activity from Gmail and Calendar to keep each relationship’s status, last contact, scheduled calls, and next move current inside your Google Sheet.";

/* ------------------------------------------------------------------ section */

export function HowBlotterWorks() {
  return (
    <section className="field-rise pt-24 pb-28">
      <PageBox>
        {/* 1. Eyebrow */}
        <p className="flex items-start gap-3 text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase">
          <span
            aria-hidden="true"
            className="mt-[0.35em] h-[0.9em] w-[2px] shrink-0 bg-navy-500"
          />
          {EYEBROW}
        </p>

        {/*
          2 and 3. Headline and supporting copy.

          Side by side rather than stacked, so the copy block spans the same
          bounding box as the visual below it. The page theme fixes that nothing
          is centred, and the hero established the same two-column reading.
        */}
        <div className="mt-6 flex items-start gap-16">
          <h2 className="font-display max-w-[15ch] flex-1 text-h2 leading-[1.12] font-bold tracking-[-0.02em] text-ink">
            {HEADLINE}
          </h2>
          <p className="max-w-[52ch] flex-1 pt-1 text-body leading-[1.62] text-ink-muted">
            {SUPPORTING}
          </p>
        </div>

        {/* 4 and 5. Stage labels and the mechanism visual. */}
        <div className="mt-16">
          <DayTimeline />
        </div>

        {/*
          6, 7 and 8. Boundary line, product-boundary badges and closing line,
          composed as one resolved block rather than three stacked beats. Jon
          overrode §11's horizontal pill row and §12's separate closing line on
          August 5, 2026; the exact copy and the §11 bans on icons, per-badge
          cards and emphasising `No AI slop` are all still observed. See
          `boundary-block.tsx` for the full record.
        */}
        <div className="mt-16">
          <BoundaryBlock />
        </div>

        {/* 9. No CTA. §5, §13 and §17 all forbid one here. */}
      </PageBox>
    </section>
  );
}
