CREATE TABLE brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text DEFAULT '',
  tag_fr text DEFAULT '',
  tag_en text DEFAULT '',
  desc_fr text DEFAULT '',
  desc_en text DEFAULT '',
  products text[] DEFAULT '{}',
  logo_max_height text DEFAULT '90px',
  logo_max_width text DEFAULT '200px',
  sort_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "brands_public_read" ON brands FOR SELECT TO anon USING (true);
CREATE POLICY "brands_auth_all"    ON brands FOR ALL  TO authenticated USING (true) WITH CHECK (true);

-- Données initiales
INSERT INTO brands (name, logo, tag_fr, tag_en, desc_fr, desc_en, products, logo_max_height, logo_max_width, sort_order) VALUES
  ('ADISA',  '/assets/brands/photo_2026-05-16_18-12-18.jpg', 'Mayonnaise', 'Mayonnaise',
   'Marque de condiments de qualité, ADISA propose une gamme de mayonnaises appréciées sur les marchés africains pour leur goût authentique et leur texture onctueuse.',
   'A quality condiment brand, ADISA offers a range of mayonnaises appreciated in African markets for their authentic taste and creamy texture.',
   ARRAY['Mayonnaise'], '90px', '200px', 1),
  ('Gala',   '/assets/brands/photo_2026-05-16_18-12-45.jpg', 'Mayonnaise · Ail & Oignon', 'Mayonnaise · Garlic & Onion',
   'Gala est une marque bien établie proposant des mayonnaises classiques ainsi que des déclinaisons saveur ail et oignon, pour répondre aux goûts variés des consommateurs.',
   'Gala is a well-established brand offering classic mayonnaises as well as garlic and onion flavoured variants, catering to diverse consumer tastes.',
   ARRAY['Mayonnaise', 'Mayonnaise ail', 'Mayonnaise oignon'], '90px', '200px', 2),
  ('NITA',   '/assets/brands/photo_2026-05-16_18-12-52.jpg', 'Mayonnaise', 'Mayonnaise',
   'NITA propose des condiments de table alliant qualité et accessibilité, distribués sur les marchés d''Afrique centrale et de l''Ouest.',
   'NITA offers table condiments combining quality and accessibility, distributed across Central and West African markets.',
   ARRAY['Mayonnaise'], '160px', '260px', 3),
  ('Gado',   '/assets/brands/photo_2026-05-16_18-12-58.jpg', 'Mayonnaise', 'Mayonnaise',
   'Marque reconnue pour la fraîcheur et la constance de ses produits, Gado s''impose comme une référence dans le segment des condiments en Afrique.',
   'Recognised for the freshness and consistency of its products, Gado stands as a reference in the condiments segment across Africa.',
   ARRAY['Mayonnaise'], '200px', '320px', 4);
