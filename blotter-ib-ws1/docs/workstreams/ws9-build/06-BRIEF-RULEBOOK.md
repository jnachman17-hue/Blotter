# Brief — the Rulebook chat

Date: September 1, 2026
Model: **Opus.** This is the product.

You are building **the engine**: the server that decides what is true about
every recruiting relationship. Read this whole file before touching anything.

---

## 0. Hard boundaries

**You own exactly one new directory:** `web/app/api/engine/`.

- **Never modify an existing file under `web/`.** That directory is a live,
  public, indexed website carrying real traffic. You **add** a route; you do not
  touch the page, the components, the funnel, the styles, or the existing API
  routes. If something existing looks wrong, say so and stop.
- **Never write to** `blotter-ib-ws1/research/corpus/` — read it, never change it.
- **Never touch** what the Courier or Test-cases chats own: no Apps Script, no
  `.gs` files, no test fixtures.
- **Never change** `05-CONTRACT.md`. If it is wrong, stop and say so.
- **Explicit paths only when staging.** Never `git add -A`. Two other chats are
  running, and a shared git index is exactly how their work ends up in your
  commit. This repository has been bitten by it before.
- **No secrets.** Never print or commit a value from `web/.env.local`.

---

## 1. Read these, in order

1. `CLAUDE.md` — the working agreement
2. **`blotter-ib-ws1/docs/workstreams/ws9-build/04-ENGINE-RULES.md`** — the
   engine. **This is your specification and it is binding.** Every rule you
   implement is in it, and you implement nothing that is not
3. **`blotter-ib-ws1/docs/workstreams/ws9-build/05-CONTRACT.md`** — your input
   and your output
4. `blotter-ib-ws1/docs/workstreams/ws9-build/03-LEARN-FINDINGS.md` — why the
   rules are what they are. Read it so you recognise a real-world case on sight
5. `blotter-ib-ws1/research/corpus/README.md` — the real data's shape

---

## 2. What to build

One stateless endpoint, `POST /api/engine`, in the existing Next.js app.
TypeScript. Match the surrounding code's conventions.

**Keep the rules separate from the plumbing.** Pure functions that take
normalised facts and return a state, with HTTP handling wrapped around them.
This is not a style preference — the rules move to a different host one day, and
the entire architecture rests on that being an adapter swap rather than a
rewrite. **A rule that reaches into a request object has already broken it.**

What it computes, all from `04-ENGINE-RULES.md`:

| | |
|---|---|
| §3 | Attaching mail to people, including the one-contact and several-contact cases |
| §4 | The seven states, the precedence order, the day counts |
| §5 | Attempts |
| §6 | Auto-reply detection, and saying nothing when unsure |
| §7 | Calendar matching: attendee address, then first name plus firm in the title |
| §8 | Finding new people, with the never-suggest list |

**Bounces:** detect from the bounce sender plus the failed recipient named in
the body. **Do not key on the `Status:` code.** From the real data: a Stifel
bounce reported `Status: 4.4.2` — a *temporary* failure class — while its SMTP
response was `550` and its text read "Address not found". A rule trusting
`Status: 5.x` misses it, which is precisely the case where the student burns
three attempts on an address that does not exist.

---

## 3. How you know you are right

**You do not write the tests for the rules.** A separate chat is deriving the
expected answers from `04-ENGINE-RULES.md` and Jon's real 2024 season —
independently, without ever seeing your code — into
`web/app/api/engine/__fixtures__/`. **You have to pass tests you did not write.**

Write whatever unit tests you like for your own plumbing. The fixtures are the
acceptance bar.

**If a fixture disagrees with your code, do not change the fixture.** Work out
which of the three is wrong — your implementation, the fixture, or the rules
document — and say which. **A disagreement is a finding, not an obstacle.** Two
of those three outcomes mean something real is broken, and quietly editing a
fixture to go green destroys the only independent check in this build.

The fixtures may not exist when you start. Build against the rules and run them
when they land.

---

## 4. Deployment, and walking Jon through it

The endpoint deploys with the existing Vercel project on push to a branch.
**It should need no new environment variables and no new services.** If you
conclude it does, that is a design smell — say so before adding one.

**Jon is not technical.** Anything he has to do himself — a Vercel setting, a
click, a value to paste — must be numbered steps naming exactly what he clicks
and what he should see on screen. Never assume he knows where something lives,
and never hand him a command without saying what it does.

---

## 5. What you must NOT do

- **Do not invent a rule.** If `04-ENGINE-RULES.md` does not decide something,
  it is an open question: write it down and ask. Do not pick a sensible default
  and move on. That document exists so these choices are Jon's.
- **Do not add a state, a status string, or a column.** §4 and §9 are exact.
- **Do not add a day threshold anywhere**, for any purpose, however reasonable
  it seems. This is the most explicitly ruled decision in the project and the
  evidence behind it is in `03-LEARN-FINDINGS.md` §4 Q6.
- **Do not build authentication, billing, rate limiting, or a database.** Out of
  scope. The server is stateless by design.
- **Do not touch the live site.**

---

## 6. What to write

- The code, under `web/app/api/engine/`
- `blotter-ib-ws1/docs/workstreams/ws9-build/09-RULEBOOK-NOTES.md` — what you
  built, every place the rules were ambiguous and what you did about it, every
  fixture disagreement and how it resolved, and anything the next chat must not
  trip over

## 7. How to report back

Plain English to Jon. **He is not technical** and has stopped a chat mid-answer
for exactly this. Tell him what works, what does not, what you had to guess, and
what you need from him. Keep the field names in the file.
