import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, X, ImageIcon, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { ImagePicker } from '../../components/admin/ImagePicker'

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

const EMPTY: Omit<Brand, 'id'> = {
  name: '', logo: '', tag_fr: '', tag_en: '',
  desc_fr: '', desc_en: '', products: [],
  logo_max_height: '90px', logo_max_width: '200px', sort_order: 0,
}

export default function AdminBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Brand | null>(null)
  const [form, setForm] = useState<Omit<Brand, 'id'>>(EMPTY)
  const [productsText, setProductsText] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { load() }, [])

  async function load() {
    setLoading(true)
    const { data } = await supabase.from('brands').select('*').order('sort_order')
    setBrands((data ?? []) as Brand[])
    setLoading(false)
  }

  function openAdd() {
    setEditing(null)
    setForm({ ...EMPTY, sort_order: brands.length + 1 })
    setProductsText('')
    setError(null)
    setModalOpen(true)
  }

  function openEdit(b: Brand) {
    setEditing(b)
    setForm({ ...b })
    setProductsText((b.products ?? []).join(', '))
    setError(null)
    setModalOpen(true)
  }

  function closeModal() { setModalOpen(false); setEditing(null); setError(null) }

  function setField<K extends keyof Omit<Brand, 'id'>>(k: K, v: Omit<Brand, 'id'>[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function handleSave() {
    if (!form.name.trim()) { setError('Le nom est obligatoire.'); return }
    setSaving(true); setError(null)
    const payload = { ...form, products: productsText.split(',').map(s => s.trim()).filter(Boolean) }
    const { error: err } = editing
      ? await supabase.from('brands').update(payload).eq('id', editing.id)
      : await supabase.from('brands').insert(payload)
    if (err) { setError(err.message); setSaving(false); return }
    await load(); setSaving(false); closeModal()
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    await supabase.from('brands').delete().eq('id', deleteTarget.id)
    await load(); setDeleting(false); setDeleteTarget(null)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 12px', border: '1px solid #E5E7EB',
    borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14,
    outline: 'none', boxSizing: 'border-box',
  }
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 600,
    color: '#374151', display: 'block', marginBottom: 6,
  }

  return (
    <div style={{ padding: '32px 24px', maxWidth: 1100, margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 24, margin: 0 }}>Marques</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', margin: '4px 0 0' }}>
            {brands.length} marque{brands.length > 1 ? 's' : ''} distribuée{brands.length > 1 ? 's' : ''}
          </p>
        </div>
        <button onClick={openAdd} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', backgroundColor: '#1A5C1A', color: '#FFFFFF', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          <Plus size={16} /> Ajouter une marque
        </button>
      </div>

      {/* Liste */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
          <Loader2 size={28} color="#1A5C1A" style={{ animation: 'spin 0.7s linear infinite' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {brands.map(b => (
            <div key={b.id} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Logo preview */}
              <div style={{ width: 80, height: 60, flexShrink: 0, backgroundColor: '#FAFAF8', borderRadius: 8, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {b.logo
                  ? <img src={b.logo} alt={b.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  : <ImageIcon size={20} color="#D1D5DB" />
                }
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 16 }}>{b.name}</div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', marginTop: 2 }}>{b.tag_fr}</div>
                {b.desc_fr && (
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9CA3AF', marginTop: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {b.desc_fr}
                  </div>
                )}
              </div>
              {/* Actions */}
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => openEdit(b)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid #E5E7EB', borderRadius: 8, backgroundColor: '#FFFFFF', fontFamily: 'Inter, sans-serif', fontSize: 13, cursor: 'pointer', color: '#374151' }}>
                  <Pencil size={14} /> Modifier
                </button>
                <button onClick={() => setDeleteTarget(b)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid #FEE2E2', borderRadius: 8, backgroundColor: '#FFF5F5', fontFamily: 'Inter, sans-serif', fontSize: 13, cursor: 'pointer', color: '#DC2626' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Modal édition ─────────────────────────────────────── */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, width: '100%', maxWidth: 640, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>

            {/* Modal header */}
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, backgroundColor: '#FFFFFF', zIndex: 1 }}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 18, margin: 0 }}>
                {editing ? 'Modifier la marque' : 'Nouvelle marque'}
              </h2>
              <button onClick={closeModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280', padding: 4 }}>
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>

              {/* Logo */}
              <div>
                <label style={labelStyle}>Logo</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ width: 100, height: 72, backgroundColor: '#FAFAF8', borderRadius: 8, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', flexShrink: 0 }}>
                    {form.logo
                      ? <img src={form.logo} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      : <ImageIcon size={24} color="#D1D5DB" />
                    }
                  </div>
                  <button onClick={() => setPickerOpen(true)} style={{ padding: '9px 16px', border: '1px solid #E5E7EB', borderRadius: 8, backgroundColor: '#F9FAFB', fontFamily: 'Inter, sans-serif', fontSize: 13, cursor: 'pointer', color: '#374151' }}>
                    Choisir une image
                  </button>
                </div>
              </div>

              {/* Nom */}
              <div>
                <label style={labelStyle}>Nom de la marque *</label>
                <input value={form.name} onChange={e => setField('name', e.target.value)} style={inputStyle} placeholder="ex. ADISA" />
              </div>

              {/* Tags */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>Tag FR</label>
                  <input value={form.tag_fr} onChange={e => setField('tag_fr', e.target.value)} style={inputStyle} placeholder="ex. Mayonnaise" />
                </div>
                <div>
                  <label style={labelStyle}>Tag EN</label>
                  <input value={form.tag_en} onChange={e => setField('tag_en', e.target.value)} style={inputStyle} placeholder="ex. Mayonnaise" />
                </div>
              </div>

              {/* Description FR */}
              <div>
                <label style={labelStyle}>Description FR</label>
                <textarea value={form.desc_fr} onChange={e => setField('desc_fr', e.target.value)} style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} placeholder="Description en français…" />
              </div>

              {/* Description EN */}
              <div>
                <label style={labelStyle}>Description EN</label>
                <textarea value={form.desc_en} onChange={e => setField('desc_en', e.target.value)} style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} placeholder="Description in English…" />
              </div>

              {/* Produits */}
              <div>
                <label style={labelStyle}>Produits (séparés par des virgules)</label>
                <input value={productsText} onChange={e => setProductsText(e.target.value)} style={inputStyle} placeholder="ex. Mayonnaise, Mayonnaise ail, Mayonnaise oignon" />
              </div>

              {/* Taille logo */}
              <div>
                <label style={labelStyle}>Taille du logo (affichage)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <label style={{ ...labelStyle, fontWeight: 400, color: '#6B7280' }}>Hauteur max</label>
                    <input value={form.logo_max_height} onChange={e => setField('logo_max_height', e.target.value)} style={inputStyle} placeholder="90px" />
                  </div>
                  <div>
                    <label style={{ ...labelStyle, fontWeight: 400, color: '#6B7280' }}>Largeur max</label>
                    <input value={form.logo_max_width} onChange={e => setField('logo_max_width', e.target.value)} style={inputStyle} placeholder="200px" />
                  </div>
                </div>
              </div>

              {/* Ordre */}
              <div>
                <label style={labelStyle}>Ordre d'affichage</label>
                <input type="number" value={form.sort_order} onChange={e => setField('sort_order', parseInt(e.target.value) || 0)} style={{ ...inputStyle, width: 100 }} />
              </div>

              {error && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#DC2626', margin: 0 }}>{error}</p>}
            </div>

            {/* Modal footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: 10, position: 'sticky', bottom: 0, backgroundColor: '#FFFFFF' }}>
              <button onClick={closeModal} style={{ padding: '10px 18px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}>
                Annuler
              </button>
              <button onClick={handleSave} disabled={saving} style={{ padding: '10px 20px', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', backgroundColor: saving ? '#9CA3AF' : '#1A5C1A', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 8 }}>
                {saving && <Loader2 size={14} style={{ animation: 'spin 0.7s linear infinite' }} />}
                {saving ? 'Enregistrement…' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal suppression ─────────────────────────────────── */}
      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 14, padding: 28, maxWidth: 420, width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 18, marginBottom: 12 }}>Supprimer "{deleteTarget.name}" ?</h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', marginBottom: 24 }}>Cette action est irréversible.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={() => setDeleteTarget(null)} style={{ padding: '10px 18px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, cursor: 'pointer', backgroundColor: '#FFFFFF' }}>
                Annuler
              </button>
              <button onClick={handleDelete} disabled={deleting} style={{ padding: '10px 18px', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: deleting ? 'not-allowed' : 'pointer', backgroundColor: '#DC2626', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 8 }}>
                {deleting && <Loader2 size={14} style={{ animation: 'spin 0.7s linear infinite' }} />}
                {deleting ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image picker */}
      {pickerOpen && (
        <ImagePicker
          currentUrl={form.logo}
          onSelect={url => setField('logo', url)}
          onClose={() => setPickerOpen(false)}
        />
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
