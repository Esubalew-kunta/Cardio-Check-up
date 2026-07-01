import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import Reveal from '../components/Reveal.jsx'
import ArticleCard from '../components/ArticleCard.jsx'
import { getPathologies } from '../data/site.js'

export default function Pathologies() {
  const items = getPathologies()

  return (
    <>
      <Seo
        title="Pathologies du cœur et des vaisseaux"
        description="Comprendre les principales pathologies cardiovasculaires : fibrillation atriale, syndrome d'apnée du sommeil, hypertension artérielle. Expliquées simplement par nos médecins."
        path="/pathologies"
        image="/images/consultation.jpg"
      />

      {/* Intro band */}
      <section className="bg-cream pt-28 sm:pt-32 pb-12 sm:pb-14">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Pathologies' }]} />
          <Reveal className="mt-6 max-w-2xl">
            <p className="eyebrow text-burgundy mb-4">Comprendre</p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-ink leading-[1.1]">
              Les pathologies du cœur et des vaisseaux
            </h1>
            <p className="mt-5 text-ink/75 leading-relaxed">
              Des repères clairs et fiables sur les principales maladies cardiovasculaires : ce
              qu'elles sont, comment on les dépiste et comment on les prend en charge.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-cream-soft py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 90}>
                <ArticleCard post={p} base="/pathologies" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
