/**
 * Section 3's resolution: boundary line, product-boundary badges, closing line.
 *
 * Authority: `03-SECTION-3-HOW-BLOTTER-WORKS.md` §9, §11 and §12, as overruled
 * in part by Jon on August 5, 2026. The departures from ratified presentation,
 * recorded plainly because they are real:
 *
 *   §11 "one compact horizontal row on desktop" — overruled. The three
 *       statements stack.
 *   §11 "restrained outlined-pill or compact-label treatment" — overruled. He
 *       rejected the pills outright.
 *   §11 "no icons" — overruled. He asked for a symbol beside each statement.
 *   §11 "keep the badges subordinate to the mechanism visual and boundary
 *       line" — partially, since symbols and colour raise their weight.
 *   §12 "place it after the badges" as its own beat — overruled. The closing
 *       line is incorporated into the same block.
 *
 * Also amended, August 5, 2026: the page-theme rule that cream and blue-grey
 * are strictly semantic. Jon relaxed it for this block, so the symbol tiles
 * carry three distinct tints rather than one accent.
 *
 * Still obeyed, and not open:
 *
 *   §5  the copy, verbatim. Nothing rewritten, shortened, combined or added.
 *   §11 no illustrations, no individual cards around each statement, no
 *       oversized emphasis on `No AI slop`, all three kept together.
 *   §12 no button, no additional explanation.
 *   §14 no brain, robot, sparkle, circuit or magic-wand iconography.
 *
 * Also overruled, August 5, 2026: §17's "provider references" exclusion, for
 * the ChatGPT mark on the third statement. See `SlopGlyph` for the record.
 *   §17 no CTA, no price, no beta language.
 *
 * Content note for the record: the boundary line and the closing line make the
 * same claim twice — a you-verb paired with a Blotter-verb about one division
 * of labour. That is the redundancy Jon cut from Section 2 on the same day.
 * Both treatments below set them at different weights so they read as statement
 * and restatement; cutting one is a content decision and remains Jon's.
 */

import { cn } from "@/lib/cn";

/* --------------------------------------------------- exact copy, §5 verbatim */

export const BOUNDARY =
  "You choose the people and write the messages. Blotter keeps the logistics current.";

export const CLOSING =
  "You stay responsible for the judgment and communication. Blotter keeps the logistics synchronized.";

/* ----------------------------------------------------------------- symbols */

/*
  Each symbol draws the thing being refused and strikes it through. The strike
  is one warm clay across all three, so the negation reads as a single idea
  rather than three unrelated marks, and the tile tints do the varying.

  Deliberately not: brains, robots, sparkles, circuits or wands. §14 bans all
  of them, and that ban is not overruled.
*/
const STRIKE = "#b4705a";
const STROKE = "#1b3050";

function Glyph({
  tint,
  children,
}: {
  tint: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={STROKE}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
      {/*
        The strike is drawn twice: once wide in the tile's own colour to knock a
        clear channel through the artwork, then thin in clay on top. Without the
        knockout the two merge at this size and the glyph turns to mush.
      */}
      <line x1="3.4" y1="20.6" x2="20.6" y2="3.4" stroke={tint} strokeWidth="4.6" />
      <line x1="3.4" y1="20.6" x2="20.6" y2="3.4" stroke={STRIKE} strokeWidth="1.9" />
    </svg>
  );
}

/** Technical-prep content: a page of study material. */
function PrepGlyph({ tint }: { tint: string }) {
  return (
    <Glyph tint={tint}>
      <rect x="5.2" y="3" width="13.6" height="18" rx="2" />
      <path d="M8.6 8h6.8M8.6 12h6.8M8.6 16h4.2" />
    </Glyph>
  );
}

/** Generic mass outreach: the same message, over and over. */
function OutreachGlyph({ tint }: { tint: string }) {
  return (
    <Glyph tint={tint}>
      <rect x="8.6" y="3.4" width="11.4" height="7.6" rx="1.5" opacity="0.35" />
      <rect x="6.3" y="6.6" width="11.4" height="7.6" rx="1.5" opacity="0.6" />
      <rect x="4" y="9.8" width="11.4" height="7.6" rx="1.5" />
    </Glyph>
  );
}

