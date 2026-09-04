/**
 * Canonical spreadsheet data.
 *
 * Every value here is fixed by a ratified build specification. Do not invent,
 * extend, or "improve" a row: 01-HERO section 6 forbids adding Email, Group,
 * Notes, Priority, Location, LinkedIn, Owner, Stage, or any other field to the
 * hero, and 05-SECTION-5 fixes the ten-column preservation view exactly.
 *
 * The five contacts are consistent across every surface on January 16, 2026.
 *
 * ## The names changed on August 12, 2026
 *
 * Jon's decision. The originals were generic to the point of being a tell —
 * `Sarah Chen` is the name every AI-built site reaches for — and the page is
 * about to be promoted to an audience that would notice. The replacements are
 * **near-miss parodies of finance figures**: recognisable to the reader this
 * page is for, and evidence a human wrote it.
 *
 * They are deliberately *not* the real names. Using a real, identifiable
 * person's name in commercial material is a right-of-publicity question
 * independent of whether anything defamatory is said, and the near-miss lands
 * the same joke without raising it. Two of the puns also do double duty on the
 * product's own mechanic — Blotter *syncs*, hence `Larry Sync`.
 *
 * | Row | Was | Now | Firm was | Firm now |
 * |---|---|---|---|---|
 * | 1 | Sarah Chen | Jamie Diamond | JPMorgan | JPMorgan |
 * | 2 | Marcus Lee | David Salmon | Evercore | Goldman Sachs |
 * | 3 | Priya Shah | Ken Molise | Lazard | Moelis & Co |
 * | 4 | Daniel Kim | Larry Sync | Morgan Stanley | BlackRock |
 * | 5 | Alex Morgan | Jerome Bowel | Centerview | Carlyle |
 *
 * Firms track the parodied figure so the joke resolves; Carlyle is where Powell
 * actually was before the Fed. **Comments in this file that record a dated
 * ruling keep the name in force at the time** — the August 5 cue swap really
 * was from Alex Morgan, and rewriting that would falsify the record.
 *
 * ⚠ **Names here are longer than the ones the column widths were measured
 * against**: the widest was 11 characters, the widest now is 13. The Name
 * column was verified against the built page after the rename rather than
 * assumed. If a name is ever changed again, re-check it — this file does not
 * control the widths and nothing will fail loudly.
 *
 * Revert point: git tag `pre-parody-and-waitlist-2026-08-12`.
 */

import type { SheetColumn, SheetRow } from "@/components/sheet/sheet-grid";
import type { Status } from "@/components/sheet/status-chip";

/* ------------------------------------------------------- hero (01-HERO §6) */

/*
 * Widths reproduce the measured geometry of the ratified hero at a 1006px
 * SheetWindow: 43px row gutter, manual zone 43 to 415, maintained zone 415 to
 * 1005. Manual columns sum to 372, maintained to 590.
 */
export const HERO_COLUMNS: SheetColumn[] = [
  // Manual zone totals 372px. Widths fit the longest value in each column
  // without clipping: "Jamie Diamond", "Vice President", "BlackRock".
  { header: "Name", width: "w-[108px]" },
  { header: "Title", width: "w-[126px]", kind: "italic" },
  { header: "Firm", width: "w-[138px]" },
  { header: "Status", width: "w-[132px]", kind: "status" },
  { header: "Next move", width: "w-[156px]" },
  { header: "Last contact", width: "w-[112px]" },
  { header: "Days", width: "w-[56px]", align: "right" },
  { header: "Call", width: "w-[134px]" },
];

