import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

/**
 * The share card.
 *
 * ## What this is
 *
 * When a link is pasted into Reddit, X, LinkedIn, Slack or iMessage, the
 * platform fetches the page and reads its Open Graph tags to build a preview.
 * With none, it renders a bare URL. Production had none until August 11, 2026.
 *
 * ## The first version was a text slide, and that was my error
 *
 * It carried the brand, the headline and one line of copy on the hero
 * gradient. No product. I argued a screenshot would be unreadable: at 1200x630
 * shrunk again to a few hundred pixels in a feed, the sheet's 13px type falls
 * apart.
 *
 * **Jon put the real preview next to a screenshot of the page and the argument
 * collapsed.** The page screenshot read better, and the reason is that the
 * claim was answering the wrong question. A reader at feed size is not reading
 * the cells — they are **recognising a spreadsheet**. The grid, the green
 * Sheets icon and the coloured status chips all survive any amount of scaling.
 * Legibility was never the bar; recognisability was.
 *
 * ## Film C had already solved this
 *
 * The fix is not to shrink the eight-column sheet. It is the crop Film C
 * ratified for exactly this constraint: `FILM-C.md` drops to four columns
 * because eight put the type under 6px on a phone. `Name`, `Status`,
 * `Next move`, `Days` is the set that survives, and it is the set that carries
 * the argument — a name you own beside three fields that maintain themselves.
 *
 * So this card is the hero, compressed: brand, headline, and the tracker
 * bleeding off the bottom edge. The bleed is deliberate. A sheet that runs past
 * the card reads as a real object continuing beyond the frame; one that fits
 * neatly with margin reads as a picture of a sheet.
 *
 * ## Two deviations, flagged rather than smuggled
 *
 * **The eyebrow is shortened.** `01-HERO`'s ratified string is 79 characters
 * and needs about 950px beside the wordmark in 1088px of usable width. No claim
 * changes; a qualifier and a second audience are dropped.
 *
 * **The sheet is set in Geist, not Arial.** The page pins the spreadsheet to
 * Arial so it matches `hero-reference-v1.png`. Satori needs font data for every
 * family it draws, Arial is a system font with no file to ship, and at this
 * size the difference is invisible. Committing a third TTF to gain nothing
 * legible is not worth 90KB in the build.
 *
 * ## The font constraint
 *
 * Satori **cannot read WOFF2** — TTF, OTF or WOFF only. Every face on this site
 * is WOFF2 under a `next/font` content hash that changes each build, so neither
 * the served fonts nor `social/inline-fonts.sh`'s hardcoded paths are reusable.
 * The two faces here are committed as TTF in `_og-fonts/`; the leading
 * underscore keeps the directory out of Next's route resolution.
 *
 * Generated rather than a committed PNG, so the card cannot drift from the page
 * it previews.
 */

export const alt =
  "Blotter, the recruiting tracker for investment banking. Your networking keeps moving. Your tracker does not.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Sampled from `globals.css`. Literal, because Satori resolves no CSS variables. */
const INK = "#14181f";
const INK_MUTED = "#5f6368";
const NAVY_400 = "#647fa6";
const NAVY_500 = "#40608c";
const NAVY_900 = "#12233d";
const FIELD_A = "#fbfcfe";
const MANUAL_100 = "#edf2f8";
const MANUAL_FILL = "#f7f9fc";
const BLOTTER_100 = "#f7f2e8";
const BLOTTER_400 = "#d9b64a";
const MAINTAINED_FILL = "#fdfaf2";
const SHEET_GRID = "#e8eaed";
const SHEET_BORDER = "#dadce0";

/** The four ratified contacts the crop shows, in `sheet-data.ts` order. */
const ROWS = [
  { name: "Sarah Chen", status: "Replied", bg: "#d7e7fb", fg: "#1a56a8", next: "Reply to Sarah", days: "0" },
  { name: "Marcus Lee", status: "Call scheduled", bg: "#e5ddf7", fg: "#5b3fa8", next: "Attend coffee chat", days: "1" },
  { name: "Priya Shah", status: "Call completed", bg: "#d7f0dd", fg: "#1e6b34", next: "Send thank-you", days: "0" },
  { name: "Daniel Kim", status: "No reply", bg: "#fbeacb", fg: "#8a5a00", next: "Bump thread", days: "5" },
  { name: "Alex Morgan", status: "Sent", bg: "#e8eaed", fg: "#5f6368", next: "", days: "0" },
];

const COL = { name: 300, status: 250, next: 340 };
const ROW_H = 52;

async function font(file: string) {
  return readFile(path.join(process.cwd(), "app", "_og-fonts", file));
}

/**
 * `grow` on the last column rather than a fourth fixed width. Satori sizes
 * these content-box, so four fixed widths left an 88px dead strip on the right
 * that read as a fifth empty column. Letting `Days` absorb the remainder makes
 * the sheet fill its own window whatever the container works out to.
 */
