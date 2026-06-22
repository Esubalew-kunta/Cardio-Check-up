import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { CONTACT } from '../data/site.js'

export default function NotFound() {
  return (
    <>
      <Seo title="Page introuvable" description="La page demandée n'existe pas." path="/404" />
      <section className="min-h-[70vh] grid place-items-center bg-cream pt-28 pb-20">
        <div className="mx-auto max-w-xl px-5 sm:px-8 text-center">
          <p className="font-display text-7xl sm:text-8xl font-semibold text-gold-deep">404</p>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-ink">
            Cette page est introuvable
          </h1>
          <p className="mt-4 text-ink/70 leading-relaxed">
            Le lien est peut-être erroné ou la page a été déplacée. Revenez à l'accueil ou
            appelez-nous au{' '}
            <a href={CONTACT.phoneHref} className="font-semibold text-burgundy hover:text-burgundy-deep">
              {CONTACT.phone}
            </a>
            .
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-burgundy px-7 py-3 text-sm font-semibold text-offwhite hover:bg-burgundy-deep transition-colors"
            >
              Retour à l'accueil
            </Link>
            <Link
              to="/equipe"
              className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-burgundy/30 px-7 py-3 text-sm font-semibold text-burgundy hover:bg-burgundy/5 transition-colors"
            >
              Voir notre équipe
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
