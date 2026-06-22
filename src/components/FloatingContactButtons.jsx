import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '../data/site.js'
import { openAiChat } from './AiChatModal.jsx'
import HeartPulseIcon from './HeartPulseIcon.jsx'

const TIP_TEXT = 'Je peux vous aider à trouver le bon médecin selon vos besoins.'
const TIP_KEY = 'cardio-chat-tip-dismissed'

// Speech-bubble tooltip above the chat button. Types out, holds 2s, fades, then
// repeats after 1 min of silence. First shows 10s after load. X dismisses it for
// the session. Honors reduced-motion (shows the full text without typing).
function ChatTooltip() {
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)
  const [gone, setGone] = useState(false)
  const timers = useRef([])

  useEffect(() => {
    let dismissed = false
    try {
      dismissed = sessionStorage.getItem(TIP_KEY) === '1'
    } catch {
      dismissed = false
    }
    if (dismissed) {
      setGone(true)
      return
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let alive = true
    const push = (t) => {
      timers.current.push(t)
      return t
    }

    const typeOut = (onDone) => {
      if (reduce) {
        setText(TIP_TEXT)
        onDone()
        return
      }
      let i = 0
      const tick = () => {
        if (!alive) return
        i += 1
        setText(TIP_TEXT.slice(0, i))
        if (i < TIP_TEXT.length) push(setTimeout(tick, 40))
        else onDone()
      }
      tick()
    }

    const cycle = () => {
      if (!alive) return
      setText('')
      setShow(true)
      typeOut(() => {
        // hold 30s, fade out, then replay after 5s of silence
        push(
          setTimeout(() => {
            setShow(false)
            push(setTimeout(cycle, 5000))
          }, 30000),
        )
      })
    }

    push(setTimeout(cycle, 10000))

    return () => {
      alive = false
      timers.current.forEach(clearTimeout)
      timers.current = []
    }
  }, [])

  const dismiss = () => {
    try {
      sessionStorage.setItem(TIP_KEY, '1')
    } catch {
      /* ignore */
    }
    timers.current.forEach(clearTimeout)
    timers.current = []
    setShow(false)
    setGone(true)
  }

  if (gone) return null

  return (
    <div
      className={`absolute bottom-full right-0 mb-3 w-max max-w-[220px] transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="relative rounded-[10px] border border-burgundy bg-cream px-3.5 py-2.5 pr-7 text-xs leading-snug text-ink shadow-[0_6px_20px_rgba(28,16,32,0.18)]">
        {text}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Masquer ce message"
          className="absolute top-1 right-1 grid place-items-center h-5 w-5 rounded-full text-ink/50 hover:bg-ink/10 hover:text-ink transition-colors text-[0.7rem] leading-none"
        >
          ✕
        </button>
        {/* triangle pointer toward the button below */}
        <span className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 bg-cream border-b border-r border-burgundy" />
      </div>
    </div>
  )
}

// Floating action stack, bottom-right. Chat (signal red, heart + pulse) on top
// for prominence; phone (burgundy) below.
export default function FloatingContactButtons() {
  return (
    <div className="fixed right-4 sm:right-6 bottom-24 lg:bottom-6 z-30 flex flex-col items-end gap-3">
      {/* AI assistant (top). Bob lives on a wrapper so it never fights the
          button's hover scale (both would otherwise animate `transform`). */}
      <div className="relative">
        <ChatTooltip />
        <div className="chat-bob">
          <button
            type="button"
            onClick={openAiChat}
            aria-label="Assistant Cardio Check-up"
            className="group relative grid place-items-center h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg transition-transform hover:scale-105 bg-signal"
          >
            <HeartPulseIcon color="#fff" className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-4 py-2 text-xs font-medium text-offwhite opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0">
              Quel examen me convient ? Parlez à notre assistant
            </span>
          </button>
        </div>
      </div>

      {/* Phone (bottom) */}
      <a
        href={CONTACT.phoneHref}
        aria-label="Appeler le cabinet"
        className="group relative grid place-items-center h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg transition-transform hover:scale-105 bg-burgundy"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 fill-white" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
        </svg>
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-offwhite opacity-0 transition-opacity group-hover:opacity-100">
          Appeler le cabinet
        </span>
      </a>
    </div>
  )
}
