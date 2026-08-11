/**
 * Section 6: How Blotter uses your data.
 *
 * Authority: `06-SECTION-6-DATA-AND-PRIVACY.md`, substantially amended by Jon
 * across August 6, 2026. The amendment table at the top of the build spec
 * carries the record; `04-decision-log.md` carries the reasoning.
 *
 * Third build. The first was rejected as an unreadable blob, the second as a
 * chaotic one. Both failed the same way: the specification asks for four passes
 * over the same facts, and arranging those passes is not the same as designing
 * a section.
 *
 * This one has three parts and one job each:
 *
 *   the claim   the promise, and the only sentence set above reading size
 *   the flow    why the promise is credible, drawn rather than described
 *   the columns what each connection can and cannot do
 *
 * Then a footnote and a link. Everything else lives on `/privacy`: the four
 * steps in prose, the full permissions matrix, the broad-permission
 * explanation, retention, deletion, all nine commitments, the provider detail
 * and the seven privacy questions. That page is the section's real body. This
 * is its front door.
 *
 * §17 still governs and is the last thing to remember. The presentation is
 * settled; the claims are true of no implementation, because there is no
 * implementation. Unmatched-message routing, body non-retention, revocation,
 * deletion, the Google scopes and the provider's CASA status are all open gates
 * in `06-assumptions-and-open-questions.md`. The private preview may show this
 * copy. Public traffic may not, until each gate closes.
 */

import Link from "next/link";

import { PageBox } from "@/components/layout/page-box";
import {
  BroadPermissionDisclosure,
  ProcessingFlow,
  ServicePermissions,
} from "@/components/section-6/parts";
import {
  BROAD_BODY,
  BROAD_HEADING,
  CANDID_CLAIM,
  POLICY_HREF,
  POLICY_LINK_LABEL,
  PRIVACY_OPENING,
  PRIVACY_TITLE,
  PROVIDER_BODY,
} from "@/lib/privacy-copy";

/** The provider's first sentence stays on the page; the rest is on `/privacy`. */
const PROVIDER_LEAD = PROVIDER_BODY[0];

export function DataAndPrivacy() {
  return (
    <section id="privacy" className="field-document pt-24 pb-28">
      <PageBox>
        {/*
          Head. The page's established two-column opening — headline left,
          supporting copy right — which Sections 3, 4 and 5 all use. Section 6
          had been the only one stacking them, which is part of why it never
          looked like it belonged to this page. No eyebrow: §5 removes it.
        */}
        {/* Stacked on a phone, the ratified side-by-side from `desk`. See the
            note on the same row in `how-blotter-works.tsx` for why `min-w-0`
            is here. `06-SECTION-6` §16 requires one column on mobile, so this
            row is the first of that section's clauses to be discharged. */}
        <div className="flex flex-col gap-4 desk:flex-row desk:items-start desk:gap-16">
          <h2 className="font-display max-w-[15ch] min-w-0 flex-1 text-h2 leading-[1.12] font-bold tracking-[-0.02em] text-ink">
            {PRIVACY_TITLE}
          </h2>
          {/*
            Desktop only, on Jon's call of August 10, 2026.

            It is a throat-clear: "Here is exactly what Blotter checks, what it
            reads, what it keeps, and what it never does" announces what is
            coming rather than saying it. On a desktop it earns its place by
            filling the right-hand column of the established two-column head. On
            a phone it is 180px of prose standing between the reader and the
            claim that actually answers them, in a section already carrying more
            text than any other.

            Ratified copy, so this is an override rather than an edit: the
            string is untouched and still renders above `desk`.
          */}
          <p className="hidden max-w-[52ch] min-w-0 flex-1 text-body leading-[1.62] text-ink-muted desk:block desk:pt-1">
            {PRIVACY_OPENING}
          </p>
        </div>

        {/*
          The claim.

          Two builds put this in a tinted block behind a rule, and Jon's note on
          the second was exact: it read as a subheader to the section, because
          that is what a large bold line under a section head is. The block, the
          rule and the display weight are all gone. It is one paragraph, set a
          step above reading size in full ink, sitting on the page — the only
          thing between the head and the flow, which is the emphasis.
        */}
        <p className="mt-14 max-w-[78ch] text-[1.1875rem] leading-[1.6] text-ink">
          {CANDID_CLAIM}
        </p>

        {/* The flow. No panel: it sits on the section ground. */}
        <div className="mt-14">
          <ProcessingFlow />
        </div>

        {/* What each connection can and cannot do. */}
        <div className="mt-20">
          <ServicePermissions />
        </div>

        {/*
          The two notes that have to stay on the page.

          The broad-permission disclosure, because §9 fixes it below the
          permissions material, §16 forbids weakening it and §18 bans hiding it —
          it is the only place the page reconciles Google's broad consent screen
          with the narrower processing claim. And the provider's first sentence,
          which is the section's one claim about a third party. Both are set as
          footnotes because that is their weight, not because they are fine print.
        */}
        {/* Desktop: both footnotes side by side, exactly as ratified. */}
        <div className="mt-14 hidden border-t border-rule pt-7 desk:grid desk:grid-cols-2 desk:gap-x-16">
          <p className="text-small leading-[1.6] text-ink-read">
            <span className="font-semibold text-ink">{BROAD_HEADING}.</span> {BROAD_BODY}
          </p>
          <p className="text-small leading-[1.6] text-ink-read">{PROVIDER_LEAD}</p>
        </div>

        {/*
          Mobile: the broad-permission note folds and takes the Drive note in
          with it, because they are the same argument. The provider sentence
          does not fold — it is the page's one claim about a third party and the
          only unverified thing on it, so it stays in plain sight.
        */}
        <div className="mt-12 desk:hidden">
          <BroadPermissionDisclosure />
          <p className="mt-6 text-small leading-[1.6] text-ink-read">{PROVIDER_LEAD}</p>
        </div>

        {/*
          The link, and it is now load-bearing rather than courtesy: the page
          behind it carries most of what this section used to say.
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
