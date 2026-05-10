interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  id: string
}

export function Textarea({ label, error, id, style, ...props }: TextareaProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {label && (
        <label
          htmlFor={id}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 500, color: '#1A1A1A' }}
        >
          {label}
        </label>
      )}
      <textarea
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
          resize: 'vertical',
          minHeight: '120px',
          transition: 'border-color 200ms ease',
          width: '100%',
          ...style,
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = '#1A5C1A' }}
        onBlur={(e) => { e.currentTarget.style.borderColor = error ? '#C0392B' : '#E5E7EB' }}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} role="alert" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#C0392B' }}>
          {error}
        </span>
      )}
    </div>
  )
}
