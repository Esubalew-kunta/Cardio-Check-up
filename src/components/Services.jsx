import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'
import { SERVICES } from '../data/site.js'

// Looping muted video strip at the top of each card. Plays (mounts the iframe)
// only while the card is on screen, on desktop, with motion allowed. On mobile
// or under reduced-motion it shows the static YouTube thumbnail instead.
function CardVideo({ id, name }) {
  const [ref, inView] = useReveal({ threshold: 0.4, once: false })
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setCanPlay(desktop && !reduce)
  }, [])

  const thumb = `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  const play = canPlay && inView

  return (
    <div ref={ref} className="relative w-full aspect-video overflow-hidden bg-burgundy-deep">
      {play ? (
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&modestbranding=1&playsinline=1&rel=0`}
          title={`Aperçu vidéo : ${name}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          aria-hidden="true"
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
