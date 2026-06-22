import { useReveal } from '../hooks/useReveal.js'

// Shared scroll-reveal wrapper — the site's standard entrance animation
// (IntersectionObserver + the .reveal/.is-visible CSS, reduced-motion safe).
// `delay` staggers grids; `as` lets callers reveal a semantic element.
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
