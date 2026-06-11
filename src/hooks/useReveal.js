import { useEffect, useRef, useState } from 'react'

// IntersectionObserver-based scroll reveal. Returns a ref to attach and a
// boolean once the element has entered the viewport. Honors reduced-motion
// by revealing immediately (the CSS also short-circuits the transition).
export function useReveal(options = { threshold: 0.15, once: true }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            if (options.once) observer.unobserve(entry.target)
          } else if (!options.once) {
            setVisible(false)
          }
        })
      },
      { threshold: options.threshold ?? 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.once])

  return [ref, visible]
}
