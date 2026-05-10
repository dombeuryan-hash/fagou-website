import { useLanguage } from '../hooks/useLanguage'
import { COMPANY_EMAIL_CONTACT } from '../constants'

export default function Privacy() {
  const { t } = useLanguage()

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '36px', marginBottom: '36px' }}>
        {t('Politique de confidentialité', 'Privacy policy')}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#1A1A1A', lineHeight: 1.8 }}>
        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Conformité RGPD', 'GDPR compliance')}
          </h2>
          <p>{t('FAGOU SRL traite vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD) et à la législation belge en vigueur.', 'FAGOU SRL processes your personal data in accordance with the General Data Protection Regulation (GDPR) and applicable Belgian legislation.')}</p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Données collectées', 'Data collected')}
          </h2>
          <p>{t('Nous collectons les données suivantes lors de vos interactions avec notre site :', 'We collect the following data during your interactions with our site:')}</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>{t('Données de contact (nom, email, téléphone)', 'Contact data (name, email, phone)')}</li>
            <li>{t('Données professionnelles (entreprise, pays)', 'Professional data (company, country)')}</li>
            <li>{t('Données de navigation (cookies, adresse IP)', 'Navigation data (cookies, IP address)')}</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Vos droits', 'Your rights')}
          </h2>
          <p>{t('Conformément au RGPD, vous disposez des droits suivants : accès, rectification, suppression, opposition, portabilité. Pour exercer ces droits, contactez-nous à', 'Under GDPR, you have the following rights: access, rectification, deletion, objection, portability. To exercise these rights, contact us at')} {COMPANY_EMAIL_CONTACT}.</p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Conservation des données', 'Data retention')}
          </h2>
          <p>{t('Vos données sont conservées pendant la durée nécessaire à l\'accomplissement des finalités pour lesquelles elles ont été collectées, et au maximum 3 ans après notre dernier contact.', 'Your data is retained for the period necessary to achieve the purposes for which it was collected, and for a maximum of 3 years after our last contact.')}</p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Cookies', 'Cookies')}
          </h2>
          <p>{t('Ce site utilise des cookies fonctionnels et analytiques. Vous pouvez gérer vos préférences via la bannière cookies. Le refus des cookies non essentiels n\'impacte pas l\'accès au site.', 'This site uses functional and analytical cookies. You can manage your preferences via the cookie banner. Refusing non-essential cookies does not impact access to the site.')}</p>
        </section>
      </div>
    </div>
  )
}
