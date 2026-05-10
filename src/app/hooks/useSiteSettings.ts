import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

type Settings = Record<string, string>

export function useSiteSettings() {
  const [settings, setSettings] = useState<Settings>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      const map: Settings = {}
      for (const row of data ?? []) map[row.key] = row.value
      setSettings(map)
      setLoading(false)
    })
  }, [])

  return { settings, loading }
}

export async function updateSiteSetting(key: string, value: string) {
  return supabase.from('site_settings').upsert({ key, value }, { onConflict: 'key' })
}
