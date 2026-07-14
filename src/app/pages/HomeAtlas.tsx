import '../../styles/atlas.css'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage }          from '../hooks/useLanguage'
import { useSiteSettings }      from '../hooks/useSiteSettings'
import { useCatalogue }         from '../hooks/useCatalogue'
import { useNetworkCountries }  from '../hooks/useNetworkCountries'
import { useTestimonials }      from '../hooks/useTestimonials'
import { useProcessSteps }      from '../hooks/useProcessSteps'
import { useAtlasReveal }       from '../hooks/useAtlasReveal'
import { useAtlasCounters }     from '../hooks/useAtlasCounters'
import { useProcessSpine }      from '../hooks/useProcessSpine'
import { GlobeCanvas }          from '../components/atlas/GlobeCanvas'
import { NetworkMap, type MapNode } from '../components/atlas/NetworkMap'
import type { GlobeConfig, GlobeNode } from '../lib/fagou-globe'
import { supabase } from '../lib/supabase'
import { ROUTES } from '../constants'

// ── Tilt hook for product cards ─────────────────────────────────
function useTilt(deps: unknown[] = []) {
  useEffect(() => {
    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (REDUCED || !window.matchMedia('(min-width:1025px)').matches) return
    const handlers: (() => void)[] = []

    // Product cards (subtle tilt)
    document.querySelectorAll<HTMLElement>('[data-tilt]').forEach(card => {
      const intensity = parseFloat(card.getAttribute('data-tilt') || '5')
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX-r.left)/r.width - 0.5
        const py = (e.clientY-r.top)/r.height  - 0.5
        card.style.transform = `perspective(900px) rotateX(${-py*intensity}deg) rotateY(${px*intensity}deg)`
      }
      const onLeave = () => { card.style.transform = '' }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      handlers.push(() => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) })
    })

    return () => handlers.forEach(h => h())
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

