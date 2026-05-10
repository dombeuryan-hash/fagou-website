import { Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { useLanguage } from '../hooks/useLanguage'
import { ROUTES } from '../constants'

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px' }}>
      <AlertCircle size={64} color="#1A5C1A" style={{ marginBottom: '24px' }} />
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '80px', color: '#1A5C1A', lineHeight: 1 }}>
        404
      </h1>
      <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '28px', color: '#1A1A1A', marginBottom: '16px', marginTop: '8px' }}>
        {t('Page introuvable', 'Page not found')}
      </h2>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#6B7280', maxWidth: '400px', lineHeight: 1.7, marginBottom: '36px' }}>
        {t(
          'La page que vous cherchez n\'existe pas ou a été déplacée. Revenez à l\'accueil pour continuer votre navigation.',
          'The page you are looking for does not exist or has been moved. Return to the home page to continue browsing.'
        )}
      </p>
      <Link to={ROUTES.HOME}>
        <Button size="lg">
          <ArrowLeft size={18} />
          {t('Retour à l\'accueil', 'Back to home')}
        </Button>
      </Link>
    </div>
  )
}
