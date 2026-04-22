-- Supabase security hardening for tables exposed in public schema.
-- This project accesses Postgres via Prisma (DATABASE_URL), not Supabase PostgREST.
-- Enabling RLS and revoking anon/authenticated access reduces exposure warnings.

BEGIN;

-- 1) Enable RLS on exposed tables
ALTER TABLE IF EXISTS public._prisma_migrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contractors ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.item_catalog ENABLE ROW LEVEL SECURITY;

-- 2) Force RLS for stronger protection (applies even if table owner)
ALTER TABLE IF EXISTS public._prisma_migrations FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.users FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.schedules FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.clients FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.contractors FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.invoices FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.invoice_items FORCE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.item_catalog FORCE ROW LEVEL SECURITY;

-- 3) Remove direct table privileges from API roles
REVOKE ALL ON TABLE public._prisma_migrations FROM anon, authenticated;
REVOKE ALL ON TABLE public.users FROM anon, authenticated;
REVOKE ALL ON TABLE public.schedules FROM anon, authenticated;
REVOKE ALL ON TABLE public.clients FROM anon, authenticated;
REVOKE ALL ON TABLE public.contractors FROM anon, authenticated;
REVOKE ALL ON TABLE public.invoices FROM anon, authenticated;
REVOKE ALL ON TABLE public.invoice_items FROM anon, authenticated;
REVOKE ALL ON TABLE public.item_catalog FROM anon, authenticated;

COMMIT;
