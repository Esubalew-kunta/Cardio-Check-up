import { useEffect, useState } from 'react'
import HeartPulseIcon from './HeartPulseIcon.jsx'

export const AI_CHAT_EVENT = 'open-ai-chat'
export function openAiChat() {
  window.dispatchEvent(new CustomEvent(AI_CHAT_EVENT))
}

// Informational holding modal for the future assistant. Separate from the
// booking modal. The body is the only part to swap when the live assistant
// ships — the shell, open/close and a11y wiring stay.
export default function AiChatModal() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(AI_CHAT_EVENT, onOpen)
    return () => window.removeEventListener(AI_CHAT_EVENT, onOpen)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50" onClick={close} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-chat-title"
        className="relative w-full max-w-sm rounded-2xl bg-offwhite p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Fermer"
          className="absolute top-3 right-3 grid place-items-center h-9 w-9 rounded-full text-ink/60 hover:bg-ink/5 hover:text-ink transition-colors"
        >
          ✕
        </button>

        {/* Header: icon + title */}
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-11 w-11 shrink-0 rounded-full bg-signal/10">
            <HeartPulseIcon color="var(--color-signal)" className="h-6 w-6" />
          </span>
          <h2 id="ai-chat-title" className="font-display text-2xl font-semibold text-ink leading-tight">
            Assistant Cardio Check-up
          </h2>
        </div>

        <p className="mt-4 text-sm text-ink/75 leading-relaxed">
          Je vous aide à trouver l'examen ou le médecin qui vous convient, selon ce que vous
          ressentez. Posez votre question et je vous oriente vers le bon spécialiste.
        </p>

        <p className="mt-6 text-center font-display text-xl font-semibold tracking-[0.04em] text-gold-deep">
          Bientôt disponible
        </p>
      </div>
    </div>
  )
}
