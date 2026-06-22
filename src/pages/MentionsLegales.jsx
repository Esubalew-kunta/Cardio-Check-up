import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import { CONTACT, LOCATIONS } from '../data/site.js'

function Block({ title, children }) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-2 text-ink/80 leading-relaxed">{children}</div>
    </div>
  )
}

export default function MentionsLegales() {
  return (
    <>
      <Seo title="Mentions légales" description="Mentions légales du cabinet Cardio Check-up." path="/mentions-legales" />
      <article className="bg-cream pt-28 sm:pt-32 pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Mentions légales' }]} />
          <h1 className="mt-6 font-display text-4xl sm:text-5xl font-semibold text-ink">Mentions légales</h1>
          <p className="mt-4 text-sm text-muted">
            Contenu à valider par le cabinet avant la mise en ligne (placeholder).
          </p>

          <Block title="Éditeur du site">
            <p>Cabinet Cardio Check-up · Dr Sana Amraoui</p>
            <p>{LOCATIONS[0].address}</p>
            <p>
              Téléphone :{' '}
              <a href={CONTACT.phoneHref} className="text-burgundy hover:underline">{CONTACT.phone}</a>
            </p>
            <p>
              E-mail :{' '}
              <a href={CONTACT.emailHref} className="text-burgundy hover:underline break-all">{CONTACT.email}</a>
            </p>
            <p>Numéro RPPS / SIRET : à compléter.</p>
          </Block>

          <Block title="Directeur de la publication">
            <p>Dr Sana Amraoui.</p>
          </Block>

          <Block title="Hébergement">
            <p>Site hébergé par Render (Render.com). Coordonnées de l'hébergeur à compléter.</p>
          </Block>

          <Block title="Propriété intellectuelle">
            <p>
              L'ensemble des contenus de ce site (textes, images, logo) est protégé. Toute
              reproduction sans autorisation est interdite.
            </p>
          </Block>

          <Block title="Données personnelles">
            <p>
              Les modalités de traitement des données sont précisées dans la{' '}
              <a href="/confidentialite" className="text-burgundy hover:underline">politique de confidentialité</a>.
            </p>
          </Block>
        </div>
      </article>
    </>
  )
}
