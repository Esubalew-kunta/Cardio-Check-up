import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { SERVICES } from '../data/site.js'

// Minimal, on-brand video facade for each card. Nothing plays on load — no more
// five clips blaring at once. The card shows the exam title and a single
// play/pause control over the poster. The first press mounts the YouTube embed
// with its chrome stripped (no related videos, annotations, keyboard or visible
// controls); the button then toggles play/pause via the IFrame postMessage API.
function CardVideo({ id, name }) {
  const containerRef = useRef(null)
  const iframeRef = useRef(null)
  const [started, setStarted] = useState(false)
  const [playing, setPlaying] = useState(false)
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

  // Toggle native fullscreen on the card (starts the video if not yet playing).
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

      {/* Our own minimal UI — legibility gradient, title and one control */}
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

function ServiceCard({ service, index }) {
  const [ref, visible] = useReveal()
  return (
    <article
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`reveal ${visible ? 'is-visible' : ''} group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gold/30 bg-white/60 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/60 ${
        service.placeholder ? 'lg:col-span-2' : ''
      }`}
    >
      <CardVideo id={service.videoId} name={service.name} />

      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-3">
          <span className="font-display text-2xl font-semibold text-gold-deep">0{index + 1}</span>
          {service.placeholder && (
            <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-wide text-amber-700 border border-amber-300 whitespace-nowrap">
              Contenu provisoire
            </span>
          )}
        </div>

        <h3 className="mt-3 font-display text-2xl font-semibold text-ink leading-tight">
          {service.name}
        </h3>
        {service.where && (
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-burgundy">
            {service.where}
          </p>
        )}

        <p className="mt-3 text-sm font-medium text-ink/80">{service.why}</p>

        {/* Detail: always visible on mobile/tablet, hover-reveal on desktop */}
        <div className="mt-3 overflow-hidden opacity-100 max-h-48 lg:max-h-0 lg:opacity-0 transition-all duration-300 lg:group-hover:max-h-48 lg:group-hover:opacity-100 lg:group-focus-within:max-h-48 lg:group-focus-within:opacity-100">
          <p className="text-sm text-ink/75 leading-relaxed">{service.desc}</p>
          {service.symptoms && (
            <p className="mt-2 text-xs text-muted leading-relaxed">
              <span className="font-semibold text-ink/70">Signes évocateurs :</span> {service.symptoms}
            </p>
          )}
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

export default function Services() {
  return (
    <section id="examens" className="py-24 sm:py-32 bg-cream-soft scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-burgundy mb-4">Nos Examens</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
            Un dépistage cardiaque complet, en un seul lieu
          </h2>
          <p className="mt-5 text-ink/80 leading-relaxed">
            Du bilan de prévention aux examens spécialisés, chaque examen répond à un besoin
            précis.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
