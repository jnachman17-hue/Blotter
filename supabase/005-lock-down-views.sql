-- Make the `real_*` views respect row-level security, and revoke what nothing
-- revoked.
--
-- ⚠ NOT YET APPLIED. Written August 12, 2026 during the security audit. Run it
-- the same way as the others — SQL Editor -> New query -> paste -> Run — but
-- **run the four checks in part 1 first**, because if the audit's reading is
-- wrong then part 2 is unnecessary rather than harmful, and you should know
-- which it was.
--
-- ## What this is for
--
-- `001` and `004` both claim the same protection, in comments: RLS on with no
-- policies, so "a leaked anon key gives an attacker nothing". For the two base
-- tables that is true. For the two views it is probably not.
--
-- In PostgreSQL a view without `security_invoker = true` runs with the
-- privileges of the role that OWNS it, not the role querying it. These views
-- were created by pasting into the dashboard SQL editor, so the owner is a
-- superuser role, so a query through `real_leads` is executed as that role —
-- and row-level security on `public.leads` never applies. The view is a hole
-- cut through the exact protection the table was given.
--
-- Two things have to be true for that to be reachable: the view must lack
-- `security_invoker`, and `anon` must hold SELECT on it. Nothing in `003` or
-- `004` sets the first or revokes the second, and Supabase ships default
-- privileges that grant to `anon` and `authenticated` on objects created in
-- `public`. `001` revokes on `public.leads` — but a view is a separate object,
-- and `004` never revokes on `contact_messages` at all.
--
-- **This is latent rather than live.** The application uses no anon key: there
-- is no `NEXT_PUBLIC_SUPABASE_ANON_KEY` anywhere, the browser never talks to
-- the database, and the production client bundles contain no reference to the
-- project at all. So there is currently no published credential that reaches
-- these views. This migration exists so that stays true if an anon key is ever
-- introduced, which is the ordinary next step for any Supabase app.


-- ---------------------------------------------------------------- 1. Check
--
-- Run these four first and keep the output. They settle whether the problem is
-- real, and queries 2 and 4 will also surface anything applied interactively
-- and never written down — the schema was built by hand, so the files in this
-- directory are the record, not the source of truth.

-- (a) Do the views run as their owner? Look for `security_invoker=true` in
--     reloptions. NULL or an empty array means they do NOT, which is the
--     finding.
--   select c.relname, c.reloptions
--     from pg_class c join pg_namespace n on n.oid = c.relnamespace
--    where n.nspname = 'public'
--      and c.relname in ('real_leads', 'real_contact_messages');

-- (b) Are there any policies? The intent is zero.
--   select schemaname, tablename, policyname from pg_policies
--    where schemaname = 'public';

-- (c) Is RLS actually enabled on both base tables?
--   select relname, relrowsecurity, relforcerowsecurity from pg_class
--    where relname in ('leads', 'contact_messages');

-- (d) What can `anon` actually read? Any row naming real_leads or
--     real_contact_messages is the second half of the finding.
--   select table_name, privilege_type from information_schema.role_table_grants
--    where grantee = 'anon' and table_schema = 'public';

-- Also worth confirming, because `security_invoker` needs PostgreSQL 15 or
-- later: `show server_version;`. Every current Supabase project is well past
-- that; if this one is not, skip part 2's ALTER statements and rely on the
-- REVOKEs alone, which are sufficient on their own.


-- ----------------------------------------------------------------- 2. Fix
--
-- Belt and braces, deliberately. Either statement alone would close it; both
-- together mean it stays closed if a future migration re-grants by accident.

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


-- --------------------------------------------------------------- 3. Verify
--
-- Re-run check (a) and check (d) above. Expected after this migration:
--   (a) both views report reloptions containing `security_invoker=true`
--   (d) no rows for anon on leads, contact_messages, or either view
--
-- The service_role key bypasses all of this by design, so `/api/lead` and
-- `/api/contact` keep working and Table Editor -> `real_leads` keeps working
-- for you. If either route starts returning `stored: false` after this, the
-- cause is something else — this migration does not touch service_role.
