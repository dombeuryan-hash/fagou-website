import { Link } from 'react-router-dom'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { ROUTES } from '../constants'

export default function About() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()

  const products = [
    { label: t('Épices & condiments', 'Spices & condiments'), detail: t('Poivres, curcuma, gingembre, cannelle', 'Peppers, turmeric, ginger, cinnamon'), code: 'EPC' },
    { label: t('Céréales & légumineuses', 'Cereals & legumes'), detail: t('Riz, maïs, soja, lentilles', 'Rice, corn, soy, lentils'), code: 'CER' },
    { label: t('Huiles alimentaires', 'Edible oils'), detail: t('Huile de palme, soja, olive', 'Palm oil, soy oil, olive oil'), code: 'HUI' },
    { label: t('Fruits secs & noix', 'Dried fruits & nuts'), detail: t('Noix de cajou, arachides, amandes', 'Cashews, groundnuts, almonds'), code: 'FSN' },
    { label: t('Produits tropicaux', 'Tropical products'), detail: t('Café, cacao, sucre de canne', 'Coffee, cocoa, cane sugar'), code: 'TRO' },
    { label: t('Conserves & transformés', 'Canned & processed'), detail: t('Tomates, sardines, légumes en conserve', 'Tomatoes, sardines, canned vegetables'), code: 'CON' },
    { label: t('Farines & amidons', 'Flours & starches'), detail: t('Farine de blé, fécule de maïs, manioc', 'Wheat flour, cornstarch, cassava'), code: 'FAR' },
  ]

  const network = [
    { flag: '🇧🇷', country: 'Brésil', countryEn: 'Brazil', products: t('Café, soja, sucre de canne, jus de fruits', 'Coffee, soy, cane sugar, fruit juices') },
    { flag: '🇨🇳', country: 'Chine', countryEn: 'China', products: t('Épices, conserves, ail, produits transformés', 'Spices, canned goods, garlic, processed products') },
    { flag: '🇺🇸', country: 'États-Unis', countryEn: 'United States', products: t('Céréales, maïs, soja, produits bio', 'Cereals, corn, soy, organic products') },
    { flag: '🇳🇬', country: 'Nigéria', countryEn: 'Nigeria', products: t('Huile de palme, noix de cajou, épices locales', 'Palm oil, cashew nuts, local spices') },
    { flag: '🇮🇳', country: 'Inde', countryEn: 'India', products: t('Riz basmati, épices, lentilles, thé', 'Basmati rice, spices, lentils, tea') },
    { flag: '🇪🇸', country: 'Espagne', countryEn: 'Spain', products: t('Huile d\'olive, conserves, fruits', 'Olive oil, canned goods, fruits') },
    { flag: '🇲🇦', country: 'Maroc', countryEn: 'Morocco', products: t('Épices, olives, légumes secs', 'Spices, olives, dried vegetables') },
    { flag: '🇧🇪', country: 'Belgique', countryEn: 'Belgium', products: t('Siège social, distribution Europe', 'Head office, European distribution') },
  ]

  const services = [
    { n: '01', title: t('Sourcing', 'Sourcing'), body: t('Identification et sélection des meilleurs fournisseurs mondiaux pour chaque catégorie de produit.', 'Identification and selection of the best global suppliers for each product category.') },
    { n: '02', title: t('Contrôle qualité', 'Quality control'), body: t('Vérification des certifications et normes alimentaires à chaque étape de la chaîne.', 'Verification of certifications and food standards at every stage of the chain.') },
    { n: '03', title: t('Logistique internationale', 'International logistics'), body: t('Gestion du transport et livraison jusqu\'à destination.', 'Management of transport and delivery to destination.') },
    { n: '04', title: t('Distribution', 'Distribution'), body: t('Mise en relation avec les acheteurs en Europe et dans le monde entier.', 'Connecting with buyers across Europe and worldwide.') },
    { n: '05', title: t('Conseil', 'Advisory'), body: t('Accompagnement des clients dans leurs achats alimentaires à l\'international.', 'Supporting clients in their international food procurement decisions.') },
  ]

  const manifesto = [
    { title: t('Sourcing', 'Sourcing'), body: t('Producteurs choisis pour leur régularité, pas pour leur volume. Audits documentaires, échantillons avant lot.', 'Producers chosen for their consistency, not their volume. Document audits, samples before each lot.') },
    { title: t('Qualité', 'Quality'), body: t('Contrôle physique et documentaire à réception, contre-analyse sur lots sensibles, refus assumé en cas de doute.', 'Physical and documentary check on reception, counter-analysis on sensitive lots, principled refusal when in doubt.') },
    { title: t('Logistique', 'Logistics'), body: t('Réseau de transitaires choisis, conteneurs reefer ou secs, suivi de bout en bout. Pas de sous-traitance opaque.', 'Network of trusted forwarders, reefer or dry containers, end-to-end tracking. No opaque subcontracting.') },
    { title: t('Relation', 'Relationship'), body: t('Un interlocuteur dédié par compte. Réponse sous 48 h, du brief à la facture.', 'A dedicated contact per account. Reply within 48 h, from brief to invoice.') },
  ]

  const commitments = [
    t('Qualité certifiée à chaque livraison', 'Certified quality on every delivery'),
    t('Traçabilité complète des produits', 'Full product traceability'),
    t('Respect des normes alimentaires internationales (ISO, HACCP, EU Food Safety)', 'Compliance with international food standards (ISO, HACCP, EU Food Safety)'),
    t('Partenariats durables avec nos fournisseurs', 'Long-term partnerships with our suppliers'),
    t('Livraison fiable dans les délais convenus', 'Reliable delivery within agreed timelines'),
  ]

  const px = isMobile ? 20 : 64

  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--color-bg)' }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ padding: `${isMobile ? 100 : 180}px ${px}px ${isMobile ? 56 : 88}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div className="fg-eyebrow" style={{ marginBottom: 40 }}>↗ 04 / 06 · {t('Maison', 'About')}</div>
        <h1 className="fg-fr" style={{ fontSize: 'clamp(48px, 9vw, 132px)', margin: 0, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.92 }}>
          {t('Une maison', 'A Belgian')}{' '}
          <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('belge,', 'house,')}</span>{' '}
          {t('depuis 2013.', 'since 2013.')}
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.6, color: '#6B7280', marginTop: 48, maxWidth: 640 }}>
          {t(
            "Fagou a été fondée en 2013 autour d'une idée simple : rendre la nourriture qualitative plus accessible, partout dans le monde.",
            'Fagou was founded in 2013 around a simple idea: making quality food more accessible, anywhere in the world.'
          )}
        </p>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, background: 'transparent', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: isMobile ? 32 : 64, alignItems: 'start' }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Mission', 'Mission')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 5vw, 72px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Connecter', 'Connecting')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('le monde,', 'the world,')}</span>{' '}
              {t('nourrir l\'Europe.', 'feeding Europe.')}
            </h2>
          </div>
          <div style={{ paddingTop: isMobile ? 0 : 8 }}>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#1A1A1A', margin: 0 }}>
              {t(
                "La mission de Fagou est de faciliter l'accès aux meilleurs produits alimentaires du monde en créant des ponts solides entre fournisseurs et clients à travers les continents.",
                "Fagou's mission is to facilitate access to the world's best food products by building solid bridges between suppliers and clients across continents."
              )}
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: '#6B7280', margin: '20px 0 0' }}>
              {t(
                'Nous garantissons qualité, traçabilité et fiabilité à chaque étape de la chaîne d\'approvisionnement.',
                'We guarantee quality, traceability and reliability at every stage of the supply chain.'
              )}
            </p>
          </div>
        </div>
      </section>

      {/* ── HISTOIRE ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: 940 }}>
          <div className="fg-eyebrow" style={{ marginBottom: 24 }}>↗ {t('Histoire & Création', 'History & Founding')}</div>
          <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 5vw, 76px)', margin: '0 0 40px', fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
            {t('Fondée à Bruxelles,', 'Founded in Brussels,')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('ancrée dans le monde.', 'rooted in the world.')}</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 48, borderTop: '1px solid #E5E7EB', paddingTop: 48 }}>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#6B7280', margin: '0 0 20px' }}>
                {t(
                  "Fagou SRL a été créée en Belgique avec pour ambition de devenir un intermédiaire de confiance dans le secteur de l'agroalimentaire international. Dès ses débuts, l'entreprise s'est spécialisée dans l'import-export de produits alimentaires entre l'Europe et l'Afrique, en particulier vers l'Afrique centrale.",
                  'Fagou SRL was founded in Belgium with the ambition to become a trusted intermediary in the international agro-food sector. From its earliest days, the company specialised in the import-export of food products between Europe and Africa, particularly Central Africa.',
                )}
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#6B7280', margin: 0 }}>
                {t(
                  "La mission fondatrice est restée intacte : connecter les meilleurs fournisseurs européens aux marchés africains, avec rigueur documentaire, traçabilité complète et un seul interlocuteur par compte client.",
                  'The founding mission has remained unchanged: connect the best European suppliers to African markets, with documentary rigour, full traceability and a single point of contact per client account.',
                )}
              </p>
            </div>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#6B7280', margin: '0 0 20px' }}>
                {t(
                  "Depuis sa fondation, Fagou n'a cessé de croître, élargissant son réseau de partenaires et de clients sur tous les continents. L'entreprise opère aujourd'hui sur cinq lignes complémentaires — produits congelés, agroalimentaire, ingrédients & conditionnement, huile de palmiste — avec des cotations sous 48 heures.",
                  "Since its founding, Fagou has grown continuously, expanding its network of partners and clients across all continents. The company now operates across five complementary lines — frozen products, agro-food, ingredients & packaging, palm kernel oil — with quotations within 48 hours.",
                )}
              </p>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#6B7280', margin: 0 }}>
                {t(
                  "En 2024, Fagou a également fourni et installé une chambre froide industrielle de 3 100 t au Congo — démontrant sa capacité à aller au-delà du négoce pour accompagner le développement des infrastructures alimentaires africaines.",
                  'In 2024, Fagou also supplied and installed a 3,100-t industrial cold storage facility in Congo — demonstrating its ability to go beyond trading to support the development of African food infrastructure.',
                )}
              </p>
            </div>
          </div>

          {/* Timeline milestones */}
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid #E5E7EB', marginTop: 56 }}>
            {[
              { year: '2013', labelFr: 'Création à Bruxelles', labelEn: 'Founded in Brussels' },
              { year: '2016', labelFr: 'Ouverture export Afrique', labelEn: 'Africa export launch' },
              { year: '2020', labelFr: '5 départements actifs', labelEn: '5 active departments' },
              { year: '2024', labelFr: 'Chambre froide Congo', labelEn: 'Congo cold storage' },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  padding: isMobile ? '28px 0' : '36px 0',
                  paddingRight: !isMobile && i < 3 ? 32 : 0,
                  paddingLeft: !isMobile && i > 0 ? 32 : 0,
                  borderRight: !isMobile && i < 3 ? '1px solid #E5E7EB' : 'none',
                  borderBottom: isMobile && i < 2 ? '1px solid #E5E7EB' : 'none',
                }}
              >
                <div className="fg-fr" style={{ fontSize: 36, fontWeight: 400, letterSpacing: '-0.04em', color: '#1A5C1A', lineHeight: 1 }}>{m.year}</div>
                <div style={{ fontSize: 13, color: '#1A1A1A', marginTop: 10, lineHeight: 1.4 }}>{t(m.labelFr, m.labelEn)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUITS ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, background: 'transparent', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ marginBottom: 56 }}>
          <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Nos Produits', 'Our Products')}</div>
          <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 5vw, 72px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
            {t('Sept gammes,', 'Seven ranges,')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('un sourcing mondial.', 'one global sourcing.')}</span>
          </h2>
        </div>
        <div style={{ borderTop: '1px solid #E5E7EB' }}>
          {products.map((p, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '32px 1fr' : '60px 1fr 1fr 80px',
                gap: isMobile ? 16 : 32,
                padding: '24px 0',
                borderBottom: '1px solid #E5E7EB',
                alignItems: isMobile ? 'start' : 'center',
              }}
            >
              <span className="fg-mono" style={{ fontSize: 11, color: '#6B7280', letterSpacing: '0.14em', paddingTop: isMobile ? 3 : 0 }}>0{i + 1}</span>
              <div>
                <span style={{ fontSize: isMobile ? 16 : 18, color: '#1A1A1A', fontWeight: 500, lineHeight: 1.3, display: 'block' }}>{p.label}</span>
                {isMobile && <span style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.5, display: 'block', marginTop: 4 }}>{p.detail}</span>}
              </div>
              {!isMobile && <span style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.5 }}>{p.detail}</span>}
              {!isMobile && <span className="fg-mono" style={{ fontSize: 10, color: '#1A5C1A', letterSpacing: '0.16em', textAlign: 'right' }}>{p.code}</span>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <Link to={ROUTES.PRODUCTS} className="btn-primary">{t('Voir le catalogue complet', 'Browse full catalogue')} →</Link>
        </div>
      </section>

      {/* ── RÉSEAU INTERNATIONAL ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: isMobile ? 40 : 64, alignItems: 'start' }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Réseau international', 'International network')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 5vw, 72px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Huit pays,', 'Eight countries,')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('tous les continents.', 'every continent.')}</span>
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 0, borderTop: '1px solid #E5E7EB' }}>
            {network.map((n, i) => (
              <div
                key={i}
                style={{
                  padding: '24px 16px 24px 0',
                  borderBottom: '1px solid #E5E7EB',
                  borderRight: i % 2 === 0 ? '1px solid #E5E7EB' : 'none',
                  paddingLeft: i % 2 === 1 ? 16 : 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 20, lineHeight: 1 }}>{n.flag}</span>
                  <span className="fg-fr" style={{ fontSize: isMobile ? 18 : 22, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1 }}>
                    {t(n.country, n.countryEn)}
                  </span>
                </div>
                <p style={{ fontSize: 12, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{n.products}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO 2×2 ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, background: 'transparent', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ marginBottom: 56 }}>
          <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 5vw, 72px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
            {t('Quatre engagements,', 'Four commitments,')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('tenus chaque lot.', 'kept on every lot.')}</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', borderTop: '1px solid #E5E7EB' }}>
          {manifesto.map((m, i) => (
            <div
              key={i}
              style={{
                padding: `48px ${!isMobile && i % 2 === 0 ? 32 : 0}px 48px ${!isMobile && i % 2 === 1 ? 32 : 0}px`,
                borderBottom: '1px solid #E5E7EB',
                borderRight: !isMobile && i % 2 === 0 ? '1px solid #E5E7EB' : 'none',
              }}
            >
              <span className="fg-mono" style={{ fontSize: 11, color: '#1A5C1A', letterSpacing: '0.16em' }}>↗ 0{i + 1}</span>
              <h3 className="fg-fr" style={{ fontSize: 32, margin: '18px 0 16px', fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1.05 }}>{m.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#6B7280', margin: 0, maxWidth: 460 }}>{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CE QUE NOUS FAISONS ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.6fr', gap: isMobile ? 40 : 64, alignItems: 'start' }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Ce que nous faisons', 'What we do')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 5vw, 72px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Cinq métiers,', 'Five trades,')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('une chaîne.', 'one chain.')}</span>
            </h2>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid #E5E7EB' }}>
            {services.map((s, i) => (
              <li
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: isMobile ? 16 : 32,
                  padding: '28px 0',
                  borderBottom: '1px solid #E5E7EB',
                  alignItems: 'start',
                }}
              >
                <span className="fg-mono" style={{ fontSize: 11, color: '#1A5C1A', letterSpacing: '0.16em', paddingTop: 4 }}>↗ {s.n}</span>
                <div>
                  <div className="fg-fr" style={{ fontSize: isMobile ? 24 : 28, fontWeight: 400, letterSpacing: '-0.025em', lineHeight: 1, marginBottom: 10 }}>{s.title}</div>
                  <p style={{ fontSize: 14, lineHeight: 1.6, color: '#6B7280', margin: 0 }}>{s.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, background: 'transparent', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr', gap: isMobile ? 40 : 64, alignItems: 'start' }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Nos engagements', 'Our commitments')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 5vw, 72px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Standards', 'Standards')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('sans compromis.', 'without compromise.')}</span>
            </h2>
          </div>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid #E5E7EB' }}>
            {commitments.map((c, i) => (
              <li
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: isMobile ? 16 : 24,
                  padding: '20px 0',
                  borderBottom: '1px solid #E5E7EB',
                  alignItems: 'baseline',
                }}
              >
                <span className="fg-mono" style={{ fontSize: 11, color: '#1A5C1A', letterSpacing: '0.14em' }}>✓ 0{i + 1}</span>
                <span style={{ fontSize: 16, color: '#1A1A1A', lineHeight: 1.5 }}>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── TEAM PLACEHOLDER ── */}
      <div style={{ width: '100%', aspectRatio: isMobile ? '4 / 3' : '16 / 7', background: 'linear-gradient(135deg, #EEF2EE 0%, #E8EDE8 100%)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 7px, rgba(15,61,20,0.06) 7px 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(26,92,26,0.1)', border: '1px solid rgba(26,92,26,0.15)', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="fg-mono" style={{ fontSize: 14, color: '#1A5C1A', fontWeight: 500 }}>F</span>
            </div>
            <span className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(15,61,20,0.45)', fontWeight: 500 }}>
              {t('équipe fagou · bureau bruxelles', 'fagou team · brussels office')}
            </span>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section style={{ background: '#0F3D14', color: '#fff', padding: `${isMobile ? 72 : 120}px ${px}px`, position: 'relative', overflow: 'hidden' }}>
        <div className="fg-float-slow" style={{ position: 'absolute', top: '-25%', right: '-8%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'end' }}>
          <h2 className="fg-fr" style={{ fontSize: 'clamp(36px, 5vw, 80px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96, color: '#fff' }}>
            {t('Un projet, ', 'A project, ')}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>{t('une cotation.', 'a quotation.')}</span>
          </h2>
          <div>
            <Link to={ROUTES.CONTACT} className="btn-light">{t('Nous écrire', 'Get in touch')} →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
