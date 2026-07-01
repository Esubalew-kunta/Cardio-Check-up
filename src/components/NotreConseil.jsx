import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { getFounder, getPartners } from '../data/site.js'
import DoctorPortrait from './DoctorPortrait.jsx'
import { doctorInitials } from '../utils/initials.js'

const founder = getFounder()
const partners = getPartners() // declared order: Doguet, Berdah, Sofiane, Hakem, Taha

// Balanced arc of six: the founder sits at the centre (gold ring, tallest tier);
// partners fan out on each side in the client's declared order.
const ARC = [partners[0], partners[1], founder, partners[2], partners[3], partners[4]].filter(Boolean)
const TIERS = ['out', 'mid', 'tall', 'tall', 'mid', 'out']
const HEIGHTS = { tall: 'h-[21rem]', mid: 'h-[18.5rem]', out: 'h-[16rem]' }

const MASK = {
  maskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 72%, transparent 100%)',
}
const SCRIM = { background: 'linear-gradient(to top, rgba(18,5,12,0.9), transparent)' }

// Desktop tiered portrait (masked bottom fade, name + role scrim).
function Portrait({ doctor, heightClass }) {
  const isFounder = doctor.isFounder
  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      aria-label={`${doctor.name}, ${doctor.specialty}`}
      className="group block w-full"
    >
      <div className={`relative w-full ${heightClass} transition-transform duration-300 group-hover:-translate-y-2`}>
        <div className={`absolute inset-0 overflow-hidden ${isFounder ? 'ring-1 ring-gold/70' : ''}`} style={MASK}>
          <DoctorPortrait
            src={doctor.photo}
            alt={`Portrait du ${doctor.name}`}
            monogram={doctor.noPhoto ? doctorInitials(doctor.name) : undefined}
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-2 pt-10 pb-3 text-center" style={SCRIM}>
          {isFounder && (
            <p className="text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-gold/90">Fondatrice</p>
          )}
          <p className="font-display text-base font-semibold leading-tight text-offwhite">{doctor.name}</p>
          <p className="mt-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.1em] text-gold">
            {doctor.specialtyShort || doctor.specialty}
          </p>
        </div>
      </div>
    </Link>
  )
}

// Mobile card: soft rounded portrait; the founder protrudes to keep her apex.
function MobileCard({ doctor }) {
  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      aria-label={`${doctor.name}, ${doctor.specialty}`}
      className={`relative shrink-0 snap-start w-[132px] aspect-[2/3] overflow-hidden rounded-[14px] origin-bottom ${
        doctor.isFounder ? 'ring-1 ring-gold/60 -translate-y-2 scale-[1.05]' : ''
      }`}
    >
      <div className="absolute inset-0">
        <DoctorPortrait
          src={doctor.photo}
          alt={`Portrait du ${doctor.name}`}
          monogram={doctor.noPhoto ? doctorInitials(doctor.name) : undefined}
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 px-2 pt-8 pb-2.5 text-center" style={SCRIM}>
        <p className="font-display font-semibold text-offwhite leading-tight text-[13px]">{doctor.name}</p>
        <p className="mt-0.5 font-semibold uppercase tracking-[0.1em] text-gold leading-tight text-[9px]">
          {doctor.specialtyShort || doctor.specialty}
        </p>
      </div>
    </Link>
  )
}

export default function NotreConseil() {
  const [headRef, headVisible] = useReveal()
  const [gridRef, gridVisible] = useReveal()

  return (
    <section className="bg-cream py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <div ref={headRef} className={`reveal ${headVisible ? 'is-visible' : ''} mx-auto max-w-2xl text-center`}>
          <p className="eyebrow text-burgundy">Notre Conseil</p>
          <span className="mx-auto mt-3 block h-px w-12 bg-gold" aria-hidden="true" />
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            Six médecins, une exigence commune
          </h2>
          <p className="mt-5 text-ink/75 leading-relaxed">
            Une équipe resserrée, réunie autour du Dr Amraoui, Chairperson de l'EHRA 2026, pour un
            suivi cardiovasculaire attentif et personnalisé, du dépistage au traitement.
          </p>
        </div>

        <div ref={gridRef} className={`reveal ${gridVisible ? 'is-visible' : ''}`}>
          {/* Desktop arc */}
          <div className="mt-16 hidden lg:flex items-end justify-center gap-4">
            {ARC.map((d, i) => (
              <div key={d.slug} className="w-[156px]">
                <Portrait doctor={d} heightClass={HEIGHTS[TIERS[i]]} />
              </div>
            ))}
          </div>

          {/* Mobile horizontal strip */}
          <div className="mt-12 lg:hidden -mx-5">
            <div className="flex items-end gap-3 overflow-x-auto no-scrollbar px-5 pt-4 pb-6 snap-x">
              {ARC.map((d) => (
                <MobileCard key={d.slug} doctor={d} />
              ))}
            </div>
          </div>
        </div>

        {/* Quiet CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/equipe"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-burgundy border-b border-burgundy/40 pb-0.5 hover:border-burgundy transition-colors"
          >
            Rencontrer notre équipe <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
