import { useState } from 'react'

interface ImageWithFallbackProps {
  src: string
  alt: string
  style?: React.CSSProperties
  className?: string
  loading?: 'lazy' | 'eager'
  fallbackSrc?: string
}

const DEFAULT_FALLBACK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjRTVFN0VCIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJJbnRlcixzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2UgaW5kaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg=='

export function ImageWithFallback({
  src,
  alt,
  style,
  className,
  loading = 'lazy',
  fallbackSrc = DEFAULT_FALLBACK,
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src)

  return (
    <img
      src={imgSrc}
      alt={alt}
      style={style}
      className={className}
      loading={loading}
      onError={() => setImgSrc(fallbackSrc)}
    />
  )
}
