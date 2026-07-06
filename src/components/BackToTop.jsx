import { useEffect, useState } from 'react'

// Appears once the user has scrolled roughly one viewport down; scrolls
// smoothly back to the top on click. Sits bottom-left so it never collides
// with the booking bar / chat+phone stack, which live bottom-right.
export default function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Retour en haut de page"
      className={`fixed left-4 sm:left-6 bottom-24 lg:bottom-6 z-30 grid place-items-center h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-burgundy text-offwhite shadow-lg transition-all duration-300 hover:bg-burgundy-deep hover:scale-105 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  )
}
