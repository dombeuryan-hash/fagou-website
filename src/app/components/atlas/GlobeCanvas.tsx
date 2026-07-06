import { useEffect, useRef } from 'react'
import { FagouGlobe, type GlobeConfig } from '../../lib/fagou-globe'

interface Props {
  config: GlobeConfig
  label?: string
}

export function GlobeCanvas({ config, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef  = useRef<FagouGlobe | null>(null)

  // Signature changes when the node set changes → rebuild the globe so
  // arcs/nodes appear once countries load from Supabase.
  const sig = config.sources.map(s => s.id).join(',') + '|' + config.dests.map(d => d.id).join(',')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    globeRef.current?.destroy()
    globeRef.current = new FagouGlobe(canvas, config)
    return () => { globeRef.current?.destroy() }
  }, [sig]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="globe-holder">
      <canvas
        ref={canvasRef}
        data-globe-canvas
        aria-label={label ?? 'Interactive globe showing shipping routes from Belgium to Africa'}
      />
      <span className="globe-legend">
        <span className="dot" />
        Live trade routes · drag to rotate
      </span>
    </div>
  )
}
