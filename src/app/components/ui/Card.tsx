interface CardProps {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

export function Card({ children, style, className }: CardProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        border: '1px solid #E5E7EB',
        overflow: 'hidden',
        transition: 'box-shadow 250ms ease, transform 250ms ease',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