/**
 * AI slop: the ChatGPT knot, struck through.
 *
 * Instructed by Jon on August 5, 2026 and reaffirmed after the concerns were
 * put to him twice. This overrides `03-SECTION-3` §17, which lists "provider
 * references" in its explicit exclusions, and it puts a third party's
 * trademark on the page in a negative comparative position. Both were raised
 * and both were waived. Recorded here rather than argued again.
 *
 * The strike is not optional decoration on this one. Without it the mark reads
 * as an integration rather than a refusal, which is the opposite claim.
 */
function SlopGlyph({ tint }: { tint: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="#000000"
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"
      />
      <line x1="3.4" y1="20.6" x2="20.6" y2="3.4" stroke={tint} strokeWidth="4.6" strokeLinecap="round" />
      <line x1="3.4" y1="20.6" x2="20.6" y2="3.4" stroke={STRIKE} strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

interface Boundary {
  label: string;
  tint: string;
  Glyph: (props: { tint: string }) => React.JSX.Element;
}

/** The three exact badges, §5, in the ratified order. */
const BOUNDARIES: Boundary[] = [
  { label: "No technical-prep content", tint: "#e6edf8", Glyph: PrepGlyph },
  { label: "No generic mass AI outreach", tint: "#f7f1e4", Glyph: OutreachGlyph },
  { label: "No AI slop", tint: "#ececed", Glyph: SlopGlyph },
];

export const BADGES = BOUNDARIES.map((b) => b.label);

/*
  Sized so three rows plus the panel's padding stay under the height of the
  statement column beside them. `items-stretch` on the parent then pulls the
  panel up to exactly that height, so the cream never runs past the top of the
  boundary line or the bottom of the closing line. Ratified by Jon,
  August 5, 2026.
*/
/**
 * The three refusals alone, without the boundary and closing lines.
 *
 * Mobile 02 takes the refusals and cuts the two statements — they are two of the
 * four duplicate statements of the ownership claim that
 * `09-page-argument-rework.md` §1 catalogues. Desktop still renders `Facing()`
 * below with all three parts, unchanged.
 */
/**
 * The three refusals.
 *
 * **Three across from the desktop breakpoint, stacked on a phone.** Changed
 * August 11, 2026 on Jon's note about the desktop rendering: *"that looks
 * awful expanded."*
 *
 * He is right, and the reason is that the panel was written for a phone and
 * then inherited by a section that is 1,124px wide. Three labels of 11 to 26
 * characters, each given its own full-width row with a divider under it, put
 * roughly 900px of empty warm panel to the right of `No AI slop` and made the
 * block about 150px tall to carry nine words. A stacked list is right when the
 * column is 350px and absurd when it is 1,124.
 *
 * Across, the panel is one 56px band, each refusal gets an equal third, and the
 * dividers turn ninety degrees into the gaps between them.
 *
 * **It also bookends the sheet**, which is a gain rather than a coincidence:
 * the three reassurance claims already run three-across immediately above the
 * sheet, so the section now reads claims → picture → refusals in one rhythm
 * instead of a strip above and a stack below.
 *
 * ## The risk this runs, and why it is acceptable
 *
 * `06-assumptions-and-open-questions.md` carries a row warning that the
 * reassurance claims and the refusals could converge into "two three-item lists
 * with a mark each". Matching their orientation moves toward that.
 *
 * Three things keep them distinct, and all three are load-bearing rather than
 * incidental: this panel has a warm fill and a ring where the reassurance strip
 * has neither; its marks are coloured tiles where the strip's are bare glyphs;
 * and about 500px of Google Sheets sits between them. The convergence the row
 * fears is a *phone* problem, where the two lists are 200px apart in one
 * column — and on a phone this stays stacked, so nothing there changes.
 */
/**
 * The three refusals.
 *
 * **No panel from August 11, 2026.** Jon: *"I really just hate… how those are
 * filled in. I don't like the bubbles behind them. I like how above we just
 * have Keep your existing tracker, no re-entering every contact, whatever, just
 * against the gradient background."*
 *
 * So this now matches `Reassurance` exactly: three across, ruled apart with a
 * hairline, sitting on the page field with no container of its own. The warm
 * fill and the ring are gone. The glyph tiles stay — those are what the
 * reassurance row has too, and they are not what he was pointing at.
 *
 * **What that costs, and it is a real cost.** The warm panel existed to keep
 * these visibly distinct from the reassurance claims —
 * `06-assumptions-and-open-questions.md` carries a row warning the two lists
 * could converge into "two three-item lists with a mark each". They have now
 * converged, deliberately. The thing that keeps them apart is no longer their
 * treatment but their **position**: the reassurance claims sit against the
 * sheet they describe, and these sit at the end of the page as a statement
 * about the product rather than about the picture.
 *
 * That is a weaker separation than a panel, and it is the reason the placement
 * below is load-bearing rather than incidental.
 */
export function RefusalPanel({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-col desk:flex-row desk:items-stretch", className)}>
      {BOUNDARIES.map((item, i) => (
        <BoundaryRow
          key={item.label}
          item={item}
          last={i === BOUNDARIES.length - 1}
          first={i === 0}
        />
      ))}
    </ul>
  );
}

function BoundaryRow({
  item,
  last,
  first = false,
}: {
  item: Boundary;
  last: boolean;
  /* Only the page-level `RefusalPanel` sets this. `Facing()` below belongs to
     Section 3, which is cut from both surfaces, and keeps its stacked layout
     where the flag is meaningless. */
  first?: boolean;
}) {
  return (
    <li
      className={cn(
        "flex items-center gap-3.5 py-2",
        /* The rule turns ninety degrees with the list, and it is the same
           hairline `Reassurance` uses rather than a second divider weight. */
        !last && "border-b border-navy-900/[0.08] desk:border-b-0 desk:border-r desk:border-navy-900/[0.13]",
        "desk:flex-1 desk:gap-3 desk:px-8 desk:py-1",
        first && "desk:pl-0",
        last && "desk:pr-0",
      )}
    >
      <span
        className="grid size-8 shrink-0 place-items-center rounded-lg"
        style={{ background: item.tint }}
      >
        <item.Glyph tint={item.tint} />
      </span>
      <span className="text-[0.9375rem] leading-snug text-navy-900">
        {item.label}
      </span>
    </li>
  );
}

/* ------------------------------------------------------------------ facing */

/**
 * Both ratified statements on the left, the three refusals facing them from a
 * warm panel on the right. The negations read as a counterweight rather than a
 * footer, and the two statements sit as statement and restatement.
 */
function Facing() {
  return (
    /*
      Stacked on a phone, facing from the desktop breakpoint. The counterweight
      reading — statement on the left, refusals answering from the right — is a
      desktop composition; below `desk` the refusals sit under the statement
      they answer, which keeps the order and the relationship without the
      side-by-side.

      `min-w-0` on both columns is the fix for the real bug here, not a
      convenience. A flex item defaults to `min-width: auto`, so neither column
      could shrink below its own longest unbreakable line and the pair held a
      375px floor open — the only thing on the page still overflowing at 320
      and 360.
    */
    <div className="flex flex-col gap-8 desk:flex-row desk:items-stretch desk:gap-14">
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="font-display max-w-[26ch] text-[1.625rem] leading-[1.28] font-semibold tracking-[-0.02em] text-navy-900">
          {BOUNDARY}
        </p>
        <p className="mt-5 max-w-[44ch] text-body leading-[1.6] text-ink-muted">
          {CLOSING}
        </p>
      </div>
      <ul className="flex min-w-0 flex-1 flex-col justify-center rounded-xl bg-[#fbf9f5] px-7 py-3 ring-1 ring-navy-900/[0.07]">
        {BOUNDARIES.map((item, i) => (
          <BoundaryRow
            key={item.label}
            item={item}
            last={i === BOUNDARIES.length - 1}
          />
        ))}
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------------- entry */

export function BoundaryBlock({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <Facing />
    </div>
  );
}
