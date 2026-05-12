interface FagouLogoProps {
  size?: number
  dark?: boolean
}

export function FagouLogo({ size = 28, dark = false }: FagouLogoProps) {
  const textColor = dark ? '#FFFFFF' : '#1A5C1A'
  const w = Math.round(size * 3.5)
  const id = dark ? 'd' : 'l'

  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 420 120"
      style={{ display: 'block' }}
      aria-label="Fagou"
    >
      <defs>
        <radialGradient id={`sph-${id}`} cx="36%" cy="30%" r="68%">
          <stop offset="0%" stopColor="#5EB85E" />
          <stop offset="40%" stopColor="#2E7D32" />
          <stop offset="100%" stopColor="#163516" />
        </radialGradient>
      </defs>

      {/* 3D sphere */}
      <circle cx="62" cy="60" r="58" fill={`url(#sph-${id})`} />

      {/* F — white bold serif, fills the sphere */}
      <text
        x="6"
        y="88"
        fontFamily="'Times New Roman', Georgia, serif"
        fontSize="96"
        fontWeight="bold"
        fill="white"
      >
        F
      </text>

      {/* AGOU — matching dark green serif */}
      <text
        x="108"
        y="88"
        fontFamily="'Times New Roman', Georgia, serif"
        fontSize="84"
        fontWeight="bold"
        fill={textColor}
        letterSpacing="-1"
      >
        AGOU
      </text>

      {/* Red swoosh arc — signature design element */}
      <path
        d="M 102 104 C 168 38 272 38 354 76"
        stroke="#A52020"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
