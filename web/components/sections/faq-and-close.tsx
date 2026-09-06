/**
 * Section 7: the product FAQ, and the end of the page.
 *
 * Authority: `07-SECTION-7-FAQ-AND-FINAL-CTA.md`, with the CTA contract from
 * `WS3-SPEC.md` and `WS5-SPEC.md` Phase 5.
 *
 * The FAQ is untouched and ratified: five exact questions, one open at a time,
 * a 900-to-1000px measure centred inside the page box. Jon reviewed it on
 * August 6, 2026 and had no changes.
 *
 * The ending was rebuilt on his ruling the same day. §9 and §10 specify a
 * large centred closing panel on a deep navy ground carrying a headline, a
 * supporting line, the CTA and a reassurance line. He cut it: "we don't need
 * this super bold massive deep blue box", and asked for a small banner plus a
 * conventional site footer with the privacy policy and social links.
 *
 * What that changes, and what it does not:
 *
 *   §9  the supporting line and the reassurance line are dropped. The exact
 *       headline survives as the footer's one statement — the page should still
 *       end on a sentence rather than on a row of links.
 *   §10 the centred marketing panel is gone. The dark ground is not: a compact
 *       dark footer is what `--color-closing` was reserved for, and §1 still
 *       requires the page not end on an accordion.
 *   §11 unchanged and non-negotiable. The CTA is the same label entering the
 *       same canonical funnel, and it still carries `cta_location = final`.
 *   §13 unchanged. No price, no availability, no beta, no Fall 2026, no cohort
 *       size, no second CTA, no illustration, no trust badges.
 *
 * There is no footer anywhere in WS3, WS4 or WS5 — this is the page's first,
 * built to his instruction.
 */

import { BlotterLockup } from "@/components/brand/blotter-mark";
import { CtaButton } from "@/components/cta-button";
import { DisclosureList } from "@/components/disclosure";
import { PageBox } from "@/components/layout/page-box";
import { SectionNumber } from "@/components/layout/section-number";
import { SectionEyebrow, TRIAL_EYEBROWS } from "@/components/layout/section-eyebrow";
import { cn } from "@/lib/cn";
import { CONTACT_EMAIL } from "@/lib/contact";
import { POLICY_HREF } from "@/lib/privacy-copy";
import { CLOSING_HEADLINE, FAQ_TITLE, PRODUCT_FAQ } from "@/lib/closing-copy";

/** §6's reading measure, centred inside the page box. */
const FAQ_W = 960;

/**
 * The footer's link treatment, shared so the three read as one row.
 *
 * 44px target on a phone without a box around it: the padding is
 * negative-margined back out so the row still sits on the baseline it did
 * before the Phase 6 tap-target sweep.
 */
const FOOTER_LINK =
  "-my-3 py-3 text-small text-white/55 transition-colors duration-150 ease-out hover:text-white desk:my-0 desk:py-0";

/**
 * Both accounts, supplied by Jon on August 11, 2026 for **both surfaces**.
 *
 * LinkedIn was already this exact URL and is unchanged. `X_URL` was `null`
 * since August 6, when the account did not exist; setting it turns the
 * placeholder below into a real link, which is a **desktop change** and the one
 * deliberate exception to stage 10 leaving `blotterib.com` alone. Jon asked for
 * it on both.
 *
 * He wrote the LinkedIn address with a trailing full stop. That is sentence
 * punctuation rather than part of the slug — a company URL ending in `.` 404s —
 * so it is dropped here.
 */
const LINKEDIN_URL = "https://www.linkedin.com/company/blotter";
const X_URL: string | null = "https://x.com/blotterib";

function XMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" />
    </svg>
  );
}

/**
 * The marks are 15px glyphs. On a phone that is a 15px touch target, which is a
 * third of the WS5 Phase 6 minimum and was the smallest interactive thing on
 * the page — so each one gets a 44px box below the breakpoint while the glyph
 * inside it stays exactly the size it was. Desktop keeps its tighter row: a
 * pointer does not need 44px and the ratified footer spacing depends on it.
 *
 * The X placeholder takes the same box even though it is not interactive, so
 * the two marks stay on one baseline.
 */
const SOCIAL_BOX =
  "grid size-11 place-items-center desk:inline-flex desk:size-auto";

