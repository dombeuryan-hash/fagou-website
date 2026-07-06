import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface ProcessStep {
  id:         string
  number:     string
  label_fr:   string
  label_en:   string
  title_fr:   string
  title_en:   string
  body_fr:    string
  body_en:    string
  sort_order: number
}

export function useProcessSteps() {
  const [steps,   setSteps]   = useState<ProcessStep[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('process_steps')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        setSteps((data ?? []) as ProcessStep[])
        setLoading(false)
      })
  }, [])

  return { steps, loading }
}
