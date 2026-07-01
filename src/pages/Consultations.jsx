import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { CONSULTATIONS, CONSULTATION_GROUPS } from '../data/site.js'
import { openDoctolib } from '../utils/doctolibModal.js'

const ICONS = {
  heart:
    'M12 21s-7.5-4.6-10-9.2C.6 8.9 2.2 5.5 5.5 5.5c1.9 0 3.3 1 4.5 2.6C11.2 6.5 12.6 5.5 14.5 5.5c3.3 0 4.9 3.4 3.5 6.3C19.5 16.4 12 21 12 21z',
  doc: 'M7 3h8l4 4v14H7zM15 3v4h4',
  scalpel: 'M5 19l10-10 0 0 M14 10l3.5-3.5a2 2 0 0 0-2.8-2.8L11 7.4 M5 19h3l1-1',
  leaf: 'M5 21c0-9 6-15 15-15 0 9-6 15-15 15zM5 21c2-5 5-8 9-10',
}

function Reveal({ children, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

function Card({ c }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gold/30 bg-white/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-lg">
      <h3 className="font-display text-xl font-semibold text-ink leading-tight">
        {c.detailTo ? (
          <Link to={c.detailTo} className="transition-colors hover:text-burgundy">
            {c.name}
          </Link>
        ) : (
          c.name
        )}
      </h3>
      <p className="mt-2.5 text-sm text-ink/75 leading-relaxed">{c.teaser}</p>
      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
        <button
          type="button"
          onClick={openDoctolib}
          className="inline-flex items-center gap-2 rounded-full border border-burgundy/40 px-4 py-2 text-sm font-semibold text-burgundy transition-colors hover:border-burgundy hover:bg-burgundy hover:text-offwhite"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          Prendre rendez-vous
        </button>
        {c.detailTo && (
          <Link to={c.detailTo} className="text-sm font-semibold text-signal hover:underline">
            En savoir plus →
          </Link>
        )}
      </div>
    </div>
  )
}

export default function Consultations() {
  return (
    <>
      <Seo
        title="Consultations"
        description="Nos consultations et motifs de consultation : cardiologie, rythmologie, bilans, chirurgie, nutrition. Cabinet Cardio Check-up, Paris 17."
        path="/consultations"
      />

      {/* Hero */}
      <section className="bg-cream pt-28 sm:pt-32 pb-12 sm:pb-14">
        <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
          <div className="flex justify-center">
            <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Consultations' }]} />
          </div>
          <p className="mt-6 eyebrow text-burgundy">Consultations</p>
          <span className="mx-auto mt-3 block h-px w-12 bg-gold" aria-hidden="true" />
          <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.1]">
            Nos consultations
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink/75 leading-relaxed">
            Onze motifs de consultation, organisés par domaine, pour vous orienter vers le bon
            rendez-vous. Chaque consultation est assurée par le spécialiste concerné.
          </p>
          <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-sm">
            <span className="text-muted">Aller à :</span>
            {CONSULTATION_GROUPS.map((g, i) => (
              <span key={g.key} className="flex items-center gap-2.5">
                <a
                  href={`#${g.key}`}
                  className="font-semibold text-burgundy border-b border-burgundy/30 pb-0.5 hover:border-burgundy transition-colors"
                >
                  {g.label}
                </a>
                {i < CONSULTATION_GROUPS.length - 1 && <span className="text-gold" aria-hidden="true">·</span>}
              </span>
            ))}
          </nav>
        </div>
      </section>

      {/* Groups */}
      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          {CONSULTATION_GROUPS.map((group, gi) => {
            const items = CONSULTATIONS.filter((c) => c.group === group.key)
            if (!items.length) return null
            return (
              <div
                key={group.key}
                id={group.key}
                className={`scroll-mt-24 ${gi === 0 ? '' : 'mt-14 border-t border-gold/30 pt-14'}`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 text-burgundy">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={ICONS[group.icon]} />
                    </svg>
                  </span>
                  <div>
                    <h2 className="font-display text-3xl font-semibold text-ink leading-tight">{group.label}</h2>
                    <p className="mt-1 eyebrow text-gold-deep">
                      {items.length} consultation{items.length > 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
                <p className="mt-3 max-w-2xl text-ink/70 leading-relaxed">{group.desc}</p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {items.map((c) => (
                    <Reveal key={c.id} className="h-full">
                      <Card c={c} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <CtaStrip
        title="Vous hésitez sur le motif de consultation ?"
        subtitle="Notre équipe peut vous orienter vers le rendez-vous le plus adapté à votre situation."
        primaryLabel="Prendre rendez-vous"
        onPrimary={openDoctolib}
      />
    </>
  )
}
