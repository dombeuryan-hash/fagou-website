import { useState } from 'react'
import { NavLink, Outlet, Navigate, Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  Users,
  ImageIcon,
  PanelLeftClose,
  PanelLeftOpen,
  LogOut,
  Globe,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants'

interface AdminNavItem {
  label: string
  path: string
  icon: React.ReactNode
}

const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: 'Dashboard',    path: ROUTES.ADMIN,           icon: <LayoutDashboard size={17} /> },
  { label: 'Produits',     path: ROUTES.ADMIN_PRODUCTS,  icon: <Package         size={17} /> },
  { label: 'Commandes',    path: ROUTES.ADMIN_ORDERS,    icon: <ShoppingCart    size={17} /> },
  { label: 'Messages',     path: ROUTES.ADMIN_MESSAGES,  icon: <MessageSquare   size={17} /> },
  { label: 'Utilisateurs', path: ROUTES.ADMIN_USERS,     icon: <Users           size={17} /> },
  { label: 'Pages',        path: ROUTES.ADMIN_PAGES,     icon: <ImageIcon       size={17} /> },
]

export function AdminLayout() {
  const { isAuthenticated, loading, user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>
      <div style={{ width: 36, height: 36, border: '2px solid #E5E7EB', borderTopColor: '#1A5C1A', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )

  if (!isAuthenticated) return <Navigate to={ROUTES.ADMIN_LOGIN} replace />

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-bg)' }}>

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside style={{
        width: collapsed ? '64px' : '232px',
        backgroundColor: 'var(--color-admin-navy)',
        transition: 'width var(--transition-normal)',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflow: 'hidden',
      }}>

        {/* Logo */}
        <div style={{
          minHeight: '68px',
          display: 'flex',
          alignItems: 'center',
          padding: collapsed ? '0 16px' : '0 20px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          gap: '12px',
          flexShrink: 0,
        }}>
          <img
            src="/assets/logo-fagou-light.png"
            alt="FAGOU SRL"
            style={{
              height: collapsed ? '28px' : '32px',
              width: collapsed ? '28px' : 'auto',
              objectFit: 'contain',
              objectPosition: 'left',
              flexShrink: 0,
              transition: 'height var(--transition-fast)',
            }}
          />
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <p className="fg-mono" style={{
                fontSize: '9px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.38)',
                whiteSpace: 'nowrap',
              }}>
                Administration
              </p>
            </div>
          )}
        </div>

        {/* Nav section label */}
        {!collapsed && (
          <p className="fg-mono" style={{
            fontSize: '9px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            padding: '20px 20px 8px',
          }}>
            Navigation
          </p>
        )}

        {/* Nav links */}
        <nav style={{ flex: 1, padding: collapsed ? '16px 8px' : '4px 10px' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {ADMIN_NAV_ITEMS.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === ROUTES.ADMIN}
                  title={collapsed ? item.label : undefined}
                  style={({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: collapsed ? '10px 14px' : '9px 12px',
                    borderRadius: 'var(--radius-sm)',
                    color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.12)' : 'transparent',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    transition: 'all var(--transition-fast)',
                    borderLeft: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                  })}
                >
                  <span style={{ flexShrink: 0, opacity: 1 }}>{item.icon}</span>
                  {!collapsed && item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer sidebar */}
        {!collapsed && (
          <p className="fg-mono" style={{
            fontSize: '9px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.28)',
            padding: '0 20px 8px',
          }}>
            Général
          </p>
        )}
        <div style={{
          padding: collapsed ? '12px 8px' : '4px 10px 16px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          marginTop: collapsed ? 'auto' : '0',
        }}>
          <Link
            to={ROUTES.HOME}
            title={collapsed ? 'Voir le site' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: collapsed ? '10px 14px' : '9px 12px',
              borderRadius: 'var(--radius-sm)',
              color: 'rgba(255,255,255,0.45)',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              transition: 'color var(--transition-fast)',
            }}
          >
            <Globe size={17} style={{ flexShrink: 0 }} />
            {!collapsed && 'Voir le site'}
          </Link>
          <button
            onClick={() => logout()}
            title={collapsed ? 'Déconnexion' : undefined}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: collapsed ? '10px 14px' : '9px 12px',
              borderRadius: 'var(--radius-sm)',
              color: 'rgba(255,255,255,0.45)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              textAlign: 'left',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              width: '100%',
              transition: 'color var(--transition-fast)',
            }}
          >
            <LogOut size={17} style={{ flexShrink: 0 }} />
            {!collapsed && 'Déconnexion'}
          </button>
        </div>
      </aside>

      {/* ── Zone principale ──────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

        {/* Header */}
        <header style={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid var(--color-border)',
          padding: '0 28px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
          boxShadow: 'var(--shadow-soft)',
        }}>
          <button
            onClick={() => setCollapsed((v) => !v)}
            aria-label={collapsed ? 'Développer' : 'Réduire'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '34px',
              height: '34px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-gray)',
              backgroundColor: 'transparent',
              transition: 'background-color var(--transition-fast)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-bg)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
          </button>

          {/* User badge */}
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '13px',
                  color: 'var(--color-text)',
                }}>
                  {user.name}
                </p>
                <p className="fg-mono" style={{
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-gray)',
                }}>
                  {user.role}
                </p>
              </div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-admin-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{
                  fontFamily: 'var(--font-title)',
                  fontWeight: 800,
                  fontSize: '14px',
                  color: '#FFFFFF',
                }}>
                  {user.name[0]}
                </span>
              </div>
            </div>
          )}
        </header>

        {/* Contenu */}
        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
