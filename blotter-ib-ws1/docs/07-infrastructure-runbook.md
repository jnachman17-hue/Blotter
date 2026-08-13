# Infrastructure runbook

Date created: August 10, 2026
Status: Live. Everything here is provisioned and verified working in production.

Everything in this file is operational fact, not design. It exists because a new
session inherits a running system with real users in it and no other way to
learn how to reach it.

## What is live

| Thing | Where | State |
|---|---|---|
| Site | `blotterib.com` and `www.blotterib.com` | Live, public, **indexed** |
| Preview URL | `blotter-claude.vercel.app` | Live, public, same deployment |
| Branch review URL | `blotter-claude-git-mobile-jnachman17-hues-projects.vercel.app` | Live, public, tracks the `mobile` branch head |
| Repo | `github.com/jnachman17-hue/Blotter-Claude` | Private, personal, **not** a fork |
| Host | Vercel, team `jnachman17-hue's projects`, Hobby | Auto-deploys on push to `main` |
| Leads | Supabase, US region | `leads` table, `real_leads` view |
| Contact messages | Supabase, US region | `contact_messages` table, `real_contact_messages` view |
| Analytics | PostHog US Cloud, project `546166` | Nine canonical events |

`org-fork` (`Jon-sOrg/Blotter-Claude`) is a stale remote. Do not push to it.

## Credentials

All six live in `web/.env.local`, which is gitignored and must stay that way.
`web/.env.example` lists the names with empty values and is committed.

Read them from the file. **Never print a value, never paste one into chat, and
never put the Supabase service key behind a `NEXT_PUBLIC_` prefix** — that
prefix ships a value to the browser and that key bypasses row-level security.

The same four are set in Vercel's project environment variables. Changing one
locally does not change production.

Two known traps, both already hit:

- `SUPABASE_URL` must be the project origin. Pasting the Data API endpoint
  (`.../rest/v1/`) produces `Invalid path specified in request URL`, which names
  nothing useful. `lib/supabase-admin.ts` now normalises it, so this is
  defused rather than merely documented.
- `POSTHOG_PROJECT_ID` currently holds a URL fragment rather than a bare
  number. Extract digits from it; do not assume it is clean.

## Querying Supabase

There is no CLI wired up. Query PostgREST directly with the service key:

```
GET  {SUPABASE_URL}/rest/v1/real_leads?select=*&order=created_at.desc
     apikey: {SERVICE_ROLE_KEY}
     Authorization: Bearer {SERVICE_ROLE_KEY}
```

**Read `real_leads`, never `leads`.** The view excludes internal rows; the table
does not, and every count taken from the table will be wrong.

Jon's own tooling is the Supabase dashboard: **Table Editor -> `real_leads`** is
the day-to-day view, and saved snippets in the SQL Editor are for counting.
Authentication -> Users is always empty and is not where leads live.

### Migrations

`supabase/*.sql`, applied in order, run by hand in the SQL Editor.

| File | What it did |
|---|---|
| `001-leads.sql` | The table, RLS on with no policies, unique index on `visitor_id` |
| `002-furthest-stage-index.sql` | Stopped `furthest_stage` regressing on out-of-order writes |
| `003-mark-internal-leads.sql` | `is_internal` column and the `real_leads` view |
| `004-contact-messages.sql` | The `contact_messages` table, RLS on with no policies, and the `real_contact_messages` view. **Applied by Jon on August 11, 2026** |
| `CHECK-view-security.sql` | Read-only. Four checks behind `005`. Not a migration |
| `005-lock-down-views.sql` | `security_invoker` on both views, and revokes `anon`/`authenticated` on all four objects. **Applied by Jon on August 12, 2026** |
| `006-restamp-stage-index.sql` | Restamps `furthest_stage_index` after `waitlist` was inserted into the stage order: `confirmed` 7 to 8, `checkout` 6 to 7. **Applied by Jon on August 12, 2026** — verified, six rows now read `confirmed` at 8 and the check returns no rows |

Write the next one as `007-`. Never edit an applied file.

