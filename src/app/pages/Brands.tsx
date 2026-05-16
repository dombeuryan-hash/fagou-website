import { useEffect, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage'
import { supabase } from '../lib/supabase'

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
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('brands').select('*').order('sort_order').then(({ data }) => {
      setBrands((data ?? []) as Brand[])
      setLoading(false)
    })
  }, [])

  return (
    <div>
      {/* Hero */}
      <section style={{ backgroundColor: '#1A5C1A', padding: '80px 24px', textAlign: 'center', color: '#FFFFFF' }}>
        <p className="fg-mono fg-eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '16px', letterSpacing: '0.12em' }}>
          {t('MARQUES DISTRIBUÉES', 'DISTRIBUTED BRANDS')}
        </p>
        <h1 className="fg-fr" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, marginBottom: '20px', lineHeight: 1.15 }}>
          {t('Nos marques', 'Our brands')}
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '17px', opacity: 0.85, maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
          {t(
            'FAGOU SRL distribue en Afrique et en Europe une sélection de marques agroalimentaires de qualité.',
            'FAGOU SRL distributes a selection of quality agri-food brands across Africa and Europe.'
          )}
        </p>
      </section>

      {/* Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div style={{ width: 36, height: 36, border: '2px solid #E5E7EB', borderTopColor: '#1A5C1A', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: '32px' }}>
            {brands.map((brand) => (
              <article
                key={brand.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Logo */}
                <div style={{
                  backgroundColor: '#FAFAF8',
                  borderBottom: '1px solid #E5E7EB',
                  padding: '32px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '160px',
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
                    <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '24px', color: '#1A5C1A' }}>
                      {brand.name}
                    </span>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: '20px', marginBottom: '6px' }}>
                      {brand.name}
                    </h2>
                    {brand.tag_fr && (
                      <span style={{
                        display: 'inline-block',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: '#1A5C1A',
                        backgroundColor: '#F0F7F0',
                        borderRadius: '4px',
                        padding: '2px 8px',
                      }}>
                        {t(brand.tag_fr, brand.tag_en)}
                      </span>
                    )}
                  </div>

                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', color: '#6B7280', lineHeight: 1.7, flex: 1 }}>
                    {t(brand.desc_fr, brand.desc_en)}
                  </p>

                  {brand.products?.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {brand.products.map((p) => (
                        <span key={p} style={{
                          fontFamily: 'Inter, sans-serif',
                          fontSize: '12px',
                          color: '#6B7280',
                          backgroundColor: '#F3F4F6',
                          borderRadius: '4px',
                          padding: '2px 8px',
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
      <section style={{ backgroundColor: '#F3F4F6', padding: '40px 24px', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#9CA3AF', maxWidth: '640px', margin: '0 auto' }}>
          {t(
            'Les marques présentées sont distribuées par FAGOU SRL. Les noms et logos sont la propriété de leurs détenteurs respectifs.',
            'The brands presented are distributed by FAGOU SRL. Names and logos are the property of their respective owners.'
          )}
        </p>
      </section>
    </div>
  )
}
