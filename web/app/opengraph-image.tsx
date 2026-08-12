import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

/**
 * The share card.
 *
 * ## What this is and why it exists
 *
 * When a link is pasted into Reddit, X, LinkedIn, Slack or iMessage, the
 * platform fetches the page and looks for Open Graph tags to build a preview.
 * With none, it renders a bare blue URL.
 *
 * **Blotter had none.** Production served a `<meta name="description">` and
 * nothing else: no `og:image`, no `og:title`, no `twitter:card`. Every link Jon
 * posted would have gone out as a naked address, on the exact channel his
 * organic promotion depends on. Found on August 11, 2026 while checking whether
 * to delist the site, which was the smaller question of the two.
 *
 * ## Why this is generated rather than a PNG in `public/`
 *
 * A committed PNG goes stale the moment the headline changes, and nothing in
 * the build would catch it. This composes from the same ratified strings the
 * page uses, so the card cannot drift from the page it previews.
 *
 * ## The fonts, and a constraint worth knowing
 *
 * Satori, which renders this, **cannot read WOFF2** — it takes TTF, OTF or
 * WOFF. Every face on this site is WOFF2, delivered by `next/font` under a
 * content-hashed filename that changes each build, so neither the served fonts
 * nor `social/inline-fonts.sh`'s hardcoded paths can be reused here.
 *
 * So the two faces this card needs are committed as TTF in `_og-fonts/`. The
 * leading underscore keeps the directory out of Next's route resolution. They
 * are the same Google-hosted families `layout.tsx` loads, at the two weights
 * this composition uses, so the card is set in the same metal as the page.
 *
 * ## The composition
 *
 * Deliberately not a screenshot of the product. At 1200x630, shrunk again to a
 * few hundred pixels in a Reddit feed, the sheet's 13px type is illegible and
 * the card reads as grey mush. What survives that treatment is one large line
 * of type and one strong colour field, so the card is the headline, the brand,
 * and the page's own hero gradient.
 *
 * The maintained-zone cream and the manual-zone blue are the page's semantic
 * pair, so the card is recognisably this product's before a word is read.
 */

export const alt =
  "Blotter, the recruiting tracker for investment banking. Your networking keeps moving. Your tracker does not.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Sampled from `globals.css`. Kept literal because Satori resolves no CSS variables. */
const INK = "#14181f";
const NAVY_400 = "#647fa6";
const NAVY_500 = "#40608c";
const NAVY_900 = "#12233d";
const FIELD_A = "#fbfcfe";
const BLOTTER_400 = "#d9b64a";

async function font(file: string) {
  return readFile(path.join(process.cwd(), "app", "_og-fonts", file));
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
          justifyContent: "space-between",
          padding: "72px 80px",
          background: FIELD_A,
          /* The hero's own two washes: the blue is the zone the student owns,
             the cream is the zone Blotter maintains. Same semantics as the
             page, so the card is recognisable before it is read. */
          backgroundImage:
            "radial-gradient(900px 520px at 0% -10%, #cfe0f6 0%, rgba(207,224,246,0) 62%)," +
            "radial-gradient(820px 480px at 100% -12%, #fbeac6 0%, rgba(251,234,198,0) 64%)",
        }}
      >
        {/* Brand, with the tagline the header now carries. */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Display",
              fontSize: 34,
              letterSpacing: "-0.035em",
              color: NAVY_900,
            }}
          >
            Blotter
          </div>
          <div style={{ display: "flex", width: 1, height: 22, background: "rgba(18,35,61,0.18)" }} />
          {/*
            **A truncation of the ratified eyebrow, and the one deviation on
            this card.** `01-HERO` fixes it as "The smart recruiting tracker for
            investment banking and high-finance networking" — 79 characters,
            which needs about 950px at this size and leaves no room beside the
            wordmark in 1040px of usable width. Shortening beats shrinking it to
            unreadable or wrapping the brand row.

            No claim is added or changed; the two dropped clauses are a
            qualifier and a second audience. Flagged for Jon rather than
            smuggled.
          */}
          <div
            style={{
              display: "flex",
              fontFamily: "Body",
              fontSize: 19,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: NAVY_500,
            }}
          >
            Recruiting tracker for investment banking
          </div>
        </div>

        {/* The ratified headline, in two tones exactly as the page sets it. */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Display",
            fontSize: 64,
            lineHeight: 1.08,
            letterSpacing: "-0.028em",
          }}
        >
          <div style={{ display: "flex", color: INK }}>Your networking keeps moving.</div>
          <div style={{ display: "flex", color: NAVY_400 }}>Your tracker does not.</div>
        </div>

        {/* The supporting line, and the maintained-zone rule as a signature. */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", width: 46, height: 3, background: BLOTTER_400 }} />
          <div
            style={{
              display: "flex",
              fontFamily: "Body",
              fontSize: 27,
              color: "#5f6368",
            }}
          >
            Blotter keeps the Google Sheet you already use current.
          </div>
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
