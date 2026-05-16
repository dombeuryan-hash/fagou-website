  export const COMPANY_NAME = 'FAGOU SRL'
export const COMPANY_FOUNDED_YEAR = 2013
export const COMPANY_EXPERIENCE_YEARS = '13+'
export const COMPANY_EMAIL_CONTACT = 'contact@fagou.be'
export const COMPANY_EMAIL_COMMERCIAL = 'commercial@fagou.be'
export const COMPANY_EMAIL_EXPORT = 'export@fagou.be'
export const COMPANY_EMAIL_SUPPLIERS = 'fournisseurs@fagou.be'
export const COMPANY_PHONE = '+32 490 25 53 52'
export const COMPANY_ADDRESS = 'Ixelles, Belgique'
export const COMPANY_ADDRESS_FULL = 'Rue des Liégeois 36, 1050 Ixelles, Belgique'
export const COMPANY_TVA = 'BE 0542.382.824'

export const STATS_YEARS = '13+'
export const STATS_PRODUCTS = '22'
export const STATS_CONTINENTS = '2'
export const STATS_CATEGORIES = '9'

export const HERO_TAGLINE_FR = 'FAGOU SRL connecte le monde et l\'Europe avec des produits alimentaires de qualité'
export const HERO_TAGLINE_EN = 'FAGOU SRL connects the world and Europe with quality food products'
export const HERO_SUBTITLE_FR = 'Depuis 2013 — 13+ ans d\'expérience dans l\'import-export agroalimentaire'
export const HERO_SUBTITLE_EN = 'Since 2013 — 13+ years of experience in agri-food import-export'

export const DEBOUNCE_DELAY_MS = 300
export const COOKIE_CONSENT_KEY = 'fagou_cookie_consent'
export const LANGUAGE_STORAGE_KEY = 'fagou_language'

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/produits',
  PRODUCT_DETAIL: '/produit/:id',
  ENTERPRISES: '/partenaires',
  SUPPLIERS: '/fournisseurs',
  ABOUT: '/a-propos',
  NEWS: '/actualites',
  NEWS_DETAIL: '/actualites/:id',
  CONTACT: '/contact',
  LEGAL: '/mentions-legales',
  PRIVACY: '/confidentialite',
  TERMS: '/cgv',
  COOKIES: '/cookies',
  COLD: '/chambre-froide',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_PRODUCTS: '/admin/produits',
  ADMIN_MESSAGES: '/admin/messages',
  ADMIN_USERS: '/admin/utilisateurs',
  ADMIN_PAGES: '/admin/pages',
  NOT_FOUND: '*',
} as const

export const AVAILABILITY_COLORS: Record<string, string> = {
  available: '#1A5C1A',
  'on-request': '#C0392B',
  'to-confirm': '#6B7280',
}

export const BADGE_COLORS: Record<string, string> = {
  export: '#1A5C1A',
  premium: '#B7860B',
  new: '#C0392B',
}

export const QUOTE_UNITS = ['tonnes', 'palettes', 'conteneurs', 'cartons'] as const

export const GOOGLE_MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.6!2d4.3517!3d50.8503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTDCsDUxJzAxLjEiTiA0wrAyMScwNi4xIkU!5e0!3m2!1sfr!2sbe!4v1234567890'
