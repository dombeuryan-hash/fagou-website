/* ============================================================
   FAGOU Globe « Atlas » — TypeScript port of globe.js
   Hub + configurable source/destination nodes via constructor.
   ============================================================ */

export interface GlobeNode {
  id:   string
  name: string
  lat:  number
  lon:  number
}

export interface GlobeConfig {
  hub:     GlobeNode & { hub: true }
  sources: GlobeNode[]
  dests:   GlobeNode[]
}

const REDUCED = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion:reduce)').matches

function deg2rad(d: number) { return d * Math.PI / 180 }
function latlon2vec(lat: number, lon: number) {
  const phi = deg2rad(lat), lam = deg2rad(lon)
  const cp = Math.cos(phi)
  return { x: cp * Math.sin(lam), y: Math.sin(phi), z: cp * Math.cos(lam) }
}
function slerp(
  a: { x:number; y:number; z:number },
  b: { x:number; y:number; z:number },
  t: number
) {
  let dot = a.x*b.x + a.y*b.y + a.z*b.z
  dot = Math.max(-1, Math.min(1, dot))
  const om = Math.acos(dot)
  if (om < 1e-5) return { x: a.x, y: a.y, z: a.z }
  const s = Math.sin(om)
  const k0 = Math.sin((1-t)*om)/s, k1 = Math.sin(t*om)/s
  return { x: a.x*k0+b.x*k1, y: a.y*k0+b.y*k1, z: a.z*k0+b.z*k1 }
}
function hexToRgb(hex: string) {
  hex = (hex||'#1A5C1A').trim().replace('#','')
  if (hex.length===3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2]
  const n = parseInt(hex, 16)
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 }
}

interface RGB { r:number; g:number; b:number }

interface Route {
  samples: { x:number; y:number; z:number }[]
  dir:   'in' | 'out'
  node:  GlobeNode
  phase: number
  speed: number
}

interface Point { x:number; y:number; z:number }
interface Projected { sx:number; sy:number; z:number }

export class FagouGlobe {
  private canvas: HTMLCanvasElement
  private ctx:    CanvasRenderingContext2D
  private dpr:    number
  private accent: RGB = { r:26, g:92, b:26 }
  private amber:  RGB = { r:196, g:154, b:74 }
  private yaw   = -0.10
  private pitch  =  0.38
  private spin:    number
  private vYaw  = 0; private vPitch = 0
  private dragging = false; private lastX = 0; private lastY = 0
  private t = 0
  private points:  Point[] = []
  private routes:  Route[] = []
  private W = 0; private H = 0; private cx = 0; private cy = 0; private R = 0
  private _raf: number | null = null
  private config: GlobeConfig

  constructor(canvas: HTMLCanvasElement, config: GlobeConfig) {
    this.canvas  = canvas
    this.ctx     = canvas.getContext('2d')!
    this.dpr     = Math.min(window.devicePixelRatio || 1, 2)
    this.spin    = REDUCED ? 0 : 0.0015
    this.config  = config
    this.refreshAccent()
    this.buildPoints()
    this.buildRoutes()
    this.resize()
    this.bind()
    if (REDUCED) { this.t = 0.3; this.render() }
    else { this._raf = requestAnimationFrame(this.frame) }
  }

  private refreshAccent() {
    const cs = getComputedStyle(document.documentElement).getPropertyValue('--green')
    if (cs) this.accent = hexToRgb(cs)
  }

  private buildPoints() {
    const pts: Point[] = [], rings = 34, perEq = 54
    for (let i = 0; i < rings; i++) {
      const lat = -90 + (i + 0.5) / rings * 180
      const count = Math.max(1, Math.round(Math.cos(deg2rad(lat)) * perEq))
      for (let j = 0; j < count; j++) {
        const lon = (j / count) * 360 - 180
        pts.push(latlon2vec(lat, lon))
      }
    }
    this.points = pts
  }

  private makeArc(from: GlobeNode, to: GlobeNode, dir: 'in'|'out', k: number): Route {
    const a = latlon2vec(from.lat, from.lon)
    const b = latlon2vec(to.lat, to.lon)
    const segs = 64, samples: Point[] = []
    for (let s = 0; s <= segs; s++) {
      const t = s / segs
      const v = slerp(a, b, t)
      const lift = 1 + 0.20 * Math.sin(Math.PI * t)
      samples.push({ x:v.x*lift, y:v.y*lift, z:v.z*lift })
    }
    return { samples, dir, node: to, phase: (k * 0.137) % 1, speed: 0.085 + (k%4)*0.014 }
  }

  private buildRoutes() {
    this.routes = []
    const hub = this.config.hub
    this.config.sources.forEach((s,k) => this.routes.push(this.makeArc(s, hub, 'in', k)))
    this.config.dests.forEach((d,k)   => this.routes.push(this.makeArc(hub, d, 'out', k+6)))
  }

