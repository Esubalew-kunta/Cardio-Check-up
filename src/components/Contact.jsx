import { useReveal } from '../hooks/useReveal.js'
import { LOCATIONS, CONTACT } from '../data/site.js'

function MetroPill({ m }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 border border-ink/10 py-1 pl-1 pr-2.5 text-xs text-ink">
      <span
        className="grid place-items-center h-5 w-5 rounded-full text-[0.7rem] font-bold leading-none"
        style={{ backgroundColor: m.color, color: m.text }}
        aria-hidden="true"
      >
        {m.line}
      </span>
      <span className="font-medium">{m.station}</span>
    </span>
  )
}

function LocationCard({ loc }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl bg-white/70 border border-gold/30 shadow-sm">
      <div className="h-44 overflow-hidden">
        <img src={loc.image} alt={loc.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col flex-1 p-7">
        <p className="text-xs font-semibold uppercase tracking-wider text-burgundy">
          {loc.tag}
        </p>
        <h3 className="mt-1 font-display text-2xl font-semibold text-ink">{loc.name}</h3>
        <p className="mt-3 text-sm text-ink/80 leading-relaxed">{loc.address}</p>
        <p className="mt-2 text-sm text-ink/70 italic">{loc.note}</p>

        {/* Metro indicators */}
        <div className="mt-4 flex flex-wrap gap-2">
          {loc.metro.map((m) => (
            <MetroPill key={m.station} m={m} />
          ))}
        </div>

        <a
          href={loc.phoneHref}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-ink hover:text-burgundy transition-colors"
        >
          <span aria-hidden="true">☎</span> {loc.phone}
        </a>
      </div>
    </article>
  )
}

export default function Contact() {
  const [ref, visible] = useReveal()

  return (
    <section id="contact" className="py-24 sm:py-32 bg-cream-soft">
      <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-6xl px-5 sm:px-8`}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — booking */}
          <div>
            <p className="font-sans text-sm tracking-[0.28em] uppercase text-burgundy mb-4">
              Contact &amp; Rendez-vous
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
              Prenez rendez-vous dès aujourd’hui
            </h2>
            <p className="mt-5 text-ink/80 leading-relaxed max-w-md">
              Réservez en ligne sur Doctolib en quelques clics, ou contactez le secrétariat
              par téléphone.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={CONTACT.doctolib}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-signal px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-signal-deep transition-colors"
              >
                Prendre rendez-vous
              </a>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-burgundy/30 px-8 py-4 text-base font-semibold text-burgundy hover:bg-burgundy hover:text-offwhite transition-colors"
              >
                {CONTACT.phone}
              </a>
            </div>

            <div className="mt-8 space-y-2 text-sm text-ink/80">
              <p>
                <span className="font-semibold text-ink">E-mail :</span>{' '}
                <a href={CONTACT.emailHref} className="hover:text-burgundy transition-colors break-all">
                  {CONTACT.email}
                </a>
              </p>
              <p>
                <span className="font-semibold text-ink">Site :</span> {CONTACT.site}
              </p>
            </div>
          </div>

          {/* Right — two locations */}
          <div className="grid sm:grid-cols-2 gap-6">
            {LOCATIONS.map((loc) => (
              <LocationCard key={loc.name} loc={loc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
