import { useEffect } from 'react'

function easeOutCubic(t: number) { return 1 - Math.pow(1-t, 3) }

function runCount(el: HTMLElement) {
  const target = parseFloat(el.getAttribute('data-count') ?? '0')
  const suffix = el.getAttribute('data-suffix') ?? ''
  const group  = el.hasAttribute('data-group')
  const dec    = (String(target).split('.')[1] ?? '').length

  function fmt(v: number) {
    let s = dec ? v.toFixed(dec) : String(Math.round(v))
    if (group) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    return s + suffix
  }

  const REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches
  if (REDUCED) { el.textContent = fmt(target); return }

  const dur = 1400
  let start: number | null = null
  function step(ts: number) {
    if (start === null) start = ts
    const p = Math.min(1, (ts - start) / dur)
    el.textContent = fmt(target * easeOutCubic(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

// Fires animated counters when [data-count] elements enter the viewport.
// Re-queries un-run counters each scan; re-scans when deps change.
export function useAtlasCounters(deps: unknown[] = []) {
  useEffect(() => {
    function runInView() {
      const vh = window.innerHeight
      document.querySelectorAll<HTMLElement>('[data-count]:not([data-counted])').forEach(el => {
        const rect = el.getBoundingClientRect()
        if (rect.top < vh * 0.85 && rect.bottom > 0) {
          el.setAttribute('data-counted', '')
          runCount(el)
        }
      })
    }

    runInView()
    window.addEventListener('scroll', runInView, { passive: true })
    const t = setTimeout(runInView, 600)

    return () => { window.removeEventListener('scroll', runInView); clearTimeout(t) }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps
}
