/**
 * Four voices for the page's copy, for comparison behind `/review/voice`.
 *
 * ## Why this exists
 *
 * Jon, August 12, 2026: the page is written as semi-professional SaaS marketing
 * and is read by 19 to 21 year old investment-banking recruits who are online
 * all day and unusually good at spotting marketing language. His judgement is
 * that the register costs more than it earns, and he has **explicitly overridden
 * the specs** to test it. `04` carries that ruling.
 *
 * ## Scope
 *
 * **Text only.** Every visual asset is untouched: the films, the sheet, the
 * trajectory diagram, the Outstanding view, the share card, the funnel. Nothing
 * here changes a layout, a size or a colour.
 *
 * ## The four
 *
 * - `og` — exactly what is live today. The control, verbatim, so a comparison
 *   is against the real thing rather than a paraphrase of it.
 * - `a` — **Jon's own direction**, his words wherever he supplied them. Marked
 *   per string below, because a later reader needs to know which lines are his
 *   and which are mine.
 * - `b` — same spirit, drier. Plain and deadpan, no marketing, no reaching.
 * - `c` — same spirit, pushed hardest. Emotional and predictive.
 *
 * ## The rule the drafting followed
 *
 * The lines that land hardest are the ones that **predict the reader's future**
 * rather than describe the product — *you will forget someone who wanted to help
 * you*. A prediction is harder to shrug off than an adjective, and it costs none
 * of the credibility the page needs three sections later when it asks to read
 * a stranger's Gmail.
 *
 * `og`'s strings stay verbatim and remain the default everywhere, so `/` is
 * unchanged by this file's existence.
 */

export type VoiceId = "og" | "a" | "b" | "c";

export interface Voice {
  id: VoiceId;
  label: string;
  note: string;

  heroEyebrow: string;
  heroHeadline: { lead: string; tail: string };
  heroSupporting: string;
  /**
   * The live line is `Built by a <b>former Goldman Sachs banker</b> for
   * recruitment.`, with fixed words either side of the emphasis. Voices that
   * change the middle also change what has to sit around it, so all three parts
   * travel together. `tail` may be empty.
   */
  heroAuthority: { lead: string; emph: string; tail: string };

  scaleEyebrow: string;
  scaleHeadline: string;
  scaleBody: string;

  keepHeadline: string;
  keepSub: string;
  keepBody: string;
  keepBullets: [string, string, string];

  actionsHeadline: string;
  actionsBody: string;

  extraFaq: Array<{ q: string; a: string }>;
}

/**
 * The hero headline is two spans, the second in a lighter ink. Splitting it
 * here keeps that treatment intact across all four voices rather than making
 * the review route special-case it.
 */

