import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Department, DepartmentProduct } from '../types'

export type FlatProduct = DepartmentProduct & {
  dept: string
  deptNameFr: string
  deptNameEn: string
}

interface CatalogueState {
  departments: Department[]
  allProducts: FlatProduct[]
  loading: boolean
}

export function useCatalogue(): CatalogueState {
  const [state, setState] = useState<CatalogueState>({ departments: [], allProducts: [], loading: true })

  useEffect(() => {
    async function load() {
      const [{ data: depts }, { data: prods }] = await Promise.all([
        supabase.from('departments').select('*').order('sort_order'),
        supabase.from('catalogue_products').select('*').order('sort_order'),
      ])

      const departments: Department[] = (depts ?? []).map((d) => ({
        id: d.id,
        code: d.code,
        nameFr: d.name_fr,
        nameEn: d.name_en,
        ledeFr: d.lede_fr,
        ledeEn: d.lede_en,
        cover: d.cover ?? undefined,
        coverAltFr: d.cover_alt_fr ?? undefined,
        coverAltEn: d.cover_alt_en ?? undefined,
        products: (prods ?? [])
          .filter((p) => p.dept_id === d.id)
          .map((p) => ({
            code: p.code,
            nameFr: p.name_fr,
            nameEn: p.name_en,
            refFr: p.ref_fr,
            refEn: p.ref_en,
            photoAltFr: p.photo_alt_fr ?? undefined,
            photoAltEn: p.photo_alt_en ?? undefined,
            image: p.image ?? undefined,
            descriptionFr: p.description_fr ?? undefined,
            descriptionEn: p.description_en ?? undefined,
            brand: p.brand ?? undefined,
            formats: Array.isArray(p.formats) && p.formats.length ? p.formats : undefined,
            availability: p.availability ?? undefined,
            badge: p.badge ?? undefined,
            packagingTonnes: p.packaging_tonnes ?? undefined,
            packagingPalettes: p.packaging_palettes ?? undefined,
            packagingConteneurs: p.packaging_conteneurs ?? undefined,
            oilPercentage: p.oil_percentage ?? undefined,
          })),
      }))

      const allProducts: FlatProduct[] = departments.flatMap((d) =>
        d.products.map((p) => ({ ...p, dept: d.id, deptNameFr: d.nameFr, deptNameEn: d.nameEn }))
      )

      setState({ departments, allProducts, loading: false })
    }

    load()
  }, [])

  return state
}

export function useProductByCode(code: string) {
  const { departments, allProducts, loading } = useCatalogue()
  const product = allProducts.find((p) => p.code === code)
  const dept = departments.find((d) => d.products.some((p) => p.code === code))
  return { product, dept, loading }
}
