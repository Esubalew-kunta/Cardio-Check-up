import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// React Router does not restore scroll on navigation. On every route change we
// jump to the top — unless the URL carries a hash, in which case we scroll to
// that element (used for homepage anchors like /#examens and /#faq).
export default function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = reduce ? 'auto' : 'smooth'

    if (hash) {
      // Wait a tick so the target section is mounted before scrolling.
      const id = hash.replace('#', '')
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior, block: 'start' })
        else window.scrollTo({ top: 0, behavior: 'auto' })
      })
      return
    }

    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
