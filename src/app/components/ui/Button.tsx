type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  children: React.ReactNode
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#1A5C1A',
    color: '#FFFFFF',
    border: '2px solid #1A5C1A',
  },
  secondary: {
    backgroundColor: '#2E8B2E',
    color: '#FFFFFF',
    border: '2px solid #2E8B2E',
  },
  outline: {
    backgroundColor: 'transparent',
    color: '#1A5C1A',
    border: '2px solid #1A5C1A',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#1A5C1A',
    border: '2px solid transparent',
  },
  danger: {
    backgroundColor: '#C0392B',
    color: '#FFFFFF',
    border: '2px solid #C0392B',
  },
}

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 14px', fontSize: '13px' },
  md: { padding: '10px 22px', fontSize: '15px' },
  lg: { padding: '14px 32px', fontSize: '16px' },
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        borderRadius: '8px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 600,
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        transition: 'opacity 200ms ease, transform 200ms ease',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        opacity: props.disabled ? 0.6 : 1,
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!props.disabled) (e.currentTarget as HTMLButtonElement).style.opacity = '0.85'
      }}
      onMouseLeave={(e) => {
        if (!props.disabled) (e.currentTarget as HTMLButtonElement).style.opacity = '1'
      }}
      {...props}
    >
      {children}
    </button>
  )
}
