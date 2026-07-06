import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Country {
  id: string; name_fr: string; name_en: string
  lat: number; lon: number; type: 'source'|'destination'; sort_order: number
}

const EMPTY: Omit<Country,'id'> = {
  name_fr:'', name_en:'', lat:0, lon:0, type:'source', sort_order:0
}

export default function AdminNetworkCountries() {
  const [countries, setCountries] = useState<Country[]>([])
  const [editing,   setEditing]   = useState<Partial<Country>|null>(null)
  const [saving,    setSaving]    = useState(false)

  const load = () =>
    supabase.from('network_countries').select('*').order('type').order('sort_order')
      .then(({data}) => setCountries((data??[]) as Country[]))

  useEffect(() => { load() }, [])

  const save = async () => {
    if (!editing) return
    setSaving(true)
    const { id, ...rest } = editing as Country
    if (id) {
      await supabase.from('network_countries').update(rest).eq('id', id)
    } else {
      await supabase.from('network_countries').insert(rest)
    }
    setSaving(false)
    setEditing(null)
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Supprimer ce pays ?')) return
    await supabase.from('network_countries').delete().eq('id', id)
    load()
  }

  const field = (k: keyof typeof EMPTY, label: string, type='text') => (
    <label style={{ display:'flex', flexDirection:'column', gap:4, fontSize:13 }}>
      <span style={{ color:'#6B7280' }}>{label}</span>
      <input
        type={type}
        value={String((editing as any)?.[k] ?? '')}
        onChange={e => setEditing(p => ({...p, [k]: type==='number' ? parseFloat(e.target.value)||0 : e.target.value}))}
        style={{ border:'1px solid #E5E7EB', borderRadius:6, padding:'8px 10px', fontSize:14 }}
      />
    </label>
  )

  const sources = countries.filter(c => c.type==='source')
  const dests   = countries.filter(c => c.type==='destination')

  const Table = ({ list, label }: { list:Country[]; label:string }) => (
    <div style={{ marginBottom:32 }}>
      <h3 style={{ fontSize:14, fontWeight:600, marginBottom:12, color:'#1A1A1A' }}>{label}</h3>
      <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
        <thead>
          <tr style={{ borderBottom:'2px solid #E5E7EB' }}>
            {['FR','EN','Lat','Lon','Ordre',''].map(h => (
              <th key={h} style={{ textAlign:'left', padding:'8px 12px', color:'#6B7280', fontWeight:500 }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {list.map(c => (
            <tr key={c.id} style={{ borderBottom:'1px solid #F0F0F0' }}>
              <td style={{ padding:'10px 12px' }}>{c.name_fr}</td>
              <td style={{ padding:'10px 12px' }}>{c.name_en}</td>
              <td style={{ padding:'10px 12px', color:'#6B7280' }}>{c.lat}</td>
              <td style={{ padding:'10px 12px', color:'#6B7280' }}>{c.lon}</td>
              <td style={{ padding:'10px 12px', color:'#6B7280' }}>{c.sort_order}</td>
              <td style={{ padding:'10px 12px' }}>
                <button onClick={() => setEditing(c)} style={{ marginRight:8, color:'#1A5C1A', background:'none', border:'none', cursor:'pointer', fontSize:12, fontWeight:500 }}>Modifier</button>
                <button onClick={() => remove(c.id)} style={{ color:'#C0392B', background:'none', border:'none', cursor:'pointer', fontSize:12, fontWeight:500 }}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  return (
    <div style={{ maxWidth:900, margin:'0 auto', padding:'32px 24px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
        <div>
          <h1 style={{ fontSize:24, fontWeight:600, color:'#1A1A1A', margin:0 }}>Pays du réseau</h1>
          <p style={{ color:'#6B7280', marginTop:4, fontSize:14 }}>Alimente le globe 3D et la carte SVG sur la page d'accueil.</p>
        </div>
        <button
          onClick={() => setEditing({ ...EMPTY })}
          style={{ background:'#1A5C1A', color:'#fff', border:'none', borderRadius:8, padding:'10px 18px', cursor:'pointer', fontWeight:500, fontSize:14 }}
        >
          + Ajouter un pays
        </button>
      </div>

      <Table list={sources} label="Sources (sourcing → Belgique)" />
      <Table list={dests}   label="Destinations (Belgique → Afrique)" />

      {/* Modal */}
      {editing && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100 }}>
          <div style={{ background:'#fff', borderRadius:14, padding:32, width:'100%', maxWidth:520, boxShadow:'0 24px 60px rgba(0,0,0,.15)' }}>
            <h2 style={{ fontSize:18, fontWeight:600, margin:'0 0 24px' }}>
              {(editing as Country).id ? 'Modifier le pays' : 'Ajouter un pays'}
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {field('name_fr','Nom FR')}
              {field('name_en','Nom EN')}
              {field('lat','Latitude','number')}
              {field('lon','Longitude','number')}
              <label style={{ display:'flex', flexDirection:'column', gap:4, fontSize:13 }}>
                <span style={{ color:'#6B7280' }}>Type</span>
                <select
                  value={editing.type ?? 'source'}
                  onChange={e => setEditing(p => ({...p, type: e.target.value as 'source'|'destination'}))}
                  style={{ border:'1px solid #E5E7EB', borderRadius:6, padding:'8px 10px', fontSize:14 }}
                >
                  <option value="source">Source</option>
                  <option value="destination">Destination</option>
                </select>
              </label>
              {field('sort_order','Ordre','number')}
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
