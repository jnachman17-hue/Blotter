# Brief: the public audit page, and hardening against what it finds

**Blotter is live.** Jon posted it to r/UTAustin on 5 September 2026 and the
first substantive comment was a security objection. That objection is the whole
of this workstream.

Your job has two halves, and the second only works if the first is honest.

1. **Harden the product against what an independent reviewer would find.**
2. **Build a page that invites exactly that review**, with a prompt and the code
   sitting there to paste into any AI.

---

## 1. What just happened, and why it matters

Jon pasted the published `Code.gs` into ChatGPT with a prompt asking it to check
the code against the website's claims. **It found a real privacy fault**, and it
was right.

`fetchEvents_` read the student's entire default calendar, 365 days back and 180
forward, and sent every event title, guest list and organiser to the server. The
server discarded what it did not need, but only after it had arrived. The site
said, in two places, that the server receives calendar events *with your
contacts*.

That is now fixed: events are filtered inside the courier before anything
leaves. Four other findings were also true and are fixed. One was wrong.

**The lesson to carry into this work: the audit was worth more than any
reassurance we could have written.** Treat a finding as probably true until the
code says otherwise, and check the code rather than the documents, because the
documents were what was wrong.

---

## 2. Read these first

| File | Why |
|---|---|
| `36-END-TO-END-RESULTS.md` | The full-product test that preceded this. |
| `courier/Code.gs` | The courier. Read `fetchEvents_`, `fetchThreads_`, `safeServerCell_`. |
| `web/app/api/engine/rules.ts` | The rulebook. `matchEvent` decides which events count. |
| `web/lib/privacy-copy.ts` | Every privacy claim on the site lives here. |
| `web/app/terms/page.tsx` | The terms. |
| `34-SWITCHING-ON-PAYMENTS.md` | Billing, built and switched off. |

---

## 3. Fixed on 5 September, so do not re-report

- **Calendar filtered in the courier.** Sent only if a guest address matches a
  contact or a contact's first name is in the title. Deliberately looser than
  the server's own test, which needs first name *and* firm, so the filter can
  only ever send more than the server uses and never less.
- **Five server-chosen cell values guarded** by `safeServerCell_`, which is
  type-aware: `safeCell_` stringifies, and wrapping the dates in it turns them
  into text and breaks `Next call`.
- **The header no longer claims a failed run writes nothing.** It can stop
  partway once writing has begun.
- **`/privacy` now lists the contact rows and the rejected Found addresses**,
  which the page called a complete list and had omitted.
- **`/terms` no longer says Blotter is not open to other people.**
- Courier is **4.5**. Versions are plain numbers now, not dates.

**One claim the reviewer got wrong**, and it tells you something: they guessed
the Gmail scope was `https://mail.google.com/` because they only had `Code.gs`.
The manifest declares `gmail.readonly` and the consent screen proves it. **Any
audit prompt must hand over `appsscript.json` as well**, or every reviewer will
raise the same non-issue.

---

## 4. The page to build

A route, probably `/verify` or `/audit`, that says: do not take our word for it,
paste this into any AI and see.

It needs three things.

**The prompt.** Written so a non-technical student can copy it without editing.
It should name the site, state what the reader is worried about, and ask the
model to compare the code against the live claims. Jon's own first attempt is a
good starting point and is in the session that produced this brief.

**The code, copyable.** `/update` already has a working copy-to-clipboard
component (`web/app/update/copy-script.tsx`) reading `web/public/Code.gs` at
build time. Reuse it. **Include `appsscript.json`**, per §3.

**Honesty about what the audit cannot prove.** An AI reading client code can
prove what is *sent*. It cannot prove what the server does with it afterwards.
Say so on the page. Claiming more is the fastest way to lose the credibility the
page exists to build.

---

## 5. How to run this

**Iteratively, and against several models.** Jon's plan, and it is the right
one: run the prompt through ChatGPT, Claude, Gemini and whatever else, collect
every finding, fix what is true, correct what is wrong, and repeat until a clean
run is the normal result. Only then does the page go live.

Keep a record in `38-AUDIT-FINDINGS.md`: each finding, which model raised it,
whether it was true, and what was done. That file is also the answer when
somebody on Reddit raises something that has already been settled.

**Expect these to come up**, all currently true and none yet fixed:

- The Gmail permission is account-wide. The code narrows it; Google does not.
  There is no narrower scope that works, because `gmail.metadata` forbids search
  queries and searching is the whole mechanism. Verified 5 September.
- **Thread-level fetching.** A thread is fetched if any message in it involves a
  contact, and then every message's metadata in that thread is read. Someone
  else copied into the thread has their address and subject line read too.
- **Subject lines reach the server.** They are used for exactly three pattern
  checks (auto-reply, calendar RSVP, decline). Those could move into the courier
  so only three booleans travel and no subject line ever leaves the account.
  **That is the single biggest remaining privacy improvement available** and it
  is maybe an afternoon.
- The server's retention promise cannot be proved from client code.
- No third-party audit, and Google has not verified the app.

---

## 6. How to work with Jon

- **Not technical.** Plain English, no jargon. Explain what a thing means for
  him, not how it works.
- **Very few em dashes**, and never write like an AI. Short, plain sentences.
- **Ask before changing anything on the live site**, especially copy and legal
  text. Show the exact before and after and wait. Code fixes with no visible
  effect do not need this.
- **Verify before claiming.** He checks, and he has caught confident wrong
  answers in this project more than once.
- **Any change to `courier/Code.gs` needs `node courier/publish.js`**, a version
  bump, and a re-paste into the master template, which nothing enforces.

Suites, all of which must pass:

```
node courier/helpers.test.js
cd web && npx tsx app/api/engine/selftest.ts
cd web && npx tsx app/api/engine/run-fixtures.ts
cd web && npx tsx app/api/entitlement/selftest.ts
```
