import { useState, useEffect } from 'react'
import Seo from './Seo.jsx'
import Breadcrumb from './Breadcrumb.jsx'
import FaqAccordion from './FaqAccordion.jsx'
import CtaStrip from './CtaStrip.jsx'
import AnatomyFigure from './AnatomyFigure.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { doctorsForExam } from '../data/site.js'
import { openBookingModal } from '../utils/bookingModal.js'
import { doctorInitials } from '../utils/initials.js'

function Reveal({ children, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

// Abstract, on-brand line glyphs per territory (stroke = burgundy).
const ICONS = {
  tsa: 'M12 3a3.5 3.5 0 0 1 3.2 4.9c.9.5 1.3 1.6 1 2.6M12 3a3.5 3.5 0 0 0-3.2 4.9c-.9.5-1.3 1.6-1 2.6M9.5 11v4a2.5 2.5 0 0 0 5 0v-4',
  jambes: 'M9 3v7l-2 11M15 3v7l2 11M9 10h6',
  reins: 'M9 7c-2.2 0-3.5 2.2-3.5 5S6.8 17 9 17c1.2 0 1.8-1 1.8-2.5M15 7c2.2 0 3.5 2.2 3.5 5S17.2 17 15 17c-1.2 0-1.8-1-1.8-2.5',
  aorte: 'M6 21V11a6 6 0 0 1 12 0M18 11c0-2 1-3 2.5-3M6 11c0-2-1-3-2.5-3',
  bras: 'M3 8h7l9-2M3 16h7l9 2M10 8v8',
  veines: 'M12 3c-3 1.8 3 3.6 0 5.4s3 3.6 0 5.4 3 3.6 0 5.4',
}

// Tiny meta icons by slot: 0 = durée (clock), 1 = position (person), 2 = prépa (info).
const META_ICONS = [
  'M12 7v5l3 2 M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z',
  'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM5 21a7 7 0 0 1 14 0',
  'M12 16v-4 M12 8h.01 M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z',
]

function Glyph({ d, className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  )
}

export default function ExamHub({ exam }) {
  const doctors = doctorsForExam(exam.id)
  const doctor = doctors[0]
  const path = `/examens/${exam.id}`

  // Scroll-synced highlight: the anatomy figure tracks the section in view.
  const [activeKey, setActiveKey] = useState(exam.subExams[0]?.key)
  useEffect(() => {
    const els = exam.subExams.map((s) => document.getElementById(s.key)).filter(Boolean)
    if (!els.length) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveKey(e.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [exam])
  const activeRegion = exam.subExams.find((s) => s.key === activeKey)?.region || ''
  const showFigure = !!exam.anatomy?.image

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: exam.name,
    description: exam.reassurance,
    url: `https://cardio-check-up.com${path}`,
    procedureType: 'https://schema.org/DiagnosticProcedure',
  }

  return (
    <>
      <Seo title={exam.name} description={exam.reassurance} path={path} jsonLd={jsonLd} />

      {/* S1 — Hero (centered, calm) */}
      <section className="bg-cream pt-28 sm:pt-32 pb-14 sm:pb-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="flex justify-center">
            <Breadcrumb
              items={[
                { label: 'Accueil', to: '/' },
                { label: 'Nos Examens', to: '/#examens' },
                { label: exam.name },
              ]}
            />
          </div>
          <div className="mt-6 flex flex-col items-center text-center">
            <p className="eyebrow text-burgundy">{exam.category}</p>
            <span className="mt-3 h-px w-12 bg-gold" aria-hidden="true" />
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.08] text-balance">
              {exam.headline}
            </h1>
            <p className="mt-6 max-w-2xl font-display text-xl sm:text-2xl italic leading-relaxed text-ink/60">
              {exam.reassurance}
            </p>
            {exam.introLead && (
              <p className="mt-7 max-w-2xl text-ink/75 leading-relaxed">{exam.introLead}</p>
            )}
          </div>
        </div>
      </section>

      {/* S2 — Overview cards (one per sub-exam → anchor to its section) */}
      <section className="bg-cream pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {exam.subExams.map((s, i) => (
              <Reveal key={s.key}>
                <a
                  href={`#${s.key}`}
                  className="group flex h-full flex-col rounded-2xl border border-gold/30 bg-white/60 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg"
                  style={{ transitionDelay: `${(i % 3) * 60}ms` }}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-burgundy/10 text-burgundy">
                    <Glyph d={ICONS[s.icon]} className="h-6 w-6" />
                  </span>
                  <p className="mt-4 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                    {s.region}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-ink leading-tight">
                    {s.cardTitle}
                  </h3>
                  <p className="mt-1.5 text-sm text-ink/65 leading-relaxed">{s.cardTeaser}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-signal group-hover:gap-2.5 transition-all">
                    Voir la fiche <span aria-hidden="true">→</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* S3 — Sticky chip nav */}
      <div className="sticky top-14 lg:top-16 z-30 border-y border-gold/25 bg-cream-soft/95 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <ul className="flex gap-2 overflow-x-auto no-scrollbar py-3">
            {exam.subExams.map((s) => {
              const active = s.key === activeKey
              return (
                <li key={s.key} className="shrink-0">
                  <a
                    href={`#${s.key}`}
                    onClick={() => setActiveKey(s.key)}
                    aria-current={active ? 'true' : undefined}
                    className={`inline-block rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                      active
                        ? 'border-burgundy bg-burgundy text-offwhite'
                        : 'border-gold/40 bg-cream text-burgundy hover:border-burgundy hover:bg-burgundy hover:text-offwhite'
                    }`}
                  >
                    {s.region}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      {/* S4 — Detail sections + animated anatomy figure */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className={showFigure ? 'lg:grid lg:grid-cols-[290px_minmax(0,1fr)] lg:gap-12' : ''}>
            {/* Sticky anatomy figure (desktop, only once a real base image exists) */}
            {showFigure && (
              <div className="hidden lg:block">
                <div className="sticky top-32">
                  <AnatomyFigure
                    image={exam.anatomy.image}
                    points={exam.anatomy.points}
                    activeKey={activeKey}
                    label={activeRegion}
                  />
                </div>
              </div>
            )}

            {/* Detail sections */}
            <div className={showFigure ? 'space-y-7' : 'mx-auto max-w-3xl space-y-7'}>
          {exam.subExams.map((s, i) => (
            <Reveal key={s.key}>
              <article
                id={s.key}
                className="scroll-mt-28 rounded-2xl border border-gold/30 bg-white/70 p-7 sm:p-9"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-display text-3xl font-semibold text-gold-deep leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-gold-deep">
                      {s.region}
                    </p>
                    <h2 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-ink leading-tight">
                      {s.title}
                    </h2>
                  </div>
                </div>

                {/* Meta pills */}
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {s.meta.map((m, mi) => (
                    <li
                      key={mi}
                      className="inline-flex items-center gap-2 rounded-full bg-cream px-3 py-1.5 text-xs font-medium text-ink/70 border border-gold/25"
                    >
                      <Glyph d={META_ICONS[mi % META_ICONS.length]} className="h-3.5 w-3.5 text-burgundy" />
                      {m}
                    </li>
                  ))}
                </ul>

                {/* Body */}
                <div className="mt-5 space-y-3.5 text-ink/82 leading-[1.8]">
                  {s.body.map((p, pi) => (
                    <p key={pi}>{p}</p>
                  ))}
                </div>

                {/* Concerné(e) si */}
                {s.concernedIf?.length > 0 && (
                  <div className="mt-6 rounded-xl bg-burgundy/[0.05] border border-burgundy/10 p-5">
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-burgundy">
                      Concerné(e) si…
                    </p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {s.concernedIf.map((c, ci) => (
                        <li key={ci} className="flex gap-2.5 text-sm text-ink/80 leading-snug">
                          <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-burgundy" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
            </div>
          </div>
        </div>
      </section>

      {/* S5 — Doctor band */}
      {doctor && (
        <section className="bg-cream py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal className="flex flex-col sm:flex-row sm:items-center gap-5 rounded-2xl border border-gold/30 bg-white/60 p-7">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-gradient-to-br from-burgundy to-burgundy-deep font-display text-2xl font-semibold text-gold">
                {doctorInitials(doctor.name)}
              </span>
              <div className="flex-1">
                <p className="eyebrow text-gold-deep">Réalisé par</p>
                <h3 className="mt-1.5 font-display text-2xl font-semibold text-ink leading-tight">
                  {doctor.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted">{doctor.specialty}</p>
                {exam.doctorNote && (
                  <p className="mt-3 text-sm text-ink/75 leading-relaxed">{exam.doctorNote}</p>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* S6 — Booking CTA */}
      <CtaStrip
        title="Prêt(e) à prendre rendez-vous ?"
        subtitle="Cabinet Cardio Check-up, Paris 17 · Réponse sous 24 à 48h"
        primaryLabel="Réserver"
        onPrimary={() => openBookingModal({ reason: exam.name })}
      />

      {/* S7 — FAQ */}
      {exam.faq?.length > 0 && (
        <section className="bg-cream-soft py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <FaqAccordion items={exam.faq} eyebrow="Questions fréquentes" title={`${exam.name} : vos questions`} />
          </div>
        </section>
      )}
    </>
  )
}