### The stage order, and why it is written down here

`lib/funnel-store.ts` holds it and a stage's index is its position:

```
0 closed · 1 question_track · 2 question_window · 3 film
4 email · 5 price · 6 waitlist · 7 checkout · 8 confirmed
```

`waitlist` was inserted at 6 on August 12, 2026, which is what `006` exists to
reconcile. **Inserting another stage means another restamp.** Migration 002's
trigger keeps the highest index a row has ever seen, so it will silently refuse
a stage that ranks lower than one already recorded — correct behaviour, and the
reason a renumbering has to be applied to stored rows rather than assumed.

**Read `real_contact_messages`, never `contact_messages`**, for exactly the
reason `real_leads` exists: Jon's own tests carry `is_internal` and the view
drops them. A deploy-verification row was written on August 11 and is flagged
internal; it can be deleted whenever.

## Querying PostHog

Personal API key in `.env.local`. The query endpoint accepts HogQL:

```
POST https://us.posthog.com/api/projects/{POSTHOG_PROJECT_ID}/query/
     Authorization: Bearer {POSTHOG_PERSONAL_API_KEY}
     {"query": {"kind": "HogQLQuery", "query": "select ..."}}
```

**Scopes are incomplete.** Read and `dashboard:write` work. `insight:write` and
`person:write` were requested on August 10 and did not register — both still
return 403. Ask Jon to re-check them before planning any work that needs them.

### Reading results honestly

Three filters, and each earns its place:

```sql
where timestamp > '2026-08-07 02:20:00'
  and properties.$host in ('blotterib.com','www.blotterib.com')
  and distinct_id not in (
    select distinct_id from events
    where properties.is_internal = 'true'
       or properties.$host in ('localhost:3000','blotter-claude.vercel.app')
  )
```

The date cuts the setup window, the host filter drops development traffic, and
the last clause drops Jon.

Without them the funnel reports **three people confirming a beta spot when the
true number is zero.** Jon has applied the host and person filters to his saved
`Canonical Funnel` insight, which gets him to within three visitors of the truth
at step one; the exact figure needs the timestamp cutoff, which PostHog's date
picker cannot express in hours.

The permanent fix is `person:write`: flag the fourteen internal persons directly
and the date filter stops being necessary.

### The tenth event, and where it must not go

`waitlist_joined` was added on August 12, 2026, amending WS3's frozen nine.

**It must not be a step in the canonical funnel.** A PostHog funnel is an
ordered sequence, and `waitlist_joined` and `checkout_started` are mutually
exclusive branches off `price_viewed` — a visitor does exactly one. Inserting it
between them drives every later step to zero and destroys `checkout_started`,
the primary comparative metric.

It lives in its own saved insight, **`Waitlist Branch`**: `price_viewed` then
`waitlist_joined`, one-hour conversion window, with the three filters above.
Read it beside the canonical funnel, not inside it.

### Two cross-checks that have earned their place

**PostHog against Supabase.** Filtered `email_submitted` should equal
`real_leads`. On August 12, 2026 it read **6 against 5**, and the missing one
was traced to a specific event at 04:30 UTC with no row at any timestamp. Cause:
the `visitor_id = "anonymous"` collision the security audit fixed the same
morning — storage-blocked visitors shared one upsert key and overwrote each
other. **A real lead was permanently lost.** The fix shipped hours later and
the next capture stored correctly. Run this comparison whenever the numbers are
about to be relied on.

**The upsert makes "no new row" the correct result for a returning tester.**
`leads` is keyed on `visitor_id`, so a browser that has been through the funnel
before updates its existing row rather than adding one. Combined with 002's
trigger, a tester already at `confirmed` can never show `furthest_stage:
waitlist` — the trigger refuses to lower it. Both are working as designed and
both look like failures. Use a fresh incognito profile with
`?blotter_internal=1` to test a stage from a clean identity.

## Telling a waitlist join from an email capture

Added August 13, 2026, because the question came up as soon as the branch
produced its first join and the answer was not written down anywhere.

