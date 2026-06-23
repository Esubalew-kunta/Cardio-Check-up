// Renders a doctor's photograph, or a branded placeholder when none is shown.
// Two placeholder modes, both on the burgundy gradient so they sit naturally in
// the cards and V-formation:
//   • `monogram` set  → an elegant gold monogram (the doctor declined a photo by
//     personal choice — this reads as intentional, not missing).
//   • otherwise       → a soft silhouette (a real portrait is still pending).
// `src` present always wins.
export default function DoctorPortrait({
  src,
  alt,
  className = '',
  imgClass = 'object-cover object-top',
  monogram,
}) {
  if (src) {
    return <img src={src} alt={alt} className={`h-full w-full ${imgClass}`} loading="lazy" />
  }

  const gradient = { background: 'linear-gradient(160deg, #7B1C42 0%, #5C1030 100%)' }

  if (monogram) {
    return (
      <div className={`h-full w-full grid place-items-center ${className}`} style={gradient} role="img" aria-label={alt}>
        {/* SVG text scales with the container, so the monogram looks right in a
            96px mini card and a 32rem hero alike. */}
        <svg viewBox="0 0 100 100" className="h-3/5 w-3/5" aria-hidden="true">
          <circle cx="50" cy="50" r="46" fill="none" stroke="var(--color-gold)" strokeOpacity="0.35" strokeWidth="1.5" />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="central"
            fill="var(--color-gold)"
            style={{ fontFamily: 'var(--font-display)', fontSize: '34px', fontWeight: 600, letterSpacing: '2px' }}
          >
            {monogram}
          </text>
        </svg>
      </div>
    )
  }

  return (
    <div className={`h-full w-full grid place-items-center ${className}`} style={gradient} role="img" aria-label={alt}>
      <svg viewBox="0 0 64 64" className="h-1/2 w-1/2 opacity-30" fill="none" aria-hidden="true">
        <circle cx="32" cy="24" r="12" fill="var(--color-gold)" />
        <path d="M12 56c0-11 9-18 20-18s20 7 20 18" fill="var(--color-gold)" />
      </svg>
    </div>
  )
}
