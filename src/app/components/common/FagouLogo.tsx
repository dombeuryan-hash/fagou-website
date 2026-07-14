interface FagouLogoProps {
  size?: number
  dark?: boolean
}

// Official Fagou logo (JPG, white background baked in).
// Sizing MUST be inline style: the Tailwind preflight sets
// `img { height: auto }`, which overrides the height attribute.
// ×1.35 maps the callers' sizes onto the HomeAtlas calibration:
// nav 40→54px, scrolled 34→46px (same as .at-brand-logo).
// On light backgrounds `multiply` melts the white box into the page;
// on dark backgrounds (dark=true) it stays a white rounded plate.
export function FagouLogo({ size = 40, dark = false }: FagouLogoProps) {
  return (
    <img
      src="/assets/fagou-logo.jpg"
      alt="Fagou"
      style={{
        display: 'block',
        height: Math.round(size * 1.35),
        width: 'auto',
        borderRadius: 6,
        mixBlendMode: dark ? 'normal' : 'multiply',
      }}
      draggable={false}
    />
  )
}
