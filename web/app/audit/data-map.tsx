/**
 * One run of Blotter, as a single still picture.
 *
 * The seven-scene animation this replaced asked a reader to hold a sequence in
 * their head. Jon, who built the system, could not follow it. This is one
 * mental model instead: your account on the left with the three things in it,
 * a small labelled package leaving, our server on the right, a status coming
 * back. Nothing moves.
 *
 * The two details that do the work: the email is drawn with its header lines
 * legible and its body blacked out, and the calendar shows five events with
 * one matching. Those two pictures say what "reads the outside, not the text"
 * and "only events with your contacts" mean without either phrase.
 *
 * Real HTML text throughout, so it reflows at 375px and reads aloud. Sample
 * names are made up and obviously so.
 */

const HEADER_LINES: [string, string][] = [
  ["From", "Priya Shah"],
  ["To", "you"],
  ["Cc", "Dan Ortiz"],
  ["Date", "Tue 2 Sep, 9:14 am"],
  ["Subject", "Re: Coffee next week"],
];

const EVENTS = ["Gym", "Class", "Coffee · Tom · Moelis", "Dinner", "Study group"];

function Card({
  title,
  children,
  accent,
}: {
  title: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-3 sm:p-4 ${
        accent ? "border-blotter-400 bg-blotter-100" : "border-rule bg-white"
      }`}
    >
      <p className={`text-small font-semibold ${accent ? "text-blotter-700" : "text-ink"}`}>{title}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Arrow({ label, sub, back }: { label: string; sub?: string; back?: boolean }) {
  const colour = back ? "#5f6368" : "#12233d";
  return (
    <div className="flex items-center gap-3">
      {/* The flow runs down the page at every width. Authored SVG, not a glyph. */}
      <svg width="14" height="40" viewBox="0 0 14 40" aria-hidden="true" className="shrink-0">
        <line x1="7" y1={back ? 40 : 0} x2="7" y2={back ? 10 : 30} stroke={colour} strokeWidth="1.5" />
        <path d={back ? "M7 0 L1.5 10 h11 z" : "M7 40 L1.5 30 h11 z"} fill={colour} />
      </svg>
      <div>
        <p className="text-small font-semibold text-ink">{label}</p>
        {sub && <p className="text-micro leading-[1.45] text-ink-muted">{sub}</p>}
      </div>
    </div>
  );
}

export function DataMap() {
  return (
    <figure className="mt-8">
      <div className="grid gap-5">
        {/* ------------------------------------------------ your account */}
        <div className="rounded-xl border-[1.5px] border-navy-900 bg-surface-quiet p-4 sm:p-5">
          <p className="text-small font-semibold text-navy-900">Your Google account</p>
          <p className="mt-0.5 text-micro text-ink-muted">Everything that reads anything happens in here</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {/* Gmail: one message, header legible, body blacked out */}
            <Card title="Gmail">
              <div className="rounded border border-rule bg-white p-2.5 text-[12px] leading-[1.5]">
                {HEADER_LINES.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-2">
                    <span className="font-mono text-[11px] text-ink-muted">{k}</span>
                    <span className="text-ink">{v}</span>
                  </div>
                ))}
                <div className="mt-2 space-y-1" aria-label="The message text, which is not read">
                  <div className="h-2 rounded-sm bg-ink" />
                  <div className="h-2 w-[92%] rounded-sm bg-ink" />
                  <div className="h-2 w-[70%] rounded-sm bg-ink" />
                </div>
                <p className="mt-1.5 font-mono text-[11px] text-ink-muted">message text: not read</p>
              </div>
              <p className="mt-2 text-micro leading-[1.45] text-ink-muted">
                Only conversations with people in your Contacts tab. The outside of each message, never the text.
              </p>
            </Card>

            {/* Calendar: five events, one matching */}
            <Card title="Calendar">
              <ul className="space-y-1.5">
                {EVENTS.map((e) => {
                  const match = e.startsWith("Coffee");
                  return (
                    <li
                      key={e}
                      className={`rounded border px-2 py-1 text-[12px] ${
                        match
                          ? "border-navy-500 bg-white text-ink"
                          : "border-rule bg-white text-ink-faint"
                      }`}
                    >
                      {e}
                      {match && <span className="ml-2 font-mono text-[11px] text-navy-500">matches a contact</span>}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 text-micro leading-[1.45] text-ink-muted">
                Only events where a contact is invited, or their first name and firm are both in the title.
              </p>
            </Card>

            {/* The sheet */}
            <div className="sm:col-span-2">
              <Card title="Your Blotter sheet" accent>
                <p className="text-[12px] leading-[1.5] text-ink">
                  The script runs here, on your account&rsquo;s own permission. It reads the two things
                  above, sends the facts, and writes the answer into these columns.
                </p>
              </Card>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------ the two arrows */}
        <div className="grid gap-4 px-2 sm:grid-cols-2 sm:px-6">
          <Arrow label="A small package leaves" sub="who, to, when, subject; matching events; your contacts" />
          <Arrow label="A status comes back" sub="one word per contact" back />
        </div>

        {/* ------------------------------------------------ our server */}
        <div className="rounded-xl border-[1.5px] border-dashed border-ink-muted bg-white p-4 sm:p-5">
          <p className="text-small font-semibold text-ink">Blotter&rsquo;s server</p>
          <p className="mt-1 max-w-[64ch] text-[13px] leading-[1.55] text-ink-muted">
            Works out where each conversation stands and answers. It is sent facts, never the
            text of an email, because the script never reads the text. What it keeps is further
            down this page, live.
          </p>
        </div>
      </div>

      <figcaption className="mt-3 text-micro text-ink-muted">
        Every 15 minutes through the day and every two hours overnight. Names are made up.
      </figcaption>
    </figure>
  );
}
