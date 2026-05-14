import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { useProductByCode } from '../hooks/useCatalogue'
import { ROUTES } from '../constants'
import type { Availability, ProductBadge } from '../types'

function Photo({ image, label, ratio = '4 / 3' }: { image?: string; label: string; ratio?: string }) {
  const [portrait, setPortrait] = useState(false)
  if (image) {
    return (
      <div className="fg-card-img-wrap" style={{ width: '100%', aspectRatio: ratio, position: 'relative', overflow: 'hidden', background: portrait ? '#EEF2EE' : 'transparent' }}>
        <img
          className="fg-card-img"
          src={image}
          alt={label}
          onLoad={(e) => {
            const img = e.currentTarget
            setPortrait(img.naturalHeight > img.naturalWidth)
          }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: portrait ? 'contain' : 'cover', display: 'block' }}
        />
      </div>
    )
  }
  return (
    <div style={{ width: '100%', aspectRatio: ratio, background: '#EEF2EE', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 7px, rgba(15,61,20,0.08) 7px 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <span className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(15,61,20,0.55)', textAlign: 'center', fontWeight: 500 }}>{label}</span>
      </div>
    </div>
  )
}

const BADGE_STYLES: Record<ProductBadge, { label: { fr: string; en: string }; bg: string; color: string }> = {
  export:  { label: { fr: 'Export',   en: 'Export'   }, bg: '#0F3D14', color: '#fff' },
  premium: { label: { fr: 'Premium',  en: 'Premium'  }, bg: '#7C5200', color: '#fff' },
  new:     { label: { fr: 'Nouveau',  en: 'New'      }, bg: '#C0392B', color: '#fff' },
}

const AVAIL_STYLES: Record<Availability, { label: { fr: string; en: string }; dot: string }> = {
  'available':  { label: { fr: 'Disponible',  en: 'Available'  }, dot: '#22C55E' },
  'on-request': { label: { fr: 'Sur demande', en: 'On request' }, dot: '#F59E0B' },
  'to-confirm': { label: { fr: 'À confirmer', en: 'To confirm' }, dot: '#9CA3AF' },
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { t, language } = useLanguage()
  const { product, dept, loading } = useProductByCode(id ?? '')
  const isMobile = useIsMobile()

  const px = isMobile ? 20 : 64

  if (loading) {
    return (
      <div style={{ position: 'relative', backgroundColor: '#FAFAF8' }}>
        <Nav />
        <section style={{ padding: '220px 64px 120px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280' }}>Chargement…</p>
        </section>
      </div>
    )
  }

  if (!product || !dept) {
    return (
      <div style={{ position: 'relative', backgroundColor: '#FAFAF8' }}>
        <Nav />
        <section style={{ padding: '220px 64px 120px', textAlign: 'center' }}>
          <div className="fg-eyebrow" style={{ marginBottom: 24 }}>↗ {t('Produit introuvable', 'Product not found')}</div>
          <h1 className="fg-fr" style={{ fontSize: 64, margin: '0 0 32px', fontWeight: 400 }}>404</h1>
          <Link to={ROUTES.PRODUCTS} className="btn-primary">{t('← Retour au catalogue', '← Back to catalogue')}</Link>
        </section>
      </div>
    )
  }

  const name        = language === 'fr' ? product.nameFr : product.nameEn
  const ref         = language === 'fr' ? product.refFr  : product.refEn
  const description = language === 'fr' ? product.descriptionFr : product.descriptionEn
  const photoLabel  = language === 'fr' ? (product.photoAltFr ?? '') : (product.photoAltEn ?? '')
  const deptName    = language === 'fr' ? dept.nameFr : dept.nameEn

  const badge     = product.badge        ? BADGE_STYLES[product.badge]           : null
  const availInfo = product.availability ? AVAIL_STYLES[product.availability]    : null

  const specRows: { label: string; value: string }[] = []
  if (product.packagingTonnes)     specRows.push({ label: t('Par conteneur (tonnes)', 'Per container (tonnes)'), value: product.packagingTonnes })
  if (product.packagingPalettes)   specRows.push({ label: t('Palettes / conteneur', 'Pallets / container'),      value: product.packagingPalettes })
  if (product.packagingConteneurs) specRows.push({ label: t('Conteneurs', 'Containers'),                         value: product.packagingConteneurs })
  if (product.oilPercentage)       specRows.push({ label: t('Teneur en matière grasse', 'Oil / fat content'),    value: product.oilPercentage })
  if (product.brand)               specRows.push({ label: t('Marque', 'Brand'),                                  value: product.brand })

  const related = dept.products.filter((p: { code: string }) => p.code !== product.code).slice(0, 3)

  return (
    <div style={{ position: 'relative', backgroundColor: '#FAFAF8' }}>
      <Nav />

      {/* Breadcrumb */}
      <section style={{ padding: `${isMobile ? 100 : 180}px ${px}px ${isMobile ? 32 : 56}px`, borderBottom: '1px solid #E5E7EB' }}>
        <Link
          to={ROUTES.PRODUCTS}
          className="fg-mono"
          style={{ fontSize: 11, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: 24, display: 'inline-block' }}
        >
          {t('← Retour au catalogue', '← Back to catalogue')}
        </Link>
        <div className="fg-eyebrow" style={{ marginTop: 16 }}>↗ {dept.code} · {deptName}</div>
      </section>

      {/* Main product section */}
      <section style={{ padding: `${isMobile ? 48 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'start' }}>
          <Photo image={product.image} label={photoLabel} ratio="4 / 3" />
          <div>
            {(badge || availInfo) && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                {badge && (
                  <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', background: badge.bg, color: badge.color }}>
                    {badge.label[language]}
                  </span>
                )}
                {availInfo && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6B7280' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: availInfo.dot, flexShrink: 0 }} />
                    {availInfo.label[language]}
                  </span>
                )}
              </div>
            )}

            <span className="fg-mono" style={{ fontSize: 11, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              {t('Référence', 'Reference')} · {product.code}
            </span>
            <h1 className="fg-fr" style={{ fontSize: 'clamp(36px, 5vw, 76px)', margin: '14px 0 24px', fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {name}
            </h1>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: '#6B7280', margin: '0 0 28px', maxWidth: 480 }}>{ref}.</p>

            {description && (
              <p style={{ fontSize: 15, lineHeight: 1.7, color: '#374151', margin: '0 0 28px', maxWidth: 480, whiteSpace: 'pre-line' }}>
                {description}
              </p>
            )}

            {product.formats && product.formats.length > 0 && (
              <div style={{ marginBottom: 28 }}>
                <span className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase', display: 'block', marginBottom: 10 }}>
                  {t('Formats disponibles', 'Available formats')}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {product.formats.map((f) => (
                    <span key={f} style={{ display: 'inline-block', padding: '5px 12px', border: '1px solid #D1D5DB', borderRadius: 4, fontSize: 13, color: '#374151', fontFamily: 'inherit' }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', borderTop: '1px solid #E5E7EB', marginBottom: 32 }}>
              {[
                [t('Origine', 'Origin'), language === 'fr' ? 'Multi-origine' : 'Multi-origin'],
                ['Incoterms', 'EXW · FOB · CIF · DDP'],
              ].map(([k, v], i) => (
                <div key={i} style={{ padding: '18px 0', borderBottom: '1px solid #E5E7EB', paddingRight: i % 2 === 0 ? 18 : 0 }}>
                  <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>{k}</div>
                  <div style={{ fontSize: 14, color: '#1A1A1A', fontWeight: 500 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to={ROUTES.CONTACT} className="btn-primary">{t('Demander une cotation', 'Request a quotation')} →</Link>
              <a href="cgv.pdf" download className="btn-ghost">↓ {t('Conditions de vente (PDF)', 'Terms of sale (PDF)')}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Spec table */}
      {specRows.length > 0 && (
        <section style={{ padding: `${isMobile ? 48 : 120}px ${px}px`, background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
          <div style={{ marginBottom: isMobile ? 32 : 56 }}>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 6vw, 64px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Spécifications', 'Technical')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('techniques.', 'specifications.')}</span>
            </h2>
          </div>
          <div style={{ borderTop: '1px solid #E5E7EB' }}>
            {specRows.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', padding: '24px 0', borderBottom: '1px solid #E5E7EB', gap: isMobile ? 6 : 24 }}>
                <div className="fg-mono" style={{ fontSize: 11, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', alignSelf: 'center' }}>{row.label}</div>
                <div style={{ fontSize: 16, color: '#1A1A1A', fontWeight: 400 }}>{row.value}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related products */}
      <section style={{ padding: `${isMobile ? 48 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ marginBottom: isMobile ? 32 : 56 }}>
          <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 6vw, 64px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
            {t('Autres références', 'Other references')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('du département.', 'in this department.')}</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 14 : 24 }}>
          {related.map((p) => (
            <Link
              key={p.code}
              to={`/produit/${p.code}`}
              className="fg-card"
              style={{ borderRadius: 10, border: '1px solid #E5E7EB', background: '#fff', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(15,61,20,0.08)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <Photo label={language === 'fr' ? (p.photoAltFr ?? '') : (p.photoAltEn ?? '')} image={p.image} ratio="4 / 3" />
              <div style={{ padding: isMobile ? '14px 14px 16px' : '20px 22px 22px' }}>
                <span className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{p.code}</span>
                <h3 className="fg-fr" style={{ fontSize: isMobile ? 18 : 24, margin: '8px 0 6px', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
                  {language === 'fr' ? p.nameFr : p.nameEn}
                </h3>
                <p style={{ fontSize: 12, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
                  {language === 'fr' ? p.refFr : p.refEn}
                </p>
              </div>
            </Link>
          ))}
          {related.length < 3 && !isMobile && Array.from({ length: 3 - related.length }).map((_, i) => (
            <div key={'ph' + i} style={{ border: '1px dashed #E5E7EB', borderRadius: 10, padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                {language === 'fr' ? 'autres références → voir catalogue' : 'more references → see catalogue'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
