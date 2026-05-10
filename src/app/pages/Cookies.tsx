import { useLanguage } from '../hooks/useLanguage'
import { COMPANY_NAME, COMPANY_EMAIL_CONTACT } from '../constants'

const lastUpdated = '10 mai 2025'
const lastUpdatedEn = 'May 10, 2025'

interface CookieRow {
  name: string
  provider: string
  purposeFr: string
  purposeEn: string
  duration: string
  type: 'essential' | 'analytics'
}

const cookies: CookieRow[] = [
  {
    name: 'fagou_cookie_consent',
    provider: 'FAGOU SRL',
    purposeFr: 'Enregistre votre choix concernant le consentement aux cookies (accepté/refusé)',
    purposeEn: 'Stores your cookie consent choice (accepted/declined)',
    duration: 'Persistent',
    type: 'essential',
  },
  {
    name: 'fagou_language',
    provider: 'FAGOU SRL',
    purposeFr: 'Mémorise votre préférence de langue (français/anglais)',
    purposeEn: 'Remembers your language preference (French/English)',
    duration: 'Persistent',
    type: 'essential',
  },
  {
    name: '_ga',
    provider: 'Google Analytics',
    purposeFr: 'Distingue les utilisateurs uniques en attribuant un identifiant généré aléatoirement. Inclus dans chaque requête de page pour calculer les données de visiteurs, sessions et campagnes.',
    purposeEn: 'Distinguishes unique users by assigning a randomly generated identifier. Included in each page request to calculate visitor, session and campaign data.',
    duration: '2 ans / 2 years',
    type: 'analytics',
  },
  {
    name: '_ga_<ID>',
    provider: 'Google Analytics',
    purposeFr: 'Utilisé par Google Analytics 4 pour conserver l\'état de la session et identifier une session de navigation.',
    purposeEn: 'Used by Google Analytics 4 to persist session state and identify a browsing session.',
    duration: '2 ans / 2 years',
    type: 'analytics',
  },
  {
    name: '_gid',
    provider: 'Google Analytics',
    purposeFr: 'Distingue les utilisateurs. Stocke et met à jour une valeur unique pour chaque page visitée.',
    purposeEn: 'Distinguishes users. Stores and updates a unique value for each page visited.',
    duration: '24 heures / 24 hours',
    type: 'analytics',
  },
  {
    name: '_gat',
    provider: 'Google Analytics',
    purposeFr: 'Utilisé pour limiter le taux de requêtes envoyées à Google Analytics afin de réduire la charge serveur.',
    purposeEn: 'Used to throttle the request rate to Google Analytics to reduce server load.',
    duration: '1 minute',
    type: 'analytics',
  },
]

