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
export const PRICE_BILLING = "Billed monthly. Cancel anytime.";
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
  { label: "Billing", value: "Monthly" },
  { label: "Due today", value: "$9.99" },
];
export const PAY_CARD = "Pay with card";
export const PAY_APPLE = "Apple Pay";

/* ------------------------------------------------------- the terminal state */

/** The first and only point at which availability is disclosed. */
export const DONE_EYEBROW = "Your spot is confirmed";
export const DONE_TITLE = "You are in the first Blotter cohort.";
export const DONE_SUPPORTING =
  "Blotter is opening to a limited first cohort of approximately 300 people in Fall 2026. Your place is tied to the recruiting email you provided.";
export const DONE_CHARGE = "You have not been charged.";
export const DONE_CONFIRMATION = "We will email you with access details and next steps.";
export const DONE_BUTTON = "Return to Blotter";
