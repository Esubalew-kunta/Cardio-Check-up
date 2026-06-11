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

      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} relative mx-auto max-w-6xl px-5 sm:px-8`}>
        <div className="max-w-2xl">
          <p className="font-sans text-sm tracking-[0.28em] uppercase text-gold mb-4">
            Votre parcours
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-offwhite leading-tight">
            Une prise en charge simple et rassurante
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative mt-16">
          {/* Connector line: vertical (down the left) on mobile, horizontal on desktop */}
          <div
            className="absolute bg-gold/30 left-5 top-0 bottom-0 w-px lg:left-0 lg:right-0 lg:top-5 lg:bottom-auto lg:h-px lg:w-auto"
            aria-hidden="true"
          />

          <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
            {PARCOURS.map((step) => (
              <div key={step.n} className="relative flex gap-5 lg:flex-col lg:gap-0">
                {/* Node */}
                <span className="relative z-10 grid place-items-center h-10 w-10 shrink-0 rounded-full bg-gold font-display text-lg font-semibold text-burgundy">
                  {step.n}
                </span>
                <div className="lg:mt-6">
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
