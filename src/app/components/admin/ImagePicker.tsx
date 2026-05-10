import { useState, useEffect } from 'react'
import { X, Loader2, Upload, Check } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '../../lib/supabase'

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif']
const MAX_FILE_SIZE_MB = 5

const BUCKET = 'media'
const BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${BUCKET}/`

interface Props {
  currentUrl: string
  onSelect: (url: string) => void
  onClose: () => void
}

export function ImagePicker({ currentUrl, onSelect, onClose }: Props) {
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [selected, setSelected] = useState(currentUrl)

  useEffect(() => {
    loadImages()
  }, [])

  async function loadImages() {
    setLoading(true)
    const { data } = await supabase.storage.from(BUCKET).list('', { limit: 200, sortBy: { column: 'created_at', order: 'desc' } })
    setImages((data ?? []).filter(f => f.name !== '.emptyFolderPlaceholder').map(f => BASE_URL + f.name))
    setLoading(false)
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return

    const valid: File[] = []
    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        toast.error(`${file.name} : format non supporté (JPEG, PNG, WebP, GIF, AVIF uniquement)`)
        continue
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast.error(`${file.name} : taille maximale ${MAX_FILE_SIZE_MB} Mo dépassée`)
        continue
      }
      valid.push(file)
    }
    if (!valid.length) return

    setUploading(true)
    for (const file of valid) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
      const safeName = `${Date.now()}-${crypto.randomUUID()}.${ext}`
      const { error } = await supabase.storage.from(BUCKET).upload(safeName, file, { upsert: false })
      if (error) toast.error(`Erreur upload : ${file.name}`)
    }
    await loadImages()
    setUploading(false)
  }

  function confirm() {
    if (selected) onSelect(selected)
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, width: '100%', maxWidth: 860, maxHeight: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>

        {/* Header */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
          <div>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 17, color: '#1A1A1A', margin: 0 }}>Bibliothèque d'images</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', margin: '2px 0 0' }}>{images.length} image{images.length > 1 ? 's' : ''} disponible{images.length > 1 ? 's' : ''}</p>
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            {/* Upload bouton */}
            <label style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 13, cursor: 'pointer', backgroundColor: '#F9FAFB', color: '#374151' }}>
              {uploading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={14} />}
              {uploading ? 'Upload…' : 'Ajouter des images'}
              <input type="file" accept="image/*" multiple onChange={handleUpload} style={{ display: 'none' }} />
            </label>
            <button onClick={onClose} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280', padding: 4 }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Aperçu sélection */}
        {selected && (
          <div style={{ padding: '12px 24px', backgroundColor: '#F0FDF4', borderBottom: '1px solid #BBF7D0', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <img src={selected} alt="sélectionnée" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #BBF7D0' }} />
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#166534', flex: 1, wordBreak: 'break-all', margin: 0 }}>{selected}</p>
          </div>
        )}

        {/* Grille images */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
              <Loader2 size={24} color="#6B7280" style={{ animation: 'spin 1s linear infinite' }} />
            </div>
          ) : images.length === 0 ? (
            <p style={{ textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', padding: 60 }}>Aucune image. Clique sur "Ajouter des images" pour commencer.</p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
              {images.map(url => {
                const isSelected = url === selected
                return (
                  <button
                    key={url}
                    onClick={() => setSelected(url)}
                    style={{ border: isSelected ? '3px solid #1A5C1A' : '2px solid #E5E7EB', borderRadius: 10, overflow: 'hidden', cursor: 'pointer', background: 'none', padding: 0, position: 'relative', aspectRatio: '1/1' }}
                  >
                    <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    {isSelected && (
                      <div style={{ position: 'absolute', top: 6, right: 6, backgroundColor: '#1A5C1A', borderRadius: '50%', width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={13} color="#FFFFFF" />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
          <button onClick={onClose} style={{ padding: '10px 18px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}>
            Annuler
          </button>
          <button
            onClick={confirm}
            disabled={!selected}
            style={{ padding: '10px 20px', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: selected ? 'pointer' : 'not-allowed', backgroundColor: selected ? '#1A5C1A' : '#9CA3AF', color: '#FFFFFF' }}
          >
            Utiliser cette image
          </button>
        </div>
      </div>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
