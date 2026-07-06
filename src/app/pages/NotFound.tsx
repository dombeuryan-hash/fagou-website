import { Link } from 'react-router-dom'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { ROUTES } from '../constants'

export default function NotFound() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()
  const px = isMobile ? 20 : 64

  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <Nav />

      <section style={{ padding: `${isMobile ? 140 : 240}px ${px}px ${isMobile ? 80 : 160}px` }}>
        <div className="fg-eyebrow" style={{ marginBottom: 32 }}>↗ {t('Erreur', 'Error')}</div>
        <h1
          className="fg-fr"
          style={{ fontSize: 'clamp(80px, 15vw, 200px)', margin: 0, fontWeight: 400, letterSpacing: '-0.05em', lineHeight: 0.85, color: '#1A5C1A' }}
        >
          404
        </h1>
        <h2
          className="fg-fr"
          style={{ fontSize: 'clamp(28px, 4vw, 56px)', margin: '24px 0 0', fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}
        >
          {t('Page', 'Page')}{' '}
          <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('introuvable.', 'not found.')}</span>
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6B7280', marginTop: 28, maxWidth: 440 }}>
          {t(
            "La page que vous cherchez n'existe pas ou a été déplacée. Revenez à l'accueil pour continuer.",
            'The page you are looking for does not exist or has been moved. Return to the home page to continue.',
          )}
        </p>
        <div style={{ marginTop: 40 }}>
          <Link to={ROUTES.HOME} className="btn-primary">
            {t('← Retour à l\'accueil', '← Back to home')}
          </Link>
        </div>
      </section>
    </div>
  )
}
