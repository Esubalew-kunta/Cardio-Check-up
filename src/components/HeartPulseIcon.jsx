// Heart outline with an ECG pulse line through it — the brand-appropriate mark
// for the assistant. Hand-coded SVG; `color` sets both strokes.
export default function HeartPulseIcon({ color = '#fff', className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 20.3 4.6 12.9a4.6 4.6 0 0 1 6.5-6.5l.9.9.9-.9a4.6 4.6 0 0 1 6.5 6.5L12 20.3Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M6.4 13h2.2l1-2.1 1.7 4.4 1.1-2.3h3.2"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
