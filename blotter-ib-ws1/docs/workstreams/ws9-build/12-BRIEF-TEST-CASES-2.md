# Brief — Test-cases, round 2: regenerate the answer key

Date: September 1, 2026
Model: **Opus.** Continues `07-BRIEF-TEST-CASES.md`, which still binds in full.

**Everything in the original brief still applies**, including the one rule that
matters most: **you may never read the engine's code.** Do not open
`web/app/api/engine/` except `__fixtures__/`, which is yours. If you are a fresh
chat, read `07-BRIEF-TEST-CASES.md` and `10-TEST-CASE-NOTES.md` first.

---

## What happened

Your fixtures ran against the engine. **106 mismatches, and every single one is
`days` (98) or `last_call` (8). Nothing else disagreed at all** — every status,
every attempts count, every `last_contact`, every `next_call` and every
found-list membership matched, across 67 contacts at four points in the season.

Two independently built things agreeing that completely is the result this
exercise was for. **One thing separates them, and Jon has ruled on it.**

## The ruling

> **A day turns at midnight in the student's timezone.** `days` is a subtraction
> of calendar dates, not of elapsed hours.

**Jon ruled for the engine's reading, September 1, 2026.** It is now
`04-ENGINE-RULES.md` §4 — the file is at **version 3**, re-read it.

Your `build_fixtures.py` computes `floor(elapsed / 24h)`. Jessica Luft at 26 days
and 18 hours is **27**, not 26.

## What to change

**1. The day formula.** Subtract calendar dates.

**2. Timestamps must carry Jon's own offset, not `Z`.** This is the deeper half
and it is why `last_call` is wrong too. Kate Borden's call started
`2024-01-22T16:00:00-08:00` — the evening of **January 22** where Jon was. Your
fixtures record its UTC date, January 23.

**Jon recruited from Austin: `America/Chicago`.** Note the season crosses the
March 10, 2024 DST boundary, so the offset is `-06:00` before it and `-05:00`
after. **Verify against the corpus rather than trusting this paragraph** — the
corpus records what Gmail returned, and if it disagrees with `America/Chicago`,
say so instead of overriding it.

**3. Then re-run** `npx tsx web/app/api/engine/run-fixtures.ts` from the repo
root.

## The bar

**31 of 31.** If anything still fails after regeneration, it is a **new finding**
— the same rule applies as before: work out whether your fixture, the engine, or
the rules document is wrong, and **say which. Do not edit a fixture to go
green.** That instruction is the whole reason this check is worth anything.

## Also

- **Confirm the calendar-RSVP rule is now in the rules.** §6 of v3 says an
  `Accepted:` / `Declined:` / `Invitation:` message is machine mail — never a
  reply, never an attempt, never `last_contact`. **Your fixtures were right and
  the engine was wrong**, and Jon ratified your reading. Verify the rule as
  written matches what your fixtures actually encode.
- **Your §7 list of 13 unsettled questions is still unsettled.** Do not try to
  resolve them. **Pick the three that would most change a real student's sheet
  and put those to Jon in your closing message**, in plain English. Leave the
  rest on the list.

## Write

- Regenerated fixtures in `web/app/api/engine/__fixtures__/`
- Updated `10-TEST-CASE-NOTES.md` — what changed, the final pass count, and
  anything new that surfaced

**Report in plain English. Jon is not technical.** Lead with whether it is 31 of
31, then the three questions.
