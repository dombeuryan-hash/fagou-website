-- ═══════════════════════════════════════════════════════════════
--  FAGOU Atlas — Seed data (initial content)
--  Run AFTER 20260531_atlas_tables.sql
-- ═══════════════════════════════════════════════════════════════

-- ── network_countries ─────────────────────────────────────────────
INSERT INTO network_countries (name_fr, name_en, lat, lon, type, sort_order) VALUES
  ('Inde',       'India',    19.07,  72.87, 'source',      1),
  ('Brésil',     'Brazil',  -23.55, -46.63, 'source',      2),
  ('Turquie',    'Turkey',   41.01,  28.97, 'source',      3),
  ('États-Unis', 'USA',      40.71, -74.00, 'source',      4),
  ('Bulgarie',   'Bulgaria', 42.70,  23.32, 'source',      5),
  ('Allemagne',  'Germany',  53.55,   9.99, 'source',      6),
  ('Côte d''Ivoire', 'Côte d''Ivoire',  5.32, -4.03, 'destination', 1),
  ('Cameroun',   'Cameroon',  4.05,   9.70, 'destination', 2),
  ('Congo',      'Congo',    -4.78,  11.86, 'destination', 3),
  ('RD Congo',   'DR Congo', -4.32,  15.31, 'destination', 4),
  ('Gabon',      'Gabon',     0.39,   9.45, 'destination', 5);

-- ── testimonials ──────────────────────────────────────────────────
INSERT INTO testimonials (stars, quote_fr, quote_en, client_name, client_type_fr, client_type_en, client_country, sort_order) VALUES
  (5,
   'Fagou a aménagé notre chambre froide industrielle de A à Z — des panneaux aux groupes froids. Installation irréprochable, et l''approvisionnement en surgelés qui a suivi tout aussi fiable.',
   'Fagou fitted out our industrial cold room end-to-end — from the panels to the freezing units. Flawless install, and the frozen supply that followed has been just as reliable.',
   'La Congolaise de la Congélation',
   'Entreposage froid', 'Cold storage', 'RD Congo', 1),
  (5,
   'Un partenaire fiable depuis plusieurs années. Sérieux, réactifs, cotations dans les délais — un interlocuteur de confiance pour nos achats à l''international.',
   'A reliable partner for several years now. Serious, responsive, quotes delivered on time — a dependable contact for our international purchasing.',
   'Ivoire Import SARL',
   'Importateur', 'Importer', 'Côte d''Ivoire', 2),
  (5,
   'Excellent pour nos besoins en oignons et ail en grande quantité. Traçabilité exemplaire et vraie maîtrise des incoterms export.',
   'Excellent for our bulk onion and garlic needs. Exemplary traceability and a real command of export incoterms.',
   'Trans-Afric Commerce',
   'Négoce', 'Trade', 'Gabon', 3);

-- ── process_steps ────────────────────────────────────────────────
INSERT INTO process_steps (number, label_fr, label_en, title_fr, title_en, body_fr, body_en, sort_order) VALUES
  ('01', 'Étape 01 · Brief', 'Step 01 · Brief',
   'Dites-nous vos besoins', 'Tell us what you need',
   'Envoyez votre liste ou catégorie à notre bureau bruxellois. Nous confirmons disponibilité et devis ferme sous 48 heures.',
   'Send your product list or category to our Brussels office. We confirm availability and a firm quote within 48 hours.',
   1),
  ('02', 'Étape 02 · Sourcing', 'Step 02 · Source',
   'Nous sourçons dans le monde', 'We source worldwide',
   'Nous approvisionnons vos produits via notre réseau — Inde, Brésil, Turquie, USA, Bulgarie, Allemagne — et les contrôlons à l''origine.',
   'We procure your goods across our network — India, Brazil, Turkey, the USA, Bulgaria, Germany — and quality-check them at origin.',
   2),
  ('03', 'Étape 03 · Consolidation', 'Step 03 · Consolidate',
   'Conditionné en Belgique', 'Consolidated in Belgium',
   'Les produits convergent vers notre hub belge, où les commandes sont consolidées, contrôlées, conditionnées et chargées — FCL ou LCL, chaîne du froid si nécessaire.',
   'Goods converge on our Belgian hub, where orders are consolidated, controlled, packed and loaded — FCL or LCL, cold chain when needed.',
   3),
  ('04', 'Étape 04 · Export', 'Step 04 · Export',
   'Exporté & livré', 'Exported & delivered',
   'Nous gérons documents d''export et incoterms de bout en bout, et livrons votre marché d''Afrique centrale et de l''Ouest, dans les délais.',
   'We handle export documents and incoterms end-to-end, and deliver to your market in Central & West Africa, on schedule.',
   4);

-- ── site_settings keys for Atlas home page ───────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('atlas_hero_eyebrow_fr', 'Sourcé dans le monde → Livré en Afrique'),
  ('atlas_hero_eyebrow_en', 'Sourced worldwide → Delivered to Africa'),
  ('atlas_hero_title_fr',   'Des biens qui traversent les continents.'),
  ('atlas_hero_title_en',   'Goods that cross continents.'),
  ('atlas_hero_lede_fr',    'Depuis notre hub en Belgique, Fagou source des produits agroalimentaires partout dans le monde — et les livre, avec fiabilité, aux marchés d''Afrique centrale et de l''Ouest. Maison d''import-export, depuis 2013.'),
  ('atlas_hero_lede_en',    'From our hub in Belgium, Fagou sources agri-food goods across the globe — and delivers them, reliably, to markets in Central & West Africa. An import–export house, since 2013.'),
  ('atlas_coldroom_eyebrow_fr', 'Capacité chaîne du froid'),
  ('atlas_coldroom_eyebrow_en', 'Cold-chain capability'),
  ('atlas_coldroom_title_fr',   'Froid industriel, livré.'),
  ('atlas_coldroom_title_en',   'Industrial cold, delivered.'),
  ('atlas_coldroom_lede_fr',    'Au-delà des produits, Fagou bâtit l''infrastructure pour les conserver. Nous avons fourni et installé une chambre froide industrielle clé en main pour La Congolaise de la Congélation — de −24 °C à l''ambiant.'),
  ('atlas_coldroom_lede_en',    'Beyond goods, Fagou builds the infrastructure to keep them. We supplied and installed a turnkey industrial cold room for La Congolaise de la Congélation — from −24 °C to ambient.'),
  ('atlas_coldroom_tag_fr',     'Installée · RD Congo'),
  ('atlas_coldroom_tag_en',     'Installed · DR Congo'),
  ('atlas_cta_title_fr',        'Prêt à expédier depuis la Belgique ?'),
  ('atlas_cta_title_en',        'Ready to ship from Belgium?'),
  ('atlas_cta_lede_fr',         'Envoyez votre liste de produits. Nous revenons avec disponibilité et devis sous 48 heures.'),
  ('atlas_cta_lede_en',         'Send us your product list. We''ll come back with availability and a quote within 48 hours.')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
