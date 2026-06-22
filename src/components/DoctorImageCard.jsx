import { Link } from 'react-router-dom'
import DoctorPortrait from './DoctorPortrait.jsx'
import { examsForDoctor } from '../data/site.js'

// Full-image doctor card. The photo is anchored to the top (object-top) so the
// face sits in the upper portion. At rest, name + specialty show on a small
// bottom scrim. On hover/focus a compact panel slides up over the BOTTOM only —
// it never reaches the face. CSS transitions only.
//
// variant: 'partner' (3:4) | 'founder' (wider feature card).
export default function DoctorImageCard({ doctor, variant = 'partner' }) {
  const isFounder = variant === 'founder'
  const ratio = isFounder ? 'aspect-[3/4] sm:aspect-auto sm:h-[380px]' : 'aspect-[3/4]'
  const exams = isFounder ? examsForDoctor(doctor.slug) : []

  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      aria-label={`${doctor.name} — ${doctor.specialty}`}
      className={`group relative block overflow-hidden rounded-2xl ring-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${ratio} ${
        isFounder ? 'ring-gold/50 hover:ring-gold' : 'ring-transparent hover:ring-gold/60'
      }`}
    >
      {/* Photo */}
      <div className="absolute inset-0">
        <DoctorPortrait src={doctor.photo} alt={`Portrait du ${doctor.name}`} />
      </div>

      {/* Founder badge */}
      {isFounder && doctor.badge && (
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-gold/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-burgundy-deep">
          {doctor.badge}
        </span>
      )}

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
          {isFounder && exams.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {exams.map((e) => (
                <span
                  key={e.id}
                  className="rounded-full px-2.5 py-0.5 text-[0.7rem] font-medium text-burgundy"
                  style={{ backgroundColor: 'rgba(123,28,66,0.08)' }}
                >
                  {e.name}
                </span>
              ))}
            </div>
          )}
          <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
            {isFounder ? 'Voir le profil complet' : 'Voir le profil'} <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
