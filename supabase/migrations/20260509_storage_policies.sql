-- ═══════════════════════════════════════════════════════════════════
--  FAGOU SRL — Storage policies for the "media" bucket
--  Run in: Supabase Dashboard → SQL Editor → New query → Run
--
--  Two layers of defence:
--    1. Bucket-level: allowed_mime_types restricts what Supabase Storage
--       will accept at upload time (server-enforced).
--    2. Policy-level: storage.objects policies control who can read/write.
--
--  Client-side validation in ImagePicker.tsx is a third, UI-only layer.
-- ═══════════════════════════════════════════════════════════════════


-- ── Layer 1: restrict accepted MIME types at the bucket level ────────
--  This is enforced by Supabase Storage before any policy is evaluated.

UPDATE storage.buckets
SET
  allowed_mime_types = ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif'
  ],
  file_size_limit = 5242880   -- 5 MB in bytes (matches ImagePicker.tsx MAX_FILE_SIZE_MB)
WHERE id = 'media';


-- ── Layer 2: RLS policies on storage.objects ─────────────────────────

-- Public read: anyone can view images (needed for product pages / public site)
DROP POLICY IF EXISTS "media_public_read"          ON storage.objects;
DROP POLICY IF EXISTS "media_authenticated_insert" ON storage.objects;
DROP POLICY IF EXISTS "media_authenticated_update" ON storage.objects;
DROP POLICY IF EXISTS "media_authenticated_delete" ON storage.objects;

CREATE POLICY "media_public_read"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'media');

-- Only logged-in admins can upload — and only allowed MIME types
CREATE POLICY "media_authenticated_insert"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'media'
    AND metadata->>'mimetype' IN (
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/avif'
    )
  );

-- Only admins can overwrite/replace an image
CREATE POLICY "media_authenticated_update"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'media');

-- Only admins can delete images
CREATE POLICY "media_authenticated_delete"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'media');
