import { useEffect, useState } from 'react'
import { CONTACT, LOCATIONS, SERVICES, WEBHOOK_URL } from '../data/site.js'
import { BOOKING_MODAL_EVENT } from '../utils/bookingModal.js'

const MOTIFS = [...SERVICES.map((s) => s.name), 'Autre']

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  reason: '',
  message: '',
  consent: false,
  company: '', // honeypot — must stay empty; bots tend to fill it
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[\d\s().+-]{6,}$/

export default function BookingModal() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const close = () => {
    setOpen(false)
    setStatus('idle')
    setErrors({})
  }

  useEffect(() => {
    const onOpen = (e) => {
      const prefill = e?.detail || {}
      setForm({ ...EMPTY_FORM, ...prefill })
      setErrors({})
      setStatus('idle')
      setOpen(true)
    }
    window.addEventListener(BOOKING_MODAL_EVENT, onOpen)
    return () => window.removeEventListener(BOOKING_MODAL_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.classList.add('modal-open')
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('modal-open')
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  const updateChecked = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.checked }))

  const validate = () => {
    const next = {}
    if (!form.firstName.trim()) next.firstName = 'Champ requis'
    if (!form.lastName.trim()) next.lastName = 'Champ requis'
    if (!form.email.trim()) next.email = 'Champ requis'
    else if (!EMAIL_RE.test(form.email.trim())) next.email = 'E-mail invalide'
    if (!form.phone.trim()) next.phone = 'Champ requis'
    else if (!PHONE_RE.test(form.phone.trim())) next.phone = 'Numéro invalide'
    if (!form.location) next.location = 'Champ requis'
    if (!form.reason) next.reason = 'Champ requis'
    if (!form.consent) next.consent = 'Votre consentement est requis pour traiter votre demande'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    // Honeypot: a filled hidden field means a bot. Pretend success silently.
    if (form.company.trim()) {
      setStatus('success')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          location: form.location,
          reason: form.reason,
          message: form.message.trim(),
          consent: form.consent,
          company: form.company, // honeypot, checked server-side in n8n
          submitted_at: new Date().toISOString(),
          source: 'website',
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={close} aria-hidden="true" />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-offwhite p-6 sm:p-8 shadow-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fermer"
          className="absolute top-4 right-4 grid place-items-center h-9 w-9 rounded-full text-ink/60 hover:bg-ink/5 hover:text-ink transition-colors"
        >
          ✕
        </button>

        {status !== 'success' && (
          <h2 id="booking-modal-title" className="font-display text-2xl sm:text-3xl font-semibold text-ink text-center px-10">
            Demande de rendez-vous
          </h2>
        )}

        {status === 'success' ? (
          <div className="py-6 flex flex-col items-center text-center">
            <div className="grid place-items-center h-16 w-16 rounded-full bg-burgundy/10">
              <svg viewBox="0 0 24 24" className="h-8 w-8 text-burgundy" fill="none" aria-hidden="true">
                <path
                  d="M5 13l4 4L19 7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 id="booking-modal-title" className="mt-5 font-display text-2xl sm:text-3xl font-semibold text-ink">
              Demande envoyée !
            </h2>
            <p className="mt-3 text-ink/70 leading-relaxed max-w-sm">
              Merci ! Votre demande a été envoyée. Notre équipe vous contactera très vite pour
              confirmer votre rendez-vous.
            </p>
            <button
              type="button"
              onClick={close}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-burgundy px-8 py-3 text-sm font-semibold text-offwhite hover:bg-burgundy-deep transition-colors"
            >
              Fermer
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-ink/80 mb-1.5">
                  Prénom
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="Jean"
                  value={form.firstName}
                  onChange={update('firstName')}
                  className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                />
                {errors.firstName && <p className="mt-1 text-xs text-signal">{errors.firstName}</p>}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-ink/80 mb-1.5">
                  Nom
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Dupont"
                  value={form.lastName}
                  onChange={update('lastName')}
                  className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-burgundy/40"
                />
                {errors.lastName && <p className="mt-1 text-xs text-signal">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-ink/80 mb-1.5">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="jean.dupont@email.com"
                value={form.email}
                onChange={update('email')}
                className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              />
              {errors.email && <p className="mt-1 text-xs text-signal">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-ink/80 mb-1.5">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={form.phone}
                onChange={update('phone')}
                className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              />
              {errors.phone && <p className="mt-1 text-xs text-signal">{errors.phone}</p>}
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-ink/80 mb-1.5">
                Lieu souhaité
              </label>
              <select
                id="location"
                value={form.location}
                onChange={update('location')}
                className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              >
                <option value="">Sélectionnez un lieu</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc.name} value={loc.name}>
                    {loc.name} ({loc.tag})
                  </option>
                ))}
              </select>
              {errors.location && <p className="mt-1 text-xs text-signal">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-ink/80 mb-1.5">
                Motif de la consultation
              </label>
              <select
                id="reason"
                value={form.reason}
                onChange={update('reason')}
                className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              >
                <option value="">Sélectionnez un motif</option>
                {MOTIFS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              {errors.reason && <p className="mt-1 text-xs text-signal">{errors.reason}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-ink/80 mb-1.5">
                Message (facultatif)
              </label>
              <textarea
                id="message"
                rows={3}
                placeholder="Précisez ici toute information utile (antécédents, disponibilités, etc.)"
                value={form.message}
                onChange={update('message')}
                className="w-full rounded-lg border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-burgundy/40"
              />
            </div>

            {/* Honeypot — visually hidden, off-screen, not announced */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
              <label htmlFor="company">Ne pas remplir</label>
              <input
                id="company"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={update('company')}
              />
            </div>

            {/* RGPD consent */}
            <div>
              <label htmlFor="consent" className="flex items-start gap-2.5 text-xs text-ink/70 leading-relaxed cursor-pointer">
                <input
                  id="consent"
                  type="checkbox"
                  checked={form.consent}
                  onChange={updateChecked('consent')}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/30 text-burgundy focus:ring-burgundy/40"
                />
                <span>
                  J'accepte que les informations transmises soient utilisées par le cabinet Cardio
                  Check-up pour traiter ma demande de rendez-vous, conformément à la{' '}
                  <a href="/confidentialite" target="_blank" rel="noopener noreferrer" className="font-semibold text-burgundy underline underline-offset-2 hover:text-burgundy-deep">
                    politique de confidentialité
                  </a>
                  .
                </span>
              </label>
              {errors.consent && <p className="mt-1 text-xs text-signal">{errors.consent}</p>}
            </div>

            {status === 'error' && (
              <p className="text-sm text-signal">
                Une erreur est survenue. Merci de réessayer ou de nous appeler au {CONTACT.phone}.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full inline-flex min-h-[3rem] items-center justify-center rounded-full bg-signal px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-signal-deep transition-colors disabled:opacity-60"
            >
              {status === 'loading' ? 'Envoi en cours...' : 'Envoyer ma demande'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
