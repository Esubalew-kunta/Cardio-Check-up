import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo.jsx'
import { EXAM_GROUPS, CONSULTATION_GROUPS, getPathologies, CONTACT } from '../data/site.js'
import { openBookingModal } from '../utils/bookingModal.js'
import { openAiChat } from './AiChatModal.jsx'

// The care sections are consolidated under a single "Nos soins" mega-menu, so
// the top bar stays calm (Accueil · Notre Équipe · Nos soins · Actualités). FAQ
// is a homepage anchor, demoted to a secondary link (footer + mobile).
const EXAM_LINKS = EXAM_GROUPS.map((g) => ({ label: g.label, to: `/#${g.key}` }))
const CONSULT_LINKS = CONSULTATION_GROUPS.map((g) => ({ label: g.label, to: `/consultations#${g.key}` }))
const PATHO_LINKS = getPathologies().map((p) => ({ label: p.title, to: `/pathologies/${p.slug}` }))

const MEGA_ICONS = {
  heart: 'M12 21s-7.5-4.6-10-9.2C.6 8.9 2.2 5.5 5.5 5.5c1.9 0 3.3 1 4.5 2.6C11.2 6.5 12.6 5.5 14.5 5.5c3.3 0 4.9 3.4 3.5 6.3C19.5 16.4 12 21 12 21z',
  calendar: 'M3 4h18v18H3zM16 2v4M8 2v4M3 10h18',
  pulse: 'M3 12h4l2-6 4 12 2-6h6',
}

// Only these routes have a dark full-bleed hero behind the transparent header.
const DARK_HERO_ROUTES = new Set(['/', '/equipe'])

