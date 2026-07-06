import { useState, useRef } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { useCatalogue } from '../hooks/useCatalogue'
import { CONTACT, INCOTERMS } from '../data/departmentsData'

const SUBMIT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string

type FormState = {
  company: string
  country: string
  email: string
  phone: string
  interests: Record<string, boolean>
  volume: string
  incoterm: string
  message: string
}

export default function Contact() {
  const { t, language } = useLanguage()
  const { departments } = useCatalogue()
  const isMobile = useIsMobile()

  const volumeOptions = language === 'fr'
    ? ["Moins d'un conteneur", "1 conteneur 20'", "1 conteneur 40'", "Plusieurs conteneurs / mois", "À discuter"]
    : ["Less than one container", "1 × 20' container", "1 × 40' container", "Several containers / month", "To be discussed"]

  const [form, setForm] = useState<FormState>({
    company: '', country: '', email: '', phone: '',
    interests: {}, volume: volumeOptions[0],
    incoterm: 'FOB', message: '',
  })
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const turnstileRef = useRef<TurnstileInstance>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const upd = (k: keyof FormState, v: string) => setForm((f) => ({ ...f, [k]: v }))
  const toggleInterest = (id: string) =>
    setForm((f) => ({ ...f, interests: { ...f.interests, [id]: !f.interests[id] } }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!captchaToken) {
      setError(t('Veuillez compléter le CAPTCHA.', 'Please complete the CAPTCHA.'))
      return
    }
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch(SUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` },
        body: JSON.stringify({
          turnstileToken: captchaToken,
          name: form.company,
          country: form.country,
          email: form.email,
          phone: form.phone || null,
          interests: Object.keys(form.interests).filter((k) => form.interests[k]),
          volume: form.volume,
          incoterm: form.incoterm,
          message: form.message || null,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        console.error('submit-contact error:', res.status, body)
        setError(t('Une erreur est survenue. Veuillez réessayer.', 'An error occurred. Please try again.'))
      } else {
        setSent(true)
      }
    } catch (err) {
      console.error('submit-contact fetch failed:', err)
      setError(t('Une erreur est survenue. Veuillez réessayer.', 'An error occurred. Please try again.'))
    } finally {
      setSubmitting(false)
      turnstileRef.current?.reset()
      setCaptchaToken(null)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', border: '1px solid #E5E7EB', borderRadius: 8,
    background: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1A1A1A',
    outline: 'none', transition: 'border-color 300ms ease, box-shadow 300ms ease', boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: '#6B7280', marginBottom: 6, display: 'block', fontWeight: 500,
  }

  const sidebarRows = [
    [t('Siège social', 'Head office'), CONTACT.addressLines.join(' · ')],
    [t('Horaires', 'Hours'), language === 'fr' ? CONTACT.hoursFr : CONTACT.hoursEn],
    ['Email', CONTACT.emails.join(' · ')],
    ['Tél.', CONTACT.mobile.join(' · ')],
    ['Web', CONTACT.website],
  ] as [string, string][]

  const px = isMobile ? 20 : 64

  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--color-bg)' }}>
      <Nav />

      {/* Sub-hero */}
      <section style={{ padding: `${isMobile ? 100 : 180}px ${px}px ${isMobile ? 48 : 80}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div className="fg-eyebrow" style={{ marginBottom: isMobile ? 32 : 56 }}>↗ 06 / 06 · Contact</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 24 : 64, alignItems: 'end' }}>
          <h1 className="fg-fr" style={{ fontSize: 'clamp(48px, 9vw, 128px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.92 }}>
            {t('Parler', 'Talk')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('à Fagou.', 'to Fagou.')}</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: '#6B7280', margin: 0, maxWidth: 420 }}>
            {t(
              "Décrivez votre besoin — département, volume estimé, destination, incoterm. Nous revenons avec une cotation et un planning d'expédition sous 48 heures.",
              "Describe your need — department, estimated volume, destination, incoterm. We come back with a quote and a shipping window within 48 hours."
            )}
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section style={{ padding: `${isMobile ? 48 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
          {/* FORM */}
          {sent ? (
            <div style={{ padding: '64px 0' }}>
              <div className="fg-eyebrow" style={{ marginBottom: 24 }}>✓ {t('Envoyé', 'Sent')}</div>
              <h2 className="fg-fr" style={{ fontSize: 56, margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
                {t('Merci.', 'Thank you.')}
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.6, color: '#6B7280', marginTop: 24 }}>
                {t('Nous vous répondrons sous 48 heures.', 'We will reply within 48 hours.')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 40 }}>
                <h2 className="fg-fr" style={{ fontSize: isMobile ? 48 : 64, margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
                  {t("Demande", "Inquiry")}{' '}
                  <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t("d'inquiry.", 'request.')}</span>
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
                <div>
                  <label style={labelStyle}>↗ {t('Société', 'Company')} *</label>
                  <input style={inputStyle} value={form.company} onChange={(e) => upd('company', e.target.value)} required maxLength={200}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#1A5C1A'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E5E7EB'; (e.target as HTMLInputElement).style.boxShadow = 'none' }} />
                </div>
                <div>
                  <label style={labelStyle}>↗ {t('Pays', 'Country')} *</label>
                  <input style={inputStyle} value={form.country} onChange={(e) => upd('country', e.target.value)} required maxLength={100}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#1A5C1A'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E5E7EB'; (e.target as HTMLInputElement).style.boxShadow = 'none' }} />
                </div>
                <div>
                  <label style={labelStyle}>↗ Email *</label>
                  <input style={inputStyle} type="email" value={form.email} onChange={(e) => upd('email', e.target.value)} required maxLength={254}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#1A5C1A'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E5E7EB'; (e.target as HTMLInputElement).style.boxShadow = 'none' }} />
                </div>
                <div>
                  <label style={labelStyle}>↗ {t('Téléphone', 'Phone')}</label>
                  <input style={inputStyle} value={form.phone} onChange={(e) => upd('phone', e.target.value)} maxLength={30}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#1A5C1A'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E5E7EB'; (e.target as HTMLInputElement).style.boxShadow = 'none' }} />
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <label style={labelStyle}>↗ {t("Départements d'intérêt", 'Departments of interest')}</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 8 }}>
                  {departments.map((d) => {
                    const on = !!form.interests[d.id]
                    return (
                      <button
                        type="button"
                        key={d.id}
                        onClick={() => toggleInterest(d.id)}
                        className="fg-mono"
                        style={{ padding: '10px 14px', borderRadius: 999, border: `1px solid ${on ? '#1A5C1A' : '#E5E7EB'}`, background: on ? '#1A5C1A' : '#fff', color: on ? '#fff' : '#1A1A1A', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 200ms' }}
                      >
                        {language === 'fr' ? d.nameFr : d.nameEn}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18, marginTop: 24 }}>
                <div>
                  <label style={labelStyle}>↗ {t('Volume estimé', 'Estimated volume')}</label>
                  <select
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={form.volume}
                    onChange={(e) => upd('volume', e.target.value)}
                  >
                    {volumeOptions.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>↗ Incoterm</label>
                  <select
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={form.incoterm}
                    onChange={(e) => upd('incoterm', e.target.value)}
                  >
                    {INCOTERMS.map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <label style={labelStyle}>↗ Message</label>
                <textarea
                  style={{ ...inputStyle, resize: 'vertical', height: 120 }}
                  value={form.message}
                  maxLength={3000}
                  onChange={(e) => upd('message', e.target.value)}
                  onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#1A5C1A'; (e.target as HTMLTextAreaElement).style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                  onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#E5E7EB'; (e.target as HTMLTextAreaElement).style.boxShadow = 'none' }}
                />
              </div>

              <div style={{ marginTop: 24 }}>
                <Turnstile
                  ref={turnstileRef}
                  siteKey={TURNSTILE_SITE_KEY}
                  onSuccess={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken(null)}
                  onError={() => setCaptchaToken(null)}
                  options={{ theme: 'light', language: language === 'fr' ? 'fr' : 'en' }}
                />
              </div>

              {error && (
                <div style={{ marginTop: 16, padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#C0392B' }}>
                  {error}
                </div>
              )}
              <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <button type="submit" className="btn-primary" disabled={submitting} style={{ opacity: submitting ? 0.6 : 1, cursor: submitting ? 'not-allowed' : 'pointer' }}>
                  {submitting ? t('Envoi…', 'Sending…') : <>{t('Envoyer la demande', 'Send the request')} →</>}
                </button>
                <span className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  {t('Requis : société, pays, email.', 'Required: company, country, email.')}
                </span>
              </div>
            </form>
          )}

          {/* SIDEBAR */}
          <aside>
            {/* ── Head-office locator — stylised animated mini-map ── */}
            <style>{`
              @keyframes fgPing  { 0% { transform: scale(.3); opacity: .5; } 75% { opacity: 0; } 100% { transform: scale(1); opacity: 0; } }
              @keyframes fgRoad  { to { stroke-dashoffset: 0; } }
              @keyframes fgHover { 0%,100% { transform: translate(-50%,0); } 50% { transform: translate(-50%,-4px); } }
              .fg-mappanel { display:block; position:relative; height:300px; margin-bottom:28px; overflow:hidden;
                border-radius:12px; border:1px solid #E5E7EB; background:#EDF3EA; text-decoration:none;
                transition: box-shadow .5s cubic-bezier(.22,1,.36,1), transform .5s cubic-bezier(.22,1,.36,1); }
              .fg-mappanel:hover { transform: translateY(-3px); box-shadow: 0 24px 56px rgba(15,61,20,.14); }
              .fg-mappanel .fg-map-arr { display:inline-block; transition: transform .4s cubic-bezier(.22,1,.36,1); }
              .fg-mappanel:hover .fg-map-arr { transform: translateX(4px); }
              .fg-map-ring { position:absolute; inset:0; border-radius:999px; border:1.5px solid #1A5C1A;
                animation: fgPing 2.8s cubic-bezier(.16,1,.3,1) infinite; }
              .fg-map-road { stroke-dasharray: 620; stroke-dashoffset: 620; animation: fgRoad 2.2s cubic-bezier(.22,1,.36,1) .3s forwards; }
              @media (prefers-reduced-motion: reduce) {
                .fg-map-ring { animation: none; opacity: 0; }
                .fg-map-road { stroke-dashoffset: 0; animation: none; }
                .fg-map-tag  { animation: none !important; }
              }
            `}</style>
            <a
              className="fg-mappanel"
              href="https://www.google.com/maps/search/?api=1&query=Chauss%C3%A9e+de+Waterloo+198-200%2C+1640+Rhode-Saint-Gen%C3%A8se%2C+Belgique"
              target="_blank" rel="noreferrer"
              aria-label={t("Ouvrir l'itinéraire vers notre siège social", 'Open directions to our head office')}
            >
              {/* cartographic grid */}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 39px, rgba(26,92,26,.07) 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, rgba(26,92,26,.07) 39px 40px)' }} />
              {/* roads + forest */}
              <svg viewBox="0 0 420 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
                <defs>
                  <path id="fg-waterloo" d="M -20 262 C 90 214, 175 168, 248 126 S 396 38, 450 10" />
                </defs>
                {/* Forêt de Soignes */}
                <path d="M 322 310 C 306 224, 344 168, 430 148 L 450 320 Z" fill="rgba(26,92,26,.10)" />
                <text x="358" y="242" fontFamily="'JetBrains Mono', monospace" fontSize="7.5" letterSpacing="1.5" fill="rgba(26,92,26,.42)" transform="rotate(-12 358 242)">FORÊT DE SOIGNES</text>
                {/* secondary streets */}
                <path d="M 40 -10 C 78 90, 60 190, 118 310" fill="none" stroke="#fff" strokeWidth="5" opacity=".8" />
                <path d="M -10 96 C 120 118, 250 96, 430 148" fill="none" stroke="#fff" strokeWidth="5" opacity=".8" />
                {/* Chaussée de Waterloo — casing, animated centreline, label on the curve */}
                <use href="#fg-waterloo" fill="none" stroke="#fff" strokeWidth="13" />
                <use href="#fg-waterloo" className="fg-map-road" fill="none" stroke="rgba(26,92,26,.38)" strokeWidth="1.6" strokeDasharray="7 6" />
                <text fontFamily="'JetBrains Mono', monospace" fontSize="8" letterSpacing="2.5" fill="rgba(26,92,26,.6)">
                  <textPath href="#fg-waterloo" startOffset="9%">CHAUSSÉE DE WATERLOO</textPath>
                </text>
              </svg>
              {/* coordinates chip */}
              <span className="fg-mono" style={{ position: 'absolute', top: 12, right: 14, fontSize: 9, letterSpacing: '.14em', color: 'rgba(26,92,26,.55)' }}>
                50.75° N · 4.36° E
              </span>
              <span className="fg-mono" style={{ position: 'absolute', top: 12, left: 14, fontSize: 9, letterSpacing: '.14em', color: 'rgba(26,92,26,.55)' }}>
                N ↑
              </span>
              {/* pin + radar pulse, on the chaussée */}
              <div style={{ position: 'absolute', left: '59%', top: '42%', width: 64, height: 64, transform: 'translate(-50%,-50%)' }}>
                <div className="fg-map-ring" />
                <div className="fg-map-ring" style={{ animationDelay: '.95s' }} />
                <div className="fg-map-ring" style={{ animationDelay: '1.9s' }} />
                <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 14, height: 14, borderRadius: 999, background: '#1A5C1A', border: '2.5px solid #fff', boxShadow: '0 4px 12px rgba(15,61,20,.35)' }} />
                <span className="fg-mono fg-map-tag" style={{ position: 'absolute', left: '50%', bottom: 'calc(100% - 8px)', transform: 'translateX(-50%)', animation: 'fgHover 3.4s ease-in-out infinite', background: '#0F3D14', color: '#fff', fontSize: 8.5, letterSpacing: '.16em', padding: '5px 9px', borderRadius: 999, whiteSpace: 'nowrap' }}>
                  FAGOU SRL
                </span>
              </div>
              {/* address plaque */}
              <div style={{ position: 'absolute', left: 12, right: 12, bottom: 12, background: 'rgba(255,255,255,.94)', backdropFilter: 'blur(4px)', border: '1px solid #E5E7EB', borderRadius: 10, padding: '13px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div className="fg-mono" style={{ fontSize: 9, letterSpacing: '.16em', textTransform: 'uppercase', color: '#1A5C1A', marginBottom: 5 }}>
                    ↗ {t('Siège social', 'Head office')}
                  </div>
                  <div style={{ fontSize: 13.5, lineHeight: 1.45, color: '#1A1A1A' }}>
                    Chaussée de Waterloo 198-200<br />1640 Rhode-Saint-Genèse · Belgique
                  </div>
                </div>
                <span className="fg-mono" style={{ fontSize: 10, letterSpacing: '.14em', textTransform: 'uppercase', color: '#1A5C1A', whiteSpace: 'nowrap' }}>
                  {t('Itinéraire', 'Directions')} <span className="fg-map-arr">→</span>
                </span>
              </div>
            </a>

            <div style={{ borderTop: '1px solid #E5E7EB' }}>
              {sidebarRows.map(([k, v]) => (
                <div key={k} style={{ padding: '20px 0', borderBottom: '1px solid #E5E7EB' }}>
                  <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 8 }}>↗ {k}</div>
                  <div style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.5, wordBreak: 'break-word' }}>{v}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>


    </div>
  )
}
