/**
 * The four marks on Section 6's flow.
 *
 * Drawn here rather than pulled from an icon set so they share one stroke
 * weight, one corner radius and one optical size, and so the fourth is
 * literally the spreadsheet this page has been showing since the hero.
 *
 * They are one weight lighter than they look like they should be: at 1.4px on
 * a 24px box they read as drawing rather than as UI furniture, which is the
 * difference between a diagram and a toolbar.
 *
 * `06-SECTION-6` §7 banned icons on the processing steps. Jon reversed that on
 * August 6, 2026, asking for a visual flow with icons. Nothing here is a seal,
 * a shield, or a security glyph — §18's ban on those still stands.
 */

const BASE = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

/** 01. An envelope being looked at: the sender is checked before anything else. */
export function CheckSenderIcon() {
  return (
    <svg {...BASE}>
      <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v6.4" />
      <path d="M3 6.75v10.5A1.75 1.75 0 0 0 4.75 19h7.4" />
      <path d="m3.4 6.2 8.6 6 8.6-6" />
      <circle cx="17.4" cy="17.4" r="3.35" />
      <path d="m19.9 19.9 1.6 1.6" />
    </svg>
  );
}

/** 02. The dead end. The page already uses a struck symbol for a boundary. */
export function StopIcon() {
  return (
    <svg {...BASE}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M6.15 17.85 17.85 6.15" />
    </svg>
  );
}

/** 03. A message opened and read, with the facts lifting out of it. */
export function ReadIcon() {
  return (
    <svg {...BASE}>
      <path d="M4 9.4 12 4l8 5.4v8.85A1.75 1.75 0 0 1 18.25 20H5.75A1.75 1.75 0 0 1 4 18.25V9.4Z" />
      <path d="m4 9.6 8 5.3 8-5.3" />
      <path d="M9.5 11.6h5" />
    </svg>
  );
}

/** 04. The tracker itself, with its maintained row filled. */
export function KeepIcon() {
  return (
    <svg {...BASE}>
      <rect x="3.6" y="4.8" width="16.8" height="14.4" rx="1.75" />
      <path d="M3.6 9.4h16.8" />
      <path d="M9.6 9.4v9.8" />
      <path d="M3.9 5.1h16.2v4H3.9z" fill="currentColor" stroke="none" opacity=".9" />
    </svg>
  );
}
