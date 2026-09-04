import { NextResponse } from "next/server";

import { DESIGN_VERSION } from "../engine/rules";

/**
 * What the sheet should look like, as data.
 *
 * **Why this exists.** Every colour, column width and word in the `Start here`
 * tab used to live in the script. Changing one meant asking every student who
 * holds a copy to paste a new script — a cost that grows with every install and
 * never shrinks. Served from here, a design change reaches everybody on their
 * next run and nobody does anything.
 *
 * **Why it is a separate route rather than part of the engine's answer.** The
 * engine's response is per-run data that changes every fifteen minutes; this
 * changes about monthly. Carrying it on every run would put a payload on the
 * tightest budget in the system for no reason. Instead the engine returns a
 * short `design_version`, the courier compares it to the one it last applied,
 * and **only fetches this when they differ.** Steady state costs nothing.
 *
 * **Scope is deliberately the things that were already tables** — status
 * colours, theme colours, widths, number formats, the instruction rows, the
 * sort ranks. Conditional-format construction, merges and frozen panes stay in
 * the script: they change rarely and they are fiddlier to drive from data.
 *
 * **What this may never do.** It cannot say which columns are Blotter's. The
 * headings are the contract between the student's half of the sheet and
 * Blotter's, and a payload that could rename them could point Blotter at a
 * student's own column and overwrite it. The courier enforces that too; it is
 * said twice on purpose.
 */
export const runtime = "nodejs";

/** Cache at the edge: this changes monthly and is read by every install. */
export const revalidate = 300;

const DESIGN = {
  version: DESIGN_VERSION,

  /** Fill and text for each status chip. Hex only — the courier checks. */
  status_style: {
    "Not emailed": { bg: "#ffffff", fg: "#80868b" },
    Bounced: { bg: "#fce8e6", fg: "#c5221f" },
    Sent: { bg: "#dfe3e8", fg: "#3c4043" },
    Replied: { bg: "#e6f4ea", fg: "#137333" },
    "Call scheduled": { bg: "#e8f0fe", fg: "#1967d2" },
    "Call done": { bg: "#fef7e0", fg: "#b06000" },
    "Call cancelled": { bg: "#f1f3f4", fg: "#5f6368" },
    Closed: { bg: "#ffffff", fg: "#bdc1c6" },
  },

  /** Column widths, by heading. Headings the courier does not know are ignored. */
  widths: {
    contacts: {
      Name: 160, Title: 150, Firm: 150, Email: 210, Status: 120, Days: 62,
      "Last contact": 100, Attempts: 78, "Next call": 130, "Last call": 100,
      Closed: 70,
    },
    found: { "Add?": 84, Name: 150, Email: 200, "First seen": 100, Context: 340 },
  },

  /** How dates read in the sheet. */
  number_formats: {
    "Last contact": "m/d/yy",
    "Last call": "m/d/yy",
    "Next call": 'm/d "@" h:mm AM/PM',
  },

  /**
   * The order `Sort by state` puts things in. Jon's, ruled September 3:
   * every email state together, then the call states, then the finished ones.
   */
  state_rank: {
    Replied: 10, Sent: 20, Bounced: 25, "Not emailed": 30,
    "Call done": 40, "Call scheduled": 50, "Call cancelled": 55, Closed: 90,
  },

  /**
   * The `Start here` tab, as records the courier knows how to render.
   *
   * `kind` is a fixed vocabulary — the courier knows how to draw a `h2`, a
   * `step`, a `status` chip. **A new kind still needs a new script**, which is
   * the honest boundary: new instances are free, new sorts of thing are not.
   */
  instructions: null as null | Array<{ kind: string; a: string; b?: string }>,
};

export async function GET() {
  return NextResponse.json(DESIGN, {
    headers: { "cache-control": "public, max-age=300, s-maxage=300" },
  });
}
