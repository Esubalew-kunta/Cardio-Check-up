import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { NAV, SERVICES } from '../data/site.js'
import { openBookingModal } from '../utils/bookingModal.js'

const EXAM_LINKS = SERVICES.map((s) => ({ label: s.name, to: `/examens/${s.id}` }))

// Only these routes have a dark full-bleed hero behind the transparent header.
// Everywhere else the page starts on a light (cream) background, so the header
// must use a light theme (burgundy links) to stay readable.
const DARK_HERO_ROUTES = new Set(['/', '/equipe'])

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false) // mobile menu
  const [examsOpen, setExamsOpen] = useState(false) // desktop dropdown
  const [mobileExamsOpen, setMobileExamsOpen] = useState(false) // mobile accordion
  const dropdownRef = useRef(null)

  const close = () => {
    setOpen(false)
    setExamsOpen(false)
    setMobileExamsOpen(false)
  }

  // Sticky background transition after 24px.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + close on Escape while the mobile menu is open.
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

  // Desktop dropdown: close on outside click and on Escape.
  useEffect(() => {
    if (!examsOpen) return
    const onDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setExamsOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setExamsOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [examsOpen])

  const { pathname } = useLocation()
  const darkHero = DARK_HERO_ROUTES.has(pathname)
  // Light theme = burgundy links on a solid cream header. Dark theme = off-white
  // links over the dark hero / scrolled burgundy header.
  const onLight = !darkHero

  const headerBg = onLight
    ? 'bg-offwhite/95 backdrop-blur-md border-b border-gold/30 shadow-[0_2px_20px_rgba(28,16,32,0.10)]'
    : scrolled
      ? 'bg-burgundy-deep/95 backdrop-blur-md border-b border-gold/30 shadow-[0_2px_20px_rgba(28,16,32,0.18)]'
      : 'bg-transparent'

  const linkClass = `text-sm font-medium transition-colors hover:text-gold ${
    onLight ? 'text-burgundy' : 'text-offwhite/90'
  }`
  const barColor = onLight ? 'bg-burgundy' : 'bg-offwhite'

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <Link to="/" onClick={close} className="relative z-[60]">
            <Logo variant={onLight ? 'gold' : 'light'} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV.map((item) =>
              item.dropdown === 'exams' ? (
                <div
                  key={item.to}
                  ref={dropdownRef}
                  className="relative"
                  onMouseEnter={() => setExamsOpen(true)}
                  onMouseLeave={() => setExamsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setExamsOpen((v) => !v)}
                    className={`${linkClass} inline-flex items-center gap-1`}
                    aria-haspopup="true"
                    aria-expanded={examsOpen}
                  >
                    {item.label}
                    <svg
                      viewBox="0 0 24 24"
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${examsOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 transition-all duration-200 ${
                      examsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'
                    }`}
                  >
                    <ul className="min-w-[16rem] rounded-xl border border-gold/30 bg-burgundy-deep/98 backdrop-blur-md p-2 shadow-xl">
                      {EXAM_LINKS.map((ex) => (
                        <li key={ex.to}>
                          <Link
                            to={ex.to}
                            onClick={close}
                            className="block rounded-lg px-3 py-2 text-sm text-offwhite/85 hover:bg-burgundy hover:text-gold transition-colors"
                          >
                            {ex.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : item.to.startsWith('/#') ? (
                <Link key={item.to} to={item.to} className={linkClass}>
                  {item.label}
                </Link>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => `${linkClass} ${isActive ? 'text-gold' : ''}`}
                >
                  {item.label}
                </NavLink>
              ),
            )}
            <button
              type="button"
              onClick={openBookingModal}
              className="inline-flex min-h-[2.75rem] items-center rounded-full bg-signal px-5 py-2.5 text-sm font-semibold tracking-[0.03em] text-white shadow-sm hover:bg-signal-deep transition-colors"
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
            <span className={`h-0.5 w-6 transition-transform ${open ? 'translate-y-2 rotate-45 bg-offwhite' : barColor}`} />
            <span className={`h-0.5 w-6 transition-opacity ${open ? 'opacity-0 bg-offwhite' : barColor}`} />
            <span className={`h-0.5 w-6 transition-transform ${open ? '-translate-y-2 -rotate-45 bg-offwhite' : barColor}`} />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        onClick={close}
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 left-0 w-full h-[100dvh] z-50 overflow-y-auto bg-burgundy transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav className="flex min-h-full flex-col items-center justify-center gap-6 py-24 px-6">
          {NAV.map((item) =>
            item.dropdown === 'exams' ? (
              <div key={item.to} className="flex w-full flex-col items-center">
                <button
                  type="button"
                  onClick={() => setMobileExamsOpen((v) => !v)}
                  aria-expanded={mobileExamsOpen}
                  className="inline-flex items-center gap-2 font-display text-3xl text-offwhite hover:text-gold transition-colors"
                >
                  {item.label}
                  <svg
                    viewBox="0 0 24 24"
                    className={`h-6 w-6 text-gold transition-transform duration-300 ${mobileExamsOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <div className={`collapse-mh w-full ${mobileExamsOpen ? 'open' : ''}`}>
                  <ul className="flex flex-col items-center gap-3 pt-4">
                    {EXAM_LINKS.map((ex) => (
                      <li key={ex.to}>
                        <Link
                          to={ex.to}
                          onClick={close}
                          className="text-base text-offwhite/75 hover:text-gold transition-colors"
                        >
                          {ex.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link
                key={item.to}
                to={item.to}
                onClick={close}
                className="font-display text-3xl text-offwhite hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ),
          )}
          <button
            type="button"
            onClick={() => {
              close()
              openBookingModal()
            }}
            className="mt-2 inline-flex min-h-[3rem] items-center rounded-full bg-signal px-7 py-3 text-base font-semibold tracking-[0.03em] text-white"
          >
            Prendre rendez-vous
          </button>
        </nav>
      </div>
    </header>
  )
}
