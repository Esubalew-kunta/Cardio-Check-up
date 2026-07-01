// Anatomy figure for the Doppler hub: a realistic anatomical base IMAGE with an
// animated, scroll-synced highlight over the active territory. `image` is the
// base artwork; `points[key]` is an array of {x,y} percentage positions over the
// image (a territory can highlight several spots, e.g. both legs). Each marker is
// a dot + soft glow + pulsing ring; the caption fades in on every change. All
// motion is disabled under prefers-reduced-motion (index.css).

export default function AnatomyFigure({ image, points = {}, activeKey, label }) {
  const marks = points[activeKey] || []
  return (
    <figure className="anat-in">
      <div className="relative mx-auto w-full max-w-[240px]">
        <img
          src={image}
          alt={`Schéma vasculaire : ${label}`}
          className="w-full select-none"
          draggable="false"
        />
        {marks.map((p, i) => (
          <span
            key={`${activeKey}-${i}`}
            className="pointer-events-none absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            {/* soft glow */}
            <span className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/25 blur-md" />
            {/* pulsing ring */}
            <span className="pulse-ring absolute left-1/2 top-1/2 h-5 w-5 rounded-full bg-signal/50" />
            {/* dot */}
            <span className="relative block h-3.5 w-3.5 rounded-full bg-signal ring-2 ring-white/85 shadow-md" />
          </span>
        ))}
      </div>
      <figcaption className="mt-3 text-center">
        <span className="eyebrow text-gold-deep">Territoire exploré</span>
        <p key={activeKey} className="fade-swap mt-1.5 font-display text-lg font-semibold text-ink leading-tight">
          {label}
        </p>
      </figcaption>
    </figure>
  )
}
