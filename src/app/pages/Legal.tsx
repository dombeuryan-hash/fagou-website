import { useLanguage } from '../hooks/useLanguage'
import { COMPANY_NAME, COMPANY_ADDRESS_FULL, COMPANY_EMAIL_CONTACT } from '../constants'

export default function Legal() {
  const { t } = useLanguage()

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '36px', marginBottom: '36px' }}>
        {t('Mentions légales', 'Legal notices')}
      </h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#1A1A1A', lineHeight: 1.8 }}>
        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Éditeur du site', 'Website editor')}
          </h2>
          <p><strong>{COMPANY_NAME}</strong></p>
          <p>{t('Société à Responsabilité Limitée (SRL) de droit belge', 'Belgian Limited Liability Company (SRL)')}</p>
          <p>{t('Siège social', 'Registered office')} : {COMPANY_ADDRESS_FULL}</p>
          <p>Email : {COMPANY_EMAIL_CONTACT}</p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Numéro d\'entreprise', 'Company number')}
          </h2>
          <p>{t('Numéro BCE', 'CBE number')} : BE 0XXX.XXX.XXX</p>
          <p>TVA : BE 0XXX.XXX.XXX</p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Hébergement', 'Hosting')}
          </h2>
          <p>{t('Ce site est hébergé par un prestataire européen certifié conforme au RGPD.', 'This site is hosted by a European GDPR-compliant provider.')}</p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Propriété intellectuelle', 'Intellectual property')}
          </h2>
          <p>{t('L\'ensemble du contenu de ce site (textes, images, logos) est la propriété exclusive de FAGOU SRL. Toute reproduction est interdite sans autorisation écrite préalable.', 'All content on this site (texts, images, logos) is the exclusive property of FAGOU SRL. Any reproduction is prohibited without prior written authorization.')}</p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '12px' }}>
            {t('Loi applicable', 'Applicable law')}
          </h2>
          <p>{t('Le présent site est soumis au droit belge. En cas de litige, les tribunaux de Bruxelles seront compétents.', 'This site is subject to Belgian law. In case of dispute, the Brussels courts will have jurisdiction.')}</p>
        </section>
      </div>
    </div>
  )
}
