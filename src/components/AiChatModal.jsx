import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '../data/site.js'
import HeartPulseIcon from './HeartPulseIcon.jsx'

export const AI_CHAT_EVENT = 'open-ai-chat'
export function openAiChat() {
  window.dispatchEvent(new CustomEvent(AI_CHAT_EVENT))
}

// Backend URL: Vite env var in production (Render), localhost in dev.
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || 'http://localhost:8000'

const GREETING =
  'Bonjour, je suis la secrétaire virtuelle de Cardio Check-up. ' +
  'Comment puis-je vous aider aujourd’hui ?'

const ERROR_TEXT =
  `Une erreur est survenue. Veuillez réessayer ou contacter le secrétariat au ${CONTACT.phone}.`

// Safety: any reply mentioning the emergency number / SAMU / urgence is shown
// in signal-red so it is visually unmissable.
function isUrgent(text) {
  const t = (text || '').toLowerCase()
  return t.includes('15') || t.includes('samu') || t.includes('urgence')
}

// Live RAG assistant. Replaces the former "coming soon" body. The modal shell,
// open/close, Escape and a11y wiring are preserved; only the body is the chat.
export default function AiChatModal() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }])
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)

  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  const close = () => setOpen(false)

  // Open on the floating-button event.
  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(AI_CHAT_EVENT, onOpen)
    return () => window.removeEventListener(AI_CHAT_EVENT, onOpen)
  }, [])

  // Escape to close.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Focus the input when opening.
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, open])

  // Append streamed text to the in-progress assistant bubble.
  const appendToAssistant = (delta) => {
    setMessages((prev) => {
      const copy = prev.slice()
      const last = copy[copy.length - 1]
      if (last && last.role === 'assistant') {
        copy[copy.length - 1] = { ...last, content: last.content + delta }
      }
      return copy
    })
  }

  const replaceLastAssistant = (text) => {
    setMessages((prev) => {
      const copy = prev.slice()
      const last = copy[copy.length - 1]
      if (last && last.role === 'assistant') {
        copy[copy.length - 1] = { ...last, content: text }
      }
      return copy
    })
  }

  const send = async () => {
    const text = input.trim()
    if (!text || streaming) return

    const userMsg = { role: 'user', content: text }
    // What we send to the backend: history + this user turn (no empty placeholder).
    const outgoing = [...messages, userMsg]

    setMessages([...outgoing, { role: 'assistant', content: '' }])
    setInput('')
    setStreaming(true)

    try {
      const res = await fetch(`${CHAT_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: outgoing }),
      })
      if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`)

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      // Parse the SSE stream: frames separated by a blank line, payload on `data:`.
      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })

        let sep
        while ((sep = buffer.indexOf('\n\n')) !== -1) {
          const frame = buffer.slice(0, sep)
          buffer = buffer.slice(sep + 2)

          const dataLine = frame.split('\n').find((l) => l.startsWith('data:'))
          if (!dataLine) continue
          const payload = dataLine.slice(5).trim()
          if (!payload) continue

          let evt
          try {
            evt = JSON.parse(payload)
          } catch {
            continue
          }

          if (evt.type === 'delta') {
            appendToAssistant(evt.text)
          } else if (evt.type === 'error') {
            replaceLastAssistant(evt.message || ERROR_TEXT)
          }
          // 'done' needs no action — the loop ends when the stream closes.
        }
      }
    } catch {
      replaceLastAssistant(ERROR_TEXT)
    } finally {
      setStreaming(false)
      inputRef.current?.focus()
    }
  }

  const onInputKeyDown = (e) => {
    // Enter sends; Shift+Enter inserts a newline.
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  if (!open) return null

  return (
    <>
      {/* Dim overlay on mobile only (the desktop popover floats). */}
      <div
        className="sm:hidden fixed inset-0 z-[105] bg-black/40"
        onClick={close}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-chat-title"
        className="fixed z-[110] inset-x-0 bottom-0 flex max-h-[85vh] flex-col rounded-t-2xl bg-offwhite shadow-2xl
                   sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px] sm:h-[560px] sm:max-h-[78vh] sm:rounded-2xl"
      >
        {/* Header (navy) */}
        <div className="flex items-center gap-3 rounded-t-2xl bg-ink px-4 py-3">
          <span className="grid place-items-center h-9 w-9 shrink-0 rounded-full bg-signal/20">
            <HeartPulseIcon color="#fff" className="h-5 w-5" />
          </span>
          <h2
            id="ai-chat-title"
            className="font-display text-base font-semibold leading-tight text-offwhite"
          >
            Secrétaire virtuelle Cardio Check-up
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="ml-auto grid place-items-center h-8 w-8 rounded-full text-offwhite/70 hover:bg-white/10 hover:text-offwhite transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
          aria-live="polite"
        >
          {messages.map((m, i) => {
            const isUser = m.role === 'user'
            const urgent = !isUser && isUrgent(m.content)
            const base =
              'max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words'
            const style = isUser
              ? 'ml-auto bg-burgundy text-offwhite'
              : urgent
                ? 'mr-auto bg-signal text-white font-medium'
                : 'mr-auto bg-white text-ink border border-ink/10'

            // Typing indicator: last assistant bubble, empty, while streaming.
            const isTyping =
              !isUser && streaming && m.content === '' && i === messages.length - 1

            return (
              <div key={i} className={`${base} ${style}`}>
                {isTyping ? (
                  <span className="inline-flex gap-1" aria-label="L'assistant écrit">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40 [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40" />
                  </span>
                ) : (
                  m.content
                )}
              </div>
            )
          })}
        </div>

        {/* Input */}
        <div className="border-t border-ink/10 bg-offwhite p-3">
          <div className="flex items-end gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onInputKeyDown}
              rows={1}
              placeholder="Écrivez votre message…"
              aria-label="Votre message"
              className="flex-1 resize-none rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink/40 focus:border-signal focus:outline-none focus:ring-1 focus:ring-signal max-h-28"
            />
            <button
              type="button"
              onClick={send}
              disabled={streaming || !input.trim()}
              aria-label="Envoyer"
              className="grid place-items-center h-10 w-10 shrink-0 rounded-full bg-signal text-white transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a1 1 0 0 0-1.39 1.2L4 11l9 1-9 1-1.99 6.2a1 1 0 0 0 1.39 1.2z" />
              </svg>
            </button>
          </div>
          <p className="mt-2 px-1 text-[0.68rem] leading-snug text-ink/45">
            En cas d{'’'}urgence vitale, appelez le 15 (SAMU). Cet assistant ne remplace pas un avis médical.
          </p>
        </div>
      </div>
    </>
  )
}
