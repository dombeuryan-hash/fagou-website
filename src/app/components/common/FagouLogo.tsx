interface FagouLogoProps {
  size?: number
  dark?: boolean
}

// viewBox 600×200 → 3:1 ratio. white rounded-card background is baked into the SVG.
export function FagouLogo({ size = 40 }: FagouLogoProps) {
  return (
    <img
      src="/assets/Fagou%20logo.svg"
      alt="Fagou"
      width={size * 3}
      height={size}
      style={{ display: 'block' }}
      draggable={false}
    />
  )
}
