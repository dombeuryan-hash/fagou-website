import { Link } from 'react-router-dom'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { useSiteSettings } from '../hooks/useSiteSettings'
import { ROUTES } from '../constants'

const CERTS = ['HACCP', 'ATP · Froid négatif', 'ISO 22000', 'Panneaux LA180 · 180 mm PU']

const SPECS = [
  { labelFr: 'Fournisseur & installateur', labelEn: 'Supplier & installer', value: 'FAGOU SRL · Bruxelles, Belgique' },
  { labelFr: 'Type de panneaux', labelEn: 'Panel type', value: 'LA180 · 180 mm polyuréthane' },
  { labelFr: 'Surface totale panneaux', labelEn: 'Total panel area', value: '2 927 m²' },
  { labelFr: 'Isolant de sol (SPA)', labelEn: 'Floor insulation (SPA)', value: '207 m³' },
  { labelFr: 'Portes isothermes', labelEn: 'Isothermal doors', value: '2 × Pivotante négative 2 200 × 1 200 mm' },
  { labelFr: 'Soupapes équilibrage', labelEn: 'Pressure relief valves', value: 'TS25 × 5 · TS27 × 2' },
  { labelFr: 'Date de livraison', labelEn: 'Delivery date', value: 'Décembre 2021' },
]

const ROOMS = {
  fr: [
    {
      code: 'A',
      name: 'Surgélation',
      temp: '−24 °C',
      volume: '2 200 m³',
      pallets: '≈1 700 palettes EUR',
      content: ['Viandes congelées · bœuf, porc, volaille', 'Poisson IQF · maquereau, sardine', 'Ovoproduits congelés'],
    },
    {
      code: 'B',
      name: 'Réfrigération',
      temp: '+0 / +4 °C',
      volume: '600 m³',
      pallets: '≈450 palettes EUR',
      content: ['Œufs en coquille', 'Lait concentré · produits laitiers', 'Légumes · oignons, ail, pommes de terre'],
    },
    {
      code: 'C',
      name: 'Ambiant / sec',
      temp: '+15 / +20 °C',
      volume: '300 m³',
      pallets: '≈220 palettes EUR',
      content: ['Sauces · mayonnaise, ketchup', 'Huile de palme raffinée', 'Conditionnements export'],
    },
  ],
  en: [
    {
      code: 'A',
      name: 'Deep freeze',
      temp: '−24 °C',
      volume: '2,200 m³',
      pallets: '≈1,700 EUR pallets',
      content: ['Frozen meat · beef, pork, poultry', 'IQF fish · mackerel, sardine', 'Frozen egg products'],
    },
    {
      code: 'B',
      name: 'Refrigeration',
      temp: '+0 / +4 °C',
      volume: '600 m³',
      pallets: '≈450 EUR pallets',
      content: ['Shell eggs', 'Condensed milk · dairy products', 'Vegetables · onions, garlic, potatoes'],
    },
    {
      code: 'C',
      name: 'Ambient / dry',
      temp: '+15 / +20 °C',
      volume: '300 m³',
      pallets: '≈220 EUR pallets',
      content: ['Sauces · mayonnaise, ketchup', 'Refined palm oil', 'Export packaging'],
    },
  ],
}

