# Billing, end to end

Date: September 4, 2026
Status: **A design for Jon to rule on. Nothing new is built.**
Reads against: `23-BILLING-ARCHITECTURE.md` and its amendments,
`30-FUTURE-PROOFING-NOTES.md` §2.1, `14-DESIGN-DECISIONS.md` D27 and D28.

This document covers the thing `23` did not: **the transition from a free
population to a paid one.** There are already free users. Some of them will not
pay. Both of those are designs, not afterthoughts.

---

## 0. Where the earlier design stands after the 4 September ruling

Keys bind to the **install id**, a random UUID minted once per sheet. They do
not bind to a person. The reason is evidence rather than preference:
`appsscript.json` asks for five scopes and none of them is a userinfo scope, so
`Session.getEffectiveUser().getEmail()` returns an empty string and always
would have. Adding the sixth scope costs an extra line on Google's unverified
app screen plus a forced re-authorisation for everyone already installed, and
that screen is where students already abandon the install.

**Four of the seven amendments no longer describe what is built. A1, A3 and A4
in particular are dormant, and they should be read as history rather than as
design.**

| Amendment | Subject | Status |
|---|---|---|
| **A1** | The account hash is a pseudonym, not anonymisation | **Dormant.** There is no hash. The server receives a random per-sheet UUID and nothing derived from a person. The privacy wording A1 forced is no longer needed, and `/privacy` does not owe it |
| **A2** | `last_seen` belongs to telemetry, not the engine | **Live.** Still the rule. The engine reads and never writes |
| **A3** | An unreadable email means the field is omitted, never hashed-empty | **Dormant as written, live as a principle.** There is no email field. The principle outlived it: a missing identifier is omitted, never sent as an empty value |
| **A4** | Graduation makes hard binding wrong, so binding is soft | **Dormant.** A sheet does not graduate. Soft binding survives for a different reason, in §6 below, and the reason should be restated rather than inherited |
| **A5** | `/privacy` changes at step 1 | **Dormant.** It changed for a field that no longer exists |
| **A6** | Binding must be observable, and manual unbind works before enforcement | **Live and unbuilt.** Nothing implements either half |
| **A7** | One source for the switch, no cron for grace, raw body for Stripe | **Live.** All three still hold |

A4 is the one worth being careful about. Its conclusion is still right and its
argument is gone. Soft binding is no longer about students losing their `.edu`.
It is about a copied sheet being indistinguishable from a shared key, which
§6 works through.

---

## 1. What is already built

| Piece | State |
|---|---|
| `Settings → Blotter key` cell in the sheet | Built. Empty on every sheet |
| Courier sends `key` and `install_id` on every engine request | Built |
| `GET /api/entitlement` reports the switch | Built. Returns `{"enforcing":false}` |
| `enforcement.ts` reads `BLOTTER_ENFORCE`, and nothing else reads it | Built |
| `verdict.ts`, the pure allow-or-refuse decision, with ten tests | Built |
| `refuse()` in `/api/engine/route.ts`: 402, a `blocked` notice, no write | Built |
| Courier writes a server notice into row 1 of Contacts and nothing else | Built, and rehearsed live in D27 |
| Key binding on `/api/telemetry` | **Written but unreachable.** §10.1 |
| `blotter_keys`, `blotter_key_mismatches`, `blotter_installs` tables | **Never created.** No migration file exists |
| Stripe, checkout, webhook, key issuance, any page that sells anything | **Does not exist.** No Stripe dependency in `web/package.json` |
| `https://blotterib.com/billing`, which the blocked notice links to | **Does not exist.** §10.3 |

So the refusal half is real and the selling half is nothing. That is the right
way round. The dangerous half was built first and proven on a live sheet.

---

## 2. The key

### 2.1 What it is

A short opaque string with no meaning inside it. It is not a licence file, it
carries no expiry, and it decodes to nothing. It is a row in a table.

**Format: `BLT-XXXX-XXXX-XXXX`.** Eighteen characters, uppercase, hyphens in
threes of four. The twelve payload characters come from Crockford base32
(`0123456789ABCDEFGHJKMNPQRSTVWXYZ`, no I, L, O or U), so there is no character
a student can confuse with another when reading it off a screen. Twelve
characters is sixty bits, which is not guessable and is short enough to read
down a phone.

Generated server side with `crypto.randomBytes`, never from anything about the
student, never sequential.

Both existing validators accept this shape. `pickKeyUse` in
`web/app/api/telemetry/payload.ts` allows `[A-Za-z0-9._-]` up to 64 characters.
The engine's `optionalStr` does not check the shape at all.

**One trap to close before issuing a single key.** `refuse()` looks the key up
with `.eq("key", key)` on the raw trimmed cell value. A student who types it in
lowercase, or whose paste carries a non-breaking space, gets `unknown_key` and
is refused. Normalise before the lookup: strip everything that is not
alphanumeric and uppercase what is left, on both the stored value and the
incoming one. A generated column does it once and cannot be forgotten:

```sql
key_norm text generated always as
  (upper(regexp_replace(key, '[^A-Za-z0-9]', '', 'g'))) stored
```

This is not a hypothetical. A cell in a spreadsheet is the single most likely
place in this product for a value to arrive with invisible whitespace attached.

