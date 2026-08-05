/**
 * Google product marks, drawn to match the ratified assets.
 *
 * These are hand-drawn rather than pulled from an icon library because the
 * assets show the full-colour product logos: hero-reference-v1.png draws the
 * Gmail M and the Google Calendar 31, and the Section 2 asset draws the Gmail
 * M in its top bar. Icon libraries carry monochrome glyph versions of these,
 * which would not match. 01-HERO section 7 requires the cue treatment be
 * preserved closely, and 02-SECTION-2 section 10 makes the email asset exact.
 *
 * They are decorative identification only. Nothing here is a claim of
 * affiliation, and no bank logo appears anywhere on the page.
 */

export function GmailMark({
  width = 20,
  height = 15,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 18"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M1.64 18h3.27V9.95L0 6.27v10.09C0 17.27.73 18 1.64 18Z" fill="#4285F4" />
      <path d="M19.09 18h3.27c.9 0 1.64-.73 1.64-1.64V6.27l-4.91 3.68V18Z" fill="#34A853" />
      <path d="M19.09 1.64v8.31L24 6.27V2.45c0-1.52-1.73-2.38-2.95-1.47l-1.96 1.47Z" fill="#FBBC04" />
      <path d="M4.91 9.95V1.64L12 6.95l7.09-5.31v8.31L12 15.27 4.91 9.95Z" fill="#EA4335" />
      <path d="M0 2.45v3.82l4.91 3.68V1.64L2.95.98C1.73.07 0 .93 0 2.45Z" fill="#C5221F" />
    </svg>
  );
}

/**
 * Google Calendar mark, matched to hero-reference-v1.png: blue left and top
 * bands, amber right band, green bottom band, and the three darker corner
 * squares, around a white face carrying the 31.
 */
export function CalendarMark({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <clipPath id="cal-round">
          <rect width="20" height="20" rx="2.4" />
        </clipPath>
      </defs>
      <g clipPath="url(#cal-round)">
        <rect width="20" height="20" fill="#4285F4" />
        <rect x="15.6" width="4.4" height="4.4" fill="#1967D2" />
        <rect x="15.6" y="4.4" width="4.4" height="11.2" fill="#FBBC04" />
        <rect y="15.6" width="4.4" height="4.4" fill="#188038" />
        <rect x="4.4" y="15.6" width="11.2" height="4.4" fill="#34A853" />
        <rect x="15.6" y="15.6" width="4.4" height="4.4" fill="#EA4335" />
        <rect x="4.4" y="4.4" width="11.2" height="11.2" fill="#ffffff" />
        <text
          x="10"
          y="13.6"
          textAnchor="middle"
          fontSize="9.4"
          fontWeight="500"
          fill="#4285F4"
          fontFamily="Arial, Helvetica, sans-serif"
        >
          31
        </text>
      </g>
    </svg>
  );
}