export const VOICES: Record<VoiceId, Voice> = {
  og: {
    id: "og",
    label: "OG",
    note: "Live today. The control, verbatim.",

    heroEyebrow:
      "The smart recruiting tracker for investment banking and high-finance networking",
    heroHeadline: {
      lead: "Your networking keeps moving.",
      tail: "Your tracker does not.",
    },
    heroSupporting: "Blotter keeps the Google Sheet you already use current.",
    heroAuthority: { lead: "Built by a", emph: "former Goldman Sachs banker", tail: "for recruitment." },

    scaleEyebrow: "The scale of a recruiting cycle",
    scaleHeadline: "Your manual tracker was never built to keep up with this.",
    scaleBody:
      "A manual tracker changes only when you remember to update it, so at this volume it inevitably falls behind reality. Deadlines, follow-ups, and next steps begin slipping through the cracks.",

    keepHeadline: "Keep the tracker you already built.",
    keepSub: "You manage the relationships. Blotter maintains the moving parts.",
    keepBody:
      "Blotter creates a standardized recruiting view in a new tab and keeps the changing activity current from Gmail and Calendar.",
    keepBullets: [
      "Keep your existing tracker",
      "No re-entering every contact",
      "No switching out of Google Sheets",
    ],

    actionsHeadline: "Know exactly what needs your attention.",
    actionsBody:
      "Stop reconstructing your next moves from Gmail, Calendar, and memory. Blotter gives you one current view of every action you owe.",

    extraFaq: [],
  },

  a: {
    id: "a",
    label: "A — Jon",
    note: "Jon's own direction. His words wherever he gave them.",

    /* Jon's, verbatim. */
    heroEyebrow: "The non-AI slop tracker that actually saves you time",
    /* Mine, built to his register. He gave no hero headline. */
    heroHeadline: { lead: "You will lose track.", tail: "Everyone does." },
    heroSupporting: "Blotter keeps the Google Sheet you already use current.",
    /* Jon's, verbatim. */
    heroAuthority: { lead: "Built by", emph: "someone who actually went through IB recruitment", tail: "" },

    /* Jon's, verbatim. */
    scaleEyebrow: "The volume of an intense recruiting cycle",
    scaleHeadline: "Your Google Sheet won't keep up with this.",
    scaleBody:
      "628 recruiting emails. 68 coffee chats. 30 interview rounds. You will forget things. You will lose track. That is just what happens at this volume. Stuff will inevitably begin to slip through the cracks.",

    /* Jon's, verbatim. */
    keepHeadline: "You already have a tracker. Keep it.",
    /* Mine. He marked the current subheader as needing improvement. */
    keepSub: "You handle the people. Blotter handles the updating.",
    /* Jon's, verbatim. */
    keepBody:
      "Blotter creates a clean view in a new tab and keeps the changing activity current from Gmail and Calendar.",
    keepBullets: [
      "Keep the tracker you already built",
      "Don't re-enter every contact",
      "Don't leave Google Sheets",
    ],

    /* Jon's, verbatim. */
    actionsHeadline: "Everything you still owe",
    /* Mine. He marked the body as needing improvement. */
    actionsBody:
      "Replies you owe, follow-ups that are due, thank-yous you never sent. Rebuilt every time something changes, so you stop reconstructing it out of Gmail and memory.",

    extraFaq: [
      /* Jon's, verbatim, and funnier bare than padded. */
      { q: "Will AI take my analyst role?", a: "Probably." },
      {
        q: "Am I cooked in this job market?",
        a: "Yes. So is everyone. The ones who aren't are the ones who answered their emails.",
      },
    ],
  },

  b: {
    id: "b",
    label: "B — dry",
    note: "Same spirit, deadpan. Nothing reaching for a reaction.",

    heroEyebrow:
      "The tracker for investment banking and high-finance networking",
    heroHeadline: {
      lead: "Your tracker is already",
      tail: "out of date.",
    },
    heroSupporting: "Blotter keeps the Google Sheet you already use current.",
    heroAuthority: { lead: "Built by", emph: "a former Goldman Sachs banker", tail: "who did this last year." },

    scaleEyebrow: "One real recruiting cycle, counted",
    scaleHeadline: "No spreadsheet survives this.",
    scaleBody:
      "A spreadsheet only changes when you remember to change it, and at this volume you will not remember. Replies go unanswered. Follow-ups get skipped. You find out weeks later, if you find out at all.",

    keepHeadline: "Keep your sheet. Seriously.",
    keepSub: "You do the networking. Blotter does the data entry.",
    keepBody:
      "Blotter adds a clean view in a new tab and keeps it current from Gmail and Calendar. Your original stays exactly as you left it.",
    keepBullets: [
      "Keep the sheet you already built",
      "No re-entering contacts",
      "No new app to learn",
    ],

    actionsHeadline: "Everything you owe, in one list",
    actionsBody:
      "Every reply you owe, every follow-up due, every thank-you still unsent. One list, current, without you rebuilding it out of Gmail every Sunday.",

    extraFaq: [
      { q: "Will AI take my analyst role?", a: "Probably." },
      {
        q: "Am I cooked in this job market?",
        a: "Statistically, a bit. Not because of your spreadsheet though.",
      },
    ],
  },

  c: {
    id: "c",
    label: "C — hardest",
    note: "Same spirit, pushed furthest. Predicts the reader rather than describing the product.",

    heroEyebrow: "No AI. No slop. The tracker you already have, kept current.",
    heroHeadline: {
      lead: "You will forget someone",
      tail: "who wanted to help you.",
    },
    heroSupporting:
      "Blotter keeps the Google Sheet you already use current. That is the whole product.",
    heroAuthority: { lead: "Built by", emph: "someone who sent 628 cold emails", tail: "and lived." },

    scaleEyebrow: "What five months actually looks like",
    scaleHeadline: "This is what you are signing up for.",
    scaleBody:
      "628 emails. 68 coffee chats. 30 interview rounds. Nobody keeps that current by hand, and you will not be the first. You will miss a reply from someone who was trying to help you, and you will find out about it in April.",

    keepHeadline: "You built a tracker. Keep it.",
    keepSub: "You talk to people. Blotter writes it down.",
    keepBody:
      "It adds one tab to your sheet and keeps that tab current from Gmail and Calendar. Everything you already built stays exactly where it is.",
    keepBullets: [
      "Your sheet stays yours",
      "Nothing to re-enter",
      "Never leave Google Sheets",
    ],

    actionsHeadline: "The list you keep meaning to make",
    actionsBody:
      "You already know there are people waiting on you right now. This is the list of who, and it is current whether or not you remembered to update anything.",

    extraFaq: [
      { q: "Will AI take my analyst role?", a: "Probably." },
      {
        q: "Am I cooked in this job market?",
        a: "Everyone is cooked. The ones who get offers are the ones who answered their emails.",
      },
    ],
  },
};

export const VOICE_ORDER: VoiceId[] = ["og", "a", "b", "c"];

export function isVoiceId(value: string | null | undefined): value is VoiceId {
  return value === "og" || value === "a" || value === "b" || value === "c";
}
