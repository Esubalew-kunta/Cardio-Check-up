import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { SERVICES, EXAM_GROUPS } from '../data/site.js'

// Line glyphs per exam family (used in group headers + soft posters).
const GROUP_ICONS = {
  heart: 'M12 21s-7.5-4.6-10-9.2C.6 8.9 2.2 5.5 5.5 5.5c1.9 0 3.3 1 4.5 2.6C11.2 6.5 12.6 5.5 14.5 5.5c3.3 0 4.9 3.4 3.5 6.3C19.5 16.4 12 21 12 21z',
  clock: 'M12 7v5l3 2M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18z',
  vessel: 'M3 12h4l2-6 4 12 2-6h6',
}

// Soft, on-brand poster shown when an exam has no explainer video yet. A faint
// family glyph behind a burgundy play affordance — swaps to the real video
// automatically once a `videoId` is supplied.
function CardPoster({ icon }) {
  return (
    <div className="relative w-full aspect-video overflow-hidden bg-gradient-to-br from-cream to-cream-soft">
      <svg
        viewBox="0 0 24 24"
        className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-burgundy/10"
        fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
      >
        <path d={GROUP_ICONS[icon] || GROUP_ICONS.heart} />
      </svg>
      <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-burgundy text-offwhite shadow-md">
        <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-0.5 fill-current" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </div>
  )
}

// Minimal, on-brand video facade. Nothing plays on load. The first press mounts
// the YouTube embed with its chrome stripped; the button then toggles play/pause
// via the IFrame postMessage API. When no videoId exists, a soft poster is shown.
function CardVideo({ id, name, icon }) {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
  if (!id) return <CardPoster icon={icon} />
  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`

  const command = (func) =>
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: [] }),
      '*',
    )

  const toggle = () => {
    if (!started) {
      setStarted(true)
      setPlaying(true)
      return
    }
    if (playing) {
      command('pauseVideo')
      setPlaying(false)
    } else {
      command('playVideo')
      setPlaying(true)
    }
  }

  const toggleFullscreen = () => {
    const el = containerRef.current
    if (!el) return
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement
    if (fsEl === el) {
      const exit = document.exitFullscreen || document.webkitExitFullscreen
      exit?.call(document)
      return
    }
    if (!started) {
      setStarted(true)
      setPlaying(true)
    }
    const req = el.requestFullscreen || el.webkitRequestFullscreen || el.msRequestFullscreen
    req?.call(el)
  }

  return (
    <div ref={containerRef} className="relative w-full aspect-video overflow-hidden bg-burgundy-deep">
      {started ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&enablejsapi=1&controls=0&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3&fs=1&disablekb=1&vq=hd720`}
          title={`Vidéo : ${name}`}
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          className="pointer-events-none absolute inset-0 h-full w-full"
        />
      ) : (
        <img
          src={thumb}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-burgundy-deep/85 via-burgundy-deep/10 to-transparent" />
      <span className="pointer-events-none absolute bottom-4 left-4 right-28 text-sm font-medium text-offwhite/95 line-clamp-1 drop-shadow">
        {name}
      </span>
      <div className="absolute bottom-3 right-3 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={`Plein écran : ${name}`}
          className="grid h-10 w-10 place-items-center rounded-full bg-burgundy-deep/70 text-offwhite shadow-md backdrop-blur-sm transition-colors duration-200 hover:bg-burgundy-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
          </svg>
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Mettre en pause : ${name}` : `Lire la vidéo : ${name}`}
          className="grid h-11 w-11 place-items-center rounded-full bg-gold text-burgundy-deep shadow-md transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          {playing ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" />
              <rect x="14" y="5" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-0.5 fill-current" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

function ServiceCard({ service, index, groupIcon }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/30 bg-white/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/60`}
    >
      <CardVideo id={service.videoId} name={service.name} icon={groupIcon} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <span className="font-display text-xl font-semibold text-gold-deep">0{index + 1}</span>
          {service.placeholder && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-amber-700 border border-amber-300 whitespace-nowrap">
              Contenu provisoire
            </span>
          )}
        </div>

        <h3 className="mt-2 font-display text-xl font-semibold text-ink leading-tight">
          {service.name}
        </h3>
        {service.where && (
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-burgundy">
            {service.where}
          </p>
        )}

        <p className="mt-2 text-sm font-medium text-ink/80">{service.why}</p>

        {/* Detail: always visible on mobile/tablet, hover-reveal on desktop */}
        <div className="mt-2 overflow-hidden opacity-100 max-h-48 lg:max-h-0 lg:opacity-0 transition-all duration-300 lg:group-hover:max-h-48 lg:group-hover:opacity-100 lg:group-focus-within:max-h-48 lg:group-focus-within:opacity-100">
          <p className="text-sm text-ink/75 leading-relaxed">{service.desc}</p>
        </div>

        <Link
          to={`/examens/${service.id}`}
          className="mt-auto pt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-signal hover:gap-2.5 transition-all"
        >
          Découvrir cet examen
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}

function GroupHeader({ group, count }) {
  return (
    <div>
      <h3 className="font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
        {group.label}
      </h3>
      <div className="mt-2 flex items-center gap-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-gold/50 text-burgundy">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d={GROUP_ICONS[group.icon]} />
          </svg>
        </span>
        <span className="eyebrow text-gold-deep">
          {count} examen{count > 1 ? 's' : ''}
        </span>
      </div>
      <p className="mt-3 max-w-xl text-ink/70 leading-relaxed">{group.desc}</p>
    </div>
  )
}

export default function Services() {
  return (
    <section id="examens" className="py-24 sm:py-32 bg-cream-soft scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Centered intro + jump nav */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-burgundy">Nos Examens</p>
          <span className="mx-auto mt-3 block h-px w-12 bg-gold" aria-hidden="true" />
          <h2 className="mt-5 font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            Le bon examen, pour chaque situation
          </h2>
          <p className="mt-5 text-ink/80 leading-relaxed">
            Nos examens, répartis en trois grands domaines, du dépistage au suivi le plus
            spécialisé.
          </p>
          <nav className="mt-7 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-sm">
            <span className="text-muted">Aller à :</span>
            {EXAM_GROUPS.map((g, i) => (
              <span key={g.key} className="flex items-center gap-2.5">
                <a
                  href={`#${g.key}`}
                  className="font-semibold text-burgundy border-b border-burgundy/30 pb-0.5 hover:border-burgundy transition-colors"
                >
                  {g.label}
                </a>
                {i < EXAM_GROUPS.length - 1 && <span className="text-gold" aria-hidden="true">·</span>}
              </span>
            ))}
          </nav>
        </div>

        {/* One block per group */}
        {EXAM_GROUPS.map((group, gi) => {
          // 'epreuve-effort' (Épreuve d'effort / stress test) is hidden from this
          // overview grid at the client's request; its detail page still exists.
          const items = SERVICES.filter((s) => s.group === group.key && s.id !== 'epreuve-effort')
          if (!items.length) return null
          return (
            <div
              key={group.key}
              id={group.key}
              className={`scroll-mt-24 ${gi === 0 ? 'mt-16' : 'mt-12 border-t border-gold/30 pt-12'}`}
            >
              <GroupHeader group={group} count={items.length} />
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                {items.map((service, i) => (
                  <ServiceCard key={service.id} service={service} index={i} groupIcon={group.icon} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
