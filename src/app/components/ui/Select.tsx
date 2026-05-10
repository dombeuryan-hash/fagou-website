interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  id: string
  options: SelectOption[]
}

export function Select({ label, error, id, options, style, ...props }: SelectProps) {
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
      <select
        id={id}
        aria-describedby={error ? `${id}-error` : undefined}
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: `1px solid ${error ? '#C0392B' : '#E5E7EB'}`,
          fontFamily: 'Inter, sans-serif',
          fontSize: '15px',
          color: '#1A1A1A',
          backgroundColor: '#FAFAF8',
          outline: 'none',
          width: '100%',
          cursor: 'pointer',
          ...style,
        }}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span id={`${id}-error`} role="alert" style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: '#C0392B' }}>
          {error}
        </span>
      )}
    </div>
  )
}
