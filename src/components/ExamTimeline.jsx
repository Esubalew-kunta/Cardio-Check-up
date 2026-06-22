import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from 'framer-motion'

// The "Votre visite" 4-step timeline, migrated from the old Parcours section
// and driven by exam-specific `steps`. Dark dramatic band with a gold line that
// draws on scroll. Steps activate as the line reaches them.
export default function ExamTimeline({ steps, examName }) {
  const timelineRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const [activeCount, setActiveCount] = useState(0)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.3'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const count = steps.filter((_, i) => latest >= (i + 1) / steps.length).length
    setActiveCount(count)
  })

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/consultation.jpg"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-burgundy-deep/85" />
      </div>

      <div className="relative mx-auto max-w-3xl px-5 sm:px-8">
        <p className="eyebrow text-gold mb-4">Votre visite</p>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold text-offwhite leading-tight">
          Comment se déroule votre {examName} ?
        </h2>

        <div ref={timelineRef} className="relative mt-14">
          <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gold/25" aria-hidden="true" />
          {prefersReducedMotion ? (
            <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gold" aria-hidden="true" />
          ) : (
            <motion.div
              className="absolute left-5 top-2 bottom-2 w-0.5 bg-gold origin-top"
              style={{ scaleY: lineScale }}
              aria-hidden="true"
            />
          )}

          <ol className="space-y-12 sm:space-y-14">
            {steps.map((step, i) => {
              const isActive = prefersReducedMotion || i < activeCount
              const n = String(i + 1).padStart(2, '0')
              return (
                <li key={step.title} className="relative flex gap-6">
                  <span
                    className={`relative z-10 grid place-items-center h-10 w-10 shrink-0 rounded-full ring-4 ring-burgundy-deep font-display text-lg font-semibold border-2 border-burgundy transition-colors duration-300 ${
                      isActive ? 'bg-burgundy text-offwhite' : 'bg-transparent text-burgundy'
                    }`}
                  >
                    {n}
                  </span>
                  <motion.div
                    className="pt-1"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                    whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                    viewport={{ amount: 0.5, once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  >
                    <h3 className="font-display text-2xl font-semibold text-offwhite">{step.title}</h3>
                    <p className="mt-2 text-sm text-offwhite/80 leading-relaxed">{step.text}</p>
                  </motion.div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