export const HERO_ROWS: SheetRow[] = [
  {
    // Cue-linked: "Jamie Diamond replied", Jan 16 10:42 AM
    emphasised: true,
    cells: [
      "Jamie Diamond",
      "Associate",
      "JPMorgan",
      { status: "Replied" },
      "Reply to Jamie",
      "1/16/26",
      "0",
      null,
    ],
  },
  {
    // Cue-linked: "Coffee chat with David Salmon", Jan 17 2:00 PM
    //
    // Marker for the cue swap below: rows 0, 1 and 3 are now cue-linked.
    emphasised: true,
    cells: [
      "David Salmon",
      "Analyst",
      "Goldman Sachs",
      { status: "Call scheduled" },
      "Attend coffee chat",
      "1/15/26",
      "1",
      "1/17 @ 2:00 PM",
    ],
  },
  {
    // No cue. Retains baseline maintained tint, not de-emphasised.
    cells: [
      "Ken Molise",
      "Vice President",
      "Moelis & Co",
      { status: "Call completed" },
      "Send thank-you",
      "1/16/26",
      "0",
      "Completed 1/16",
    ],
  },
  {
    // Cue-linked: "No reply for 5 days", last contact Jan 11.
    //
    // Jon swapped this cue in from Alex Morgan on August 5, 2026. Silence is
    // the stronger proof: a reply is bolded in the reader's inbox and they can
    // notice it themselves, whereas nothing at all arrives to mark a thread
    // going quiet.
    emphasised: true,
    cells: [
      "Larry Sync",
      "Associate",
      "BlackRock",
      { status: "No reply" },
      "Bump thread",
      "1/11/26",
      "5",
      null,
    ],
  },
  {
    // No cue since August 5, 2026, when Jon swapped the third cue to Daniel
    // Kim. The row itself is unchanged and stays in the sheet.
    //
    // `Next move` still carries the em dash, muted and centred, exactly as
    // hero-reference-v1.png draws it. Jon reinstated it on August 5, 2026,
    // reversing his August 4 removal and overriding the 01-HERO section 6
    // genuinely-blank rule for this one cell. That ruling is about the cell,
    // not the cue, so removing the cue does not disturb it. Authority level 1.
    cells: [
      "Jerome Bowel",
      "Analyst",
      "Carlyle",
      { status: "Sent" },
      { dash: true },
      "1/16/26",
      "0",
      null,
    ],
  },
];

/* ------------------------------ hero activity cues (01-HERO §7, exact copy) */

export interface ActivityCue {
  source: "gmail" | "calendar";
  primary: string;
  timestamp: string;
  /** Zero-based index of the hero row this cue maps to. */
  targetRow: number;
}

/* ------------------------------------------ Section 3 (03-SECTION-3, rebuilt) */

/**
 * The three moments of January 16, 2026, a Friday.
 *
 * Jon overruled `03-SECTION-3` §7's formal-exact asset on August 5, 2026 and
 * ruled the mechanism rebuilt as a day rather than a left-to-right pipeline.
 * The three moments are deliberately one of each trigger type: nothing
 * arriving, a Gmail reply, a Calendar event.
 *
 * Daniel opens it on Jon's instruction, replacing Alex Morgan. Silence is the
 * stronger proof — a person can notice a reply, because it is bolded in their
 * inbox; a person cannot notice silence.
 *
 * Every value here is already fixed elsewhere in ratified material. Daniel's
 * `No reply for 5 days` is the exact line from
 * `04-SECTION-4-OUTSTANDING-ACTIONS` §7, and his 1/11/26 and 5 match
 * `HERO_ROWS` above. Nothing is invented.
 */
export interface DayMoment {
  id: string;
  /** Left marker. Silence carries no clock time, which is the point. */
  stamp: string;
  substamp: string;
  /** `null` where nothing arrived from either source. */
  source: "gmail" | "calendar" | null;
  trigger: string;
  name: string;
  status: Status;
  next: string;
  last: string;
  days: string;
  call: string | null;
}

export const SECTION_3_MOMENTS: DayMoment[] = [
  {
    id: "daniel",
    stamp: "Day 5",
    substamp: "No new activity",
    source: null,
    trigger: "No reply for 5 days",
    name: "Larry Sync",
    status: "No reply",
    next: "Bump thread",
    last: "1/11/26",
    days: "5",
    call: null,
  },
  {
    id: "sarah",
    stamp: "10:42 AM",
    substamp: "Gmail",
    source: "gmail",
    trigger: "Jamie Diamond replied",
    name: "Jamie Diamond",
    status: "Replied",
    next: "Reply to Jamie",
    last: "1/16/26",
    days: "0",
    call: null,
  },
  {
    id: "priya",
    stamp: "2:00 PM",
    substamp: "Calendar",
    source: "calendar",
    trigger: "Coffee chat with Ken Molise",
    name: "Ken Molise",
    status: "Call completed",
    next: "Send thank-you",
    last: "1/16/26",
    days: "0",
    call: "Completed 1/16",
  },
];

