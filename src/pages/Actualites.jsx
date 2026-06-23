import { useMemo, useState } from 'react'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import { getPosts, POST_CATEGORIES } from '../data/site.js'

const PAGE_SIZE = 3 // grid articles shown per "load more" step (the lead is extra)

export default function Actualites() {
  const allPosts = useMemo(() => getPosts(), [])
  const [category, setCategory] = useState('Tous')
  const [shown, setShown] = useState(PAGE_SIZE)

  const filtered = useMemo(
    () => (category === 'Tous' ? allPosts : allPosts.filter((p) => p.category === category)),
    [allPosts, category],
  )

  const selectCategory = (c) => {
    setCategory(c)
    setShown(PAGE_SIZE)
  }

  const [lead, ...rest] = filtered
  const visibleRest = rest.slice(0, shown)
  const hasMore = rest.length > shown

  return (
    <>
      <Seo
        title="Actualités & conseils"
        description="Le journal du cabinet Cardio Check-up : prévention, examens du cœur, rythmologie et conseils pratiques expliqués simplement par nos médecins."
        path="/actualites"
        image="/images/hero-reception.jpg"
      />

      {/* Intro band */}
      <section className="bg-cream pt-28 sm:pt-32 pb-12 sm:pb-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Actualités' }]} />
          <Reveal className="mt-6 max-w-2xl">
            <p className="eyebrow text-burgundy mb-4">Le journal</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.1]">
              Actualités &amp; conseils du cœur
            </h1>
            <p className="mt-5 text-ink/75 leading-relaxed">
              Comprendre vos examens, prévenir les maladies cardiovasculaires, prendre soin de
              votre rythme : nos médecins partagent ici des repères clairs, fiables et sans
              jargon.
            </p>
          </Reveal>

          {/* Category filter — instant client-side, no reload */}
          <div className="mt-9 flex flex-wrap gap-2.5">
            {POST_CATEGORIES.map((c) => {
              const active = c === category
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => selectCategory(c)}
                  aria-pressed={active}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-burgundy text-offwhite'
                      : 'border border-gold/40 bg-cream text-burgundy hover:border-gold hover:bg-gold/10'
                  }`}
                >
                  {c}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Article list */}
      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          {filtered.length === 0 ? (
            <Reveal className="rounded-2xl border border-gold/30 bg-cream p-12 text-center">
              <p className="font-display text-2xl font-semibold text-ink">
                Bientôt de nouveaux articles
              </p>
              <p className="mt-2 text-ink/70">
                Cette catégorie n’a pas encore d’article publié. Revenez très vite.
              </p>
            </Reveal>
          ) : (
            <>
              {lead && (
                <Reveal className="mb-8">
                  <ArticleCard post={lead} featured />
                </Reveal>
              )}

              {visibleRest.length > 0 && (
                <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleRest.map((post, i) => (
                    <Reveal key={post.slug} delay={(i % 3) * 90}>
                      <ArticleCard post={post} />
                    </Reveal>
                  ))}
                </div>
              )}

              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShown((n) => n + PAGE_SIZE)}
                    className="inline-flex min-h-[3rem] items-center gap-2 rounded-full border border-burgundy/40 bg-cream px-7 py-3 text-sm font-semibold text-burgundy transition-colors hover:bg-burgundy hover:text-offwhite"
                  >
                    Charger plus d’articles
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
