/**
 * The Blotter identity, ratified by Jon on August 5, 2026.
 *
 * Mark: `Ledger B`. The letter is built from the spreadsheet rather than
 * decorated with it — the two bowls are rows, and the stem is the row-number
 * gutter, split into one cell per row by the same hairline the sheet uses
 * between the gutter and column A.
 *
 * Wordmark: Schibsted Grotesk 700, tracking -0.035em. The page's display face,
 * so the wordmark and the headlines are one voice rather than two.
 *
 * Colour: navy alone. Yellow and cream are NOT available to the identity. They
 * are semantic on this page and mean "Blotter maintains this" — they appear in
 * the hero's maintained zone, in Section 3's sheet, and in Section 5's live
 * layer. A yellow mark would make the logo itself read as a maintained field
 * everywhere it appeared, including the header, where nothing is maintained.
 * Jon ruled navy on August 5, 2026 for exactly this reason.
 *
 * `04-decision-log.md` carries the full reasoning and the rejected directions.
 */

/* --------------------------------------------------------------- the values */

/** The one identity colour. Same token as the page accent, deliberately. */
export const BRAND_NAVY = "#12233d";

/**
 * Reversed contexts use pure white, never cream. Cream is semantic and would
 * carry the maintained-zone meaning onto an avatar.
 */
export const BRAND_REVERSED = "#ffffff";

/* ---------------------------------------------------------------- the ratios */

/**
 * Wordmark size as a multiple of mark size. Derived from the approved header
 * lockup: a 22px mark beside a 17px wordmark.
 */
export const WORDMARK_RATIO = 0.773;

/** Gap between mark and wordmark, as a multiple of mark size. */
export const LOCKUP_GAP_RATIO = 0.45;

/** The wordmark's tracking. Not optional — it is part of the wordmark. */
export const WORDMARK_TRACKING = "-0.035em";

/** The wordmark's weight. Not optional either. */
export const WORDMARK_WEIGHT = 700;

/**
 * Clear space around the mark, as a multiple of mark size. A quarter of the
 * mark's height on every side, which is roughly the mark's own bowl depth.
 */
export const CLEAR_SPACE_RATIO = 0.25;

/* ----------------------------------------------------------------- the floors */

/**
 * Below this the gutter hairline closes and the mark becomes a plain solid B.
 * It stays legible, but it stops being *this* mark, so do not go under it
 * except in a favicon, where the tile carries the recognition instead.
 */
export const MARK_MIN_PX = 16;

/** Below this the wordmark's tracking stops reading as deliberate. */
export const LOCKUP_MIN_MARK_PX = 18;

/**
 * Tile corner radius as a fraction of tile size. Matches the page's 12px-on-a
 * -surface shape rule scaled to the tile.
 */
export const TILE_RADIUS_RATIO = 0.22;

/**
 * The mark's ink inside its own 24-unit box: x 3.2 to 20.6, y 2.8 to 21.2.
 * Exported so the tile can centre the glyph optically rather than centring the
 * box, which would sit the mark low and left.
 */
export const MARK_INK = {
  x: 3.2,
  y: 2.8,
  width: 17.4,
  height: 18.4,
} as const;

/** Mark height as a fraction of tile height, for avatars and app icons. */
export const TILE_MARK_RATIO = 0.58;
