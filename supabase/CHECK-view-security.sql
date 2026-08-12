-- Diagnostic. NOT a migration — this reads and changes nothing.
--
-- Paste this whole file into the Supabase SQL Editor and press Run. It answers,
-- in one table, whether the problem 005-lock-down-views.sql fixes is real.
--
-- HOW TO READ THE RESULT — four rows come back.
--
--   real_leads, real_contact_messages   (kind = view)
--     options   -> must contain `security_invoker=true`.
--                  If it is NULL or empty, the views bypass the row-level
--                  security on the tables underneath. That is the problem.
--     anon_grants -> must be 0. Anything above 0 means the anon key can read
--                  the view, which is the other half of the problem.
--
--   leads, contact_messages             (kind = table)
--     rls_enabled -> must be true.
--     anon_grants -> must be 0.
--
-- If options already says `security_invoker=true` AND every anon_grants is 0,
-- there was never a problem and 005 is unnecessary. Run it anyway if you like;
-- it is idempotent and changes nothing in that case.

select
  c.relname                                              as object,
  case c.relkind when 'v' then 'view' else 'table' end   as kind,
  c.relrowsecurity                                       as rls_enabled,
  c.reloptions                                           as options,
  (
    select count(*)
      from information_schema.role_table_grants g
     where g.table_schema = 'public'
       and g.table_name   = c.relname
       and g.grantee in ('anon', 'authenticated')
  )                                                      as anon_grants
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname in ('leads', 'contact_messages', 'real_leads', 'real_contact_messages')
order by c.relname;
