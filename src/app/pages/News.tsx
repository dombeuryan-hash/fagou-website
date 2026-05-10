import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { ImageWithFallback } from '../components/common/ImageWithFallback'
import { useLanguage } from '../hooks/useLanguage'
import { getAllArticles, getUniqueCategories } from '../services/newsService'
import { formatDate } from '../lib/formatters'
import { ROUTES } from '../constants'

export default function News() {
  const { t, language } = useLanguage()
  const [selectedCategory, setSelectedCategory] = useState('')
  const allArticles = getAllArticles()
  const categories = getUniqueCategories()

  const filteredArticles = useMemo(() => {
    if (!selectedCategory) return allArticles
    return allArticles.filter((a) => a.category === selectedCategory)
  }, [allArticles, selectedCategory])

  return (
    <div>
      <section style={{ backgroundColor: '#1A5C1A', padding: '72px 24px', textAlign: 'center', color: '#FFFFFF' }}>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', marginBottom: '16px' }}>
          {t('Actualités', 'News')}
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', opacity: 0.9, maxWidth: '560px', margin: '0 auto', lineHeight: 1.6 }}>
          {t('Toutes les nouvelles de FAGOU SRL et du secteur agroalimentaire.', 'All news from FAGOU SRL and the agri-food sector.')}
        </p>
      </section>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '56px 24px' }}>
        {/* Category filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
          <button
            onClick={() => setSelectedCategory('')}
            aria-pressed={selectedCategory === ''}
            style={{ padding: '8px 18px', borderRadius: '20px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', cursor: 'pointer', transition: 'all 200ms ease', backgroundColor: !selectedCategory ? '#1A5C1A' : '#FFFFFF', color: !selectedCategory ? '#FFFFFF' : '#6B7280', border: `1px solid ${!selectedCategory ? '#1A5C1A' : '#E5E7EB'}` }}
          >
            {t('Toutes', 'All')}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              aria-pressed={selectedCategory === cat}
              style={{ padding: '8px 18px', borderRadius: '20px', fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: '14px', cursor: 'pointer', transition: 'all 200ms ease', backgroundColor: selectedCategory === cat ? '#1A5C1A' : '#FFFFFF', color: selectedCategory === cat ? '#FFFFFF' : '#6B7280', border: `1px solid ${selectedCategory === cat ? '#1A5C1A' : '#E5E7EB'}` }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '32px' }}>
          {filteredArticles.map((article) => (
            <article key={article.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E5E7EB', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
                <ImageWithFallback
                  src={article.image}
                  alt={t(article.titleFr, article.titleEn)}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 300ms ease' }}
                />
              </div>
              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Tag size={12} color="#1A5C1A" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#1A5C1A', fontWeight: 500 }}>{article.category}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={12} color="#6B7280" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6B7280' }}>{formatDate(article.publishedAt, language)}</span>
                  </div>
                </div>
                <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px', marginBottom: '10px', lineHeight: 1.4 }}>
                  {t(article.titleFr, article.titleEn)}
                </h2>
                <p className="line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280', lineHeight: 1.7, marginBottom: '16px' }}>
                  {t(article.summaryFr, article.summaryEn)}
                </p>
                <Link to={`${ROUTES.NEWS}/${article.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px', color: '#1A5C1A' }}>
                  {t('Lire la suite', 'Read more')}
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