**`furthest_stage` is the column.** `real_leads` is `select * from leads where
is_internal = false`, so it carries every column the table has, including this
one. Nothing extra needs joining or deriving.

The ladder, from `lib/funnel-store.ts`:

| index | `furthest_stage` | what the person did |
|---|---|---|
| 4 | `email` | gave their email and stopped. **Never saw the price** |
| 5 | `price` | saw `$9.99 / month` and left |
| 6 | `waitlist` | **clicked `Join the waitlist instead`** |
| 7 | `checkout` | clicked `Continue to payment` |
| 8 | `confirmed` | clicked a payment method |

So an email address alone tells you nothing about intent, and
`furthest_stage` tells you everything. The read:

```sql
select created_at, email, furthest_stage, furthest_stage_index,
       recruiting_track, recruiting_window, cta_location
from real_leads
order by created_at desc;

select furthest_stage, count(*) from real_leads group by 1 order by 2 desc;
```

**One caveat that does not bite today and will later.** `waitlist` ranks
**below** `checkout` deliberately — everyone who clicks pay is on the same list,
so checkout is strictly the further outcome. A visitor who joined the waitlist
and later clicked pay therefore reads as `checkout`, and `furthest_stage`
**undercounts waitlist joins** the moment any checkout starts exist. There have
been none ever, so the column is currently exact. **For a true count of the
button being pressed, PostHog's filtered `waitlist_joined` is the authority and
`furthest_stage` is the corroboration.**

**`SUPABASE_URL` already ends in `/rest/v1/`.** It is the REST base, not the
project root, so a query is `"${SUPABASE_URL%/}/real_leads?select=…"`. Appending
`/rest/v1/` again returns `PGRST125 Invalid path specified in request URL`,
which reads like a permissions problem and is not one.

## Promotional links and attribution

Written August 12, 2026, before the first post. **This is the instrument that
makes the August 12 audience ruling readable.** The audience is deliberately
broad — anyone recruiting in finance — so composition is read after the fact
rather than controlled up front, and `traffic_source` is what makes reading it
possible. WS3's reporting requirements demand results by traffic source.

### The scheme

**Two parameters, never more.**

```
https://blotterib.com/?utm_source=<platform>&utm_campaign=<post>
```

- **`utm_source`** is the platform, one bare lowercase token: `linkedin`, `x`,
  `reddit`.
- **`utm_campaign`** identifies the individual post:
  `<platform>-<placement>-<nn>`, where `placement` is omitted when the platform
  has only one surface, and `nn` is a two-digit ordinal. Lowercase and hyphens
  only.

**No `utm_medium`, `utm_term` or `utm_content`.** The adapter reads exactly two
parameters and WS3 names exactly two properties. Parameters the instrument
ignores add length to a link that people can see, and buy nothing.

### Nobody ever types that URL. Short links, added August 12, 2026

**The parameters never appear in a post.** Jon's objection was that
`blotterib.com` is cleaner than a query string, and on Reddit a visible tracking
query reads as marketing on the one platform where that costs most. Both are
right, so the tracking moved off the visible link and onto the server.

**A post shows a short path. The server adds the parameters. The page then takes
them back out of the address bar.**

```
blotterib.com/r     ->  /?utm_source=reddit&utm_campaign=reddit-01
blotterib.com/x     ->  /?utm_source=x&utm_campaign=x-01
blotterib.com/li    ->  /?utm_source=linkedin&utm_campaign=linkedin-01
```

The table is `PROMO_LINKS` at the top of `web/next.config.ts` and **adding a post
is one line.** `path` is what goes in the post; `campaign` is what appears in
PostHog:

```ts
{ path: "/mba", source: "reddit", campaign: "reddit-mba-01" },
```

Three properties of this worth knowing:

- **307, not 308.** A temporary redirect can be re-pointed later. A permanent one
  is cached by browsers and is very hard to take back.
- **A path cannot collide with a real route.** Taken: `/privacy`, `/contact`,
  `/review/*`, `/api/*`, `/opengraph-image`, `/icon.svg`.
