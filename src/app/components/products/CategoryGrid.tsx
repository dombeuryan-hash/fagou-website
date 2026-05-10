import { ImageWithFallback } from '../common/ImageWithFallback'
import { CategoryIcon } from '../common/CategoryIcon'
import { useLanguage } from '../../hooks/useLanguage'
import { getProductCountByCategory } from '../../services/productService'
import type { Category } from '../../types'

interface CategoryGridProps {
  categories: Category[]
  selectedCategoryId: string
  onSelectCategory: (categoryId: string) => void
}

export function CategoryGrid({ categories, selectedCategoryId, onSelectCategory }: CategoryGridProps) {
  const { t } = useLanguage()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
      }}
    >
      {categories.map((category) => {
        const count = getProductCountByCategory(category.id)
        const isSelected = selectedCategoryId === category.id

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            aria-pressed={isSelected}
            aria-label={`${t(category.nameFr, category.nameEn)} — ${count} ${t('références', 'references')}`}
            style={{
              position: 'relative',
              aspectRatio: '4/3',
              borderRadius: '12px',
              overflow: 'hidden',
              border: isSelected ? '3px solid #1A5C1A' : '3px solid transparent',
              cursor: 'pointer',
              background: 'none',
              padding: 0,
              transition: 'border-color 200ms ease, transform 200ms ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}
          >
            <ImageWithFallback
              src={category.image}
              alt={t(category.nameFr, category.nameEn)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                padding: '12px', color: '#FFFFFF', display: 'flex', flexDirection: 'column', gap: '4px',
              }}
            >
              <CategoryIcon iconName={category.icon} size={20} color="#FFFFFF" />
              <p style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '13px' }}>
                {t(category.nameFr, category.nameEn)}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', opacity: 0.85 }}>
                {count} {t('référence', 'reference')}{count > 1 ? 's' : ''}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
