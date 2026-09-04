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

/* "One last thing" from September 4, 2026 became the only thing: the two
   questions before it are gone. */
export const EMAIL_EYEBROW = "Before you start";
export const EMAIL_TITLE = "Where do you recruit from?";
export const EMAIL_SUPPORTING =
  "So we can tell you if something breaks, or if Blotter ever stops being free. It is the only thing we ask for, and you can skip it.";
export const EMAIL_LABEL = "Recruiting email";

/* ---------------------------------------------------------- the price step */

export const BACK = "Back";
export const SKIP = "Skip and set up";
