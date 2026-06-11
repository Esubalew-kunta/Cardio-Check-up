// Thin animated ECG / heartbeat line — the signature motif that threads
// between sections. Self-draws on a loop (paused under reduced-motion via CSS).

export default function EcgLine({ className = '', color = 'var(--color-signal)' }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="ecg-path"
          d="M0 20 H420 l14 0 8 -13 12 26 9 -33 11 33 9 -13 13 0 H760 l14 0 8 -13 12 26 9 -33 11 33 9 -13 13 0 H1200"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}