function SocialLinks() {
  return (
    <ul className="flex items-center gap-1 desk:gap-4">
      <li>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className={cn(SOCIAL_BOX, "text-white/55 transition-colors duration-150 ease-out hover:text-white")}
        >
          <span className="sr-only">Blotter on LinkedIn</span>
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5Zm7.4-11.75h4.95v1.6h.07c.69-1.24 2.37-2.05 4.06-2.05 4.34 0 5.14 2.68 5.14 6.17v6.03h-5.15v-5.34c0-1.28-.03-2.92-1.9-2.92-1.9 0-2.19 1.39-2.19 2.83v5.43H9.8V9.75Z" />
          </svg>
        </a>
      </li>
      <li>
        {/*
          Live since August 11, 2026. The `null` branch is kept rather than
          deleted: it is the only thing standing between a missing account and a
          dead `href`, and it costs nothing to leave in place.
        */}
        {X_URL ? (
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(SOCIAL_BOX, "text-white/55 transition-colors duration-150 ease-out hover:text-white")}
          >
            <span className="sr-only">Blotter on X</span>
            <XMark />
          </a>
        ) : (
          <span className={cn(SOCIAL_BOX, "text-white/25")}>
            <span className="sr-only">Blotter on X, not yet available</span>
            <XMark />
          </span>
        )}
      </li>
    </ul>
  );
}

