import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { updateSiteSetting } from '../../hooks/useSiteSettings'

interface Step {
  id: string; number: string; label_fr: string; label_en: string
  title_fr: string; title_en: string; body_fr: string; body_en: string; sort_order: number
}

const EMPTY: Omit<Step,'id'> = {
  number:'', label_fr:'', label_en:'', title_fr:'', title_en:'',
  body_fr:'', body_en:'', sort_order:0
}

// Site settings keys editable here
const TEXT_SETTINGS = [
  { key:'atlas_hero_eyebrow_fr',   label:'Hero eyebrow FR' },
  { key:'atlas_hero_eyebrow_en',   label:'Hero eyebrow EN' },
  { key:'atlas_hero_title_fr',     label:'Hero titre FR' },
  { key:'atlas_hero_title_en',     label:'Hero titre EN' },
  { key:'atlas_hero_lede_fr',      label:'Hero lede FR' },
  { key:'atlas_hero_lede_en',      label:'Hero lede EN' },
  { key:'atlas_coldroom_eyebrow_fr', label:'Chambre froide eyebrow FR' },
  { key:'atlas_coldroom_eyebrow_en', label:'Chambre froide eyebrow EN' },
  { key:'atlas_coldroom_title_fr', label:'Chambre froide titre FR' },
  { key:'atlas_coldroom_title_en', label:'Chambre froide titre EN' },
  { key:'atlas_coldroom_lede_fr',  label:'Chambre froide lede FR' },
  { key:'atlas_coldroom_lede_en',  label:'Chambre froide lede EN' },
  { key:'atlas_coldroom_tag_fr',   label:'Chambre froide tag FR' },
  { key:'atlas_coldroom_tag_en',   label:'Chambre froide tag EN' },
  { key:'atlas_cta_title_fr',      label:'CTA titre FR' },
  { key:'atlas_cta_title_en',      label:'CTA titre EN' },
  { key:'atlas_cta_lede_fr',       label:'CTA lede FR' },
  { key:'atlas_cta_lede_en',       label:'CTA lede EN' },
]

