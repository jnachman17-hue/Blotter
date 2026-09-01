# Brief — the Test-cases chat

Date: September 1, 2026
Model: **Opus.** Getting this wrong silently is worse than not doing it.

You are building **the answer key**: what Blotter *should* say about each of the
67 people in Jon's real 2024 recruiting season, derived from the rules and the
evidence, so the engine can be checked against something it did not write.

---

## 0. The one rule that makes this worth doing

**You must never read the engine's code.**

Do not open `web/app/api/engine/`. Do not look at it to check yourself, resolve
an ambiguity, or see how it handled something. **The moment you do, this stops
being an independent check and becomes an echo**, and nobody will know.

If the engine's behaviour would answer your question, that is exactly the
question you must ask Jon instead.

---

## 1. Other boundaries

- **You own** `web/app/api/engine/__fixtures__/` and nothing else under `web/`.
  It is the one directory the Rulebook chat will not write to.
- **Never write to** `blotter-ib-ws1/research/corpus/` — read it, never change it.
- **Never modify** any existing file under `web/`. It is a live public site.
- **Never change** `04-ENGINE-RULES.md` or `05-CONTRACT.md`.
- **Explicit paths when staging.** Never `git add -A`. Two other chats are live.

---

## 2. Read these, in order

1. `CLAUDE.md`
2. **`blotter-ib-ws1/docs/workstreams/ws9-build/04-ENGINE-RULES.md`** — the
   rules. **Your only source of truth for what the right answer is**
3. **`blotter-ib-ws1/docs/workstreams/ws9-build/05-CONTRACT.md`** — the exact
   input and output shapes your fixtures must use
4. `blotter-ib-ws1/research/corpus/README.md` — how the corpus is built, and
   its known gaps
5. `blotter-ib-ws1/docs/workstreams/ws9-build/03-LEARN-FINDINGS.md` — the real
   cases, and where the hard ones are

---

## 3. What to build

**Input files and expected-output files**, in the exact shapes in
`05-CONTRACT.md`, converted from the corpus.

The corpus is organised by contact. The contract is organised as one request
carrying contacts, threads and events together. **Converting between them is
part of your job**, and the conversion script belongs in
`blotter-ib-ws1/research/scripts/`.

### Use several reference dates, not one

`now` comes from the request, which means you can ask what was true on any day
of the season. **Use at least these four**, because each catches something a
single date cannot:

| `now` | Why |
|---|---|
| **2024-01-25** | Peak. Everything live at once, most states present |
| **2024-02-15** | Just after the tracker was abandoned. Long silences begin |
| **2024-03-15** | The quiet stretch. Almost everything is stale |
| **2024-04-30** | End. Where the backlog problem shows itself |

### Cover the hard cases deliberately

Every one of these is real and named in `03-LEARN-FINDINGS.md`. **Each must have
a fixture.** They are the cases a plausible-looking engine gets wrong.

- **Jessica Luft** — an out-of-office 20 seconds after Jon's email, from her own
  address. Must **not** be `Replied`
- **Sean Kang, Stifel** — three bounces whose `Status:` says `4.4.2` while the
  text says the address does not exist. Must be `Bounced`, three times over
- **Marijoy Bertolini** — replied at 21.6 days. Must never be anything worse
  than `Sent` with a large `days`, and no threshold may exist to punish her
- **Owen Sherry** — a call that happened, with **no email address anywhere.**
  Reachable only through the event title
- **The "Potential favor" thread** — five relationships in one conversation. One
  person replying must not mark the other four `Replied`
- **Liz Ream / Steve McLaughlin** — an assistant answering for the banker in a
  thread where Steve is the only tracked contact. **This one must advance
  Steve's row**, which is the opposite of the case above. §3 of the rules
  separates them
- **`Brady.flynn@` and `Brady.Flynn@`** — one person, in a single thread
- **`US_Campus@` and `us_campus@`** — same, on a shared mailbox
- **Carrie Cruces, Chris Miller, Paige Butters** — the highest `attempts` counts
- **A contact marked `Closed`** — construct one; the corpus has none, and the
  state must win over everything else
- **The three bcc'd Wells Fargo messages** with an empty `To` line
- **Every contact with no mail at all** — must be `Not emailed`, not an error

### Work the answer out by hand, and show it

For each fixture record **why** the expected answer is what it is, citing the
rule. A fixture nobody can audit is worth very little, and when the engine
disagrees with you the first question will be which of you is right.

---

## 4. What to do when the rules do not decide

**You will find cases the rules do not cover.** That is one of the most valuable
things this job produces.

**Do not guess and do not pick a sensible default.** Write the case down, say
what is ambiguous, and put it to Jon. A rule that turns out to be missing is
better found now, by you, than in a student's spreadsheet in November.

Record every one in your notes even where Jon rules quickly.

---

## 5. What you must NOT do

- **Never read the engine's code.** §0
- **Do not write product code.** Fixtures and conversion scripts only
- **Do not soften a fixture to be safe.** If the rules say `Bounced`, write
  `Bounced`. A fixture written to be easy to pass tests nothing
- **Do not invent data.** Every fixture comes from the real corpus, except the
  one constructed `Closed` case, which must be labelled as constructed

---

## 6. What to write

- Fixtures in `web/app/api/engine/__fixtures__/`
- The conversion script in `blotter-ib-ws1/research/scripts/`
- `blotter-ib-ws1/docs/workstreams/ws9-build/10-TEST-CASE-NOTES.md` — what is
  covered, what is not and why, every ambiguity found in the rules, and every
  case you could not settle

## 7. How to report back

Plain English to Jon. **He is not technical.** Lead with how many cases you
wrote, which real situations they cover, and — most importantly — **what the
rules failed to answer.** That last list is the reason this chat exists.
