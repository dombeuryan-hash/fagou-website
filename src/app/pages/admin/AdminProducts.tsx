import { useState, useEffect } from 'react'
import { Search, Plus, Pencil, Trash2, X, ImageIcon, Loader2, Images } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { ImagePicker } from '../../components/admin/ImagePicker'
import { useIsMobile } from '../../hooks/useIsMobile'

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

interface DeptRow {
  id: string
  code: string
  name_fr: string
  name_en: string
  lede_fr: string
  lede_en: string
  sort_order: number
}

const EMPTY: CatalogueProduct = {
  code: '', dept_id: '',
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

const EMPTY_DEPT: DeptRow = { id: '', code: '', name_fr: '', name_en: '', lede_fr: '', lede_en: '', sort_order: 0 }

const AVAIL_LABELS = { available: 'Disponible', 'on-request': 'Sur demande', 'to-confirm': 'À confirmer' }
const AVAIL_COLORS = { available: '#1A5C1A', 'on-request': '#B7860B', 'to-confirm': '#6B7280' }

export default function AdminProducts() {
  const isMobile = useIsMobile()

  // Products
  const [products, setProducts] = useState<CatalogueProduct[]>([])
  const [depts, setDepts] = useState<DeptRow[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState<'products' | 'departments'>('products')

  // Product modal
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<CatalogueProduct | null>(null)
  const [form, setForm] = useState<CatalogueProduct>(EMPTY)
  const [deleteTarget, setDeleteTarget] = useState<CatalogueProduct | null>(null)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [pickerOpen, setPickerOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Dept modal
  const [deptModalOpen, setDeptModalOpen] = useState(false)
  const [editingDept, setEditingDept] = useState<DeptRow | null>(null)
  const [deptForm, setDeptForm] = useState<DeptRow>(EMPTY_DEPT)
  const [deleteDeptTarget, setDeleteDeptTarget] = useState<DeptRow | null>(null)
  const [savingDept, setSavingDept] = useState(false)
  const [deletingDept, setDeletingDept] = useState(false)
  const [deptError, setDeptError] = useState<string | null>(null)

  useEffect(() => { loadProducts(); loadDepts() }, [])

  async function loadProducts() {
    setLoading(true)
    const { data } = await supabase.from('catalogue_products').select('*').order('dept_id').order('sort_order')
    setProducts((data ?? []) as CatalogueProduct[])
    setLoading(false)
  }

  async function loadDepts() {
    const { data } = await supabase.from('departments').select('*').order('sort_order')
    setDepts((data ?? []) as DeptRow[])
  }

  // ── Product handlers ──────────────────────────────────────────
  function openAdd() { setEditing(null); setForm({ ...EMPTY, dept_id: depts[0]?.id ?? '' }); setError(null); setModalOpen(true) }
  function openEdit(p: CatalogueProduct) { setEditing(p); setForm({ ...p }); setError(null); setModalOpen(true) }
  function closeModal() { setModalOpen(false); setEditing(null); setError(null) }
  function setField<K extends keyof CatalogueProduct>(k: K, v: CatalogueProduct[K]) { setForm(f => ({ ...f, [k]: v })) }

  async function handleSave() {
    if (!form.code.trim() || !form.name_fr.trim() || !form.name_en.trim()) { setError('Code, Nom FR et Nom EN sont obligatoires.'); return }
    setSaving(true); setError(null)
    const { error: err } = await supabase.from('catalogue_products').upsert({ ...form, formats: form.formats.filter(Boolean), badge: form.badge || null })
    if (err) { setError(err.message); setSaving(false); return }
    await loadProducts(); setSaving(false); closeModal()
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setDeleting(true)
    const { error: err } = await supabase.from('catalogue_products').delete().eq('code', deleteTarget.code)
    if (err) { setError(err.message); setDeleting(false); return }
    await loadProducts(); setDeleting(false); setDeleteTarget(null)
  }

  // ── Dept handlers ─────────────────────────────────────────────
  function openAddDept() { setEditingDept(null); setDeptForm(EMPTY_DEPT); setDeptError(null); setDeptModalOpen(true) }
  function openEditDept(d: DeptRow) { setEditingDept(d); setDeptForm({ ...d }); setDeptError(null); setDeptModalOpen(true) }
  function closeDeptModal() { setDeptModalOpen(false); setEditingDept(null); setDeptError(null) }
  function setDeptField<K extends keyof DeptRow>(k: K, v: DeptRow[K]) { setDeptForm(f => ({ ...f, [k]: v })) }

  async function handleSaveDept() {
    if (!deptForm.id.trim() || !deptForm.name_fr.trim() || !deptForm.name_en.trim()) { setDeptError('ID, Nom FR et Nom EN sont obligatoires.'); return }
    setSavingDept(true); setDeptError(null)
    const row = { id: deptForm.id.toLowerCase().replace(/\s+/g, '-'), code: deptForm.code, name_fr: deptForm.name_fr, name_en: deptForm.name_en, lede_fr: deptForm.lede_fr, lede_en: deptForm.lede_en, sort_order: deptForm.sort_order }
    const { error: err } = editingDept
      ? await supabase.from('departments').update(row).eq('id', editingDept.id)
      : await supabase.from('departments').insert(row)
    if (err) { setDeptError(err.message); setSavingDept(false); return }
    await loadDepts(); setSavingDept(false); closeDeptModal()
  }

  async function handleDeleteDept() {
    if (!deleteDeptTarget) return
    setDeletingDept(true)
    const { error: err } = await supabase.from('departments').delete().eq('id', deleteDeptTarget.id)
    if (err) { setDeptError(err.message); setDeletingDept(false); return }
    await loadDepts(); setDeletingDept(false); setDeleteDeptTarget(null)
  }

  const filtered = products.filter(p => {
    const q = search.toLowerCase()
    return p.name_fr.toLowerCase().includes(q) || p.name_en.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
  })

  // ── Shared styles ─────────────────────────────────────────────
  const inputStyle: React.CSSProperties = { width: '100%', padding: '9px 12px', border: '1px solid #E5E7EB', borderRadius: '7px', fontFamily: 'Inter, sans-serif', fontSize: '13px', outline: 'none', backgroundColor: '#FFFFFF', color: '#1A1A1A', boxSizing: 'border-box' }
  const labelStyle: React.CSSProperties = { display: 'block', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', color: '#374151', marginBottom: '5px' }
  const sectionTitle: React.CSSProperties = { fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '20px 0 12px', paddingBottom: '6px', borderBottom: '1px solid #F3F4F6' }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 800, fontSize: isMobile ? 22 : 28, margin: 0 }}>Catalogue</h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', marginTop: 4 }}>
            {loading ? 'Chargement…' : `${products.length} produits · ${depts.length} départements`}
          </p>
        </div>
        <button
          onClick={activeTab === 'products' ? openAdd : openAddDept}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 16px', backgroundColor: '#1A5C1A', color: '#FFFFFF', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
          <Plus size={15} /> {activeTab === 'products' ? (isMobile ? 'Produit' : 'Ajouter un produit') : (isMobile ? 'Département' : 'Nouveau département')}
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid #E5E7EB' }}>
        {(['products', 'departments'] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '9px 18px', border: 'none', background: 'none', fontFamily: 'Inter, sans-serif', fontWeight: activeTab === tab ? 600 : 400, fontSize: 14, color: activeTab === tab ? '#1A5C1A' : '#6B7280', cursor: 'pointer', borderBottom: activeTab === tab ? '2px solid #1A5C1A' : '2px solid transparent', marginBottom: -1, whiteSpace: 'nowrap' }}>
            {tab === 'products' ? `Produits (${products.length})` : `Départements (${depts.length})`}
          </button>
        ))}
      </div>

      {/* ── PRODUCTS TAB ── */}
      {activeTab === 'products' && (
        <>
          <div style={{ position: 'relative', marginBottom: 20, maxWidth: 400 }}>
            <Search size={16} color="#6B7280" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
            <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher…" style={{ ...inputStyle, paddingLeft: 38 }} />
          </div>

          {loading ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#6B7280', fontFamily: 'Inter, sans-serif', fontSize: 14, padding: '40px 0' }}>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Chargement…
            </div>
          ) : isMobile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filtered.length === 0 ? (
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', padding: '24px 0', textAlign: 'center' }}>Aucun produit trouvé</p>
              ) : filtered.map(p => (
                <div key={p.code} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', padding: '14px', display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  {p.image ? (
                    <img src={p.image} alt={p.name_fr} style={{ width: 52, height: 52, objectFit: 'cover', borderRadius: 8, border: '1px solid #E5E7EB', flexShrink: 0 }} />
                  ) : (
                    <div style={{ width: 52, height: 52, borderRadius: 8, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB', flexShrink: 0 }}>
                      <ImageIcon size={18} color="#D1D5DB" />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, color: '#1A1A1A', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name_fr}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#9CA3AF', margin: '0 0 6px' }}>{p.code} · {depts.find(d => d.id === p.dept_id)?.name_fr ?? p.dept_id}</p>
                    <span style={{ backgroundColor: `${AVAIL_COLORS[p.availability]}20`, color: AVAIL_COLORS[p.availability], fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 11, padding: '2px 8px', borderRadius: 10 }}>
                      {AVAIL_LABELS[p.availability]}
                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
                    <button onClick={() => openEdit(p)} style={{ width: 32, height: 32, border: '1px solid #E5E7EB', borderRadius: 6, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Pencil size={13} /></button>
                    <button onClick={() => setDeleteTarget(p)} style={{ width: 32, height: 32, border: '1px solid #FCA5A5', borderRadius: 6, cursor: 'pointer', backgroundColor: '#FFF5F5', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Trash2 size={13} /></button>
                  </div>
                </div>
              ))}
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
                        {p.image ? <img src={p.image} alt={p.name_fr} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 6, border: '1px solid #E5E7EB' }} /> : <div style={{ width: 48, height: 48, borderRadius: 6, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F9FAFB' }}><ImageIcon size={18} color="#D1D5DB" /></div>}
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 14, color: '#1A1A1A', margin: 0 }}>{p.name_fr}</p>
                        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', margin: 0 }}>{p.name_en}</p>
                        {p.brand && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: '#9CA3AF', margin: 0 }}>{p.brand}</p>}
                      </td>
                      <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', fontWeight: 600 }}>{p.code}</td>
                      <td style={{ padding: '12px 16px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280' }}>{depts.find(d => d.id === p.dept_id)?.name_fr ?? p.dept_id}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ backgroundColor: `${AVAIL_COLORS[p.availability]}20`, color: AVAIL_COLORS[p.availability], fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: 12, padding: '3px 10px', borderRadius: 12 }}>{AVAIL_LABELS[p.availability]}</span>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button onClick={() => openEdit(p)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 10px', border: '1px solid #E5E7EB', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}><Pencil size={12} /> Modifier</button>
                          <button onClick={() => setDeleteTarget(p)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 10px', border: '1px solid #FCA5A5', borderRadius: 6, fontFamily: 'Inter, sans-serif', fontSize: 12, cursor: 'pointer', backgroundColor: '#FFF5F5', color: '#DC2626' }}><Trash2 size={12} /> Supprimer</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* ── DEPARTMENTS TAB ── */}
      {activeTab === 'departments' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {depts.length === 0 ? (
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, border: '1px solid #E5E7EB', padding: '48px 24px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280' }}>Aucun département. Créez-en un.</p>
            </div>
          ) : depts.map(d => {
            const count = products.filter(p => p.dept_id === d.id).length
            const hasProducts = count > 0
            return (
              <div key={d.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 10, border: '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
                    {d.code && <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1A5C1A', backgroundColor: '#F0FDF4', padding: '2px 8px', borderRadius: 4 }}>{d.code}</span>}
                    <p style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 15, color: '#1A1A1A', margin: 0 }}>{d.name_fr}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#9CA3AF', margin: 0 }}>· {d.name_en}</p>
                  </div>
                  {d.lede_fr && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#6B7280', margin: '0 0 4px' }}>{d.lede_fr}</p>}
                  <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#9CA3AF', margin: 0, letterSpacing: '0.08em' }}>
                    id: {d.id} · ordre: {d.sort_order} · {count} produit{count !== 1 ? 's' : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  <button onClick={() => openEditDept(d)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '7px 12px', border: '1px solid #E5E7EB', borderRadius: 7, fontFamily: 'Inter, sans-serif', fontSize: 13, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}><Pencil size={13} /> Modifier</button>
                  <button
                    onClick={() => !hasProducts && setDeleteDeptTarget(d)}
                    disabled={hasProducts}
                    title={hasProducts ? `${count} produit(s) dans ce département` : 'Supprimer'}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '7px 12px', border: '1px solid #FCA5A5', borderRadius: 7, fontFamily: 'Inter, sans-serif', fontSize: 13, cursor: hasProducts ? 'not-allowed' : 'pointer', backgroundColor: '#FFF5F5', color: '#DC2626', opacity: hasProducts ? 0.35 : 1 }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Image Picker */}
      {pickerOpen && <ImagePicker currentUrl={form.image} onSelect={url => setField('image', url)} onClose={() => setPickerOpen(false)} />}

      {/* ── Modal Produit ── */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
          <div style={{ width: isMobile ? '100%' : 560, height: '100vh', backgroundColor: '#FFFFFF', overflowY: 'auto', boxShadow: '-4px 0 24px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
              <div>
                <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 18, color: '#1A1A1A', margin: 0 }}>{editing ? 'Modifier le produit' : 'Ajouter un produit'}</h2>
                {editing && <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: '#6B7280', marginTop: 2 }}>Code : {editing.code}</p>}
              </div>
              <button onClick={closeModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280' }}><X size={20} /></button>
            </div>
            <div style={{ padding: '24px 24px', flex: 1 }}>
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
                    {depts.map(d => <option key={d.id} value={d.id}>{d.name_fr}</option>)}
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
                    <button onClick={() => setField('image', '')} style={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '50%', width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><X size={13} /></button>
                  </div>
                ) : (
                  <div style={{ width: '100%', height: 100, border: '2px dashed #E5E7EB', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, backgroundColor: '#F9FAFB' }}><ImageIcon size={28} color="#D1D5DB" /></div>
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
            <div style={{ padding: '20px 24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: 10, flexShrink: 0 }}>
              <button onClick={closeModal} style={{ padding: '10px 18px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}>Annuler</button>
              <button onClick={handleSave} disabled={saving} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: saving ? 'not-allowed' : 'pointer', backgroundColor: saving ? '#9CA3AF' : '#1A5C1A', color: '#FFFFFF' }}>
                {saving && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                {saving ? 'Enregistrement…' : editing ? 'Enregistrer' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal Département ── */}
      {deptModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
            <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 18, color: '#1A1A1A', margin: 0 }}>{editingDept ? 'Modifier le département' : 'Nouveau département'}</h2>
              <button onClick={closeDeptModal} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#6B7280' }}><X size={20} /></button>
            </div>
            <div style={{ padding: '24px 24px' }}>
              {deptError && <div style={{ backgroundColor: '#FFF5F5', border: '1px solid #FCA5A5', borderRadius: 8, padding: '12px 14px', fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#DC2626', marginBottom: 16 }}>{deptError}</div>}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div>
                  <label style={labelStyle}>ID * <span style={{ fontWeight: 400, color: '#9CA3AF' }}>(ex: frozen)</span></label>
                  <input style={inputStyle} value={deptForm.id} onChange={e => setDeptField('id', e.target.value)} placeholder="frozen" disabled={!!editingDept} />
                </div>
                <div>
                  <label style={labelStyle}>Code <span style={{ fontWeight: 400, color: '#9CA3AF' }}>(ex: 01)</span></label>
                  <input style={inputStyle} value={deptForm.code} onChange={e => setDeptField('code', e.target.value)} placeholder="01" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><label style={labelStyle}>Nom FR *</label><input style={inputStyle} value={deptForm.name_fr} onChange={e => setDeptField('name_fr', e.target.value)} placeholder="Produits Congelés" /></div>
                <div><label style={labelStyle}>Nom EN *</label><input style={inputStyle} value={deptForm.name_en} onChange={e => setDeptField('name_en', e.target.value)} placeholder="Frozen Products" /></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div><label style={labelStyle}>Description courte FR</label><input style={inputStyle} value={deptForm.lede_fr} onChange={e => setDeptField('lede_fr', e.target.value)} placeholder="Viandes, poissons…" /></div>
                <div><label style={labelStyle}>Description courte EN</label><input style={inputStyle} value={deptForm.lede_en} onChange={e => setDeptField('lede_en', e.target.value)} placeholder="Meat, fish…" /></div>
              </div>
              <div style={{ maxWidth: 140 }}>
                <label style={labelStyle}>Ordre d'affichage</label>
                <input style={inputStyle} type="number" value={deptForm.sort_order} onChange={e => setDeptField('sort_order', parseInt(e.target.value) || 0)} />
              </div>
            </div>
            <div style={{ padding: '20px 24px', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button onClick={closeDeptModal} style={{ padding: '10px 18px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}>Annuler</button>
              <button onClick={handleSaveDept} disabled={savingDept} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: savingDept ? 'not-allowed' : 'pointer', backgroundColor: savingDept ? '#9CA3AF' : '#1A5C1A', color: '#FFFFFF' }}>
                {savingDept && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                {savingDept ? 'Enregistrement…' : editingDept ? 'Enregistrer' : 'Créer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Confirmation suppression produit ── */}
      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 32, maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#FFF5F5', border: '1px solid #FCA5A5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Trash2 size={22} color="#DC2626" /></div>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 17, color: '#1A1A1A', marginBottom: 8 }}>Supprimer ce produit ?</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', marginBottom: 24 }}><strong style={{ color: '#1A1A1A' }}>{deleteTarget.name_fr}</strong> sera supprimé définitivement.</p>
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

      {/* ── Confirmation suppression département ── */}
      {deleteDeptTarget && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: 12, padding: 32, maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: '#FFF5F5', border: '1px solid #FCA5A5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Trash2 size={22} color="#DC2626" /></div>
            <h3 style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, fontSize: 17, color: '#1A1A1A', marginBottom: 8 }}>Supprimer ce département ?</h3>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: '#6B7280', marginBottom: 24 }}><strong style={{ color: '#1A1A1A' }}>{deleteDeptTarget.name_fr}</strong> sera supprimé définitivement.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteDeptTarget(null)} style={{ padding: '10px 18px', border: '1px solid #E5E7EB', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontSize: 14, cursor: 'pointer', backgroundColor: '#FFFFFF', color: '#374151' }}>Annuler</button>
              <button onClick={handleDeleteDept} disabled={deletingDept} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', border: 'none', borderRadius: 8, fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 14, cursor: deletingDept ? 'not-allowed' : 'pointer', backgroundColor: deletingDept ? '#9CA3AF' : '#DC2626', color: '#FFFFFF' }}>
                {deletingDept && <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />}
                {deletingDept ? 'Suppression…' : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
