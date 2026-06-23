import { useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import ExamTimeline from '../components/ExamTimeline.jsx'
import FaqAccordion from '../components/FaqAccordion.jsx'
import DoctorMiniCard from '../components/DoctorMiniCard.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { getExam, doctorsForExam } from '../data/site.js'
import { openBookingModal } from '../utils/bookingModal.js'
import NotFound from './NotFound.jsx'

function Reveal({ children, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

function VideoBlock({ videoId, name }) {
  if (videoId) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={`Vidéo explicative : ${name}`}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    )
  }
  // Placeholder until a real video ID is supplied.
  return (
    <div className="aspect-video grid place-items-center rounded-xl bg-burgundy-deep shadow-lg">
      <div className="flex flex-col items-center text-center px-6">
        <span className="grid place-items-center h-16 w-16 rounded-full border-2 border-gold/70">
          <svg viewBox="0 0 24 24" className="h-7 w-7 translate-x-0.5 fill-gold" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <p className="mt-4 text-sm font-medium text-offwhite/80">Voir la vidéo explicative</p>
      </div>
    </div>
  )
}

const PREVENTION_ICONS = [
  // heart
  'M12 21s-7.5-4.6-10-9.2C.6 8.9 2.2 5.5 5.5 5.5c1.9 0 3.3 1 4.5 2.6C11.2 6.5 12.6 5.5 14.5 5.5c3.3 0 4.9 3.4 3.5 6.3C19.5 16.4 12 21 12 21z',
  // leaf / lifestyle
  'M5 21c0-9 6-15 15-15 0 9-6 15-15 15zM5 21c2-5 5-8 9-10',
  // pulse / monitor
  'M3 12h4l2-6 4 12 2-6h6',
]

export default function ExamDetail() {
  const { slug } = useParams()
  const exam = getExam(slug)
  if (!exam) return <NotFound />

  const doctors = doctorsForExam(slug)
  const path = `/examens/${exam.id}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: exam.name,
    description: exam.whatIs,
    url: `https://cardio-check-up.com${path}`,
    procedureType: 'https://schema.org/DiagnosticProcedure',
  }

  return (
    <>
      <Seo
        title={exam.name}
        description={exam.reassurance + ' · ' + exam.headline}
        path={path}
        jsonLd={jsonLd}
      />

      {/* S1 — Hero band (cream, calm) */}
      <section className="bg-cream pt-28 sm:pt-32 pb-14 sm:pb-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Breadcrumb
            items={[
              { label: 'Accueil', to: '/' },
              { label: 'Nos Examens', to: '/#examens' },
              { label: exam.name },
            ]}
          />
          <div className="mt-6 flex flex-col items-center text-center">
            <div className="flex items-center gap-3">
              <p className="eyebrow text-burgundy">{exam.category}</p>
              {exam.placeholder && (
                <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-amber-700 border border-amber-300">
                  Contenu provisoire
                </span>
              )}
            </div>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.1] text-balance">
              {exam.headline}
            </h1>
            <p className="mt-5 max-w-2xl text-base sm:text-lg text-ink/70">{exam.reassurance}</p>
          </div>
        </div>
      </section>

      {/* S2 — What is this + video (cream) */}
      <section className="bg-cream pb-20 sm:pb-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal className="grid gap-6 lg:grid-cols-2 lg:gap-14 items-center">
            <div className="w-full">
              <p className="eyebrow text-burgundy mb-4">
                Qu'est-ce que c'est ?
              </p>
              <div className="w-full lg:max-w-[42ch] space-y-4 text-ink/80" style={{ lineHeight: 1.85 }}>
                {exam.whatIs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            <VideoBlock videoId={exam.videoId} name={exam.name} />
          </Reveal>
        </div>
      </section>

      {/* S3 — Symptom pills + context (cream-soft) */}
      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-burgundy mb-6">
              Signes évocateurs
            </p>
            <ul className="flex flex-wrap gap-3">
              {exam.symptomPills.map((s) => (
                <li
                  key={s}
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-burgundy"
                  style={{ backgroundColor: 'rgba(123,28,66,0.08)' }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-ink/80 leading-relaxed max-w-2xl">{exam.symptomContext}</p>
          </Reveal>
        </div>
      </section>

      {/* S4 — Exam-specific 4-step timeline (dark) */}
      <ExamTimeline steps={exam.steps} examName={exam.name} />

      {/* S5 — Comment se préparer (cream-soft) */}
      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
              Comment se préparer
            </h2>
            <ul className="mt-8 space-y-4">
              {exam.preparation.map((p, i) => (
                <li key={i} className="flex gap-3.5 text-ink/80 leading-relaxed">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-signal" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* S6 — Doctors who perform this exam (cream) */}
      {doctors.length > 0 && (
        <section className="bg-cream py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal>
              <p className="eyebrow text-burgundy mb-8">
                Réalisé par
              </p>
              <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-1 px-1 snap-x">
                {doctors.map((d) => (
                  <div key={d.slug} className="snap-start">
                    <DoctorMiniCard doctor={d} />
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* S7 — Booking CTA (before prevention) */}
      <CtaStrip
        title={`Prendre rendez-vous pour ${exam.indef} ${exam.name}`}
        subtitle="Cabinet Cardio Check-up, Paris 17 · Réponse sous 24 à 48h"
        primaryLabel="Réserver"
        onPrimary={() => openBookingModal({ reason: exam.name })}
      />

      {/* S8 — Prevention tips (after CTA) */}
      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <p className="eyebrow text-burgundy mb-8">
              Conseils de prévention
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              {exam.prevention.map((tip, i) => (
                <div key={i} className="rounded-2xl border border-gold/25 bg-white/50 p-7">
                  <span className="grid place-items-center h-11 w-11 rounded-full bg-burgundy/10">
                    <svg viewBox="0 0 24 24" className="h-6 w-6 text-burgundy" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={PREVENTION_ICONS[i % PREVENTION_ICONS.length]} />
                    </svg>
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">{tip.title}</h3>
                  <p className="mt-2 text-sm text-ink/75 leading-relaxed">{tip.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* S9 — Exam-specific FAQ (cream) */}
      {exam.faq.length > 0 && (
        <section className="bg-cream py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <FaqAccordion items={exam.faq} eyebrow="Questions fréquentes" title={`${exam.name} : vos questions`} />
          </div>
        </section>
      )}
    </>
  )
}
