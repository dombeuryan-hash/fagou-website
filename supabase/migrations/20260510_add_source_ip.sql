-- ═══════════════════════════════════════════════════════════════════
--  FAGOU SRL — Add source_ip column for rate limiting
--  Run in: Supabase Dashboard → SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════════

ALTER TABLE public.contact_messages
  ADD COLUMN IF NOT EXISTS source_ip text;
