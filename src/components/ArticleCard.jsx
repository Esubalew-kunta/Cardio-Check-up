import { Link } from 'react-router-dom'
import DoctorPortrait from './DoctorPortrait.jsx'
import { getDoctor } from '../data/site.js'
import { formatFrenchDate } from '../utils/formatDate.js'

// Small author + date + reading-time byline, shared by both card variants.
function Byline({ author, date, readingMin, tone = 'light' }) {
  const sub = tone === 'dark' ? 'text-offwhite/60' : 'text-muted'
  const name = tone === 'dark' ? 'text-offwhite' : 'text-ink'
  return (
    <div className="flex items-center gap-3">
      {author && (
        <span className="h-9 w-9 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/30">
          <DoctorPortrait src={author.photo} alt={`Portrait du ${author.name}`} />
        </span>
      )}
      <div className="min-w-0 text-xs leading-tight">
        {author && <p className={`font-semibold ${name}`}>{author.name}</p>}
        <p className={sub}>
          {formatFrenchDate(date)} · {readingMin} min de lecture
        </p>
      </div>
    </div>
  )
}

function CategoryPill({ category }) {
  return (
    <span className="inline-flex items-center rounded-full bg-gold/95 px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-burgundy-deep shadow-sm">
      {category}
    </span>
  )
}

// Editorial article card. `featured` renders a large horizontal split (image +
// text) for the lead story; the default is a vertical card for grids.
export default function ArticleCard({ post, featured = false }) {
  const author = getDoctor(post.author)
  const to = `/actualites/${post.slug}`

  if (featured) {
    return (
      <article className="group overflow-hidden rounded-3xl border border-gold/30 bg-cream shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/60">
        <div className="grid lg:grid-cols-2">
          <Link to={to} className="relative block aspect-[16/11] overflow-hidden lg:aspect-auto lg:min-h-[22rem]" aria-label={post.title}>
            <img
              src={post.cover}
              alt={post.coverAlt || ''}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute left-4 top-4">
              <CategoryPill category={post.category} />
            </span>
          </Link>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="eyebrow text-burgundy mb-3">À la une</p>
            <h3 className="font-display text-3xl sm:text-4xl font-semibold text-ink leading-[1.12]">
              <Link to={to} className="transition-colors hover:text-burgundy">
                {post.title}
              </Link>
            </h3>
            <p className="mt-4 text-ink/75 leading-relaxed line-clamp-3">{post.excerpt}</p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <Byline author={author} date={post.date} readingMin={post.readingMin} />
              <Link
                to={to}
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-signal transition-all hover:gap-2.5"
              >
                Lire <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gold/30 bg-cream shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/60">
      <Link to={to} className="relative block aspect-[16/10] overflow-hidden" aria-label={post.title}>
        <img
          src={post.cover}
          alt={post.coverAlt || ''}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3">
          <CategoryPill category={post.category} />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl font-semibold text-ink leading-tight">
          <Link to={to} className="transition-colors hover:text-burgundy">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2.5 text-sm text-ink/70 leading-relaxed line-clamp-2">{post.excerpt}</p>
        <div className="mt-5 flex-1" />
        <div className="border-t border-gold/20 pt-4">
          <Byline author={author} date={post.date} readingMin={post.readingMin} />
        </div>
      </div>
    </article>
  )
}
