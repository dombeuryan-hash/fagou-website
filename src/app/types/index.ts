export type Language = 'fr' | 'en'

export type Availability = 'available' | 'on-request' | 'to-confirm'
export type ProductBadge = 'export' | 'premium' | 'new'
export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export interface PackagingTable {
  tonnes?: string
  palettes?: string
  conteneurs?: string
}

export interface Product {
  id: string
  categoryId: string
  nameFr: string
  nameEn: string
  descriptionFr: string
  descriptionEn: string
  image: string
  brand?: string
  formats: string[]
  availability: Availability
  badge?: ProductBadge
  packagingTable: PackagingTable
  oilPercentage?: string
}

export interface Category {
  id: string
  nameFr: string
  nameEn: string
  image: string
  icon: string
}

export interface QuoteRequest {
  productId?: string
  contactName: string
  company: string
  email: string
  phone: string
  quantity: string
  unit: 'tonnes' | 'palettes' | 'conteneurs' | 'cartons'
  message: string
}

export interface NewsArticle {
  id: string
  titleFr: string
  titleEn: string
  summaryFr: string
  summaryEn: string
  contentFr: string
  contentEn: string
  category: string
  publishedAt: string
  image: string
  author: string
}

export interface Partner {
  id: string
  nameFr: string
  nameEn: string
  descriptionFr: string
  descriptionEn: string
  logo: string
  website?: string
  country: string
}

export interface ContactMessage {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface SupplierApplication {
  company: string
  country: string
  products: string
  certifications: string
  annualVolume: string
  contactName: string
  email: string
  phone: string
  message: string
}

export interface TeamMember {
  id: string
  nameFr: string
  nameEn: string
  roleFr: string
  roleEn: string
  image: string
}

export interface TimelineEvent {
  year: string
  titleFr: string
  titleEn: string
  descriptionFr: string
  descriptionEn: string
}

export interface DepartmentProduct {
  code: string
  nameFr: string
  nameEn: string
  refFr: string
  refEn: string
  photoAltFr?: string
  photoAltEn?: string
  image?: string
  descriptionFr?: string
  descriptionEn?: string
  brand?: string
  formats?: string[]
  availability?: Availability
  badge?: ProductBadge
  packagingTonnes?: string
  packagingPalettes?: string
  packagingConteneurs?: string
  oilPercentage?: string
}

export interface Department {
  id: string
  code: string
  nameFr: string
  nameEn: string
  ledeFr: string
  ledeEn: string
  cover?: string
  coverAltFr?: string
  coverAltEn?: string
  products: DepartmentProduct[]
}
