import { useState, useRef } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import type { TurnstileInstance } from '@marsidev/react-turnstile'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useCatalogue } from '../hooks/useCatalogue'
import { CONTACT, INCOTERMS } from '../data/departmentsData'

const SUBMIT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-contact`
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
    const res = await fetch(SUBMIT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
    setSubmitting(false)
    turnstileRef.current?.reset()
    setCaptchaToken(null)
    if (!res.ok) {
      setError(t('Une erreur est survenue. Veuillez réessayer.', 'An error occurred. Please try again.'))
    } else {
      setSent(true)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', border: '1px solid #E5E7EB', borderRadius: 6,
    background: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1A1A1A',
    outline: 'none', transition: 'border-color 200ms ease',
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
    ['Tél. fixe', CONTACT.fixed],
    ['Web', CONTACT.website],
  ] as [string, string][]

  return (
    <div style={{ position: 'relative', backgroundColor: '#FAFAF8' }}>
      <Nav />

      {/* Sub-hero */}
      <section style={{ padding: '180px 64px 80px', borderBottom: '1px solid #E5E7EB' }}>
        <div className="fg-eyebrow" style={{ marginBottom: 56 }}>↗ 06 / 06 · Contact</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 64, alignItems: 'end' }}>
          <h1 className="fg-fr" style={{ fontSize: 'clamp(56px, 9vw, 128px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.92 }}>
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

      {/* 50/50 form + sidebar */}
      <section style={{ padding: '120px 64px', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 80, alignItems: 'start' }}>
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
                <h2 className="fg-fr" style={{ fontSize: 64, margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
                  {t("Demande", "Inquiry")}{' '}
                  <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t("d'inquiry.", 'request.')}</span>
                </h2>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                <div>
                  <label style={labelStyle}>↗ {t('Société', 'Company')} *</label>
                  <input style={inputStyle} value={form.company} onChange={(e) => upd('company', e.target.value)} required maxLength={200}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#2E8B2E' }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E5E7EB' }} />
                </div>
                <div>
                  <label style={labelStyle}>↗ {t('Pays', 'Country')} *</label>
                  <input style={inputStyle} value={form.country} onChange={(e) => upd('country', e.target.value)} required maxLength={100}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#2E8B2E' }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E5E7EB' }} />
                </div>
                <div>
                  <label style={labelStyle}>↗ Email *</label>
                  <input style={inputStyle} type="email" value={form.email} onChange={(e) => upd('email', e.target.value)} required maxLength={254}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#2E8B2E' }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E5E7EB' }} />
                </div>
                <div>
                  <label style={labelStyle}>↗ {t('Téléphone', 'Phone')}</label>
                  <input style={inputStyle} value={form.phone} onChange={(e) => upd('phone', e.target.value)} maxLength={30}
                    onFocus={(e) => { (e.target as HTMLInputElement).style.borderColor = '#2E8B2E' }}
                    onBlur={(e) => { (e.target as HTMLInputElement).style.borderColor = '#E5E7EB' }} />
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 24 }}>
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
                  onFocus={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#2E8B2E' }}
                  onBlur={(e) => { (e.target as HTMLTextAreaElement).style.borderColor = '#E5E7EB' }}
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
            {/* Map placeholder */}
            <div style={{ position: 'relative', background: '#F2F7F2', height: 240, marginBottom: 28, overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent 0 39px, #E5E7EB 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, #E5E7EB 39px 40px)' }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 12, height: 12, background: '#1A5C1A', borderRadius: '50%', boxShadow: '0 0 0 8px rgba(26,92,26,0.15)' }} />
                <span className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1A5C1A' }}>UCCLE · BRUXELLES</span>
              </div>
            </div>

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

      {/* Direct team */}
      <section style={{ padding: '120px 64px', background: '#fff', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ marginBottom: 56 }}>
          <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('En direct', 'Direct lines')}</div>
          <h2 className="fg-fr" style={{ fontSize: 64, margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
            {t('Trois lignes', 'Three direct')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('directes.', 'lines.')}</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {CONTACT.team.map((p, i) => (
            <div key={i} style={{ border: '1px solid #E5E7EB', background: '#fff', padding: 24 }}>
              {/* Photo placeholder */}
              <div style={{ width: '100%', aspectRatio: '4 / 3', background: '#EEF2EE', position: 'relative', overflow: 'hidden', marginBottom: 18 }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 7px, rgba(15,61,20,0.08) 7px 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(15,61,20,0.55)', textAlign: 'center' }}>
                    {(language === 'fr' ? p.roleFr : p.roleEn).toLowerCase()} · portrait
                  </span>
                </div>
              </div>
              <span className="fg-mono" style={{ fontSize: 10, color: '#1A5C1A', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                ↗ {language === 'fr' ? p.roleFr : p.roleEn}
              </span>
              <div className="fg-fr" style={{ fontSize: 24, marginTop: 8, fontWeight: 400, letterSpacing: '-0.02em' }}>{p.name}</div>
              <div className="fg-mono" style={{ fontSize: 11, color: '#6B7280', marginTop: 6, letterSpacing: '0.04em' }}>{p.email}</div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          #contact-hero { padding: 120px 24px 48px !important; grid-template-columns: 1fr !important; gap: 24px !important; }
          #contact-main { padding: 64px 24px !important; grid-template-columns: 1fr !important; gap: 48px !important; }
          #contact-form-grid { grid-template-columns: 1fr !important; }
          #contact-direct { padding: 64px 24px !important; grid-template-columns: 1fr !important; }
          #contact-direct h2 { font-size: 40px !important; }
        }
      `}</style>
    </div>
  )
}
