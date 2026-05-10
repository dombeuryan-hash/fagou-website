import { useState, useEffect } from 'react'
import { Search, Plus, Pencil, Trash2, X, ImageIcon, Loader2, Images } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { ImagePicker } from '../../components/admin/ImagePicker'

// ── Types ───────────────────────────────────────────────────────
interface CatalogueProduct {
  code: string
  dept_id: string
  name_fr: string
  name_en: string
  ref_fr: string
  ref_en: string
  photo_alt_fr: string
  photo_alt_en: string
  image: string
  brand: string
  formats: string[]
  availability: 'available' | 'on-request' | 'to-confirm'
  badge: string
  description_fr: string
  description_en: string
  packaging_tonnes: string
  packaging_palettes: string
  packaging_conteneurs: string
  oil_percentage: string
  sort_order: number
}

const EMPTY: CatalogueProduct = {
  code: '', dept_id: 'agrifood',
  name_fr: '', name_en: '',
  ref_fr: '', ref_en: '',
  photo_alt_fr: '', photo_alt_en: '',
  image: '', brand: '',
  formats: [''],
  availability: 'available', badge: '',
  description_fr: '', description_en: '',
  packaging_tonnes: '', packaging_palettes: '', packaging_conteneurs: '',
  oil_percentage: '', sort_order: 0,
}

const DEPTS = [
  { id: 'frozen',   label: 'Produits Congelés' },
  { id: 'agrifood', label: 'Agroalimentaire' },
  { id: 'inputs',   label: 'Intrants & Mayonnaises' },
  { id: 'pko',      label: 'Palm Kernel Oil' },
]

const AVAIL_LABELS = { available: 'Disponible', 'on-request': 'Sur demande', 'to-confirm': 'À confirmer' }
const AVAIL_COLORS = { available: '#1A5C1A', 'on-request': '#B7860B', 'to-confirm': '#6B7280' }

