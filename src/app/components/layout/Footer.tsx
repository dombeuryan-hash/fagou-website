import { Link } from 'react-router-dom'
import { FagouLogo } from '../common/FagouLogo'
import { useLanguage } from '../../hooks/useLanguage'
import { useIsMobile } from '../../hooks/useIsMobile'
import { departments } from '../../data/departmentsData'
import { ROUTES } from '../../constants'

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
    { label: language === 'fr' ? 'Formalités douanières' : 'Customs formalities', path: ROUTES.ABOUT },
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

  const linkStyle = {
    fontFamily: 'Fraunces, Georgia, serif',
    fontSize: isMobile ? 16 : 18,
    color: 'rgba(255,255,255,0.92)',
    fontWeight: 400,
    letterSpacing: '-0.02em',
    lineHeight: 1.3,
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'color 200ms ease',
  } as const

  const px = isMobile ? 20 : 64

  return (
    <footer style={{ background: '#0F3D14', color: '#fff', padding: `${isMobile ? 56 : 88}px ${px}px ${isMobile ? 32 : 40}px` }}>
      {/* Logo + tagline */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: isMobile ? 48 : 72 }}>
        <FagouLogo size={36} dark />
        <span
          className="fg-mono"
          style={{
            fontSize: 10,
            color: 'rgba(242,247,242,0.55)',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            borderLeft: '1px solid rgba(242,247,242,0.18)',
            paddingLeft: 16,
            height: 28,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {t('Négoce agro-alimentaire, Bruxelles', 'Agri-food trading, Brussels')}
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
                color: 'rgba(242,247,242,0.5)',
                marginBottom: 18,
                fontWeight: 500,
              }}
            >
              ↗ {col.title}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map((link) => (
                <li key={link.label + link.path}>
                  <Link
                    to={link.path}
                    style={linkStyle}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#fff' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.92)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ height: 1, background: 'rgba(242,247,242,0.18)', marginBottom: 24 }} />
      <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: 8 }}>
        <div className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(242,247,242,0.6)', textTransform: 'uppercase' }}>
          © 2013 – {new Date().getFullYear()} Fagou SPRL · Chaussée d'Alsemberg 842, 1180 Uccle, Belgique
        </div>
        <div className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(242,247,242,0.5)', textTransform: 'uppercase' }}>
          TVA · BE [n° à confirmer] · RPM Bruxelles
        </div>
      </div>
    </footer>
  )
}