### 2.2 Where it lives

| | |
|---|---|
| In the sheet | `Settings → Blotter key`, column B, next to the label. Read on every run by `readSettings_`, trimmed, sent as `key` |
| On the server | `blotter_keys.key`, primary key |
| For the student to find again | The Stripe receipt, and the success page URL, which is reopenable |

### 2.3 What binds it to a sheet

`blotter_keys.install_id`, set once, plus `bound_at`.

**Two ways it gets set, and the second is much better than the first.**

**At first use.** The courier sends the key, telemetry sees it alongside the
install id, and if `install_id` is null it writes it. This is the design in
`23` §3 and it is what the code in `/api/telemetry/route.ts` implements. It is
currently unreachable, because the courier never sends the key to telemetry
(§10.1).

**At issuance.** The student tells the website which sheet is theirs before
paying, so the webhook writes `install_id` at the moment the key is created.
The key is born bound. Nothing has to be pasted anywhere, and the confirmation
appears on the very next run rather than the run after that.

**Recommendation: issue bound, and keep first-use binding as the fallback.**
Issuing bound is better on every axis that matters. It removes the paste, it
removes the fifteen minute delay before the student learns whether it worked,
and it needs no change to `courier/Code.gs`, which is the expensive half of this
product. §3 works out how the student names their sheet.

### 2.4 First use wins, and what happens on the second sheet

First use wins. After that, `install_id` is never overwritten by a run.

When a key arrives from an install id it is not bound to, the server records a
row in `blotter_key_mismatches` and **allows the run**. That is what soft
binding means, and it is worth being blunt about the consequence:
`verdictFor()` never looks at `install_id` at all, so **a key today works on an
unlimited number of sheets.** The mismatch table is a log, not a limit.

That is deliberate and it should stay, because the two cases are
indistinguishable from the server:

- One student who made a fresh copy of their own tracker after an update
- Five friends who pasted the same key

The asymmetry decides it. Refusing a paying student who copied their own sheet
is far worse than five friends sharing for a fortnight, and only a person can
tell the two apart.

**One cheap limit worth adding, and it does not block anybody.** If a key has
been seen from more than **three** distinct install ids in a rolling thirty
days, the engine returns a `warning` notice to every sheet using it. Sharing
stops being invisible without anything stopping. The data is already in
`blotter_key_mismatches`; it needs one count.

**Manual unbind, per A6, and nothing implements it.** It is one statement and it
belongs in a runbook rather than a route:

```sql
update blotter_keys set install_id = null, bound_at = null where key = 'BLT-...';
```

That is the whole self-service story, and it is the right amount of machinery
for a hundred students. **A6's other half matters more and is also unbuilt:
binding has to be observable before enforcement is switched on**, because keys
get bound during the free period and a wrong binding is silent until the day it
locks someone out. A view is enough:

```sql
create or replace view blotter_key_state as
  select k.key, k.status, k.install_id, k.bound_at, k.grace_until,
         i.last_seen, i.contacts,
         (select count(*) from blotter_key_mismatches m where m.key = k.key) as other_sheets
  from blotter_keys k
  left join blotter_installs i on i.install_id = k.install_id;
```

---

## 3. Buying

### 3.1 The shape of it

1. The student clicks a price on `blotterib.com/pricing`.
2. `POST /api/checkout` creates a Stripe Checkout Session and redirects.
3. Stripe takes the card. Blotter never sees it.
4. `POST /api/stripe/webhook` receives `checkout.session.completed`, generates a
   key, writes it to `blotter_keys` with `status = 'active'`.
5. The student lands on `/success?session_id=cs_...`, which looks the session up
   server side and shows them what to do next.

Three things the webhook has to get right and none of them is interesting:
verify the signature against `request.text()` and not `request.json()`
(amendment A7), be idempotent on `session.id` so a Stripe retry does not issue a
second key, and return 200 quickly.

### 3.2 The hop that decides whether this works

**Everything above is ordinary. The hop from the website to the sheet is the
part that will actually cost Jon customers.** A student who has paid and cannot
get running is the worst outcome available, worse than a student who never
bought, because it costs money to refund and it costs a reputation on a campus
where everyone knows everyone.

There are two directions the identifier can travel. They are not equivalent.

| | **Key travels to the sheet** | **Code travels to the website** |
|---|---|---|
| What the student does | Copies a key from a web page, opens their sheet, finds Settings, finds the right row, pastes into column B | Reads a six character code off the banner at the top of Contacts, types it into the website before paying |
| When they learn it worked | Next run. Up to fifteen minutes, or immediately if they know to click `Blotter → Step 2` | Instantly. The page can say "That is Sheet 7F3C1A, last updated eleven minutes ago" before they pay |
| Failure mode | Wrong row, wrong tab, trailing space, closed the tab before pasting, lost the key | Mistyped six characters, caught on the spot |
| Recovery | Email Jon | Retype |
| Cost in `courier/Code.gs` | None | None |
| Works before the sheet exists | Yes | No |
| Works on a fresh copy of a sheet | Yes, paste it again | No, the copy has a different code |

**Recommendation: the code travels to the website, and the key exists anyway.**

Make code entry the path the site leads with, and keep the paste as the
documented fallback for two real cases: a student who buys before installing,
and a student who makes a new copy and needs to move their entitlement across.

