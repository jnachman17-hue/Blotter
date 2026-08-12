/**
 * Funnel copy, verbatim.
 *
 * Authority: `WS4-SPEC.md` "Confirmed canonical funnel presentation" for every
 * visible string, `WS3-SPEC.md` for the sequence, the option lists and the
 * price rules.
 *
 * The rules that govern what is absent here are as load-bearing as the strings:
 *
 *   - **No price before email capture.** WS3 fixes the order and it is not a
 *     presentation preference.
 *   - **Nothing before the terminal screen may reveal that the product is
 *     unavailable.** No `beta`, no `Fall 2026`, no `demand test`, no `you will
 *     not be charged`, no `early access`, no `at launch`. The checkout screen
 *     in particular must read as a real purchase.
 *   - **No card fields and no money.** Either payment button advances straight
 *     to the terminal state.
 *   - The email step may not request a password, imitate Google
 *     authentication, or imply that inbox access has already been granted.
 */

import type { RecruitingTrack, RecruitingWindow } from "./analytics";

/* ------------------------------------------------------------ the questions */

export const Q1_TITLE = "What are you recruiting for?";

/** WS3 order, unchanged. */
export const TRACKS: RecruitingTrack[] = [
  "Investment Banking",
  "Management Consulting",
  "Private Equity / Growth Equity",
  "Sales & Trading",
  "Asset Management / Equity Research",
  "Venture Capital",
  "Other",
];

export const Q2_TITLE = "Which recruiting window best fits you?";

export const WINDOWS: RecruitingWindow[] = ["Summer 2028", "Full-time", "Other"];

export const CONTINUE = "Continue";

/* ---------------------------------------------------------- the email step */

export const EMAIL_EYEBROW = "Your recruiting workspace";
export const EMAIL_TITLE = "Continue with your recruiting email.";
export const EMAIL_SUPPORTING = "Enter the email address where you conduct recruiting.";
export const EMAIL_LABEL = "Recruiting email";

/* ---------------------------------------------------------- the price step */

export const PRICE_TITLE = "Blotter";
export const PRICE_AMOUNT = "$9.99 / month";

/**
 * Availability moves onto the price screen. Ratified by Jon, August 12, 2026.
 *
 * **This amends `07-SECTION-7` §8**, whose last clause read "Fall 2026 timing
 * appears only in the terminal state after a payment-choice click." The rest of
 * §8 is untouched and still obeyed: no price or availability anywhere on the
 * page, disclosure only inside this funnel.
 *
 * The defect it fixes. `checkout_started` fires on this screen's button, and at
 * the time of the change it had fired zero times against four email captures —
 * so nobody was pressing `Continue to payment` at all. The screen said
 * `$9.99 / month` and `Billed monthly. Cancel anytime.`, which a reader in
 * August correctly parses as "pay today". Most of this test's traffic is
 * pre-season and has an empty tracker, so declining is a decision about the
 * calendar rather than about the product, and **the funnel could not tell those
 * two apart.** The terminal state has always said Fall 2026 and "you have not
 * been charged" — two screens further on, behind the click nobody made.
 *
 * What is deliberately preserved: the thing being measured is still a *payment*
 * commitment. What changed is when the money moves, not whether it is money.
 * Revealing the no-charge fact here as well would turn the click into a
 * waitlist signup, which is what `WAITLIST_*` below is for — as a second,
 * separately counted outcome rather than as a softening of this one.
 *
 * The cost, stated: the click is cheaper than it was, so figures collected
 * after this are not strictly comparable with the 0-of-4 before it. Accepted,
 * because 0 of 4 has a confidence interval of roughly 0% to 60% and cannot
 * answer anything. Tag `pre-parody-and-waitlist-2026-08-12` is the revert point.
 */
export const PRICE_BILLING =
  "Blotter opens Fall 2026. Billing starts when your access does. Cancel anytime.";
export const PRICE_DESCRIPTION =
  "A recruiting tracker that stays current from Gmail, Calendar, and Google Sheets.";
export const PRICE_INCLUDED = [
  "Keep your existing Google Sheet",
  "Automatic recruiting-activity updates",
  "Current relationship status and next actions",
];

/**
 * How the product actually reaches you. Added August 6, 2026.
 *
 * ⚠ UNRATIFIED COPY. Jon's note: at the price screen he could not tell what he
 * was buying — a download, a signup, a link — because everything above it
 * describes what Blotter does rather than how it arrives. The page explains the
 * product at length; this one line answers the delivery question and nothing
 * else, which is why it is one line.
 *
 * It must not imply that a connection is being made now. Nothing in this funnel
 * touches OAuth.
 */
