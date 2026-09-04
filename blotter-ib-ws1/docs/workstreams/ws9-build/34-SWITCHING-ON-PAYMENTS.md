# Switching on payments

**Everything here is built and has been run end to end with real money.** On
4 September 2026 a sheet was cut off, shown a banner, taken through the billing
page, paid for with a live card, restored, refunded, and cut off again. Every
step was checked in the database rather than inferred from a screen.

So this is not a design document. It is the list of switches, in order, for the
day the decision is made. **Nothing below needs working out again.**

---

## 1. What already exists

| Piece | State |
|---|---|
| Stripe account, branded Blotter | Live. Separate from Un-Claude, because checkout branding is account-wide and a student must not see another product's name. |
| Product and price | `price_1UC3unE7sNATx9lvP4tEHylh`, $5.00, one-off. |
| Restricted key | `Blotter production`. One-time payments and Recurring subscriptions. Payouts is None. |
| Webhook endpoint | `Blotter billing`. **URL still points at the preview deployment.** See §3. |
| `blotter_installs`, `blotter_keys`, `blotter_key_mismatches` | Created. Migrations `007`, `008`, `009`. |
| Checkout, webhook, entitlement, `/billing`, `/billing/done`, `/update` | Built, deployed, dormant. |
| One-off purchases | Tested with real money, including refund. |
| Subscriptions | Built, never run against a live recurring price. See §7. |

---

## 2. How it works, in six sentences

A sheet sends its random install id to the engine on every run. The engine looks
up any key rows bound to that install and decides: a sheet is entitled when it
holds a key that is not revoked and whose `entitled_until` is either empty or
still in the future. If it is not entitled and enforcement is on, the run is
refused, **nothing is written to any row**, and a notice is returned that the
courier paints across the top of Contacts. The student reads the banner, goes to
`/billing`, types the Blotter ID from their Settings tab, and pays. Stripe's
webhook creates the key row with the install id already on it, so nothing is
ever pasted back into the sheet. The next run finds the key and the tracker
resumes.

**The key never travels to the sheet.** The student names their sheet before
paying, which is why there is no key to lose, mistype, or paste into the wrong
copy.

---

## 3. The switch-on checklist

Do these in order. Each one is verifiable, and the verification is given.

### 3.1 Decide the price and the model

Change the price in Stripe, or make a new one and update `STRIPE_PRICE_ID`.
**The checkout mode is read off the price**, so a recurring price switches the
whole flow to subscriptions with no code change. Read §7 first if you go that
way.

### 3.2 Move the webhook to production

Stripe → Webhooks → `Blotter billing` → edit the URL to:

```
https://blotterib.com/api/billing/webhook
```

**Do not create a second endpoint.** Editing the existing one keeps the same
signing secret, so `STRIPE_WEBHOOK_SECRET` does not change. A second endpoint
means a second secret and only one can be in the environment.

### 3.3 Set the environment variables

In Vercel, **Production** as well as Preview:

