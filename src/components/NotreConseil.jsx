import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { getFounder, getPartners } from '../data/site.js'
import DoctorPortrait from './DoctorPortrait.jsx'
import { doctorInitials } from '../utils/initials.js'

const founder = getFounder()
const partners = getPartners() // declared order: Doguet, Berdah, Sofiane, Hakem, Taha

const SCRIM = { background: 'linear-gradient(to top, rgba(18,5,12,0.92), rgba(18,5,12,0.2) 58%, transparent)' }
const SCRIM_FEATURED = { background: 'linear-gradient(to top, rgba(18,5,12,0.95), rgba(18,5,12,0.35) 62%, transparent)' }

// One uniform portrait card. The founder is rendered larger and ringed in gold;
// every partner shares an identical size, so the row reads as one clean set.
function DoctorCard({ doctor, featured = false }) {
  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      aria-label={`${doctor.name}, ${doctor.specialty}`}
      className={`group relative block overflow-hidden rounded-2xl bg-burgundy-deep shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
        featured ? 'aspect-[4/5] w-full ring-1 ring-gold/70' : 'aspect-[3/4] w-full ring-1 ring-gold/20'
      }`}
    >
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.04]">
        <DoctorPortrait
          src={doctor.photo}
          alt={`Portrait du ${doctor.name}`}
          monogram={doctor.noPhoto ? doctorInitials(doctor.name) : undefined}
        />
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 text-center ${featured ? 'px-4 pt-14 pb-5' : 'px-2 pt-9 pb-3'}`}
        style={featured ? SCRIM_FEATURED : SCRIM}
      >
        {featured && (
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold/90">Fondatrice</p>
        )}
        <p className={`font-display font-semibold leading-tight text-offwhite ${featured ? 'text-lg mt-1' : 'text-sm'}`}>
          {doctor.name}
        </p>
        <p className={`mt-0.5 font-semibold uppercase tracking-[0.1em] text-gold leading-tight ${featured ? 'text-[0.62rem]' : 'text-[0.56rem]'}`}>
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
            Une équipe resserrée, réunie autour du Dr Amraoui, pour un
            suivi cardiovasculaire attentif et personnalisé, du dépistage au traitement.
          </p>
        </div>

        <div ref={gridRef} className={`reveal ${gridVisible ? 'is-visible' : ''}`}>
          {/* Founder — featured on top */}
          <div className="mx-auto mt-16 w-full max-w-[240px]">
            <DoctorCard doctor={founder} featured />
          </div>

          {/* Partners — one uniform row below (equal sized cards) */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
            {partners.map((d) => (
              <DoctorCard key={d.slug} doctor={d} />
            ))}
          </div>
        </div>

        {/* Quiet CTA */}
        <div className="mt-14 text-center">
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