  resize() {
    const r = this.canvas.getBoundingClientRect()
    const w = Math.max(1, r.width), h = Math.max(1, r.height)
    this.canvas.width = w * this.dpr; this.canvas.height = h * this.dpr
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
    this.W = w; this.H = h; this.cx = w/2; this.cy = h/2
    this.R = Math.min(w, h) * 0.40
  }

  private project(v: Point): Projected {
    const cy2 = Math.cos(this.yaw), sy = Math.sin(this.yaw)
    const x1 = v.x*cy2 + v.z*sy, z1 = -v.x*sy + v.z*cy2, y1 = v.y
    const cp = Math.cos(this.pitch), sp = Math.sin(this.pitch)
    const y2 = y1*cp - z1*sp, z2 = y1*sp + z1*cp
    return { sx: this.cx + x1*this.R, sy: this.cy - y2*this.R, z: z2 }
  }

  private bind() {
    const self = this, c = this.canvas
    const ro = new ResizeObserver(() => { self.resize(); if (REDUCED) self.render() })
    ro.observe(c)
    const down = (e: MouseEvent|TouchEvent) => {
      self.dragging = true; self.vYaw = 0; self.vPitch = 0
      const p = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as MouseEvent)
      self.lastX = p.clientX; self.lastY = p.clientY
    }
    const move = (e: MouseEvent|TouchEvent) => {
      if (!self.dragging) return
      const p = (e as TouchEvent).touches ? (e as TouchEvent).touches[0] : (e as MouseEvent)
      const dx = p.clientX - self.lastX, dy = p.clientY - self.lastY
      self.lastX = p.clientX; self.lastY = p.clientY
      self.yaw += dx*0.006; self.vYaw = dx*0.006
      self.pitch = Math.max(-1.05, Math.min(1.05, self.pitch - dy*0.006))
      self.vPitch = -dy*0.006
      if ((e as TouchEvent).cancelable) e.preventDefault()
      if (REDUCED) self.render()
    }
    const up = () => { self.dragging = false }
    c.addEventListener('mousedown', down)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseup', up)
    c.addEventListener('touchstart', down as EventListener, { passive: true })
    c.addEventListener('touchmove', move as EventListener, { passive: false })
    window.addEventListener('touchend', up)
  }

  private frame = () => {
    if (!this.dragging) {
      this.yaw += this.spin + this.vYaw
      this.pitch = Math.max(-1.05, Math.min(1.05, this.pitch + this.vPitch))
      this.vYaw   *= 0.94; this.vPitch *= 0.94
      if (Math.abs(this.vYaw)   < 1e-4) this.vYaw   = 0
      if (Math.abs(this.vPitch) < 1e-4) this.vPitch = 0
    }
    this.t += 0.0042
    this.render()
    this._raf = requestAnimationFrame(this.frame)
  }

  destroy() {
    if (this._raf !== null) cancelAnimationFrame(this._raf)
  }

  private render() {
    const ctx = this.ctx, A = this.accent
    ctx.clearRect(0, 0, this.W, this.H)
    const hal = ctx.createRadialGradient(this.cx, this.cy, this.R*0.2, this.cx, this.cy, this.R*1.55)
    hal.addColorStop(0,    `rgba(${A.r},${A.g},${A.b},0.14)`)
    hal.addColorStop(0.55, `rgba(${A.r},${A.g},${A.b},0.05)`)
    hal.addColorStop(1,    `rgba(${A.r},${A.g},${A.b},0)`)
    ctx.fillStyle = hal
    ctx.beginPath(); ctx.arc(this.cx, this.cy, this.R*1.55, 0, 6.2832); ctx.fill()
    this.drawDots(1)
    this.drawRoutes(1)
    this.drawNodes()
  }

  private drawDots(strength: number) {
    const ctx = this.ctx, A = this.accent
    for (const pt of this.points) {
      const p = this.project(pt)
      const front = p.z >= 0
      const depth = (p.z+1)/2
      const rad   = (front ? 1.05 : 0.7) * (0.5 + depth*0.9)
      const alpha = (front ? 0.42 : 0.12) * (0.4 + depth*0.7) * strength
      ctx.beginPath()
      ctx.fillStyle = `rgba(${A.r},${A.g},${A.b},${alpha.toFixed(3)})`
      ctx.arc(p.sx, p.sy, rad, 0, 6.2832); ctx.fill()
    }
  }

  private drawRoutes(boost: number) {
    const ctx = this.ctx
    for (const route of this.routes) {
      const col = route.dir === 'in' ? this.amber : this.accent
      ctx.lineWidth = route.dir === 'in' ? 1.1 : 1.5
      for (let s = 0; s < route.samples.length-1; s++) {
        const p0 = this.project(route.samples[s])
        const p1 = this.project(route.samples[s+1])
        const depth = (((p0.z+p1.z)/2)+1.18)/2.36
        if (depth < 0.06) continue
        const a = (0.13 + depth * (route.dir==='in' ? 0.5 : 0.72)) * boost
        ctx.beginPath()
        ctx.strokeStyle = `rgba(${col.r|0},${col.g|0},${col.b|0},${a.toFixed(3)})`
        ctx.moveTo(p0.sx, p0.sy); ctx.lineTo(p1.sx, p1.sy); ctx.stroke()
      }
      const prog = (this.t * route.speed + route.phase) % 1
      const tp   = route.dir === 'in' ? (1-prog) : prog
      const idx  = Math.min(route.samples.length-1, Math.floor(tp*(route.samples.length-1)))
      const pv   = this.project(route.samples[idx])
      if (pv.z > -0.1) {
        const depth2 = (pv.z+1)/2
        const g = ctx.createRadialGradient(pv.sx, pv.sy, 0, pv.sx, pv.sy, 9)
        g.addColorStop(0,   `rgba(255,255,255,${(0.9*depth2).toFixed(2)})`)
        g.addColorStop(0.4, `rgba(${col.r|0},${col.g|0},${col.b|0},${(0.55*depth2).toFixed(2)})`)
        g.addColorStop(1,   `rgba(${col.r|0},${col.g|0},${col.b|0},0)`)
        ctx.fillStyle = g
        ctx.beginPath(); ctx.arc(pv.sx, pv.sy, 9, 0, 6.2832); ctx.fill()
        ctx.fillStyle = `rgba(255,255,255,${(0.95*depth2).toFixed(2)})`
        ctx.beginPath(); ctx.arc(pv.sx, pv.sy, 1.7, 0, 6.2832); ctx.fill()
      }
    }
  }

  private drawNodes() {
    const ctx = this.ctx, A = this.accent
    const pulse = 0.5 + 0.5*Math.sin(this.t*2.4)
    const hub = this.config.hub

    const drawNode = (port: GlobeNode, col: RGB, isHub: boolean) => {
      const p = this.project(latlon2vec(port.lat, port.lon))
      if (p.z < -0.05) return
      const depth = (p.z+1)/2
      const ag = 0.5 + depth*0.5
      const rr = (isHub ? 5 : 3.2) + pulse*(isHub ? 7 : 3.5)
      ctx.beginPath()
      ctx.strokeStyle = `rgba(${col.r|0},${col.g|0},${col.b|0},${((1-pulse)*0.5*ag).toFixed(3)})`
      ctx.lineWidth = 1; ctx.arc(p.sx, p.sy, rr, 0, 6.2832); ctx.stroke()
      ctx.beginPath()
      ctx.fillStyle = isHub
        ? `rgba(255,255,255,${ag.toFixed(2)})`
        : `rgba(${col.r|0},${col.g|0},${col.b|0},${ag.toFixed(2)})`
      ctx.arc(p.sx, p.sy, isHub ? 4 : 2.4, 0, 6.2832); ctx.fill()
      if (isHub) {
        ctx.beginPath(); ctx.fillStyle = `rgba(${A.r},${A.g},${A.b},1)`
        ctx.arc(p.sx, p.sy, 1.8, 0, 6.2832); ctx.fill()
        ctx.font = '600 10px "JetBrains Mono", monospace'
        ctx.fillStyle = `rgba(${A.r},${A.g},${A.b},${(0.92*ag).toFixed(2)})`
        ctx.textBaseline = 'middle'
        ctx.fillText('BELGIUM', p.sx+11, p.sy)
        ctx.strokeStyle = `rgba(${A.r},${A.g},${A.b},${(0.5*ag).toFixed(2)})`
        ctx.beginPath(); ctx.moveTo(p.sx+5, p.sy); ctx.lineTo(p.sx+9, p.sy); ctx.stroke()
      } else if (p.z > 0.08) {
        // Country label — only on clearly front-facing nodes, fading with depth
        ctx.font = '500 8.5px "JetBrains Mono", monospace'
        ctx.fillStyle = `rgba(${col.r|0},${col.g|0},${col.b|0},${(0.8*ag).toFixed(2)})`
        ctx.textBaseline = 'middle'
        ctx.fillText(port.name.toUpperCase(), p.sx+8, p.sy)
      }
    }

    this.config.sources.forEach(s => drawNode(s, this.amber, false))
    this.config.dests.forEach(d   => drawNode(d, A,          false))
    drawNode(hub as GlobeNode, A, true)
  }
}
