import EcgLine from './EcgLine.jsx'
import { openBookingModal } from '../utils/bookingModal.js'

const TRUST = ['Conventionnée Secteur 2', 'Hôpital Américain de Paris', 'Diplômée LSE & Bordeaux']

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-reception.jpg"
          alt="Accueil du cabinet Cardio Check-up à Paris"
          className="h-full w-full object-cover object-center"
        />
        {/* Burgundy-toned overlays for brand cohesion + text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-deep/85 via-burgundy-deep/45 to-burgundy-deep/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/60 via-transparent to-burgundy-deep/20" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8 w-full pt-28 pb-16 sm:pb-20">
        <div className="max-w-2xl">
          <p className="font-sans text-xs sm:text-sm tracking-[0.28em] uppercase text-gold mb-5">
            Cardiologie &amp; Rythmologie · Paris 17
          </p>

          <h1 className="font-display text-[2.5rem] leading-[1.08] sm:text-6xl lg:text-7xl sm:leading-[1.05] font-semibold text-offwhite text-balance">
            La santé de votre cœur est notre priorité.
          </h1>

          {/* ECG motif under the headline */}
          <EcgLine className="mt-6 max-w-md" />

          <p className="mt-6 text-base sm:text-lg text-offwhite/85 leading-relaxed max-w-xl">
            Cabinet de cardiologie et rythmologie. Bilan cardiovasculaire, dépistage et
            suivi à Paris 17.
          </p>

          {/* CTA — min 44px touch target */}
          <div className="mt-9">
            <button
              type="button"
              onClick={openBookingModal}
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-signal px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-signal-deep transition-colors"
            >
              Prendre rendez-vous
            </button>
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
