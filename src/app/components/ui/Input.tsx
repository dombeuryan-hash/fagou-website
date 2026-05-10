interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  id: string
}

export function Input({ label, error, id, style, ...props }: InputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            color: '#1A1A1A',
          }}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-invalid={error ? true : undefined}
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: `1px solid ${error ? '#C0392B' : '#E5E7EB'}`,
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
          color: '#1A1A1A',
          backgroundColor: '#FAFAF8',
          outline: 'none',
          transition: 'border-color 200ms ease',
          width: '100%',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = '#1A5C1A'
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = error ? '#C0392B' : '#E5E7EB'
        }}
        {...props}
      />
      {error && (
        <span
          id={`${id}-error`}
          role="alert"
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#C0392B' }}
        >
          {error}
        </span>
      )}
    </div>
  )
}
