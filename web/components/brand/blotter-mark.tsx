/**
 * The Blotter identity components. Ratified by Jon, August 5, 2026.
 *
 * `BlotterMark`     the Ledger B glyph alone
 * `BlotterWordmark` Schibsted Grotesk 700, tight
 * `BlotterLockup`   mark and wordmark together, the header and footer use
 * `BlotterTile`     reversed mark on a navy tile, for avatars and app icons
 *
 * Geometry and colour rules live in `lib/brand.ts`. Do not restate them here.
 *
 * The glyph is drawn once, in `MarkGlyph`, and every other component consumes
 * it. That is deliberate: the tile and the mark cannot drift apart, and a later
 * correction to the letterform lands in one place.
 *
 * Everything paints in `currentColor`, so a reversed context is a text colour
 * change rather than a second component.
 */

import {
  BRAND_NAVY,
  CLEAR_SPACE_RATIO,
  LOCKUP_GAP_RATIO,
  MARK_INK,
  TILE_MARK_RATIO,
  TILE_RADIUS_RATIO,
  WORDMARK_RATIO,
  WORDMARK_TRACKING,
  WORDMARK_WEIGHT,
} from "@/lib/brand";
import { cn } from "@/lib/cn";

/* ------------------------------------------------------------------- glyph */

/**
 * Ledger B, in a 24-unit box.
 *
 * The two rects are the gutter cells, one per row. The path is the two bowls
 * with their pill counters knocked out by `evenodd`. The 0.9-unit channel
 * between gutter and bowls is the sheet's frozen-column hairline; it closes
 * below about 16px and the mark resolves to a solid B, which is intended.
 */
function MarkGlyph() {
  return (
    <>
      <rect x="3.2" y="2.8" width="3.4" height="8.4" rx="1.1" />
      <rect x="3.2" y="12.8" width="3.4" height="8.4" rx="1.1" />
      <path
        fillRule="evenodd"
        d="M7.5 2.8H14.2a4.2 4.2 0 0 1 0 8.4H7.5Z
           M11.8 5.6H13.4a1.4 1.4 0 0 1 0 2.8H11.8a1.4 1.4 0 0 1 0-2.8Z
           M7.5 12.8H16.4a4.2 4.2 0 0 1 0 8.4H7.5Z
           M11.8 15.6H14.8a1.4 1.4 0 0 1 0 2.8H11.8a1.4 1.4 0 0 1 0-2.8Z"
      />
    </>
  );
}

/* -------------------------------------------------------------------- mark */

export interface BlotterMarkProps {
  /** Rendered box size in px. The glyph's ink is inset within it. */
  size?: number;
  className?: string;
  /**
   * Reserve the mark's clear space as padding. Use where the mark sits near
   * other content and the layout does not already provide the margin.
   */
  withClearSpace?: boolean;
}

export function BlotterMark({
  size = 24,
  className,
  withClearSpace = false,
}: BlotterMarkProps) {
  const pad = withClearSpace ? size * CLEAR_SPACE_RATIO : 0;
  return (
    <svg
      width={size + pad * 2}
      height={size + pad * 2}
      viewBox={`${-pad * (24 / size)} ${-pad * (24 / size)} ${24 + (pad * 2 * 24) / size} ${24 + (pad * 2 * 24) / size}`}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <MarkGlyph />
    </svg>
  );
}

/* ---------------------------------------------------------------- wordmark */

export interface BlotterWordmarkProps {
  /** Font size in px. */
  size?: number;
  className?: string;
}

export function BlotterWordmark({
  size = 17,
  className,
}: BlotterWordmarkProps) {
  return (
    <span
      className={cn("font-display whitespace-nowrap", className)}
      style={{
        fontSize: size,
        fontWeight: WORDMARK_WEIGHT,
        letterSpacing: WORDMARK_TRACKING,
        lineHeight: 1,
      }}
    >
      Blotter
    </span>
  );
}

/* ------------------------------------------------------------------ lockup */

export interface BlotterLockupProps {
  /** Mark size in px. The wordmark and gap scale from it. */
  size?: number;
  className?: string;
}

export function BlotterLockup({ size = 22, className }: BlotterLockupProps) {
  return (
    <span
      className={cn("inline-flex items-center", className)}
      style={{ gap: Math.round(size * LOCKUP_GAP_RATIO) }}
    >
      <BlotterMark size={size} />
      <BlotterWordmark size={Math.round(size * WORDMARK_RATIO)} />
    </span>
  );
}

/* -------------------------------------------------------------------- tile */

export interface BlotterTileProps {
  /** Tile edge length in px. */
  size?: number;
  /** `round` for a social avatar, `squircle` for an app icon. */
  shape?: "round" | "squircle";
  className?: string;
}

/**
 * The reversed mark on a navy tile.
 *
 * The glyph is optically centred using `MARK_INK` rather than box-centred,
 * because the mark's ink is not centred in its own 24-unit box and box-centring
 * sits it visibly low and left inside a circle.
 */
export function BlotterTile({
  size = 64,
  shape = "round",
  className,
}: BlotterTileProps) {
  const scale = (24 * TILE_MARK_RATIO) / MARK_INK.height;
  const tx = 12 - (MARK_INK.x + MARK_INK.width / 2) * scale;
  const ty = 12 - (MARK_INK.y + MARK_INK.height / 2) * scale;
  const radius = shape === "round" ? 12 : 24 * TILE_RADIUS_RATIO;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      <rect width="24" height="24" rx={radius} fill={BRAND_NAVY} />
      <g
        fill="#ffffff"
        transform={`translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${scale.toFixed(4)})`}
      >
        <MarkGlyph />
      </g>
    </svg>
  );
}