| Variable | Value | What it does |
|---|---|---|
| `STRIPE_SECRET_KEY` | `rk_live_…` | Already set. |
| `STRIPE_PRICE_ID` | `price_…` | Already set. Change it if the price changes. |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` | Already set. Unchanged if §3.2 was an edit. |
| `BLOTTER_ENTITLEMENT_DAYS` | `forever` | Empty or `forever` means the key never expires. A number of days makes it a season pass. Ignored for subscriptions, where Stripe's period end governs. |
| `BLOTTER_SELLING` | `on` | Shows the buy button on `/billing`. **Already on in production since 4 September 2026.** Jon left it after the live test: the page is unlinked and `noindex`, and reaching it means guessing the URL, already holding a Blotter ID, and choosing to pay for something the same page says is free. Nothing to do here. |
| `BLOTTER_ENFORCE` | `on` | **The actual switch.** Sheets without a key stop updating. |

Two variables exist only for rehearsals and should stay unset in production:
`BLOTTER_BILLING_URL` and `BLOTTER_UPDATE_URL`. They override where the sheet's
banners point, and a stale value is how an earlier test blocked a sheet with no
visible cause.

### 3.4 Verify before believing

```
curl https://blotterib.com/api/entitlement
```

Must answer `{"enforcing":true}`. That endpoint reads the same function the
engine reads, deliberately, so there is exactly one source of truth. **A switch
with two sources is a switch you cannot turn off by looking at one of them.**

---

## 4. Website changes that must ship with it

These are false the moment money is charged, and every one is user-facing.

| Where | Says now | Must become |
|---|---|---|
| `hero-top.tsx`, under the CTA | "Free. No card, nothing to install. Setup takes about three minutes." | The price, and what it buys. |
| `cta-button.tsx` | `CTA_LABEL = "Set up free"` | Something that is not a promise of free. |
| `funnel-copy.ts`, email step | "if Blotter ever stops being free" | Past tense, or cut. |
| `/terms` §08 | "Blotter is free. No payment has been taken from anyone" | The price, and that payment is taken. |
| `/terms` §10 | "Blotter is free, so today that figure is 50 US dollars" | Recalculate against six months of real payments. |
| `/billing` | Already handles both states from `enforcing()`. | Nothing. |
| `/privacy` | Says nothing about payment. | Add Stripe as a processor: they receive card details, we never do. |

**`/billing` is linked from nowhere on the site.** That is deliberate while it
sells nothing. When selling, decide whether it belongs in the footer. The
blocked banner links to it regardless, which is the path that matters.

---

## 5. The refund and dispute path

Handled from the first day, and tested. A refund or a chargeback sets
`revoked_at` and the sheet stops being entitled on its next run. The row is kept
rather than deleted, so a key that comes back is recognised instead of looking
unissued, and `reason: "revoked"` is distinguished from `reason: "no_key"` so
the banner can tell somebody who paid and was refunded from somebody who never
paid.

Matching works because both Stripe identifiers are recorded at purchase: a
purchase event carries a session id, a refund event carries only a payment
intent, and Stripe puts no session id on the refund.

---

## 6. What has never been tested

Be honest about this list when the day comes.

- **A second sheet presenting the same key.** The mismatch table exists and
  nothing writes to it, because binding happens at purchase now rather than at
  runtime. Either wire it up or drop the table.
- **A copied sheet.** Copying a sheet copies the Settings cells but not the
  script properties, so the copy should mint a fresh install id and be
  unentitled. Asserted in two documents, never actually run. **Two minutes with
  the diagnostic settles it.**
- **Two sheets owned by one person.** Each is entitled separately, so they pay
  twice. That may be right. It has not been decided.
- **A subscription renewal.** See §7.
- **Any payment that is not a card.** Cash App Pay, Klarna and Bank were all
  offered on the live checkout page. Only a card has been run.

---

## 7. If the model becomes a subscription

The code handles it and none of it has been exercised against a live recurring
price.

- The checkout mode is read off the price, so switching the price is the whole
  change.
- `invoice.paid` pushes `entitled_until` out to the end of the period just paid
  for, read from Stripe rather than computed here.
- **Cancellation needs no handler.** A cancelled subscription stops sending
  invoices, the last period end stands, and the sheet lapses on the day it was
  already paid up to.
- `BLOTTER_ENTITLEMENT_DAYS` stops mattering; Stripe's period end governs.
- **Not built: dunning.** A failed renewal payment does nothing but let the
  entitlement lapse. There is no warning banner and no grace. If a subscription
  is chosen, decide whether that is acceptable before switching on.

---

## 8. Turning it back off

Delete `BLOTTER_ENFORCE` and `BLOTTER_SELLING` from Vercel rather than setting
them to `off`, and redeploy. Existing keys stay valid and everybody runs.

**Delete rather than blank.** An earlier rehearsal was blocked for an hour by a
stale value taking effect on a later build, and a variable that does not exist
cannot come back.
