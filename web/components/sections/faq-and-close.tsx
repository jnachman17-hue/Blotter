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
import { POLICY_HREF } from "@/lib/privacy-copy";
import { CLOSING_HEADLINE, FAQ_TITLE, PRODUCT_FAQ } from "@/lib/closing-copy";

/** §6's reading measure, centred inside the page box. */
const FAQ_W = 960;

/** Jon's, August 6, 2026. The X account does not exist yet. */
const LINKEDIN_URL = "https://www.linkedin.com/company/blotter";
const X_URL: string | null = null;

function XMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.22-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.11l11.97 15.64Z" />
    </svg>
  );
}

function SocialLinks() {
  return (
    <ul className="flex items-center gap-4">
      <li>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex text-white/55 transition-colors duration-150 ease-out hover:text-white"
        >
          <span className="sr-only">Blotter on LinkedIn</span>
          <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.16V9.75H2.4V21.5Zm7.4-11.75h4.95v1.6h.07c.69-1.24 2.37-2.05 4.06-2.05 4.34 0 5.14 2.68 5.14 6.17v6.03h-5.15v-5.34c0-1.28-.03-2.92-1.9-2.92-1.9 0-2.19 1.39-2.19 2.83v5.43H9.8V9.75Z" />
          </svg>
        </a>
      </li>
      <li>
        {/*
          Placeholder until the account exists. Jon will supply the URL; set
          `X_URL` and this becomes a link. It is deliberately not a dead `href`.
        */}
        {X_URL ? (
          <a
            href={X_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex text-white/55 transition-colors duration-150 ease-out hover:text-white"
          >
            <span className="sr-only">Blotter on X</span>
            <XMark />
          </a>
        ) : (
          <span className="inline-flex text-white/25">
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
      <section id="faq" className="field-close pt-24 pb-24">
        <PageBox>
          {/*
            §4 allows the title and nothing else above the rows: no eyebrow, no
            supporting paragraph, no introductory copy.
          */}
          <div className="mx-auto" style={{ maxWidth: FAQ_W }}>
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
        </PageBox>
      </section>

      {/*
        The footer, and the end of the page.

        One line, one action, one row of links. The statement and the CTA share
        a baseline rather than stacking into a panel, which is what keeps this a
        footer instead of the marketing block Jon cut.
      */}
      <footer className="bg-closing pt-14 pb-12">
        <PageBox>
          <div className="flex items-end justify-between gap-12">
            <p className="font-display max-w-[18ch] text-[1.625rem] leading-[1.22] font-bold tracking-[-0.02em] text-white">
              {CLOSING_HEADLINE}
            </p>
            <CtaButton location="final" tone="onDark" size="large" />
          </div>

          <div className="mt-12 flex items-center justify-between gap-8 border-t border-white/12 pt-7">
            <a href="#top" aria-label="Blotter, back to top" className="text-white">
              <BlotterLockup size={20} />
            </a>
            <div className="flex items-center gap-8">
              <a
                href={POLICY_HREF}
                className="text-small text-white/55 transition-colors duration-150 ease-out hover:text-white"
              >
                Privacy policy
              </a>
              <SocialLinks />
            </div>
          </div>
        </PageBox>
      </footer>
    </>
  );
}
