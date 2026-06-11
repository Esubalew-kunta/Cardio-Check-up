// Cardio Check-up logo, rebuilt in SVG (no vector asset existed — only a
// photo of the brass wall mark). Heart-in-sunburst motif + wordmark.
// `variant` controls the palette: "gold" (default) or "light" (for dark areas).

export default function Logo({ variant = 'gold', className = '' }) {
  const mark = 'var(--color-gold)' // gold mark in both variants
  const wordTop = variant === 'light' ? 'var(--color-offwhite)' : 'var(--color-ink)'
  const wordSub = variant === 'light' ? 'var(--color-gold)' : 'var(--color-burgundy)'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Cardio Check-up">
      <svg
        width="34"
        height="34"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        {/* sunburst rays */}
        <g stroke={mark} strokeWidth="2.4" strokeLinecap="round">
          <line x1="32" y1="6" x2="32" y2="14" />
          <line x1="18" y1="9.5" x2="21.5" y2="16.5" />
          <line x1="46" y1="9.5" x2="42.5" y2="16.5" />
          <line x1="9" y1="19" x2="15.5" y2="23" />
          <line x1="55" y1="19" x2="48.5" y2="23" />
        </g>
        {/* arch */}
        <path
          d="M14 56 V34 a18 18 0 0 1 36 0 V56"
          stroke={mark}
          strokeWidth="2.6"
          fill="none"
          strokeLinecap="round"
        />
        {/* heart */}
        <path
          d="M32 50c-6-4.2-11-8.2-11-13.7 0-3.2 2.5-5.6 5.6-5.6 2 0 3.9 1 5.4 2.9 1.5-1.9 3.4-2.9 5.4-2.9 3.1 0 5.6 2.4 5.6 5.6C43 41.8 38 45.8 32 50z"
          fill={mark}
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className="font-display font-semibold tracking-[0.12em] text-[1.05rem]"
          style={{ color: wordTop }}
        >
          CARDIO
        </span>
        <span
          className="font-sans font-semibold tracking-[0.34em] text-[0.55rem] mt-0.5"
          style={{ color: wordSub }}
        >
          CHECK-UP
        </span>
      </span>
    </span>
  )
}
