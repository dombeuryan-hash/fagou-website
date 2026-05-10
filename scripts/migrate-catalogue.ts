import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://myqpieokhkvgqjujppkv.supabase.co',
  process.env.SUPABASE_SERVICE_KEY ?? ''
)

const departments = [
  { id: 'frozen',   code: '01', name_fr: 'Produits congelés',              name_en: 'Frozen products',           lede_fr: 'Viande, volaille et porc congelés. Lots tracés origine, conditionnement carton export, expédition reefer.', lede_en: 'Frozen beef, poultry and pork. Lots traced to origin, export case-packing, reefer-container dispatch.', cover: 'assets/product-volaille.png',         cover_alt_fr: 'volaille fraîche · découpes', cover_alt_en: 'fresh poultry · cuts',              sort_order: 1 },
  { id: 'agrifood', code: '02', name_fr: 'Agroalimentaire',                name_en: 'Agrifood',                  lede_fr: 'Poissons salés, oignons et ail. Sourcing direct producteurs, lots tracés, conditionnement export.',         lede_en: 'Salted fish, onions and garlic. Direct producer sourcing, traced lots, export packaging.',               cover: 'assets/product-oignons-rouges-gala.png', cover_alt_fr: 'oignons rouges · sacs gala 25 kg', cover_alt_en: 'red onions · gala 25 kg bags',    sort_order: 2 },
  { id: 'inputs',   code: '03', name_fr: 'Intrants plastiques & mayonnaises', name_en: 'Plastic & mayonnaise inputs', lede_fr: 'Mayonnaises, sauces, lait concentré, ovoproduits, intrants plastiques de conditionnement.',               lede_en: 'Mayonnaise, sauces, condensed milk, egg products, packaging plastic inputs.',                            cover: 'assets/product-mayo-gala.png',           cover_alt_fr: 'mayonnaise gala · 250 ml',         cover_alt_en: 'gala mayonnaise · 250 ml',         sort_order: 3 },
  { id: 'pko',      code: '04', name_fr: 'Palm kernel oil',                name_en: 'Palm kernel oil',           lede_fr: 'Huile de palmiste (PKO) en fût ou ISO-tank, traçabilité origine, conformité douanière export.',          lede_en: 'Palm kernel oil in drum or ISO-tank, origin traceability, export customs compliance.',                   cover: '',                                       cover_alt_fr: 'palm kernel oil · iso-tank',       cover_alt_en: 'palm kernel oil · iso-tank',       sort_order: 4 },
]

