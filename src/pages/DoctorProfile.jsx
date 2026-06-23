import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import DoctorPortrait from '../components/DoctorPortrait.jsx'
import StatsRow from '../components/StatsRow.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { getDoctor, examsForDoctor } from '../data/site.js'
import { openBookingModal } from '../utils/bookingModal.js'
import { doctorInitials } from '../utils/initials.js'
import NotFound from './NotFound.jsx'

function TimelineRow({ t }) {
  return (
    <li className="flex gap-5">
      <span className="font-display text-xl font-semibold text-gold-deep w-16 shrink-0">
        {t.year || <span className="text-gold">·</span>}
      </span>
      <span className="text-sm sm:text-base text-ink/80 leading-relaxed pt-0.5">{t.text}</span>
    </li>
  )
}

// Collapsed by default on every screen size: shows the 2 most recent entries,
// expands the rest with a CSS max-height transition (no JS height math).
function AcademicTimeline({ items }) {
  const [open, setOpen] = useState(false)
  if (!items?.length) return null

  // Diploma-style timelines are dated and authored oldest-first, so sort them
  // newest-first. Career timelines (some undated milestones) are authored
  // newest-first already — keep their given order.
  const allDated = items.every((t) => t.year && !Number.isNaN(Number(t.year)))
  const ordered = allDated ? [...items].sort((a, b) => Number(b.year) - Number(a.year)) : items
  const visible = ordered.slice(0, 2)
  const hidden = ordered.slice(2)

  return (
    <section className="bg-cream-soft py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="eyebrow text-burgundy mb-8">
          Parcours académique
        </h2>
        <ul className="space-y-5">
          {visible.map((t) => (
            <TimelineRow key={t.text} t={t} />
          ))}
        </ul>
        {hidden.length > 0 && (
          <>
            <div className={`collapse-mh ${open ? 'open' : ''}`}>
              <ul className="space-y-5 pt-5">
                {hidden.map((t) => (
                  <TimelineRow key={t.text} t={t} />
                ))}
              </ul>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-burgundy-deep transition-colors"
            >
              {open ? 'Réduire' : 'Voir le parcours complet'}
              <svg viewBox="0 0 24 24" className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} fill="none" aria-hidden="true">
                <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>
    </section>
  )
}

function ExamStrip({ slug }) {
  const exams = examsForDoctor(slug)
  if (!exams.length) return null
  return (
    <section className="bg-cream-soft py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="eyebrow text-burgundy mb-8">
          Examens réalisés
        </h2>
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1 snap-x">
          {exams.map((e) => (
            <Link
              key={e.id}
              to={`/examens/${e.id}`}
              className="group flex w-64 shrink-0 flex-col rounded-2xl border border-gold/25 bg-white/60 p-6 snap-start transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-gold/50"
            >
              <h3 className="font-display text-xl font-semibold text-ink leading-tight">{e.name}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed flex-1">{e.why}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal group-hover:gap-2.5 transition-all">
                En savoir plus <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Surgical domains as static tags (no links — a surgeon is not mapped to the
// ambulatory exam pages). Used instead of ExamStrip when `procedures` is set.
function ProceduresSection({ procedures }) {
  if (!procedures?.length) return null
  return (
    <section className="bg-cream-soft py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <h2 className="eyebrow text-burgundy mb-8">
          Domaines d'expertise
        </h2>
        <ul className="flex flex-wrap gap-3">
          {procedures.map((p) => (
            <li
              key={p}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-burgundy"
              style={{ backgroundColor: 'rgba(123,28,66,0.08)' }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default function DoctorProfile() {
  const { slug } = useParams()
  const doctor = getDoctor(slug)
  const [heroRef, heroVisible] = useReveal()
  if (!doctor) return <NotFound />

  const path = `/equipe/${doctor.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Physician',
    name: doctor.name,
    medicalSpecialty: 'Cardiology',
    description: doctor.bioShort,
    url: `https://cardio-check-up.com${path}`,
    worksFor: { '@type': 'MedicalClinic', name: 'Cabinet Cardio Check-up' },
  }

  return (
    <>
      <Seo title={doctor.name} description={doctor.bioShort} path={path} jsonLd={jsonLd} />

      {/* Breadcrumb + hero */}
      <section className="bg-cream pt-28 sm:pt-32 pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Breadcrumb
            items={[
              { label: 'Accueil', to: '/' },
              { label: 'Notre Équipe', to: '/equipe' },
              { label: doctor.name },
            ]}
          />
          <div
            ref={heroRef}
            className={`reveal ${heroVisible ? 'is-visible' : ''} mt-8 grid gap-10 lg:gap-14 lg:grid-cols-[42%_1fr] items-center`}
          >
            <div>
              <div
                className={`h-[26rem] sm:h-[32rem] overflow-hidden rounded-2xl ${
                  doctor.isFounder ? 'ring-2 ring-gold/50' : ''
                }`}
              >
                <DoctorPortrait
                  src={doctor.photo}
                  alt={`Portrait du ${doctor.name}`}
                  monogram={doctor.noPhoto ? doctorInitials(doctor.name) : undefined}
                />
              </div>
              {!doctor.photo && (
                <p className="mt-3 text-center text-xs text-muted">
                  {doctor.noPhoto
                    ? `Photo non communiquée (${doctor.noPhotoReason || 'choix du médecin'}).`
                    : 'Photographie à venir.'}
                </p>
              )}
            </div>
            <div>
              <p className="eyebrow text-burgundy mb-3">
                {doctor.specialty}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.05]">
                {doctor.name}
              </h1>
              <p className="mt-4 text-sm text-muted">{doctor.credibility}</p>
              {doctor.badge && (
                <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-gold-deep">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  {doctor.badge}
                </span>
              )}
              <p className="mt-6 text-ink/80 leading-[1.8]">{doctor.bio}</p>
              {doctor.languages?.length > 0 && (
                <p className="mt-5 text-xs text-muted">
                  <span className="font-semibold uppercase tracking-[0.12em] text-gold-deep">Langues</span>
                  {'  '}
                  {doctor.languages.join(' · ')}
                </p>
              )}
            </div>
          </div>

          {/* Highlight pull-quote (e.g. Pr Doguet's media + athletic life, or
              Dr Taha's academic distinctions). Label is per-doctor. */}
          {doctor.highlight && (
            <div className="mt-12 rounded-2xl border-l-4 border-gold bg-cream-soft p-7 sm:p-9">
              <p className="eyebrow text-burgundy mb-3">
                {doctor.highlightLabel || 'Au-delà de la chirurgie'}
              </p>
              <p className="font-display text-xl sm:text-2xl text-ink/85 leading-relaxed">
                {doctor.highlight}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Academic timeline */}
      <AcademicTimeline items={doctor.timeline} />

      {/* Stats — founder only */}
      {doctor.stats && (
        <section className="bg-cream py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <StatsRow stats={doctor.stats} />
          </div>
        </section>
      )}

      {/* Examens réalisés (ambulatory cardiologists) — or surgical domains */}
      {doctor.procedures ? (
        <ProceduresSection procedures={doctor.procedures} />
      ) : (
        <ExamStrip slug={doctor.slug} />
      )}

      {/* Booking CTA — location line follows the doctor (surgeons practise
          outside the Paris cabinet, so don't assert the cabinet addresses). */}
      <CtaStrip
        title={`Prendre rendez-vous avec ${doctor.name}`}
        subtitle={
          doctor.procedures
            ? 'Notre équipe vous met en relation · Réponse sous 24 à 48h'
            : 'Cabinet Cardio Check-up, Paris 17 · Réponse sous 24 à 48h'
        }
        onPrimary={() => openBookingModal({ message: `Demande de rendez-vous avec ${doctor.name}.` })}
      />
    </>
  )
}
