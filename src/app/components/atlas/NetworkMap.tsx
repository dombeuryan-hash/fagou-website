import { useEffect, useRef } from 'react'

export interface MapNode {
  name: string
  lat:  number
  lon:  number
  type: 'source' | 'destination' | 'hub'
}

interface Props { nodes: MapNode[] }

const W = 600, H = 520
const HUB = { x: 300, y: 200 }
const AMBER = '#B08A36'
const GREEN = '#1A5C1A'
const NS    = 'http://www.w3.org/2000/svg'

function svgEl(tag: string, attrs: Record<string, string | number>) {
  const el = document.createElementNS(NS, tag)
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v))
  return el
}

// Schematic fan layout (like the reference map): sources arc above the hub,
// destinations arc below. Auto-distributes any number of nodes.
function fanPosition(i: number, n: number, dir: 'up' | 'down') {
  if (n === 1) return { x: HUB.x, y: dir === 'up' ? 70 : 410 }
  const span  = dir === 'up' ? { a0: 208, a1: 332 } : { a0: 35, a1: 145 }
  const R     = dir === 'up' ? 168 : 200
  const angle = (span.a0 + (span.a1 - span.a0) * (i / (n - 1))) * Math.PI / 180
  return {
    x: Math.round(HUB.x + R * Math.cos(angle)),
    y: Math.round(HUB.y + R * Math.sin(angle)),
  }
}

export function NetworkMap({ nodes }: Props) {
  const svgRef   = useRef<SVGSVGElement>(null)
  const drawnRef = useRef(false)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || nodes.length === 0) return

    while (svg.firstChild) svg.removeChild(svg.firstChild)
    drawnRef.current = false

    const sources = nodes.filter(n => n.type === 'source')
    const dests   = nodes.filter(n => n.type === 'destination')

    // dot grid
    const grid = document.createElementNS(NS, 'g')
    for (let gx = 30; gx < W; gx += 26)
      for (let gy = 30; gy < H; gy += 26)
        grid.appendChild(svgEl('circle', { cx: gx, cy: gy, r: 1, fill: '#DCD7C9' }))
    svg.appendChild(grid)

    const paths: SVGPathElement[] = []

    const drawArc = (
      ax: number, ay: number, bx: number, by: number,
      color: string, lift: number, i: number, dashed: boolean
    ) => {
      const mx = (ax+bx)/2, my = (ay+by)/2 - lift
      const p = svgEl('path', {
        d: `M${ax} ${ay} Q${mx} ${my} ${bx} ${by}`,
        fill: 'none', stroke: color,
        'stroke-width': dashed ? '1.1' : '1.5',
        'stroke-opacity': dashed ? '0.5' : '0.65',
        'stroke-linecap': 'round',
      }) as SVGPathElement
      svg.appendChild(p)
      const len = p.getTotalLength()
      p.style.strokeDasharray  = String(len)
      p.style.strokeDashoffset = String(len)
      p.style.transition = `stroke-dashoffset 1.3s cubic-bezier(0.16,1,0.3,1) ${i*0.12}s`
      paths.push(p)
    }

    const drawNode = (
      x: number, y: number, color: string, label: string,
      isDest: boolean, i: number
    ) => {
      svg.appendChild(svgEl('circle', { cx: x, cy: y, r: '3.2', fill: color }))
      const ring = svgEl('circle', {
        cx: x, cy: y, r: '3.2', fill: 'none', stroke: color, 'stroke-width': '1', class: 'net-pulse',
      })
      ;(ring as SVGElement).style.animationDelay = `${i*0.35}s`
      svg.appendChild(ring)
      // Label: anchor away from the map edge to avoid clipping/overlap
      const leftish  = x < 110
      const rightish = x > W - 110
      const lbl = svgEl('text', {
        x: leftish ? x - 8 : rightish ? x + 8 : x,
        y: y + (isDest ? 16 : -10),
        'font-family': "'JetBrains Mono', monospace",
        'font-size': '8.5', 'letter-spacing': '1', fill: '#5C665F',
        'text-anchor': leftish ? 'end' : rightish ? 'end' : 'middle',
      })
      lbl.textContent = label
      svg.appendChild(lbl)
    }

    sources.forEach((_, i) => {
      const pt = fanPosition(i, sources.length, 'up')
      drawArc(pt.x, pt.y, HUB.x, HUB.y, AMBER, 46, i, true)
    })
    dests.forEach((_, i) => {
      const pt = fanPosition(i, dests.length, 'down')
      drawArc(HUB.x, HUB.y, pt.x, pt.y, GREEN, 54, i+6, false)
    })
    sources.forEach((sNode, i) => {
      const pt = fanPosition(i, sources.length, 'up')
      drawNode(pt.x, pt.y, AMBER, sNode.name.toUpperCase(), false, i)
    })
    dests.forEach((dNode, i) => {
      const pt = fanPosition(i, dests.length, 'down')
      drawNode(pt.x, pt.y, GREEN, dNode.name.toUpperCase(), true, i)
    })

    // hub
    svg.appendChild(svgEl('circle', { cx: HUB.x, cy: HUB.y, r: 5.5, fill: '#0C2E10' }))
    svg.appendChild(svgEl('circle', {
      cx: HUB.x, cy: HUB.y, r: 5.5, fill: 'none', stroke: GREEN, 'stroke-width': '1.2', class: 'net-pulse',
    }))
    const hubLbl = svgEl('text', {
      x: HUB.x + 12, y: HUB.y - 10,
      'font-family': "'JetBrains Mono', monospace",
      'font-size': '9.5', 'letter-spacing': '1.4', fill: GREEN, 'font-weight': '600',
    })
    hubLbl.textContent = 'BELGIUM · HUB'
    svg.appendChild(hubLbl)

    // animate arcs into view
    const trigger = () => {
      if (drawnRef.current) return
      const rect = svg.getBoundingClientRect()
      const vh   = window.innerHeight
      if (rect.top < vh * 0.85 && rect.bottom > 0) {
        drawnRef.current = true
        paths.forEach(p => { p.style.strokeDashoffset = '0' })
      }
    }
    trigger()
    window.addEventListener('scroll', trigger, { passive: true })
    window.addEventListener('load', trigger)
    return () => window.removeEventListener('scroll', trigger)
  }, [nodes])

  return (
    <div className="map-panel r r-scale d1">
      <svg
        ref={svgRef}
        id="netmap"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
        aria-label="World trade map: sourcing countries feed the Belgian hub, which delivers to African markets"
      />
      <div className="map-legend">
        <span><i className="lg in" />Sourcing</span>
        <span><i className="lg out" />Distribution</span>
      </div>
    </div>
  )
}