function Photo({ image, label }: { image?: string; label: string }) {
  if (image) {
    return (
      <div style={{ width: '100%', aspectRatio: '21 / 9', position: 'relative', overflow: 'hidden' }}>
        <img src={image} alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    )
  }
  return (
    <div style={{ width: '100%', aspectRatio: '21 / 9', background: '#EEF2EE', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 7px, rgba(15,61,20,0.08) 7px 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span className="fg-mono" style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(15,61,20,0.55)', fontWeight: 500 }}>{label}</span>
      </div>
    </div>
  )
}

export default function ColdStorage() {
  const { t, language } = useLanguage()
  const { settings } = useSiteSettings()
  const isMobile = useIsMobile()
  const rooms = ROOMS[language]
  const heroImage = settings['coldstorage_hero'] || undefined

  const stats = [
    { value: '3 100', unit: 't', label: t('Capacité totale', 'Total capacity'), sub: t('Réf. FTT & GM', 'Ref. FTT & GM') },
    { value: '−24', unit: '°C', label: t('Surgélation', 'Deep freeze'), sub: language === 'fr' ? 'zone A · 2 200 m³' : 'zone A · 2,200 m³' },
    { value: '2 927', unit: 'm²', label: t('Panneaux LA180', 'LA180 panels'), sub: t('Polyuréthane 180 mm', 'Polyurethane 180 mm') },
    { value: '24/7', unit: '', label: 'Monitoring', sub: t('Groupe électrogène 100 %', '100 % backup genset') },
  ]

  const px = isMobile ? 20 : 64

  return (
    <div style={{ position: 'relative', backgroundColor: 'var(--color-bg)' }}>
      <Nav />

      {/* ── Hero ── */}
      <section style={{ padding: `${isMobile ? 100 : 180}px ${px}px ${isMobile ? 56 : 88}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div className="fg-eyebrow" style={{ marginBottom: 40 }}>
          ↗ 03 / 06 · {t('Chambre froide · équipée par FAGOU', 'Cold storage · equipped by FAGOU')}
        </div>
        <h1
          className="fg-fr"
          style={{ fontSize: 'clamp(48px, 9vw, 132px)', margin: 0, fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.92 }}
        >
          {t('Chambre', 'Cold')}{' '}
          <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('froide,', 'storage,')}</span>{' '}
          {t('au Congo.', 'in Congo.')}
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 32 : 64, marginTop: isMobile ? 32 : 56, alignItems: 'end' }}>
          <p style={{ fontSize: 17, lineHeight: 1.6, color: '#6B7280', margin: 0, maxWidth: 600 }}>
            {t(
              "FAGOU a fourni et installé cette chambre froide industrielle au Congo pour LCC. Équipée avec des panneaux LA180 haute performance, elle garantit la chaîne du froid de −24 °C à l'ambiante pour tous les produits d'import-export.",
              "FAGOU supplied and installed this industrial cold storage facility in Congo for LCC. Equipped with high-performance LA180 panels, it guarantees the cold chain from −24 °C to ambient temperature for all import-export products."
            )}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              {t('Client · opérateur', 'Client · operator')}
            </div>
            <div style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: 18, color: '#1A1A1A' }}>
              LCC — {t('Congo', 'Congo')}
            </div>
            <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 4 }}>
              {t('Fourni & installé par FAGOU SRL', 'Supplied & installed by FAGOU SRL')}
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo principale ── */}
      <Photo image={heroImage} label={t('chambre froide · lcc congo · allée principale', 'cold storage · lcc congo · main aisle')} />

      {/* ── Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: isMobile ? '28px 16px' : '40px 36px',
            borderRight: isMobile ? (i % 2 === 0 ? '1px solid #E5E7EB' : 'none') : (i < 3 ? '1px solid #E5E7EB' : 'none'),
            borderBottom: isMobile && i < 2 ? '1px solid #E5E7EB' : 'none',
          }}>
            <div className="fg-fr" style={{ fontSize: 'clamp(28px, 4vw, 60px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, color: '#1A1A1A' }}>
              {s.value}
              {s.unit && <span style={{ fontSize: '0.45em', letterSpacing: '-0.02em', marginLeft: 4, color: '#6B7280' }}>{s.unit}</span>}
            </div>
            <div style={{ fontSize: 13, color: '#1A1A1A', marginTop: 10, fontWeight: 500 }}>{s.label}</div>
            <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── Trois chambres ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ marginBottom: isMobile ? 40 : 64 }}>
          <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Les chambres', 'The rooms')}</div>
          <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 4vw, 64px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
            {t('Trois zones,', 'Three zones,')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('trois températures.', 'three temperatures.')}</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid #E5E7EB' }}>
          {rooms.map((room, i) => (
            <div
              key={room.code}
              style={{
                padding: `48px 0 48px`,
                paddingRight: !isMobile && i < 2 ? 36 : 0,
                paddingLeft: !isMobile && i > 0 ? 36 : 0,
                borderRight: !isMobile && i < 2 ? '1px solid #E5E7EB' : 'none',
                borderBottom: isMobile && i < 2 ? '1px solid #E5E7EB' : 'none',
              }}
            >
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
                <div style={{
                  width: 40, height: 40,
                  background: i === 0 ? '#0F3D14' : i === 1 ? '#1A5C1A' : '#2E8B2E',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="fg-mono" style={{ fontSize: 12, color: '#fff', fontWeight: 500, letterSpacing: '0.04em' }}>{room.code}</span>
                </div>
                <div>
                  <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase' }}>{t('Zone', 'Zone')} {room.code}</div>
                  <div className="fg-fr" style={{ fontSize: 20, fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.1, color: '#1A1A1A' }}>{room.name}</div>
                </div>
              </div>

              <div className="fg-fr" style={{ fontSize: 'clamp(32px, 3vw, 56px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, color: '#1A1A1A', marginBottom: 20 }}>
                {room.temp}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0, borderTop: '1px solid #E5E7EB', marginBottom: 28 }}>
                {[
                  [t('Volume', 'Volume'), room.volume],
                  [t('Palettes', 'Pallets'), room.pallets],
                ].map(([k, v]) => (
                  <div key={k} style={{ padding: '14px 0', borderBottom: '1px solid #E5E7EB' }}>
                    <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>

              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {room.content.map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: '8px 0', borderBottom: '1px solid #E5E7EB' }}>
                    <span style={{ width: 4, height: 4, background: '#1A5C1A', borderRadius: '50%', flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.45 }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fiche technique ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB', backgroundColor: 'transparent' }}>
        <div style={{ marginBottom: isMobile ? 40 : 64 }}>
          <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Fiche technique', 'Technical specs')}</div>
          <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 4vw, 64px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
            {t('Équipé par', 'Equipped by')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>FAGOU.</span>
          </h2>
          <p style={{ fontSize: 15, color: '#6B7280', marginTop: 20, maxWidth: 560, lineHeight: 1.7 }}>
            {t(
              "Les équipements ont été fournis et installés par FAGOU SRL en décembre 2021.",
              "The equipment was supplied and installed by FAGOU SRL in December 2021."
            )}
          </p>
        </div>

        <div style={{ borderTop: '1px solid #E5E7EB' }}>
          {SPECS.map((spec, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
                gap: isMobile ? 6 : 32,
                padding: '20px 0',
                borderBottom: '1px solid #E5E7EB',
                alignItems: isMobile ? 'start' : 'center',
              }}
            >
              <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                ↗ {language === 'fr' ? spec.labelFr : spec.labelEn}
              </div>
              <div style={{ fontSize: 15, color: '#1A1A1A', fontWeight: 500 }}>{spec.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Certifications + LCC ── */}
      <section style={{ padding: `${isMobile ? 56 : 120}px ${px}px`, borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 48 : 80, alignItems: 'start' }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 40 }}>↗ {t('Normes & certifications', 'Standards & certifications')}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {CERTS.map((cert) => (
                <div key={cert} style={{ border: '1px solid #E5E7EB', borderRadius: 8, padding: '20px 28px', background: '#fff' }}>
                  <div className="fg-mono" style={{ fontSize: 13, fontWeight: 500, letterSpacing: '0.06em', color: '#1A5C1A' }}>{cert}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 24 }}>↗ {t('Opérateur', 'Operator')}</div>
            <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: '28px 32px', background: '#fff', marginBottom: 32 }}>
              <div className="fg-fr" style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.02em', color: '#1A1A1A', marginBottom: 10 }}>LCC</div>
              <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, margin: 0 }}>
                {t(
                  "Logistique · Congo. LCC est l'opérateur de cette chambre froide, acquise auprès de FAGOU SRL. Entreprise indépendante, elle assure la réception, le stockage et la distribution des produits importés sur le territoire congolais.",
                  "Logistics · Congo. LCC is the operator of this cold storage facility, acquired from FAGOU SRL. As an independent company, it handles the reception, storage and distribution of imported products throughout Congo."
                )}
              </p>
            </div>
            <div style={{ height: 1, background: '#E5E7EB', marginBottom: 28 }} />
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#6B7280', margin: '0 0 28px', maxWidth: 420 }}>
              {t(
                "Vous avez un projet de chambre froide industrielle en Afrique ? FAGOU SRL vous accompagne de la fourniture à l'installation.",
                "Do you have an industrial cold storage project in Africa? FAGOU SRL supports you from supply to installation."
              )}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to={ROUTES.CONTACT} className="btn-primary">{t('Nous contacter', 'Get in touch')} →</Link>
              <Link to={ROUTES.CONTACT} className="btn-ghost">{t('Demander un devis', 'Request a quote')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dark CTA ── */}
      <section style={{ background: '#0F3D14', color: '#fff', padding: `${isMobile ? 72 : 120}px ${px}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'end' }}>
          <div>
            <div className="fg-eyebrow dark" style={{ marginBottom: 24 }}>↗ FAGOU · {t('Équipement frigorifique', 'Cold storage equipment')}</div>
            <h2
              className="fg-fr"
              style={{ fontSize: 'clamp(36px, 5vw, 80px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96, color: '#fff' }}
            >
              {t('Besoin de froid', 'Need cold storage')}{' '}
              <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>
                {t('en Afrique ?', 'in Africa?')}
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>
              {t(
                "FAGOU SRL conçoit, fournit et installe des chambres froides industrielles en Afrique. Échangez avec notre équipe pour votre projet.",
                "FAGOU SRL designs, supplies and installs industrial cold storage facilities in Africa. Talk to our team about your project."
              )}
            </p>
            <Link to={ROUTES.CONTACT} className="btn-light" style={{ alignSelf: 'flex-start' }}>
              {t('Parler à notre équipe', 'Talk to our team')} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
