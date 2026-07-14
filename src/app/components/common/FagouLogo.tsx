interface FagouLogoProps {
  size?: number
  dark?: boolean
}

// Official Fagou logo (JPG, ~2.6:1 ratio, white background baked in).
// On light backgrounds `multiply` melts the white box into the page;
// on dark backgrounds (dark=true) it stays a white rounded plate.
export function FagouLogo({ size = 40, dark = false }: FagouLogoProps) {
  return (
    <img
      src="/assets/fagou-logo.jpg"
      alt="Fagou"
      height={Math.round(size * 1.25)}
      style={{
        display: 'block',
        width: 'auto',
        borderRadius: 6,
        mixBlendMode: dark ? 'normal' : 'multiply',
      }}
      draggable={false}
    />
  )
}
