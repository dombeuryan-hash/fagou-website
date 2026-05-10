import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { COMPANY_NAME, COMPANY_EMAIL_CONTACT, COMPANY_ADDRESS_FULL } from '../constants'
import { ROUTES } from '../constants'

const lastUpdated = '10 mai 2025'
const lastUpdatedEn = 'May 10, 2025'

const sectionTitleStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  fontSize: '20px',
  marginBottom: '12px',
} as const

const subTitleStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 600,
  fontSize: '17px',
  marginTop: '20px',
  marginBottom: '8px',
} as const

const thStyle = {
  textAlign: 'left' as const,
  padding: '12px 16px',
  fontWeight: 600,
  fontSize: '13px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.05em',
  color: '#1A5C1A',
  borderBottom: '2px solid #1A5C1A',
}

const tdStyle = {
  padding: '12px 16px',
  fontSize: '14px',
  borderBottom: '1px solid #E5E7EB',
  verticalAlign: 'top' as const,
}

export default function Privacy() {
  const { t } = useLanguage()

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '36px', marginBottom: '8px' }}>
        {t('Politique de confidentialité', 'Privacy policy')}
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B7280', marginBottom: '36px' }}>
        {t(`Dernière mise à jour : ${lastUpdated}`, `Last updated: ${lastUpdatedEn}`)}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#1A1A1A', lineHeight: 1.8 }}>

        {/* 1. Responsable du traitement */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('1. Responsable du traitement', '1. Data controller')}
          </h2>
          <p>
            {t(
              `Le responsable du traitement de vos données personnelles est :`,
              `The data controller for your personal data is:`
            )}
          </p>
          <div style={{ background: '#F2F7F2', padding: '16px 20px', borderRadius: '8px', marginTop: '12px', fontSize: '14px' }}>
            <p><strong>{COMPANY_NAME}</strong></p>
            <p>{t('Société à Responsabilité Limitée (SRL) de droit belge', 'Belgian Limited Liability Company (SRL)')}</p>
            <p>{t('Siège social', 'Registered office')} : {COMPANY_ADDRESS_FULL}</p>
            <p>{t('Numéro BCE', 'CBE number')} : BE 0XXX.XXX.XXX</p>
            <p>Email : {COMPANY_EMAIL_CONTACT}</p>
          </div>
        </section>

        {/* 2. Cadre juridique */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('2. Cadre juridique applicable', '2. Applicable legal framework')}
          </h2>
          <p>
            {t(
              `${COMPANY_NAME} traite vos données personnelles conformément aux réglementations suivantes :`,
              `${COMPANY_NAME} processes your personal data in accordance with the following regulations:`
            )}
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>{t('Le Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679)', 'The General Data Protection Regulation (GDPR — EU Regulation 2016/679)')}</li>
            <li>{t('La loi belge du 30 juillet 2018 relative à la protection des personnes physiques à l\'égard des traitements de données à caractère personnel', 'The Belgian Act of July 30, 2018 on the protection of natural persons with regard to the processing of personal data')}</li>
            <li>{t('La loi belge du 13 juin 2005 relative aux communications électroniques (transposition de la directive ePrivacy)', 'The Belgian Act of June 13, 2005 on electronic communications (transposition of the ePrivacy Directive)')}</li>
          </ul>
        </section>

        {/* 3. Données collectées */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('3. Données personnelles collectées', '3. Personal data collected')}
          </h2>
          <p>
            {t(
              'Nous collectons uniquement les données nécessaires à nos activités commerciales légitimes. Les données collectées varient selon votre interaction avec notre site :',
              'We only collect data necessary for our legitimate business activities. The data collected varies depending on your interaction with our site:'
            )}
          </p>

          <h3 style={subTitleStyle}>
            {t('a) Via le formulaire de contact et les demandes de cotation', 'a) Via the contact form and quotation requests')}
          </h3>
          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>{t('Donnée', 'Data')}</th>
                  <th style={thStyle}>{t('Obligatoire', 'Required')}</th>
                  <th style={thStyle}>{t('Finalité', 'Purpose')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>{t('Nom de la société', 'Company name')}</td>
                  <td style={tdStyle}>{t('Oui', 'Yes')}</td>
                  <td style={tdStyle}>{t('Identification du partenaire commercial', 'Identification of the business partner')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Pays', 'Country')}</td>
                  <td style={tdStyle}>{t('Oui', 'Yes')}</td>
                  <td style={tdStyle}>{t('Détermination des conditions logistiques et douanières', 'Determining logistics and customs conditions')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Email</td>
                  <td style={tdStyle}>{t('Oui', 'Yes')}</td>
                  <td style={tdStyle}>{t('Réponse à votre demande, envoi de la cotation', 'Replying to your request, sending the quotation')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Téléphone', 'Phone')}</td>
                  <td style={tdStyle}>Non</td>
                  <td style={tdStyle}>{t('Contact téléphonique si nécessaire', 'Phone contact if necessary')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Départements d\'intérêt', 'Departments of interest')}</td>
                  <td style={tdStyle}>Non</td>
                  <td style={tdStyle}>{t('Orientation de votre demande vers le bon département', 'Directing your request to the right department')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Volume estimé / Incoterm', 'Estimated volume / Incoterm')}</td>
                  <td style={tdStyle}>Non</td>
                  <td style={tdStyle}>{t('Préparation d\'une cotation adaptée', 'Preparation of a tailored quotation')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>Message</td>
                  <td style={tdStyle}>Non</td>
                  <td style={tdStyle}>{t('Détails complémentaires sur votre besoin', 'Additional details about your requirements')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={subTitleStyle}>
            {t('b) Données de navigation collectées automatiquement', 'b) Automatically collected browsing data')}
          </h3>
          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>{t('Donnée', 'Data')}</th>
                  <th style={thStyle}>{t('Finalité', 'Purpose')}</th>
                  <th style={thStyle}>{t('Base légale', 'Legal basis')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>{t('Adresse IP', 'IP address')}</td>
                  <td style={tdStyle}>{t('Sécurité du site, protection contre les abus', 'Site security, protection against abuse')}</td>
                  <td style={tdStyle}>{t('Intérêt légitime', 'Legitimate interest')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Données de cookies analytiques (Google Analytics)', 'Analytical cookie data (Google Analytics)')}</td>
                  <td style={tdStyle}>{t('Mesure d\'audience, amélioration du site', 'Audience measurement, site improvement')}</td>
                  <td style={tdStyle}>{t('Consentement', 'Consent')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Préférence de langue', 'Language preference')}</td>
                  <td style={tdStyle}>{t('Affichage du site dans la langue choisie', 'Displaying the site in the chosen language')}</td>
                  <td style={tdStyle}>{t('Intérêt légitime', 'Legitimate interest')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Données de vérification CAPTCHA (Cloudflare Turnstile)', 'CAPTCHA verification data (Cloudflare Turnstile)')}</td>
                  <td style={tdStyle}>{t('Protection contre le spam et les soumissions automatisées', 'Protection against spam and automated submissions')}</td>
                  <td style={tdStyle}>{t('Intérêt légitime', 'Legitimate interest')}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 4. Bases légales */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('4. Bases légales du traitement', '4. Legal bases for processing')}
          </h2>
          <p>{t('Conformément à l\'article 6 du RGPD, nous traitons vos données sur les bases légales suivantes :', 'In accordance with Article 6 of the GDPR, we process your data on the following legal bases:')}</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>
              <strong>{t('Exécution de mesures précontractuelles', 'Performance of pre-contractual measures')}</strong> (Art. 6.1.b) — {t('traitement de vos demandes de cotation et de contact en vue d\'établir une relation commerciale', 'processing your quotation and contact requests with a view to establishing a business relationship')}
            </li>
            <li>
              <strong>{t('Intérêt légitime', 'Legitimate interest')}</strong> (Art. 6.1.f) — {t('sécurité du site, protection contre le spam (CAPTCHA), amélioration de nos services, prospection B2B', 'site security, spam protection (CAPTCHA), improvement of our services, B2B prospecting')}
            </li>
            <li>
              <strong>{t('Consentement', 'Consent')}</strong> (Art. 6.1.a) — {t('dépôt de cookies analytiques (Google Analytics)', 'placement of analytical cookies (Google Analytics)')}
            </li>
            <li>
              <strong>{t('Obligation légale', 'Legal obligation')}</strong> (Art. 6.1.c) — {t('conservation de certaines données à des fins comptables et fiscales conformément au droit belge', 'retention of certain data for accounting and tax purposes in accordance with Belgian law')}
            </li>
          </ul>
        </section>

        {/* 5. Finalités */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('5. Finalités du traitement', '5. Purposes of processing')}
          </h2>
          <p>{t('Vos données personnelles sont utilisées exclusivement pour les finalités suivantes :', 'Your personal data is used exclusively for the following purposes:')}</p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>{t('Répondre à vos demandes de contact et de cotation', 'Responding to your contact and quotation requests')}</li>
            <li>{t('Préparer et envoyer des offres commerciales adaptées', 'Preparing and sending tailored commercial offers')}</li>
            <li>{t('Gérer la relation commerciale B2B (suivi des commandes, facturation, logistique)', 'Managing the B2B business relationship (order tracking, invoicing, logistics)')}</li>
            <li>{t('Assurer la sécurité et le bon fonctionnement du site', 'Ensuring the security and proper functioning of the site')}</li>
            <li>{t('Mesurer l\'audience du site et améliorer son contenu (avec votre consentement)', 'Measuring site audience and improving its content (with your consent)')}</li>
            <li>{t('Respecter nos obligations légales et fiscales', 'Complying with our legal and tax obligations')}</li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            <strong>{t('Nous ne vendons jamais vos données personnelles à des tiers.', 'We never sell your personal data to third parties.')}</strong>
          </p>
        </section>

        {/* 6. Destinataires */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('6. Destinataires des données', '6. Data recipients')}
          </h2>
          <p>{t('Vos données peuvent être partagées avec les catégories de destinataires suivantes, dans le strict cadre des finalités décrites ci-dessus :', 'Your data may be shared with the following categories of recipients, strictly within the scope of the purposes described above:')}</p>

          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>{t('Destinataire', 'Recipient')}</th>
                  <th style={thStyle}>{t('Finalité', 'Purpose')}</th>
                  <th style={thStyle}>{t('Localisation', 'Location')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}><strong>Supabase Inc.</strong></td>
                  <td style={tdStyle}>{t('Hébergement de la base de données et des fonctions serveur', 'Database hosting and server functions')}</td>
                  <td style={tdStyle}>{t('UE (Francfort, Allemagne)', 'EU (Frankfurt, Germany)')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}><strong>Google LLC</strong> (Analytics)</td>
                  <td style={tdStyle}>{t('Mesure d\'audience (avec consentement uniquement)', 'Audience measurement (with consent only)')}</td>
                  <td style={tdStyle}>{t('États-Unis (EU-U.S. DPF)', 'United States (EU-U.S. DPF)')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}><strong>Google LLC</strong> (Tag Manager)</td>
                  <td style={tdStyle}>{t('Gestion centralisée des scripts', 'Centralized script management')}</td>
                  <td style={tdStyle}>{t('États-Unis (EU-U.S. DPF)', 'United States (EU-U.S. DPF)')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}><strong>Cloudflare Inc.</strong> (Turnstile)</td>
                  <td style={tdStyle}>{t('Protection anti-spam des formulaires', 'Anti-spam protection for forms')}</td>
                  <td style={tdStyle}>{t('États-Unis (EU-U.S. DPF)', 'United States (EU-U.S. DPF)')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: '12px' }}>
            {t(
              'Chacun de ces sous-traitants est soumis à des obligations contractuelles de protection des données conformes au RGPD. Les transferts vers les États-Unis sont encadrés par le EU-U.S. Data Privacy Framework (DPF), conformément à la décision d\'adéquation de la Commission européenne du 10 juillet 2023.',
              'Each of these processors is subject to contractual data protection obligations in compliance with the GDPR. Transfers to the United States are governed by the EU-U.S. Data Privacy Framework (DPF), in accordance with the European Commission\'s adequacy decision of July 10, 2023.'
            )}
          </p>
        </section>

        {/* 7. Données B2B */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('7. Données des entreprises partenaires (B2B)', '7. Business partner data (B2B)')}
          </h2>
          <p>
            {t(
              'Dans le cadre de nos relations commerciales B2B, nous conservons les informations suivantes relatives à nos partenaires commerciaux :',
              'As part of our B2B business relationships, we retain the following information about our business partners:'
            )}
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>{t('Raison sociale et coordonnées de l\'entreprise', 'Company name and contact details')}</li>
            <li>{t('Nom, prénom, fonction et coordonnées professionnelles de la personne de contact', 'Contact person\'s name, position, and professional contact details')}</li>
            <li>{t('Historique des demandes et des commandes', 'History of requests and orders')}</li>
            <li>{t('Préférences produits et volumes commandés', 'Product preferences and ordered volumes')}</li>
            <li>{t('Informations de facturation et de paiement', 'Billing and payment information')}</li>
            <li>{t('Correspondance commerciale', 'Business correspondence')}</li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            {t(
              'Ces données sont traitées sur la base de l\'exécution du contrat (Art. 6.1.b RGPD) et de notre intérêt légitime à gérer notre activité commerciale (Art. 6.1.f RGPD). L\'accès à ces données est strictement limité au personnel autorisé de FAGOU SRL.',
              'This data is processed on the basis of contract performance (Art. 6.1.b GDPR) and our legitimate interest in managing our business activity (Art. 6.1.f GDPR). Access to this data is strictly limited to authorized FAGOU SRL personnel.'
            )}
          </p>
        </section>

        {/* 8. Durées de conservation */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('8. Durées de conservation', '8. Retention periods')}
          </h2>
          <p>{t('Nous conservons vos données pendant les durées suivantes :', 'We retain your data for the following periods:')}</p>
          <div style={{ overflowX: 'auto', marginTop: '12px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={thStyle}>{t('Type de données', 'Data type')}</th>
                  <th style={thStyle}>{t('Durée de conservation', 'Retention period')}</th>
                  <th style={thStyle}>{t('Justification', 'Justification')}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={tdStyle}>{t('Demandes de contact / cotation', 'Contact / quotation requests')}</td>
                  <td style={tdStyle}>{t('3 ans après le dernier contact', '3 years after last contact')}</td>
                  <td style={tdStyle}>{t('Gestion de la relation commerciale', 'Business relationship management')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Données clients (contrats, facturation)', 'Customer data (contracts, billing)')}</td>
                  <td style={tdStyle}>{t('10 ans après la fin du contrat', '10 years after contract end')}</td>
                  <td style={tdStyle}>{t('Obligation légale comptable et fiscale belge', 'Belgian accounting and tax legal obligation')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Données analytiques (Google Analytics)', 'Analytical data (Google Analytics)')}</td>
                  <td style={tdStyle}>{t('26 mois (paramètre Google Analytics)', '26 months (Google Analytics setting)')}</td>
                  <td style={tdStyle}>{t('Mesure d\'audience', 'Audience measurement')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Consentement cookies', 'Cookie consent')}</td>
                  <td style={tdStyle}>{t('Jusqu\'à suppression par l\'utilisateur', 'Until deleted by the user')}</td>
                  <td style={tdStyle}>{t('Preuve du consentement (RGPD Art. 7)', 'Proof of consent (GDPR Art. 7)')}</td>
                </tr>
                <tr>
                  <td style={tdStyle}>{t('Journaux de sécurité (IP)', 'Security logs (IP)')}</td>
                  <td style={tdStyle}>{t('12 mois', '12 months')}</td>
                  <td style={tdStyle}>{t('Sécurité et détection d\'abus', 'Security and abuse detection')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: '12px' }}>
            {t(
              'Au-delà de ces durées, vos données sont supprimées ou anonymisées de manière irréversible.',
              'Beyond these periods, your data is deleted or irreversibly anonymized.'
            )}
          </p>
        </section>

        {/* 9. Vos droits */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('9. Vos droits', '9. Your rights')}
          </h2>
          <p>
            {t(
              'Conformément au RGPD (articles 15 à 22) et à la loi belge du 30 juillet 2018, vous disposez des droits suivants :',
              'In accordance with the GDPR (Articles 15 to 22) and the Belgian Act of July 30, 2018, you have the following rights:'
            )}
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li><strong>{t('Droit d\'accès', 'Right of access')}</strong> (Art. 15) — {t('obtenir la confirmation que vos données sont traitées et en recevoir une copie', 'obtain confirmation that your data is being processed and receive a copy')}</li>
            <li><strong>{t('Droit de rectification', 'Right to rectification')}</strong> (Art. 16) — {t('faire corriger des données inexactes ou compléter des données incomplètes', 'have inaccurate data corrected or incomplete data completed')}</li>
            <li><strong>{t('Droit à l\'effacement', 'Right to erasure')}</strong> (Art. 17) — {t('demander la suppression de vos données lorsque le traitement n\'est plus nécessaire', 'request deletion of your data when processing is no longer necessary')}</li>
            <li><strong>{t('Droit à la limitation', 'Right to restriction')}</strong> (Art. 18) — {t('demander la limitation du traitement dans certaines circonstances', 'request restriction of processing in certain circumstances')}</li>
            <li><strong>{t('Droit à la portabilité', 'Right to portability')}</strong> (Art. 20) — {t('recevoir vos données dans un format structuré, couramment utilisé et lisible par machine', 'receive your data in a structured, commonly used and machine-readable format')}</li>
            <li><strong>{t('Droit d\'opposition', 'Right to object')}</strong> (Art. 21) — {t('vous opposer au traitement fondé sur l\'intérêt légitime, y compris la prospection commerciale', 'object to processing based on legitimate interest, including commercial prospecting')}</li>
            <li><strong>{t('Droit de retrait du consentement', 'Right to withdraw consent')}</strong> (Art. 7) — {t('retirer votre consentement aux cookies analytiques à tout moment, sans affecter la licéité du traitement antérieur', 'withdraw your consent to analytical cookies at any time, without affecting the lawfulness of prior processing')}</li>
          </ul>

          <h3 style={subTitleStyle}>
            {t('Comment exercer vos droits', 'How to exercise your rights')}
          </h3>
          <p>
            {t(
              `Envoyez votre demande par email à ${COMPANY_EMAIL_CONTACT} en précisant votre identité et le droit que vous souhaitez exercer. Nous répondrons dans un délai de 30 jours conformément au RGPD. Ce délai peut être prolongé de deux mois supplémentaires en cas de complexité, auquel cas nous vous en informerons.`,
              `Send your request by email to ${COMPANY_EMAIL_CONTACT}, specifying your identity and the right you wish to exercise. We will respond within 30 days in accordance with the GDPR. This period may be extended by two additional months in case of complexity, in which case we will inform you.`
            )}
          </p>
        </section>

        {/* 10. Sécurité */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('10. Sécurité des données', '10. Data security')}
          </h2>
          <p>
            {t(
              `${COMPANY_NAME} met en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre l'accès non autorisé, la perte, la destruction ou l'altération. Ces mesures comprennent :`,
              `${COMPANY_NAME} implements appropriate technical and organizational measures to protect your data against unauthorized access, loss, destruction or alteration. These measures include:`
            )}
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>{t('Chiffrement des données en transit (HTTPS/TLS)', 'Encryption of data in transit (HTTPS/TLS)')}</li>
            <li>{t('Hébergement sur des serveurs sécurisés conformes au RGPD (Supabase, UE)', 'Hosting on secure GDPR-compliant servers (Supabase, EU)')}</li>
            <li>{t('Contrôle d\'accès limité au personnel autorisé', 'Access control limited to authorized personnel')}</li>
            <li>{t('Protection anti-spam des formulaires (Cloudflare Turnstile)', 'Anti-spam protection of forms (Cloudflare Turnstile)')}</li>
            <li>{t('Sauvegardes régulières des données', 'Regular data backups')}</li>
          </ul>
        </section>

        {/* 11. Mineurs */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('11. Protection des mineurs', '11. Protection of minors')}
          </h2>
          <p>
            {t(
              'Notre site s\'adresse exclusivement aux professionnels du secteur agroalimentaire (B2B). Nous ne collectons pas sciemment de données personnelles de personnes mineures. Si nous découvrons que nous avons collecté des données d\'un mineur, nous les supprimerons immédiatement.',
              'Our site is intended exclusively for professionals in the agri-food sector (B2B). We do not knowingly collect personal data from minors. If we discover that we have collected data from a minor, we will delete it immediately.'
            )}
          </p>
        </section>

        {/* 12. Cookies */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('12. Cookies et technologies similaires', '12. Cookies and similar technologies')}
          </h2>
          <p>
            {t(
              'Notre site utilise des cookies et le localStorage pour fonctionner correctement et mesurer son audience. Pour des informations détaillées sur chaque cookie utilisé, leur finalité, leur durée et comment les gérer, consultez notre ',
              'Our site uses cookies and localStorage to function properly and measure its audience. For detailed information about each cookie used, its purpose, duration and how to manage them, please consult our '
            )}
            <Link to={ROUTES.COOKIES} style={{ color: '#1A5C1A', textDecoration: 'underline', fontWeight: 600 }}>
              {t('Politique de cookies', 'Cookie policy')}
            </Link>.
          </p>
        </section>

        {/* 13. Réclamation */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('13. Droit de réclamation', '13. Right to complain')}
          </h2>
          <p>
            {t(
              'Si vous estimez que le traitement de vos données personnelles constitue une violation du RGPD ou de la législation belge, vous avez le droit d\'introduire une réclamation auprès de l\'autorité de contrôle compétente :',
              'If you believe that the processing of your personal data constitutes a violation of the GDPR or Belgian legislation, you have the right to file a complaint with the competent supervisory authority:'
            )}
          </p>
          <div style={{ background: '#F2F7F2', padding: '16px 20px', borderRadius: '8px', marginTop: '12px', fontSize: '14px' }}>
            <p><strong>{t('Autorité de Protection des Données (APD)', 'Data Protection Authority (DPA)')}</strong></p>
            <p>Rue de la Presse 35, 1000 Bruxelles</p>
            <p>{t('Téléphone', 'Phone')} : +32 (0)2 274 48 00</p>
            <p>Email : contact@apd-gba.be</p>
            <p>
              Web : <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" style={{ color: '#1A5C1A', textDecoration: 'underline' }}>www.autoriteprotectiondonnees.be</a>
            </p>
          </div>
        </section>

        {/* 14. Modifications */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('14. Modifications de cette politique', '14. Changes to this policy')}
          </h2>
          <p>
            {t(
              `${COMPANY_NAME} se réserve le droit de modifier cette politique de confidentialité à tout moment afin de refléter les évolutions légales, techniques ou commerciales. Toute modification sera publiée sur cette page avec une date de mise à jour actualisée. En cas de modification substantielle, nous vous en informerons par un avis visible sur notre site.`,
              `${COMPANY_NAME} reserves the right to modify this privacy policy at any time to reflect legal, technical or commercial developments. Any changes will be published on this page with an updated date. In case of substantial changes, we will inform you through a visible notice on our site.`
            )}
          </p>
          <p style={{ marginTop: '12px' }}>
            {t(
              'Nous vous encourageons à consulter régulièrement cette page pour rester informé de la manière dont nous protégeons vos données.',
              'We encourage you to regularly check this page to stay informed about how we protect your data.'
            )}
          </p>
        </section>
      </div>
    </div>
  )
}