function MegaColumn({ icon, title, links, allLabel, allTo, onNavigate }) {
  return (
    <div>
      <div className="mb-4 flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-burgundy/[0.08] text-burgundy">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={MEGA_ICONS[icon]} />
          </svg>
        </span>
        <span className="font-display text-lg font-semibold text-ink">{title}</span>
      </div>
      <ul className="space-y-0.5">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} onClick={onNavigate} className="block rounded-md px-2 py-1.5 text-sm text-ink/75 transition-colors hover:bg-gold/10 hover:text-burgundy">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link to={allTo} onClick={onNavigate} className="mt-3 inline-block px-2 text-sm font-semibold text-burgundy hover:text-gold-deep transition-colors">
        {allLabel} <span aria-hidden="true">→</span>
      </Link>
    </div>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false) // mobile menu
  const [soinsOpen, setSoinsOpen] = useState(false) // desktop mega
  const [mSoins, setMSoins] = useState(false) // mobile accordion
  const megaRef = useRef(null)

  const close = () => {
    setOpen(false)
    setSoinsOpen(false)
    setMSoins(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.classList.add('menu-open')
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (!soinsOpen) return
    const onDown = (e) => {
      if (megaRef.current && !megaRef.current.contains(e.target)) setSoinsOpen(false)
    }
    const onKey = (e) => e.key === 'Escape' && setSoinsOpen(false)
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [soinsOpen])

  const { pathname } = useLocation()
  const onLight = !DARK_HERO_ROUTES.has(pathname)

  const headerBg = onLight
    ? 'bg-offwhite/95 backdrop-blur-md border-b border-gold/30 shadow-[0_2px_20px_rgba(28,16,32,0.10)]'
    : scrolled
      ? 'bg-burgundy-deep/95 backdrop-blur-md border-b border-gold/30 shadow-[0_2px_20px_rgba(28,16,32,0.18)]'
      : 'bg-transparent'

  const linkClass = `text-sm font-medium transition-colors hover:text-gold ${onLight ? 'text-burgundy' : 'text-offwhite/90'}`
  const barColor = onLight ? 'bg-burgundy' : 'bg-offwhite'

  const mega = (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr_1fr_0.95fr]">
      <MegaColumn icon="heart" title="Examens" links={EXAM_LINKS} allLabel="Voir tous les examens" allTo="/#examens" onNavigate={close} />
      <MegaColumn icon="calendar" title="Consultations" links={CONSULT_LINKS} allLabel="Toutes les consultations" allTo="/consultations" onNavigate={close} />
      <MegaColumn icon="pulse" title="Pathologies" links={PATHO_LINKS} allLabel="Toutes les pathologies" allTo="/pathologies" onNavigate={close} />
      <div className="rounded-xl bg-cream-soft/70 p-5">
        <p className="font-display text-lg font-semibold text-burgundy leading-tight">Besoin d'aide pour choisir ?</p>
        <p className="mt-2 text-sm text-ink/70 leading-relaxed">
          Notre équipe vous oriente vers le rendez-vous le plus adapté à votre situation.
        </p>
        <button
          type="button"
          onClick={() => { close(); openAiChat() }}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-signal hover:underline"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3 8.38 8.38 0 0 1 21 11.5z" />
          </svg>
          Discuter avec l'assistant →
        </button>
        <a href={CONTACT.phoneHref} onClick={close} className="mt-2.5 block text-sm font-semibold text-burgundy hover:text-gold-deep transition-colors">
          Ou appelez le {CONTACT.phone}
        </a>
      </div>
    </div>
  )

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${headerBg}`}>
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between h-14 lg:h-16">
          <Link to="/" onClick={close} className="relative z-[60]">
            <Logo variant={onLight ? 'gold' : 'light'} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className={linkClass}>Accueil</Link>
            <NavLink to="/equipe" className={({ isActive }) => `${linkClass} ${isActive ? 'text-gold' : ''}`}>
              Notre Équipe
            </NavLink>

            {/* Nos soins mega */}
            <div
              ref={megaRef}
              className="relative"
              onMouseEnter={() => setSoinsOpen(true)}
              onMouseLeave={() => setSoinsOpen(false)}
            >
              <button
                type="button"
                onClick={() => setSoinsOpen((v) => !v)}
                className={`${linkClass} inline-flex items-center gap-1`}
                aria-haspopup="true"
                aria-expanded={soinsOpen}
              >
                Nos soins
                <svg viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform duration-200 ${soinsOpen ? 'rotate-180' : ''}`} fill="none" aria-hidden="true">
                  <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {/* Panel */}
              <div className={`fixed left-1/2 top-14 lg:top-16 w-[min(64rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 transition-all duration-200 ${soinsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-1'}`}>
                <div className="rounded-2xl border border-gold/30 bg-offwhite/98 backdrop-blur-md p-7 shadow-2xl">
                  {mega}
                </div>
              </div>
            </div>

            <NavLink to="/actualites" className={({ isActive }) => `${linkClass} ${isActive ? 'text-gold' : ''}`}>
              Actualités
            </NavLink>

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
        className={`lg:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden fixed top-0 left-0 w-full h-[100dvh] z-50 overflow-y-auto bg-offwhite transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex min-h-full flex-col px-6 pt-24 pb-10">
          <nav className="flex flex-col gap-1 text-ink">
            <Link to="/" onClick={close} className="border-b border-gold/20 py-4 font-display text-2xl text-ink">Accueil</Link>
            <Link to="/equipe" onClick={close} className="border-b border-gold/20 py-4 font-display text-2xl text-ink">Notre Équipe</Link>

            <div className="border-b border-gold/20 py-4">
              <button type="button" onClick={() => setMSoins((v) => !v)} aria-expanded={mSoins} className="flex w-full items-center justify-between font-display text-2xl text-burgundy">
                Nos soins
                <svg viewBox="0 0 24 24" className={`h-5 w-5 text-gold transition-transform ${mSoins ? 'rotate-180' : ''}`} fill="none" aria-hidden="true">
                  <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className={`collapse-mh ${mSoins ? 'open' : ''}`}>
                <div className="space-y-4 pt-4">
                  <div>
                    <p className="eyebrow text-gold-deep mb-1.5">Examens</p>
                    {EXAM_LINKS.map((l) => <Link key={l.to} to={l.to} onClick={close} className="block py-1.5 text-ink/75">{l.label}</Link>)}
                    <Link to="/#examens" onClick={close} className="block py-1.5 text-sm font-semibold text-burgundy">Voir tous les examens →</Link>
                  </div>
                  <div>
                    <p className="eyebrow text-gold-deep mb-1.5">Consultations</p>
                    <Link to="/consultations" onClick={close} className="block py-1.5 text-sm font-semibold text-burgundy">Toutes les consultations →</Link>
                  </div>
                  <div>
                    <p className="eyebrow text-gold-deep mb-1.5">Pathologies</p>
                    {PATHO_LINKS.map((l) => <Link key={l.to} to={l.to} onClick={close} className="block py-1.5 text-ink/75">{l.label}</Link>)}
                    <Link to="/pathologies" onClick={close} className="block py-1.5 text-sm font-semibold text-burgundy">Toutes les pathologies →</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link to="/actualites" onClick={close} className="border-b border-gold/20 py-4 font-display text-2xl text-ink">Actualités</Link>
          </nav>

          <div className="mt-6 flex items-center gap-6 text-sm font-semibold text-muted">
            <Link to="/#faq" onClick={close} className="hover:text-burgundy">FAQ</Link>
            <button type="button" onClick={() => { close(); openAiChat() }} className="hover:text-burgundy">Assistant</button>
            <a href={CONTACT.phoneHref} onClick={close} className="hover:text-burgundy">Appeler</a>
          </div>

          <button
            type="button"
            onClick={() => { close(); openBookingModal() }}
            className="mt-auto inline-flex min-h-[3rem] items-center justify-center rounded-full bg-signal px-7 py-3 text-base font-semibold tracking-[0.03em] text-white"
          >
            Prendre rendez-vous
          </button>
        </div>
      </div>
    </header>
  )
}
