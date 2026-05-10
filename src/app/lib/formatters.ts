export function formatDate(dateString: string, language: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(language === 'fr' ? 'fr-BE' : 'en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '…'
}

export function buildProductDetailPath(productId: string): string {
  return `/produit/${productId}`
}
