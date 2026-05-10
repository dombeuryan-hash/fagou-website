import type { Department, DepartmentProduct } from '../types'

// Real product images from the design assets — fall back to '' if not present
const ASSETS = {
  laitGala: 'assets/product-lait-gala.png',
  mayoNita: 'assets/product-mayo-nita.png',
  mayoGala: 'assets/product-mayo-gala.png',
  eggsGala: 'assets/product-eggs-gala.png',
  creamerNora: 'assets/product-creamer-nora.png',
  ailGala: 'assets/product-ail-gala.png',
  oignonsRouges: 'assets/product-oignons-rouges-gala.png',
  poissons: 'assets/product-poissons.png',
  volaille: 'assets/product-volaille.png',
  morue: 'assets/product-morue.png',
  heroCargo: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=80',
}

export const departments: Department[] = [
  {
    id: 'frozen',
    code: '01',
    nameFr: 'Produits congelés',
    nameEn: 'Frozen products',
    ledeFr: 'Viande, volaille et porc congelés. Lots tracés origine, conditionnement carton export, expédition reefer.',
    ledeEn: 'Frozen beef, poultry and pork. Lots traced to origin, export case-packing, reefer-container dispatch.',
    cover: ASSETS.volaille,
    coverAltFr: 'volaille fraîche · découpes',
    coverAltEn: 'fresh poultry · cuts',
    products: [
      {
        code: 'FZ-BF',
        nameFr: 'Bœuf — découpes',
        nameEn: 'Beef — cuts',
        refFr: 'avant, arrière, trim 90VL',
        refEn: 'forequarter, hindquarter, trim 90VL',
        photoAltFr: 'bœuf · découpes · carton 25 kg',
        photoAltEn: 'beef · cuts · 25 kg case',
        image: '',
      },
      {
        code: 'FZ-PK',
        nameFr: 'Porc — découpes',
        nameEn: 'Pork — cuts',
        refFr: 'épaule, jambon, longe, lard',
        refEn: 'shoulder, ham, loin, belly',
        photoAltFr: 'porc · découpes · carton 20 kg',
        photoAltEn: 'pork · cuts · 20 kg case',
        image: '',
      },
      {
        code: 'FZ-PL',
        nameFr: 'Volaille',
        nameEn: 'Poultry',
        refFr: 'poulet entier, cuisses, ailes, foies',
        refEn: 'whole chicken, legs, wings, livers',
        photoAltFr: 'volaille · poulet entier · carton 10 kg',
        photoAltEn: 'poultry · whole chicken · 10 kg case',
        image: ASSETS.volaille,
      },
    ],
  },
  {
    id: 'agrifood',
    code: '02',
    nameFr: 'Agroalimentaire',
    nameEn: 'Agrifood',
    ledeFr: 'Poissons salés, oignons et ail. Sourcing direct producteurs, lots tracés, conditionnement export.',
    ledeEn: 'Salted fish, onions and garlic. Direct producer sourcing, traced lots, export packaging.',
    cover: ASSETS.oignonsRouges,
    coverAltFr: 'oignons rouges · sacs gala 25 kg',
    coverAltEn: 'red onions · gala 25 kg bags',
    products: [
      {
        code: 'AG-FS',
        nameFr: 'Poissons salés',
        nameEn: 'Salted fish',
        refFr: 'morue, lieu, sardine pilchard',
        refEn: 'cod, pollock, pilchard sardine',
        photoAltFr: 'morue salée · carton 25 kg',
        photoAltEn: 'salted cod · 25 kg case',
        image: ASSETS.morue,
      },
      {
        code: 'AG-FF',
        nameFr: 'Poissons frais & surgelés',
        nameEn: 'Fresh & frozen fish',
        refFr: 'maquereau, sardine, dorade',
        refEn: 'mackerel, sardine, sea bream',
        photoAltFr: 'assortiment poissons · sur glace',
        photoAltEn: 'mixed fish · on ice',
        image: ASSETS.poissons,
      },
      {
        code: 'AG-OR',
        nameFr: 'Oignons rouges',
        nameEn: 'Red onions',
        refFr: 'calibre 60–80 mm, sac filet 25 kg',
        refEn: 'size 60–80 mm, 25 kg net bag',
        photoAltFr: 'oignons rouges · sac gala 25 kg',
        photoAltEn: 'red onions · gala 25 kg bag',
        image: ASSETS.oignonsRouges,
      },
      {
        code: 'AG-GA',
        nameFr: 'Ail',
        nameEn: 'Garlic',
        refFr: 'calibre 5,5–6 cm, sac filet 10 kg',
        refEn: 'size 5.5–6 cm, 10 kg net bag',
        photoAltFr: 'ail · sacs gala 10 kg',
        photoAltEn: 'garlic · gala 10 kg bags',
        image: ASSETS.ailGala,
      },
    ],
  },
  {
    id: 'inputs',
    code: '03',
    nameFr: 'Intrants plastiques & mayonnaises',
    nameEn: 'Plastic & mayonnaise inputs',
    ledeFr: 'Mayonnaises, sauces, lait concentré, ovoproduits, intrants plastiques de conditionnement.',
    ledeEn: 'Mayonnaise, sauces, condensed milk, egg products, packaging plastic inputs.',
    cover: ASSETS.mayoGala,
    coverAltFr: 'mayonnaise gala · 250 ml',
    coverAltEn: 'gala mayonnaise · 250 ml',
    products: [
      {
        code: 'IN-MY',
        nameFr: 'Mayonnaise',
        nameEn: 'Mayonnaise',
        refFr: 'GALA 250 ml, NITA 450 ml',
        refEn: 'GALA 250 ml, NITA 450 ml',
        photoAltFr: 'mayonnaise gala · pot 250 ml',
        photoAltEn: 'gala mayonnaise · 250 ml jar',
        image: ASSETS.mayoGala,
      },
      {
        code: 'IN-MN',
        nameFr: 'Mayonnaise pro',
        nameEn: 'Pro mayonnaise',
        refFr: 'NITA, 70 % matière grasse, 450 ml',
        refEn: 'NITA, 70 % fat, 450 ml',
        photoAltFr: 'mayonnaise nita · 70 % gordura',
        photoAltEn: 'nita mayonnaise · 70 % fat',
        image: ASSETS.mayoNita,
      },
      {
        code: 'IN-LC',
        nameFr: 'Lait concentré sucré',
        nameEn: 'Sweetened condensed milk',
        refFr: 'GALA, boîte 1 kg',
        refEn: 'GALA, 1 kg tin',
        photoAltFr: 'lait concentré gala · 1 kg',
        photoAltEn: 'gala condensed milk · 1 kg',
        image: ASSETS.laitGala,
      },
      {
        code: 'IN-CR',
        nameFr: 'Crémier de boisson',
        nameEn: 'Beverage creamer',
        refFr: 'NORA sweetened, 1 kg',
        refEn: 'NORA sweetened, 1 kg',
        photoAltFr: 'nora beverage creamer · 1 kg',
        photoAltEn: 'nora beverage creamer · 1 kg',
        image: ASSETS.creamerNora,
      },
      {
        code: 'IN-EG',
        nameFr: 'Œufs liquides pasteurisés',
        nameEn: 'Pasteurised liquid eggs',
        refFr: 'œufs entiers, blancs, 10 kg',
        refEn: 'whole, whites, 10 kg',
        photoAltFr: 'gala · œufs liquides 10 kg',
        photoAltEn: 'gala · liquid eggs 10 kg',
        image: ASSETS.eggsGala,
      },
      {
        code: 'IN-PL',
        nameFr: 'Intrants plastiques',
        nameEn: 'Plastic inputs',
        refFr: 'résines, films, contenants',
        refEn: 'resins, films, containers',
        photoAltFr: 'intrants plastiques · big-bag',
        photoAltEn: 'plastic inputs · big-bag',
        image: '',
      },
    ],
  },
  {
    id: 'pko',
    code: '04',
    nameFr: 'Palm kernel oil',
    nameEn: 'Palm kernel oil',
    ledeFr: 'Huile de palmiste (PKO) en fût ou ISO-tank, traçabilité origine, conformité douanière export.',
    ledeEn: 'Palm kernel oil in drum or ISO-tank, origin traceability, export customs compliance.',
    cover: '',
    coverAltFr: 'palm kernel oil · iso-tank',
    coverAltEn: 'palm kernel oil · iso-tank',
    products: [
      {
        code: 'OL-PKO',
        nameFr: 'Palm kernel oil — brut',
        nameEn: 'Palm kernel oil — crude',
        refFr: 'fût 190 kg / ISO-tank 22 t',
        refEn: '190 kg drum / 22 t ISO-tank',
        photoAltFr: 'pko brut · fût 190 kg',
        photoAltEn: 'crude pko · 190 kg drum',
        image: '',
      },
      {
        code: 'OL-PKR',
        nameFr: 'Palm kernel oil — raffiné',
        nameEn: 'Palm kernel oil — refined',
        refFr: 'fût 190 kg / flexitank',
        refEn: '190 kg drum / flexitank',
        photoAltFr: 'pko raffiné · flexitank',
        photoAltEn: 'refined pko · flexitank',
        image: '',
      },
    ],
  },
]

