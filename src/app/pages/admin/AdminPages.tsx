import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Image, Loader2, Check } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { updateSiteSetting } from '../../hooks/useSiteSettings'
import { ImagePicker } from '../../components/admin/ImagePicker'
import { toast } from 'sonner'
import { useAuth } from '../../hooks/useAuth'
import { ROUTES } from '../../constants'

type Settings = Record<string, string>

const PAGE_SETTINGS = [
  {
    key: 'home_hero_cargo',
    titleFr: 'Page d\'accueil — Photo hero',
    descFr: 'Grande photo du porte-conteneurs en fond du hero vert foncé.',
    defaultUrl: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1920&q=80',
  },
  {
    key: 'home_photo_1',
    titleFr: 'Page d\'accueil — Bande photos · 1',
    descFr: 'Première photo de la bande de 3 images (volaille).',
    defaultUrl: 'assets/product-volaille.png',
  },
  {
    key: 'home_photo_2',
    titleFr: 'Page d\'accueil — Bande photos · 2',
    descFr: 'Deuxième photo de la bande de 3 images (poissons).',
    defaultUrl: 'assets/product-poissons.png',
  },
  {
    key: 'home_photo_3',
    titleFr: 'Page d\'accueil — Bande photos · 3',
    descFr: 'Troisième photo de la bande de 3 images (oignons).',
    defaultUrl: 'assets/product-oignons-rouges-gala.png',
  },
  {
    key: 'coldstorage_hero',
    titleFr: 'Chambre froide — Photo principale',
    descFr: 'Photo pleine largeur de la chambre froide LCC Congo.',
    defaultUrl: '',
  },
]