The reason this works at all is that the sheet already has a channel from the
server. The banner can say anything, per sheet, decided at request time, with
no re-paste and no email address. **That is the asset here, and it is why the
missing email list matters much less than it looks.**

### 3.3 The claim code

Six characters, Crockford base32, one per install: `7F3C1A`.

Store it. Add `claim_code text unique` to `blotter_installs` **with a column
default**, so the database mints it and no route has to remember to. That
matters here: `/api/telemetry` upserts on `install_id`, and Supabase updates
only the columns present in the row, so a defaulted column survives every later
run exactly the way `first_seen` already does. Adding it to `pickInstallRow`
instead would overwrite it on every run.

It is derived from nothing about the student, it is unique, and Jon can look a
row up by it in the Supabase dashboard during support, which is the real reason
to store it rather than compute it.

Every sheet that has ever run gets one. A sheet that has never run has no code
and does not need one, because there is nothing to entitle yet.

The engine reads it in the same query it already needs for install level
entitlement (§4.2), so it costs nothing extra.

**Collisions.** Six base32 characters is about a billion values. At a thousand
installs the chance of any collision at all is about one in two thousand, which
is small but not nothing. The unique constraint is what actually settles it:
retry on conflict, and never resolve a code that matches two rows.

### 3.4 What the student sees, in order

**On the sheet, before they buy.** The banner. One line, and the exact words are
in §4.4.

**On `/pricing`.** The price, what it covers, what happens when it ends, and one
button. Nothing else. The site does not pitch.

**On `/key`, the activation page.** One field, labelled `Your Blotter code`,
with the help line:

> It is the six characters at the top of your Contacts tab. It looks like
> 7F3C1A.

On a valid code, the page confirms the sheet before taking money:

> That is your sheet. Last updated 11 minutes ago, 47 contacts.

On an unknown code:

> We do not recognise that code. Check the top of your Contacts tab. If Blotter
> has not run on this sheet yet, run it once and the code will appear.

**On `/success`.** Three things, in this order:

> **Blotter is on.**
>
> Open your sheet and click Blotter, then Step 2: Run once now. The bar at the
> top will say Blotter is active.
>
> Your key is BLT-7Q4K-9F2M-3XRT. You do not need it today. Keep it in case you
> ever start a new sheet.

The key is shown even though it is not needed, because the day it is needed the
student will not have this page open. Put it in a monospace box with a copy
button.

**Back in the sheet, on the next run.** A one time confirmation, `info` level:

> Blotter is active. Paid through 30 June.

Show it only while `now() - bound_at < 24 hours`. That is a read time
comparison, no cron, consistent with A7. It stops replacing the resting banner
after a day, which matters: a permanent notice would displace
`Blotter: all good. Last updated 2:45 PM.` forever, and the resting state is
what teaches students to read that row.

### 3.5 Recovery when the paste path is taken and goes wrong

Be honest that this is thin. If a student buys, closes the tab, and never
pastes, the only route back is `blotterib@gmail.com` plus the Stripe dashboard.
Blotter has no transactional email and should not grow one for this.

Two things reduce it to nearly nothing without new machinery. The success page
URL carries the session id and is in their browser history. And the code path in
§3.2 means most students never hold a key at all.

---

## 4. Enforcement

### 4.1 The switch

`BLOTTER_ENFORCE=on` in Vercel, read only by `enforcement.ts`, reported by
`GET /api/entitlement`. Default off. A missing variable, a typo or a failed
deploy all mean nobody is refused, which is the only safe direction.

A database that cannot be reached lets the run through. An outage must never
lock out people who have paid. That is already how `refuse()` behaves and it
should never be tightened.

### 4.2 What the server decides, and it needs one more read than it has

Today `refuse()` reads `blotter_keys` by key and nothing else. **That is not
enough to run a transition**, because a grandfathered student has no key at all
and `verdictFor("")` returns `no_key`. Grandfathering by pre-binding keys does
not work: the sheet has nothing in the cell to send.

So entitlement becomes three rules over two reads, evaluated cheapest first:

| Order | Rule | Where it comes from |
|---|---|---|
| 1 | The install is entitled in its own right | `blotter_installs.entitled_until > now()` |
| 2 | The install is inside its free trial | `now() < first_seen + TRIAL_DAYS` |
| 3 | A key on this request is active, or in unexpired grace | `blotter_keys`, exactly as today |

`entitled_until` set to `'infinity'` means free forever, which is what a
grandfathered pilot user gets. Null means no install level entitlement.
`TRIAL_DAYS` is a constant in `rules.ts`, and zero switches trials off.

Two round trips per run in the worst case, one during the free period. Put the
decision in `verdict.ts` rather than in a Postgres function, because that file
is the one with a test suite and the day enforcement goes on is the worst
possible day to be testing this by hand.

### 4.3 Grace

**Nothing is ever deleted, at any stage.** Every status, date and count Blotter
has written stays where it is. The sheet stops being updated and the banner says
why. This is not generosity. The tracker is the student's own file in their own
Drive, and reaching into it over a failed card would be indefensible.

