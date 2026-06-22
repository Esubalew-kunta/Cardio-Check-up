import { useEffect, useRef, useState } from 'react'

// The "Votre visite" patient-journey steps over the consultation photo, with a
// gold line threading their number circles. The heading stays static.
//
// Emphasis (scale 1.06 + brighter card), smooth 0.3s transitions:
//  • Desktop — all four sit in one equal row; a card lifts only on HOVER. No
//    coupling to page scroll, so nothing jumps around as you read down the page.
//  • Mobile — the four live in a horizontal, scrollbar-free snap strip. With no
//    hover to lean on, a scroll listener emphasises whichever card is closest to
//    centre as the user swipes from step 1 to step 4.
export default function ExamTimeline({ steps, examName }) {
  const stripRef = useRef(null)
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReduced(true)
      return
    }

    const strip = stripRef.current
    if (!strip) return
    const isDesktop = () => window.matchMedia('(min-width: 768px)').matches

    // Mobile only: card whose centre is nearest the strip's horizontal centre.
    // Desktop emphasis is pure CSS hover, so this is a no-op there.
    const computeMobile = () => {
      if (isDesktop()) return
      const cards = strip.querySelectorAll('[data-step]')
      if (!cards.length) return
      const sr = strip.getBoundingClientRect()
      const center = sr.left + sr.width / 2
      let best = 0
      let bestDist = Infinity
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect()
        const dist = Math.abs(r.left + r.width / 2 - center)
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      setActive(best)
    }

    let raf = 0
    const onStrip = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(computeMobile)
    }
    strip.addEventListener('scroll', onStrip, { passive: true })
    const onResize = () => computeMobile()
    window.addEventListener('resize', onResize)
    computeMobile()

    return () => {
      strip.removeEventListener('scroll', onStrip)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [steps.length])

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

      <div className="relative">
        {/* Static heading */}
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <p className="eyebrow text-gold mb-4">Votre visite</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-offwhite leading-tight">
            Comment se déroule votre {examName} ?
          </h2>
          <p className="mt-4 text-sm text-offwhite/65 md:hidden">Faites glisser pour suivre les étapes →</p>
        </div>

        {/* Steps — horizontal snap strip on mobile, equal row on desktop */}
        <div
          ref={stripRef}
          className="mt-12 sm:mt-14 overflow-x-auto no-scrollbar md:overflow-visible"
        >
          <div className="relative mx-auto flex w-max gap-5 px-[10vw] snap-x snap-mandatory sm:gap-6 md:grid md:w-full md:max-w-5xl md:grid-cols-4 md:px-8 md:snap-none">
            {/* Gold line threading the number circles */}
            <div
              className="pointer-events-none absolute left-0 right-0 top-6 h-0.5 -translate-y-1/2 bg-gold/30 md:left-[12%] md:right-[12%]"
              aria-hidden="true"
            />

            {steps.map((step, i) => {
              const isActive = reduced || i === active
              const n = String(i + 1).padStart(2, '0')
              return (
                <div
                  key={step.title}
                  data-step
                  className={`group/card relative z-10 flex h-full w-[80vw] max-w-[20rem] shrink-0 origin-top snap-center flex-col items-center text-center transition-all duration-300 ease-out md:w-auto md:max-w-none md:scale-100 md:opacity-100 md:hover:scale-[1.06] ${
                    isActive ? 'scale-[1.06] opacity-100' : 'scale-95 opacity-70'
                  }`}
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full font-display text-lg font-semibold ring-4 ring-burgundy-deep transition-colors duration-300 md:bg-gold md:text-burgundy-deep ${
                      isActive ? 'bg-gold text-burgundy-deep' : 'bg-gold/40 text-burgundy-deep/80'
                    }`}
                  >
                    {n}
                  </span>
                  <div className="mt-5 w-full flex-1 rounded-2xl border border-gold/20 bg-burgundy-deep/40 p-6 backdrop-blur-sm transition-colors duration-300 md:group-hover/card:border-gold/50">
                    <h3 className="font-display text-xl font-semibold text-offwhite">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-offwhite/80">{step.text}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
