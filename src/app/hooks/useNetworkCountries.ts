import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface NetworkCountry {
  id:         string
  name_fr:    string
  name_en:    string
  lat:        number
  lon:        number
  type:       'source' | 'destination'
  sort_order: number
}

export function useNetworkCountries() {
  const [countries, setCountries] = useState<NetworkCountry[]>([])
  const [loading,   setLoading]   = useState(true)

  useEffect(() => {
    supabase
      .from('network_countries')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        setCountries((data ?? []) as NetworkCountry[])
        setLoading(false)
      })
  }, [])

  return { countries, loading }
}
