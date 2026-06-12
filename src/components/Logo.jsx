// Cardio Check-up logo, using the practice's real artwork.
// `variant="full"` renders the complete logo (mark + wordmark on its
// burgundy card) — used in the footer brand column.
// `variant="light"` / `variant="gold"` render the transparent mark plus a
// text wordmark colored for dark or light backgrounds — used in the header.

export default function Logo({ variant = 'gold', className = '' }) {
  if (variant === 'full') {
    return (
      <img
        src="/images/cardio-logo.png"
        alt="Cardio Check-up"
        className={`h-12 sm:h-14 w-auto rounded-lg ${className}`}
      />
    )
  }

  const wordTop = variant === 'light' ? 'var(--color-offwhite)' : 'var(--color-ink)'
  const wordSub = variant === 'light' ? 'var(--color-gold)' : 'var(--color-burgundy)'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Cardio Check-up">
      <img
        src="/images/cardio-logo-mark.png"
        alt=""
        aria-hidden="true"
        className="h-9 w-9 shrink-0 object-contain"
      />
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
