import { useEffect } from 'react'

// Drives the process section vertical spine fill + active step highlight.
// Re-queries `.step` each scroll (async steps), re-scans when deps change.
export function useProcessSpine(deps: unknown[] = []) {
  useEffect(() => {
    function onSpine() {
      const spine = document.querySelector('.spine') as HTMLElement | null
      const fill  = document.querySelector('.spine-fill') as HTMLElement | null
      if (!spine) return
      const r   = spine.getBoundingClientRect()
      const vh  = window.innerHeight
      const tot = r.height
      const scrolled = Math.min(tot, Math.max(0, vh * 0.5 - r.top))
      if (fill) fill.style.setProperty('--p', tot ? String((scrolled / tot).toFixed(3)) : '0')
      const mid = vh * 0.5
      document.querySelectorAll('.step').forEach(s => {
        const sr = s.getBoundingClientRect()
        s.classList.toggle('active', sr.top < mid && sr.bottom > mid * 0.6)
      })
    }

    onSpine()
    window.addEventListener('scroll', onSpine, { passive: true })
    window.addEventListener('resize', onSpine)
    return () => {
      window.removeEventListener('scroll', onSpine)
      window.removeEventListener('resize', onSpine)
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
