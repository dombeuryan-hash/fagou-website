import { useState, useEffect, useRef } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Mail, Eye, EyeOff, ArrowRight, Lock } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES, COMPANY_ADDRESS } from '../../constants'
import { FagouLogo } from '../../components/common/FagouLogo'

const MAX_ATTEMPTS = 5
const COOLDOWN_SECONDS = 300

export default function AdminLogin() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null)
  const [secondsLeft, setSecondsLeft] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!cooldownUntil) return
    function tick() {
      const remaining = Math.ceil((cooldownUntil! - Date.now()) / 1000)
      if (remaining <= 0) {
        setSecondsLeft(0)
        setCooldownUntil(null)
        setAttempts(0)
        if (timerRef.current) clearInterval(timerRef.current)
      } else {
        setSecondsLeft(remaining)
      }
    }
    tick()
    timerRef.current = setInterval(tick, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [cooldownUntil])

  if (isAuthenticated) return <Navigate to={ROUTES.ADMIN} replace />

  const isCoolingDown = cooldownUntil !== null && Date.now() < cooldownUntil

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isCoolingDown) return
    setError('')
    setLoading(true)
    const err = await login(email, password)
    if (err) {
      const next = attempts + 1
      setAttempts(next)
      if (next >= MAX_ATTEMPTS) {
        setCooldownUntil(Date.now() + COOLDOWN_SECONDS * 1000)
        setError(`Trop de tentatives. Accès bloqué pendant ${COOLDOWN_SECONDS / 60} minutes.`)
      } else {
        setError(`${err} (${next}/${MAX_ATTEMPTS} tentatives)`)
      }
      setLoading(false)
    } else {
      navigate(ROUTES.ADMIN, { replace: true })
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* ── Panneau gauche ──────────────────────────────────────── */}
      <div
        className="fg-desktop-only"
        style={{
          flex: 1,
          backgroundColor: 'var(--color-admin-navy)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grille décorative */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        {/* Cercle accent */}
        <div style={{
          position: 'absolute', width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(26,92,26,0.18) 0%, transparent 70%)',
          bottom: '-80px', right: '-80px', pointerEvents: 'none',
        }} />

        {/* Logo */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <FagouLogo size={30} dark={true} />
        </div>

        {/* Contenu éditorial */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="fg-eyebrow dark" style={{ display: 'block', marginBottom: '28px' }}>
            Back-office Administration
          </span>

          <h1
            className="fg-fr"
            style={{
              fontSize: 'clamp(42px, 4vw, 58px)',
              color: '#FFFFFF',
              marginBottom: '24px',
            }}
          >
            Gérez votre<br />activité d'export
          </h1>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '15px',
            color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.75,
            maxWidth: '360px',
          }}>
            Catalogue produits, suivi des commandes, messages clients et gestion des utilisateurs — tout depuis un seul tableau de bord.
          </p>

          {/* Séparateur */}
          <div style={{ width: '48px', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)', margin: '36px 0' }} />

          {/* Stats */}
          <div style={{ display: 'flex', gap: '40px' }}>
            {[
              { value: '22+', label: 'Produits' },
              { value: '9', label: 'Catégories' },
              { value: '13+', label: "Ans d'exp." },
            ].map((s) => (
              <div key={s.label}>
                <p className="fg-fr" style={{ fontSize: '34px', color: '#FFFFFF', lineHeight: 1 }}>{s.value}</p>
                <p className="fg-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', marginTop: '6px', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p className="fg-mono" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.1em' }}>
            © {new Date().getFullYear()} FAGOU SRL — {COMPANY_ADDRESS}
          </p>
        </div>
      </div>

      {/* ── Panneau droit (formulaire) ───────────────────────────── */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '48px 40px',
      }}>

        {/* Logo mobile */}
        <div className="fg-mobile-only" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
          <FagouLogo size={26} />
        </div>

        {/* En-tête formulaire */}
        <div style={{ marginBottom: '40px' }}>
          <span className="fg-eyebrow" style={{ display: 'block', marginBottom: '14px' }}>
            Connexion sécurisée
          </span>
          <h2 style={{
            fontFamily: 'var(--font-title)',
            fontWeight: 800,
            fontSize: '30px',
            color: 'var(--color-text)',
            letterSpacing: '-0.02em',
            marginBottom: '8px',
          }}>
            Accès Back-office
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-gray)' }}>
            Entrez vos identifiants pour accéder au tableau de bord FAGOU SRL.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Email */}
          <div>
            <label className="fg-mono" style={{
              display: 'block',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              marginBottom: '8px',
            }}>
              Adresse email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} color="var(--color-gray)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="admin@fagou.be"
                required
                autoComplete="email"
                style={{
                  width: '100%',
                  padding: '13px 14px 13px 42px',
                  border: `1px solid ${error ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color var(--transition-fast)',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-admin-navy)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = error ? 'var(--color-accent)' : 'var(--color-border)')}
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="fg-mono" style={{
              display: 'block',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-text)',
              marginBottom: '8px',
            }}>
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} color="var(--color-gray)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '13px 44px 13px 42px',
                  border: `1px solid ${error ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  color: 'var(--color-text)',
                  backgroundColor: '#FFFFFF',
                  outline: 'none',
                  transition: 'border-color var(--transition-fast)',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--color-admin-navy)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = error ? 'var(--color-accent)' : 'var(--color-border)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray)', padding: '4px' }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Erreur */}
          {error && (
            <div style={{
              backgroundColor: '#FEF2F2',
              border: '1px solid #FECACA',
              borderRadius: 'var(--radius-sm)',
              padding: '11px 16px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--color-accent)',
            }}>
              {error}
            </div>
          )}

          {/* Bouton connexion */}
          <button
            type="submit"
            disabled={loading || isCoolingDown}
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              backgroundColor: (loading || isCoolingDown) ? 'var(--color-gray)' : 'var(--color-admin-navy)',
              borderRadius: 'var(--radius-md)',
              padding: '14px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: (loading || isCoolingDown) ? 'not-allowed' : 'pointer',
              transition: 'background-color var(--transition-fast)',
            }}
            onMouseEnter={(e) => { if (!loading && !isCoolingDown) e.currentTarget.style.backgroundColor = 'var(--color-admin-navy-dark)' }}
            onMouseLeave={(e) => { if (!loading && !isCoolingDown) e.currentTarget.style.backgroundColor = (loading || isCoolingDown) ? 'var(--color-gray)' : 'var(--color-admin-navy)' }}
          >
            {isCoolingDown
              ? `Réessayer dans ${secondsLeft}s`
              : loading
                ? 'Connexion…'
                : (<>Se connecter <ArrowRight size={15} /></>)
            }
          </button>
        </form>

        <p className="fg-mono" style={{ marginTop: '28px', fontSize: '10px', letterSpacing: '0.08em', color: 'var(--color-border)', textAlign: 'center' }}>
          © {new Date().getFullYear()} FAGOU SRL — Bruxelles, Belgique
        </p>
      </div>
    </div>
  )
}
