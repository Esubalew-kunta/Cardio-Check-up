import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import DoctorImageCard from '../components/DoctorImageCard.jsx'
import { useReveal } from '../hooks/useReveal.js'
import { getFounder, getPartners, SECRETARIES } from '../data/site.js'

function RevealCard({ children, delay = 0 }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`reveal ${visible ? 'is-visible' : ''}`}>
      {children}
    </div>
  )
}

export default function Equipe() {
  const founder = getFounder()
  const partners = getPartners()

  return (
    <>
      <Seo
        title="Notre équipe"
        description="Rencontrez l'équipe médicale Cardio Check-up : cinq spécialistes complémentaires (cardiologie, chirurgie cardiaque et vasculaire, médecine vasculaire et nutrition) à Paris 17."
        path="/equipe"
      />

      {/* Hero band */}
      <section className="bg-burgundy-deep pt-28 sm:pt-32 pb-16 sm:pb-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Notre Équipe' }]} tone="dark" />
          <p className="mt-6 eyebrow text-gold mb-3">Notre Conseil</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-offwhite leading-[1.1] max-w-3xl">
            Rencontrez notre équipe médicale
          </h1>
        </div>
      </section>

      {/* Founder feature — larger full-image card */}
      <section className="bg-cream py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <RevealCard>
            <DoctorImageCard doctor={founder} variant="founder" />
          </RevealCard>
        </div>
      </section>

      {/* Partners grid — compact full-image cards: 4-up on desktop, 2 on
          tablet, 1 on mobile. All four fit on a 1280px screen at once. */}
      <section className="bg-cream-soft py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
            {partners.map((d, i) => (
              <RevealCard key={d.slug} delay={i * 80}>
                <DoctorImageCard doctor={d} variant="partner" />
              </RevealCard>
            ))}
          </div>
        </div>
      </section>

      {/* Secrétariat médical — support staff, presented warmly but clearly
          distinct from the doctors: circular portraits, no profile links. */}
      {SECRETARIES.length > 0 && (
        <section className="bg-cream py-20 sm:py-24">
          <div className="mx-auto max-w-4xl px-5 sm:px-8 text-center">
            <RevealCard>
              <p className="eyebrow text-burgundy mb-4">Votre accueil</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
                Notre secrétariat médical
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-ink/70 leading-relaxed">
                Premier visage du cabinet, notre secrétariat vous accompagne pour vos rendez-vous,
                vos démarches et votre accueil au quotidien.
              </p>
            </RevealCard>

            <div className="mt-12 flex flex-wrap justify-center gap-x-14 gap-y-10 sm:gap-x-20">
              {SECRETARIES.map((s, i) => (
                <RevealCard key={s.name} delay={i * 80}>
                  <figure className="flex flex-col items-center">
                    <div className="h-40 w-40 overflow-hidden rounded-full ring-1 ring-gold/30 shadow-sm sm:h-44 sm:w-44">
                      <img
                        src={s.photo}
                        alt={`Portrait de ${s.name}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: '50% 20%' }}
                      />
                    </div>
                    <figcaption className="mt-5">
                      <p className="font-display text-xl font-semibold text-ink">{s.name}</p>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                        {s.role}
                      </p>
                    </figcaption>
                  </figure>
                </RevealCard>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaStrip
        title="Prendre rendez-vous"
        subtitle="Une question sur le bon spécialiste ? Appelez-nous, nous vous orientons."
        secondary={{ label: 'Voir nos examens →', to: '/#examens' }}
      />
    </>
  )
}
