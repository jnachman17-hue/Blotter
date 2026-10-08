/**
 * What the server receives and what it returns, field by field, in plain
 * English. Published on `/code#shapes`, beside the code that sends them, and
 * linked from `/status`.
 *
 * ## Why this and not the engine
 *
 * Jon's ruling, 5 September 2026: the engine's rules stay unpublished, but the
 * exact shapes on the wire are public. That is the right line. How a status is
 * decided is the product. What crosses the wire is the reader's business, and
 * a list of every field is the only honest way to say "this, and nothing else".
 *
 * ## The rule
 *
 * This is a transcription of `app/api/engine/types.ts`, which is itself a
 * transcription of `05-CONTRACT.md`. **If a field exists there and not here,
 * this file is wrong.** `selftest.ts` compares the two so it cannot drift: every
 * key on a request the server accepts has to have a row here.
 */

export interface Field {
  name: string;
  means: string;
}

export interface Shape {
  name: string;
  /** One sentence on what this block is. */
  purpose: string;
  fields: Field[];
}

/** `POST /api/engine`: what the sheet sends, every run. */
export const REQUEST: Shape[] = [
  {
    name: "About the request",
    purpose: "Which sheet is asking, and which version of the agreement it speaks.",
    fields: [
      { name: "version", means: "Which version of this agreement the sheet speaks. The server accepts exactly one." },
      { name: "key", means: "Whatever is in the sheet's Blotter key cell. Blank for almost everyone; billing is switched off." },
      { name: "install_id", means: "The sheet's random id. The same one shown as your Blotter ID in Settings." },
      { name: "courier_version", means: "Which version of the script is asking, so an old one can be told." },
      { name: "now", means: "The sheet's idea of the current time. The server never uses its own clock." },
    ],
  },
  {
    name: "student",
    purpose: "Who you are, as far as mail is concerned.",
    fields: [
      { name: "addresses", means: "Your own email addresses, from Settings. Without them the server cannot tell a message you sent from one you received." },
    ],
  },
  {
    name: "contacts[]",
    purpose: "One entry per person in your Contacts tab.",
    fields: [
      { name: "row", means: "Which row they are on, so the answer can be written back to the right place." },
      { name: "name", means: "Their name, as you typed it." },
      { name: "firm", means: "Their firm, as you typed it. Used to match a calendar event by its title." },
      { name: "emails", means: "Every address you have for them." },
      { name: "closed", means: "Whether you ticked Closed." },
    ],
  },
  {
    name: "threads[] → messages[]",
    purpose: "The outside of every message in every conversation that involves one of your contacts.",
    fields: [
      { name: "thread_id", means: "Gmail's own reference for the conversation." },
      { name: "id", means: "Gmail's own reference for the message." },
      { name: "date", means: "When it was sent." },
      { name: "from", means: "Who wrote it. The name and the address, if the email carried a name." },
      { name: "to", means: "Everyone it went to." },
      { name: "cc", means: "Everyone copied in." },
      { name: "subject", means: "The subject line." },
      { name: "failed_recipients", means: "Only on a delivery-failure notice: every email address found in the notice, except the mail system's own. Blank on every other message." },
      { name: "is_outbound", means: "Whether you sent it, worked out in the sheet from your own addresses." },
    ],
  },
  {
    name: "events[]",
    purpose: "Calendar events that match a contact: one of them is a guest, or their first name and firm both appear in the title.",
    fields: [
      { name: "id", means: "Google's own reference for the event." },
      { name: "title", means: "The title." },
      { name: "start", means: "When it starts." },
      { name: "end", means: "When it ends." },
      { name: "attendees", means: "Everyone invited." },
      { name: "declined", means: "Anyone who answered No." },
      { name: "organizer", means: "Who set it up." },
    ],
  },
  {
    name: "ignored[]",
    purpose: "Addresses you rejected on the Found tab, so they are not suggested again.",
    fields: [{ name: "(each entry)", means: "One email address." }],
  },
];

/** What is deliberately absent, said out loud. */
export const REQUEST_NEVER: string[] = [
  "The text of any email. There is no field for it. Since version 4 of the agreement the server refuses a request that carries one.",
  "Attachments.",
  "Your password, or any login for your Google account.",
  "Anything from a conversation that does not involve one of your contacts.",
];

/** `POST /api/engine`: what comes back. */
export const RESPONSE: Shape[] = [
  {
    name: "rows[]",
    purpose: "One entry per contact you sent, in the same order.",
    fields: [
      { name: "row", means: "Which row it belongs to." },
      { name: "status", means: "One of exactly eight words: Not emailed, Bounced, Sent, Replied, Call scheduled, Call done, Call cancelled, Closed." },
      { name: "days", means: "How long it has been like that, where that number means something." },
      { name: "last_contact", means: "The date of the last message either way." },
      { name: "attempts", means: "How many times you have written since they last wrote back." },
      { name: "next_call", means: "When the next call is, if one is booked." },
      { name: "last_call", means: "When the last call was." },
    ],
  },
  {
    name: "found[]",
    purpose: "People who appeared in those conversations and are not in your Contacts tab yet. Suggested, never added.",
    fields: [
      { name: "email", means: "Their address." },
      { name: "name", means: "Their name, if the email carried one. Never invented from the address." },
      { name: "first_seen", means: "The date they first appeared." },
      { name: "context", means: "A sentence saying where: which conversation, with whom." },
    ],
  },
  {
    name: "Also in the answer",
    purpose: "Housekeeping.",
    fields: [
      { name: "version", means: "The same agreement version echoed back." },
      { name: "warnings", means: "Things worth knowing that are not errors: an address in two spellings, an event that matched nobody." },
      { name: "design_version", means: "A label for the sheet's current look. When it changes, the sheet fetches the new look." },
      { name: "notice", means: "A message for you, shown at the top of the Contacts tab. Used to tell you a newer script exists, or that a run was refused and why." },
    ],
  },
];

/**
 * `GET /api/design`: what comes back when the server says the sheet's look has
 * changed. Nothing about the student goes out on this request; it is a plain
 * GET with no body. What comes back can change how the sheet looks and what
 * its Start here tab says, which is why it is listed here rather than left
 * for a reviewer to find (finding 2.8).
 */
export const DESIGN: Shape = {
  name: "The design fetch",
  purpose:
    "Fetched when the server's answer carries a new design label. Nothing about you goes out on it. It can change how the sheet looks and what the Start here tab says.",
  fields: [
    { name: "version", means: "A label for this look. The sheet keeps the last one it applied and fetches only when it changes." },
    { name: "status_style", means: "A background and text colour for each of the eight statuses." },
    { name: "widths", means: "Column widths for the Contacts and Found tabs." },
    { name: "number_formats", means: "How the three date columns are displayed." },
    { name: "state_rank", means: "The order the 'sort by state' menu item uses." },
    { name: "instructions", means: "The rows of the Start here tab: headings, paragraphs, steps and pictures. Free text, up to 200 rows." },
  ],
};

/** `POST /api/telemetry`: the counting ping, sent after every run. */
export const TELEMETRY: Shape = {
  name: "The counting ping",
  purpose: "How many sheets are running. Clearing one cell in Settings switches it off.",
  fields: [
    { name: "install_id", means: "The sheet's random id." },
    { name: "contract_version", means: "Which agreement version." },
    { name: "courier_version", means: "Which script version." },
    { name: "at", means: "When the run happened." },
    { name: "contacts", means: "How many contacts were in the sheet. The number." },
    { name: "seconds", means: "How long the run took." },
    { name: "ok", means: "Whether it worked." },
  ],
};
