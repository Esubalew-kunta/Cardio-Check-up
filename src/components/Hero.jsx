import { Link } from 'react-router-dom'
import EcgLine from './EcgLine.jsx'
import { openBookingModal } from '../utils/bookingModal.js'

const TRUST = ['Conventionnée Secteur 2', 'Expertise reconnue en France et en Europe']

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Mobile: anchor image left so the clinic logo/signage on the left of
            the photo stays visible. Desktop: centred as before. */}
        <img
          src="/images/hero-reception.jpg"
          alt="Accueil du cabinet Cardio Check-up à Paris"
          className="h-full w-full object-cover object-left sm:object-center"
        />
        {/* Burgundy-toned overlays for brand cohesion + text legibility.
            Stronger on mobile (text sits over the busy left of the photo);
            desktop values restored at sm+ so that layout is untouched. */}
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/95 via-burgundy-deep/70 to-burgundy-deep/25 sm:from-burgundy-deep/85 sm:via-burgundy-deep/45 sm:to-burgundy-deep/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/75 via-transparent to-burgundy-deep/20 sm:from-burgundy-deep/60" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 w-full pt-28 pb-16 sm:pb-20">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold mb-5">
            Cardiologie &amp; Rythmologie · Paris 17
          </p>

          <h1 className="font-display text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-7xl sm:leading-[1.05] font-semibold text-offwhite text-balance">
            Mieux dépister pour mieux prévenir
          </h1>

          {/* ECG motif under the headline */}
          <EcgLine className="mt-6 max-w-md" />

          <p className="mt-6 text-base sm:text-lg text-offwhite/85 leading-relaxed max-w-xl">
            Cardio Check-up, centre médical de cardiologie au cœur de Paris. Bilan
            cardiovasculaire, dépistage et suivi personnalisé de votre santé.
          </p>

          {/* Primary conversion action, front and centre in the hero */}
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3">
            <button
              type="button"
              onClick={openBookingModal}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-signal px-7 py-3 text-base font-semibold tracking-[0.03em] text-white shadow-lg hover:bg-signal-deep transition-colors"
            >
              Prendre rendez-vous
            </button>
            <Link
              to="/#examens"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-offwhite hover:text-gold transition-colors"
            >
              Découvrir nos examens <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Trust bar (merged into hero) — wraps cleanly on small screens */}
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-offwhite/15 pt-6">
            {TRUST.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-offwhite/80">
                <span className="h-1.5 w-1.5 rounded-full bg-gold shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
