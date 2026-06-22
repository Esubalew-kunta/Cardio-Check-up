import { Link } from 'react-router-dom'
import DoctorPortrait from './DoctorPortrait.jsx'
import { examsForDoctor } from '../data/site.js'

// Full-image doctor card. The photo fills the card; name + specialty sit on a
// dark scrim at rest. On hover/focus a burgundy overlay slides up revealing the
// bio, exam tags (founder only) and the profile link. CSS transitions only.
//
// variant: 'partner' (3:4) | 'founder' (wider feature card).
export default function DoctorImageCard({ doctor, variant = 'partner' }) {
  const isFounder = variant === 'founder'
  // Founder: portrait on mobile, capped to ~380px tall on desktop.
  const ratio = isFounder ? 'aspect-[3/4] sm:aspect-auto sm:h-[380px]' : 'aspect-[3/4]'
  const exams = isFounder ? examsForDoctor(doctor.slug) : []

  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      aria-label={`${doctor.name} — ${doctor.specialty}`}
      className={`group relative block overflow-hidden rounded-2xl ${ratio} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isFounder ? 'ring-2 ring-gold/50' : ''
      }`}
    >
      {/* Photo */}
      <div className="absolute inset-0">
        <DoctorPortrait src={doctor.photo} alt={`Portrait du ${doctor.name}`} />
      </div>

      {/* Founder badge (rest + hover) */}
      {isFounder && doctor.badge && (
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-gold/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-burgundy-deep">
          {doctor.badge}
        </span>
      )}

      {/* Rest-state scrim with name + specialty (fades out on hover) */}
      <div
        className="absolute inset-x-0 bottom-0 p-5 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0"
        style={{ background: 'linear-gradient(to top, rgba(18,5,12,0.9), transparent)' }}
      >
        <p className="font-display text-xl sm:text-2xl font-semibold text-offwhite leading-tight">
          {doctor.name}
        </p>
        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
          {doctor.specialty}
        </p>
      </div>

      {/* Hover/focus overlay sliding up */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-6 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 group-focus-within:translate-y-0"
        style={{ background: 'rgba(92,16,48,0.92)' }}
      >
        <p className="font-display text-2xl font-semibold text-offwhite leading-tight">{doctor.name}</p>
        <p className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
          {doctor.specialty}
        </p>
        <p className="mt-3 text-sm text-offwhite/85 leading-relaxed">{doctor.bioShort}</p>

        {isFounder && exams.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {exams.map((e) => (
              <span
                key={e.id}
                className="rounded-full bg-offwhite/15 px-3 py-1 text-xs font-medium text-offwhite"
              >
                {e.name}
              </span>
            ))}
          </div>
        )}

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal">
          {isFounder ? 'Voir le profil complet' : 'Voir le profil'} <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  )
}
