import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/layout/Nav'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { ROUTES } from '../constants'
import { useCatalogue } from '../hooks/useCatalogue'
import { useSiteSettings } from '../hooks/useSiteSettings'

const FALLBACK_CARGO = 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=80'
const FALLBACK_VOLAILLE = 'assets/product-volaille.png'
const FALLBACK_POISSONS = 'assets/product-poissons.png'
const FALLBACK_OIGNONS  = 'assets/product-oignons-rouges-gala.png'

function Photo({
  image,
  label,
  ratio = '4 / 3',
  objectPosition = 'center',
  dark = false,
  style = {},
}: {
  image?: string
  label: string
  ratio?: string
  objectPosition?: string
  dark?: boolean
  style?: React.CSSProperties
}) {
  const [portrait, setPortrait] = useState(false)
  const stripeColor = dark ? 'rgba(242,247,242,0.07)' : 'rgba(15,61,20,0.08)'
  const bgColor = dark ? '#0F3D14' : '#EEF2EE'
  const textColor = dark ? 'rgba(242,247,242,0.85)' : 'rgba(15,61,20,0.55)'

  if (image) {
    return (
      <div
        className="fg-card-img-wrap"
        style={{ width: '100%', aspectRatio: ratio, position: 'relative', overflow: 'hidden', background: portrait ? bgColor : 'transparent', ...style }}
      >
        <img
          className="fg-card-img"
          src={image}
          alt={label}
          onLoad={(e) => {
            const img = e.currentTarget
            setPortrait(img.naturalHeight > img.naturalWidth)
          }}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: portrait ? 'contain' : 'cover', objectPosition: portrait ? 'center' : objectPosition, display: 'block' }}
        />
      </div>
    )
  }
  return (
    <div
      className="fg-card-img-wrap"
      style={{ width: '100%', aspectRatio: ratio, background: bgColor, position: 'relative', overflow: 'hidden', ...style }}
    >
      <div
        className="fg-card-img"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, transparent 0 7px, ${stripeColor} 7px 8px)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20,
        }}
      >
        <span
          className="fg-mono"
          style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: textColor, textAlign: 'center', fontWeight: 500, lineHeight: 1.5 }}
        >
          {label}
        </span>
      </div>
    </div>
  )
}

