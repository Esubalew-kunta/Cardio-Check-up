import { useEffect, useRef, useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'
import { STATS } from '../data/site.js'

const TIMELINE = [
  { year: '2011', text: 'DIU d’échocardiographie, Université Bordeaux Segalen' },
  { year: '2012', text: 'DES de cardiologie & maladies vasculaires · Doctorat en sciences médicales' },
  { year: '2014', text: 'Master 2 sciences du vivant et de la santé, Université Paris 7' },
  { year: '2015', text: 'DIU de rythmologie & défibrillation' },
  { year: '2021', text: 'Executive MSc in Health Economics, London School of Economics' },
]

// Count-up that starts once the stat row scrolls into view.
function useCountUp(target, run, { duration = 1500 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, duration])

  return value
}

function StatNumber({ stat, run }) {
  const count = useCountUp(stat.isText ? 0 : stat.value, run)
  const display = stat.isText ? stat.value : count.toLocaleString('fr-FR') + (stat.suffix || '')
  return (
    <span className="block font-display text-[2rem] font-semibold text-gold leading-none">
      {display}
    </span>
  )
}

function StatRow() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRun(true)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mt-8 grid grid-cols-3 divide-x divide-gold/30 border-t border-gold/30 pt-8">
      {STATS.map((stat, i) => (
        <div key={i} className={i === 0 ? '' : 'pl-4 sm:pl-6'}>
          <StatNumber stat={stat} run={run} />
          <p className="mt-1.5 text-[0.65rem] sm:text-[0.7rem] tracking-[0.08em] uppercase leading-snug text-muted">
            {stat.line}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function About() {
  const [ref, visible] = useReveal()
  const [open, setOpen] = useState(false)

  return (
    <section id="dr-amraoui" className="py-24 sm:py-32 bg-cream overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} grid lg:grid-cols-2 gap-12 lg:gap-16 items-center`}>
          {/* Portrait + plaque: overlay on desktop, stacked on mobile */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="/images/doctor-portrait.jpg"
                alt="Dr Sana Amraoui, cardiologue et rythmologue"
                className="w-full h-[24rem] sm:h-[32rem] lg:h-[34rem] object-cover object-top"
              />
            </div>
            <div className="mt-4 lg:mt-0 w-full sm:w-56 lg:w-52 overflow-hidden rounded-xl border-4 border-cream shadow-lg lg:absolute lg:-bottom-8 lg:-right-8 lg:rotate-[-3deg]">
              <img
                src="/images/plaque-credentials.jpg"
                alt="Plaque du cabinet, Docteur Sana Amraoui, cardiologue et rythmologue"
                className="w-full h-32 sm:h-36 object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="font-sans text-sm tracking-[0.28em] uppercase text-burgundy mb-4">
              La Cardiologue
            </p>

            {/* 1. Name */}
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
              Dr Sana Amraoui
            </h2>

            {/* 2. Title — small gold uppercase label, close under the name */}
            <p className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-gold-deep">
              Cardiologue rythmologue interventionnelle
            </p>

            {/* 3+4. Spacing, then bio with comfortable line-height */}
            <p className="mt-6 text-ink/80" style={{ lineHeight: 1.8 }}>
              Diplômée de la faculté de médecine de Bordeaux et de la London School of
              Economics, ancienne cheffe de clinique du CHU de Bordeaux, le Dr Amraoui est
              responsable d’unité au service de rythmologie de l’Hôpital Américain de Paris.
              Elle a complété sa formation par des fellowships à St Thomas’ Hospital (Londres)
              et à Columbia (New York). Elle accompagne ses patients dans le dépistage, le
              diagnostic et le suivi des maladies cardiovasculaires et des troubles du rythme
              cardiaque.
            </p>

            {/* 5+6. Spacing, then badge row */}
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <p className="inline-flex items-center gap-2 rounded-full bg-burgundy px-5 py-2.5 text-sm font-semibold text-offwhite">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                Conventionnée Secteur 2
              </p>

              {/* Expand toggle */}
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                className="inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-burgundy-deep transition-colors"
              >
                {open ? 'Masquer le parcours complet' : 'Voir le parcours académique'}
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 text-gold transition-transform duration-200 ease-in-out ${
                    open ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 9l7 7 7-7"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Expanded: full credential timeline + EHRA 2026 */}
            <div className={`expand-panel ${open ? 'open' : ''}`}>
              <div>
                <p className="mt-6 text-ink/80 leading-relaxed">
                  Le Dr Amraoui est par ailleurs Chairperson de l’EHRA 2026, le congrès annuel
                  de l’European Heart Rhythm Association.
                </p>
                <ul className="mt-6 space-y-4">
                  {TIMELINE.map((t) => (
                    <li key={t.year} className="flex gap-4">
                      <span className="font-display text-xl font-semibold text-gold-deep w-14 shrink-0">
                        {t.year}
                      </span>
                      <span className="text-sm text-ink/80 leading-relaxed pt-1">{t.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 7+8. Spacing, then "credentials at a glance" stat row */}
            <StatRow />
          </div>
        </div>
      </div>
    </section>
  )
}
