// Renders an article's ordered content blocks (see POSTS in site.js for the
// block schema). Each type gets deliberate editorial typography and vertical
// rhythm so a long medical read stays calm and effortless to scan.

function TipBox({ title, text, tone }) {
  const urgent = tone === 'urgent'
  return (
    <aside
      className={`my-9 rounded-2xl border-l-4 p-6 sm:p-7 ${
        urgent ? 'border-signal bg-signal/[0.06]' : 'border-gold bg-cream-soft'
      }`}
    >
      <div className="flex items-start gap-3.5">
        <span
          className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
            urgent ? 'bg-signal/15 text-signal' : 'bg-burgundy/10 text-burgundy'
          }`}
          aria-hidden="true"
        >
          {urgent ? (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 16v-4M12 8h.01" />
              <circle cx="12" cy="12" r="9" />
            </svg>
          )}
        </span>
        <div>
          {title && (
            <p className={`font-display text-lg font-semibold ${urgent ? 'text-signal-deep' : 'text-burgundy'}`}>
              {title}
            </p>
          )}
          <p className="mt-1 text-ink/80 leading-relaxed">{text}</p>
        </div>
      </div>
    </aside>
  )
}

function Block({ block }) {
  switch (block.type) {
    case 'p':
      return <p className="mt-6 text-[1.0625rem] leading-[1.85] text-ink/85">{block.text}</p>

    case 'h2':
      return (
        <h2 className="mt-12 mb-1 font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight scroll-mt-24">
          {block.text}
        </h2>
      )

    case 'h3':
      return (
        <h3 className="mt-9 mb-1 font-display text-2xl font-semibold text-burgundy leading-snug">
          {block.text}
        </h3>
      )

    case 'quote':
      return (
        <figure className="my-10 border-l-4 border-gold pl-6 sm:pl-8">
          <blockquote className="font-display text-2xl sm:text-[1.75rem] italic leading-relaxed text-ink/85">
            “{block.text}”
          </blockquote>
          {block.cite && (
            <figcaption className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-gold-deep">
              {block.cite}
            </figcaption>
          )}
        </figure>
      )

    case 'list':
      return (
        <ul className="mt-6 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3.5 text-[1.0625rem] leading-relaxed text-ink/85">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'tip':
      return <TipBox title={block.title} text={block.text} tone={block.tone} />

    case 'image':
      return (
        <figure className="my-10">
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <img src={block.src} alt={block.alt || ''} loading="lazy" className="w-full object-cover" />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">{block.caption}</figcaption>
          )}
        </figure>
      )

    case 'video':
      return (
        <figure className="my-10">
          <div className="aspect-video overflow-hidden rounded-2xl shadow-lg">
            <iframe
              src={`https://www.youtube.com/embed/${block.videoId}`}
              title={block.caption || 'Vidéo explicative'}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-center text-sm text-muted">{block.caption}</figcaption>
          )}
        </figure>
      )

    default:
      return null
  }
}

export default function ArticleBody({ blocks }) {
  if (!blocks?.length) return null
  return (
    <div className="article-body">
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </div>
  )
}
