import { useReveal } from '../hooks/useReveal.js'

// All copy is drawn from Dr Amraoui's brief (§1). Figures and the AI claim are
// flagged for medical/editorial validation before go-live (brief §12).
const RISK_FACTORS = ['Hypertension', 'Apnée du sommeil', 'Cholestérol', 'Diabète', 'Surpoids']

const PILLARS = [
  {
    key: 'prev',
    title: 'Préventive',
    text: 'Nous plaçons la médecine préventive au centre de chaque démarche, du dépistage des facteurs de risque au suivi.',
  },
  {
    key: 'innov',
    title: 'Innovante',
    // TODO: validation médicale — préciser les usages réels de l'IA, sans promesse excessive (brief §12)
    text: "Un cabinet connecté et digitalisé, qui intègre des outils d'intelligence artificielle pour optimiser le dépistage, l'analyse des examens et le suivi.",
  },
  {
    key: 'perso',
    title: 'Personnalisée',
    text: 'Chaque bilan et chaque prise en charge sont adaptés à votre profil, vos antécédents et vos facteurs de risque propres.',
  },
]

const ICONS = {
  prev: (
    <>
      <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  innov: <path d="M12 4l1.7 5 5 1.7-5 1.7L12 17l-1.7-4.6-5-1.7 5-1.7z" />,
  perso: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
}

function Reveal({ children, className = '' }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default function Pourquoi() {
  return (
    <section className="bg-cream-soft py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-burgundy">Pourquoi Cardio Check-up</p>
          <span className="mx-auto mt-3 block h-px w-12 bg-gold" aria-hidden="true" />
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            Une médecine préventive, innovante et personnalisée
          </h2>
        </Reveal>

        {/* The stakes + the mission */}
        <Reveal className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div>
            <p className="eyebrow text-gold-deep">Un enjeu de santé publique</p>
            {/* TODO: validation médicale — chiffre d'épidémiologie à valider (brief §12) */}
            <p className="mt-4 font-display text-6xl sm:text-7xl font-semibold text-burgundy leading-none">
              17,9 M
            </p>
            <p className="mt-4 max-w-sm text-ink/80 leading-relaxed">
              de vies perdues chaque année dans le monde. Les maladies cardiovasculaires sont la
              première cause de décès.
            </p>
          </div>

          <div className="lg:border-l lg:border-gold/30 lg:pl-16">
            <p className="text-lg text-ink/80 leading-relaxed">
              Cardio Check-up a été créé pour répondre à un enjeu majeur de santé publique : la
              prévention cardiovasculaire. Nous identifions et traitons précocement les facteurs de
              risque, avant qu&rsquo;ils ne deviennent une maladie.
            </p>
            <ul className="mt-7 flex flex-wrap gap-2.5">
              {RISK_FACTORS.map((r) => (
                <li
                  key={r}
                  className="rounded-full border border-gold/40 bg-cream px-4 py-1.5 text-sm font-medium text-burgundy"
                >
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* The conviction */}
        <Reveal className="mx-auto mt-20 max-w-3xl text-center">
          <p className="eyebrow text-burgundy">Notre conviction</p>
          <span className="mx-auto mt-3 block h-px w-12 bg-gold" aria-hidden="true" />
          <blockquote className="mt-7 font-display text-3xl sm:text-[2.1rem] italic leading-snug text-burgundy">
            «&nbsp;Mieux dépister pour mieux prévenir, et mieux prévenir pour mieux traiter.&nbsp;»
          </blockquote>
        </Reveal>

        {/* Three pillars */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {PILLARS.map((p) => (
            <Reveal key={p.key} className="h-full">
              <div className="h-full rounded-2xl border border-gold/30 bg-white/50 p-8">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy/10 text-burgundy">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {ICONS[p.key]}
                  </svg>
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm text-ink/75 leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The environment */}
        <Reveal className="mt-12 text-center">
          <p className="mx-auto max-w-2xl text-muted leading-relaxed">
            Un environnement épuré et design, au sein d&rsquo;un{' '}
            <span className="font-display italic text-gold-deep">centre architectural remarquable</span>, pensé
            pour allier excellence médicale et confort pour chaque patient.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
