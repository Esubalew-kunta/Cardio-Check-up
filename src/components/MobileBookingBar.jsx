import { useEffect, useState } from 'react'
import { CONTACT } from '../data/site.js'
import { openBookingModal } from '../utils/bookingModal.js'

// Persistent booking CTA on mobile — appears once the user scrolls past the hero.
export default function MobileBookingBar() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`lg:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-cream/95 backdrop-blur border-t border-gold/30 transition-transform duration-300 ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex gap-3">
        <button
          type="button"
          onClick={openBookingModal}
          className="flex-1 inline-flex items-center justify-center rounded-full bg-signal px-5 py-3 text-sm font-semibold text-white"
        >
          Prendre rendez-vous
        </button>
        <a
          href={CONTACT.phoneHref}
          aria-label="Appeler le cabinet"
          className="inline-flex items-center justify-center rounded-full border border-ink/20 px-5 py-3 text-sm font-semibold text-ink"
        >
          ☎
        </a>
      </div>
    </div>
  )
}
