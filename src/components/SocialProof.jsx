import { useEffect, useRef, useState } from 'react'
import { STATS } from '../data/site.js'

// Count-up that triggers once the strip scrolls into view.
function useCountUp(target, run, duration = 1600) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(target)
      return
    }
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setValue(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, target, duration])

  return value
}

function StatNumber({ stat, run }) {
  const count = useCountUp(stat.isText ? 0 : stat.value, run)
  const display = stat.isText
    ? stat.value
    : count.toLocaleString('fr-FR') + (stat.suffix || '')
  return (
    <span className="block font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-gold leading-none break-words">
      {display}
    </span>
  )
}

export default function SocialProof() {
  const ref = useRef(null)
  const [run, setRun] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setRun(true)
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 sm:py-24 bg-burgundy text-offwhite">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 sm:gap-y-0 sm:gap-x-8 divide-y divide-gold/30 sm:divide-y-0 sm:divide-x">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center px-2 sm:px-6 pt-12 first:pt-0 sm:pt-0">
              <StatNumber stat={stat} run={run} />
              {/* thin ECG underline */}
              <div className="mx-auto my-5 h-px w-16 bg-signal" />
              <p className="text-sm text-offwhite/80 leading-relaxed max-w-[16rem] mx-auto">
                {stat.line}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
