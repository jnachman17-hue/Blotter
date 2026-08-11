# Infrastructure runbook

Date created: August 10, 2026
Status: Live. Everything here is provisioned and verified working in production.

Everything in this file is operational fact, not design. It exists because a new
session inherits a running system with real users in it and no other way to
learn how to reach it.

## What is live

| Thing | Where | State |
|---|---|---|
| Site | `blotterib.com` and `www.blotterib.com` | Live, public, `noindex` |
| Preview URL | `blotter-claude.vercel.app` | Live, public, same deployment |
| Branch review URL | `blotter-claude-git-mobile-jnachman17-hues-projects.vercel.app` | Live, public, tracks the `mobile` branch head |
| Repo | `github.com/jnachman17-hue/Blotter-Claude` | Private, personal, **not** a fork |
| Host | Vercel, team `jnachman17-hue's projects`, Hobby | Auto-deploys on push to `main` |
| Leads | Supabase, US region | `leads` table, `real_leads` view |
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

Write the next one as `004-`. Never edit an applied file.

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

Delete `app/robots.ts` at launch. A site nobody may index is a site nobody can
find.

## Verification commands that have earned their place

- Service key not in the served HTML — run it after any change to
  `supabase-admin.ts` or the lead route.
- `POST /api/lead` with a junk `recruiting_track` — the whitelist should drop it
  and still return `stored: true`.
- A `confirmed` write followed by a later `checkout` write — the row must stay
  at `confirmed`, which is what migration 002 exists for.
- `real_leads` count before and after any internal run.