| Event | Status | `grace_until` | What the sheet does |
|---|---|---|---|
| `invoice.payment_failed` | `grace` | now + 7 days | Keeps running. Warning banner |
| Grace expires | computed, no cron | past | Stops. Blocked banner |
| `customer.subscription.updated` with `cancel_at_period_end` | unchanged | unchanged | Keeps running to the end of the period. No banner |
| `customer.subscription.deleted` after a voluntary cancel | `inactive` | null | Stops. Blocked banner |
| `charge.refunded` | `inactive` | null | Stops on the next run |
| `charge.dispute.created` | `inactive` | null | Stops on the next run |

Seven days rather than thirty. Stripe's own retries already run for two to three
weeks before `payment_failed` becomes final, so the student has had a fortnight
of email from Stripe before Blotter says anything. Seven days after that is a
courtesy, not a second dunning system.

A voluntary cancellation gets no grace. They chose it, they keep the period they
paid for, and a surprise extension is not a kindness when the next thing they
see is a banner telling them it has ended after all.

**No cron, ever.** `grace_until` is compared at read time. `verdict.ts` already
does exactly this and its tests already cover the boundary.

### 4.4 What the banner says, at every stage

The banner has a hard constraint that has to be designed around. It is one
merged row, `setWrap(false)`, so **every notice is a single line**, and anything
past the width of the student's window is off screen to the right. That is the
exact problem D28 was built to solve, and a long sentence reintroduces it.

**Rule: eighty characters including the URL.** Count them. Every line below is
under it.

**Put the whole line in `notice.text` and leave `notice.url` empty.** The
courier renders `text`, then three spaces, then `url`, which forces the link to
the end. Several of these sentences read better with the code after the link,
and the URL is not clickable either way (§10.3), so there is nothing to gain
from the separate field.

