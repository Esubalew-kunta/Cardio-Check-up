import { Link, useParams } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import ArticleBody from '../components/ArticleBody.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import DoctorPortrait from '../components/DoctorPortrait.jsx'
import CtaStrip from '../components/CtaStrip.jsx'
import { getPost, getDoctor, getRelatedPosts } from '../data/site.js'
import { formatFrenchDate } from '../utils/formatDate.js'
import { openBookingModal } from '../utils/bookingModal.js'
import NotFound from './NotFound.jsx'

const SITE = 'https://cardio-check-up.com'

export default function Article() {
  const { slug } = useParams()
  const post = getPost(slug)
  if (!post) return <NotFound />

  const author = getDoctor(post.author)
  const related = getRelatedPosts(post, 3)
  const path = `/actualites/${post.slug}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE}${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: 'fr-FR',
    articleSection: post.category,
    author: author
      ? {
          '@type': 'Physician',
          name: author.name,
          medicalSpecialty: 'Cardiology',
          url: `${SITE}/equipe/${author.slug}`,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Cardio Check-up',
      logo: { '@type': 'ImageObject', url: `${SITE}/images/cardio-logo.png` },
    },
    mainEntityOfPage: `${SITE}${path}`,
  }

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={path} image={post.cover} jsonLd={jsonLd} />

      {/* Header band */}
      <article>
        <header className="bg-cream pt-28 sm:pt-32 pb-10 sm:pb-12">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Breadcrumb
              items={[
                { label: 'Accueil', to: '/' },
                { label: 'Actualités', to: '/actualites' },
                { label: post.title },
              ]}
            />
            <Reveal className="mt-6">
              <p className="eyebrow text-burgundy mb-4">{post.category}</p>
              <h1 className="font-display text-4xl sm:text-5xl font-semibold text-ink leading-[1.1] text-balance">
                {post.title}
              </h1>
              <p className="mt-5 text-lg text-ink/70 leading-relaxed">{post.excerpt}</p>

              {/* Author + meta */}
              <div className="mt-7 flex items-center gap-4 border-t border-gold/25 pt-6">
                {author && (
                  <Link to={`/equipe/${author.slug}`} className="h-12 w-12 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/40">
                    <DoctorPortrait src={author.photo} alt={`Portrait du ${author.name}`} />
                  </Link>
                )}
                <div className="text-sm leading-tight">
                  {author && (
                    <Link to={`/equipe/${author.slug}`} className="font-semibold text-ink hover:text-burgundy transition-colors">
                      {author.name}
                    </Link>
                  )}
                  <p className="text-muted">
                    {author?.specialty}
                  </p>
                  <p className="mt-0.5 text-muted">
                    {formatFrenchDate(post.date)} · {post.readingMin} min de lecture
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </header>

        {/* Cover image */}
        <div className="bg-cream pb-12 sm:pb-16">
          <div className="mx-auto max-w-4xl px-5 sm:px-8">
            <Reveal className="overflow-hidden rounded-3xl shadow-lg">
              <img
                src={post.cover}
                alt={post.coverAlt || ''}
                className="aspect-[16/9] w-full object-cover"
              />
            </Reveal>
          </div>
        </div>

        {/* Body */}
        <div className="bg-cream pb-20 sm:pb-24">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <Reveal>
              <ArticleBody blocks={post.body} />
            </Reveal>

            {/* Author card */}
            {author && (
              <Reveal className="mt-16">
                <div className="flex flex-col gap-5 rounded-2xl border border-gold/30 bg-cream-soft p-7 sm:flex-row sm:items-center sm:p-8">
                  <Link to={`/equipe/${author.slug}`} className="h-20 w-20 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40">
                    <DoctorPortrait src={author.photo} alt={`Portrait du ${author.name}`} />
                  </Link>
                  <div className="flex-1">
                    <p className="eyebrow text-burgundy mb-1.5">Écrit par</p>
                    <p className="font-display text-2xl font-semibold text-ink">{author.name}</p>
                    <p className="mt-0.5 text-sm text-muted">{author.credibility || author.specialty}</p>
                  </div>
                  <Link
                    to={`/equipe/${author.slug}`}
                    className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-signal transition-all hover:gap-2.5"
                  >
                    Voir le profil <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-cream-soft py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="eyebrow text-burgundy mb-3">À lire aussi</p>
                <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink leading-tight">
                  Continuer la lecture
                </h2>
              </div>
              <Link
                to="/actualites"
                className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-signal transition-all hover:gap-2.5 sm:inline-flex"
              >
                Tous les articles <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 90}>
                  <ArticleCard post={p} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking CTA (same strip used on exam pages) */}
      <CtaStrip
        title="Prendre rendez-vous"
        subtitle="Cabinet Cardio Check-up, Paris 17 · Réponse sous 24 à 48h"
        primaryLabel="Réserver"
        onPrimary={() => openBookingModal()}
        secondary={{ label: 'Voir nos examens →', to: '/#examens' }}
      />
    </>
  )
}
