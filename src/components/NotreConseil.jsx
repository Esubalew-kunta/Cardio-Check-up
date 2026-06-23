import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal.js'
import { getFounder, getPartners } from '../data/site.js'
import DoctorPortrait from './DoctorPortrait.jsx'
import { doctorInitials } from '../utils/initials.js'

// Build the V order: outer-L, inner-L, APEX, inner-R, outer-R.
// Founder is the apex; partners fill the wings in their declared order.
const founder = getFounder()
const partners = getPartners()
const V_ORDER = [partners[0], partners[1], founder, partners[2], partners[3]].filter(Boolean)

// height tier + entrance delay per position (apex first, then inner, then outer)
const TIERS = ['outer', 'inner', 'apex', 'inner', 'outer']
const HEIGHTS = { apex: 'h-[24rem]', inner: 'h-[20rem]', outer: 'h-[16.5rem]' }
const DELAYS = { apex: 0, inner: 0.08, outer: 0.16 }

const MASK = {
  maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
}
const SCRIM = { background: 'linear-gradient(to top, rgba(18,5,12,0.88), transparent)' }

function Portrait({ doctor, heightClass, hovered, setHovered, reduce }) {
  const isFounder = doctor.isFounder
  const dim = hovered && hovered !== doctor.slug
  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      onMouseEnter={() => setHovered(doctor.slug)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(doctor.slug)}
      onBlur={() => setHovered(null)}
      className="block"
      aria-label={`${doctor.name}, ${doctor.specialty}`}
    >
      <motion.div
        whileHover={reduce ? undefined : { y: -14, scale: 1.06 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className={`relative w-full ${heightClass}`}
        style={{
          filter: dim ? 'brightness(0.58) saturate(0.6)' : 'none',
          transition: 'filter 0.3s ease',
        }}
      >
        <div
          className={`absolute inset-0 ${isFounder ? 'ring-1 ring-gold/50' : ''} ${
            isFounder && hovered === doctor.slug ? 'ring-gold' : ''
          }`}
          style={MASK}
        >
          <DoctorPortrait
            src={doctor.photo}
            alt={`Portrait du ${doctor.name}`}
            monogram={doctor.noPhoto ? doctorInitials(doctor.name) : undefined}
          />
        </div>
        {/* Name + specialty scrim */}
        <div className="absolute inset-x-0 bottom-0 pt-10 pb-4 px-3 text-center" style={SCRIM}>
          <p
            className={`font-display text-base font-semibold leading-tight transition-colors ${
              hovered === doctor.slug ? 'text-offwhite' : 'text-offwhite/85'
            }`}
          >
            {doctor.name}
          </p>
          <p
            className={`mt-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] transition-colors ${
              hovered === doctor.slug ? 'text-gold' : 'text-gold/80'
            }`}
          >
            {doctor.specialty}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}

// Mobile card: a soft rounded portrait (not masked like the desktop V). The
// apex (Dr Amraoui) protrudes to preserve the V-depth feel in a flat strip.
function MobileCard({ doctor, tier }) {
  const protrude =
    tier === 'apex' ? '-translate-y-2 scale-[1.06]' : tier === 'outer' ? 'scale-[0.94]' : ''
  return (
    <Link
      to={`/equipe/${doctor.slug}`}
      aria-label={`${doctor.name}, ${doctor.specialty}`}
      className={`relative shrink-0 snap-start w-[130px] aspect-[2/3] overflow-hidden rounded-[14px] origin-bottom ${
        doctor.isFounder ? 'ring-1 ring-gold/60' : ''
      } ${protrude}`}
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
          {doctor.specialty}
        </p>
      </div>
    </Link>
  )
}

export default function NotreConseil() {
  const [headRef, headVisible] = useReveal()
  const [hovered, setHovered] = useState(null)
  const reduce = useReducedMotion()

  return (
    <section className="bg-cream py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Heading */}
        <div ref={headRef} className={`reveal ${headVisible ? 'is-visible' : ''} max-w-2xl mx-auto text-center`}>
          <p className="eyebrow text-burgundy mb-4">Notre Conseil</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            Cinq spécialistes. Une mission.
          </h2>
          <p className="mt-5 text-ink/75 leading-relaxed">
            Le cabinet Cardio Check-up réunit cinq spécialistes complémentaires : cardiologie,
            chirurgie cardiaque et vasculaire, médecine vasculaire et nutrition. Ensemble, ils
            couvrent la santé cardiovasculaire dans sa globalité, du dépistage au suivi. Le Dr
            Amraoui, Chairperson de l'EHRA 2026, coordonne le conseil.
          </p>
        </div>

        {/* Desktop V-formation */}
        <div className="mt-16 hidden lg:flex items-end justify-center gap-5">
          {V_ORDER.map((doctor, i) => {
            const tier = TIERS[i]
            return (
              <motion.div
                key={doctor.slug}
                className="w-44"
                initial={reduce ? false : { opacity: 0, y: 28 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: DELAYS[tier] }}
              >
                <Portrait
                  doctor={doctor}
                  heightClass={HEIGHTS[tier]}
                  hovered={hovered}
                  setHovered={setHovered}
                  reduce={reduce}
                />
              </motion.div>
            )
          })}
        </div>

        {/* Mobile horizontal scroll strip — V-rhythm preserved, no scrollbar.
            5 cards overflow the viewport, so the last peeks to hint scroll. */}
        <div className="mt-12 lg:hidden -mx-5">
          <div className="flex items-end gap-3 overflow-x-auto no-scrollbar px-5 pt-4 pb-6 snap-x">
            {V_ORDER.map((doctor, i) => (
              <MobileCard key={doctor.slug} doctor={doctor} tier={TIERS[i]} />
            ))}
          </div>
        </div>

        {/* Quiet CTA */}
        <div className="mt-10 text-center">
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
