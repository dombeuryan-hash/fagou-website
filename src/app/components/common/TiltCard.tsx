import { useRef } from 'react'

interface TiltCardProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
  intensity?: number
}

export function TiltCard({ children, style, className, intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-y * intensity}deg) rotateY(${x * intensity}deg) translateZ(10px)`
    el.style.boxShadow = `${-x * 16}px ${-y * 16}px 48px rgba(15,61,20,0.14)`
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
    el.style.boxShadow = ''
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ transition: 'transform 250ms ease, box-shadow 250ms ease', transformStyle: 'preserve-3d', ...style }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  )
}
