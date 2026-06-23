import { Link } from 'react-router-dom'
import DoctorPortrait from './DoctorPortrait.jsx'
import { examsForDoctor } from '../data/site.js'
import { doctorInitials } from '../utils/initials.js'

// Doctor cards for /equipe.
//
// • Founder ('founder'): a compact premium portrait card — photo on top with
//   the badge embedded in the corner, and a tight, always-visible info panel
//   below (name, specialty, 2-line bio, exam tags, profile link).
// • Partner ('partner', default): full-image card where a panel slides up over
//   the bottom on hover; the face (object-top) is never covered.
export default function DoctorImageCard({ doctor, variant = 'partner' }) {
  if (variant === 'founder') return <FounderCard doctor={doctor} />
  return <PartnerCard doctor={doctor} />
}

function FounderCard({ doctor }) {
  const exams = examsForDoctor(doctor.slug)
  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      aria-label={`${doctor.name}, ${doctor.specialty}`}
      className="group mx-auto block w-full max-w-sm overflow-hidden rounded-2xl bg-cream ring-1 ring-gold/50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gold"
    >
      {/* Photo — face centred, taller crop so it frames well */}
      <div className="relative aspect-[4/5]">
        <DoctorPortrait
          src={doctor.photo}
          alt={`Portrait du ${doctor.name}`}
          imgClass="object-cover object-center"
        />
        {doctor.badge && (
          <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-gold/95 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-burgundy-deep shadow-sm">
            {doctor.badge}
          </span>
        )}
      </div>

      {/* Tight info panel */}
      <div className="p-4">
        <p className="font-display text-xl font-semibold leading-tight text-ink">{doctor.name}</p>
        <p className="mt-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
          {doctor.specialty}
        </p>
        <p className="mt-1.5 text-[13px] leading-snug text-ink/70 line-clamp-2">{doctor.bioShort}</p>

        {exams.length > 0 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {exams.map((e) => (
              <span
                key={e.id}
                className="rounded-full px-2 py-0.5 text-[11px] font-medium text-burgundy"
                style={{ backgroundColor: 'rgba(123,28,66,0.08)' }}
              >
                {e.name}
              </span>
            ))}
          </div>
        )}

        <span className="mt-2.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-signal group-hover:gap-2.5 transition-all">
          Voir le profil complet <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}

function PartnerCard({ doctor }) {
  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      aria-label={`${doctor.name}, ${doctor.specialty}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-transparent transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-gold/60"
    >
      <div className="absolute inset-0">
        <DoctorPortrait
          src={doctor.photo}
          alt={`Portrait du ${doctor.name}`}
          monogram={doctor.noPhoto ? doctorInitials(doctor.name) : undefined}
        />
      </div>

      {/* Rest scrim — name + specialty, always visible; fades out on hover */}
      <div
        className="absolute inset-x-0 bottom-0 p-5 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0"
        style={{ background: 'linear-gradient(to top, rgba(18,5,12,0.92), transparent)' }}
      >
        <p className="font-display text-xl sm:text-2xl font-semibold text-offwhite leading-tight">
          {doctor.name}
        </p>
        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
          {doctor.specialty}
        </p>
      </div>

      {/* Hover panel — slides up over the bottom only, never covering the face */}
      <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0">
        <div className="border-t-2 border-gold bg-cream/97 backdrop-blur-sm p-5">
          <p className="font-display text-xl font-semibold text-ink leading-tight">{doctor.name}</p>
          <p className="mt-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold-deep">
            {doctor.specialty}
          </p>
          <p className="mt-2 text-sm text-ink/75 leading-relaxed line-clamp-2">{doctor.bioShort}</p>
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
            Voir le profil <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