export const PRICE_DELIVERY =
  "Nothing to install. You connect the Google account you recruit from, and Blotter works inside the Sheet you already use.";
export const PRICE_CTA = "Continue to payment";
export const BACK = "Back";

/* ------------------------------------------------------- the checkout step */

export const CHECKOUT_TITLE = "Complete your purchase";

/**
 * The description line is amended, August 6, 2026.
 *
 * WS4 had `Recruiting tracker with Gmail, Calendar, and Google Sheets
 * synchronization`, which names the parts rather than the thing being bought.
 * Jon asked that the description say how the product is actually served, on the
 * same reasoning as `PRICE_DELIVERY`: this is the last screen before a payment
 * click and it is the wrong place to still be guessing what arrives.
 *
 * ⚠ UNRATIFIED COPY. Every other string on this screen is WS4 verbatim.
 */
export const CHECKOUT_SUMMARY = [
  { label: "Product", value: "Blotter" },
  {
    label: "Description",
    value:
      "Connects your Google account and keeps your existing recruiting Sheet current",
  },
  /*
    Both rows amended August 12, 2026, with `PRICE_BILLING`. They are the same
    ruling: `Monthly` and `$9.99` due today contradict a price screen that has
    just said billing starts at access, and a summary that argues with the
    screen before it is worse than either version alone.

    `Due today $0.00` under buttons that still read `Pay with card` is the shape
    every real subscription uses, which also serves the standing requirement
    that this funnel read as a real product. Nothing is charged on any path —
    no card field exists anywhere in this funnel — so the figure was always
    descriptive rather than operative.
  */
  { label: "Billing", value: "$9.99 / month, from Fall 2026" },
  { label: "Due today", value: "$0.00" },
];
export const PAY_CARD = "Pay with card";
export const PAY_APPLE = "Apple Pay";

/* ------------------------------------------------------- the waitlist branch */

/**
 * The second outcome on the price screen. Jon's decision, August 12, 2026.
 *
 * ## Why it exists
 *
 * Before this, declining the price was indistinguishable from not wanting the
 * product. Most of this test's traffic is pre-season — recruiting for a class
 * whose networking has not started — so "no" mostly meant "not in August", and
 * the funnel had no way to say so. This captures that population as its own
 * measured outcome instead of losing it.
 *
 * ## Why it is subordinate, and it must stay that way
 *
 * `Continue to payment` is the primary and this is a text button beneath it.
 * If the two ever read as equal choices the cheap one wins, the payment signal
 * collapses, and the test stops measuring willingness to pay — which is the
 * only thing it exists to measure. **Do not promote this to a second
 * `Primary`.**
 *
 * ## What it does not say
 *
 * The price screen still does not disclose that nothing is charged on any path.
 * Revealing that here would turn `Continue to payment` into a waitlist signup
 * too, and collapse the two outcomes back into one. The no-charge fact stays
 * where it has always been: after the click.
 */
export const WAITLIST_CTA = "Join the waitlist instead";

export const WAITLIST_EYEBROW = "You are on the waitlist";
export const WAITLIST_TITLE = "You are on the Blotter waitlist.";
export const WAITLIST_SUPPORTING =
  "Blotter is opening to a limited first cohort of approximately 300 people in Fall 2026. We will email you when access opens, at the recruiting email you provided.";
export const WAITLIST_CONFIRMATION = "Nothing is owed and nothing has been charged.";
export const WAITLIST_BUTTON = "Return to Blotter";

/* ------------------------------------------------------- the terminal state */

/** The first and only point at which availability is disclosed. */
export const DONE_EYEBROW = "Your spot is confirmed";
export const DONE_TITLE = "You are in the first Blotter cohort.";
/* `Your place on the waitlist` since August 12, 2026, one word added on Jon's
   instruction: a visitor who clicks pay should see that they are on the same
   waitlist, not a different and unexplained thing. Both terminal states now
   name the same list and the same cohort. */
export const DONE_SUPPORTING =
  "Blotter is opening to a limited first cohort of approximately 300 people in Fall 2026. Your place on the waitlist is tied to the recruiting email you provided.";
export const DONE_CHARGE = "You have not been charged.";
export const DONE_CONFIRMATION = "We will email you with access details and next steps.";
export const DONE_BUTTON = "Return to Blotter";
