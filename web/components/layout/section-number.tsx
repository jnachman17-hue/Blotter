/**
 * A numbered label above a section headline. **Off unless a wrapper turns it
 * on**, so the live page is unchanged by its presence.
 *
 * ## Whose idea and what problem it solves
 *
 * Jon's, August 10, 2026. His complaint was concrete: on a phone the sections
 * are hard to tell apart, and Sections 4 and 5 are the worst of it — two beats
 * whose headlines sit in the same layout, reading as one block printed twice.
 *
 * He is describing something real, and part of it is mine. On desktop those two
 * beats *mirror*: beat one sets its headline left and its copy right, beat two
 * reverses them, and that alternation is the whole reason they read as two
 * distinct beats. Stacking for a phone collapses both to headline-then-copy and
 * the distinction disappears. A number is not the only possible answer to that
 * — restoring a mobile equivalent of the mirroring is the other — but it is a
 * page-wide answer where the mirroring fix is local to one section.
 *
 * A phone also has no scrollbar worth reading, so a reader has no idea how much
 * page is left. Desktop gets that for free. `total` puts it back.
 *
 * ## What it would cost, if it is ever made live
 *
 * **Four build specs forbid an eyebrow** — `04-SECTION-4` §101 and §351,
 * `05-SECTION-5` §74 and §253, `06-SECTION-6` §157, `07-SECTION-7` §85 and
 * §269 — and a numeral above a headline reads as one. Turning this on is four
 * overrides, and it cannot stay mobile-only for long without the two surfaces
 * disagreeing about what the sections of this page are. That belongs in
 * `08-desktop-changes-pending.md`, not in a quiet mobile edit.
 *
 * So: it renders, it is styled, and it is invisible until something sets
 * `data-section-numbers` on an ancestor, and until the viewport is below
 * `--breakpoint-desk`. `app/page.tsx` sets it; desktop stays unnumbered.
 */

/**
 * The rendered blocks a reader actually meets, in order. The hero is not one:
 * it is the opening, not a place you navigate to.
 *
 * **This is the phone's list**, which is the only surface that renders numbers.
 * It changed on August 11, 2026 and the total did not: "How Blotter works" drops
 * out, because `09-page-argument-rework.md` §4 deletes that section from the
 * phone, and "Your tracker and your actions" splits in two, because its beat 1
 * becomes the merged ownership section and its beat 2 becomes the Outstanding
 * list. One out, one split, still five.
 */
export const NUMBERED_SECTIONS = [
  "The scale of a recruiting cycle",
  "Keep the tracker you already built",
  "Know exactly what needs your attention",
  "How Blotter uses your data",
  "Questions",
] as const;

export const SECTION_TOTAL = NUMBERED_SECTIONS.length;

const pad = (n: number) => String(n).padStart(2, "0");

export function SectionNumber({ n }: { n: number }) {
  return (
    <p
      /*
        `aria-hidden` because it is wayfinding for the eye, not content. A
        screen-reader user already has a heading list, which is a better map
        than a numeral, and hearing "zero two" before every headline is noise.
      */
      aria-hidden="true"
      className="section-number font-mono text-micro leading-none font-medium tracking-[0.12em] text-ink-faint tabular-nums"
    >
      <span>{pad(n)}</span>
      <span className="section-number__total"> / {pad(SECTION_TOTAL)}</span>
    </p>
  );
}
