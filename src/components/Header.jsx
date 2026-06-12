import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { NAV } from '../data/site.js'
import { openBookingModal } from '../utils/bookingModal.js'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  // Sticky background transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    document.body.classList.add('menu-open')
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-burgundy/95 backdrop-blur-md border-b border-gold/30 shadow-[0_2px_20px_rgba(28,16,32,0.18)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#top" onClick={close} className="relative z-[60]">
            <Logo variant="light" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-offwhite/90 hover:text-gold transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={openBookingModal}
              className="inline-flex items-center rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-signal-deep transition-colors"
            >
              Prendre rendez-vous
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden relative z-[60] inline-flex flex-col gap-1.5 p-2"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className={`h-0.5 w-6 bg-offwhite transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 bg-offwhite transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-offwhite transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Backdrop — dark overlay over the page; clicking it closes the menu */}
      <div
        onClick={close}
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Mobile menu panel — fixed, full-height, scrollable, above everything */}
      <div
        id="mobile-menu"
        onClick={close}
        className={`lg:hidden fixed top-0 left-0 w-full h-[100dvh] z-50 overflow-y-auto bg-burgundy transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex min-h-full flex-col items-center justify-center gap-7 py-24">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={close}
              className="font-display text-3xl text-offwhite hover:text-gold transition-colors"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              close()
              openBookingModal()
            }}
            className="mt-2 inline-flex items-center rounded-full bg-signal px-7 py-3 text-base font-semibold text-white"
          >
            Prendre rendez-vous
          </button>
        </nav>
      </div>
    </header>
  )
}
