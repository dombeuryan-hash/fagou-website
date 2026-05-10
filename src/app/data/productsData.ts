import type { Product } from '../types'

export const productsData: Product[] = [
  // ─── Produits Laitiers ─────────────────────────────────────────────────
  {
    id: 'lait-concentre-entier',
    categoryId: 'dairy',
    nameFr: 'Lait Concentré Entier',
    nameEn: 'Whole Condensed Milk',
    descriptionFr:
      'Lait concentré entier sucré de haute qualité, idéal pour la pâtisserie, les boissons et la cuisine africaine et européenne.',
    descriptionEn:
      'High-quality sweetened condensed whole milk, ideal for pastry, beverages, and African and European cuisine.',
    image: '/assets/product-lait-gala.png',
    brand: 'FAGOU Select',
    formats: ['410g / boîte', '1 kg / boîte', 'Vrac 25 kg'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '20 t / conteneur 20\'', palettes: '22 palettes', conteneurs: 'FCL 20\' / FCL 40\'' },
  },
  {
    id: 'lait-concentre-ecreme',
    categoryId: 'dairy',
    nameFr: 'Lait Concentré Écrémé',
    nameEn: 'Skimmed Condensed Milk',
    descriptionFr:
      'Lait concentré écrémé non sucré, adapté à l\'industrie agroalimentaire, boulangerie industrielle et productions laitières.',
    descriptionEn:
      'Unsweetened skimmed condensed milk, suitable for the food industry, industrial bakery, and dairy productions.',
    image: '/assets/product-creamer-nora.png',
    brand: 'FAGOU Select',
    formats: ['410g / boîte', '1 kg / boîte'],
    availability: 'on-request',
    badge: 'export',
    packagingTable: { tonnes: '20 t / conteneur 20\'', palettes: '22 palettes', conteneurs: 'FCL 20\'' },
  },

  // ─── Mayonnaises & Sauces ──────────────────────────────────────────────
  {
    id: 'mayonnaise-classique',
    categoryId: 'sauces',
    nameFr: 'Mayonnaise Classique',
    nameEn: 'Classic Mayonnaise',
    descriptionFr:
      'Mayonnaise classique haute densité, conditionnée en grand format pour la restauration et la distribution.',
    descriptionEn:
      'High-density classic mayonnaise, packaged in large format for catering and distribution.',
    image: '/assets/product-mayo-gala.png',
    brand: 'FAGOU Gourmet',
    formats: ['5 L / seau', '10 L / seau', '200 L / fût'],
    availability: 'available',
    badge: 'premium',
    packagingTable: { tonnes: '15 t / conteneur', palettes: '18 palettes', conteneurs: 'FCL 20\'' },
  },
  {
    id: 'ketchup-tomate',
    categoryId: 'sauces',
    nameFr: 'Ketchup Tomate',
    nameEn: 'Tomato Ketchup',
    descriptionFr:
      'Ketchup tomate de haute qualité, élaboré à partir de concentré de tomates, idéal pour la restauration et l\'export.',
    descriptionEn:
      'High-quality tomato ketchup made from tomato concentrate, ideal for catering and export.',
    image: '/assets/product-mayo-nita.png',
    brand: 'FAGOU Gourmet',
    formats: ['1 kg / bouteille', '5 L / seau', '10 L / bidon'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '15 t / conteneur', palettes: '20 palettes', conteneurs: 'FCL 20\'' },
  },
  {
    id: 'sauce-pimentee',
    categoryId: 'sauces',
    nameFr: 'Sauce Pimentée',
    nameEn: 'Hot Sauce',
    descriptionFr:
      'Sauce pimentée africaine authentique, recette traditionnelle adaptée à l\'export, en grands conditionnements pour professionnels.',
    descriptionEn:
      'Authentic African hot sauce, traditional recipe adapted for export, in large packaging for professionals.',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80',
    brand: 'FAGOU Afrique',
    formats: ['500 ml / bouteille', '5 L / seau'],
    availability: 'on-request',
    badge: 'new',
    packagingTable: { tonnes: '10 t / conteneur', palettes: '16 palettes', conteneurs: 'FCL 20\'' },
  },

  // ─── Légumes ───────────────────────────────────────────────────────────
  {
    id: 'oignons-rouges',
    categoryId: 'vegetables',
    nameFr: 'Oignons Rouges',
    nameEn: 'Red Onions',
    descriptionFr:
      'Oignons rouges calibrés, sélectionnés pour leur qualité et leur conservation longue durée. Idéaux pour l\'export vers l\'Afrique.',
    descriptionEn:
      'Calibrated red onions, selected for their quality and long shelf life. Ideal for export to Africa.',
    image: '/assets/product-oignons-rouges-gala.png',
    formats: ['10 kg / sac', '25 kg / sac', '50 kg / sac'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '25 t / conteneur 20\'', palettes: '25 palettes', conteneurs: 'FCL 20\' / FCL 40\'' },
  },
  {
    id: 'oignons-jaunes',
    categoryId: 'vegetables',
    nameFr: 'Oignons Jaunes',
    nameEn: 'Yellow Onions',
    descriptionFr:
      'Oignons jaunes de qualité supérieure, cultivés selon les standards européens. Disponibles en vrac ou en sacs.',
    descriptionEn:
      'Superior quality yellow onions, grown according to European standards. Available in bulk or bags.',
    image: 'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?w=800&q=80',
    formats: ['10 kg / sac', '25 kg / sac', 'Vrac'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '25 t / conteneur 20\'', palettes: '25 palettes', conteneurs: 'FCL 20\' / FCL 40\'' },
  },
  {
    id: 'pommes-de-terre',
    categoryId: 'vegetables',
    nameFr: 'Pommes de Terre',
    nameEn: 'Potatoes',
    descriptionFr:
      'Pommes de terre fraîches européennes, calibre export, adaptées à toutes utilisations culinaires et à la transformation industrielle.',
    descriptionEn:
      'Fresh European potatoes, export caliber, suitable for all culinary uses and industrial processing.',
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
    formats: ['25 kg / sac', '50 kg / sac', 'Vrac'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '25 t / conteneur 20\'', palettes: '20 palettes', conteneurs: 'FCL 20\' / FCL 40\'' },
  },
  {
    id: 'ail-blanc',
    categoryId: 'vegetables',
    nameFr: 'Ail Blanc',
    nameEn: 'White Garlic',
    descriptionFr:
      'Ail blanc séché, calibré et trié, d\'origine européenne. Fort pouvoir aromatique, idéal pour l\'industrie agroalimentaire.',
    descriptionEn:
      'Dried, calibrated and sorted white garlic of European origin. Strong aromatic power, ideal for the food industry.',
    image: '/assets/product-ail-gala.png',
    formats: ['5 kg / sac', '10 kg / sac', '20 kg / sac'],
    availability: 'available',
    badge: 'premium',
    packagingTable: { tonnes: '15 t / conteneur', palettes: '20 palettes', conteneurs: 'FCL 20\'' },
  },

  // ─── Viandes Bovines ───────────────────────────────────────────────────
  {
    id: 'boeuf-congelé-quartiers',
    categoryId: 'beef',
    nameFr: 'Quartiers de Bœuf Congelés',
    nameEn: 'Frozen Beef Quarters',
    descriptionFr:
      'Quartiers de bœuf congelés d\'origine européenne certifiée, idéaux pour la boucherie africaine et la restauration.',
    descriptionEn:
      'Frozen beef quarters of certified European origin, ideal for African butcheries and catering.',
    image: 'https://images.unsplash.com/photo-1588347818036-c6e8a7e4c7b4?w=800&q=80',
    formats: ['Quartier avant ~60-80 kg', 'Quartier arrière ~100-120 kg'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '20 t / conteneur 40\'', palettes: '22 palettes', conteneurs: 'FCL 40\' réfrigéré' },
  },
  {
    id: 'boeuf-congele-decoupes',
    categoryId: 'beef',
    nameFr: 'Découpes de Bœuf Congelées',
    nameEn: 'Frozen Beef Cuts',
    descriptionFr:
      'Découpes spécifiques de bœuf (épaule, cuisse, jarret) congelées selon les normes CE, emballage sous vide.',
    descriptionEn:
      'Specific beef cuts (shoulder, thigh, shank) frozen according to EC standards, vacuum packed.',
    image: 'https://images.unsplash.com/photo-1588347818036-c6e8a7e4c7b4?w=800&q=80',
    formats: ['Carton 10 kg', 'Carton 15 kg', 'Carton 20 kg'],
    availability: 'on-request',
    badge: 'premium',
    packagingTable: { tonnes: '20 t / conteneur 40\'', palettes: '20 palettes', conteneurs: 'FCL 40\' réfrigéré' },
  },

  // ─── Viandes Porcines ──────────────────────────────────────────────────
  {
    id: 'porc-congelé-pieds',
    categoryId: 'pork',
    nameFr: 'Pieds de Porc Congelés',
    nameEn: 'Frozen Pork Feet',
    descriptionFr:
      'Pieds de porc congelés de qualité européenne, très demandés sur les marchés africains pour la gastronomie locale.',
    descriptionEn:
      'Frozen pork feet of European quality, highly sought after on African markets for local gastronomy.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
    formats: ['Carton 10 kg', 'Carton 20 kg', 'Vrac congelé'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '20 t / conteneur 40\'', palettes: '20 palettes', conteneurs: 'FCL 40\' réfrigéré' },
  },
  {
    id: 'porc-congelé-oreilles',
    categoryId: 'pork',
    nameFr: 'Oreilles de Porc Congelées',
    nameEn: 'Frozen Pork Ears',
    descriptionFr:
      'Oreilles de porc congelées, produit très apprécié en Afrique centrale et occidentale, origine UE certifiée.',
    descriptionEn:
      'Frozen pork ears, highly appreciated product in Central and West Africa, certified EU origin.',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&q=80',
    formats: ['Carton 10 kg', 'Carton 20 kg'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '20 t / conteneur 40\'', palettes: '20 palettes', conteneurs: 'FCL 40\' réfrigéré' },
  },

  // ─── Viandes Volaille ──────────────────────────────────────────────────
  {
    id: 'poulet-congelé-entier',
    categoryId: 'poultry',
    nameFr: 'Poulet Entier Congelé',
    nameEn: 'Frozen Whole Chicken',
    descriptionFr:
      'Poulets entiers congelés d\'origine européenne, calibrés 900g–1,2 kg, certifiés CE, idéaux pour les marchés africains.',
    descriptionEn:
      'Whole frozen chickens of European origin, 900g–1.2kg calibrated, EC certified, ideal for African markets.',
    image: '/assets/product-volaille.png',
    formats: ['Carton 10 kg (~8 pièces)', 'Carton 15 kg (~12 pièces)'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '20 t / conteneur 40\'', palettes: '22 palettes', conteneurs: 'FCL 40\' réfrigéré' },
  },
  {
    id: 'cuisses-poulet-congelées',
    categoryId: 'poultry',
    nameFr: 'Cuisses de Poulet Congelées',
    nameEn: 'Frozen Chicken Legs',
    descriptionFr:
      'Cuisses de poulet congelées, produit très demandé sur le marché africain, conditionnement adapté à la distribution locale.',
    descriptionEn:
      'Frozen chicken legs, highly demanded product on the African market, packaging adapted to local distribution.',
    image: '/assets/product-volaille.png',
    formats: ['Carton 10 kg', 'Carton 15 kg', 'Carton 20 kg'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '20 t / conteneur 40\'', palettes: '22 palettes', conteneurs: 'FCL 40\' réfrigéré' },
  },
  {
    id: 'ailes-poulet-congelées',
    categoryId: 'poultry',
    nameFr: 'Ailes de Poulet Congelées',
    nameEn: 'Frozen Chicken Wings',
    descriptionFr:
      'Ailes de poulet congelées de qualité supérieure, idéales pour la restauration rapide et les marchés africains.',
    descriptionEn:
      'Superior quality frozen chicken wings, ideal for fast food catering and African markets.',
    image: '/assets/product-volaille.png',
    formats: ['Carton 10 kg', 'Carton 20 kg'],
    availability: 'on-request',
    badge: 'new',
    packagingTable: { tonnes: '20 t / conteneur 40\'', palettes: '22 palettes', conteneurs: 'FCL 40\' réfrigéré' },
  },

  // ─── Produits de la Mer ────────────────────────────────────────────────
  {
    id: 'poisson-maquereau-congelé',
    categoryId: 'seafood',
    nameFr: 'Maquereau Congelé',
    nameEn: 'Frozen Mackerel',
    descriptionFr:
      'Maquereaux congelés entiers ou en filets, pêche atlantique certifiée, très consommés en Afrique de l\'Ouest et centrale.',
    descriptionEn:
      'Whole or filleted frozen mackerel, certified Atlantic fishing, widely consumed in West and Central Africa.',
    image: '/assets/product-poissons.png',
    formats: ['Carton 10 kg', 'Carton 20 kg', 'Vrac congelé'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '20 t / conteneur 40\'', palettes: '20 palettes', conteneurs: 'FCL 40\' réfrigéré' },
  },
  {
    id: 'poisson-sardine-conserve',
    categoryId: 'seafood',
    nameFr: 'Sardines en Conserve',
    nameEn: 'Canned Sardines',
    descriptionFr:
      'Sardines en conserve à l\'huile ou à la sauce tomate, qualité export, conditionnement idéal pour les marchés africains.',
    descriptionEn:
      'Sardines canned in oil or tomato sauce, export quality, ideal packaging for African markets.',
    image: '/assets/product-morue.png',
    brand: 'FAGOU Select',
    formats: ['125g / boîte', '425g / boîte', 'Carton 48 boîtes'],
    availability: 'available',
    badge: 'export',
    packagingTable: { tonnes: '20 t / conteneur 20\'', palettes: '22 palettes', conteneurs: 'FCL 20\' / FCL 40\'' },
  },

  // ─── Œufs & Ovoproduits ────────────────────────────────────────────────
  {
    id: 'oeufs-frais-calibres',
    categoryId: 'eggs',
    nameFr: 'Œufs Frais Calibrés',
    nameEn: 'Fresh Calibrated Eggs',
    descriptionFr:
      'Œufs frais calibre M/L d\'élevage européen certifié, conditionnés en plateaux et en palettes pour l\'export.',
    descriptionEn:
      'Fresh M/L grade eggs from certified European farming, packaged in trays and pallets for export.',
    image: '/assets/product-eggs-gala.png',
    formats: ['Plateau 30 œufs', 'Carton 360 œufs', 'Palette 14 400 œufs'],
    availability: 'available',
    badge: 'export',
    packagingTable: { palettes: '20 palettes', conteneurs: 'FCL 40\'' },
  },
  {
    id: 'poudre-oeuf-entier',
    categoryId: 'eggs',
    nameFr: 'Poudre d\'Œuf Entier',
    nameEn: 'Whole Egg Powder',
    descriptionFr:
      'Poudre d\'œuf entier déshydratée, haute solubilité, idéale pour l\'industrie boulangère, pâtissière et agroalimentaire.',
    descriptionEn:
      'Dehydrated whole egg powder, high solubility, ideal for bakery, pastry, and food processing industries.',
    image: '/assets/product-eggs-gala.png',
    brand: 'FAGOU Pro',
    formats: ['Sac 25 kg', 'Carton 10 kg'],
    availability: 'on-request',
    badge: 'premium',
    packagingTable: { tonnes: '15 t / conteneur', palettes: '18 palettes', conteneurs: 'FCL 20\'' },
  },

  // ─── Huiles ────────────────────────────────────────────────────────────
  {
    id: 'huile-palme-raffinee',
    categoryId: 'oils',
    nameFr: 'Huile de Palme Raffinée',
    nameEn: 'Refined Palm Oil',
    descriptionFr:
      'Huile de palme raffinée RBD, 100% pure, certifiée RSPO, très utilisée dans la cuisine africaine et l\'industrie alimentaire.',
    descriptionEn:
      'Refined RBD palm oil, 100% pure, RSPO certified, widely used in African cuisine and the food industry.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    brand: 'FAGOU Agri',
    formats: ['1 L / bouteille', '5 L / bidon', '20 L / bidon', '180 kg / fût'],
    availability: 'available',
    badge: 'export',
    oilPercentage: '100% huile de palme',
    packagingTable: { tonnes: '20 t / conteneur 20\'', palettes: '20 palettes', conteneurs: 'FCL 20\' / FCL 40\'' },
  },
  {
    id: 'huile-palme-brute',
    categoryId: 'oils',
    nameFr: 'Huile de Palme Brute (CPO)',
    nameEn: 'Crude Palm Oil (CPO)',
    descriptionFr:
      'Huile de palme brute de première pression, destination industrie de raffinage, conditionnement en vrac ou en fûts.',
    descriptionEn:
      'Crude palm oil from first pressing, destination refining industry, packaged in bulk or drums.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    brand: 'FAGOU Agri',
    formats: ['Vrac tanker', '200 L / fût'],
    availability: 'to-confirm',
    badge: 'export',
    oilPercentage: '98% acides gras libres < 5%',
    packagingTable: { tonnes: '25 t / conteneur', conteneurs: 'Tanker / FCL 20\'' },
  },
]
