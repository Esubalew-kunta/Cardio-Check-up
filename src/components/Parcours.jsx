import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal.js'
import { PARCOURS } from '../data/site.js'

export default function Parcours() {
  const [ref, visible] = useReveal()
  const timelineRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeCount, setActiveCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.3'],
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const count = PARCOURS.filter((_, i) => latest >= (i + 1) / PARCOURS.length).length
    setActiveCount(count)
  })

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
        <div ref={timelineRef} className="relative mt-16">
          {/* Connector line track */}
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gold/25" aria-hidden="true" />
          {/* Connector line progress */}
          {prefersReducedMotion ? (
            <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gold" aria-hidden="true" />
          ) : (
            <motion.div
              className="absolute left-5 top-2 bottom-2 w-0.5 bg-gold origin-top"
              style={{ scaleY: lineScale }}
              aria-hidden="true"
            />
          )}

          <div className="space-y-14 sm:space-y-16">
            {PARCOURS.map((step, i) => {
              const isActive = prefersReducedMotion || i < activeCount
              return (
                <div key={step.n} className="relative flex gap-6">
                  {/* Node */}
                  <span
                    className={`relative z-10 grid place-items-center h-10 w-10 shrink-0 rounded-full ring-4 ring-burgundy-deep font-display text-lg font-semibold border-2 border-burgundy transition-colors duration-300 ${
                      isActive ? 'bg-burgundy text-offwhite' : 'bg-transparent text-burgundy'
                    }`}
                  >
                    {step.n}
                  </span>
                  <motion.div
                    className="pt-1"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ amount: 0.5, once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  >
                    <h3 className="font-display text-2xl font-semibold text-offwhite">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-offwhite/80 leading-relaxed">{step.text}</p>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
