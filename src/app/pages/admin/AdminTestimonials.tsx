import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Tst {
  id: string; stars: number; quote_fr: string; quote_en: string
  client_name: string; client_type_fr: string; client_type_en: string
  client_country: string; sort_order: number
}

const EMPTY: Omit<Tst,'id'> = {
  stars:5, quote_fr:'', quote_en:'', client_name:'',
  client_type_fr:'', client_type_en:'', client_country:'', sort_order:0
}

export default function AdminTestimonials() {
  const [list,    setList]    = useState<Tst[]>([])
  const [editing, setEditing] = useState<Partial<Tst>|null>(null)
  const [saving,  setSaving]  = useState(false)

  const load = () =>
    supabase.from('testimonials').select('*').order('sort_order')
      .then(({data}) => setList((data??[]) as Tst[]))

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const { id, ...rest } = editing as Tst
    if (id) await supabase.from('testimonials').update(rest).eq('id', id)
    else    await supabase.from('testimonials').insert(rest)
    setSaving(false); setEditing(null); load()
  }

  const remove = async (id: string) => {
    if (!confirm('Supprimer ce témoignage ?')) return
    await supabase.from('testimonials').delete().eq('id', id)
    load()
  }

  const field = (k: keyof typeof EMPTY, label: string, textarea=false) => (
    <label key={k} style={{ display:'flex', flexDirection:'column', gap:4, fontSize:13, gridColumn: textarea ? '1 / -1' : undefined }}>
      <span style={{ color:'#6B7280' }}>{label}</span>
      {textarea
        ? <textarea value={(editing as any)?.[k]??''} rows={3} onChange={e => setEditing(p=>({...p,[k]:e.target.value}))}
            style={{ border:'1px solid #E5E7EB', borderRadius:6, padding:'8px 10px', fontSize:14, resize:'vertical' }} />
        : <input type="text" value={(editing as any)?.[k]??''} onChange={e => setEditing(p=>({...p,[k]:e.target.value}))}
            style={{ border:'1px solid #E5E7EB', borderRadius:6, padding:'8px 10px', fontSize:14 }} />
      }
    </label>
  )

  return (
    <div style={{ maxWidth:900, margin:'0 auto', padding:'32px 24px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
        <div>
          <h1 style={{ fontSize:24, fontWeight:600, color:'#1A1A1A', margin:0 }}>Témoignages</h1>
          <p style={{ color:'#6B7280', marginTop:4, fontSize:14 }}>Affichés dans la section testimonials de la page d'accueil.</p>
        </div>
        <button onClick={() => setEditing({...EMPTY})}
          style={{ background:'#1A5C1A', color:'#fff', border:'none', borderRadius:8, padding:'10px 18px', cursor:'pointer', fontWeight:500, fontSize:14 }}>
          + Ajouter
        </button>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {list.map((tst) => (
          <div key={tst.id} style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:12, padding:'20px 24px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
              <div>
                <div style={{ color:'#1A5C1A', fontSize:16, marginBottom:6 }}>{'★'.repeat(tst.stars)}</div>
                <div style={{ fontStyle:'italic', color:'#1A1A1A', fontSize:14, maxWidth:600, marginBottom:8 }}>«{tst.quote_en}»</div>
                <div style={{ fontSize:13, fontWeight:600 }}>{tst.client_name}</div>
                <div style={{ fontSize:12, color:'#6B7280' }}>{tst.client_type_en} · {tst.client_country}</div>
              </div>
              <div style={{ display:'flex', gap:8, flexShrink:0 }}>
                <button onClick={() => setEditing(tst)} style={{ color:'#1A5C1A', background:'none', border:'1px solid #1A5C1A', borderRadius:6, padding:'6px 12px', cursor:'pointer', fontSize:12, fontWeight:500 }}>Modifier</button>
                <button onClick={() => remove(tst.id)} style={{ color:'#C0392B', background:'none', border:'1px solid #C0392B', borderRadius:6, padding:'6px 12px', cursor:'pointer', fontSize:12, fontWeight:500 }}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, overflowY:'auto', padding:24 }}>
          <div style={{ background:'#fff', borderRadius:14, padding:32, width:'100%', maxWidth:600, boxShadow:'0 24px 60px rgba(0,0,0,.15)', margin:'auto' }}>
            <h2 style={{ fontSize:18, fontWeight:600, margin:'0 0 24px' }}>
              {(editing as Tst).id ? 'Modifier le témoignage' : 'Nouveau témoignage'}
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              <label style={{ display:'flex', flexDirection:'column', gap:4, fontSize:13 }}>
                <span style={{ color:'#6B7280' }}>Étoiles (1-5)</span>
                <select value={editing.stars??5} onChange={e => setEditing(p=>({...p,stars:parseInt(e.target.value)}))}
                  style={{ border:'1px solid #E5E7EB', borderRadius:6, padding:'8px 10px', fontSize:14 }}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
                </select>
              </label>
              {field('client_name','Nom du client')}
              {field('client_type_fr','Type client FR')}
              {field('client_type_en','Type client EN')}
              {field('client_country','Pays')}
              {field('sort_order','Ordre')}
              {field('quote_fr','Citation FR', true)}
              {field('quote_en','Citation EN', true)}
            </div>
            <div style={{ display:'flex', gap:10, marginTop:24, justifyContent:'flex-end' }}>
              <button onClick={() => setEditing(null)} style={{ padding:'10px 18px', borderRadius:8, border:'1px solid #E5E7EB', background:'#fff', cursor:'pointer', fontSize:14 }}>Annuler</button>
              <button onClick={save} disabled={saving} style={{ padding:'10px 18px', borderRadius:8, background:'#1A5C1A', color:'#fff', border:'none', cursor:'pointer', fontSize:14, fontWeight:500 }}>
                {saving ? 'Sauvegarde…' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
