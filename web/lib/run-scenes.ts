/**
 * One run of the script, in seven scenes. The storyboard for the drawing on
 * `/audit`, the filmstrip, the block appended to the audit package, and the
 * self-test that ties every scene to a function in the published code.
 *
 * ## The three rules the drawing is under
 *
 * The body of every message is hatched and never lights up. Envelopes that do
 * not match fade and never come back. The server is a dashed box and nothing
 * is ever drawn inside it, because the code cannot prove what happens there
 * and a drawing that showed the inside would be claiming to.
 *
 * ## Why the captions live here and not in the component
 *
 * `claimsText()` appends them to the package a student pastes into an AI, so
 * the drawing is checked against the code along with everything else the site
 * says. `app/audit/selftest.ts` asserts every function named below exists in
 * `public/Code.gs`. A caption that drifts from the code fails a test before it
 * reaches a reader.
 *
 * Captions are 26 words or fewer so a slow reader has each one before the
 * scene moves on.
 */

export interface Scene {
  n: number;
  caption: string;
  /** Functions in `Code.gs` this scene shows. Checked by the self-test. */
  fns: string[];
  seconds: number;
}

export const SCENES: Scene[] = [
  {
    n: 1,
    caption:
      "Every 15 minutes by day and every two hours overnight, the script in your sheet wakes up. Nothing on our side starts it.",
    fns: ["runCourier", "shouldWorkNow_"],
    seconds: 6,
  },
  {
    n: 2,
    caption:
      "It searches your Gmail for conversations with the people in your Contacts tab. Other conversations are never opened.",
    fns: ["readContacts_", "fetchThreads_"],
    seconds: 5,
  },
  {
    n: 3,
    caption:
      "It reads the outside of every message in those conversations: who wrote, who received, when, the subject line. Not the text.",
    fns: ["splitHeaderParts_", "namedAddressList_"],
    seconds: 6,
  },
  {
    n: 4,
    caption:
      "One exception. A delivery-failure notice is opened, to find the addresses that bounced. Only the addresses travel.",
    fns: ["isBounceSender_", "failedRecipientsFrom_"],
    seconds: 5,
  },
  {
    n: 5,
    caption:
      "It reads calendar events where a contact is a guest, or where their first name and firm are both in the title.",
    fns: ["fetchEvents_", "firmInTitle_"],
    seconds: 5.5,
  },
  {
    n: 6,
    caption:
      "Those facts go to our server, with your contacts, your own addresses and the sheet's random id. Subject lines included. Message text never goes.",
    fns: ["postToServer_"],
    seconds: 6.5,
  },
  {
    n: 7,
    caption:
      "The server works out each status and answers, and your sheet writes it in. We say the server keeps nothing. The code cannot prove that.",
    fns: ["validateResponse_", "writeBlotterColumns_"],
    seconds: 7,
  },
];

export const DURATIONS = SCENES.map((s) => s.seconds);
export const TOTAL_SECONDS = DURATIONS.reduce((a, b) => a + b, 0);

/** What the drawing shows. Fixed, made up, and obviously so. */
export const SAMPLE = {
  contacts: [
    { name: "Priya Shah", firm: "Evercore", status: "Replied", days: "3", chip: "replied" },
    { name: "Tom Lee", firm: "Moelis", status: "Call scheduled", days: "—", chip: "scheduled" },
    { name: "Ana Ruiz", firm: "Jefferies", status: "Not emailed", days: "—", chip: "noreply" },
  ],
  message: {
    from: "Priya Shah",
    to: "you",
    cc: "Dan Ortiz",
    ccNote: "copied in, not your contact, still read",
    date: "Tue 2 Sep, 9:14 am",
    subject: "Re: Coffee next week",
  },
  bounce: {
    from: "Mail Delivery Subsystem",
    address: "ana.ruiz@jefferies.com",
  },
  event: { title: "Coffee · Tom · Moelis", first: "Tom", firm: "Moelis" },
  packet: ["who · to · cc · when", "subject lines", "your contacts", "your addresses", "sheet id", "Gmail ids", "matching events"],
} as const;

/** The captions as one block, for the package a student pastes into an AI. */
export function captionsBlock(): string {
  return SCENES.map((s) => `${s.n}. ${s.caption}`).join("\n");
}
