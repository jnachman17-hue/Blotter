/**
 * Section eyebrows, and the comparison Jon asked for on August 11, 2026.
 *
 * ## What is actually on the page, corrected
 *
 * An audit pass reported that two sections carried an eyebrow and three did
 * not, and called the split arbitrary. **That was wrong.** The second hit was
 * `Can do`, a column heading inside Section 04's permissions list, not a
 * section label. Only Section 01 has an eyebrow.
 *
 * And that is not arbitrary either — it is exactly what the specs prescribe:
 *
 * | Spec | Clause |
 * |---|---|
 * | `02-SECTION-2` §100, §114 | eyebrow required, exact copy |
 * | `04-SECTION-4` §126, §431 | "There is no eyebrow in Section 4" |
 * | `05-SECTION-5` §97, §315 | "There is no eyebrow" |
 * | `06-SECTION-6` §64, §157 | "There is no eyebrow" |
 * | `07-SECTION-7` §85 | "no eyebrow" |
 *
 * **So both variants under review are spec overrides**, in opposite directions.
 * `all` overrides the same four clauses already overridden to turn numbering
 * on. `none` overrides `02-SECTION-2`'s exact-copy requirement. Neither is a
 * tidy-up, and whichever wins needs recording as an override.
 *
 * ## The invented copy, flagged rather than smuggled
 *
 * `all` needs a label for four sections that have never had one. The four
 * strings below are **unratified and written for this comparison only.** They
 * exist so the *pattern* can be judged; if `all` wins, the copy is a separate
 * decision and these are a starting point, not an answer.
 *
 * Deliberately not reused: `NUMBERED_SECTIONS`, whose entries are the section
 * headlines. An eyebrow that restates the headline underneath it is the fault
 * this whole rework removes.
 */

const EXTRA = "section-eyebrow section-eyebrow--extra hidden";

/**
 * An eyebrow for a section the specs give none to. Invisible unless an ancestor
 * carries `data-section-eyebrows="all"`.
 */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p
      className={`${EXTRA} items-start gap-3 text-eyebrow leading-[1.5] font-medium tracking-[0.1em] text-navy-500 uppercase`}
    >
      <span
        aria-hidden="true"
        className="mt-[0.35em] h-[0.9em] w-[2px] shrink-0 bg-navy-500"
      />
      {children}
    </p>
  );
}

/** UNRATIFIED. Written for the `all` comparison only. See the note above. */
export const TRIAL_EYEBROWS = {
  ownership: "Your sheet, and the line between you and Blotter",
  /* Rendered nowhere since September 3, 2026; the section was cut. Kept so
     the retained `tracker-and-actions.tsx` still compiles for `/review/*`. */
  outstanding: "Everything you owe, in one place",
  privacy: "What Blotter reads, and what it will not do",
  faq: "Questions",
} as const;