export const HERO_CUES: ActivityCue[] = [
  {
    source: "gmail",
    primary: "Jamie Diamond replied",
    timestamp: "Jan 16 · 10:42 AM",
    targetRow: 0,
  },
  {
    /*
      Priya, not Marcus, and `Jan 16 · 11:00 AM`. Changed August 11, 2026 so
      the page agrees with `blotter-film-web-hero.html`, which is now the
      desktop hero. Jon: *"Make it match the film."*

      **This is the second of `01-HERO` §7's three ratified cues to be
      overridden by Jon**, after the third was swapped from Alex Morgan on
      August 5. Stated plainly so a later session reading the spec does not
      conclude the page has drifted.

      The film's calendar beat moves *one* contact through the transition —
      Priya goes `Call scheduled` to `Call completed` and `Attend coffee chat`
      to `Send thank-you` — where the old static hero showed Marcus and Priya
      frozen either side of it. Marcus keeps his forward-looking
      `1/17 @ 2:00 PM` and never moves, in the film and here.
    */
    source: "calendar",
    primary: "Coffee chat with Ken Molise",
    timestamp: "Jan 16 · 11:00 AM",
    targetRow: 2,
  },
  {
    /*
      Swapped from `Email sent to Jerome Bowel` — `Jan 16 · 8:18 AM` by Jon on
      August 5, 2026, overriding the third entry of `01-HERO` §7's exact cue
      list and the reasoning in its closing paragraph, which held that Daniel
      Kim's no-reply state should stay Blotter-maintained with no card shown.

      The copy is not invented: `04-SECTION-4-OUTSTANDING-ACTIONS` §7 already
      carries "No reply for 5 days" for Larry Sync, and the Jan 11 date is his
      ratified last contact, 1/11/26, in `HERO_ROWS` above.

      The source mark stays full-strength Gmail rather than the muted treatment
      Section 3 uses. Muting depends on Section 3's `NO NEW ACTIVITY` stamp to
      be legible; with no equivalent support in the hero it would read as a
      broken asset rather than as an absence.
    */
    source: "gmail",
    primary: "No reply for 5 days",
    timestamp: "Last contact Jan 11",
    targetRow: 3,
  },
];

/* ------------------------- Sections 4 and 5, merged (Jon, August 5, 2026) */

/**
 * The ten-column Blotter tab.
 *
 * Jon merged Sections 4 and 5 into one section with two beats on August 5,
 * 2026, on the grounds that the page was carrying three separate Google Sheets
 * windows and the reader files them as one repeated idea. The two beats are two
 * tabs of one file, which is what the product actually is.
 *
 * These five are the canonical contacts, identical to `HERO_ROWS` above with
 * Email and LinkedIn added, which `05-SECTION-5` §6 and §7 fix exactly.
 * Jerome Bowel's `next` is genuinely blank here: the em-dash exception is scoped
 * to the hero cell alone.
 */
export interface TrackerContact {
  name: string;
  title: string;
  firm: string;
  email: string;
  status: Status;
  next: string | null;
  last: string;
  days: string;
  call: string | null;
}

export const TRACKER_CONTACTS: TrackerContact[] = [
  { name: "Jamie Diamond", title: "Associate", firm: "JPMorgan", email: "jamie.diamond@jpmorgan.com", status: "Replied", next: "Reply to Jamie", last: "1/16/26", days: "0", call: null },
  { name: "David Salmon", title: "Analyst", firm: "Goldman Sachs", email: "david.salmon@gs.com", status: "Call scheduled", next: "Attend coffee chat", last: "1/15/26", days: "1", call: "1/17 @ 2:00 PM" },
  { name: "Ken Molise", title: "Vice President", firm: "Moelis & Co", email: "ken.molise@moelis.com", status: "Call completed", next: "Send thank-you", last: "1/16/26", days: "0", call: "Completed 1/16" },
  { name: "Larry Sync", title: "Associate", firm: "BlackRock", email: "larry.sync@blackrock.com", status: "No reply", next: "Bump thread", last: "1/11/26", days: "5", call: null },
  { name: "Jerome Bowel", title: "Analyst", firm: "Carlyle", email: "jerome.bowel@carlyle.com", status: "Sent", next: null, last: "1/16/26", days: "0", call: null },
];

