import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Globe } from 'lucide-react'
import { FagouLogo } from '../common/FagouLogo'
import { useLanguage } from '../../hooks/useLanguage'
import { ROUTES } from '../../constants'

interface NavItem {
  labelFr: string
  labelEn: string
  path: string
}

const NAV_ITEMS: NavItem[] = [
  { labelFr: 'Accueil', labelEn: 'Home', path: ROUTES.HOME },
  { labelFr: 'Produits', labelEn: 'Products', path: ROUTES.PRODUCTS },
  { labelFr: 'FAGOU & Partenaires', labelEn: 'FAGOU & Partners', path: ROUTES.ENTERPRISES },
  { labelFr: 'B2B Fournisseurs', labelEn: 'B2B Suppliers', path: ROUTES.SUPPLIERS },
  { labelFr: 'À propos', labelEn: 'About', path: ROUTES.ABOUT },
  { labelFr: 'Actualités', labelEn: 'News', path: ROUTES.NEWS },
  { labelFr: 'Contact', labelEn: 'Contact', path: ROUTES.CONTACT },
]

export function Header() {
  const { t, language, toggleLanguage } = useLanguage()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <nav
          aria-label={t('Navigation principale', 'Main navigation')}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}
        >
          <NavLink to={ROUTES.HOME} aria-label="FAGOU SRL — Accueil">
            <FagouLogo size={40} />
          </NavLink>

          {/* Desktop nav */}
          <ul
            style={{ display: 'flex', alignItems: 'center', gap: '4px', listStyle: 'none', margin: 0, padding: 0 }}
            className="desktop-nav"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: isActive(item.path) ? 600 : 500,
                    fontSize: '14px',
                    color: isActive(item.path) ? '#1A5C1A' : '#1A1A1A',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    display: 'block',
                    borderBottom: isActive(item.path) ? '2px solid #1A5C1A' : '2px solid transparent',
                    transition: 'color 200ms ease',
                  }}
                >
                  {t(item.labelFr, item.labelEn)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={toggleLanguage}
              aria-label={t('Passer en anglais', 'Switch to French')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                border: '1px solid #E5E7EB',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '13px',
                color: '#1A1A1A',
                cursor: 'pointer',
                transition: 'border-color 200ms ease',
              }}
            >
              <Globe size={14} />
              {language.toUpperCase()}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={t('Ouvrir le menu', 'Open menu')}
              aria-expanded={isMobileMenuOpen}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                padding: '8px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                borderRadius: '6px',
              }}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid #E5E7EB',
            padding: '16px 24px 24px',
          }}
        >
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={closeMobileMenu}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: isActive(item.path) ? 600 : 500,
                    fontSize: '16px',
                    color: isActive(item.path) ? '#1A5C1A' : '#1A1A1A',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    display: 'block',
                    backgroundColor: isActive(item.path) ? '#F0F7F0' : 'transparent',
                  }}
                >
                  {t(item.labelFr, item.labelEn)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
