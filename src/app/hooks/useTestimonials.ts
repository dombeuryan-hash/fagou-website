import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Testimonial {
  id:              string
  stars:           number
  quote_fr:        string
  quote_en:        string
  client_name:     string
  client_type_fr:  string
  client_type_en:  string
  client_country:  string
  sort_order:      number
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    supabase
      .from('testimonials')
      .select('*')
      .order('sort_order')
      .then(({ data }) => {
        setTestimonials((data ?? []) as Testimonial[])
        setLoading(false)
      })
  }, [])

  return { testimonials, loading }
}
