import { useEffect, useRef, useState } from 'react'
import { useCountUp } from '../hooks/useCountUp.js'

function StatNumber({ stat, run }) {
  const count = useCountUp(stat.isText ? 0 : stat.value, run)
  const display = stat.isText ? stat.value : count.toLocaleString('fr-FR') + (stat.suffix || '')
  return (
    <span className="block font-display text-4xl sm:text-5xl font-semibold text-gold leading-none">
      {display}
    </span>
  )
}

// Three-up stat row with count-up triggered on scroll into view. Generous
// spacing — used on Dr Amraoui's profile only.
export default function StatsRow({ stats }) {
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
    <div
      ref={ref}
      className="grid sm:grid-cols-3 gap-10 sm:gap-6 sm:divide-x divide-gold/30 border-t border-gold/30 pt-12"
    >
      {stats.map((stat, i) => (
        <div key={i} className={i === 0 ? 'text-center sm:text-left' : 'text-center sm:text-left sm:pl-6'}>
          <StatNumber stat={stat} run={run} />
          <p className="mt-3 text-xs sm:text-sm tracking-[0.06em] uppercase leading-snug text-muted">
            {stat.line}
          </p>
        </div>
      ))}
    </div>
  )
}
