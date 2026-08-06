-- Blotter lead storage.
--
-- Run this once, in the Supabase dashboard: SQL Editor -> New query -> paste
-- -> Run. It is safe to run twice; every statement is guarded.
--
-- Fields are WS5-SPEC Phase 4: recruiting email, track, window, surface
-- variant, CTA location, session and visitor identifiers, timestamp, and the
-- furthest funnel stage reached. `recruiting_track_other` and
-- `recruiting_window_other` were added on August 6, 2026 to capture what
-- people type when they choose `Other`.
--
-- Only `app/api/lead/route.ts` writes here, using the service_role key from the
-- server. Row-level security is enabled with no policies, which means the anon
-- key can do nothing at all: no reads, no writes. That is deliberate. The
-- service_role key bypasses RLS by design, so the route still works, and a
-- leaked anon key gives an attacker nothing.

create table if not exists public.leads (
  id                       bigint generated always as identity primary key,

  -- The lead itself. This column is the reason the table is locked down.
  email                    text not null,

  recruiting_track         text,
  recruiting_window        text,
  recruiting_track_other   text,
  recruiting_window_other  text,

  surface_variant          text not null default 'spreadsheet',
  cta_location             text,

  -- One row per visitor. The upsert in the route conflicts on this.
  visitor_id               text not null,
  session_id               text,

  furthest_stage           text,
  test_iteration           text,

  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

-- Makes the upsert idempotent: a visitor who runs the funnel twice updates
-- their row instead of adding a second one. WS3 counts unique visitors, so a
-- duplicate row is a wrong number, not a harmless extra.
create unique index if not exists leads_visitor_id_key
  on public.leads (visitor_id);

-- Export and inspection are almost always "newest first".
create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

-- Keep updated_at honest on upsert.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_touch_updated_at on public.leads;
create trigger leads_touch_updated_at
  before update on public.leads
  for each row execute function public.touch_updated_at();

-- Locked by default. No policies are created, so anon and authenticated roles
-- have no access whatsoever. Do not add a policy without deciding who is being
-- let in and why.
alter table public.leads enable row level security;

-- Belt and braces: revoke the grants PostgREST hands out automatically.
revoke all on public.leads from anon, authenticated;
