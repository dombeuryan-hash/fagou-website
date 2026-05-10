import { Globe, Star } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage'
import { partnersData } from '../data/partnersData'

export default function Enterprises() {
  const { t } = useLanguage()

  return (
    <div>
      <section style={{ backgroundColor: '#1A5C1A', padding: '72px 24px', textAlign: 'center', color: '#FFFFFF' }}>
        <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 'clamp(28px, 5vw, 48px)', marginBottom: '16px' }}>
          {t('FAGOU SRL et ses partenaires', 'FAGOU SRL and its partners')}
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', opacity: 0.9, maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          {t(
            'Un réseau solide de partenaires en Europe et en Afrique pour vous offrir le meilleur service.',
            'A solid network of partners in Europe and Africa to offer you the best service.'
          )}
        </p>
      </section>

      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '32px' }}>
          {partnersData.map((partner) => (
            <article key={partner.id} style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#F0F7F0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Star size={24} color="#1A5C1A" />
                </div>
                <div>
                  <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '18px' }}>
                    {partner.nameFr}
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Globe size={12} color="#6B7280" />
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#6B7280' }}>{partner.country}</span>
                  </div>
                </div>
              </div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#6B7280', lineHeight: 1.7 }}>
                {t(partner.descriptionFr, partner.descriptionEn)}
              </p>
              {partner.website && (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-block', marginTop: '16px', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#1A5C1A', fontWeight: 500 }}
                >
                  {t('Visiter le site', 'Visit website')} →
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: '#F3F4F6', padding: '60px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '28px', marginBottom: '16px' }}>
            {t('Devenir partenaire', 'Become a partner')}
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '16px', color: '#6B7280', lineHeight: 1.7 }}>
            {t(
              'Vous êtes une entreprise européenne ou africaine et souhaitez rejoindre notre réseau ? Contactez-nous.',
              'Are you a European or African company and would like to join our network? Contact us.'
            )}
          </p>
        </div>
      </section>
    </div>
  )
}