const sectionTitleStyle = {
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  fontSize: '20px',
  marginBottom: '12px',
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

export default function Cookies() {
  const { t } = useLanguage()

  const essentialCookies = cookies.filter((c) => c.type === 'essential')
  const analyticsCookies = cookies.filter((c) => c.type === 'analytics')

  const renderTable = (rows: CookieRow[]) => (
    <div style={{ overflowX: 'auto', marginTop: '16px' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
        <thead>
          <tr>
            <th style={thStyle}>{t('Nom', 'Name')}</th>
            <th style={thStyle}>{t('Fournisseur', 'Provider')}</th>
            <th style={thStyle}>{t('Finalité', 'Purpose')}</th>
            <th style={thStyle}>{t('Durée', 'Duration')}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((c) => (
            <tr key={c.name}>
              <td style={{ ...tdStyle, fontFamily: 'monospace', fontWeight: 600, whiteSpace: 'nowrap' }}>{c.name}</td>
              <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{c.provider}</td>
              <td style={tdStyle}>{t(c.purposeFr, c.purposeEn)}</td>
              <td style={{ ...tdStyle, whiteSpace: 'nowrap' }}>{c.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 24px' }}>
      <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '36px', marginBottom: '8px' }}>
        {t('Politique de cookies', 'Cookie policy')}
      </h1>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#6B7280', marginBottom: '36px' }}>
        {t(`Dernière mise à jour : ${lastUpdated}`, `Last updated: ${lastUpdatedEn}`)}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '36px', fontFamily: 'Inter, sans-serif', fontSize: '15px', color: '#1A1A1A', lineHeight: 1.8 }}>

        {/* 1. Introduction */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('1. Qu\'est-ce qu\'un cookie ?', '1. What is a cookie?')}
          </h2>
          <p>
            {t(
              'Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette, smartphone) lorsque vous visitez un site web. Il permet au site de mémoriser certaines informations sur votre visite, comme votre langue préférée ou vos choix de consentement, afin de faciliter votre navigation lors de visites ultérieures.',
              'A cookie is a small text file stored on your device (computer, tablet, smartphone) when you visit a website. It allows the site to remember certain information about your visit, such as your preferred language or consent choices, to make your browsing easier on future visits.'
            )}
          </p>
          <p style={{ marginTop: '12px' }}>
            {t(
              'Notre site utilise également le localStorage, une technologie similaire aux cookies mais qui stocke les données directement dans votre navigateur sans les envoyer au serveur à chaque requête.',
              'Our site also uses localStorage, a technology similar to cookies but which stores data directly in your browser without sending it to the server with each request.'
            )}
          </p>
        </section>

        {/* 2. Base légale */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('2. Base légale', '2. Legal basis')}
          </h2>
          <p>
            {t(
              `${COMPANY_NAME} utilise des cookies conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679), à la directive ePrivacy (2002/58/CE) transposée en droit belge par la loi du 13 juin 2005 relative aux communications électroniques, et aux recommandations de l'Autorité de Protection des Données (APD) belge.`,
              `${COMPANY_NAME} uses cookies in accordance with the General Data Protection Regulation (GDPR — EU Regulation 2016/679), the ePrivacy Directive (2002/58/EC) transposed into Belgian law by the Act of June 13, 2005 on electronic communications, and the recommendations of the Belgian Data Protection Authority (DPA).`
            )}
          </p>
        </section>

        {/* 3. Types de cookies */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('3. Types de cookies utilisés', '3. Types of cookies used')}
          </h2>

          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '17px', marginTop: '20px', marginBottom: '8px' }}>
            {t('a) Cookies essentiels (strictement nécessaires)', 'a) Essential cookies (strictly necessary)')}
          </h3>
          <p>
            {t(
              'Ces cookies sont indispensables au fonctionnement du site. Ils ne collectent aucune donnée à des fins marketing et ne nécessitent pas votre consentement conformément à l\'article 129 de la loi belge du 13 juin 2005.',
              'These cookies are essential for the site to function. They do not collect any data for marketing purposes and do not require your consent pursuant to Article 129 of the Belgian Act of June 13, 2005.'
            )}
          </p>
          {renderTable(essentialCookies)}

          <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 600, fontSize: '17px', marginTop: '28px', marginBottom: '8px' }}>
            {t('b) Cookies analytiques (mesure d\'audience)', 'b) Analytical cookies (audience measurement)')}
          </h3>
          <p>
            {t(
              'Ces cookies nous permettent de mesurer l\'audience de notre site, de comprendre comment les visiteurs l\'utilisent et d\'améliorer son contenu. Ces cookies sont déposés par Google Analytics (Google LLC). Les données collectées sont anonymisées et agrégées. Ces cookies ne sont activés qu\'après votre consentement explicite.',
              'These cookies allow us to measure our site\'s audience, understand how visitors use it, and improve its content. These cookies are set by Google Analytics (Google LLC). The data collected is anonymized and aggregated. These cookies are only activated after your explicit consent.'
            )}
          </p>
          {renderTable(analyticsCookies)}
        </section>

        {/* 4. Google Tag Manager */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('4. Google Tag Manager', '4. Google Tag Manager')}
          </h2>
          <p>
            {t(
              'Notre site utilise Google Tag Manager (GTM), un outil de gestion de balises fourni par Google LLC. GTM ne dépose pas de cookies par lui-même et ne collecte pas de données personnelles. Il sert uniquement à charger et gérer d\'autres scripts (comme Google Analytics) de manière centralisée. Les cookies déposés par les outils chargés via GTM sont détaillés dans les sections ci-dessus.',
              'Our site uses Google Tag Manager (GTM), a tag management tool provided by Google LLC. GTM does not set cookies by itself and does not collect personal data. It is only used to load and manage other scripts (such as Google Analytics) centrally. The cookies set by tools loaded through GTM are detailed in the sections above.'
            )}
          </p>
        </section>

        {/* 5. Google Search Console */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('5. Google Search Console', '5. Google Search Console')}
          </h2>
          <p>
            {t(
              'Nous utilisons Google Search Console pour surveiller et optimiser la présence de notre site dans les résultats de recherche Google. Cet outil est utilisé exclusivement côté serveur par nos administrateurs et ne dépose aucun cookie sur votre appareil. Il n\'a aucun impact sur votre vie privée en tant que visiteur.',
              'We use Google Search Console to monitor and optimize our site\'s presence in Google search results. This tool is used exclusively server-side by our administrators and does not place any cookies on your device. It has no impact on your privacy as a visitor.'
            )}
          </p>
        </section>

        {/* 6. Transferts hors UE */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('6. Transferts de données hors UE', '6. Data transfers outside the EU')}
          </h2>
          <p>
            {t(
              'Google LLC est une société basée aux États-Unis. Les données collectées via Google Analytics peuvent être transférées et traitées aux États-Unis. Ce transfert est encadré par le EU-U.S. Data Privacy Framework (DPF), auquel Google est certifié, conformément à la décision d\'adéquation de la Commission européenne du 10 juillet 2023.',
              'Google LLC is a company based in the United States. Data collected through Google Analytics may be transferred to and processed in the United States. This transfer is governed by the EU-U.S. Data Privacy Framework (DPF), to which Google is certified, in accordance with the European Commission\'s adequacy decision of July 10, 2023.'
            )}
          </p>
        </section>

        {/* 7. Consentement */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('7. Gestion de votre consentement', '7. Managing your consent')}
          </h2>
          <p>
            {t(
              'Lors de votre première visite, une bannière vous propose d\'accepter ou de refuser les cookies non essentiels. Votre choix est enregistré et respecté lors de vos visites suivantes.',
              'On your first visit, a banner offers you to accept or decline non-essential cookies. Your choice is saved and respected on subsequent visits.'
            )}
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li>{t('Si vous acceptez : les cookies analytiques Google Analytics sont activés.', 'If you accept: Google Analytics analytical cookies are activated.')}</li>
            <li>{t('Si vous refusez : seuls les cookies essentiels sont utilisés. Aucune donnée n\'est envoyée à Google.', 'If you decline: only essential cookies are used. No data is sent to Google.')}</li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            {t(
              'Vous pouvez modifier votre choix à tout moment en supprimant vos données de navigation (voir section suivante) puis en revisitant notre site : la bannière de consentement réapparaîtra.',
              'You can change your choice at any time by clearing your browsing data (see next section) then revisiting our site: the consent banner will reappear.'
            )}
          </p>
        </section>

        {/* 8. Gérer les cookies par navigateur */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('8. Comment gérer ou supprimer les cookies', '8. How to manage or delete cookies')}
          </h2>
          <p>
            {t(
              'Vous pouvez à tout moment configurer votre navigateur pour refuser ou supprimer les cookies. Voici comment procéder selon votre navigateur :',
              'You can configure your browser at any time to refuse or delete cookies. Here is how to do it depending on your browser:'
            )}
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
            <li>
              <strong>Google Chrome :</strong>{' '}
              {t(
                'Paramètres → Confidentialité et sécurité → Cookies et autres données de site',
                'Settings → Privacy and security → Cookies and other site data'
              )}
            </li>
            <li>
              <strong>Mozilla Firefox :</strong>{' '}
              {t(
                'Paramètres → Vie privée et sécurité → Cookies et données de site',
                'Settings → Privacy & Security → Cookies and Site Data'
              )}
            </li>
            <li>
              <strong>Safari :</strong>{' '}
              {t(
                'Préférences → Confidentialité → Gérer les données de sites web',
                'Preferences → Privacy → Manage Website Data'
              )}
            </li>
            <li>
              <strong>Microsoft Edge :</strong>{' '}
              {t(
                'Paramètres → Cookies et autorisations de site → Gérer et supprimer les cookies',
                'Settings → Cookies and site permissions → Manage and delete cookies'
              )}
            </li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            {t(
              '⚠ La suppression des cookies essentiels peut affecter le bon fonctionnement du site (vos préférences de langue et de consentement seront réinitialisées).',
              '⚠ Deleting essential cookies may affect the proper functioning of the site (your language and consent preferences will be reset).'
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
              'Conformément au RGPD et à la législation belge, vous disposez des droits suivants concernant vos données personnelles :',
              'In accordance with the GDPR and Belgian legislation, you have the following rights regarding your personal data:'
            )}
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li><strong>{t('Droit d\'accès', 'Right of access')}</strong> — {t('savoir quelles données nous détenons sur vous', 'know what data we hold about you')}</li>
            <li><strong>{t('Droit de rectification', 'Right to rectification')}</strong> — {t('corriger des données inexactes', 'correct inaccurate data')}</li>
            <li><strong>{t('Droit à l\'effacement', 'Right to erasure')}</strong> — {t('demander la suppression de vos données', 'request the deletion of your data')}</li>
            <li><strong>{t('Droit d\'opposition', 'Right to object')}</strong> — {t('vous opposer au traitement de vos données', 'object to the processing of your data')}</li>
            <li><strong>{t('Droit à la portabilité', 'Right to portability')}</strong> — {t('recevoir vos données dans un format structuré', 'receive your data in a structured format')}</li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            {t(
              `Pour exercer ces droits, contactez-nous à : ${COMPANY_EMAIL_CONTACT}`,
              `To exercise these rights, contact us at: ${COMPANY_EMAIL_CONTACT}`
            )}
          </p>
        </section>

        {/* 10. Réclamation */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('10. Réclamation', '10. Complaints')}
          </h2>
          <p>
            {t(
              'Si vous estimez que le traitement de vos données ne respecte pas la réglementation, vous avez le droit d\'introduire une réclamation auprès de l\'Autorité de Protection des Données (APD) belge :',
              'If you believe that the processing of your data does not comply with regulations, you have the right to file a complaint with the Belgian Data Protection Authority (DPA):'
            )}
          </p>
          <div style={{ background: '#F2F7F2', padding: '16px 20px', borderRadius: '8px', marginTop: '12px', fontSize: '14px' }}>
            <p><strong>{t('Autorité de Protection des Données', 'Data Protection Authority')}</strong></p>
            <p>Rue de la Presse 35, 1000 Bruxelles</p>
            <p>
              {t('Téléphone', 'Phone')} : +32 (0)2 274 48 00
            </p>
            <p>Email : contact@apd-gba.be</p>
            <p>
              Web : <a href="https://www.autoriteprotectiondonnees.be" target="_blank" rel="noopener noreferrer" style={{ color: '#1A5C1A', textDecoration: 'underline' }}>www.autoriteprotectiondonnees.be</a>
            </p>
          </div>
        </section>

        {/* 11. Modifications */}
        <section>
          <h2 style={sectionTitleStyle}>
            {t('11. Modifications de cette politique', '11. Changes to this policy')}
          </h2>
          <p>
            {t(
              `${COMPANY_NAME} se réserve le droit de modifier cette politique de cookies à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour actualisée. Nous vous encourageons à consulter régulièrement cette page.`,
              `${COMPANY_NAME} reserves the right to modify this cookie policy at any time. Any changes will be published on this page with an updated date. We encourage you to check this page regularly.`
            )}
          </p>
        </section>
      </div>
    </div>
  )
}
