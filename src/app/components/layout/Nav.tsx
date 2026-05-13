import { useState } from 'react'
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
  { labelFr: 'Chambre froide', labelEn: 'Cold storage', path: ROUTES.COLD },
  { labelFr: 'À propos', labelEn: 'About', path: ROUTES.ABOUT },
  { labelFr: 'Conditions', labelEn: 'Terms', path: ROUTES.TERMS },
  { labelFr: 'Contact', labelEn: 'Contact', path: ROUTES.CONTACT },
]

export function Nav({ dark = false }: NavProps) {
  const { t, language, toggleLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const fg = dark ? '#fff' : '#1A1A1A'
  const muted = dark ? 'rgba(255,255,255,0.55)' : '#6B7280'
  const borderC = dark ? 'rgba(255,255,255,0.12)' : '#E5E7EB'
  const activeFg = dark ? '#fff' : '#1A5C1A'
  const mutedFg = dark ? 'rgba(255,255,255,0.7)' : '#1A1A1A'

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      {/* Desktop nav */}
      <div
        className="fg-desktop-only"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          zIndex: 20,
          padding: '24px 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${borderC}`,
        }}
      >
        <Link
          to={ROUTES.HOME}
          style={{ display: 'flex', alignItems: 'center', gap: 14, textDecoration: 'none' }}
        >
          <FagouLogo size={40} dark={dark} />
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
            }}
          >
            SPRL · Bruxelles
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path)
            return (
              <Link
                key={item.path}
                to={item.path}
                className="fg-mono"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: active ? activeFg : mutedFg,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  borderBottom: active
                    ? `1px solid ${dark ? '#fff' : '#1A5C1A'}`
                    : '1px solid transparent',
                  paddingBottom: 4,
                  transition: 'color 200ms ease',
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
          position: 'absolute',
          top: 0, left: 0, right: 0,
          zIndex: 20,
          padding: '18px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${borderC}`,
          background: dark ? '#0F3D14' : 'transparent',
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
                  transition: 'transform 200ms',
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

      {open && (
        <div
          className="fg-mobile-only"
          style={{
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            zIndex: 19,
            background: dark ? '#0F3D14' : '#FAFAF8',
            padding: '20px',
            borderBottom: `1px solid ${borderC}`,
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
      )}
    </>
  )
}