const catalogueProducts = [
  // Frozen
  { code: 'FZ-BF',  dept_id: 'frozen',   name_fr: 'Bœuf — découpes',              name_en: 'Beef — cuts',                    ref_fr: 'avant, arrière, trim 90VL',          ref_en: 'forequarter, hindquarter, trim 90VL',  photo_alt_fr: 'bœuf · découpes · carton 25 kg',      photo_alt_en: 'beef · cuts · 25 kg case',         image: '',                                       sort_order: 1 },
  { code: 'FZ-PK',  dept_id: 'frozen',   name_fr: 'Porc — découpes',              name_en: 'Pork — cuts',                    ref_fr: 'épaule, jambon, longe, lard',        ref_en: 'shoulder, ham, loin, belly',           photo_alt_fr: 'porc · découpes · carton 20 kg',      photo_alt_en: 'pork · cuts · 20 kg case',         image: '',                                       sort_order: 2 },
  { code: 'FZ-PL',  dept_id: 'frozen',   name_fr: 'Volaille',                     name_en: 'Poultry',                        ref_fr: 'poulet entier, cuisses, ailes, foies', ref_en: 'whole chicken, legs, wings, livers', photo_alt_fr: 'volaille · poulet entier · carton 10 kg', photo_alt_en: 'poultry · whole chicken · 10 kg case', image: 'assets/product-volaille.png',          sort_order: 3 },
  // Agrifood
  { code: 'AG-FS',  dept_id: 'agrifood', name_fr: 'Poissons salés',               name_en: 'Salted fish',                    ref_fr: 'morue, lieu, sardine pilchard',      ref_en: 'cod, pollock, pilchard sardine',       photo_alt_fr: 'morue salée · carton 25 kg',          photo_alt_en: 'salted cod · 25 kg case',          image: 'assets/product-morue.png',               sort_order: 1 },
  { code: 'AG-FF',  dept_id: 'agrifood', name_fr: 'Poissons frais & surgelés',    name_en: 'Fresh & frozen fish',            ref_fr: 'maquereau, sardine, dorade',         ref_en: 'mackerel, sardine, sea bream',         photo_alt_fr: 'assortiment poissons · sur glace',    photo_alt_en: 'mixed fish · on ice',              image: 'assets/product-poissons.png',            sort_order: 2 },
  { code: 'AG-OR',  dept_id: 'agrifood', name_fr: 'Oignons rouges',               name_en: 'Red onions',                     ref_fr: 'calibre 60–80 mm, sac filet 25 kg', ref_en: 'size 60–80 mm, 25 kg net bag',        photo_alt_fr: 'oignons rouges · sac gala 25 kg',     photo_alt_en: 'red onions · gala 25 kg bag',      image: 'assets/product-oignons-rouges-gala.png', sort_order: 3 },
  { code: 'AG-GA',  dept_id: 'agrifood', name_fr: 'Ail',                          name_en: 'Garlic',                         ref_fr: 'calibre 5,5–6 cm, sac filet 10 kg', ref_en: 'size 5.5–6 cm, 10 kg net bag',        photo_alt_fr: 'ail · sacs gala 10 kg',               photo_alt_en: 'garlic · gala 10 kg bags',         image: 'assets/product-ail-gala.png',            sort_order: 4 },
  // Inputs
  { code: 'IN-MY',  dept_id: 'inputs',   name_fr: 'Mayonnaise',                   name_en: 'Mayonnaise',                     ref_fr: 'GALA 250 ml, NITA 450 ml',           ref_en: 'GALA 250 ml, NITA 450 ml',            photo_alt_fr: 'mayonnaise gala · pot 250 ml',        photo_alt_en: 'gala mayonnaise · 250 ml jar',     image: 'assets/product-mayo-gala.png',           sort_order: 1 },
  { code: 'IN-MN',  dept_id: 'inputs',   name_fr: 'Mayonnaise pro',               name_en: 'Pro mayonnaise',                 ref_fr: 'NITA, 70 % matière grasse, 450 ml',  ref_en: 'NITA, 70 % fat, 450 ml',              photo_alt_fr: 'mayonnaise nita · 70 % gordura',      photo_alt_en: 'nita mayonnaise · 70 % fat',       image: 'assets/product-mayo-nita.png',           sort_order: 2 },
  { code: 'IN-LC',  dept_id: 'inputs',   name_fr: 'Lait concentré sucré',         name_en: 'Sweetened condensed milk',       ref_fr: 'GALA, boîte 1 kg',                   ref_en: 'GALA, 1 kg tin',                      photo_alt_fr: 'lait concentré gala · 1 kg',          photo_alt_en: 'gala condensed milk · 1 kg',       image: 'assets/product-lait-gala.png',           sort_order: 3 },
  { code: 'IN-CR',  dept_id: 'inputs',   name_fr: 'Crémier de boisson',           name_en: 'Beverage creamer',               ref_fr: 'NORA sweetened, 1 kg',               ref_en: 'NORA sweetened, 1 kg',                photo_alt_fr: 'nora beverage creamer · 1 kg',        photo_alt_en: 'nora beverage creamer · 1 kg',     image: 'assets/product-creamer-nora.png',         sort_order: 4 },
  { code: 'IN-EG',  dept_id: 'inputs',   name_fr: 'Œufs liquides pasteurisés',    name_en: 'Pasteurised liquid eggs',        ref_fr: 'œufs entiers, blancs, 10 kg',        ref_en: 'whole, whites, 10 kg',                photo_alt_fr: 'gala · œufs liquides 10 kg',          photo_alt_en: 'gala · liquid eggs 10 kg',         image: 'assets/product-eggs-gala.png',           sort_order: 5 },
  { code: 'IN-PL',  dept_id: 'inputs',   name_fr: 'Intrants plastiques',          name_en: 'Plastic inputs',                 ref_fr: 'résines, films, contenants',         ref_en: 'resins, films, containers',           photo_alt_fr: 'intrants plastiques · big-bag',       photo_alt_en: 'plastic inputs · big-bag',         image: '',                                       sort_order: 6 },
  // PKO
  { code: 'OL-PKO', dept_id: 'pko',      name_fr: 'Palm kernel oil — brut',       name_en: 'Palm kernel oil — crude',        ref_fr: 'fût 190 kg / ISO-tank 22 t',         ref_en: '190 kg drum / 22 t ISO-tank',         photo_alt_fr: 'pko brut · fût 190 kg',               photo_alt_en: 'crude pko · 190 kg drum',          image: '',                                       sort_order: 1 },
  { code: 'OL-PKR', dept_id: 'pko',      name_fr: 'Palm kernel oil — raffiné',    name_en: 'Palm kernel oil — refined',      ref_fr: 'fût 190 kg / flexitank',             ref_en: '190 kg drum / flexitank',             photo_alt_fr: 'pko raffiné · flexitank',             photo_alt_en: 'refined pko · flexitank',          image: '',                                       sort_order: 2 },
]

async function migrate() {
  console.log('Migration catalogue...\n')

  const { error: e1 } = await supabase.from('departments').upsert(departments)
  if (e1) console.error('❌ departments:', e1.message)
  else console.log(`✅ ${departments.length} départements insérés`)

  const { error: e2 } = await supabase.from('catalogue_products').upsert(catalogueProducts)
  if (e2) console.error('❌ catalogue_products:', e2.message)
  else console.log(`✅ ${catalogueProducts.length} produits catalogue insérés`)

  console.log('\nMigration terminée.')
}

migrate()