function Cell({
  w,
  bg,
  children,
  right = false,
  bold = false,
  color = INK,
  grow = false,
}: {
  w?: number;
  bg: string;
  children?: React.ReactNode;
  right?: boolean;
  bold?: boolean;
  color?: string;
  grow?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        ...(grow ? { flexGrow: 1 } : { width: w }),
        height: ROW_H,
        alignItems: "center",
        justifyContent: right ? "flex-end" : "flex-start",
        padding: "0 18px",
        background: bg,
        ...(grow ? {} : { borderRight: `1px solid ${SHEET_GRID}` }),
        fontFamily: bold ? "Display" : "Body",
        fontSize: 21,
        color,
      }}
    >
      {children}
    </div>
  );
}

export default async function Image() {
  const [display, body] = await Promise.all([
    font("SchibstedGrotesk-Bold.ttf"),
    font("Geist-Regular.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "44px 56px 0",
          background: FIELD_A,
          /* The hero's own two washes: blue is the zone the student owns, cream
             is the zone Blotter maintains. Same semantics as the page. */
          backgroundImage:
            "radial-gradient(900px 520px at 0% -10%, #cfe0f6 0%, rgba(207,224,246,0) 62%)," +
            "radial-gradient(820px 480px at 100% -12%, #fbeac6 0%, rgba(251,234,198,0) 64%)",
        }}
      >
        {/* Brand and tagline, as the header now carries them. */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", fontFamily: "Display", fontSize: 30, letterSpacing: "-0.035em", color: NAVY_900 }}>
            Blotter
          </div>
          <div style={{ display: "flex", width: 1, height: 20, background: "rgba(18,35,61,0.18)" }} />
          <div style={{ display: "flex", fontFamily: "Body", fontSize: 17, letterSpacing: "0.1em", textTransform: "uppercase", color: NAVY_500 }}>
            Recruiting tracker for investment banking
          </div>
        </div>

        {/* The ratified headline, two tones, exactly as the page sets it. */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 26, fontFamily: "Display", fontSize: 46, lineHeight: 1.1, letterSpacing: "-0.028em" }}>
          <div style={{ display: "flex", color: INK }}>Your networking keeps moving.</div>
          <div style={{ display: "flex", color: NAVY_400 }}>Your tracker does not.</div>
        </div>

        {/* The tracker, bleeding off the bottom edge. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 30,
            borderRadius: "12px 12px 0 0",
            border: `1px solid ${SHEET_BORDER}`,
            borderBottom: "none",
            background: "#ffffff",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(18,35,61,0.10)",
          }}
        >
          {/* Sheets chrome, enough to be recognised and no more. */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, height: 54, padding: "0 18px", borderBottom: `1px solid ${SHEET_GRID}` }}>
            <div style={{ display: "flex", width: 26, height: 26, borderRadius: 5, background: "#0f9d58" }} />
            <div style={{ display: "flex", fontFamily: "Body", fontSize: 20, color: INK }}>IB Recruiting Tracker</div>
          </div>

          {/* Header row: the manual column, then the maintained band. */}
          <div style={{ display: "flex", borderBottom: `1px solid ${SHEET_GRID}` }}>
            <Cell w={COL.name} bg={MANUAL_100} bold>Name</Cell>
            <div style={{ display: "flex", flexGrow: 1, borderLeft: `3px solid ${BLOTTER_400}` }}>
              <Cell w={COL.status} bg={BLOTTER_100} bold>Status</Cell>
              <Cell w={COL.next} bg={BLOTTER_100} bold>Next move</Cell>
              <Cell bg={BLOTTER_100} bold right grow>Days</Cell>
            </div>
          </div>

          {ROWS.map((r) => (
            <div key={r.name} style={{ display: "flex", borderBottom: `1px solid ${SHEET_GRID}` }}>
              <Cell w={COL.name} bg={MANUAL_FILL}>{r.name}</Cell>
              <div style={{ display: "flex", flexGrow: 1, borderLeft: `3px solid ${BLOTTER_400}` }}>
                <div
                  style={{
                    display: "flex",
                    width: COL.status,
                    height: ROW_H,
                    alignItems: "center",
                    padding: "0 18px",
                    background: MAINTAINED_FILL,
                    borderRight: `1px solid ${SHEET_GRID}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", height: 32, padding: "0 14px", borderRadius: 16, background: r.bg, fontFamily: "Body", fontSize: 19, color: r.fg }}>
                    {r.status}
                  </div>
                </div>
                <Cell w={COL.next} bg={MAINTAINED_FILL} color={INK_MUTED}>{r.next}</Cell>
                <Cell bg={MAINTAINED_FILL} color={INK_MUTED} right grow>{r.days}</Cell>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Display", data: display, style: "normal", weight: 700 },
        { name: "Body", data: body, style: "normal", weight: 400 },
      ],
    },
  );
}
