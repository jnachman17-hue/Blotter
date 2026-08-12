/**
 * The hero's short supporting line, for both surfaces.
 *
 * ## Why it lives here rather than beside either hero
 *
 * It was declared twice: `SUPPORTING_SHORT` in `components/sections/hero.tsx`
 * for the phone, and `SUBHEAD` in `components/hero/hero-top.tsx` for the
 * desktop variants. Two copies of one ratified string, which is exactly the
 * hand-kept-duplicate problem this project has already been bitten by twice —
 * `web/public/film/` against `social/`, and `sheet-phone.tsx`'s column widths
 * against `parts.tsx`. Neither could import the other's: `hero.tsx` imports
 * from `hero-top.tsx`, so the dependency only runs one way.
 *
 * A neutral module is the fix, and `lib/*-copy.ts` is where this page already
 * keeps ratified strings.
 *
 * ## The tail is cut, August 11, 2026
 *
 * It read *"Blotter keeps the Google Sheet you already use current, from Gmail
 * and Calendar."* Jon flagged the ending and left the call to me.
 *
 * **The problem was grammatical.** "Keeps X current, from Y" leaves *from*
 * dangling — it modifies nothing cleanly. The repairs are all clumsier:
 * "current using Gmail and Calendar", "current with data from Gmail and
 * Calendar".
 *
 * **The reason to cut rather than repair is the page's own discipline.** The
 * film sits directly beneath this line, in the same viewport, and its three
 * beats carry the Gmail mark, the Calendar mark and the muted Gmail mark. The
 * sources are *shown* about forty pixels below where the tail *said* them. That
 * is the fault this whole rework exists to remove, and the same reasoning that
 * cut the supporting paragraph's first sentence and the sheet's zone labels.
 *
 * Nothing is lost. Section 02's paragraph names both sources in words, and
 * Section 04 spends a whole section on them.
 *
 * **Both surfaces, deliberately.** The argument is identical on the phone,
 * where Film C is directly below and shows the same three marks, and
 * `09-page-argument-rework.md` holds that layout may diverge between devices
 * and the argument may not.
 */
export const HERO_SUPPORTING_SHORT =
  "Blotter keeps the Google Sheet you already use current.";
