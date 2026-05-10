import { useParams, Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { ImageWithFallback } from '../components/common/ImageWithFallback'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../hooks/useLanguage'
import { getArticleById, getRelatedArticles } from '../services/newsService'
import { formatDate } from '../lib/formatters'
import { ROUTES } from '../constants'

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { t, language } = useLanguage()

  const article = id ? getArticleById(id) : undefined

  if (!article) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '28px' }}>
          {t('Article introuvable', 'Article not found')}
        </h1>
        <Button onClick={() => navigate(ROUTES.NEWS)}>
          <ArrowLeft size={16} />
          {t('Retour aux actualités', 'Back to news')}
        </Button>
      </div>
    )
  }

  const relatedArticles = getRelatedArticles(article)

  return (
    <div>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}>
        <button
          onClick={() => navigate(ROUTES.NEWS)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A5C1A', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', marginBottom: '32px' }}
        >
          <ArrowLeft size={16} />
          {t('Retour aux actualités', 'Back to news')}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Tag size={14} color="#1A5C1A" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#1A5C1A', fontWeight: 500 }}>{article.category}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={14} color="#6B7280" />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B7280' }}>{formatDate(article.publishedAt, language)}</span>
          </div>
        </div>

        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.25, marginBottom: '24px' }}>
          {t(article.titleFr, article.titleEn)}
        </h1>

        <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '36px', aspectRatio: '16/9' }}>
          <ImageWithFallback
            src={article.image}
            alt={t(article.titleFr, article.titleEn)}
            loading="eager"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#1A1A1A', lineHeight: 1.85 }}>
          {t(article.contentFr, article.contentEn).split('\n\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '20px' }}>{paragraph}</p>
          ))}
        </div>
      </div>

      {relatedArticles.length > 0 && (
        <section style={{ backgroundColor: '#F3F4F6', padding: '60px 24px', marginTop: '40px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '24px', marginBottom: '28px' }}>
              {t('Articles liés', 'Related articles')}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
              {relatedArticles.map((rel) => (
                <Link key={rel.id} to={`${ROUTES.NEWS}/${rel.id}`} style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', border: '1px solid #E5E7EB', display: 'block' }}>
                  <ImageWithFallback src={rel.image} alt={t(rel.titleFr, rel.titleEn)} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  <div style={{ padding: '20px' }}>
                    <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: 1.4 }}>
                      {t(rel.titleFr, rel.titleEn)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