/**
 * The Outstanding tab.
 *
 * Counts are ratified by `04-SECTION-4` §7 and reconcile exactly: 6 + 11 + 4 =
 * 21. Jamie Diamond, Larry Sync and Ken Molise are the ratified example rows.
 *
 * The other eighteen contacts are invented, and that is a deliberate decision
 * rather than an oversight. The section claims to be "one current view of every
 * action you owe", and the discarded asset undercut that claim by filling four
 * of its six rows with `+5 more`. Jon rejected both the placeholder rows and a
 * twenty-one-row stack; the three-column layout shows every action in thirteen
 * rows, which needs real names to fill.
 */
export interface ActionGroup {
  label: string;
  count: number;
  /** Group accent, used for the dot and the count. */
  rule: string;
  /** Group header fill. */
  tint: string;
  rows: { who: string; why: string }[];
}

export const OUTSTANDING_GROUPS: ActionGroup[] = [
  {
    label: "Replies owed", count: 6, rule: "#1a73e8", tint: "#eef4fd",
    rows: [
      { who: "Jamie Diamond", why: "Replied Jan 16" },
      { who: "Nathan Cole", why: "Replied Jan 15" },
      { who: "Amara Osei", why: "Replied Jan 15" },
      { who: "Ryan Patel", why: "Replied Jan 14" },
      { who: "Grace Lin", why: "Replied Jan 14" },
      { who: "Tomas Rivera", why: "Replied Jan 13" },
    ],
  },
  {
    label: "Follow-ups due", count: 11, rule: "#c9a227", tint: "#fdf8ec",
    rows: [
      { who: "Larry Sync", why: "No reply, 5 days" },
      { who: "Julia Fontaine", why: "No reply, 6 days" },
      { who: "Chris Whelan", why: "No reply, 7 days" },
      { who: "Nina Abbas", why: "No reply, 8 days" },
      { who: "Peter Nakamura", why: "No reply, 9 days" },
      { who: "Sofia Marchetti", why: "No reply, 10 days" },
      { who: "Andre Dumont", why: "No reply, 11 days" },
      { who: "Hannah Reyes", why: "No reply, 12 days" },
      { who: "Victor Oyelaran", why: "No reply, 13 days" },
      { who: "Claire Bennett", why: "No reply, 14 days" },
      { who: "Samir Haddad", why: "No reply, 16 days" },
    ],
  },
  {
    label: "Thank-you notes", count: 4, rule: "#0f9d58", tint: "#eef7f1",
    rows: [
      { who: "Ken Molise", why: "Chat completed Jan 16" },
      { who: "Elena Vasquez", why: "Chat completed Jan 15" },
      { who: "Jonah Feldman", why: "Call completed Jan 14" },
      { who: "Ivy Zhang", why: "Chat completed Jan 13" },
    ],
  },
];

export const OUTSTANDING_TOTAL = OUTSTANDING_GROUPS.reduce((n, g) => n + g.count, 0);

/**
 * The three reassurance claims.
 *
 * `05-SECTION-5` §4 ratified these as exact copy and **two of the three were
 * false**, which `28-WEBSITE-AUDIT.md` §1.8 found and Jon ruled on, September 3,
 * 2026: *"You don't actually keep your own sheet now."*
 *
 * A student copies Blotter's template and puts their contacts into it. The
 * script's only Drive permission is `spreadsheets.currentonly`, so it can reach
 * the one sheet it lives in and nothing else — **attaching to a tracker somebody
 * already built is not a missing feature, it is impossible under this
 * architecture**, and no later version fixes it without asking every student for
 * a much wider permission.
 *
 * | Was | Verdict |
 * |---|---|
 * | `Keep the tracker you already built` | **False.** They keep their columns, not their file |
 * | `Don't re-enter every contact` | **False as written.** One paste rather than typing, but it is a move |
 * | `Don't leave Google Sheets` | **True**, and it is the best thing about the product |
 *
 * The replacements are narrower and each one survives being checked. The third
 * is untouched.
 */
export const REASSURANCE = [
  "Paste in the list you already have",
  "Your own columns, untouched",
  "Don't leave Google Sheets",
];
