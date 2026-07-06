import { Link } from 'react-router-dom'
import { FagouLogo } from '../common/FagouLogo'
import { useLanguage } from '../../hooks/useLanguage'
import { useIsMobile } from '../../hooks/useIsMobile'
import { departments } from '../../data/departmentsData'
import { ROUTES, COMPANY_PHONE } from '../../constants'

export function Footer() {
  const { t, language } = useLanguage()
  const isMobile = useIsMobile()

  const houseLinks = [
    { label: t('Maison', 'House'), path: ROUTES.HOME },
    { label: t('À propos', 'About'), path: ROUTES.ABOUT },
    { label: 'Contact', path: ROUTES.CONTACT },
  ]

  const catalogLinks = departments.map((d) => ({
    label: language === 'fr' ? d.nameFr : d.nameEn,
    path: ROUTES.PRODUCTS,
  }))

  const capLinks = [
    { label: language === 'fr' ? 'Sourcing direct' : 'Direct sourcing', path: ROUTES.ABOUT },
    { label: language === 'fr' ? 'Consolidation export' : 'Export consolidation', path: ROUTES.ABOUT },
    { label: language === 'fr' ? 'Chambre froide' : 'Cold storage', path: ROUTES.COLD },

    { label: language === 'fr' ? 'Cotation 48 h' : 'Quote within 48 h', path: ROUTES.CONTACT },
  ]

  const legalLinks = [
    { label: t('Mentions légales', 'Legal notice'), path: ROUTES.LEGAL },
    { label: t('Conditions de vente', 'Terms of sale'), path: ROUTES.TERMS },
    { label: t('Politique de données', 'Data policy'), path: ROUTES.PRIVACY },
    { label: t('Politique de cookies', 'Cookie policy'), path: ROUTES.COOKIES },
  ]

  const cols = [
    { title: t('Maison', 'House'), links: houseLinks },
    { title: t('Catalogue', 'Catalogue'), links: catalogLinks },
    { title: t('Capacités', 'Capabilities'), links: capLinks },
    { title: t('Légal', 'Legal'), links: legalLinks },
  ]

  const px = isMobile ? 20 : 64

  return (
    <footer style={{ position: 'relative', background: '#0F3D14', color: '#fff' }}>
      {/* Animated gradient separator */}
      <div className="fg-gradient-separator" />

      {/* Subtle noise texture */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.015, backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.05) 0%, transparent 50%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', padding: `${isMobile ? 56 : 88}px ${px}px ${isMobile ? 32 : 40}px` }}>
        {/* Logo + tagline */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: isMobile ? 48 : 72 }}>
          <FagouLogo size={40} dark />
          <span
            className="fg-mono"
            style={{
              fontSize: 10,
              color: 'rgba(242,247,242,0.50)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              borderLeft: '1px solid rgba(242,247,242,0.15)',
              paddingLeft: 16,
              height: 28,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {t('Négoce agro-alimentaire, Bruxelles', 'Agro-food trading, Brussels')}
          </span>
        </div>

        {/* Link columns */}
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? 40 : 56, marginBottom: isMobile ? 48 : 64 }}>
          {cols.map((col) => (
            <div key={col.title}>
              <div
                className="fg-mono"
                style={{
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,247,242,0.40)',
                  marginBottom: 20,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span style={{ display: 'inline-block', width: 4, height: 4, borderRadius: '50%', background: '#2E8B2E', flexShrink: 0 }} />
                {col.title}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
                {col.links.map((link) => (
                  <li key={link.label + link.path}>
                    <Link to={link.path} className="fg-footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact info row */}
        <div style={{ display: 'flex', gap: isMobile ? 20 : 40, flexWrap: 'wrap', alignItems: 'center', paddingBottom: isMobile ? 32 : 40, borderBottom: '1px solid rgba(242,247,242,0.12)' }}>
          <a href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`} className="fg-footer-contact-link">
            {COMPANY_PHONE}
          </a>
          <a href="mailto:info@fagou.be" className="fg-footer-contact-link">
            info@fagou.be
          </a>
          {!isMobile && (
            <span className="fg-mono" style={{ fontSize: 10, color: 'rgba(242,247,242,0.25)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              Chaussée de Waterloo 198-200 · Rhode-Saint-Genèse
            </span>
          )}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 8, paddingTop: 24 }}>
          <div className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(242,247,242,0.45)', textTransform: 'uppercase' }}>
            © 2013 – {new Date().getFullYear()} Fagou SRL · Rhode-Saint-Genèse, Belgique
          </div>
          <div className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(242,247,242,0.30)', textTransform: 'uppercase' }}>
            TVA · BE 0542.382.824 · RPM Bruxelles
          </div>
        </div>
      </div>
    </footer>
  )
}