export default function AdminPages() {
  const { user } = useAuth()
  const [settings, setSettings] = useState<Settings>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [pickerKey, setPickerKey] = useState<string | null>(null)
  const [depts, setDepts] = useState<Array<{ id: string; code: string; name_fr: string; cover: string | null }>>([])
  const [deptPickerDept, setDeptPickerDept] = useState<string | null>(null)
  const [savingDept, setSavingDept] = useState<string | null>(null)
  const [savedDept, setSavedDept] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([
      supabase.from('site_settings').select('*'),
      supabase.from('departments').select('id, code, name_fr, cover').order('sort_order'),
    ]).then(([{ data: settingsData }, { data: deptsData }]) => {
      const map: Settings = {}
      for (const row of settingsData ?? []) map[row.key] = row.value
      setSettings(map)
      setDepts((deptsData ?? []) as typeof depts)
    })
  }, [])

  if (user?.role !== 'Super Admin') return <Navigate to={ROUTES.ADMIN} replace />

  async function handleSelect(key: string, url: string) {
    setSaving(key)
    const { error } = await updateSiteSetting(key, url)
    setSaving(null)
    if (error) {
      toast.error('Erreur lors de la sauvegarde')
    } else {
      setSettings((prev) => ({ ...prev, [key]: url }))
      setSaved(key)
      setTimeout(() => setSaved(null), 2000)
      toast.success('Image mise à jour')
    }
  }

  async function handleDeptCoverSelect(deptId: string, url: string) {
    setSavingDept(deptId)
    const { error } = await supabase.from('departments').update({ cover: url }).eq('id', deptId)
    setSavingDept(null)
    if (error) {
      toast.error('Erreur lors de la sauvegarde')
    } else {
      setDepts(prev => prev.map(d => d.id === deptId ? { ...d, cover: url } : d))
      setSavedDept(deptId)
      setTimeout(() => setSavedDept(null), 2000)
      toast.success('Image mise à jour')
      setDeptPickerDept(null)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <span className="fg-eyebrow" style={{ display: 'block', marginBottom: 8 }}>Contenu</span>
        <h1 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 28, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Images des pages
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-gray)' }}>
          Modifiez les images des pages publiques directement depuis l'admin.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {PAGE_SETTINGS.map((s) => {
          const currentUrl = settings[s.key] ?? s.defaultUrl
          const isSaving = saving === s.key
          const isSaved = saved === s.key

          return (
            <div
              key={s.key}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 24,
                display: 'grid',
                gridTemplateColumns: '160px 1fr',
                gap: 24,
                alignItems: 'center',
                boxShadow: 'var(--shadow-soft)',
              }}
            >
              {/* Preview */}
              <div
                style={{
                  width: 160,
                  height: 100,
                  borderRadius: 8,
                  overflow: 'hidden',
                  border: '1px solid var(--color-border)',
                  background: '#EEF2EE',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {currentUrl ? (
                  <img
                    src={currentUrl}
                    alt=""
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                  />
                ) : (
                  <Image size={28} color="#9CA3AF" />
                )}
              </div>

              {/* Info + action */}
              <div>
                <p style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: 15, color: 'var(--color-text)', margin: '0 0 4px' }}>
                  {s.titleFr}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--color-gray)', margin: '0 0 14px', lineHeight: 1.5 }}>
                  {s.descFr}
                </p>
                {currentUrl && (
                  <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#9CA3AF', margin: '0 0 14px', wordBreak: 'break-all' }}>
                    {currentUrl}
                  </p>
                )}
                <button
                  onClick={() => setPickerKey(s.key)}
                  disabled={isSaving}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '9px 16px',
                    border: 'none',
                    borderRadius: 8,
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: isSaving ? 'not-allowed' : 'pointer',
                    backgroundColor: isSaved ? '#1A5C1A' : 'var(--color-admin-navy)',
                    color: '#FFFFFF',
                    transition: 'background-color 200ms',
                  }}
                >
                  {isSaving ? (
                    <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : isSaved ? (
                    <Check size={14} />
                  ) : (
                    <Image size={14} />
                  )}
                  {isSaved ? 'Enregistré !' : 'Changer l\'image'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Department cover images */}
      <div>
        <span className="fg-eyebrow" style={{ display: 'block', marginBottom: 8 }}>Catalogue</span>
        <h2 style={{ fontFamily: 'var(--font-title)', fontWeight: 800, fontSize: 22, color: 'var(--color-text)', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Photos de couverture des départements
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--color-gray)', marginBottom: 20 }}>
          Ces images s'affichent sur la page d'accueil dans les cartes des 4 départements.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {depts.map((dept) => {
            const isSaving = savingDept === dept.id
            const isSaved = savedDept === dept.id
            return (
              <div
                key={dept.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 24,
                  display: 'grid',
                  gridTemplateColumns: '160px 1fr',
                  gap: 24,
                  alignItems: 'center',
                  boxShadow: 'var(--shadow-soft)',
                }}
              >
                <div style={{ width: 160, height: 100, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--color-border)', background: '#EEF2EE', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {dept.cover ? (
                    <img src={dept.cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                  ) : (
                    <Image size={28} color="#9CA3AF" />
                  )}
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-title)', fontWeight: 700, fontSize: 15, color: 'var(--color-text)', margin: '0 0 4px' }}>
                    {dept.code} · {dept.name_fr}
                  </p>
                  {dept.cover && (
                    <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#9CA3AF', margin: '0 0 14px', wordBreak: 'break-all' }}>{dept.cover}</p>
                  )}
                  <button
                    onClick={() => setDeptPickerDept(dept.id)}
                    disabled={isSaving}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '9px 16px', border: 'none', borderRadius: 8, fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, cursor: isSaving ? 'not-allowed' : 'pointer', backgroundColor: isSaved ? '#1A5C1A' : 'var(--color-admin-navy)', color: '#FFFFFF', transition: 'background-color 200ms' }}
                  >
                    {isSaving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : isSaved ? <Check size={14} /> : <Image size={14} />}
                    {isSaved ? 'Enregistré !' : 'Changer l\'image'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {pickerKey && (
        <ImagePicker
          currentUrl={settings[pickerKey] ?? PAGE_SETTINGS.find((s) => s.key === pickerKey)?.defaultUrl ?? ''}
          onSelect={(url) => handleSelect(pickerKey, url)}
          onClose={() => setPickerKey(null)}
        />
      )}

      {deptPickerDept && (
        <ImagePicker
          currentUrl={depts.find(d => d.id === deptPickerDept)?.cover ?? ''}
          onSelect={(url) => handleDeptCoverSelect(deptPickerDept, url)}
          onClose={() => setDeptPickerDept(null)}
        />
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