export default function Home() {
  const { t, language } = useLanguage()
  const { departments } = useCatalogue()
  const { settings } = useSiteSettings()
  const isMobile = useIsMobile()

  const heroCargo = settings['home_hero_cargo'] || FALLBACK_CARGO
  const photoVolaille = settings['home_photo_1'] || FALLBACK_VOLAILLE
  const photoPoissons = settings['home_photo_2'] || FALLBACK_POISSONS
  const photoOignons  = settings['home_photo_3'] || FALLBACK_OIGNONS

  const stats = [
    { value: '2013', label: t('fondée à Bruxelles', 'founded in Brussels'), sub: t('siège social · Uccle', 'head office · Uccle') },
    { value: '4', label: t('départements', 'departments'), sub: t('congelé · agri · intrants · PKO', 'frozen · agri · inputs · PKO') },
    { value: t('Monde', 'Worldwide'), label: t('pays desservis', 'countries served'), sub: t('export multi-incoterms', 'multi-incoterm export') },
    { value: '48 h', label: t('délai de cotation', 'quotation lead time'), sub: t('du brief au prix indicatif', 'from brief to indicative price') },
  ]

  const processSteps = [
    { n: '01', title: t('Sourcer', 'Source'), body: t('Producteurs, abattoirs et transformateurs identifiés, audits documentaires, échantillons avant lot.', 'Producers, slaughterhouses and processors identified, document audits, samples before each lot.') },
    { n: '02', title: t('Agréger', 'Aggregate'), body: t('Consolidation des lots, contrôle qualité documentaire, mise en conformité export et palettisation.', 'Lot consolidation, documentary quality control, export-compliance and palletisation.') },
    { n: '03', title: t('Expédier', 'Ship'), body: t("Conteneur reefer ou sec, documents douaniers, suivi jusqu'au port d'arrivée.", 'Reefer or dry container, customs documents, tracking to the port of arrival.') },
  ]

  const px = isMobile ? 20 : 64

  return (
    <div style={{ position: 'relative', backgroundColor: '#FAFAF8' }}>
      <Nav dark />

      {/* ── HERO ── */}
      <section style={{ background: '#0F3D14', color: '#fff', padding: `${isMobile ? 120 : 220}px ${px}px 0`, position: 'relative' }}>
        <div className="fg-eyebrow dark">↗ 01 / 06 · {t('Maison', 'House')}</div>
        <h1
          className="fg-fr"
          style={{ fontSize: 'clamp(48px, 10vw, 144px)', margin: '40px 0 0', fontWeight: 400, color: '#fff', maxWidth: 1180, letterSpacing: '-0.04em', lineHeight: 0.92 }}
        >
          {t('Négoce', 'Agri-food')}{' '}
          <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>
            {t('agro-alimentaire,', 'trading,')}
          </span>{' '}
          {t('depuis Bruxelles', 'out of Brussels')}
        </h1>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 64, marginTop: isMobile ? 40 : 72, alignItems: 'end', paddingBottom: isMobile ? 48 : 80 }}>
          <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.55, color: 'rgba(255,255,255,0.72)', margin: 0, maxWidth: 480 }}>
            {t(
              'Fagou achète, agrège et expédie. Quatre départements, un seul interlocuteur, des cotations sous 48 heures, vers le monde entier.',
              'Fagou sources, aggregates and ships. Four departments, one direct contact, quotations within 48 hours, worldwide.'
            )}
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to={ROUTES.PRODUCTS} className="btn-light">{t('Catalogue', 'Catalogue')} →</Link>
            <a href="catalogue_fagou.pdf" download className="btn-ghost dark">{t('Télécharger le catalogue (PDF)', 'Download catalogue (PDF)')}</a>
          </div>
        </div>
        {/* Full-bleed cargo ship */}
        <div style={{ marginLeft: -px, marginRight: -px, position: 'relative' }}>
          <Photo
            image={heroCargo}
            label={t('porte-conteneurs · port d\'anvers', 'container ship · port of antwerp')}
            ratio={isMobile ? '4 / 3' : '21 / 9'}
            dark
            objectPosition="center 55%"
          />
          <div style={{ position: 'absolute', left: px, bottom: 28 }}>
            <span
              className="fg-mono"
              style={{ fontSize: 10, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.16em', textTransform: 'uppercase', background: 'rgba(15,61,20,0.6)', padding: '6px 12px', backdropFilter: 'blur(4px)' }}
            >
              {t("porte-conteneurs · port d'anvers", 'container ship · port of antwerp')}
            </span>
          </div>
        </div>
      </section>

      {/* ── STATS ROW ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: isMobile ? '28px 20px' : '40px 36px',
              borderRight: isMobile ? (i % 2 === 0 ? '1px solid #E5E7EB' : 'none') : (i < 3 ? '1px solid #E5E7EB' : 'none'),
              borderBottom: isMobile && i < 2 ? '1px solid #E5E7EB' : 'none',
            }}
          >
            <div className="fg-fr" style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1, color: '#1A1A1A' }}>
              {s.value}
            </div>
            <div style={{ fontSize: 13, color: '#1A1A1A', marginTop: 10, fontWeight: 500 }}>{s.label}</div>
            <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', marginTop: 6, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* ── DEPARTMENTS GRID ── */}
      <section style={{ padding: `${isMobile ? 64 : 120}px ${px}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 64, alignItems: 'end', marginBottom: isMobile ? 40 : 64 }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Catalogue', 'Catalogue')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 4vw, 64px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Quatre départements,', 'Four departments,')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('une seule maison.', 'one house.')}</span>
            </h2>
          </div>
          <div style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: '#6B7280', margin: 0 }}>
              {t(
                'Du carton de 25 kg au flexitank, nous opérons sur quatre lignes complémentaires.',
                'From the 25 kg case to the flexitank, we operate four complementary lines.'
              )}
            </p>
            <a href="catalogue_fagou.pdf" download className="btn-ghost" style={{ marginTop: 20, display: 'inline-flex' }}>
              {t('Télécharger le catalogue PDF', 'Download catalogue PDF')}
            </a>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 20 : 32 }}>
          {departments.map((d) => (
            <Link
              key={d.id}
              to={ROUTES.PRODUCTS}
              className="fg-card"
              style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <Photo
                image={d.cover}
                label={language === 'fr' ? (d.coverAltFr ?? '') : (d.coverAltEn ?? '')}
                ratio="16 / 10"
              />
              <div style={{ padding: isMobile ? '24px 20px 28px' : '32px 36px 36px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                  <span className="fg-mono" style={{ fontSize: 11, color: '#1A5C1A', letterSpacing: '0.16em' }}>↗ {d.code}</span>
                  <span className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    {d.products.length} {t('références', 'references')}
                  </span>
                </div>
                <h3 className="fg-fr" style={{ fontSize: isMobile ? 30 : 38, margin: 0, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.02 }}>
                  {language === 'fr' ? d.nameFr : d.nameEn}
                </h3>
                <p style={{ fontSize: 14, color: '#6B7280', margin: '14px 0 18px', lineHeight: 1.55 }}>
                  {language === 'fr' ? d.ledeFr : d.ledeEn}
                </p>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid #E5E7EB' }}>
                  {d.products.map((p) => (
                    <li
                      key={p.code}
                      className="fg-mono"
                      style={{ fontSize: 11, padding: '12px 0', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', letterSpacing: '0.04em', color: '#1A1A1A' }}
                    >
                      <span>{language === 'fr' ? p.nameFr : p.nameEn}</span>
                      <span style={{ color: '#6B7280' }}>{p.code}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ padding: `${isMobile ? 64 : 120}px ${px}px`, background: '#fff', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ marginBottom: isMobile ? 40 : 56 }}>
          <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Notre façon de négocier', 'How we trade')}</div>
          <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 4vw, 64px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
            {t('Sourcer,', 'Source,')}{' '}
            <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('agréger, expédier.', 'aggregate, ship.')}</span>
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 0 : 48, borderTop: '1px solid #E5E7EB' }}>
          {processSteps.map((step, i) => (
            <div
              key={i}
              style={{
                paddingTop: 32,
                paddingBottom: isMobile ? 32 : 0,
                borderRight: !isMobile && i < 2 ? '1px solid #E5E7EB' : 'none',
                borderBottom: isMobile && i < 2 ? '1px solid #E5E7EB' : 'none',
                paddingRight: !isMobile && i < 2 ? 32 : 0,
              }}
            >
              <div className="fg-mono" style={{ fontSize: 11, color: '#1A5C1A', letterSpacing: '0.16em', marginBottom: 24 }}>↗ {step.n}</div>
              <h3 className="fg-fr" style={{ fontSize: 44, margin: 0, fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1 }}>{step.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: '#6B7280', marginTop: 18 }}>{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRODUCT PHOTO BAND ── */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)' }}>
        <Photo image={photoVolaille} label={t('volaille · découpes fraîches', 'poultry · fresh cuts')} ratio={isMobile ? '3 / 2' : '4 / 3'} />
        <Photo image={photoPoissons} label={t('poissons · sur glace', 'fish · on ice')} ratio={isMobile ? '3 / 2' : '4 / 3'} />
        <Photo image={photoOignons} label={t('oignons rouges · sacs gala', 'red onions · gala bags')} ratio={isMobile ? '3 / 2' : '4 / 3'} />
      </div>

      {/* ── FINAL CTA ── */}
      <section style={{ background: '#1A5C1A', color: '#fff', padding: `${isMobile ? 72 : 128}px ${px}px` }}>
        <div className="fg-eyebrow dark" style={{ marginBottom: 36 }}>↗ {t('Parler à Fagou', 'Talk to Fagou')}</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'end' }}>
          <h2
            className="fg-fr"
            style={{ fontSize: 'clamp(40px, 6vw, 88px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96, color: '#fff' }}
          >
            {t('Une demande,', 'One inquiry,')}{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
              {t('une cotation sous 48 h.', 'one quote within 48 h.')}
            </span>
          </h2>
          <div>
            <p style={{ fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', marginBottom: 28 }}>
              {t(
                "Décrivez votre besoin (département, volume, destination, incoterm). Nous revenons avec un prix indicatif et un planning d'expédition.",
                'Describe your need (department, volume, destination, incoterm). We come back with an indicative price and a shipping window.'
              )}
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to={ROUTES.CONTACT} className="btn-light">{t('Nous écrire', 'Get in touch')} →</Link>
              <a href="catalogue_fagou.pdf" download className="btn-ghost dark">{t('Télécharger le catalogue (PDF)', 'Download catalogue (PDF)')}</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
