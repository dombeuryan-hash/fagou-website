import { productsData } from '../data/productsData'
import { categoriesData } from '../data/categoriesData'
import type { Product, Category } from '../types'

export function getAllProducts(): Product[] {
  return productsData
}

export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id)
}

export function getProductsByCategory(categoryId: string): Product[] {
  if (categoryId === 'all') return productsData
  return productsData.filter((p) => p.categoryId === categoryId)
}

export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) return products
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.nameFr.toLowerCase().includes(lowerQuery) ||
      p.nameEn.toLowerCase().includes(lowerQuery) ||
      p.descriptionFr.toLowerCase().includes(lowerQuery) ||
      p.brand?.toLowerCase().includes(lowerQuery)
  )
}

export function getSimilarProducts(product: Product, limit = 4): Product[] {
  return productsData
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, limit)
}

export function getAllCategories(): Category[] {
  return categoriesData
}

export function getCategoryById(id: string): Category | undefined {
  return categoriesData.find((c) => c.id === id)
}

export function getProductCountByCategory(categoryId: string): number {
  return productsData.filter((p) => p.categoryId === categoryId).length
}
