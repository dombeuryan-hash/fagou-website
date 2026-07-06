import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { ROUTES } from '../constants'
import type { SupplierApplication } from '../types'

export default function Suppliers() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<SupplierApplication>()
  const px = isMobile ? 20 : 64

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', border: '1px solid #E5E7EB', borderRadius: 8,
    background: '#fff', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#1A1A1A',
    outline: 'none', transition: 'border-color 300ms ease, box-shadow 300ms ease', boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.14em',
    textTransform: 'uppercase', color: '#6B7280', marginBottom: 8, display: 'block', fontWeight: 500,
  }

  function onSubmit(_data: SupplierApplication) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success(t('Votre candidature a été envoyée ! Nous vous contacterons sous 48h.', 'Your application has been sent! We will contact you within 48h.'))
        reset()
        resolve()
      }, 800)
    })
  }

  const advantages = [
    { n: '01', titleFr: 'Accès marchés africains', titleEn: 'Access to African markets', descFr: 'Distribuez vos produits dans nos marchés partenaires en Afrique centrale et occidentale.', descEn: 'Distribute your products in our partner markets in Central and West Africa.' },
    { n: '02', titleFr: 'Certifications reconnues', titleEn: 'Recognized certifications', descFr: 'Nous valorisons les fournisseurs certifiés CE, ISO, GlobalGAP, RSPO et autres standards.', descEn: 'We value suppliers certified CE, ISO, GlobalGAP, RSPO, and other standards.' },
    { n: '03', titleFr: 'Volumes B2B', titleEn: 'B2B volumes', descFr: 'Commandes en tonnes, palettes et conteneurs complets. Contrats annuels possibles.', descEn: 'Orders in tonnes, pallets, and full containers. Annual contracts possible.' },
    { n: '04', titleFr: 'Partenariat long terme', titleEn: 'Long-term partnership', descFr: "13+ ans d'expérience. Nous construisons des relations durables avec nos fournisseurs.", descEn: '13+ years of experience. We build lasting relationships with our suppliers.' },
  ]

  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--color-bg)' }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: `${isMobile ? 100 : 180}px ${px}px ${isMobile ? 56 : 88}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div className="fg-eyebrow" style={{ marginBottom: isMobile ? 32 : 56 }}>↗ B2B · {t('Fournisseurs', 'Suppliers')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 24 : 64, alignItems: 'end' }}>
          <h1 className="fg-fr" style={{ fontSize: 'clamp(48px, 9vw, 128px)', margin: 0, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.92 }}>
            {t('Devenir', 'Become a')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('fournisseur.', 'supplier.')}</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: '#6B7280', margin: 0, maxWidth: 420 }}>
            {t(
              "Vous êtes producteur ou fournisseur de produits agroalimentaires ? Rejoignez notre réseau et exportez vos produits vers l'Afrique et l'Europe.",
              'Are you a producer or supplier of agri-food products? Join our network and export your products to Africa and Europe.'
            )}
          </p>
        </div>
      </section>

      {/* Advantages */}
      <section style={{ padding: `${isMobile ? 56 : 96}px ${px}px`, background: 'transparent', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 0, borderTop: '1px solid #E5E7EB' }}>
          {advantages.map((a, i) => (
            <div
              key={a.n}
              style={{
                padding: isMobile ? '32px 0' : `40px ${i % 2 === 0 ? 40 : 0}px 40px ${i % 2 === 1 ? 40 : 0}px`,
                borderBottom: '1px solid #E5E7EB',
                borderRight: !isMobile && i % 2 === 0 ? '1px solid #E5E7EB' : 'none',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#F2F7F2', border: '1px solid rgba(26,92,26,0.15)',
                }}>
                  <span className="fg-mono" style={{ fontSize: 10, color: '#1A5C1A', fontWeight: 600, letterSpacing: '0.08em' }}>{a.n}</span>
                </span>
                <span style={{ flex: 1, height: 1, background: 'linear-gradient(to right, rgba(26,92,26,0.15), transparent)' }} />
              </div>
              <h3 className="fg-fr" style={{ fontSize: isMobile ? 28 : 36, margin: '0 0 14px', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                {t(a.titleFr, a.titleEn)}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: '#6B7280', margin: 0, maxWidth: 400 }}>
                {t(a.descFr, a.descEn)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 32 : 80, alignItems: 'start' }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Candidature', 'Application')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 5vw, 64px)', margin: '0 0 20px', fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Rejoindre', 'Join')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('le réseau.', 'the network.')}</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: '#6B7280', margin: 0, maxWidth: 360 }}>
              {t(
                "Remplissez le formulaire ci-contre. Notre équipe vous recontactera sous 48 heures pour discuter des opportunités.",
                "Fill out the form. Our team will get back to you within 48 hours to discuss opportunities."
              )}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: isMobile ? 24 : 40 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18 }}>
              <div>
                <label style={labelStyle}>↗ {t('Entreprise', 'Company')} *</label>
                <input
                  style={inputStyle}
                  {...register('company', { required: t('Requis', 'Required') })}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
                />
                {errors.company && <span style={{ fontSize: 12, color: '#C0392B', marginTop: 4, display: 'block' }}>{errors.company.message}</span>}
              </div>
              <div>
                <label style={labelStyle}>↗ {t('Pays', 'Country')} *</label>
                <input
                  style={inputStyle}
                  {...register('country', { required: t('Requis', 'Required') })}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
                />
                {errors.country && <span style={{ fontSize: 12, color: '#C0392B', marginTop: 4, display: 'block' }}>{errors.country.message}</span>}
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <label style={labelStyle}>↗ {t('Produits proposés', 'Products offered')} *</label>
              <input
                style={inputStyle}
                {...register('products', { required: t('Requis', 'Required') })}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
              />
              {errors.products && <span style={{ fontSize: 12, color: '#C0392B', marginTop: 4, display: 'block' }}>{errors.products.message}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18, marginTop: 18 }}>
              <div>
                <label style={labelStyle}>↗ {t('Certifications', 'Certifications')}</label>
                <input style={inputStyle} placeholder="CE, ISO 22000, GlobalGAP…" {...register('certifications')}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>
              <div>
                <label style={labelStyle}>↗ {t('Volume annuel estimé', 'Est. annual volume')}</label>
                <input style={inputStyle} placeholder={t('ex: 500 tonnes/an', 'e.g.: 500 tonnes/year')} {...register('annualVolume')}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 18, marginTop: 18 }}>
              <div>
                <label style={labelStyle}>↗ {t('Nom contact', 'Contact name')} *</label>
                <input
                  style={inputStyle}
                  {...register('contactName', { required: t('Requis', 'Required') })}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
                />
                {errors.contactName && <span style={{ fontSize: 12, color: '#C0392B', marginTop: 4, display: 'block' }}>{errors.contactName.message}</span>}
              </div>
              <div>
                <label style={labelStyle}>↗ {t('Téléphone', 'Phone')} *</label>
                <input
                  type="tel"
                  style={inputStyle}
                  {...register('phone', { required: t('Requis', 'Required') })}
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
                />
                {errors.phone && <span style={{ fontSize: 12, color: '#C0392B', marginTop: 4, display: 'block' }}>{errors.phone.message}</span>}
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <label style={labelStyle}>↗ Email *</label>
              <input
                type="email"
                style={inputStyle}
                {...register('email', {
                  required: t('Requis', 'Required'),
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t('Email invalide', 'Invalid email') }
                })}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
              />
              {errors.email && <span style={{ fontSize: 12, color: '#C0392B', marginTop: 4, display: 'block' }}>{errors.email.message}</span>}
            </div>

            <div style={{ marginTop: 18 }}>
              <label style={labelStyle}>↗ Message</label>
              <textarea
                style={{ ...inputStyle, resize: 'vertical', height: 120 }}
                {...register('message')}
                onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26,92,26,0.1)' }}
                onBlur={(e) => { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.boxShadow = 'none' }}
              />
            </div>

            <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                {isSubmitting ? t('Envoi…', 'Sending…') : <>{t('Envoyer ma candidature', 'Submit my application')} →</>}
              </button>
              <span className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                {t('Réponse sous 48 h', 'Reply within 48 h')}
              </span>
            </div>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0F3D14', color: '#fff', padding: `${isMobile ? 72 : 120}px ${px}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'end' }}>
          <h2 className="fg-fr" style={{ fontSize: 'clamp(36px, 5vw, 80px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96, color: '#fff' }}>
            {t('Un projet,', 'A project,')}{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>
              {t('une cotation.', 'a quotation.')}
            </span>
          </h2>
          <div>
            <Link to={ROUTES.CONTACT} className="btn-light">{t('Nous écrire', 'Get in touch')} →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
