import { Link } from 'react-router-dom'
import DoctorPortrait from './DoctorPortrait.jsx'
import { doctorInitials } from '../utils/initials.js'

// Compact doctor card for cross-link strips ("Réalisé par" on exam pages).
// Circular portrait, name, specialty, profile link.
export default function DoctorMiniCard({ doctor }) {
  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      className="group flex w-56 shrink-0 flex-col items-center rounded-2xl border border-gold/25 bg-white/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold/50"
    >
      <div
        className={`h-24 w-24 overflow-hidden rounded-full ${
          doctor.isFounder ? 'ring-2 ring-gold/60' : 'ring-1 ring-gold/20'
        }`}
      >
        <DoctorPortrait
          src={doctor.photo}
          alt={`Portrait du ${doctor.name}`}
          monogram={doctor.noPhoto ? doctorInitials(doctor.name) : undefined}
        />
      </div>
      <p className="mt-4 font-display text-xl font-semibold text-ink">{doctor.name}</p>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
        {doctor.specialty}
      </p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal group-hover:gap-2.5 transition-all">
        Voir le profil <span aria-hidden="true">→</span>
      </span>
    </Link>
  )
}
