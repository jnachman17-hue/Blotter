-- The three tables the sheets have been trying to write to since telemetry
-- shipped, and the one column that lets billing be decided later.
--
-- Paste this whole file into the Supabase SQL Editor and press Run. Every
-- statement is idempotent, so running it twice is safe, and none of it touches
-- the tables `/api/lead` and `/api/contact` already use.
--
-- ## Why this is overdue
--
-- `/api/telemetry` has upserted into `blotter_installs` since the day it was
-- written. The table has never existed, so every request has answered
-- `insert_failed` and every run of every sheet has been dropped on the floor.
-- Nothing is broken by that: telemetry is fire-and-forget and a failure never
-- reaches a student. But it means there is no record of who is using Blotter,
-- and the free population is exactly the cohort that has to be identified
-- before anyone can be asked to pay.
--
-- Every day without this table is a day of that cohort that cannot be
-- recovered afterwards.
--
-- ## What is in each table
--
-- `blotter_installs`  one row per sheet, keyed by the random install id the
--                     courier mints on first run. No name, no address, no
--                     subject, no message: the id says which sheet, and
--                     nothing about the person holding it.
-- `blotter_keys`      one row per key sold. `install_id` is null until the key
--                     is first used, and then it is that sheet's, permanently.
-- `blotter_key_mismatches`
--                     a key seen on a second sheet. Recorded, never refused:
--                     one student making a fresh copy of their own tracker
--                     looks identical from here to two people sharing a key,
--                     and locking out somebody who paid is the worse mistake.

create table if not exists public.blotter_installs (
  install_id       uuid        primary key,
  first_seen       timestamptz not null default now(),
  last_seen        timestamptz not null default now(),
  contacts         integer     not null default 0,
  seconds          integer     not null default 0,
  ok               boolean     not null default true,
  contract_version integer,
  courier_version  text
);

comment on table public.blotter_installs is
  'One row per sheet. Counts only: no name, address, subject or message.';

-- Weekly actives and churn are both "order by last_seen", so it is indexed.
create index if not exists blotter_installs_last_seen
  on public.blotter_installs (last_seen desc);

create table if not exists public.blotter_keys (
  key           text        primary key,
  created_at    timestamptz not null default now(),
  -- Null until first use. Set once, by the first sheet to present it.
  install_id    uuid        references public.blotter_installs (install_id),
  bound_at      timestamptz,
  -- The one column that lets the pricing decision wait.
  --
  -- Null means the key never expires, which is a one-time purchase. A date
  -- means it lapses then, which is a season pass. A subscription is the same
  -- date moved forward by a webhook each time a payment succeeds. All three
  -- are read the same way: a sheet is entitled when it holds a key whose
  -- `entitled_until` is null or still in the future. So the model can be
  -- chosen when there is something to sell, and nothing here is rebuilt.
  entitled_until timestamptz,
  -- Set when a refund or chargeback withdraws a key. Kept rather than deleted,
  -- so a key that comes back can be recognised instead of looking unissued.
  revoked_at    timestamptz,
  stripe_session_id text,
  note          text
);

comment on column public.blotter_keys.entitled_until is
  'Null = never expires. A date = lapses then. Supports one-time, season and subscription without a schema change.';

create index if not exists blotter_keys_install_id
  on public.blotter_keys (install_id);

create table if not exists public.blotter_key_mismatches (
  id              bigserial   primary key,
  key             text        not null,
  seen_install_id uuid        not null,
  seen_at         timestamptz not null default now()
);

comment on table public.blotter_key_mismatches is
  'A key presented by a sheet other than the one it is bound to. Recorded for a person to look at, never used to refuse a run.';

-- Row-level security on, with no policies. The website reaches these through
-- the service_role key, which bypasses RLS; anything holding only the anon key
-- gets nothing. Same shape as `001` and `004`.
alter table public.blotter_installs        enable row level security;
alter table public.blotter_keys            enable row level security;
alter table public.blotter_key_mismatches  enable row level security;

revoke all on public.blotter_installs        from anon, authenticated;
revoke all on public.blotter_keys            from anon, authenticated;
revoke all on public.blotter_key_mismatches  from anon, authenticated;