export type FlatProduct = DepartmentProduct & {
  dept: string
  deptNameFr: string
  deptNameEn: string
}

export const allProducts: FlatProduct[] = departments.flatMap((d) =>
  d.products.map((p) => ({
    ...p,
    dept: d.id,
    deptNameFr: d.nameFr,
    deptNameEn: d.nameEn,
  }))
)

export function getProductByCode(code: string): FlatProduct | undefined {
  return allProducts.find((p) => p.code === code)
}

export function getDepartmentByProductCode(code: string): Department | undefined {
  return departments.find((d) => d.products.some((p) => p.code === code))
}

export const HERO_CARGO =
  'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=80'

export const PRODUCT_PHOTOS = {
  volaille: ASSETS.volaille,
  poissons: ASSETS.poissons,
  oignonsRouges: ASSETS.oignonsRouges,
}

export const INCOTERMS = ['EXW', 'FCA', 'FOB', 'CFR', 'CIF', 'CPT', 'CIP', 'DAP', 'DPU', 'DDP']

export const CONTACT = {
  legalName: 'Fagou SPRL',
  addressLines: ["Chaussée d'Alsemberg, 842", '1180 Uccle (Bruxelles)', 'Belgique'],
  mobile: ['+32 465 42 82 59', '+32 487 13 90 59'],
  fixed: '+32 2 273 29 459',
  emails: ['commercial.export@fagou.be', 'representant@fagou.be', 'trading@fagou.be'],
  website: 'www.fagou.be',
  hoursFr: 'Lun – Ven · 08h30 – 17h30 (CET)',
  hoursEn: 'Mon – Fri · 08:30 – 17:30 (CET)',
  team: [
    { roleFr: 'Commercial · Export', roleEn: 'Sales · Export', name: '[Nom à confirmer]', email: 'commercial.export@fagou.be' },
    { roleFr: 'Trading', roleEn: 'Trading', name: '[Nom à confirmer]', email: 'trading@fagou.be' },
    { roleFr: 'Représentation', roleEn: 'Representation', name: '[Nom à confirmer]', email: 'representant@fagou.be' },
  ],
}
