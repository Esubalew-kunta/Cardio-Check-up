import { useReveal } from '../hooks/useReveal.js'

const TIMELINE = [
  { year: '2011', text: 'DIU d’échocardiographie, Université Bordeaux Segalen' },
  { year: '2012', text: 'DES de cardiologie & maladies vasculaires · Doctorat en sciences médicales' },
  { year: '2014', text: 'Master 2 sciences du vivant et de la santé, Université Paris 7' },
  { year: '2015', text: 'DIU de rythmologie & défibrillation' },
  { year: '2021', text: 'Executive MSc in Health Economics, London School of Economics' },
]

export default function About() {
  const [ref, visible] = useReveal()

  return (
    <section id="cardiologue" className="py-24 sm:py-32 bg-cream overflow-hidden">
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
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
              Dr Sana Amraoui
            </h2>
            <p className="mt-2 text-lg text-burgundy font-medium">
              Cardiologue &amp; Rythmologue interventionnelle · MD, MS, MSc
            </p>

            <p className="mt-6 text-ink/80 leading-relaxed">
              Diplômée de la faculté de médecine de Bordeaux et de la London School of
              Economics, ancienne cheffe de clinique du CHU de Bordeaux, le Dr Amraoui est
              responsable d’unité au service de rythmologie de l’Hôpital Américain de Paris.
              Elle a complété sa formation par des fellowships à St Thomas’ Hospital (Londres)
              et à Columbia (New York).
            </p>

            {/* Timeline */}
            <ul className="mt-8 space-y-4">
              {TIMELINE.map((t) => (
                <li key={t.year} className="flex gap-4">
                  <span className="font-display text-xl font-semibold text-gold-deep w-14 shrink-0">
                    {t.year}
                  </span>
                  <span className="text-sm text-ink/80 leading-relaxed pt-1">{t.text}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-burgundy px-5 py-2.5 text-sm font-semibold text-offwhite">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Conventionnée Secteur 2
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
