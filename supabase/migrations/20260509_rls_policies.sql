-- ═══════════════════════════════════════════════════════════════════
--  FAGOU SRL — Row Level Security — all 7 public tables
--  Run in: Supabase Dashboard → SQL Editor → New query → Run
--
--  Public (anon) read tables : catalogue_products, departments, news, partners, site_settings
--  Insert-only (anon)        : contact_messages, quote_requests
--  Write (authenticated only): all tables
-- ═══════════════════════════════════════════════════════════════════


-- ── 1. contact_messages ─────────────────────────────────────────────

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Remove all old policies (previous partial setup + any re-run names)
DROP POLICY IF EXISTS "public insert"        ON public.contact_messages;
DROP POLICY IF EXISTS "admin read"           ON public.contact_messages;
DROP POLICY IF EXISTS "admin update"         ON public.contact_messages;
DROP POLICY IF EXISTS "admin delete"         ON public.contact_messages;
DROP POLICY IF EXISTS "anon_insert_contact"  ON public.contact_messages;
DROP POLICY IF EXISTS "admin_select_contact" ON public.contact_messages;
DROP POLICY IF EXISTS "admin_update_contact" ON public.contact_messages;
DROP POLICY IF EXISTS "admin_delete_contact" ON public.contact_messages;

CREATE POLICY "anon_insert_contact"
  ON public.contact_messages FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_select_contact"
  ON public.contact_messages FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_update_contact"
  ON public.contact_messages FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "admin_delete_contact"
  ON public.contact_messages FOR DELETE TO authenticated
  USING (true);


-- ── 2. catalogue_products ────────────────────────────────────────────

ALTER TABLE public.catalogue_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_products" ON public.catalogue_products;
DROP POLICY IF EXISTS "admin_insert_products"  ON public.catalogue_products;
DROP POLICY IF EXISTS "admin_update_products"  ON public.catalogue_products;
DROP POLICY IF EXISTS "admin_delete_products"  ON public.catalogue_products;

CREATE POLICY "public_select_products"
  ON public.catalogue_products FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "admin_insert_products"
  ON public.catalogue_products FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "admin_update_products"
  ON public.catalogue_products FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "admin_delete_products"
  ON public.catalogue_products FOR DELETE TO authenticated
  USING (true);


-- ── 3. site_settings ─────────────────────────────────────────────────

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_settings" ON public.site_settings;
DROP POLICY IF EXISTS "admin_insert_settings"  ON public.site_settings;
DROP POLICY IF EXISTS "admin_update_settings"  ON public.site_settings;
DROP POLICY IF EXISTS "admin_delete_settings"  ON public.site_settings;

CREATE POLICY "public_select_settings"
  ON public.site_settings FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "admin_insert_settings"
  ON public.site_settings FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "admin_update_settings"
  ON public.site_settings FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "admin_delete_settings"
  ON public.site_settings FOR DELETE TO authenticated
  USING (true);


-- ── 4. departments ───────────────────────────────────────────────────

ALTER TABLE public.departments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_departments" ON public.departments;
DROP POLICY IF EXISTS "admin_insert_departments"  ON public.departments;
DROP POLICY IF EXISTS "admin_update_departments"  ON public.departments;
DROP POLICY IF EXISTS "admin_delete_departments"  ON public.departments;

CREATE POLICY "public_select_departments"
  ON public.departments FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "admin_insert_departments"
  ON public.departments FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "admin_update_departments"
  ON public.departments FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "admin_delete_departments"
  ON public.departments FOR DELETE TO authenticated
  USING (true);


-- ── 5. news ──────────────────────────────────────────────────────────

ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_news" ON public.news;
DROP POLICY IF EXISTS "admin_insert_news"  ON public.news;
DROP POLICY IF EXISTS "admin_update_news"  ON public.news;
DROP POLICY IF EXISTS "admin_delete_news"  ON public.news;

CREATE POLICY "public_select_news"
  ON public.news FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "admin_insert_news"
  ON public.news FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "admin_update_news"
  ON public.news FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "admin_delete_news"
  ON public.news FOR DELETE TO authenticated
  USING (true);


-- ── 6. partners ──────────────────────────────────────────────────────

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_partners" ON public.partners;
DROP POLICY IF EXISTS "admin_insert_partners"  ON public.partners;
DROP POLICY IF EXISTS "admin_update_partners"  ON public.partners;
DROP POLICY IF EXISTS "admin_delete_partners"  ON public.partners;

CREATE POLICY "public_select_partners"
  ON public.partners FOR SELECT TO anon, authenticated
  USING (true);

CREATE POLICY "admin_insert_partners"
  ON public.partners FOR INSERT TO authenticated
  WITH CHECK (true);

CREATE POLICY "admin_update_partners"
  ON public.partners FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "admin_delete_partners"
  ON public.partners FOR DELETE TO authenticated
  USING (true);


-- ── 7. quote_requests ────────────────────────────────────────────────
--  This table is currently empty (QuoteModal now saves to contact_messages).
--  RLS is added defensively in case it is used in future.

ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_quotes"  ON public.quote_requests;
DROP POLICY IF EXISTS "admin_select_quotes" ON public.quote_requests;
DROP POLICY IF EXISTS "admin_update_quotes" ON public.quote_requests;
DROP POLICY IF EXISTS "admin_delete_quotes" ON public.quote_requests;

CREATE POLICY "anon_insert_quotes"
  ON public.quote_requests FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "admin_select_quotes"
  ON public.quote_requests FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "admin_update_quotes"
  ON public.quote_requests FOR UPDATE TO authenticated
  USING (true);

CREATE POLICY "admin_delete_quotes"
  ON public.quote_requests FOR DELETE TO authenticated
  USING (true);
