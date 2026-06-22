// Renders a doctor's real photograph, or a branded placeholder when no `src`
// is available (the four partner doctors until real photography is supplied).
// No fake photography — the placeholder is an obvious silhouette on a burgundy
// gradient. `src` absent/null => placeholder.
export default function DoctorPortrait({ src, alt, className = '', imgClass = 'object-cover object-top' }) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full ${imgClass}`} loading="lazy" />
  }
  return (
    <div
      className={`h-full w-full grid place-items-center ${className}`}
      style={{ background: 'linear-gradient(160deg, #7B1C42 0%, #5C1030 100%)' }}
      role="img"
      aria-label={alt}
    >
      <svg viewBox="0 0 64 64" className="h-1/2 w-1/2 opacity-30" fill="none" aria-hidden="true">
        <circle cx="32" cy="24" r="12" fill="var(--color-gold)" />
        <path d="M12 56c0-11 9-18 20-18s20 7 20 18" fill="var(--color-gold)" />
      </svg>
    </div>
  )
}
