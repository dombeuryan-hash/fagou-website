-- ═══════════════════════════════════════════════════════════════
--  FAGOU Atlas — New tables for the new Home page
--  Run in: Supabase Dashboard → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════

-- ── 1. network_countries ─────────────────────────────────────────
-- Feeds both the 3D Globe and the SVG network map.
CREATE TABLE IF NOT EXISTS network_countries (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name_fr    text        NOT NULL,
  name_en    text        NOT NULL,
  lat        numeric     NOT NULL,
  lon        numeric     NOT NULL,
  type       text        NOT NULL CHECK (type IN ('source', 'destination')),
  sort_order integer     NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE network_countries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "nc_public_read"  ON network_countries FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "nc_auth_write"   ON network_countries FOR ALL   TO authenticated USING (true) WITH CHECK (true);

-- ── 2. testimonials ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS testimonials (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  stars        integer     NOT NULL DEFAULT 5 CHECK (stars BETWEEN 1 AND 5),
  quote_fr     text        NOT NULL,
  quote_en     text        NOT NULL,
  client_name  text        NOT NULL,
  client_type_fr text      NOT NULL DEFAULT '',
  client_type_en text      NOT NULL DEFAULT '',
  client_country text      NOT NULL DEFAULT '',
  sort_order   integer     NOT NULL DEFAULT 0,
  created_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tst_public_read" ON testimonials FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "tst_auth_write"  ON testimonials FOR ALL   TO authenticated USING (true) WITH CHECK (true);

-- ── 3. process_steps (home page process section) ─────────────────
CREATE TABLE IF NOT EXISTS process_steps (
  id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  number     text        NOT NULL,
  label_fr   text        NOT NULL DEFAULT '',
  label_en   text        NOT NULL DEFAULT '',
  title_fr   text        NOT NULL,
  title_en   text        NOT NULL,
  body_fr    text        NOT NULL DEFAULT '',
  body_en    text        NOT NULL DEFAULT '',
  sort_order integer     NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ps_public_read" ON process_steps FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "ps_auth_write"  ON process_steps FOR ALL   TO authenticated USING (true) WITH CHECK (true);
