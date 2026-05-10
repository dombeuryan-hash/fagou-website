import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Eye } from 'lucide-react'
import { ImageWithFallback } from '../common/ImageWithFallback'
import { CategoryIcon } from '../common/CategoryIcon'
import { Button } from '../ui/Button'
import { QuoteModal } from './QuoteModal'
import { useLanguage } from '../../hooks/useLanguage'
import type { Product, Category } from '../../types'
import { AVAILABILITY_COLORS, BADGE_COLORS } from '../../constants'
import { buildProductDetailPath } from '../../lib/formatters'

interface ProductCardProps {
  product: Product
  category: Category | undefined
}

const AVAILABILITY_LABELS: Record<string, { fr: string; en: string }> = {
  available: { fr: 'Disponible', en: 'Available' },
  'on-request': { fr: 'Sur demande', en: 'On request' },
  'to-confirm': { fr: 'À confirmer', en: 'To confirm' },
}

const BADGE_LABELS: Record<string, { fr: string; en: string }> = {
  export: { fr: 'Export', en: 'Export' },
  premium: { fr: 'Premium', en: 'Premium' },
  new: { fr: 'Nouveau', en: 'New' },
}

export function ProductCard({ product, category }: ProductCardProps) {
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)

  const productName = t(product.nameFr, product.nameEn)
  const visibleFormats = product.formats.slice(0, 3)
  const extraFormatCount = product.formats.length - 3

  return (
    <>
      <article
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '12px',
          border: '1px solid #E5E7EB',
          overflow: 'hidden',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          transition: 'box-shadow 250ms ease, transform 250ms ease',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'
          el.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'
          el.style.transform = 'translateY(0)'
        }}
      >
        <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
          <ImageWithFallback
            src={product.image}
            alt={productName}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {product.badge && (
              <span style={{ backgroundColor: BADGE_COLORS[product.badge] ?? '#6B7280', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '11px', padding: '3px 8px', borderRadius: '4px' }}>
                {t(BADGE_LABELS[product.badge].fr, BADGE_LABELS[product.badge].en)}
              </span>
            )}
            <span style={{ backgroundColor: AVAILABILITY_COLORS[product.availability] ?? '#6B7280', color: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '11px', padding: '3px 8px', borderRadius: '4px' }}>
              {t(AVAILABILITY_LABELS[product.availability].fr, AVAILABILITY_LABELS[product.availability].en)}
            </span>
          </div>
        </div>

        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {category && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <CategoryIcon iconName={category.icon} size={14} color="#6B7280" />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6B7280' }}>
                {t(category.nameFr, category.nameEn)}
              </span>
            </div>
          )}

          {product.brand && (
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#1A5C1A', fontWeight: 600 }}>
              {product.brand}
            </p>
          )}

          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '15px', color: '#1A1A1A' }}>
            {productName}
          </h3>

          <p
            className="line-clamp-2"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}
          >
            {t(product.descriptionFr, product.descriptionEn)}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {visibleFormats.map((format) => (
              <span key={format} style={{ backgroundColor: '#F3F4F6', borderRadius: '4px', padding: '2px 8px', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#6B7280' }}>
                {format}
              </span>
            ))}
            {extraFormatCount > 0 && (
              <span style={{ backgroundColor: '#F3F4F6', borderRadius: '4px', padding: '2px 8px', fontFamily: 'Inter, sans-serif', fontSize: '11px', color: '#6B7280' }}>
                +{extraFormatCount}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '8px' }}>
            <Button size="sm" variant="outline" onClick={() => navigate(buildProductDetailPath(product.id))} style={{ flex: 1 }}>
              <Eye size={14} />
              {t('Détails', 'Details')}
            </Button>
            <Button size="sm" onClick={() => setIsQuoteModalOpen(true)} style={{ flex: 1 }}>
              <FileText size={14} />
              {t('Devis', 'Quote')}
            </Button>
          </div>
        </div>
      </article>

      {isQuoteModalOpen && (
        <QuoteModal
          productName={productName}
          productId={product.id}
          onClose={() => setIsQuoteModalOpen(false)}
        />
      )}
    </>
  )
}
