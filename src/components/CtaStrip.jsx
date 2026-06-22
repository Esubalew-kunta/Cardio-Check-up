import { Link } from 'react-router-dom'
import { openBookingModal } from '../utils/bookingModal.js'

// Burgundy conversion strip used at the foot of inner pages. Title + subtitle
// on the left, a signal-red primary action on the right, with an optional
// secondary text link.
export default function CtaStrip({
  title,
  subtitle,
  primaryLabel = 'Prendre rendez-vous',
  onPrimary = openBookingModal,
  secondary, // { label, to }
}) {
  return (
    <section className="bg-burgundy">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-14 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-offwhite leading-tight">
              {title}
            </h2>
            {subtitle && <p className="mt-2 text-sm text-offwhite/70">{subtitle}</p>}
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={onPrimary}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-signal px-7 py-3 text-base font-semibold tracking-[0.03em] text-white shadow-lg hover:bg-signal-deep transition-colors"
            >
              {primaryLabel}
            </button>
            {secondary && (
              <Link
                to={secondary.to}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-offwhite hover:text-gold transition-colors"
              >
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