export default function AdminProducts() {
  const [products, setProducts] = useState<CatalogueProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<CatalogueProduct | null>(null)
  const [form, setForm] = useState<CatalogueProduct>(EMPTY)
  const [deleteTarget, setDeleteTarget] = useState<CatalogueProduct | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => { fetch() }, [])

  async function fetch() {
    setLoading(true)
    const { data } = await supabase.from('catalogue_products').select('*').order('dept_id').order('sort_order')
    setProducts((data ?? []) as CatalogueProduct[])
    setLoading(false)
  }

  function openAdd() { setEditing(null); setForm(EMPTY); setError(null); setModalOpen(true) }
  function openEdit(p: CatalogueProduct) { setEditing(p); setForm({ ...p }); setError(null); setModalOpen(true) }
  function closeModal() { setModalOpen(false); setEditing(null); setError(null) }

  function setField<K extends keyof CatalogueProduct>(k: K, v: CatalogueProduct[K]) {
    setForm(f => ({ ...f, [k]: v }))
  }

  async function handleSave() {
    if (!form.code.trim() || !form.name_fr.trim() || !form.name_en.trim()) {
      setError('Code, Nom FR et Nom EN sont obligatoires.')
      return
    }
    setSaving(true); setError(null)
    const row = {
      ...form,
      formats: form.formats.filter(Boolean),
      badge: form.badge || null,
    }
    const { error: err } = await supabase.from('catalogue_products').upsert(row)
    if (err) { setError(err.message); setSaving(false); return }
    await fetch(); setSaving(false); closeModal()
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    const { error: err } = await supabase.from('catalogue_products').delete().eq('code', deleteTarget.code)
    if (err) { setError(err.message); setDeleting(false); return }
    await fetch(); setDeleting(false); setDeleteTarget(null)
  }

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    return p.name_fr.toLowerCase().includes(q) || p.name_en.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
  })

  // ── Styles ──────────────────────────────────────────────────
  const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: '7px', fontFamily: 'Inter, sans-serif', fontSize: '13px', outline: 'none', backgroundColor: '#FFFFFF', color: '#1A1A1A', boxSizing: 'border-box' }
  const labelStyle: React.CSSProperties = { display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#374151', marginBottom: '5px' }
  const sectionTitle: React.CSSProperties = { fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '20px 0 12px', paddingBottom: '6px', borderBottom: '1px solid #F3F4F6' }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: 28 }}>Produits</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280' }}>
            {loading ? 'Chargement…' : `${products.length} produits dans le catalogue`}
          </p>
        </div>
        <button onClick={openAdd} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', backgroundColor: '#1A5C1A', color: '#FFFFFF', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
          <Plus size={16} /> Ajouter un produit
        </button>
      </div>

      {/* Recherche */}
      <div style={{ position: 'relative', marginBottom: 24, maxWidth: 400 }}>
        <Search size={16} color="#6B7280" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
        <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…" style={{ ...inputStyle, paddingLeft: 38 }} />
      </div>

      {/* Tableau */}
      {loading ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6B7280', fontFamily: 'Inter, sans-serif', fontSize: 14, padding: '40px 0' }}>
          <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Chargement…
        </div>
      ) : (
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px solid #E5E7EB', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F9FAFB', borderBottom: '1px solid #E5E7EB' }}>
                {['Photo', 'Produit', 'Code', 'Département', 'Dispo', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={6} style={{ padding: 40, textAlign: 'center', fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280' }}>Aucun produit trouvé</td></tr>
              ) : filtered.map((p, i) => (
                <tr key={p.code} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #E5E7EB' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    {p.image ? (
                      <img src={p.image} alt={p.name_fr} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #E5E7EB' }} />
                    ) : (
                      <div style={{ width: 48, height: 48, borderRadius: 6, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB' }}>
                        <ImageIcon size={18} color="#D1D5DB" />
                      </div>
                    )}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#1A1A1A', margin: 0 }}>{p.name_fr}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', margin: 0 }}>{p.name_en}</p>
                    {p.brand && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF', margin: 0 }}>{p.brand}</p>}
                  </td>
                  <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', fontWeight: 600 }}>{p.code}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>{DEPTS.find(d => d.id === p.dept_id)?.label ?? p.dept_id}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ backgroundColor: `${AVAIL_COLORS[p.availability]}20`, color: AVAIL_COLORS[p.availability], fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, padding: '3px 10px', borderRadius: 12 }}>
                      {AVAIL_LABELS[p.availability]}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button onClick={() => openEdit(p)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 10px', border: '1px solid #E5E7EB', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}>
                        <Pencil size={12} /> Modifier
                      </button>
                      <button onClick={() => setDeleteTarget(p)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 10px', border: '1px solid #FCA5A5', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, cursor: 'pointer', backgroundColor: '#FFF5F5', color: '#DC2626' }}>
                        <Trash2 size={12} /> Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Image Picker */}
      {pickerOpen && (
        <ImagePicker currentUrl={form.image} onSelect={url => setField('image', url)} onClose={() => setPickerOpen(false)} />
      )}

      {/* Modal Ajout/Modification */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
          <div style={{ width: 560, height: '100vh', backgroundColor: '#FFFFFF', overflowY: 'auto', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div style={{ padding: '24px 28px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div>
                <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 18, color: '#1A1A1A', margin: 0 }}>
                  {editing ? 'Modifier le produit' : 'Ajouter un produit'}
                </h2>
                {editing && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', marginTop: 2 }}>Code : {editing.code}</p>}
              </div>
              <button onClick={closeModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280' }}><X size={20} /></button>
            </div>

            {/* Formulaire */}
            <div style={{ padding: '24px 28px', flex: 1 }}>
              {error && <div style={{ backgroundColor: '#FFF5F5', border: '1px solid #FCA5A5', borderRadius: 8, padding: '12px 14px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>{error}</div>}

              <p style={sectionTitle}>Identification</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={labelStyle}>Code * <span style={{ fontWeight: 400, color: '#9CA3AF' }}>(ex: AG-GA)</span></label>
                  <input style={inputStyle} value={form.code} onChange={e => setField('code', e.target.value.toUpperCase())} placeholder="AG-GA" disabled={!!editing} />
                </div>
                <div>
                  <label style={labelStyle}>Département</label>
                  <select style={inputStyle} value={form.dept_id} onChange={e => setField('dept_id', e.target.value)}>
                    {DEPTS.map(d => <option key={d.id} value={d.id}>{d.label}</option>)}
                  </select>
                </div>
              </div>

              <p style={sectionTitle}>Informations générales</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><label style={labelStyle}>Nom FR *</label><input style={inputStyle} value={form.name_fr} onChange={e => setField('name_fr', e.target.value)} /></div>
                <div><label style={labelStyle}>Nom EN *</label><input style={inputStyle} value={form.name_en} onChange={e => setField('name_en', e.target.value)} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><label style={labelStyle}>Réf. courte FR</label><input style={inputStyle} value={form.ref_fr} onChange={e => setField('ref_fr', e.target.value)} placeholder="ex: calibre 60–80 mm" /></div>
                <div><label style={labelStyle}>Réf. courte EN</label><input style={inputStyle} value={form.ref_en} onChange={e => setField('ref_en', e.target.value)} /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={labelStyle}>Disponibilité</label>
                  <select style={inputStyle} value={form.availability} onChange={e => setField('availability', e.target.value as CatalogueProduct['availability'])}>
                    <option value="available">Disponible</option>
                    <option value="on-request">Sur demande</option>
                    <option value="to-confirm">À confirmer</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Badge</label>
                  <select style={inputStyle} value={form.badge} onChange={e => setField('badge', e.target.value)}>
                    <option value="">Aucun</option>
                    <option value="export">Export</option>
                    <option value="premium">Premium</option>
                    <option value="new">Nouveau</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle}>Marque</label>
                <input style={inputStyle} value={form.brand} onChange={e => setField('brand', e.target.value)} placeholder="ex: FAGOU Select" />
              </div>

              <p style={sectionTitle}>Descriptions</p>
              <div style={{ marginBottom: 12 }}><label style={labelStyle}>Description FR</label><textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.description_fr} onChange={e => setField('description_fr', e.target.value)} /></div>
              <div style={{ marginBottom: 12 }}><label style={labelStyle}>Description EN</label><textarea style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }} value={form.description_en} onChange={e => setField('description_en', e.target.value)} /></div>

              <p style={sectionTitle}>Image</p>
              <div style={{ marginBottom: 12 }}>
                {form.image ? (
                  <div style={{ position: 'relative', width: '100%', height: 160, borderRadius: 8, overflow: 'hidden', border: '1px solid #E5E7EB', marginBottom: 10 }}>
                    <img src={form.image} alt="aperçu" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <button onClick={() => setField('image', '')} style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}>
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <div style={{ width: '100%', height: 100, border: '2px dashed #E5E7EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, backgroundColor: '#F9FAFB' }}>
                    <ImageIcon size={28} color="#D1D5DB" />
                  </div>
                )}
                <button type="button" onClick={() => setPickerOpen(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', border: '1px solid #1A5C1A', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', backgroundColor: '#F0FDF4', color: '#1A5C1A', width: '100%', justifyContent: 'center' }}>
                  <Images size={15} /> {form.image ? "Changer l'image" : 'Choisir une image'}
                </button>
              </div>

              <p style={sectionTitle}>Formats</p>
              {form.formats.map((f, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input style={{ ...inputStyle, flex: 1 }} value={f} onChange={e => { const n = [...form.formats]; n[i] = e.target.value; setField('formats', n) }} placeholder="ex: 10 kg / sac" />
                  {form.formats.length > 1 && <button onClick={() => setField('formats', form.formats.filter((_, j) => j !== i))} style={{ border: '1px solid #E5E7EB', borderRadius: 6, padding: '6px 8px', cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#6B7280' }}><X size={14} /></button>}
                </div>
              ))}
              <button onClick={() => setField('formats', [...form.formats, ''])} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 12px', border: '1px dashed #D1D5DB', borderRadius: 7, fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', cursor: 'pointer', backgroundColor: 'transparent', marginBottom: 4 }}>
                <Plus size={13} /> Ajouter un format
              </button>

              <p style={sectionTitle}>Emballage</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10, marginBottom: 12 }}>
                <div><label style={labelStyle}>Tonnes / Conteneur</label><input style={inputStyle} value={form.packaging_tonnes} onChange={e => setField('packaging_tonnes', e.target.value)} placeholder="ex: 20 t / conteneur 20'" /></div>
                <div><label style={labelStyle}>Palettes</label><input style={inputStyle} value={form.packaging_palettes} onChange={e => setField('packaging_palettes', e.target.value)} placeholder="ex: 20 palettes" /></div>
                <div><label style={labelStyle}>Conteneurs</label><input style={inputStyle} value={form.packaging_conteneurs} onChange={e => setField('packaging_conteneurs', e.target.value)} placeholder="ex: FCL 20' / FCL 40'" /></div>
              </div>

              <p style={sectionTitle}>Huiles (optionnel)</p>
              <div><label style={labelStyle}>Pourcentage huile</label><input style={inputStyle} value={form.oil_percentage} onChange={e => setField('oil_percentage', e.target.value)} placeholder="ex: 100% huile de palme" /></div>
            </div>

            {/* Footer */}
            <div style={{ padding: '20px 28px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
              <button onClick={closeModal} style={{ padding: '10px 18px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}>Annuler</button>
              <button onClick={handleSave} disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', backgroundColor: saving ? '#9CA3AF' : '#1A5C1A', color: '#FFFFFF' }}>
                {saving && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                {saving ? 'Enregistrement…' : editing ? 'Enregistrer' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression */}
      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 32, maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#FFF5F5', border: '1px solid #FCA5A5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
              <Trash2 size={22} color="#DC2626" />
            </div>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 17, color: '#1A1A1A', marginBottom: 8 }}>Supprimer ce produit ?</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', marginBottom: 24 }}>
              <strong style={{ color: '#1A1A1A' }}>{deleteTarget.name_fr}</strong> sera supprimé définitivement. Cette action est irréversible.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteTarget(null)} style={{ padding: '10px 18px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}>Annuler</button>
              <button onClick={handleDelete} disabled={deleting} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: deleting ? 'not-allowed' : 'pointer', backgroundColor: deleting ? '#9CA3AF' : '#DC2626', color: '#FFFFFF' }}>
                {deleting && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                {deleting ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
