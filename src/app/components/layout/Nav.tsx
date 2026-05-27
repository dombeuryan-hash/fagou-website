import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FagouLogo } from '../common/FagouLogo'
import { useLanguage } from '../../hooks/useLanguage'
import { ROUTES } from '../../constants'

interface NavProps {
  dark?: boolean
}

const NAV_ITEMS = [
  { labelFr: 'Maison', labelEn: 'House', path: ROUTES.HOME },
  { labelFr: 'Catalogue', labelEn: 'Catalogue', path: ROUTES.PRODUCTS },
  { labelFr: 'Marques', labelEn: 'Brands', path: ROUTES.BRANDS },
  { labelFr: 'Chambre froide', labelEn: 'Cold storage', path: ROUTES.COLD },
  { labelFr: 'À propos', labelEn: 'About', path: ROUTES.ABOUT },
  { labelFr: 'Conditions', labelEn: 'Terms', path: ROUTES.TERMS },
  { labelFr: 'Contact', labelEn: 'Contact', path: ROUTES.CONTACT },
]

export function Nav({ dark = false }: NavProps) {
  const { t, language, toggleLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect -- closes menu on navigation
  useEffect(() => { setOpen(false) }, [location.pathname])

  const fg = dark ? '#fff' : '#1A1A1A'
  const muted = dark ? 'rgba(255,255,255,0.55)' : '#6B7280'
  const borderC = dark ? 'rgba(255,255,255,0.12)' : '#E5E7EB'
  const activeFg = dark ? '#fff' : '#1A5C1A'
  const mutedFg = dark ? 'rgba(255,255,255,0.7)' : '#1A1A1A'

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  const desktopBg = scrolled
    ? dark
      ? 'rgba(15, 61, 20, 0.88)'
      : 'rgba(250, 250, 248, 0.85)'
    : 'transparent'

  const desktopBlur = scrolled ? 'blur(16px) saturate(180%)' : 'none'

  return (
    <>
      {/* Desktop nav */}
      <div
        className="fg-desktop-only"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 20,
          padding: scrolled ? '16px 64px' : '24px 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${scrolled ? borderC : 'transparent'}`,
          background: desktopBg,
          backdropFilter: desktopBlur,
          WebkitBackdropFilter: desktopBlur,
          transition: 'all 400ms cubic-bezier(0.22, 1, 0.36, 1)',
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <Link
          to={ROUTES.HOME}
          style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}
        >
          <FagouLogo size={scrolled ? 34 : 40} dark={dark} />
          <span
            className="fg-mono"
            style={{
              fontSize: 10,
              color: muted,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              borderLeft: `1px solid ${borderC}`,
              paddingLeft: 14,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              transition: 'opacity 300ms ease',
              opacity: scrolled ? 0 : 1,
            }}
          >
            SRL · Bruxelles
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className="fg-mono fg-underline-reveal"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: active ? activeFg : mutedFg,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  paddingBottom: 4,
                  transition: 'color 250ms ease',
                  opacity: active ? 1 : 0.85,
                }}
              >
                {t(item.labelFr, item.labelEn)}
              </Link>
            )
          })}
        </nav>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={toggleLanguage}
            className="fg-mono"
            style={{
              background: 'transparent',
              border: `1px solid ${borderC}`,
              borderRadius: 999,
              padding: '7px 14px',
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: fg,
              cursor: 'pointer',
              fontWeight: 500,
              transition: 'all 250ms ease',
            }}
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          <Link
            to={ROUTES.CONTACT}
            className={dark ? 'btn-light' : 'btn-primary'}
            style={{ padding: '10px 18px', fontSize: 12 }}
          >
            {t('Demander une cotation', 'Request a quotation')}
          </Link>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className="fg-mobile-only"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 20,
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${open || scrolled ? borderC : 'transparent'}`,
          background: open
            ? (dark ? '#0F3D14' : '#FAFAF8')
            : scrolled
              ? (dark ? 'rgba(15, 61, 20, 0.92)' : 'rgba(250, 250, 248, 0.9)')
              : (dark ? 'transparent' : 'transparent'),
          backdropFilter: open || scrolled ? 'blur(16px) saturate(180%)' : 'none',
          WebkitBackdropFilter: open || scrolled ? 'blur(16px) saturate(180%)' : 'none',
          transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <Link to={ROUTES.HOME} style={{ textDecoration: 'none' }}>
          <FagouLogo size={32} dark={dark} />
        </Link>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <button
            onClick={toggleLanguage}
            className="fg-mono"
            style={{
              background: 'transparent',
              border: `1px solid ${borderC}`,
              borderRadius: 999,
              padding: '5px 10px',
              fontSize: 10,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: fg,
              cursor: 'pointer',
            }}
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="menu"
            aria-expanded={open}
            style={{
              background: 'transparent',
              border: 0,
              padding: 8,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 22,
                  height: 1.5,
                  background: fg,
                  display: 'block',
                  transition: 'all 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                  opacity: open && i === 1 ? 0 : 1,
                  transform:
                    open && i === 0
                      ? 'translateY(2.75px) rotate(45deg)'
                      : open && i === 2
                        ? 'translateY(-2.75px) rotate(-45deg)'
                        : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="fg-mobile-only"
        style={{
          position: 'fixed',
          top: 60,
          left: 0,
          right: 0,
          zIndex: 19,
          background: dark ? '#0F3D14' : '#FAFAF8',
          padding: open ? '20px' : '0 20px',
          borderBottom: open ? `1px solid ${borderC}` : 'none',
          maxHeight: open ? '80vh' : 0,
          overflow: 'hidden',
          transition: 'all 450ms cubic-bezier(0.22, 1, 0.36, 1)',
          opacity: open ? 1 : 0,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setOpen(false)}
            className="fg-mono"
            style={{
              display: 'block',
              padding: '14px 0',
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: isActive(item.path) ? activeFg : fg,
              textDecoration: 'none',
              borderBottom: `1px solid ${borderC}`,
              transition: 'color 250ms ease',
            }}
          >
            {t(item.labelFr, item.labelEn)}
          </Link>
        ))}
        <Link
          to={ROUTES.CONTACT}
          onClick={() => setOpen(false)}
          className="btn-primary"
          style={{ marginTop: 16, width: '100%', justifyContent: 'center' }}
        >
          {t('Demander une cotation', 'Request a quotation')}
        </Link>
      </div>
    </>
  )
}
