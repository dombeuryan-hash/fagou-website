import { useEffect, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { useIsMobile } from '../hooks/useIsMobile'
import { supabase } from '../lib/supabase'
import { Nav } from '../components/layout/Nav'

interface Brand {
  id: string
  name: string
  logo: string
  tag_fr: string
  tag_en: string
  desc_fr: string
  desc_en: string
  products: string[]
  logo_max_height: string
  logo_max_width: string
  sort_order: number
}

export default function Brands() {
  const { t } = useLanguage()
  const isMobile = useIsMobile()
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  const px = isMobile ? 20 : 64

  useEffect(() => {
    supabase.from('brands').select('*').order('sort_order').then(({ data }) => {
      setBrands((data ?? []) as Brand[])
      setLoading(false)
    })
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      <Nav dark />

      {/* Hero */}
      <section style={{
        backgroundColor: '#0F3D14',
        padding: `${isMobile ? 120 : 160}px ${px}px ${isMobile ? 56 : 80}px`,
        color: '#FFFFFF',
      }}>
        <div className="fg-eyebrow dark" style={{ marginBottom: 20 }}>
          ↗ {t('Marques distribuées', 'Distributed brands')}
        </div>
        <h1 className="fg-fr" style={{
          fontSize: 'clamp(40px, 7vw, 88px)',
          fontWeight: 400,
          margin: '0 0 20px',
          lineHeight: 0.96,
          letterSpacing: '-0.04em',
          color: '#fff',
          maxWidth: 800,
        }}>
          {t('Des marques', 'Brands we')}{' '}
          <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.45)' }}>
            {t('que nous distribuons.', 'proudly distribute.')}
          </span>
        </h1>
        <p style={{
          fontSize: isMobile ? 15 : 17,
          color: 'rgba(255,255,255,0.7)',
          maxWidth: 520,
          lineHeight: 1.65,
          margin: 0,
        }}>
          {t(
            'FAGOU SRL distribue en Afrique et en Europe une sélection de marques agroalimentaires de qualité.',
            'FAGOU SRL distributes a selection of quality agri-food brands across Africa and Europe.'
          )}
        </p>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: `${isMobile ? 48 : 96}px ${px}px` }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div style={{ width: 36, height: 36, border: '2px solid #E5E7EB', borderTopColor: '#1A5C1A', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: isMobile ? 20 : 32,
          }}>
            {brands.map((brand) => (
              <article
                key={brand.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Logo */}
                <div style={{
                  backgroundColor: '#FAFAF8',
                  borderBottom: '1px solid #E5E7EB',
                  padding: isMobile ? '28px 20px' : '36px 28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: isMobile ? 140 : 160,
                }}>
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      style={{
                        maxHeight: brand.logo_max_height || '90px',
                        maxWidth: brand.logo_max_width || '200px',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <span className="fg-fr" style={{ fontSize: 28, fontWeight: 400, color: '#1A5C1A', letterSpacing: '-0.03em' }}>
                      {brand.name}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: isMobile ? '20px' : '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div>
                    <h2 className="fg-fr" style={{ fontSize: isMobile ? 24 : 28, fontWeight: 400, margin: '0 0 8px', letterSpacing: '-0.03em', lineHeight: 1 }}>
                      {brand.name}
                    </h2>
                    {brand.tag_fr && (
                      <span className="fg-mono" style={{
                        display: 'inline-block',
                        fontSize: 10,
                        fontWeight: 500,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#1A5C1A',
                        backgroundColor: '#F0F7F0',
                        borderRadius: 4,
                        padding: '3px 8px',
                      }}>
                        {t(brand.tag_fr, brand.tag_en)}
                      </span>
                    )}
                  </div>

                  <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.65, flex: 1, margin: 0 }}>
                    {t(brand.desc_fr, brand.desc_en)}
                  </p>

                  {brand.products?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, borderTop: '1px solid #E5E7EB', paddingTop: 12 }}>
                      {brand.products.map((p) => (
                        <span key={p} className="fg-mono" style={{
                          fontSize: 10,
                          color: '#6B7280',
                          backgroundColor: '#F3F4F6',
                          borderRadius: 4,
                          padding: '3px 8px',
                          letterSpacing: '0.08em',
                        }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Note légale */}
      <section style={{ borderTop: '1px solid #E5E7EB', padding: `${isMobile ? 32 : 48}px ${px}px`, textAlign: 'center' }}>
        <p className="fg-mono" style={{ fontSize: 10, color: '#9CA3AF', maxWidth: 640, margin: '0 auto', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.7 }}>
          {t(
            'Les marques présentées sont distribuées par FAGOU SRL. Les noms et logos sont la propriété de leurs détenteurs respectifs.',
            'The brands presented are distributed by FAGOU SRL. Names and logos are the property of their respective owners.'
          )}
        </p>
      </section>
    </div>
  )
}
