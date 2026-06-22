import { useState } from 'react'
import { useReveal } from '../hooks/useReveal.js'

function FaqItem({ item, open, onToggle }) {
  return (
    <div
      className={`border-b border-gold/30 transition-[border,background] ${
        open ? 'border-l-2 border-l-gold bg-white/40 pl-4' : 'border-l-2 border-l-transparent'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-display text-xl sm:text-2xl font-semibold text-ink">{item.q}</span>
        <span
          className={`shrink-0 grid place-items-center h-8 w-8 rounded-full border border-burgundy/40 text-burgundy transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
          aria-hidden="true"
        >
          +
        </span>
      </button>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <div>
          <p className="pb-6 pr-4 sm:pr-12 text-ink/80 leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  )
}

// Shared accordion. Used on the homepage (global FAQ) and on exam pages
// (exam-specific FAQ). First item open by default.
export default function FaqAccordion({ items, eyebrow = 'Questions fréquentes', title }) {
  const [openIndex, setOpenIndex] = useState(0)
  const [ref, visible] = useReveal()

  if (!items?.length) return null

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''}`}>
      <div className="text-center mb-12">
        <p className="eyebrow text-burgundy mb-4">{eyebrow}</p>
        {title && (
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            {title}
          </h2>
        )}
      </div>
      <div>
        {items.map((item, i) => (
          <FaqItem
            key={i}
            item={item}
            open={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
          />
        ))}
      </div>
    </div>
  )
}
