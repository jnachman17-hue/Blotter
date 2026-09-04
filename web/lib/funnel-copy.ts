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

export const EMAIL_EYEBROW = "One last thing";
export const EMAIL_TITLE = "Your recruiting email.";
export const EMAIL_SUPPORTING =
  "The address you recruit from. Then we take you to the setup page, and Blotter is yours in about two minutes.";
export const EMAIL_LABEL = "Recruiting email";

/* ---------------------------------------------------------- the price step */

export const BACK = "Back";