// ── Sticky-stack effect for department cards ────────────────────
// Each card pins below the nav; the next card slides up over it while
// the covered card recedes (scale + dim), à la stacked-panels scroll.
function useCardStack(deps: unknown[] = []) {
  useEffect(() => {
    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (REDUCED) return
    let raf = 0
    const update = () => {
      raf = 0
      const cards = Array.from(document.querySelectorAll<HTMLElement>('.dep-cards .at-card'))
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) { card.style.setProperty('--stack-p', '0'); return }
        const r  = card.getBoundingClientRect()
        const nr = next.getBoundingClientRect()
        // 0 → next card still below · 1 → next card fully covering this one
        const p = Math.min(1, Math.max(0, (r.bottom - nr.top) / r.height))
        card.style.setProperty('--stack-p', p.toFixed(3))
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}

// ── Nav glass on scroll ─────────────────────────────────────────
function useNavGlass(navRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = navRef.current
    if (!el) return
    const onScroll = () => el.classList.toggle('scrolled', window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [navRef])
}

const HUB_NODE = { id:'BE', name:'BELGIUM', lat:50.67, lon:4.36, hub:true as const }

// Fallback nodes — guarantee the globe + map always show the full
// trade-route picture even before (or without) the Supabase seed.
// Once `network_countries` has rows, those take precedence.
const DEFAULT_SOURCES: GlobeNode[] = [
  { id:'IN', name:'INDIA',    lat: 19.07, lon: 72.87 },
  { id:'BR', name:'BRAZIL',   lat:-23.55, lon:-46.63 },
  { id:'TR', name:'TURKEY',   lat: 41.01, lon: 28.97 },
  { id:'US', name:'USA',      lat: 40.71, lon:-74.00 },
  { id:'BG', name:'BULGARIA', lat: 42.70, lon: 23.32 },
  { id:'DE', name:'GERMANY',  lat: 53.55, lon:  9.99 },
]
const DEFAULT_DESTS: GlobeNode[] = [
  { id:'CM', name:'CAMEROON',      lat: 4.05, lon:  9.70 },
  { id:'CG', name:'CONGO',         lat:-4.78, lon: 11.86 },
  { id:'CD', name:'DR CONGO',      lat:-4.32, lon: 15.31 },
  { id:'CI', name:"COTE D'IVOIRE", lat: 5.32, lon: -4.03 },
  { id:'GA', name:'GABON',         lat: 0.39, lon:  9.45 },
]

// Fallback process steps + testimonials so those sections are never empty
// before (or without) the Supabase seed. DB rows take precedence.
const DEFAULT_STEPS = [
  { id:'s1', number:'01', label_fr:'Étape 01 · Brief', label_en:'Step 01 · Brief',
    title_fr:'Dites-nous vos besoins', title_en:'Tell us what you need',
    body_fr:'Envoyez votre liste ou catégorie à notre bureau bruxellois. Nous confirmons disponibilité et devis ferme sous 48 heures.',
    body_en:'Send your product list or category to our Brussels office. We confirm availability and a firm quote within 48 hours.' },
  { id:'s2', number:'02', label_fr:'Étape 02 · Sourcing', label_en:'Step 02 · Source',
    title_fr:'Nous sourçons dans le monde', title_en:'We source worldwide',
    body_fr:'Nous approvisionnons vos produits via notre réseau — Inde, Brésil, Turquie, USA, Bulgarie, Allemagne — et les contrôlons à l\'origine.',
    body_en:'We procure your goods across our network — India, Brazil, Turkey, the USA, Bulgaria, Germany — and quality-check them at origin.' },
  { id:'s3', number:'03', label_fr:'Étape 03 · Consolidation', label_en:'Step 03 · Consolidate',
    title_fr:'Conditionné en Belgique', title_en:'Consolidated in Belgium',
    body_fr:'Les produits convergent vers notre hub belge, où les commandes sont consolidées, contrôlées, conditionnées et chargées — FCL ou LCL, chaîne du froid si nécessaire.',
    body_en:'Goods converge on our Belgian hub, where orders are consolidated, controlled, packed and loaded — FCL or LCL, cold chain when needed.' },
  { id:'s4', number:'04', label_fr:'Étape 04 · Export', label_en:'Step 04 · Export',
    title_fr:'Exporté & livré', title_en:'Exported & delivered',
    body_fr:'Nous gérons documents d\'export et incoterms de bout en bout, et livrons votre marché d\'Afrique centrale et de l\'Ouest, dans les délais.',
    body_en:'We handle export documents and incoterms end-to-end, and deliver to your market in Central & West Africa, on schedule.' },
]

const DEFAULT_TESTIMONIALS = [
  { id:'t1', stars:5, client_name:'La Congolaise de la Congélation', client_country:'RD Congo',
    client_type_fr:'Entreposage froid', client_type_en:'Cold storage',
    quote_fr:'Fagou a aménagé notre chambre froide industrielle de A à Z — des panneaux aux groupes froids. Installation irréprochable, et l\'approvisionnement en surgelés qui a suivi tout aussi fiable.',
    quote_en:'Fagou fitted out our industrial cold room end-to-end — from the panels to the freezing units. Flawless install, and the frozen supply that followed has been just as reliable.' },
  { id:'t2', stars:5, client_name:'Ivoire Import SARL', client_country:'Côte d\'Ivoire',
    client_type_fr:'Importateur', client_type_en:'Importer',
    quote_fr:'Un partenaire fiable depuis plusieurs années. Sérieux, réactifs, cotations dans les délais — un interlocuteur de confiance pour nos achats à l\'international.',
    quote_en:'A reliable partner for several years now. Serious, responsive, quotes delivered on time — a dependable contact for our international purchasing.' },
  { id:'t3', stars:5, client_name:'Trans-Afric Commerce', client_country:'Gabon',
    client_type_fr:'Négoce', client_type_en:'Trade',
    quote_fr:'Excellent pour nos besoins en oignons et ail en grande quantité. Traçabilité exemplaire et vraie maîtrise des incoterms export.',
    quote_en:'Excellent for our bulk onion and garlic needs. Exemplary traceability and a real command of export incoterms.' },
]

interface BrandRow { id:string; name:string; logo:string; logo_max_height:string; logo_max_width:string }

export default function HomeAtlas() {
  const { t, language, setLanguage } = useLanguage()
  const { settings }   = useSiteSettings()
  const { departments } = useCatalogue()
  const { countries }  = useNetworkCountries()
  const { testimonials: dbTestimonials } = useTestimonials()
  const { steps: dbSteps } = useProcessSteps()
  const processSteps = dbSteps.length ? dbSteps : DEFAULT_STEPS
  const testimonials = dbTestimonials.length ? dbTestimonials : DEFAULT_TESTIMONIALS
  const [brands, setBrands] = useState<BrandRow[]>([])
  const [failedLogos, setFailedLogos] = useState<Set<string>>(new Set())
  // Repeat the brand list until the marquee row is long enough to loop seamlessly.
  const brandLoop = brands.length
    ? Array.from({ length: Math.ceil(8 / brands.length) }, () => brands).flat()
    : []

  useEffect(() => {
    supabase.from('brands').select('id,name,logo,logo_max_height,logo_max_width,sort_order').order('sort_order')
      .then(({ data }) => setBrands((data ?? []) as BrandRow[]))
  }, [])

  // Re-scan reveal/counter/spine/tilt whenever async content lands.
  const dataReady = [
    departments.length, countries.length, testimonials.length,
    processSteps.length, brands.length, language,
  ]
  useAtlasReveal(dataReady)
  useAtlasCounters([departments.length, countries.length])
  useProcessSpine([processSteps.length])
  useTilt([departments.length])
  useCardStack([departments.length])

  // nav
  const navRef  = useRef<HTMLElement>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  useNavGlass(navRef)

  // Countries — from DB, falling back to defaults so the globe + network
  // are never empty.
  const dbSources = countries.filter(c => c.type === 'source')
  const dbDests   = countries.filter(c => c.type === 'destination')
  const usingDb   = countries.length > 0

  const globeConfig: GlobeConfig = {
    hub: HUB_NODE,
    sources: usingDb && dbSources.length
      ? dbSources.map(c => ({ id: c.id, name: c.name_en, lat: c.lat, lon: c.lon }))
      : DEFAULT_SOURCES,
    dests: usingDb && dbDests.length
      ? dbDests.map(c => ({ id: c.id, name: c.name_en, lat: c.lat, lon: c.lon }))
      : DEFAULT_DESTS,
  }

  // Chips lists (bilingual) — DB or defaults
  const sources = usingDb && dbSources.length
    ? dbSources.map(c => ({ id: c.id, name: language === 'fr' ? c.name_fr : c.name_en }))
    : DEFAULT_SOURCES.map(c => ({ id: c.id, name: c.name }))
  const dests = usingDb && dbDests.length
    ? dbDests.map(c => ({ id: c.id, name: language === 'fr' ? c.name_fr : c.name_en }))
    : DEFAULT_DESTS.map(c => ({ id: c.id, name: c.name }))

  // Map nodes
  const mapNodes: MapNode[] = [
    { name: 'Belgium', lat: HUB_NODE.lat, lon: HUB_NODE.lon, type: 'hub' },
    ...globeConfig.sources.map(c => ({ name: c.name, lat: c.lat, lon: c.lon, type: 'source' as const })),
    ...globeConfig.dests.map(c   => ({ name: c.name, lat: c.lat, lon: c.lon, type: 'destination' as const })),
  ]

  // Settings helpers
  const s = useCallback((key: string, fallback: string) => settings[key] ?? fallback, [settings])

  const heroEyebrow = language === 'fr'
    ? s('atlas_hero_eyebrow_fr', 'Sourcé dans le monde → Livré en Afrique')
    : s('atlas_hero_eyebrow_en', 'Sourced worldwide → Delivered to Africa')
  const heroTitle   = language === 'fr'
    ? s('atlas_hero_title_fr', 'Des biens qui traversent les continents.')
    : s('atlas_hero_title_en', 'Goods that cross continents.')
  const heroLede    = language === 'fr'
    ? s('atlas_hero_lede_fr', 'Depuis notre hub en Belgique, Fagou source des produits agroalimentaires partout dans le monde.')
    : s('atlas_hero_lede_en', 'From our hub in Belgium, Fagou sources agri-food goods across the globe.')

  const coldEyebrow = t(s('atlas_coldroom_eyebrow_fr','Capacité chaîne du froid'), s('atlas_coldroom_eyebrow_en','Cold-chain capability'))
  const coldTitle   = t(s('atlas_coldroom_title_fr','Froid industriel, livré.'), s('atlas_coldroom_title_en','Industrial cold, delivered.'))
  const coldLede    = t(s('atlas_coldroom_lede_fr','Au-delà des produits, Fagou bâtit l\'infrastructure pour les conserver.'), s('atlas_coldroom_lede_en','Beyond goods, Fagou builds the infrastructure to keep them.'))
  const coldTag     = t(s('atlas_coldroom_tag_fr','Installée · RD Congo'), s('atlas_coldroom_tag_en','Installed · DR Congo'))
  const coldPhoto   = settings['coldstorage_hero'] ?? ''

  const ctaTitle    = t(s('atlas_cta_title_fr','Prêt à expédier depuis la Belgique ?'), s('atlas_cta_title_en','Ready to ship from Belgium?'))
  const ctaLede     = t(s('atlas_cta_lede_fr','Envoyez votre liste de produits. Nous revenons avec disponibilité et devis sous 48 heures.'), s('atlas_cta_lede_en','Send us your product list. We\'ll come back with availability and a quote within 48 hours.'))

  // Stars helper
  const stars = (n: number) => '★'.repeat(n)

  return (
    <div className="atlas-page">
      {/* ── NAV ──────────────────────────────────────────────── */}
      <header className="at-nav" id="at-nav" ref={navRef}>
        <div className="wrap at-nav-in">
          {/* Desktop */}
          <a href="#top" className="at-brand at-desktop-only" aria-label="Fagou home">
            <img className="at-brand-logo" src="/assets/fagou-logo.jpg" alt="Fagou" />
            <span className="at-brand-tag">{t('Belgique · Afrique','Belgium · Africa')}</span>
          </a>
          <nav className="at-nav-links at-desktop-only" aria-label="Primary">
            <Link className="at-nav-link" to={ROUTES.PRODUCTS}>{t('Catalogue','Catalogue')}</Link>
            <Link className="at-nav-link" to={ROUTES.BRANDS}>{t('Marques','Brands')}</Link>
            <Link className="at-nav-link" to={ROUTES.COLD}>{t('Chambre froide','Cold storage')}</Link>
            <Link className="at-nav-link" to={ROUTES.ABOUT}>{t('À propos','About')}</Link>
            <Link className="at-nav-link" to={ROUTES.TERMS}>{t('Conditions','Terms')}</Link>
          </nav>
          <div className="at-nav-right at-desktop-only">
            <div className="at-lang" role="group" aria-label="Language">
              <button type="button" className={language==='en' ? 'active' : ''} onClick={() => setLanguage('en')}>EN</button>
              <button type="button" className={language==='fr' ? 'active' : ''} onClick={() => setLanguage('fr')}>FR</button>
            </div>
            <Link to={ROUTES.CONTACT} className="at-btn at-btn-primary">
              {t('Contact','Get in touch')} <span className="arr">→</span>
            </Link>
          </div>
          {/* Mobile */}
          <div className="at-nav-mobile at-mobile-only">
            <a href="#top" className="at-brand" aria-label="Fagou home">
              <img className="at-brand-logo" src="/assets/fagou-logo.jpg" alt="Fagou" />
            </a>
            <button
              className={`at-hamb ${drawerOpen ? 'open' : ''}`}
              aria-label="Menu" aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(o => !o)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <div className={`at-drawer ${drawerOpen ? 'open' : ''}`}>
          <div className="at-drawer-in">
            <Link to={ROUTES.PRODUCTS} onClick={() => setDrawerOpen(false)}>{t('Catalogue','Catalogue')}</Link>
            <Link to={ROUTES.BRANDS}   onClick={() => setDrawerOpen(false)}>{t('Marques','Brands')}</Link>
            <Link to={ROUTES.COLD}     onClick={() => setDrawerOpen(false)}>{t('Chambre froide','Cold storage')}</Link>
            <Link to={ROUTES.ABOUT}    onClick={() => setDrawerOpen(false)}>{t('À propos','About')}</Link>
            <Link to={ROUTES.TERMS}    onClick={() => setDrawerOpen(false)}>{t('Conditions','Terms')}</Link>
            <div className="at-lang" role="group" style={{ alignSelf:'flex-start', marginTop:18 }}>
              <button type="button" className={language==='en' ? 'active':''} onClick={() => setLanguage('en')}>EN</button>
              <button type="button" className={language==='fr' ? 'active':''} onClick={() => setLanguage('fr')}>FR</button>
            </div>
            <Link to={ROUTES.CONTACT} className="at-btn at-btn-primary" onClick={() => setDrawerOpen(false)}>
              {t('Contact','Get in touch')} <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ── HERO ─────────────────────────────────────────── */}
        <section className="hero wrap">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow r">{heroEyebrow}</p>
              <h1 className="display h1 r d1">
                {heroTitle.split(' ').slice(0,-1).join(' ')}{' '}
                <span className="mut">{heroTitle.split(' ').slice(-1)[0]}</span>
              </h1>
              <p className="lede r d2">{heroLede}</p>
              <div className="hero-cta r d3">
                <a href="#departments" className="at-btn at-btn-primary">
                  {t('Voir les produits','Explore products')} <span className="arr">→</span>
                </a>
                <a href="#network" className="at-btn at-btn-ghost">
                  {t('Notre réseau','Our network')}
                </a>
              </div>
              <div className="hero-mono-row r d4">
                <span className="mono">{t('Depuis 2013 · Belgique','Est. 2013 · Belgium')}</span>
                <span className="mono">·</span>
                <span className="mono">{t('Import & export','Import & export')}</span>
                <span className="mono">·</span>
                <span className="mono">{t('Agroalimentaire','Agri-food')}</span>
              </div>
            </div>
            <div className="hero-stage r r-scale d2">
              <GlobeCanvas config={globeConfig} />
            </div>
          </div>
          <div className="scroll-hint">
            <span className="sh-line" />
            {t('Défiler','Scroll')}
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────── */}
        <section className="wrap section tight" aria-label={t('Chiffres clés','Key figures')}>
          <div className="stats">
            <div className="stat r">
              <div className="stat-num"><span data-count="2013">0</span></div>
              <div className="stat-label mono">{t('Fondée à Bruxelles','Founded in Brussels')}</div>
              <div className="stat-sub mono">{t('Siège · Rhode-Saint-Genèse','Head office · Rhode-Saint-Genèse')}</div>
            </div>
            <div className="stat r d1">
              <div className="stat-num"><span data-count="5">0</span></div>
              <div className="stat-label mono">{t('Lignes de produits','Product lines')}</div>
              <div className="stat-sub mono">{t('Congelé · Agro · Laitier · Huiles · Intrants','Frozen · Agri · Dairy · Oils · Inputs')}</div>
            </div>
            <div className="stat r d2">
              <div className="stat-num"><span data-count="11">0</span></div>
              <div className="stat-label mono">{t('Pays de commerce','Trade countries')}</div>
              <div className="stat-sub mono">{t('6 sourcing · 5 marchés','6 sourcing · 5 destination markets')}</div>
            </div>
            <div className="stat r d3">
              <div className="stat-num"><span data-count="48" data-suffix="h">0</span></div>
              <div className="stat-label mono">{t('Délai de devis','Quote turnaround')}</div>
              <div className="stat-sub mono">{t('De la demande au prix confirmé','From request to confirmed pricing')}</div>
            </div>
          </div>
        </section>

        {/* ── DEPARTMENTS ──────────────────────────────────── */}
        <section className="wrap section" id="departments">
          <div className="dep-grid">
            <div className="dep-head">
              <p className="eyebrow r">{t('Ce que nous échangeons','What we trade')}</p>
              <h2 className="display h2 r d1" style={{ margin:'.3em 0 .4em' }}>
                {t('Cinq lignes produits,','Five product lines,')}<br />
                <span className="mut">{t('une chaîne logistique.','one supply chain.')}</span>
              </h2>
              <p className="lede r d2">
                {t(
                  'Des produits surgelés aux huiles et intrants — chaque ligne gère son propre réseau de sourcing, consolidé en une seule expédition depuis la Belgique.',
                  'From deep-frozen foods to oils and packaging inputs — each line runs its own sourcing network, consolidated into a single shipment from Belgium.'
                )}
              </p>
              <Link to={ROUTES.CONTACT} className="at-btn at-btn-ghost r d3" style={{ marginTop:30, display:'inline-flex' }}>
                {t('Demander un catalogue','Request a catalogue')} <span className="arr">→</span>
              </Link>
            </div>

            <div className="dep-cards">
              {departments.map((dept, i) => {
                return (
                  <Link
                    key={dept.id}
                    to={`${ROUTES.PRODUCTS}?dept=${dept.id}`}
                    className="at-card at-card-wide"
                    style={{ '--stack-i': i } as React.CSSProperties}
                  >
                    <div className="at-card-media">
                      {dept.cover
                        ? <img src={dept.cover} alt={language==='fr' ? (dept.coverAltFr??'') : (dept.coverAltEn??'')} loading="lazy" />
                        : <div className={`ph ${i % 2 === 0 ? 'dark' : ''}`}><span className="mono">{(language==='fr' ? dept.nameFr : dept.nameEn).toUpperCase()}</span></div>
                      }
                    </div>
                    <div className="at-card-body">
                      <div className="at-card-meta">
                        <span className="mono">{String(i+1).padStart(2,'0')}</span>
                        <span className="at-badge at-badge-outline">{dept.code}</span>
                      </div>
                      <h3>{language==='fr' ? dept.nameFr : dept.nameEn}</h3>
                      <p className="lede">{language==='fr' ? dept.ledeFr : dept.ledeEn}</p>
                      <ul className="at-card-list">
                        {dept.products.slice(0,3).map(p => (
                          <li key={p.code}>
                            <span>{language==='fr' ? p.nameFr : p.nameEn}</span>
                            <span className="mono">{p.code}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <hr className="rule wrap" />

        {/* ── NETWORK ──────────────────────────────────────── */}
        <section className="wrap section" id="network">
          <div className="net-grid">
            <div>
              <p className="eyebrow r">{t('Le réseau','The network')}</p>
              <h2 className="display h2 r d1" style={{ margin:'.3em 0 .35em' }}>
                {t('Un hub.','One hub.')}<br />
                <span className="mut">{t('Le monde en commerce.','A world of trade.')}</span>
              </h2>
              <p className="lede r d2">
                {t(
                  'Nous sourçons des produits agroalimentaires sur quatre continents, les consolidons en Belgique, et livrons les marchés d\'Afrique centrale et de l\'Ouest.',
                  'We source agri-food goods across four continents, consolidate them in Belgium, and deliver to markets in Central & West Africa.'
                )}
              </p>

              <div className="flow r d2">
                <div className="flow-group">
                  <div className="flow-h">
                    <span className="flow-ic in">↑</span>
                    <span className="mono">{t('Nous achetons en','We source from')}</span>
                    <span className="flow-n">{String(sources.length).padStart(2,'0')}</span>
                  </div>
                  <ul className="routes">
                    {sources.map(c => (
                      <li key={c.id} className="route in">
                        <span className="from">BRU</span>
                        <span className="conn" />
                        <span className="to">{c.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flow-group">
                  <div className="flow-h">
                    <span className="flow-ic out">↓</span>
                    <span className="mono">{t('Nous livrons au','We deliver to')}</span>
                    <span className="flow-n">{String(dests.length).padStart(2,'0')}</span>
                  </div>
                  <ul className="routes">
                    {dests.map(c => (
                      <li key={c.id} className="route out">
                        <span className="from">BRU</span>
                        <span className="conn" />
                        <span className="to">{c.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="route-note">
                  {t(
                    'Exemples de marchés où nous achetons et revendons — la liste évolue selon les opportunités.',
                    'Examples of markets where we buy and resell — the list evolves with opportunities.'
                  )}
                </p>
              </div>
            </div>

            <NetworkMap nodes={mapNodes} />
          </div>
        </section>

        {/* ── PROCESS (dark) ────────────────────────────────── */}
        <section className="dark-sec section" id="process">
          <div className="orb" style={{ width:520, height:520, top:-160, right:-120 }} />
          <div className="orb" style={{ width:420, height:420, bottom:-160, left:-140, opacity:.6 }} />
          <div className="wrap proc-grid">
            <div className="proc-head">
              <p className="eyebrow on-dark r">{t('Comment ça marche','How it works')}</p>
              <h2 className="display h2 r d1" style={{ margin:'.3em 0 .4em' }}>
                {t('De la demande','From request')}<br />
                <span className="mut">{t('à la livraison.','to delivery.')}</span>
              </h2>
              <p className="lede r d2" style={{ color:'rgba(255,255,255,.6)' }}>
                {t(
                  'Depuis notre siège bruxellois, un interlocuteur unique gère le sourcing, la consolidation, les documents d\'export et la livraison.',
                  'From our Brussels head office, a single point of contact handles sourcing, consolidation, export documents and delivery.'
                )}
              </p>
            </div>

            <div className="spine">
              <div className="spine-track" />
              <div className="spine-fill" />
              {processSteps.map((step) => (
                <div key={step.id} className="step r">
                  <div className="step-disc">{step.number}</div>
                  <span className="mono">{language==='fr' ? step.label_fr : step.label_en}</span>
                  <h3>{language==='fr' ? step.title_fr : step.title_en}</h3>
                  <p>{language==='fr' ? step.body_fr : step.body_en}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── COLD ROOM (dark split) ────────────────────────── */}
        <section className="dark-sec coldroom" id="coldroom">
          {/* same orbs as the process section so the green reads identical */}
          <div className="orb" style={{ width:520, height:520, top:-160, left:-160 }} />
          <div className="orb" style={{ width:420, height:420, bottom:-160, left:'30%', opacity:.6 }} />
          <div className="coldroom-grid">
            <div className="coldroom-copy">
              <p className="eyebrow on-dark r">{coldEyebrow}</p>
              <h2 className="display h2 r d1" style={{ margin:'.3em 0 .4em' }}>
                {coldTitle.split(',')[0]},<br />
                <span className="mut">{coldTitle.split(',').slice(1).join(',').trim()}</span>
              </h2>
              <p className="lede r d2" style={{ color:'rgba(255,255,255,.62)' }}>{coldLede}</p>
              <div className="cold-stats r d3">
                <div className="cold-stat">
                  <div className="cold-num display"><span data-count="3100" data-group>0</span> t</div>
                  <div className="mono">{t('Capacité','Capacity')}</div>
                </div>
                <div className="cold-stat">
                  <div className="cold-num display">−24 °C</div>
                  <div className="mono">{t('Surgélation','Deep-freeze')}</div>
                </div>
                <div className="cold-stat">
                  <div className="cold-num display"><span data-count="2927" data-group>0</span> m²</div>
                  <div className="mono">{t('Panneaux','Panel area')}</div>
                </div>
              </div>
              <div className="r d4" style={{ marginTop:38 }}>
                <Link to={ROUTES.COLD} className="at-btn-cta">
                  <span className="cta-label">{t('Parler chambre froide','Discuss a cold room')}</span>
                  <span className="cta-disc" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="coldroom-media r r-scale d2">
              {coldPhoto
                ? <img src={coldPhoto} alt={t('Chambre froide installée par FAGOU','Cold room installed by FAGOU')} />
                : <div className="cold-placeholder">
                    <span className="mono">{t('Photo chambre froide','Cold-room photo')}</span>
                  </div>
              }
              <div className="cold-overlay" />
              <span className="cold-tag mono">{coldTag}</span>
            </div>
          </div>
        </section>

        {/* ── BRANDS (unified logo marquee) ─────────────────── */}
        <section className="section" id="brands">
          <div className="wrap brands-head">
            <div className="brands-head-main">
              <p className="eyebrow r">{t('Marques distribuées','Brands we distribute')}</p>
              <h2 className="display h2 r d1" style={{ margin:'.3em 0 0' }}>
                {t('Des marques ','Brands ')}<span className="mut">{t('que vos clients','your buyers')}</span>{' '}
                {t('connaissent.','already trust.')}
              </h2>
            </div>
            <div className="brands-head-side">
              <p className="lede r d2">
                {t(
                  'Fagou distribue une sélection de marques agroalimentaires reconnues sur les marchés africains — mayonnaise, condiments, produits secs et plus.',
                  'Fagou carries a curated selection of agri-food brands recognised across African markets — mayonnaise, condiments, dry goods and more.'
                )}
              </p>
              <Link to={ROUTES.BRANDS} className="at-btn at-btn-primary r d3" style={{ marginTop:26, display:'inline-flex' }}>
                {t('Voir les marques','Discover brands')} <span className="arr">→</span>
              </Link>
            </div>
          </div>
          {brandLoop.length > 0 && (
            <div className="brand-marquee r d1">
              {[brandLoop, [...brandLoop].reverse()].map((row, r) => (
                <div className={`bm-row${r ? ' bm-rev' : ''}`} key={r} aria-hidden={r > 0}>
                  <div className="bm-track" style={{ animationDuration: `${row.length * 7}s` }}>
                    {[...row, ...row].map((b, i) => {
                      const hasLogo = !!b.logo && !failedLogos.has(b.id)
                      return (
                        <div key={`${b.id}-${i}`} className="bm-item">
                          {hasLogo ? (
                            <img
                              src={b.logo} alt={i < row.length && r === 0 ? b.name : ''} loading="lazy"
                              onError={() => setFailedLogos(prev => new Set(prev).add(b.id))}
                            />
                          ) : (
                            <span className="bm-name">{b.name}</span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── TESTIMONIALS ──────────────────────────────────── */}
        <section className="wrap section tight" id="testimonials">
          <div className="tst-head">
            <div>
              <p className="eyebrow r">{t('Ils nous font confiance','They trust us')}</p>
              <h2 className="display h2 r d1" style={{ marginTop:'.3em' }}>
                {t('Ce que disent','What our ')}<span className="mut">{t('nos clients','clients')}</span>{t('.',' say.')}
              </h2>
            </div>
            <p className="lede r d2">
              {t(
                'Des partenaires en Afrique centrale et de l\'Ouest qui nous confient leur approvisionnement agroalimentaire.',
                'Partners across Central & West Africa who rely on Fagou for their agri-food supply.'
              )}
            </p>
          </div>
          <div className="tst-grid">
            {testimonials.map((tst, i) => (
              <figure key={tst.id} className={`tst-card r${i > 0 ? ` d${i}` : ''}`}>
                <div className="stars" aria-label={`${tst.stars} out of 5`}>{stars(tst.stars)}</div>
                <blockquote>«{language==='fr' ? tst.quote_fr : tst.quote_en}»</blockquote>
                <figcaption>
                  <span className="tst-name">{tst.client_name}</span>
                  <span className="mono">
                    {language==='fr' ? tst.client_type_fr : tst.client_type_en}
                    {tst.client_country ? ` · ${tst.client_country}` : ''}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── CTA (dark) ────────────────────────────────────── */}
        <section className="dark-sec section" id="contact">
          <div className="orb" style={{ width:560, height:560, top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:.7 }} />
          <div className="wrap at-cta" style={{ position:'relative' }}>
            <p className="eyebrow on-dark r">{t('Travaillons ensemble','Let\'s trade')}</p>
            <h2 className="display h2 r d1">{ctaTitle}</h2>
            <p className="lede r d2" style={{ margin:'0 auto 36px', color:'rgba(255,255,255,.65)', textAlign:'center' }}>
              {ctaLede}
            </p>
            <div className="cta-actions r d3">
              <Link to={ROUTES.CONTACT} className="at-btn-cta">
                <span className="cta-label">{t('Demander un devis','Request a quote')}</span>
                <span className="cta-sub mono">{t('Réponse sous 48h','Reply within 48h')}</span>
                <span className="cta-disc" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer className="at-footer">
        <div className="gradient-sep" />
        <div className="wrap footer-top">
          <div className="footer-brand">
            <a href="#top" className="at-brand" aria-label="Fagou home">
              <img className="at-brand-logo" src="/assets/fagou-logo.jpg" alt="Fagou" />
            </a>
            <span className="mono">
              {t(
                'Maison d\'import-export agroalimentaire, sourçant dans le monde et livrant depuis la Belgique vers l\'Afrique centrale et de l\'Ouest depuis 2013.',
                'An agri-food import–export house, sourcing worldwide and delivering from Belgium to Central & West Africa since 2013.'
              )}
            </span>
          </div>
          <div className="footer-col">
            <h4>{t('Produits','Products')}</h4>
            <ul>
              <li><a className="footer-link" href="#departments">{t('Produits congelés','Frozen Foods')}</a></li>
              <li><a className="footer-link" href="#departments">{t('Agroalimentaire','Agri-food')}</a></li>
              <li><a className="footer-link" href="#departments">{t('Mayonnaise & laitiers','Mayonnaise & Dairy')}</a></li>
              <li><a className="footer-link" href="#departments">{t('Huile de palmiste','Palm Kernel Oil')}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>{t('Marchés','Markets')}</h4>
            <ul>
              <li><a className="footer-link" href="#network">Côte d'Ivoire</a></li>
              <li><a className="footer-link" href="#network">{t('Cameroun','Cameroon')}</a></li>
              <li><a className="footer-link" href="#network">{t('Congo & RD Congo','Congo & DR Congo')}</a></li>
              <li><a className="footer-link" href="#network">Gabon</a></li>
            </ul>
          </div>
          <div className="footer-col footer-contact">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:info@fagou.be">info@fagou.be</a></li>
              <li><a href="tel:+32490255352">+32 490 25 53 52</a></li>
              <li><a href="#top">{t('Rhode-Saint-Genèse, BE','Rhode-Saint-Genèse, BE')}</a></li>
            </ul>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span className="mono">© 2013–2026 Fagou · {t('Tous droits réservés','All rights reserved')}</span>
          <span className="mono">Rhode-Saint-Genèse · Belgium</span>
        </div>
      </footer>
    </div>
  )
}