| Stage | Level | Text |
|---|---|---|
| Nothing wrong | none | `Blotter: all good. Last updated 2:45 PM.` (the courier's resting state) |
| 30 days before cutover, grandfathered | `info` | `Blotter becomes paid on 3 Nov. Yours stays free. blotterib.com/pricing` |
| 30 days before cutover, not grandfathered | `info` | `Blotter becomes paid on 3 Nov. Turn it on: blotterib.com/key code 7F3C1A` |
| 7 days before | `warning` | `Blotter becomes paid in 7 days. blotterib.com/key code 7F3C1A` |
| Trial has 3 days left | `warning` | `Your free month ends in 3 days. blotterib.com/key code 7F3C1A` |
| Just activated, first 24 hours | `info` | `Blotter is active. Paid through 30 June.` |
| Card failed, in grace | `warning` | `Your card did not go through. Blotter runs until 12 Nov: blotterib.com/key` |
| Lapsed, no key | `blocked` | `Blotter has stopped updating. Nothing was deleted. blotterib.com/key 7F3C1A` |
| Key not recognised | `warning` | `Blotter does not recognise that key. Check Settings, then run again.` |
| Key seen on 4+ sheets | `warning` | `This key is in use on several sheets. Nothing has stopped. blotterib.com/help` |

Notes on the wording, because it was chosen rather than drafted.

**"Nothing was deleted" is the most important four words in the table.** A
student whose tracker stops will assume the worst, and the sentence that stops
them panicking has to be in the first line, not in a linked page.

**No exclamation marks, no "Uh oh", no "Action required".** A spreadsheet that
starts shouting reads as a scam. The tone is the same at every stage and only
the colour changes.

**"Your card did not go through" rather than "payment failed".** It is what
happened, and it is what a bank would say.

The blocked line above is 75 characters. The one in
`web/app/api/engine/route.ts` today is 93 before the URL is appended, so **it
does not fit and has to be shortened before enforcement goes on.**

---

## 5. The transition

### 5.1 The promise that already exists

`/terms` §08 is live and it says this:

> Blotter is free. No payment has been taken from anyone, and no card details
> are collected anywhere on this site.
>
> If that changes, your sheet will say so before anything is owed. [...] Using
> Blotter while it is free does not commit you to paying for it later.

That is a commitment and it constrains the transition in exactly two ways. The
sheet has to say so before anybody owes anything, and nobody can be charged for
what they have already used. It does not promise that today's users stay free,
so a cutover is allowed. It just has to be announced in the sheet first.

### 5.2 The recommended shape

**Grandfather everyone who ran before the cutover, permanently.**

```sql
update blotter_installs
   set entitled_until = 'infinity'
 where first_seen < '2026-11-03';
```

One statement, reversible, and it keeps a promise Jon made in public.

The argument is not sentimental. At a hundred users the revenue given up is
under a thousand dollars a season. The cost of the alternative is that the first
cohort, on the campuses this product needs, tells everyone Blotter took away
something it said was free. That trade is not close.

The counter-argument deserves a hearing: a grandfathered cohort never converts,
so Jon never learns what the product is worth to the people who liked it most.
That is real, and the answer is that the pilot cohort is a hundred people and
the paying cohort is everyone who arrives afterwards. Willingness to pay gets
measured on new arrivals, which is where it should be measured anyway.

### 5.3 The schedule

| When | What | Channel |
|---|---|---|
| Day 0 | Grandfather SQL runs. `entitled_until` set for the whole pilot cohort | Supabase, silent |
| Day 0 | `/pricing` goes live. `/terms` §08 is rewritten. `/privacy` §10 loses "No payment is being taken from anyone today" | Website |
| Day 0 | Grandfathered sheets get the `info` banner. New installs get the trial banner | The notice channel |
| Day 23 | The 7 day `warning` banner starts for anyone not entitled | The notice channel |
| Day 30 | `BLOTTER_ENFORCE=on` | Vercel |
| Day 30 | Confirm with `curl https://blotterib.com/api/entitlement` | One command |

Thirty days is chosen because the notice only reaches a sheet that runs, and a
student who stopped recruiting over a break might not open theirs for a
fortnight. Anything under two weeks will genuinely surprise people.

### 5.4 Why the missing email list matters less than it looks

Blotter has funnel emails in `leads.email` and no reliable link from an email to
an install. That normally makes a pricing change frightening, because you cannot
tell people.

**The banner is a better channel than email for this specific message.** It is
in the product, it is on screen every time they look at their tracker, it cannot
land in spam, and it is addressed to the sheet that is actually affected rather
than to an address someone typed into a funnel four months ago. A student who
has stopped using Blotter never sees it, which is correct, because they are not
affected.

The email list is still worth having. It is not worth delaying this for.

---

## 6. Cut-off at the account level

Jon wants to stop one person without touching anyone else. Here is exactly how
that works, and where it does not.

### 6.1 A paying student

One statement, effective on their next run, within fifteen minutes:

```sql
update blotter_keys set status = 'inactive', grace_until = null where key = 'BLT-...';
```

`refuse()` looks up by key, so only sheets sending that key are affected. This
works today, as written, once the table exists.

### 6.2 A free or grandfathered student

**This does not work today, and it is the gap worth knowing about.** A student
who never paid has no row in `blotter_keys`. There is nothing to set. The only
lever is `BLOTTER_ENFORCE`, which is global, and the D27 rehearsal already
demonstrated that it blocks everyone or nobody.

The `entitled_until` column in §4.2 is what fixes it, and it fixes both cases
with one lever:

```sql
update blotter_installs set entitled_until = now() where install_id = '...';
```

That is the second reason to add the column, and on its own it would justify it.
Without it, "cut this one person off" is a sentence that only applies to
customers.

### 6.3 One person with two sheets

Two install ids, one key. The first sheet to run binds. The second produces a
row in `blotter_key_mismatches` and **keeps working**, because `verdictFor()`
does not consult `install_id`.

This is the intended behaviour and it should stay. A student who rebuilt their
tracker after an update is the common case, and it is indistinguishable from
sharing.

Cutting that person off works cleanly: setting the key inactive stops both
sheets, because both send the same key.

### 6.4 A copy of a sheet that already has a key in it

This is the case Jon asked about and it is the sharpest one.

`File → Make a copy` copies the Settings tab, so **the key travels with the
copy.** The claim is that the install id does not, because it lives in script
properties and a copy mints a new one. That claim is in
`22-DISTRIBUTION-NOTES.md` §2 and in `30-FUTURE-PROOFING-NOTES.md` §4, in both
cases as an assertion.

**Nobody has run it.** That matters, because it is the same class of assumption
as `getEffectiveUser().getEmail()`, which was believed for a fortnight, written
into a design, and turned out to be wrong the first time anyone checked.

Both answers produce a coherent product and they are not the same product.

| | **A copy mints a new install id** (the assumption) | **A copy inherits the install id** |
|---|---|---|
| The copy runs | Yes. Key travels, mismatch row appears, soft binding allows it | Yes. It looks like the same sheet |
| Telemetry | Two installs, correct | One install. The count is wrong and `last_seen` flaps between two sheets |
| Per install cut-off | Hits one sheet | **Hits both, and Jon cannot separate them** |
| A friend given a copy | Runs on the owner's key, flagged | Runs, invisible, and indistinguishable from the owner |
| Grandfathering | The copy is a new install and is not grandfathered | The copy inherits free forever, indefinitely |

**Verify this before enforcement is switched on, not after.** It is a two minute
test: copy a sheet that has run at least once, run
`Blotter → Check this sheet (diagnostics)` on both, and compare the Blotter IDs.
The diagnostic already prints it. It is the cheapest high value check in this
document, it is Jon's to run, and the entire copy story depends on the answer.

---

## 7. Refunds and disputes

Short, because it should be.

**A refund kills the key.** `charge.refunded` sets `status = 'inactive'` with no
grace. The sheet stops on the next run and shows the blocked banner. The
student's data is untouched, exactly as in every other stopping case.

**A dispute kills the key immediately and Jon does not fight it.** Stripe's
dispute fee is fifteen dollars and it is charged whether or not the dispute is
won. On a product priced anywhere near ten dollars, contesting one is a loss
even when it succeeds. Accept it, mark the key inactive, move on.

**Buying again issues a new key, never the old one.** A refunded key may have
been shared before the refund, and resurrecting it resurrects whatever else was
using it. If the student comes back through the code path, the new key is bound
to the same install id at issuance and nothing has to be pasted.

**No proration, no partial refunds by hand.** A season pass with a stated refund
window ("full refund within 14 days, no refunds after") is one sentence on
`/pricing` and removes an entire category of email.

---

## 8. What has to exist before this can be switched on

Ordered. `[J]` needs Jon personally. `[R]` is repo work.

| # | Item | Who | Note |
|---|---|---|---|
| 1 | **Decide monthly or season pass, and the price** | `[J]` | Blocks everything. A season pass deletes half of §4.3, so this is not just a number |
| 2 | **Create `blotter_installs`** | `[J]` | **Urgent and independent of everything else.** It has never been created. Every day without it is a day of install history that cannot be recovered, and the grandfathering in §5.2 needs to know who was here before the cutover |
| 3 | Verify the copied sheet question in §6.4 | `[J]` | Two minutes. Changes the design if the answer is the unexpected one |
| 4 | Stripe account, business details, tax settings | `[J]` | |
| 5 | `supabase/007-billing.sql`: `blotter_keys`, `blotter_key_mismatches`, the `claim_code` and `entitled_until` columns, `blotter_key_state` | `[R]` then `[J]` runs it | Follow the conventions in `001` and `005`: RLS on, no policies, revoke from `anon` and `authenticated` |
| 6 | Fix the two courier defects in §10 and cut one courier release | `[R]` then everyone re-pastes | This is the expensive one. Bundle everything courier side into it, including the `Blotter key` help text, which cannot be changed from the server |
| 7 | `POST /api/checkout` and `POST /api/stripe/webhook` | `[R]` | Raw body for the signature (A7). Idempotent on session id |
| 8 | `/pricing`, `/key`, `/success`, and a real page at `/billing` | `[R]` | The blocked notice currently links to a 404 |
| 9 | Extend `refuse()` and `verdict.ts` for install level entitlement | `[R]` | §4.2. Keep the decision in `verdict.ts` where the tests are |
| 10 | Shorten the notice text to fit one line, and add the stage table from §4.4 | `[R]` | |
| 11 | Rewrite `/terms` §08 and the payment sentence in `/privacy` §10 | `[R]` | Both currently say no payment is taken from anyone |
| 12 | Run the grandfathering SQL | `[J]` | §5.2 |
| 13 | Turn the banners on, thirty days ahead | `[R]` | Notices only. Nothing refused |
| 14 | `BLOTTER_ENFORCE=on`, then `curl /api/entitlement` | `[J]` | Last |

Items 1, 2 and 3 are Jon's and none of them depends on any of the others. They
can happen this week.

---

## 9. How to test it

Two environments. A Vercel preview deployment with its own Supabase project and
Stripe test keys, and then one real sheet on production before anybody else is
affected. That second half is not optional and it is how D27 was done.

### 9.1 On the preview, before anything touches production

| # | Case | Set up | Expect |
|---|---|---|---|
| 1 | Baseline, switch off | `BLOTTER_ENFORCE` unset, empty `blotter_keys` | Every run succeeds. `curl /api/entitlement` → `{"enforcing":false}` |
| 2 | **Switch off beats every table** | Enforce off, key set to `inactive` | The run succeeds. Nothing in the database can refuse while the switch is off |
| 3 | No key, not entitled | Enforce on, empty cell, no install row | 402. Blocked banner. **Check a Status cell before and after: it must not change** |
| 4 | No key, grandfathered | `entitled_until = 'infinity'` | Runs normally. Resting banner |
| 5 | No key, inside trial | `first_seen` = today | Runs. `warning` banner from day 27 |
| 6 | No key, trial expired | `first_seen` = 40 days ago | 402. Blocked banner |
| 7 | Wrong key | Cell reads `BLT-0000-0000-0000` | 402, reason `unknown_key` |
| 8 | **Lowercase key** | Paste the real key in lowercase | Runs. If it does not, §2.1 was skipped |
| 9 | **Key with a trailing space** | Paste with a space after it | Runs |
| 10 | Active key | Normal | Runs. `info` confirmation for the first 24 hours after `bound_at`, then resting |
| 11 | Key bound elsewhere | Set `install_id` to a different UUID | **Runs.** One row in `blotter_key_mismatches` |
| 12 | Key on a copied sheet | Copy a sheet that has run, run the copy | Runs. Compare the two Blotter IDs from the diagnostic. **This is test 3 in §8** |
| 13 | Key on four sheets | Four mismatch rows in thirty days | Runs. `warning` banner about several sheets |
| 14 | Grace, unexpired | `status='grace'`, `grace_until` = +3 days | Runs. `warning` banner naming the date |
| 15 | Grace, expired | `grace_until` = yesterday | 402. Blocked banner |
| 16 | Refunded key | `status='inactive'` | 402 |
| 17 | **Database unreachable** | Point `SUPABASE_URL` at a dead host | **The run succeeds.** Fail open, always |
| 18 | Bad status in the row | `status='nonsense'` | 402. Refused, never waved through. Already covered by `selftest.ts` |
| 19 | Webhook, bad signature | Replay with a wrong secret | 400. No key issued |
| 20 | Webhook, replayed | Send the same event twice | One key, not two |
| 21 | Unknown claim code on `/key` | Type `ZZZZZZ` | The "we do not recognise that code" copy. No checkout session created |
| 22 | Banner width | Every line in §4.4, at 1440px and on a phone | Readable without scrolling right |
| 23 | Banner colour | One notice at each level | Blue, amber, red. **See §10.2 before trusting this one** |

### 9.2 On production, on one real sheet

Exactly as D27 was run, in this order, with a `curl` against
`/api/entitlement` between each step rather than a guess.

1. Enforce off. Confirm a normal run.
2. Issue a key to Jon's own sheet through real Stripe checkout with a real card.
   Confirm the success page, the code entry, and the confirmation banner.
3. Enforce on. Confirm Jon's sheet still runs.
4. Set Jon's key inactive. Confirm the blocked banner, confirm the sheet is
   unchanged, confirm the Contacts columns still hold their old values.
5. Set it active again. Confirm the sheet resumes and picks up where it left off.
6. Refund the charge in Stripe. Confirm the key goes inactive and the sheet
   stops.
7. Enforce off. Confirm everything runs again.

**Step 5 is the one to watch.** Resuming exactly where they left off is the
whole justification for freezing rather than degrading, and it has never been
demonstrated.

---

## 10. What the code says that this design does not

Four things found while reading. All of them are load bearing for billing and
none of them is fixed here, because this document is not allowed to touch code.

### 10.1 The courier never sends the key to telemetry, so binding never happens

`/api/telemetry/route.ts` calls `pickKeyUse(body)` and binds the key to the
install id. `pickKeyUse` reads `body.key`. **`telemetryPayload_` in
`courier/Code.gs` does not include `key`.** It sends `install_id`,
`contract_version`, `courier_version`, `at`, `contacts`, `seconds` and `ok`, and
nothing else.

So `pickKeyUse` returns null on every real request, `blotter_keys.install_id` is
never written, `blotter_key_mismatches` never gets a row, and A6's requirement
that binding be observable cannot be met.

Nothing breaks today, because soft binding allows unbound keys through. What is
lost is every signal about sharing.

**Two ways out.** Add `key` to `telemetryPayload_`, which is a courier release
and a re-paste for everyone. Or bind at issuance per §2.3, which needs no
courier change at all. The second is another reason to prefer the code path in
§3.2.

### 10.2 The notice banner has had no colours since the banner row landed

`NOTICE_STYLES` is declared with `fill` and `text` keys:

```js
var NOTICE_STYLES = {
  info:    { fill: '#e8f0fe', text: '#1a3d6d' },
  ...
```

`writeBanner_` reads `bg` and `fg`:

```js
var bg = style ? style.bg : '#ffffff';
var fg = style ? style.fg : INK_MUTED;
```

Both are `undefined`. Commit `b7ac478`, the one that moved the notice into the
banner row, changed the reads from `.fill` and `.text` to `.fg` and `.bg` and
left the constant alone.

**D27's rehearsal predates that commit**, so the colours were proven on the old
notice and have not been exercised since.

Two possible behaviours and they are both bad. If Apps Script tolerates
`setBackground(undefined)`, every notice renders white on grey and a blocked
message looks exactly like an ordinary one. If it throws, `writeBanner_` throws,
and in `courierPass_` that happens after `writePhaseBegun_ = true`, so a run
carrying any notice fails partway through the write phase. In the refusal path
it is wrapped in `try { } catch (ignored) { }`, which means **a student who is
cut off sees no banner at all.** That is precisely the failure the channel
exists to prevent.

This must be fixed and re-rehearsed before enforcement is switched on. It is two
characters of code and it invalidates test 23 until it is done.

### 10.3 The blocked notice links to a page that does not exist

`web/app/api/engine/route.ts` sets `url: "https://blotterib.com/billing"`. There
is no `app/billing` directory. A refused student would be sent to a 404 at the
exact moment they are trying to give Jon money.

Two related problems in the same line. The blocked text is 92 characters before
the URL, which does not fit the one line banner (§4.4). And the URL is written
into the cell as plain text through `safeCell_`, with no rich text link, so
**it is probably not clickable and the student has to type it.** Whether Sheets
auto-links a script written value is worth checking on a live sheet; if it does
not, the URL has to be short enough to retype, which `blotterib.com/key` is and
a URL carrying a UUID is not.

### 10.4 `NOTICE_TAB_COLOUR` is declared and never used

`var NOTICE_TAB_COLOUR = { info: '#4a7fd4', warning: '#d9a441', blocked: '#c0392b' };`
appears once in `courier/Code.gs` and is referenced nowhere. Something intended
to colour the Contacts tab on a notice was designed and not built. Colouring the
tab is a good idea for the blocked case, because it is visible from every other
tab in the sheet. Either build it or delete it.

---

## 11. Open questions for Jon

1. **What is the price?** `$9.99 / month` is in the code comments and has never
   been tested. There are zero checkout starts, ever, so there is no data. The
   price is the one input this whole document cannot supply.

2. **Season pass or monthly subscription?** Recruiting is seasonal. A student
   needs Blotter hard for four months and not at all for eight, and a
   subscription that quietly bills through the summer earns chargebacks from
   exactly the people who liked it. A season pass, one payment, entitled until a
   fixed date, no renewal, is a better fit for the product **and it deletes half
   the machinery in this document**: no `invoice.payment_failed`, no grace, no
   dunning, one webhook event. **Recommendation: season pass.** If the price is
   right, the simplification is worth more than the recurring revenue at this
   scale.

3. **What does a season pass cost?** Six months of $9.99 is $60, which is too
   much to ask a student for a spreadsheet helper. Somewhere between $19 and
   $29 for a full recruiting season is the range worth testing. **That is a
   guess and it should be labelled as one.** Nobody has tested any price.

4. **Free tier: none, a trial, or a contact limit?** Recommendation is no
   permanent free tier and a 30 day trial from `first_seen`. A contact limit
   turns a simple product into a metered one and invites the exact "how many
   contacts do I have" question the product does not otherwise raise.

5. **Grandfather the pilot cohort, permanently?** Recommendation is yes, per
   §5.2. It costs under a thousand dollars a season and keeps a promise that is
   in writing on `/terms` today.

6. **Does a copied sheet keep its Blotter ID?** §6.4. Two minutes with the
   diagnostic, and the answer changes the design. This is Jon's and nobody else
   can run it.

7. **What is the refund policy, in one sentence, on `/pricing`?**
   Recommendation: full refund within fourteen days, none after, no proration.

8. **Does the season pass need a `/terms` review before money is taken?**
   `/terms` was written when the answer to "what does it cost" was "nothing".
   Section 08 has to change, and the header comment on that file already says
   nobody qualified has checked it. Taking money raises the stakes on that.

9. **Is a transactional email worth adding for key delivery?** The
   recommendation in §3 avoids needing one. If Jon wants belt and braces on a
   paid student never losing their key, that is a Resend account and one route,
   and it is the only new dependency this design would otherwise add.


---

## 12. Found while verifying this document (4 September 2026)

- [x] **12.1 The notice banner had no colours, and had not since it was written.**
      `NOTICE_STYLES` declared `fill`/`text`; `writeBanner_` has always read
      `style.bg` and `style.fg`. Every notice resolved to `undefined` on both,
      so a notice rendered with no fill and no colour. On the refusal path the
      write sits inside `catch (ignored)`, so a student whose access was
      withdrawn could have seen nothing at all. Fixed to `bg`/`fg`, matching
      `STATUS_STYLE`, and a test now fails if the keys ever diverge again.
      **This is the channel the whole enforcement design depends on, and the
      reason an email list matters less than it looks. It was broken.**

- [ ] **12.2 The key binds through the wrong request, and so never binds.**
      `pickKeyUse` reads `key` from the telemetry body, but `telemetryPayload_`
      does not send one. The **engine** request does (`courier/Code.gs`, `key:
      settings.blotterKey`), and the engine route already uses it for
      `refuse(parsed.key)`.

      **Recommendation: bind in the engine route, not in telemetry.** The engine
      call is mandatory: without it the product does not work. Telemetry is
      opt-out by design, and the Settings tab tells students they may clear it.
      Binding a paid key through a channel a student is invited to switch off
      means a paying customer can be unable to bind, with no message saying why.
      Jon to rule before either is built on.

- [ ] **12.3 `https://blotterib.com/billing` is a 404** and it is what the
      blocked notice links to. It must exist before enforcement is switched on.

- [ ] **12.4 `NOTICE_TAB_COLOUR` is declared and never referenced.** Either
      colour the tab on a notice or delete it.


---

## 13. Jon's rulings, 4 September 2026

- [x] **13.1 The pricing model is deferred, on purpose.** `entitled_until` on
      `blotter_keys` carries it: null never expires (one-time), a date lapses
      (season pass), a webhook moving the date forward is a subscription. The
      entitlement check is the same sentence in all three, so the choice is a
      Stripe price object rather than a schema change. Build for all three.

- [x] **13.2 Free is temporary, and the terms now say so.** Jon's strategy is a
      free period to build a population, then convert. My grandfathering
      recommendation was wrong: it rested on a sentence in `/terms` that said
      *"Using Blotter while it is free does not commit you to paying for it
      later"*, which was meant to rule out back-charges and read as a promise of
      perpetual free. The sentence was the fault, not the strategy. §08 now says
      Blotter will not always be free, that the sheet says so before anything is
      owed, that the free period is never billed, and that stopping costs
      nothing. **There is no grandfathered cohort.**

- [x] **13.3 The key binds on the engine call.** Not on telemetry.

      Jon rejected the privacy argument, correctly: nothing is live, no student
      is using it, and the privacy page can be rewritten to match whatever is
      built. He asked for the decision on technical merit alone. It survives,
      and the strongest reason had not been stated:

      **Binding and checking must happen in the same request, or the first run
      after a purchase can be refused.** The engine decides entitlement. If
      binding happened in telemetry, then on the run right after a key is
      presented the engine would see a key not yet bound to this install and
      could refuse it, and telemetry would bind it a moment later. The student
      would watch a paid key fail once for no reason they could see. One
      request removes the race entirely.

      Three lesser reasons stand: telemetry is opt-out and the Settings tab
      invites students to disable it, so binding there means anyone who took
      that invitation can pay and never activate; telemetry failures are
      swallowed by design, and a binding failure is exactly the kind you want
      to see; and the engine already carries the key and already reads it to
      decide refusal, so it is the enforcement point already.

      **Neither option changes the Google permission scope.** Both requests are
      already made on every run and both already leave the sheet. Scope is not
      a differentiator here.

- [x] **13.4 The three tables are written.** `supabase/007-installs-and-keys.sql`.
      Jon runs it in the Supabase SQL editor. Until then every telemetry request
      answers `insert_failed` and no record of the free population exists.
