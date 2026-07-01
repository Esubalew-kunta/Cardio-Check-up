import { RISK_FACTORS } from '../data/site.js'

// Friend's approved design: a styled reference "table" of the 7 cardiovascular
// risk factors. `highlight` is a factor key (e.g. 'hypertension') whose row gets
// the "Sur cette page" treatment, so the section feels native to the disease
// page it sits on. Target figures are draft (validation gate, brief §12).

const ICONS = {
  pulse: 'M3 12h4l2-6 4 12 2-6h6',
  drop: 'M12 3c3 4 5 6.5 5 9a5 5 0 0 1-10 0c0-2.5 2-5 5-9z',
  flask: 'M9 3h6M10 3v5l-4.4 9.2A2 2 0 0 0 7.4 21h9.2a2 2 0 0 0 1.8-2.8L14 9V3',
  smoke: 'M4 17h12v3H4zM19 17v3M22 17v3M16.5 17c0-2 1.8-2 1.8-4s-1.8-2-1.8-4',
  scale: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 12l3.5-2',
  run: 'M14 5a1.8 1.8 0 1 0 0-.01M9 21l2.5-4.5L15 18l1-4M11.5 16.5 9.5 13l4-2 3 2',
  family: 'M7 9a2.4 2.4 0 1 0 0-.01M17 9a2.4 2.4 0 1 0 0-.01M7 19v-3M17 19v-3M12 21v-6M7 16h10',
}

export default function FacteursRisque({ highlight }) {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-burgundy">Prévention</p>
          <span className="mx-auto mt-3 block h-px w-12 bg-gold" aria-hidden="true" />
          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
            Sept facteurs à surveiller
          </h2>
          <p className="mt-4 text-ink/75 leading-relaxed">
            Le dépistage régulier de ces facteurs permet d'agir tôt, avant l'apparition d'une maladie
            cardiovasculaire.
          </p>
        </div>

        {/* Column headers (desktop) */}
        <div className="mt-12 hidden lg:grid grid-cols-[1.1fr_1.6fr_auto] gap-6 px-6 pb-3">
          <span className="eyebrow text-muted">Facteur de risque</span>
          <span className="eyebrow text-muted">Dépistage</span>
          <span className="eyebrow text-muted justify-self-end">Objectif</span>
        </div>

        <div className="mt-2 overflow-hidden rounded-2xl border border-gold/35 bg-white/40">
          {RISK_FACTORS.map((f, i) => {
            const active = f.key === highlight
            return (
              <div
                key={f.key}
                className={`grid gap-x-6 gap-y-3 px-6 py-5 lg:grid-cols-[1.1fr_1.6fr_auto] lg:items-center ${
                  i > 0 ? 'border-t border-gold/25' : ''
                } ${active ? 'border-l-4 border-l-gold bg-gold/[0.08]' : 'border-l-4 border-l-transparent'}`}
              >
                {/* Factor */}
                <div className="flex items-center gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-burgundy/[0.09] text-burgundy">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d={ICONS[f.icon]} />
                    </svg>
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold text-ink leading-tight">{f.name}</p>
                    {active && (
                      <span className="mt-1 inline-block rounded-full bg-burgundy/10 px-2.5 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-burgundy">
                        Sur cette page
                      </span>
                    )}
                  </div>
                </div>

                {/* Screening */}
                <p className="text-sm text-ink/72 leading-relaxed">
                  <span className="eyebrow text-gold-deep lg:hidden">Dépistage</span>
                  <span className="lg:hidden"> · </span>
                  {f.screening}
                </p>

                {/* Target */}
                <div className="lg:justify-self-end lg:text-right">
                  <p className="eyebrow text-gold-deep mb-1.5">{f.label || 'Objectif'}</p>
                  <span className="inline-block rounded-full border border-burgundy/40 bg-white px-3.5 py-1.5 text-sm font-semibold text-burgundy whitespace-nowrap">
                    {f.target}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        <p className="mt-5 text-center text-xs text-muted italic">
          Ces objectifs sont indicatifs et seront ajustés avec votre médecin selon votre profil.
        </p>
      </div>
    </section>
  )
}
