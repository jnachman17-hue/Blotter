/**
 * Section 7 copy, verbatim.
 *
 * Authority: `07-SECTION-7-FAQ-AND-FINAL-CTA.md` §4, §5 and §9.
 *
 * Five product questions, then the closing block. Two rules govern what is
 * absent as much as what is present:
 *
 *   §8  no price or availability question, and no evasive replacement for one.
 *       Price is `$9.99 / month` and it appears after email capture inside the
 *       funnel. Fall 2026 appears only in the terminal state. Neither may leak
 *       onto this page.
 *   §13 no privacy question here — Section 6 owns those, and merging the two
 *       FAQs is forbidden by both build specs.
 *
 * The CTA label itself is not here. It lives in `cta-button.tsx`, which is the
 * single source for all four placements.
 */

import type { FaqEntry } from "./privacy-copy";

/* ------------------------------------------------------------- the product FAQ */

export const FAQ_TITLE = "Frequently asked questions";

/** §5. Exact, in order. No eyebrow and no supporting paragraph above them. */
export const PRODUCT_FAQ: FaqEntry[] = [
  {
    q: "Do I need to start with a new tracker?",
    a: "No. Keep the Google Sheet and contacts you already built. Blotter creates a standardized recruiting view in a new tab, so you do not have to rebuild your contact record or re-enter every relationship.",
  },
  {
    q: "Can I use Blotter after recruiting has already started?",
    a: "Yes. Blotter is designed to work with an existing tracker and contact record, whether you are beginning recruiting or already managing an active process.",
  },
  {
    q: "Does Blotter write emails or help with technical preparation?",
    a: "No. You choose who to contact and write every message yourself. Blotter does not generate outreach, teach technicals, or provide recruiting content. It maintains the logistics surrounding your process.",
  },
  {
    q: "What happens when I add a new contact?",
    a: "Add the contact and their email address to your tracker. Blotter can then use relevant Gmail and Calendar activity associated with that contact to maintain their status, timing, scheduled calls, and next actions.",
  },
  {
    q: "Does Blotter work only for investment banking?",
    a: "Blotter is designed first for investment banking and other high-finance recruiting processes built around intensive networking, follow-ups, coffee chats, applications, and interviews.",
  },
  /*
    Three added August 13, 2026 on Jon's instruction, under the voice ruling in
    `04`. **They are the only jokes on the page and they are load-bearing.**

    The audience is 19 to 21 year old finance recruits who read marketing copy
    for sport, and a page that never once sounds like a person is a page they
    have already decided about. These three say, in the last section, that
    whoever built this is one of them.

    Placed last on purpose. The five product answers above establish that the
    thing is real; these are the reward for reading to the bottom, and a reader
    who bounces early never reaches them. Reversing that order would trade the
    page's credibility for a laugh, which is the wrong way round when Section 6
    has just asked to read their Gmail.

    `07-SECTION-7` §8 still governs: no price and no availability question here.
    None of these touches either.
  */
  {
    q: "Who is this built for?",
    a: "Anyone recruiting in finance. Especially anyone with a deep personal commitment to maximizing shareholder value.",
  },
  {
    q: "Will AI take my analyst role?",
    a: "Probably.",
  },
  {
    q: "Am I cooked in this job market?",
    a: "Yes. So is everyone. The ones who aren't are the ones who answered their emails.",
  },
];

/* --------------------------------------------------------- the closing block */

/**
 * §9. The page's ending. §1 requires the page not end on an accordion, so the
 * closing block is a separate visual phase within the same section.
 */
export const CLOSING_HEADLINE = "Your recruiting tracker, always current.";

export const CLOSING_SUPPORTING =
  "Keep your relationships moving without spending every day rebuilding the state of your process.";

/** Beneath the CTA, smaller and quieter. */
export const CLOSING_REASSURANCE =
  "Keep your existing Google Sheet. No mass outreach. No technical-prep content.";
