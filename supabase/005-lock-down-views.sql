-- Make the `real_*` views respect row-level security, and revoke what nothing
-- revoked.
--
-- ⚠ RUN `CHECK-view-security.sql` FIRST. It is a read-only diagnostic that
-- tells you whether this migration is needed. It takes ten seconds and it is
-- the only way to know whether the audit's reading was right, because the
-- schema was applied by hand and may have drifted from these files.
--
-- Then paste this whole file into the Supabase SQL Editor and press Run.
-- Everything below is safe to run even if the problem turned out not to exist:
-- every statement is idempotent, and none of them touches the service_role key
-- the website uses, so `/api/lead` and `/api/contact` keep working either way.
--
-- ## What this is for
--
-- `001` and `004` both claim the same protection in their comments: RLS on with
-- no policies, so "a leaked anon key gives an attacker nothing". For the two
-- base tables that is true. For the two views it probably is not.
--
-- In PostgreSQL a view without `security_invoker` runs with the privileges of
-- the role that OWNS it, not the role querying it. These views were created by
-- pasting into the dashboard SQL editor, so the owner is a superuser role,
-- so a query through `real_leads` executes as that role — and the row-level
-- security on `public.leads` never applies. The view is a hole cut through the
-- exact protection the table was given.
--
-- Two things must both be true for that to be reachable: the view must lack
-- `security_invoker`, and `anon` must hold SELECT on it. Nothing in `003` or
-- `004` sets the first or revokes the second, and Supabase ships default
-- privileges granting to `anon` and `authenticated` on objects created in
-- `public`. `001` revokes on `public.leads` — but a view is a separate object,
-- and `004` never revokes on `contact_messages` at all.
--
-- **This is latent rather than live.** The application uses no anon key: there
-- is no `NEXT_PUBLIC_SUPABASE_ANON_KEY` anywhere, the browser never talks to
-- the database, and the production client bundles contain no reference to the
-- project. So no published credential reaches these views today. This migration
-- exists so that stays true if an anon key is ever introduced, which is the
-- ordinary next step for any Supabase app.
--
-- `security_invoker` needs PostgreSQL 15 or later. Every current Supabase
-- project is well past that. If the two ALTER VIEW statements error with a
-- syntax complaint, run `show server_version;` — on an older project, skip them
-- and rely on the REVOKEs, which are sufficient on their own.


-- The views now execute as the caller, so RLS on the base tables applies
-- through them exactly as it does to a direct query.
alter view public.real_leads             set (security_invoker = on);
alter view public.real_contact_messages  set (security_invoker = on);

-- And nothing that is not the service_role may touch any of the four objects.
-- `leads` is repeated from 001 on purpose: it is idempotent, and listing all
-- four in one place is what makes the asymmetry impossible to reintroduce.
revoke all on public.leads                  from anon, authenticated;
revoke all on public.contact_messages       from anon, authenticated;
revoke all on public.real_leads             from anon, authenticated;
revoke all on public.real_contact_messages  from anon, authenticated;


-- Afterwards, re-run `CHECK-view-security.sql`. Expected:
--   both views report options containing `security_invoker=true`
--   every anon_grants column reads 0
