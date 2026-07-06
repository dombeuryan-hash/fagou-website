import { Link } from 'react-router-dom'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { partnersData } from '../data/partnersData'
import { ROUTES } from '../constants'

export default function Enterprises() {
  const { t, language } = useLanguage()
  const isMobile = useIsMobile()
  const px = isMobile ? 20 : 64

  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--color-bg)' }}>
      <Nav />

      {/* Hero */}
      <section style={{ padding: `${isMobile ? 100 : 180}px ${px}px ${isMobile ? 56 : 88}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div className="fg-eyebrow" style={{ marginBottom: isMobile ? 32 : 56 }}>↗ {t('Partenaires', 'Partners')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 24 : 64, alignItems: 'end' }}>
          <h1 className="fg-fr" style={{ fontSize: 'clamp(48px, 9vw, 128px)', margin: 0, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.92 }}>
            {t('FAGOU &', 'FAGOU &')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('partenaires.', 'partners.')}</span>
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.55, color: '#6B7280', margin: 0, maxWidth: 420 }}>
            {t(
              'Un réseau solide de partenaires en Europe et en Afrique pour vous offrir le meilleur service dans le négoce agro-alimentaire.',
              'A solid network of partners in Europe and Africa to offer you the best service in agro-food trading.'
            )}
          </p>
        </div>
      </section>

      {/* Partner grid */}
      <section style={{ padding: `${isMobile ? 48 : 96}px ${px}px ${isMobile ? 64 : 120}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(340px, 1fr))', gap: isMobile ? 20 : 28 }}>
          {partnersData.map((partner, i) => (
            <article
              key={partner.id}
              className="fg-card-3d"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 12,
                border: '1px solid #E5E7EB',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ padding: isMobile ? '24px 20px' : '32px 32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: '#F2F7F2',
                    border: '1px solid rgba(26,92,26,0.12)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span className="fg-mono" style={{ fontSize: 11, color: '#1A5C1A', fontWeight: 600, letterSpacing: '0.08em' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h2 className="fg-fr" style={{ fontSize: isMobile ? 24 : 28, fontWeight: 400, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                      {partner.nameFr}
                    </h2>
                    <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>
                      {partner.country}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, margin: '0 0 20px', flex: 1 }}>
                  {language === 'fr' ? partner.descriptionFr : partner.descriptionEn}
                </p>

                {partner.website && (
                  <a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fg-mono fg-underline-reveal"
                    style={{ fontSize: 11, color: '#1A5C1A', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 500, alignSelf: 'flex-start', paddingBottom: 2 }}
                  >
                    {t('Visiter le site', 'Visit website')} →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0F3D14', color: '#fff', padding: `${isMobile ? 72 : 120}px ${px}px`, position: 'relative', overflow: 'hidden' }}>
        <div className="fg-float-slow" style={{ position: 'absolute', top: '-30%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'end' }}>
          <div>
            <div className="fg-eyebrow dark" style={{ marginBottom: 24 }}>↗ {t('Devenir partenaire', 'Become a partner')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(36px, 5vw, 80px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96, color: '#fff' }}>
              {t('Rejoignez', 'Join')}{' '}
              <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>
                {t('notre réseau.', 'our network.')}
              </span>
            </h2>
          </div>
          <div>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: '0 0 28px' }}>
              {t(
                'Vous êtes une entreprise européenne ou africaine et souhaitez rejoindre notre réseau ? Contactez-nous pour explorer les opportunités.',
                'Are you a European or African company and would like to join our network? Contact us to explore opportunities.'
              )}
            </p>
            <Link to={ROUTES.CONTACT} className="btn-light">{t('Nous contacter', 'Get in touch')} →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
