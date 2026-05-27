import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ImageWithFallback } from '../components/common/ImageWithFallback'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { getAllArticles, getUniqueCategories } from '../services/newsService'
import { formatDate } from '../lib/formatters'
import { ROUTES } from '../constants'

export default function News() {
  const { t, language } = useLanguage()
  const isMobile = useIsMobile()
  const [selectedCategory, setSelectedCategory] = useState('')
  const allArticles = getAllArticles()
  const categories = getUniqueCategories()
  const px = isMobile ? 20 : 64

  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return allArticles
    return allArticles.filter((a) => a.category === selectedCategory)
  }, [allArticles, selectedCategory])

  return (
    <div style={{ position: 'relative', backgroundColor: '#FAFAF8' }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: `${isMobile ? 100 : 180}px ${px}px ${isMobile ? 48 : 80}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div className="fg-eyebrow" style={{ marginBottom: isMobile ? 32 : 56 }}>↗ {t('Actualités', 'News')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 24 : 64, alignItems: 'end' }}>
          <h1 className="fg-fr" style={{ fontSize: 'clamp(48px, 8vw, 128px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.92 }}>
            {t('Actualités', 'Fagou')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('Fagou.', 'news.')}</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: '#6B7280', margin: 0, maxWidth: 420 }}>
            {t(
              'Toutes les nouvelles de FAGOU SRL et du secteur agroalimentaire.',
              'All news from FAGOU SRL and the agri-food sector.',
            )}
          </p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section style={{ padding: `${isMobile ? 40 : 80}px ${px}px ${isMobile ? 64 : 120}px` }}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40, paddingBottom: 24, borderBottom: '1px solid #E5E7EB' }}>
          <button
            onClick={() => setSelectedCategory('')}
            aria-pressed={selectedCategory === ''}
            className="fg-mono"
            style={{
              padding: '9px 16px', borderRadius: 999, fontSize: 10, letterSpacing: '0.12em',
              textTransform: 'uppercase', cursor: 'pointer', transition: 'all 200ms ease',
              backgroundColor: !selectedCategory ? '#1A5C1A' : '#fff',
              color: !selectedCategory ? '#fff' : '#1A1A1A',
              border: `1px solid ${!selectedCategory ? '#1A5C1A' : '#E5E7EB'}`,
            }}
          >
            {t('Toutes', 'All')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              className="fg-mono"
              style={{
                padding: '9px 16px', borderRadius: 999, fontSize: 10, letterSpacing: '0.12em',
                textTransform: 'uppercase', cursor: 'pointer', transition: 'all 200ms ease',
                backgroundColor: selectedCategory === cat ? '#1A5C1A' : '#fff',
                color: selectedCategory === cat ? '#fff' : '#1A1A1A',
                border: `1px solid ${selectedCategory === cat ? '#1A5C1A' : '#E5E7EB'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))', gap: isMobile ? 20 : 28 }}>
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              to={`${ROUTES.NEWS}/${article.id}`}
              className="fg-card"
              style={{ borderRadius: 10, border: '1px solid #E5E7EB', background: '#fff', overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block', transition: 'box-shadow 200ms ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(15,61,20,0.08)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
            >
              <div className="fg-card-img-wrap" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                <ImageWithFallback
                  src={article.image}
                  alt={t(article.titleFr, article.titleEn)}
                  className="fg-card-img"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ padding: isMobile ? '20px' : '28px 28px 32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                  <span className="fg-mono" style={{ fontSize: 10, color: '#1A5C1A', letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 500 }}>
                    {article.category}
                  </span>
                  <span style={{ width: 3, height: 3, borderRadius: '50%', background: '#D1D5DB', flexShrink: 0 }} />
                  <span className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.1em' }}>
                    {formatDate(article.publishedAt, language)}
                  </span>
                </div>
                <h2 className="fg-fr" style={{ fontSize: isMobile ? 22 : 26, margin: '0 0 10px', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.1 }}>
                  {t(article.titleFr, article.titleEn)}
                </h2>
                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {t(article.summaryFr, article.summaryEn)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
