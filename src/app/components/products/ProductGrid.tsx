import { ProductCard } from './ProductCard'
import { useLanguage } from '../../hooks/useLanguage'
import { getCategoryById } from '../../services/productService'
import type { Product } from '../../types'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const { t } = useLanguage()

  if (products.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#6B7280' }}>
          {t('Aucun produit trouvé.', 'No products found.')}
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '24px',
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          category={getCategoryById(product.categoryId)}
        />
      ))}
    </div>
  )
}
