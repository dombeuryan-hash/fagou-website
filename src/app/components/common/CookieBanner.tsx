import { Cookie, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { Button } from '../ui/Button'
import { COOKIE_CONSENT_KEY } from '../../constants'

type CookieConsent = 'accepted' | 'refused' | null

export function CookieBanner() {
  const { t } = useLanguage()
  const [consent, setConsent] = useLocalStorage<CookieConsent>(COOKIE_CONSENT_KEY, null)

  if (consent !== null) return null

  return (
    <div
      role="dialog"
      aria-label={t('Consentement aux cookies', 'Cookie consent')}
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        right: '24px',
        maxWidth: '560px',
        backgroundColor: '#1A5C1A',
        color: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px 24px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <Cookie size={24} color="#FFFFFF" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '15px',
              marginBottom: '6px',
            }}
          >
            {t('Nous utilisons des cookies', 'We use cookies')}
          </p>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>
            {t(
              'Ce site utilise des cookies strictement nécessaires à son fonctionnement (préférences de langue, session) ainsi que des cookies analytiques pour mesurer l\'audience. Conformément au RGPD, votre consentement est requis pour les cookies non essentiels.',
              'This site uses strictly necessary cookies (language preferences, session) and analytics cookies to measure audience. In accordance with GDPR, your consent is required for non-essential cookies.'
            )}
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            {(['Nécessaires', 'Analytiques'] as const).map((label, i) => (
              <span
                key={label}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '11px',
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  backgroundColor: i === 0 ? '#86efac' : '#fde68a',
                  flexShrink: 0,
                }} />
                {t(label, label === 'Nécessaires' ? 'Necessary' : 'Analytics')}
                {i === 0 && (
                  <span style={{ opacity: 0.6 }}>
                    {t('(toujours actifs)', '(always on)')}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
        <Link
          to="/confidentialite"
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.7)',
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
          }}
        >
          {t('Politique de confidentialité', 'Privacy policy')}
        </Link>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setConsent('refused')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.5)',
              color: '#FFFFFF',
              padding: '8px 16px',
              borderRadius: '6px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
            aria-label={t('Refuser les cookies', 'Refuse cookies')}
          >
            <X size={14} />
            {t('Refuser', 'Decline')}
          </button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setConsent('accepted')}
            style={{ backgroundColor: '#FAFAF8', color: '#1A5C1A', border: 'none' }}
          >
            {t('Accepter', 'Accept')}
          </Button>
        </div>
      </div>
    </div>
  )
}
