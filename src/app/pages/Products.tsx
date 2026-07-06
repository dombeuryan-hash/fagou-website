import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { useCatalogue } from '../hooks/useCatalogue'
import type { FlatProduct } from '../hooks/useCatalogue'

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
    <div className="fg-card-img-wrap" style={{ width: '100%', aspectRatio: ratio, background: '#EEF2EE', position: 'relative', overflow: 'hidden' }}>
      <div className="fg-card-img" style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 7px, rgba(15,61,20,0.08) 7px 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <span className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(15,61,20,0.55)', textAlign: 'center', fontWeight: 500 }}>{label}</span>
      </div>
    </div>
  )
}

function ProductCard({ product, lang }: { product: FlatProduct; lang: string }) {
  const name = lang === 'fr' ? product.nameFr : product.nameEn
  const ref = lang === 'fr' ? product.refFr : product.refEn
  const photoLabel = lang === 'fr' ? (product.photoAltFr ?? '') : (product.photoAltEn ?? '')

  return (
    <Link
      to={`/produit/${product.code}`}
      className="fg-card"
      style={{ borderRadius: 10, border: '1px solid #E5E7EB', background: '#fff', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', transition: 'box-shadow 200ms ease' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(15,61,20,0.08)' }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
    >
      <div style={{ position: 'relative' }}>
        <Photo label={photoLabel} image={product.image} ratio="4 / 3" />
        <span className="badge badge-green" style={{ position: 'absolute', top: 12, left: 12 }}>{lang === 'fr' ? 'En stock' : 'In stock'}</span>
      </div>
      <div style={{ padding: '20px 22px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <span className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{product.code}</span>
        <h3 className="fg-fr" style={{ fontSize: 24, margin: '8px 0 6px', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.05 }}>{name}</h3>
        <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{ref}</p>
      </div>
    </Link>
  )
}

export default function Products() {
  const { t, language } = useLanguage()
  const { departments, allProducts, loading } = useCatalogue()
  const isMobile = useIsMobile()
  const [searchParams] = useSearchParams()
  const [deptFilter, setDeptFilter] = useState(() => searchParams.get('dept') ?? 'all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = deptFilter === 'all' ? allProducts : allProducts.filter((p) => p.dept === deptFilter)
  const px = isMobile ? 20 : 64

  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--color-bg)' }}>
      <Nav />

      {/* Sub-hero */}
      <section style={{ padding: `${isMobile ? 100 : 180}px ${px}px ${isMobile ? 48 : 80}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div className="fg-eyebrow" style={{ marginBottom: isMobile ? 32 : 56 }}>↗ 02 / 06 · {t('Catalogue', 'Catalogue')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 24 : 64, alignItems: 'end' }}>
          <h1 className="fg-fr" style={{ fontSize: 'clamp(48px, 8vw, 128px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.92 }}>
            {t('Catalogue', 'Fagou')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('Fagou.', 'catalogue.')}</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: '#6B7280', margin: 0, maxWidth: 420 }}>
            {t(
              "Cinq départements, une vingtaine de références principales. Filtrer par département ; demander une cotation sur n'importe quelle ligne.",
              "Five departments, around twenty main references. Filter by department; request a quote on any line."
            )}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section style={{ padding: `${isMobile ? 40 : 80}px ${px}px ${isMobile ? 64 : 120}px` }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid #E5E7EB' }}>
          <div className="fg-mono" style={{ fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#6B7280' }}>
            {filtered.length} {t('références', 'references')}
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
            {!isMobile && (
              <a href="catalog.pdf" download className="btn-ghost" style={{ padding: '10px 18px', fontSize: 12 }}>
                ↓ {t('Télécharger le catalogue PDF', 'Download catalogue PDF')}
              </a>
            )}
            <div style={{ display: 'flex', border: '1px solid #E5E7EB', borderRadius: 999, padding: 3 }}>
              {(['grid', 'list'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="fg-mono"
                  style={{ padding: '8px 16px', border: 0, borderRadius: 999, cursor: 'pointer', background: view === v ? '#1A5C1A' : 'transparent', color: view === v ? '#fff' : '#1A1A1A', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase' }}
                >
                  {v === 'grid' ? t('Grille', 'Grid') : t('Liste', 'List')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: horizontal filter pills */}
        {isMobile && (
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
            <button
              onClick={() => setDeptFilter('all')}
              className="fg-mono"
              style={{ padding: '8px 14px', borderRadius: 999, border: `1px solid ${deptFilter === 'all' ? '#1A5C1A' : '#E5E7EB'}`, background: deptFilter === 'all' ? '#1A5C1A' : '#fff', color: deptFilter === 'all' ? '#fff' : '#1A1A1A', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}
            >
              {t('Tout', 'All')} ({allProducts.length})
            </button>
            {departments.map((d) => (
              <button
                key={d.id}
                onClick={() => setDeptFilter(d.id)}
                className="fg-mono"
                style={{ padding: '8px 14px', borderRadius: 999, border: `1px solid ${deptFilter === d.id ? '#1A5C1A' : '#E5E7EB'}`, background: deptFilter === d.id ? '#1A5C1A' : '#fff', color: deptFilter === d.id ? '#fff' : '#1A1A1A', fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                {language === 'fr' ? d.nameFr : d.nameEn} ({d.products.length})
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '220px 1fr', gap: isMobile ? 0 : 56 }}>
          {/* Desktop filter rail */}
          {!isMobile && (
            <aside style={{ position: 'sticky', top: 32, alignSelf: 'start' }}>
              <div className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 14 }}>
                ↗ {t('Département', 'Department')}
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <li>
                  <button
                    onClick={() => setDeptFilter('all')}
                    className="fg-mono"
                    style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 0, cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #E5E7EB', fontSize: 12, color: deptFilter === 'all' ? '#1A5C1A' : '#1A1A1A', fontWeight: deptFilter === 'all' ? 600 : 400, letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>{t('Tout', 'All')}</span>
                    <span style={{ color: '#6B7280' }}>{allProducts.length}</span>
                  </button>
                </li>
                {departments.map((d) => (
                  <li key={d.id}>
                    <button
                      onClick={() => setDeptFilter(d.id)}
                      className="fg-mono"
                      style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 0, cursor: 'pointer', padding: '10px 0', borderBottom: '1px solid #E5E7EB', fontSize: 12, color: deptFilter === d.id ? '#1A5C1A' : '#1A1A1A', fontWeight: deptFilter === d.id ? 600 : 400, letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between' }}
                    >
                      <span>{d.code}. {language === 'fr' ? d.nameFr : d.nameEn}</span>
                      <span style={{ color: '#6B7280' }}>{d.products.length}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Product content */}
          <div>
            {loading ? (
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', padding: '40px 0' }}>Chargement…</p>
            ) : view === 'grid' ? (
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? 14 : 24 }}>
                {filtered.map((p) => (
                  <ProductCard key={p.code} product={p} lang={language} />
                ))}
              </div>
            ) : (
              <div style={{ borderTop: '1px solid #E5E7EB' }}>
                {filtered.map((p) => {
                  const name = language === 'fr' ? p.nameFr : p.nameEn
                  const ref = language === 'fr' ? p.refFr : p.refEn
                  const photoLabel = language === 'fr' ? (p.photoAltFr ?? '') : (p.photoAltEn ?? '')
                  return isMobile ? (
                    <Link
                      key={p.code}
                      to={`/produit/${p.code}`}
                      style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: 16, padding: '16px 0', borderBottom: '1px solid #E5E7EB', textDecoration: 'none', color: 'inherit', alignItems: 'center' }}
                    >
                      <Photo image={p.image} label={photoLabel} ratio="1 / 1" />
                      <div>
                        <span className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.12em', display: 'block' }}>{p.code}</span>
                        <h3 className="fg-fr" style={{ fontSize: 20, margin: '4px 0 4px', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.05 }}>{name}</h3>
                        <span style={{ fontSize: 12, color: '#6B7280' }}>{ref}</span>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      key={p.code}
                      to={`/produit/${p.code}`}
                      style={{ display: 'grid', gridTemplateColumns: '120px 80px 1fr 1fr 110px', gap: 32, padding: '24px 0', borderBottom: '1px solid #E5E7EB', textDecoration: 'none', color: 'inherit', alignItems: 'center' }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = '#F9FAFB' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent' }}
                    >
                      <Photo image={p.image} label={photoLabel} ratio="1 / 1" />
                      <span className="fg-mono" style={{ fontSize: 11, color: '#6B7280', letterSpacing: '0.12em' }}>{p.code}</span>
                      <h3 className="fg-fr" style={{ fontSize: 28, margin: 0, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.05 }}>{name}</h3>
                      <span style={{ fontSize: 13, color: '#6B7280' }}>{ref}</span>
                      <span className="badge badge-green" style={{ justifySelf: 'end' }}>{language === 'fr' ? 'En stock' : 'In stock'}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