- **The address bar is cleaned after capture.** `AnalyticsProvider` strips
  `utm_*` with `history.replaceState`, so a visitor sees, bookmarks and copies
  `blotterib.com/`. `?blotter_internal=1` and the review parameters survive. It
  is skipped when storage is unavailable, because a private-browsing visitor
  re-reads the URL on every event and stripping it would send the rest of their
  funnel to `direct`.

Verified on a production build: all three paths return 307 to the right
destination; `/r` lands, stores `{reddit, reddit-01}`, and leaves
`http://localhost:3100/` in the address bar; and
`/?blotter_internal=1&utm_source=reddit&utm_campaign=reddit-mba-01` keeps the
internal flag while dropping both tracking parameters.

### Rules

1. **One campaign value per post, never reused.** A second post to the same
   place is `-02`. This is the only thing that separates them afterwards.
2. **A link in a comment or a reply is its own placement** —
   `reddit-financialcareers-comment-01`. `social/README.md` designates Film C
   for replies, so replies are a real placement rather than an afterthought.
3. **Never post the bare URL when a tagged one will do.** An untagged click
   falls back to the referrer, which the platforms mangle.
4. **On Reddit, prefer a text post with a markdown link to a link post.** A link
   post displays the URL in full, and a visible tracking query reads as
   marketing on the one platform where that costs the most.

### What the adapter does, rewritten August 12, 2026

`lib/analytics.ts`. The previous version could not answer the attribution
question on these three platforms; the rewrite is an instrumentation repair and
changes no event meaning.

- **First identified touch wins**, stored in `localStorage` under
  `blotter:r1:attribution` and reported on every subsequent event. The post that
  brought someone gets the credit.
- **`direct` is the value for unattributed traffic** and is deliberately never
  stored, so a visitor who arrives cold and returns through a tagged link can
  still be claimed by it. The old code emitted the empty string here, because
  `??` does not catch `""`.
- **Referrers reduce to a bare hostname** — `https://www.reddit.com/r/x/…`
  becomes `reddit.com` — so one source is one row rather than many.
- **Own-host referrers are ignored.** A visitor going to `/privacy` and back used
  to be re-attributed to `blotterib.com`, overwriting their real source.
- **Capture happens on page load**, from `AnalyticsProvider`, not only inside
  `track()`. Attribution used to be reachable only through an event, so it
  silently depended on milestone-suppression state.

Verified on a production build, five cases: a tagged arrival stores source and
campaign; a later differently-tagged arrival does not overwrite it; a direct
arrival stores nothing; an own-host referrer is ignored; a cross-host referrer
stores the bare hostname.

**PostHog's `$pageview` carries UTM natively as well**, so its own Web Analytics
is an independent second read on the same question. Where the two disagree,
`traffic_source` is first-touch and `$pageview` is per-load — that is the
explanation, not a fault.

### One gap in the internal filter, noted rather than fixed

The canonical read filter excludes `localhost:3000`, and
`.claude/launch.json`'s production-build config serves on **`localhost:3100`**.
Local production testing therefore does not mark a person internal by that
clause. It does not affect any number today, because the positive host filter
admits only `blotterib.com` and `www.blotterib.com` — but if that clause is ever
relied on alone, add `localhost:3100`.

## The internal-visitor flag

`?blotter_internal=1` on any page marks that browser forever;
`?blotter_internal=0` clears it. It becomes a PostHog person property and an
`is_internal` column on leads.

**It is per origin.** `blotterib.com`, `www.blotterib.com` and
`blotter-claude.vercel.app` are three separate stores, and localhost a fourth.
Jon has flagged his desktop and phone on the two live hostnames. Any new
hostname needs flagging again.

It cannot be applied retroactively to a person that never sent it, which is why
the timestamp cutoff above exists at all.

## Deployment

Push to `main` and Vercel builds. Root directory is `web`.

**Every branch gets a preview, and previews are public as of August 11, 2026.**
Pushing any branch produces a deployment, and Vercel aliases the branch head to

```
https://blotter-claude-git-<branch>-jnachman17-hues-projects.vercel.app
```

