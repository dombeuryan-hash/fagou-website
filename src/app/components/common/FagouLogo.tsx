interface FagouLogoProps {
  size?: number
  dark?: boolean
}

export function FagouLogo({ size = 28, dark = false }: FagouLogoProps) {
  const green = dark ? '#7FD17F' : '#1A5C1A'
  const greenDark = dark ? '#3CA13C' : '#0F3D14'
  const red = '#C0392B'
  const w = size * 3.2

  return (
    <svg
      width={w}
      height={size}
      viewBox="0 0 320 100"
      style={{ display: 'block' }}
      aria-label="Fagou"
    >
      <defs>
        <linearGradient id={`fagouGreen-${dark ? 'd' : 'l'}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={green} />
          <stop offset="0.5" stopColor={greenDark} />
          <stop offset="1" stopColor={green} />
        </linearGradient>
      </defs>
      <text
        x="0" y="78"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="100"
        fontWeight="500"
        fill={`url(#fagouGreen-${dark ? 'd' : 'l'})`}
        letterSpacing="-0.04em"
      >
        F
      </text>
      <text
        x="58" y="78"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="74"
        fontWeight="500"
        fill={`url(#fagouGreen-${dark ? 'd' : 'l'})`}
        letterSpacing="-0.03em"
      >
        AGOU
      </text>
      <path
        d="M 58 78 Q 130 60 200 80 Q 240 92 280 78"
        stroke={red}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}
