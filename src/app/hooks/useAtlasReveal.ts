import { useEffect } from 'react'

// Rect-based scroll reveal (mirrors site.js reveal logic).
// Re-queries `.r:not(.in)` on every scan so async-loaded content
// (department cards, brands, testimonials) is caught too.
// Pass a deps array so it re-scans immediately when data loads.
export function useAtlasReveal(deps: unknown[] = []) {
  useEffect(() => {
    const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
    if (REDUCED) {
      document.querySelectorAll('.r').forEach(el => el.classList.add('in'))
      return
    }

    function revealInView() {
      const vh = window.innerHeight
      document.querySelectorAll<HTMLElement>('.r:not(.in)').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < vh * 0.92 && rect.bottom > 0) el.classList.add('in')
      })
    }

    revealInView()
    window.addEventListener('scroll', revealInView, { passive: true })
    window.addEventListener('resize', revealInView)
    const t1 = setTimeout(revealInView, 400)
    const t2 = setTimeout(revealInView, 1200)

    return () => {
      window.removeEventListener('scroll', revealInView)
      window.removeEventListener('resize', revealInView)
      clearTimeout(t1); clearTimeout(t2)
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