export function FaqAndClose() {
  return (
    <>
      <section id="faq" className="field-close pt-14 pb-16 desk:pt-24 desk:pb-24">
        <PageBox>
        <SectionNumber n={3} />
          {/*
            §4 allows the title and nothing else above the rows: no eyebrow, no
            supporting paragraph, no introductory copy.
          */}
          {/*
            **On the page axis from August 11, 2026.** This was `mx-auto`,
            which centred the 960px measure inside the 1124px box and started
            its headline at 240 while every other section on the page starts at
            158. Invisible while the hero was doing its own thing; once Jon
            chose a left-aligned hero it was the only centred block left.

            The 960px reading measure is kept — that is a legibility decision
            and a good one. Only the centring goes.
          */}
          <SectionEyebrow>{TRIAL_EYEBROWS.faq}</SectionEyebrow>
          <div style={{ maxWidth: FAQ_W }}>
            <h2 className="font-display text-h2 leading-[1.14] font-bold tracking-[-0.02em] text-ink">
              {FAQ_TITLE}
            </h2>
            <DisclosureList
              items={PRODUCT_FAQ}
              idPrefix="product"
              size="large"
              className="mt-8"
            />
          </div>

          {/*
            The three refusals, and this is their third address in one day.

            `03-SECTION-3` had them inside the boundary block. `09` §8 row 3
            moved them to the ownership section, on the reasoning that they are
            the ownership claim stated negatively — *"you write the messages"*
            and *"no generic mass AI outreach"* are one sentence facing two
            directions.

            **Jon moved them again on sight**, August 11, 2026: *"this is kind
            of like a platform whole thing of what we don't [do]. So it doesn't
            necessarily need to be in this section. Maybe put it somewhere near
            the top or the bottom."*

            He is describing a different claim than `09` was. `09` reads them as
            *this section's* ownership claim inverted; he reads them as a
            statement about **what the product is not**, which is page-level and
            belongs nowhere in particular — which is exactly why they kept
            looking wrong wherever they were put.

            **Why here rather than Section 04, which is the obvious "bottom".**
            `09` §4 is explicit that *"Section 04 stays about data"*: privacy is
            what Blotter **reads**, and these are what it refuses to **write**.
            That distinction survives Jon's reframing, so the refusals land
            after the questions and before the closing CTA instead — the last
            thing a reader meets before being asked to act, and outside any
            section's own argument.

            **This is an override of `09` §8 row 3 and it is recorded as one.**
            The row is not wrong about what the refusals mean; it is wrong that
            meaning that dictates placement.

            No numeral and no hairline. It is not a sixth section — it is a
            closing note inside `05`, and giving it a numeral would make the two
            surfaces disagree about how many sections this page has.
          */}
          <div className="mt-14 desk:mt-20">
            {/* The three "No ..." badges left the page on 5 September 2026.
                Jon's brief: less marketing, fewer callouts. */}
          </div>
        </PageBox>
      </section>

      {/*
        The footer, and the end of the page.

        One line, one action, one row of links. The statement and the CTA share
        a baseline rather than stacking into a panel, which is what keeps this a
        footer instead of the marketing block Jon cut.
      */}
      <footer className="bg-closing pt-12 pb-10 desk:pt-14 desk:pb-12">
        <PageBox>
          {/*
            Stacked on a phone, on the ratified baseline from `desk`.

            Measured at 390 before this change and it was the worst thing on the
            mobile page: the statement was 26px type wrapping inside a 187px
            column, and `Try Blotter Now` was squeezed to 115px wide by 72px
            tall — the label wrapping *inside its own pill*. Both are what a
            two-column row does when it is given a phone and never told to stop
            being a row.

            `max-w-[18ch]` goes with it below the breakpoint. It exists to hold
            the statement to two lines beside the button; with nothing beside it
            the same rule just makes a narrow column in the middle of a wide
            screen.
          */}
          <div className="flex flex-col items-start gap-7 desk:flex-row desk:items-end desk:justify-between desk:gap-12">
            <p className="font-display text-[1.625rem] leading-[1.22] font-bold tracking-[-0.02em] text-white desk:max-w-[18ch]">
              {CLOSING_HEADLINE}
            </p>
            {/*
              Full width on a phone. This is the page's last CTA and there is
              nothing under it, so a pill sized to its label reads as an
              afterthought at the exact moment the reader has finished the
              argument.
            */}
            <CtaButton
              location="final"
              tone="onDark"
              size="large"
              full
              className="min-h-[52px] desk:w-auto desk:min-h-11"
            />
          </div>

          {/*
            The link row wraps rather than compressing. At 390 the brand, the
            policy link and two social marks on one line left each of them
            fighting for about 90px; on two lines each has the width it needs
            and the row still reads as one footer.
          */}
          <div className="mt-10 flex flex-col gap-5 border-t border-white/12 pt-7 desk:mt-12 desk:flex-row desk:items-center desk:justify-between desk:gap-8">
            {/*
              44px on a phone, and `w-fit` so the target is the lockup rather
              than the full row — a full-width invisible back-to-top sitting
              directly above the privacy link is an accidental-tap waiting to
              happen. The negative margin puts the row back on the baseline the
              padding just moved it off.
            */}
            <a
              href="#top"
              aria-label="Blotter, back to top"
              /* `desk:inline` restores the bare inline anchor this was before the
                 mobile target box: `inline-flex` changes baseline alignment and
                 took 3px off the desktop footer. */
              className="-my-2 inline-flex min-h-11 w-fit items-center text-white desk:my-0 desk:inline desk:min-h-0"
            >
              <BlotterLockup size={20} />
            </a>
            {/*
              `Contact` and the address itself, added August 11, 2026 on Jon's
              instruction: *"let's also add our broader email somewhere on the
              page at near the bottom."*

              Both, not one. The link is for a reader who wants to write
              something and does not want to leave the page to find out how; the
              bare address is for anyone who would rather use their own mail
              client, and for the case where the form is broken and the page
              cannot know it. A form is the better instrument and a printed
              address is the one that never fails.

              The address is a `mailto` rather than plain text so a phone opens
              its mail app on a tap instead of asking the reader to select and
              copy 19 characters at 13.5px.
            */}
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 desk:justify-start">
              <a
                href="/contact"
                /* 44px target on a phone without a box around it: the padding
                   is negative-margined back out so the row still sits on the
                   baseline it did before. */
                className={FOOTER_LINK}
              >
                Contact
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK}>
                {CONTACT_EMAIL}
              </a>
              {/*
                Added September 6, 2026, on Jon's ruling. `/update` was
                reachable only from the notice inside a student's own sheet, so
                anybody who lost that link had no way back to it. `/audit` was
                worse: the trust page the whole site rests on was not linked
                from the landing page at all.
              */}
              <a href="/audit" className={FOOTER_LINK}>
                Your data
              </a>
              <a href="/update" className={FOOTER_LINK}>
                Update
              </a>
              <a href={POLICY_HREF} className={FOOTER_LINK}>
                Privacy
              </a>
              {/*
                Added September 3, 2026. Terms did not exist until then —
                `28-WEBSITE-AUDIT.md` §5.3 — and a footer that links a privacy
                policy and no terms reads as an oversight rather than a choice.

                `Privacy policy` shortens to `Privacy` so the two sit as a pair
                and the row still fits on two lines at 390px, which is what the
                wrap note above is protecting.
              */}
              <a href="/terms" className={FOOTER_LINK}>
                Terms
              </a>
              <SocialLinks />
            </div>
          </div>
        </PageBox>
      </footer>
    </>
  );
}
