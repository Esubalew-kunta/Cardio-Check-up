import { Link } from 'react-router-dom'
import Reveal from './Reveal.jsx'
import ArticleCard from './ArticleCard.jsx'
import { getRecentPosts } from '../data/site.js'

// Homepage strip — the 3 most recent articles, between the FAQ and the footer.
export default function BlogPreview() {
  const posts = getRecentPosts(3)
  if (posts.length === 0) return null

  return (
    <section id="actualites" className="bg-cream-soft py-24 sm:py-32 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-burgundy mb-4">Actualités</p>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-tight">
              Comprendre votre cœur, article après article
            </h2>
            <p className="mt-5 text-ink/80 leading-relaxed">
              Prévention, examens et conseils pratiques expliqués simplement par nos médecins.
            </p>
          </div>
          <Link
            to="/actualites"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-signal transition-all hover:gap-2.5"
          >
            Voir toutes les actualités <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 90}>
              <ArticleCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