export default function AdminProcessSteps() {
  const [steps,    setSteps]   = useState<Step[]>([])
  const [editing,  setEditing] = useState<Partial<Step>|null>(null)
  const [saving,   setSaving]  = useState(false)
  const [settings, setSettings] = useState<Record<string,string>>({})
  const [settingsSaving, setSettingsSaving] = useState(false)

  const loadSteps = () =>
    supabase.from('process_steps').select('*').order('sort_order')
      .then(({data}) => setSteps((data??[]) as Step[]))

  const loadSettings = () =>
    supabase.from('site_settings').select('key,value')
      .in('key', TEXT_SETTINGS.map(s => s.key))
      .then(({data}) => {
        const map: Record<string,string> = {}
        for (const row of data??[]) map[row.key] = row.value
        setSettings(map)
      })

  useEffect(() => { loadSteps(); loadSettings() }, [])

  const saveStep = async () => {
    if (!editing) return
    setSaving(true)
    const { id, ...rest } = editing as Step
    if (id) await supabase.from('process_steps').update(rest).eq('id', id)
    else    await supabase.from('process_steps').insert(rest)
    setSaving(false); setEditing(null); loadSteps()
  }

  const removeStep = async (id: string) => {
    if (!confirm('Supprimer cette étape ?')) return
    await supabase.from('process_steps').delete().eq('id', id)
    loadSteps()
  }

  const saveSettings = async () => {
    setSettingsSaving(true)
    await Promise.all(Object.entries(settings).map(([k,v]) => updateSiteSetting(k,v)))
    setSettingsSaving(false)
    alert('Textes sauvegardés.')
  }

  const field = (k: keyof typeof EMPTY, label: string, textarea=false) => (
    <label key={k} style={{ display:'flex', flexDirection:'column', gap:4, fontSize:13, gridColumn: textarea ? '1 / -1' : undefined }}>
      <span style={{ color:'#6B7280' }}>{label}</span>
      {textarea
        ? <textarea rows={3} value={(editing as any)?.[k]??''} onChange={e => setEditing(p=>({...p,[k]:e.target.value}))}
            style={{ border:'1px solid #E5E7EB', borderRadius:6, padding:'8px 10px', fontSize:14, resize:'vertical' }} />
        : <input type="text" value={(editing as any)?.[k]??''} onChange={e => setEditing(p=>({...p,[k]:e.target.value}))}
            style={{ border:'1px solid #E5E7EB', borderRadius:6, padding:'8px 10px', fontSize:14 }} />
      }
    </label>
  )

  return (
    <div style={{ maxWidth:900, margin:'0 auto', padding:'32px 24px' }}>

      {/* Étapes process */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h1 style={{ fontSize:24, fontWeight:600, color:'#1A1A1A', margin:0 }}>Étapes du processus</h1>
          <p style={{ color:'#6B7280', marginTop:4, fontSize:14 }}>Section « De la demande à la livraison » sur la page d'accueil.</p>
        </div>
        <button onClick={() => setEditing({...EMPTY})}
          style={{ background:'#1A5C1A', color:'#fff', border:'none', borderRadius:8, padding:'10px 18px', cursor:'pointer', fontWeight:500, fontSize:14 }}>
          + Ajouter
        </button>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:48 }}>
        {steps.map(step => (
          <div key={step.id} style={{ background:'#fff', border:'1px solid #E5E7EB', borderRadius:10, padding:'16px 20px', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <div>
              <span style={{ fontFamily:'monospace', fontSize:12, color:'#1A5C1A', marginRight:12 }}>{step.number}</span>
              <strong style={{ fontSize:15 }}>{step.title_en}</strong>
              <span style={{ fontSize:12, color:'#6B7280', marginLeft:12 }}>{step.title_fr}</span>
            </div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={() => setEditing(step)} style={{ color:'#1A5C1A', background:'none', border:'1px solid #1A5C1A', borderRadius:6, padding:'5px 12px', cursor:'pointer', fontSize:12 }}>Modifier</button>
              <button onClick={() => removeStep(step.id)} style={{ color:'#C0392B', background:'none', border:'1px solid #C0392B', borderRadius:6, padding:'5px 12px', cursor:'pointer', fontSize:12 }}>Supprimer</button>
            </div>
          </div>
        ))}
      </div>

      {/* Textes de la page (site_settings) */}
      <h2 style={{ fontSize:18, fontWeight:600, color:'#1A1A1A', marginBottom:16 }}>Textes de la page d'accueil (Hero, Chambre froide, CTA)</h2>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14, marginBottom:20 }}>
        {TEXT_SETTINGS.map(({ key, label }) => (
          <label key={key} style={{ display:'flex', flexDirection:'column', gap:4, fontSize:13 }}>
            <span style={{ color:'#6B7280' }}>{label}</span>
            <input
              type="text" value={settings[key]??''}
              onChange={e => setSettings(p => ({...p,[key]:e.target.value}))}
              style={{ border:'1px solid #E5E7EB', borderRadius:6, padding:'8px 10px', fontSize:14 }}
            />
          </label>
        ))}
      </div>
      <button onClick={saveSettings} disabled={settingsSaving}
        style={{ background:'#1A5C1A', color:'#fff', border:'none', borderRadius:8, padding:'11px 22px', cursor:'pointer', fontWeight:500, fontSize:14 }}>
        {settingsSaving ? 'Sauvegarde…' : 'Sauvegarder les textes'}
      </button>

      {/* Modal step */}
      {editing && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,.45)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, overflowY:'auto', padding:24 }}>
          <div style={{ background:'#fff', borderRadius:14, padding:32, width:'100%', maxWidth:600, boxShadow:'0 24px 60px rgba(0,0,0,.15)', margin:'auto' }}>
            <h2 style={{ fontSize:18, fontWeight:600, margin:'0 0 24px' }}>
              {(editing as Step).id ? 'Modifier l\'étape' : 'Nouvelle étape'}
            </h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
              {field('number','Numéro (ex: 01)')}
              {field('sort_order','Ordre')}
              {field('label_fr','Label FR (ex: Étape 01 · Brief)')}
              {field('label_en','Label EN (ex: Step 01 · Brief)')}
              {field('title_fr','Titre FR')}
              {field('title_en','Titre EN')}
              {field('body_fr','Texte FR', true)}
              {field('body_en','Texte EN', true)}
            </div>
            <div style={{ display:'flex', gap:10, marginTop:24, justifyContent:'flex-end' }}>
              <button onClick={() => setEditing(null)} style={{ padding:'10px 18px', borderRadius:8, border:'1px solid #E5E7EB', background:'#fff', cursor:'pointer', fontSize:14 }}>Annuler</button>
              <button onClick={saveStep} disabled={saving} style={{ padding:'10px 18px', borderRadius:8, background:'#1A5C1A', color:'#fff', border:'none', cursor:'pointer', fontSize:14, fontWeight:500 }}>
                {saving ? 'Sauvegarde…' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
