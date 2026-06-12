import { useReveal } from '../hooks/useReveal.js'
import { PARCOURS } from '../data/site.js'

export default function Parcours() {
  const [ref, visible] = useReveal()

  return (
    <section id="parcours" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background image + burgundy overlay */}
      <div className="absolute inset-0">
        <img
          src="/images/consultation.jpg"
          alt="Consultation au cabinet Cardio Check-up"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-burgundy-deep/85" />
      </div>

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} relative mx-auto max-w-3xl px-5 sm:px-8`}>
        <div className="max-w-2xl">
          <p className="font-sans text-sm tracking-[0.28em] uppercase text-gold mb-4">
            Votre visite
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-offwhite leading-tight">
            Une prise en charge simple et rassurante
          </h2>
        </div>

        {/* Vertical timeline at all breakpoints */}
        <div className="relative mt-16">
          {/* Connector line */}
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gold" aria-hidden="true" />

          <div className="space-y-14 sm:space-y-16">
            {PARCOURS.map((step) => (
              <div key={step.n} className="relative flex gap-6">
                {/* Node */}
                <span className="relative z-10 grid place-items-center h-10 w-10 shrink-0 rounded-full bg-burgundy ring-4 ring-burgundy-deep font-display text-lg font-semibold text-offwhite">
                  {step.n}
                </span>
                <div className="pt-1">
                  <h3 className="font-display text-2xl font-semibold text-offwhite">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-offwhite/80 leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
