import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Nav } from '../components/layout/Nav'
import { FagouLogo } from '../components/common/FagouLogo'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { ROUTES } from '../constants'
import { useCatalogue } from '../hooks/useCatalogue'
import { useSiteSettings } from '../hooks/useSiteSettings'
import { supabase } from '../lib/supabase'
import { TiltCard } from '../components/common/TiltCard'

interface Brand { id: string; name: string; logo: string; logo_max_height: string; logo_max_width: string; sort_order: number }

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('sr-visible'); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

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
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    supabase.from('brands').select('id, name, logo, logo_max_height, logo_max_width, sort_order').order('sort_order').then(({ data }) => {
      setBrands((data ?? []) as Brand[])
    })
  }, [])

  const [lineProgress, setLineProgress] = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      const el = refProcess.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (windowH + rect.height)))
      setLineProgress(progress)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const photoVolaille = settings['home_photo_1'] || FALLBACK_VOLAILLE
  const photoPoissons = settings['home_photo_2'] || FALLBACK_POISSONS
  const photoOignons       = settings['home_photo_3'] || FALLBACK_OIGNONS
  const coldStoragePhoto   = settings['coldstorage_hero'] || undefined

  const stats = [
    { value: '2013', label: t('fondée à Bruxelles', 'founded in Brussels'), sub: t('siège social · Rhode-Saint-Genèse', 'head office · Rhode-Saint-Genèse') },
    { value: '5', label: t('départements', 'departments'), sub: t('congelé · agro · intrants · PKO', 'frozen · agro · inputs · PKO') },
    { value: t('Monde', 'Worldwide'), label: t('pays desservis', 'countries served'), sub: t('export multi-incoterms', 'multi-incoterm export') },
    { value: '48 h', label: t('délai de cotation', 'quotation lead time'), sub: t('du brief au prix indicatif', 'from brief to indicative price') },
  ]

  const processSteps = [
    { n: '01', title: t('Sourcer', 'Source'), body: t('Producteurs, abattoirs et transformateurs identifiés, audits documentaires, échantillons avant lot.', 'Producers, slaughterhouses and processors identified, document audits, samples before each lot.') },
    { n: '02', title: t('Agréger', 'Aggregate'), body: t('Consolidation des lots, contrôle qualité documentaire, mise en conformité export et palettisation.', 'Lot consolidation, documentary quality control, export-compliance and palletisation.') },
    { n: '03', title: t('Expédier', 'Ship'), body: t("Conteneur reefer ou sec, documents douaniers, suivi jusqu'au port d'arrivée.", 'Reefer or dry container, customs documents, tracking to the port of arrival.') },
  ]

  const px = isMobile ? 20 : 64

  const refStats        = useReveal(0.15)
  const refDepts        = useReveal(0.08)
  const refCold         = useReveal(0.1)
  const refBrands       = useReveal(0.1)
  const refTestimonials = useReveal(0.1)
  const refProcess      = useReveal(0.1)
  const refPhotos       = useReveal(0.1)
  const refCta          = useReveal(0.1)

  const testimonials = [
    {
      quote: t(
        'Fagou est notre partenaire de référence pour l\'approvisionnement en volaille et produits congelés. Qualité constante, documentation irréprochable, livraisons dans les délais.',
        'Fagou is our go-to partner for poultry and frozen product sourcing. Consistent quality, flawless documentation, on-time deliveries.',
      ),
      name: 'Groupe Alimentaire Kongo',
      role: t('Distributeur', 'Distributor'),
      country: 'RDC',
    },
    {
      quote: t(
        'Nous collaborons avec Fagou depuis plusieurs années. Sérieux, réactifs, cotations dans les délais annoncés — un interlocuteur fiable pour nos achats à l\'international.',
        "We've worked with Fagou for several years. Reliable, responsive, quotations within the announced timelines — a trusted partner for our international procurement.",
      ),
      name: 'Ivoire Import SARL',
      role: t('Importateur', 'Importer'),
      country: "Côte d'Ivoire",
    },
    {
      quote: t(
        'Excellent partenaire pour nos besoins en oignons et ail en grande quantité. Traçabilité exemplaire et parfaite maîtrise des incoterms export.',
        'Excellent partner for our large-volume onion and garlic needs. Exemplary traceability and perfect command of export incoterms.',
      ),
      name: 'Trans-Afric Commerce',
      role: t('Négoce', 'Trading'),
      country: 'Gabon',
    },
  ]

  return (
    <div style={{ position: 'relative', backgroundColor: '#FAFAF8', overflowX: 'hidden' }}>
      <Nav dark />

      {/* ── HERO ── */}
      <section style={{ background: 'linear-gradient(160deg, rgba(10,45,12,0.92) 0%, rgba(15,61,20,0.85) 50%, rgba(26,92,26,0.80) 100%)', color: '#fff', padding: `${isMobile ? 120 : 220}px ${px}px 0`, position: 'relative', overflow: 'hidden' }}>
        {/* Decorative floating orbs — enhanced */}
        <div className="fg-float-slow" style={{ position: 'absolute', top: '10%', right: isMobile ? '-10%' : '5%', width: isMobile ? 200 : 400, height: isMobile ? 200 : 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 60%)', pointerEvents: 'none', filter: 'blur(1px)' }} />
        <div className="fg-float" style={{ position: 'absolute', top: '35%', right: isMobile ? '5%' : '20%', width: isMobile ? 100 : 180, height: isMobile ? 100 : 180, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
        <div className="fg-float-slow" style={{ position: 'absolute', bottom: '20%', left: '-5%', width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,139,46,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.03) 0%, transparent 50%)', pointerEvents: 'none' }} />

        <div className="fg-slide-up" style={{ position: 'relative', zIndex: 1 }}>
          <div className="fg-eyebrow dark" style={{ animationDelay: '100ms' }}>↗ 01 / 06 · {t('Maison', 'House')}</div>

          {/* FAGOU logo + identity — prominent and clearly visible */}
          <div style={{ marginTop: 32, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
            <FagouLogo size={isMobile ? 44 : 60} dark />
            <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: 20 }}>
              <div className="fg-mono" style={{ fontSize: isMobile ? 10 : 12, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>
                {t('Négoce agro-alimentaire', 'Agro-food trading')}
              </div>
              <div className="fg-mono" style={{ fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', marginTop: 4 }}>
                {t('Bruxelles, Belgique · Depuis 2013', 'Brussels, Belgium · Since 2013')}
              </div>
            </div>
          </div>

          <h1
            className="fg-fr"
            style={{ fontSize: 'clamp(48px, 10vw, 144px)', margin: 0, fontWeight: 400, color: '#fff', maxWidth: 1200, letterSpacing: '-0.045em', lineHeight: 0.90 }}
          >
            {t('Négoce', 'Agro-food')}{' '}
            <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>
              {t('agro-alimentaire,', 'trading,')}
            </span>{' '}
            {t('depuis Bruxelles', 'out of Brussels')}
          </h1>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 64, marginTop: isMobile ? 40 : 72, alignItems: 'end', paddingBottom: isMobile ? 48 : 80 }}>
            <p style={{ fontSize: isMobile ? 16 : 18, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: 480 }}>
              {t(
                'Fagou achète, agrège et expédie. Cinq départements, un seul interlocuteur, des cotations sous 48 heures, vers le monde entier.',
                'Fagou sources, aggregates and ships. Five departments, one direct contact, quotations within 48 hours, worldwide.'
              )}
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to={ROUTES.PRODUCTS} className="btn-light">{t('Catalogue', 'Catalogue')} →</Link>
              <a href="catalogue_fagou.pdf" download className="btn-ghost dark">{t('Télécharger le catalogue (PDF)', 'Download catalogue (PDF)')}</a>
            </div>
          </div>
        </div>

      </section>

      {/* ── STATS ROW ── */}
      <div
        ref={refStats}
        className="sr"
        style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className={`fg-stat fg-stat-d${i + 1}`}
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
      <section ref={refDepts} className="sr" style={{ padding: `${isMobile ? 64 : 120}px ${px}px` }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 24 : 64, alignItems: 'end', marginBottom: isMobile ? 40 : 64 }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Catalogue', 'Catalogue')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 4vw, 64px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Cinq départements,', 'Five departments,')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('une seule maison.', 'one house.')}</span>
            </h2>
          </div>
          <div style={{ marginBottom: 8 }}>
            <p style={{ fontSize: 16, lineHeight: 1.55, color: '#6B7280', margin: 0 }}>
              {t(
                'Du carton de 25 kg au flexitank, nous opérons sur cinq lignes complémentaires.',
                'From the 25 kg case to the flexitank, we operate five complementary lines.'
              )}
            </p>
            <a href="catalogue_fagou.pdf" download className="btn-ghost" style={{ marginTop: 20, display: 'inline-flex' }}>
              {t('Télécharger le catalogue PDF', 'Download catalogue PDF')}
            </a>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: isMobile ? 20 : 32 }}>
          {departments.map((d) => (
            <TiltCard
              key={d.id}
              intensity={isMobile ? 0 : 5}
              style={{ borderRadius: 10, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <Link
                to={`${ROUTES.PRODUCTS}?dept=${d.id}`}
                className="fg-card fg-card-3d"
                style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, overflow: 'hidden', textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
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
            </TiltCard>
          ))}
        </div>
      </section>

      {/* ── COLD STORAGE TEASER ── */}
      <section ref={refCold} className="sr" style={{ background: '#0F3D14', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }} />
        {/* Animated glow */}
        <div className="fg-float-slow" style={{ position: 'absolute', top: '-20%', right: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', position: 'relative', zIndex: 1 }}>
          <div style={{ padding: isMobile ? `56px ${px}px` : `80px ${px}px`, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="fg-eyebrow dark" style={{ marginBottom: 20 }}>↗ 03 · {t('Chambre froide', 'Cold storage')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 3.5vw, 56px)', fontWeight: 400, color: '#fff', margin: '0 0 20px', letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Froid industriel,', 'Industrial cold,')}{' '}
              <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>
                {t('depuis Bruxelles.', 'from Brussels.')}
              </span>
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: 'rgba(255,255,255,0.55)', maxWidth: 400, margin: '0 0 36px' }}>
              {t(
                'FAGOU a fourni et installé une chambre froide industrielle de 3 100 t au Congo — de −24 °C à l\'ambiant, sur 2 927 m² de panneaux.',
                'FAGOU supplied and installed a 3,100-t industrial cold storage in Congo — from −24 °C to ambient, across 2,927 m² of panels.'
              )}
            </p>
            <div style={{ display: 'flex', gap: 32, marginBottom: 40, flexWrap: 'wrap' }}>
              {[
                { v: '3 100 t', l: t('capacité', 'capacity') },
                { v: '−24 °C', l: t('surgélation', 'deep freeze') },
                { v: '2 927 m²', l: t('surface', 'panel area') },
              ].map((s, i) => (
                <div key={s.v} style={{ position: 'relative' }}>
                  {i > 0 && <div style={{ position: 'absolute', left: -16, top: '15%', height: '70%', width: 1, background: 'rgba(255,255,255,0.12)' }} />}
                  <div className="fg-fr" style={{ fontSize: 30, color: '#fff', lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
                  <div className="fg-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div>
              <Link to={ROUTES.COLD} className="btn-light">{t('Voir la chambre froide', 'View cold storage')} →</Link>
            </div>
          </div>
          <div style={{ position: 'relative', height: isMobile ? 280 : 'auto', overflow: 'hidden' }}>
            {coldStoragePhoto ? (
              <>
                <img
                  src={coldStoragePhoto}
                  alt={t('Chambre froide installée par FAGOU · Congo', 'Cold storage installed by FAGOU · Congo')}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,61,20,0.4) 0%, transparent 40%)', pointerEvents: 'none' }} />
              </>
            ) : (
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 7px, rgba(255,255,255,0.03) 7px 8px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="fg-mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                  {t('chambre froide · lcc congo', 'cold storage · lcc congo')}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── BRANDS TEASER ── */}
      <section ref={refBrands} className="sr" style={{ padding: `${isMobile ? 56 : 96}px ${px}px`, background: '#FAFAF8', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 32 : 80, alignItems: 'center' }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Marques distribuées', 'Distributed brands')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(32px, 3.5vw, 56px)', margin: '0 0 20px', fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Des marques', 'Brands we')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('que nous distribuons.', 'proudly distribute.')}</span>
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: '#6B7280', margin: '0 0 32px', maxWidth: 420 }}>
              {t(
                'FAGOU distribue une sélection de marques agro-alimentaires reconnues sur les marchés africains. Mayonnaise, condiments, produits secs — des références que vos clients connaissent.',
                'FAGOU distributes a selection of agri-food brands recognised across African markets. Mayonnaise, condiments, dry goods — references your customers already know.'
              )}
            </p>
            <Link to={ROUTES.BRANDS} className="btn-primary">
              {t('Découvrir les marques', 'Discover the brands')} →
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
            {brands.map((brand) => (
              <TiltCard
                key={brand.id}
                intensity={isMobile ? 0 : 6}
                style={{ borderRadius: 10 }}
              >
                <Link
                  to={ROUTES.BRANDS}
                  style={{
                    background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10,
                    padding: '28px 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', minHeight: 110,
                    transition: 'border-color 250ms ease, box-shadow 250ms ease, background 250ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = '#1A5C1A'
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(26,92,26,0.10)'
                    e.currentTarget.style.background = '#F7FAF7'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = '#E5E7EB'
                    e.currentTarget.style.boxShadow = 'none'
                    e.currentTarget.style.background = '#fff'
                  }}
                >
                  {brand.logo ? (
                    <img src={brand.logo} alt={brand.name} style={{ maxHeight: brand.logo_max_height || '80px', maxWidth: brand.logo_max_width || '160px', objectFit: 'contain', display: 'block' }} />
                  ) : (
                    <span className="fg-fr" style={{ fontSize: 22, fontWeight: 400, color: '#1A1A1A', letterSpacing: '-0.02em' }}>{brand.name}</span>
                  )}
                </Link>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section ref={refTestimonials} className="sr" style={{ padding: `${isMobile ? 64 : 112}px ${px}px`, background: '#fff', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 16 : 48, alignItems: 'end', marginBottom: isMobile ? 36 : 56 }}>
          <div>
            <div className="fg-eyebrow" style={{ marginBottom: 18 }}>↗ {t('Ils nous font confiance', 'They trust us')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(28px, 3.5vw, 56px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96 }}>
              {t('Ce que disent', 'What our')}{' '}
              <span style={{ fontStyle: 'italic', color: '#6B7280' }}>{t('nos clients.', 'clients say.')}</span>
            </h2>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: '#6B7280', margin: 0 }}>
            {t(
              'Des partenaires en Afrique centrale et de l\'Ouest qui nous font confiance pour leur approvisionnement agroalimentaire.',
              'Partners across Central and West Africa who trust us for their agro-food procurement.'
            )}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? 20 : 24 }}>
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="fg-card-3d"
              style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: isMobile ? '28px 24px' : '40px 36px', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${i === 0 ? '#1A5C1A' : i === 1 ? '#2E8B2E' : '#0F3D14'}, transparent)` }} />
              <div style={{ display: 'flex', gap: 3, marginBottom: 24 }}>
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: '#1A5C1A', fontSize: 14, lineHeight: 1 }}>★</span>
                ))}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.8, color: '#1A1A1A', margin: '0 0 28px', fontStyle: 'italic', flex: 1, letterSpacing: '-0.01em' }}>
                «{item.quote}»
              </p>
              <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 18 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#1A1A1A', lineHeight: 1.3 }}>{item.name}</div>
                <div className="fg-mono" style={{ fontSize: 10, color: '#6B7280', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: 6 }}>
                  {item.role} · {item.country}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section ref={refProcess} className="sr" style={{ padding: `${isMobile ? 64 : 120}px ${px}px`, background: '#0F3D14', position: 'relative', overflow: 'hidden' }}>
        {/* Dot grid */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        {/* Ambient glow */}
        <div className="fg-float-slow" style={{ position: 'absolute', top: '-20%', left: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,139,46,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? 56 : 96, position: 'relative', zIndex: 1, alignItems: 'start' }}>

          {/* LEFT — sticky heading */}
          <div style={{ position: isMobile ? 'static' : 'sticky', top: 80 }}>
            <div className="fg-eyebrow dark" style={{ marginBottom: 24 }}>↗ {t('Notre façon de négocier', 'How we trade')}</div>
            <h2 className="fg-fr" style={{ fontSize: 'clamp(44px, 5vw, 80px)', margin: '0 0 32px', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.92, color: '#fff' }}>
              {t('Sourcer,', 'Source,')}<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.32)' }}>{t('agréger,', 'aggregate,')}</span><br />
              {t('expédier.', 'ship.')}
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.42)', maxWidth: 360, margin: 0 }}>
              {t(
                "Trois étapes, zéro intermédiaire. Du sourcing au port d'arrivée, FAGOU pilote chaque maillon de la chaîne.",
                "Three steps, zero intermediary. From sourcing to the port of arrival, FAGOU drives every link of the chain."
              )}
            </p>
          </div>

          {/* RIGHT — vertical timeline */}
          <div style={{ position: 'relative' }}>
            {/* Animated vertical line (desktop only) */}
            {!isMobile && (
              <div style={{ position: 'absolute', left: 14, top: 20, bottom: 20, width: 11, zIndex: 2 }}>
                {/* Track dim */}
                <div style={{ position: 'absolute', left: 5, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.08)' }} />
                {/* Active fill */}
                <div style={{
                  position: 'absolute', left: 5, top: 0, width: 1,
                  height: `${lineProgress * 100}%`,
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.15))',
                  transition: 'height 60ms linear',
                }} />
                {/* Glowing cursor dot */}
                <div style={{
                  position: 'absolute', left: 0,
                  top: `${lineProgress * 100}%`,
                  transform: 'translateY(-50%)',
                  width: 11, height: 11,
                  borderRadius: '50%',
                  background: '#fff',
                  boxShadow: '0 0 0 4px rgba(255,255,255,0.12), 0 0 18px rgba(255,255,255,0.55)',
                  transition: 'top 60ms linear',
                }} />
              </div>
            )}

            {processSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: isMobile ? 24 : 40, marginBottom: i < 2 ? (isMobile ? 48 : 72) : 0, position: 'relative' }}>
                {/* Step circle */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: i === 0 ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid rgba(255,255,255,${i === 0 ? 0.28 : 0.10})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative', zIndex: 1,
                    boxShadow: i === 0 ? '0 0 0 6px rgba(255,255,255,0.04)' : 'none',
                  }}>
                    <span className="fg-mono" style={{ fontSize: 10, color: i === 0 ? '#fff' : 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', fontWeight: 600 }}>{step.n}</span>
                  </div>
                  {/* Mobile connector */}
                  {isMobile && i < 2 && (
                    <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.1)', marginTop: 8 }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ paddingTop: 6 }}>
                  <div className="fg-mono" style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14 }}>
                    {t('Étape', 'Step')} {step.n}
                  </div>
                  <h3 className="fg-fr" style={{ fontSize: isMobile ? 38 : 52, margin: '0 0 18px', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 0.96, color: '#fff' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: 15, lineHeight: 1.78, color: 'rgba(255,255,255,0.48)', margin: 0, maxWidth: 420 }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PRODUCT PHOTO BAND ── */}
      <div ref={refPhotos} className="sr-scale sr" style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', overflow: 'hidden' }}>
        <Photo image={photoVolaille} label={t('volaille · découpes fraîches', 'poultry · fresh cuts')} ratio={isMobile ? '3 / 2' : '4 / 3'} />
        <Photo image={photoPoissons} label={t('poissons · frais & congelés', 'fish · fresh & frozen')} ratio={isMobile ? '3 / 2' : '4 / 3'} />
        <Photo image={photoOignons} label={t('oignons rouges · sacs gala', 'red onions · gala bags')} ratio={isMobile ? '3 / 2' : '4 / 3'} />
      </div>


      {/* ── FINAL CTA ── */}
      <section ref={refCta} className="sr" style={{ background: '#0F3D14', color: '#fff', padding: `${isMobile ? 72 : 128}px ${px}px`, position: 'relative', overflow: 'hidden' }}>
        <div className="fg-float" style={{ position: 'absolute', top: '-30%', right: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="fg-eyebrow dark" style={{ marginBottom: 36 }}>↗ {t('Parler à Fagou', 'Talk to Fagou')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: isMobile ? 32 : 64, alignItems: 'end' }}>
            <h2
              className="fg-fr"
              style={{ fontSize: 'clamp(40px, 6vw, 88px)', margin: 0, fontWeight: 400, letterSpacing: '-0.035em', lineHeight: 0.96, color: '#fff' }}
            >
              {t('Une demande,', 'One inquiry,')}{' '}
              <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>
                {t('une cotation sous 48 h.', 'one quote within 48 h.')}
              </span>
            </h2>
            <div>
              <p style={{ fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>
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
        </div>
      </section>
    </div>
  )
}
