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
 * steps in prose, the full permissions matrix, the five real Google scopes,
 * retention, deletion, all nine commitments and the seven privacy questions.
 * That page is the section's real body. This is its front door.
 *
 * ## The claim gates are closed, and the reason matters
 *
 * §17 used to govern here, and it said the presentation was settled but the
 * claims were true of no implementation, because there was no implementation.
 * Unmatched-message routing, body non-retention, revocation, deletion, the
 * Google scopes and the provider's CASA status were all open gates that public
 * traffic was not supposed to see.
 *
 * **Public traffic saw them anyway, for a month, and one of them was false.**
 * `28-WEBSITE-AUDIT.md` is the account. The provider gate never closed because
 * no provider was ever selected, and the sentence shipped regardless.
 *
 * So the gates are gone, replaced by something stronger: **every claim this
 * section makes is now true of something built, and names where it can be
 * checked.** `lib/privacy-copy.ts` carries the four files that hold the
 * answers. Verify against those before changing a word here.
 */

import Link from "next/link";

import { PageBox } from "@/components/layout/page-box";
import { SectionNumber } from "@/components/layout/section-number";
import { SectionEyebrow, TRIAL_EYEBROWS } from "@/components/layout/section-eyebrow";
import {
  ServicePermissions,
} from "@/components/section-6/parts";
import {
  CANDID_CLAIM_SHORT,
  POLICY_HREF,
  POLICY_LINK_LABEL,
  PRIVACY_OPENING,
  PRIVACY_TITLE,
} from "@/lib/privacy-copy";

/**
 * The first sentence about where Blotter runs stays on the page; the rest is on
 * `/privacy`.
 *
 * **This slot used to hold the connection-provider claim**, which said Blotter
 * reached Google through a third party whose application had passed CASA. There
 * is no third party, and `28-WEBSITE-AUDIT.md` §0 found that the sentence was
 * contradicted by Google's own consent screen. Deleted on Jon's ruling,
 * September 3, 2026.
 *
 * **The slot is kept rather than removed**, and that is deliberate: the desktop
 * footnote row below is a two-column grid, and the honest answer to *who else is
 * in this* is a claim worth making rather than a gap worth leaving.
 */

export function DataAndPrivacy() {
  return (
    <section id="privacy" className="field-document pt-14 pb-16 desk:pt-24 desk:pb-28">
      <PageBox>
        <SectionNumber n={2} />
        <SectionEyebrow>{TRIAL_EYEBROWS.privacy}</SectionEyebrow>
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
          {CANDID_CLAIM_SHORT}
        </p>

        {/* The flow. No panel: it sits on the section ground. */}
        {/* The four-step flow and the two footnotes left this section on
            5 September 2026: they repeat /privacy, and the landing page now
            says the claim, shows what each connection can and cannot do, and
            links to the policy for the rest. */}

        {/* What each connection can and cannot do. */}
        <div className="mt-20">
          <ServicePermissions />
        </div>

        {/*
          The two notes that have to stay on the page.

          The broad-permission disclosure, because §9 fixes it below the
          permissions material, §16 forbids weakening it and §18 bans hiding it —
          it is the only place the page reconciles Google's consent screen with
          what Blotter actually does, and since September 3, 2026 it is also the
          only place the page names the two permissions the table above has no
          row for.

          Beside it, where Blotter runs. **That slot used to carry the
          connection-provider claim.** The answer to "who else is in this" is
          worth a footnote whether or not there is anybody, and there is not.

          Both are set as footnotes because that is their weight, not because
          they are fine print.
        */}

        {/*
          The link, and it is now load-bearing rather than courtesy: the page
          behind it carries most of what this section used to say.
        */}
        <p className="mt-8">
          {/*
            44px on a phone. It measured 170x18, the smallest remaining target
            on the page after the footer rebuild, and it is the one link in the
            section that a reader is most likely to actually want. The rule
            stays exactly where it was — the box grows around the text rather
            than the text growing — so nothing about the section's look changes
            on either surface. Phase 6 sweep, August 11, 2026.
          */}
          <Link
            href={POLICY_HREF}
            className="inline-flex min-h-11 items-center text-small font-medium text-navy-500 underline underline-offset-4 transition-colors duration-150 ease-out hover:text-navy-900 desk:min-h-0"
          >
            {POLICY_LINK_LABEL}
          </Link>
        </p>

        {/* No CTA. §3, §18 and §20 all forbid one here. */}
      </PageBox>
    </section>
  );
}