which is stable across pushes. That is the review link. It replaced the dev
server, which died four times in session 6 and again in session 7.

### Branches, as of August 11, 2026

**`main` is the only live branch and everything is merged into it.** `web`
carried waves 1 and 2 and was merged on August 11; `mobile` is 25 commits
behind and is dead. Both are safe to delete and are kept only as history.

Push to `main` and production deploys. Expect roughly 60 to 90 seconds.

### How preview protection was turned off, and how to put it back

Vercel Authentication was on with `deploymentType: all_except_custom_domains`,
which is why `blotterib.com` was public and every preview URL 302'd to
`vercel.com/sso-api`. Jon could not reach the dashboard control and authorised
the change on August 11, 2026.

The dashboard is not the only way. **`vercel api` makes authenticated calls with
the CLI's own credentials**, so no token is ever read or handled:

```
echo '{"ssoProtection": null}' | vercel api \
  "/v9/projects/prj_E6AwlNkKRJExQhIFJFxEpdrIVqWX?teamId=team_4xVAEsxQQQJGwkd6mabjRXO5" \
  -X PATCH --input - --raw
```

To restore it, send `{"ssoProtection": {"deploymentType": "all_except_custom_domains"}}`.

**The Vercel MCP connector cannot see this project.** It lists the team and
returns an empty project array, and every project call 404s, so it is
authenticated to a different account. Use the CLI.

### What being public costs, and what it does not

- **Production is unaffected.** `ssoProtection` never applied to custom domains,
  so `blotterib.com` was already public and nothing about it changed. Verified
  200 before and after.
- **`noindex` still applies**, because it is in the application code rather than
  a platform setting. A public preview is unlisted, not indexed.
- **Analytics are already safe.** The canonical filter in this file restricts to
  `blotterib.com` and `www.blotterib.com`, so a branch host is excluded from
  every number by construction. It is a **fifth origin** for the
  `?blotter_internal=1` flag, which is per origin; flagging it is optional
  precisely because the host filter already drops it.

**Production cannot be protected on Hobby.** Vercel Authentication and password
protection for production deployments are Pro features; the API returns
`invalid_sso_protection`. The live URL is genuinely public rather than unlisted,
and `noindex` plus `app/robots.ts` are the only things keeping it out of search.

### Indexing was turned on, August 11, 2026

**`app/robots.ts` is deleted and `app/layout.tsx` sets `robots: { index: true,
follow: true }`.** `https://blotterib.com/robots.txt` returns 404 by design.

Jon challenged the noindex rule and the premise had expired: it came from a WS5
line about keeping a *private, unpublished* build out of indexes, written before
there was a domain or any traffic. The argument that carried the change is
**recall** rather than cold search — someone reads a post, does not click, and
searches "Blotter IB" days later. Unindexed they found nothing.

**The `/review/*` routes now rely on their own metadata.** Each sets
`robots: { index: false, follow: false }` in its own `page.tsx`. Before this
change the site-wide rule covered them; it no longer does. **If a new review
route is added, it must set that itself or it will be indexed.**

### The share card

`app/opengraph-image.tsx` generates a 1200x630 PNG at build. Before August 11
the site served a `<meta name="description">` and nothing else, so every link
posted anywhere rendered as a bare URL.

Two things a later session needs to know:

- **Satori cannot read WOFF2.** Every face here is WOFF2 under a `next/font`
  content hash that changes per build, so the card's fonts are committed as TTF
  in `web/app/_og-fonts/`. Do not delete that directory.
- **Platforms cache previews hard.** After changing the card, re-scrape through
  LinkedIn's Post Inspector or the change will not show for weeks.

## Verification commands that have earned their place

- Service key not in the served HTML — run it after any change to
  `supabase-admin.ts` or the lead route.
- `POST /api/lead` with a junk `recruiting_track` — the whitelist should drop it
  and still return `stored: true`.
- A `confirmed` write followed by a later `checkout` write — the row must stay
  at `confirmed`, which is what migration 002 exists for.
- `real_leads` count before and after any internal run.
