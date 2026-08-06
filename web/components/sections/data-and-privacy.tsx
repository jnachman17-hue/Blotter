/**
 * Section 6: How Blotter uses your data.
 *
 * Authority: `06-SECTION-6-DATA-AND-PRIVACY.md`, substantially amended by Jon
 * on August 6, 2026 after he rejected the first build as an unreadable blob.
 * The amendment table at the top of the build spec carries the full record; the
 * reasoning for each change sits with the part it changed, in
 * `components/section-6/parts.tsx` and `lib/privacy-copy.ts`.
 *
 * The section now says each thing once:
 *
 *   1  title and opening statement, amended to name Sheets
 *   2  the candid claim, as the anchor
 *   3  the mechanism, formerly four rows of prose
 *   4  the permissions table, carrying the service marks
 *   5  the broad-permission disclosure and the two uncovered commitments,
 *      as notes belonging to the table
 *   6  what Blotter keeps, and what happens when you leave
 *   7  the connection provider
 *   8  the privacy-policy link
 *
 * Off the page and onto the policy page, by his ruling: the nine-item
 * commitments block and the seven-question privacy FAQ. Both restated what the
 * reader had already been given. Neither is withdrawn — `app/privacy/page.tsx`
 * renders both in full.
 *
 * Unchanged: no eyebrow, no CTA, no cards, no seals, no simulated OAuth, no
 * centred sales copy, and every string verbatim.
 *
 * §17 still governs. The presentation is settled; the claims are not true of any
 * implementation, because there is no implementation. Unmatched-message routing,
 * body non-retention, revocation, deletion, the Google scopes and the provider's
 * CASA status are all open gates in `06-assumptions-and-open-questions.md`. The
 * private preview may show this copy. Public traffic may not, until each gate
 * closes.
 */

import Link from "next/link";

import { PageBox } from "@/components/layout/page-box";
import {
  Mechanism,
  PermissionsTable,
  Subhead,
  TableNotes,
} from "@/components/section-6/parts";
import {
  CANDID_CLAIM,
  DELETION_STATEMENT,
  KEEPS_BODY,
  KEEPS_CALENDAR,
  KEEPS_HEADING,
  POLICY_HREF,
  POLICY_LINK_LABEL,
  PRIVACY_OPENING,
  PRIVACY_TITLE,
  PROVIDER_BODY,
  PROVIDER_HEADING,
} from "@/lib/privacy-copy";

/*
 * The claim, split for setting only.
 *
 * Its first sentence carries the section and the two that follow qualify it, so
 * they are set at different sizes. The string is not edited: these two joined by
 * a single space are `CANDID_CLAIM` character for character, which the copy
 * verification checks against the spec. Built here rather than inline so each
 * paragraph renders as one text node — adjacent JSX children would put React's
 * separator comment inside the sentence and break that check.
 */
const [CLAIM_HEAD, ...CLAIM_TAIL] = CANDID_CLAIM.split(". ");
const CLAIM_LEAD = `${CLAIM_HEAD}.`;
const CLAIM_REST = CLAIM_TAIL.join(". ");

export function DataAndPrivacy() {
  return (
    <section id="privacy" className="field-document pt-24 pb-28">
      <PageBox>
        {/*
          1. Title and opening statement. No eyebrow — §5 removes it, and its
          absence is the first signal that this section is not selling.
        */}
        <h2 className="font-display max-w-[22ch] text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
          {PRIVACY_TITLE}
        </h2>
        <p className="mt-5 max-w-[76ch] text-lede leading-[1.6] text-ink-muted">
          {PRIVACY_OPENING}
        </p>

        {/*
          2. The candid claim.

          The white slab it sat in is gone; Jon called it ugly and it was. The
          claim now carries itself typographically: its first sentence is the
          largest type in the section after the title, and the two that qualify
          it follow at reading size. One string, unbroken and verbatim — the
          split is a line break in the render, not an edit to the copy.

          §6 offered a faint Blotter-yellow ground and this still declines it.
          Yellow means "Blotter maintains this" everywhere else on the page, and
          the sentence about what Blotter does not touch is the wrong place for
          it. The navy rule is §6's thin left rule, kept.
        */}
        <blockquote className="mt-14 border-l-2 border-navy-900 pl-8">
          <p className="font-display max-w-[30ch] text-[1.75rem] leading-[1.28] font-bold tracking-[-0.022em] text-ink">
            {CLAIM_LEAD}
          </p>
          <p className="mt-3 max-w-[74ch] text-lede leading-[1.58] text-ink-muted">
            {CLAIM_REST}
          </p>
        </blockquote>

        {/* 3. The mechanism. */}
        <div className="mt-14">
          <Mechanism />
        </div>

        {/* 4 and 5. The permissions table and the notes that belong to it. */}
        <div className="mt-16">
          <PermissionsTable />
          <TableNotes />
        </div>

        {/*
          6. What Blotter keeps, and what happens when you leave.

          One block, two halves, split by a rule. §12 requires the deletion
          statement sit beneath a thin top divider and forbids conflating it
          with subscription cancellation; both hold. Setting the two side by
          side is the consolidation: retention and deletion are the same
          question asked from opposite ends.
        */}
        <div className="mt-16 grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] gap-x-14">
          <div>
            <Subhead>{KEEPS_HEADING}</Subhead>
            <div className="mt-3 space-y-3">
              {KEEPS_BODY.map((line) => (
                <p key={line} className="text-body leading-[1.62] text-ink-muted">
                  {line}
                </p>
              ))}
              <p className="text-body leading-[1.62] text-ink-muted">{KEEPS_CALENDAR}</p>
            </div>
          </div>
          {/*
            The deletion statement carries no heading, because the spec gives it
            none and this section is not the place to invent copy. It is set a
            step larger than body instead, so it reads as the statement it is
            rather than as an orphaned paragraph.
          */}
          <div>
            <p className="text-lede leading-[1.58] text-ink">{DELETION_STATEMENT}</p>
          </div>
        </div>

        {/*
          7. The connection provider.

          Amended August 6, 2026 and load-bearing: this is the section's one
          unverified claim. See `lib/privacy-copy.ts` for the two research
          findings the final wording has to survive, and treat the sentence as
          provisional until a provider is signed.
        */}
        <div className="mt-14 border-t border-rule pt-7">
          <Subhead>{PROVIDER_HEADING}</Subhead>
          <div className="mt-3 max-w-[92ch] space-y-3">
            {PROVIDER_BODY.map((line) => (
              <p key={line} className="text-body leading-[1.62] text-ink-muted">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/*
          8. The privacy-policy link. §15 allows it to be inactive in the
          private preview but requires a real destination before public traffic,
          and it now carries the material this section shed, so it is load
          bearing rather than decorative.
        */}
        <p className="mt-8">
          <Link
            href={POLICY_HREF}
            className="text-small font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900"
          >
            {POLICY_LINK_LABEL}
          </Link>
        </p>

        {/* No CTA. §3, §18 and §20 all forbid one here. */}
      </PageBox>
    </section>
  );
}
