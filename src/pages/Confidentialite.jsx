import Seo from '../components/Seo.jsx'
import Breadcrumb from '../components/Breadcrumb.jsx'
import { CONTACT } from '../data/site.js'

function Block({ title, children }) {
  return (
    <div className="mt-10">
      <h2 className="font-display text-2xl font-semibold text-ink">{title}</h2>
      <div className="mt-3 space-y-2 text-ink/80 leading-relaxed">{children}</div>
    </div>
  )
}

export default function Confidentialite() {
  return (
    <>
      <Seo
        title="Politique de confidentialité"
        description="Politique de confidentialité et traitement des données personnelles du cabinet Cardio Check-up."
        path="/confidentialite"
      />
      <article className="bg-cream pt-28 sm:pt-32 pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Politique de confidentialité' }]} />
          <h1 className="mt-6 font-display text-4xl sm:text-5xl font-semibold text-ink">
            Politique de confidentialité
          </h1>
          <p className="mt-4 text-sm text-muted">
            Contenu à valider par le cabinet avant la mise en ligne (placeholder).
          </p>

          <Block title="Responsable du traitement">
            <p>Cabinet Cardio Check-up · Dr Sana Amraoui.</p>
          </Block>

          <Block title="Données collectées">
            <p>
              Via le formulaire de demande de rendez-vous : nom, prénom, e-mail, téléphone, lieu
              souhaité, motif de consultation et message éventuel. Aucune donnée de santé sensible
              n'est demandée par ce formulaire.
            </p>
          </Block>

          <Block title="Finalité et base légale">
            <p>
              Ces données sont utilisées uniquement pour traiter votre demande de rendez-vous et
              vous recontacter. La base légale est votre consentement, recueilli au moment de
              l'envoi du formulaire.
            </p>
          </Block>

          <Block title="Destinataires et conservation">
            <p>
              Les données sont transmises au secrétariat du cabinet et ne sont jamais cédées à des
              tiers à des fins commerciales. Elles sont conservées le temps nécessaire au traitement
              de votre demande, puis supprimées conformément à la réglementation.
            </p>
          </Block>

          <Block title="Vos droits">
            <p>
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement
              et d'opposition. Pour les exercer, écrivez-nous à{' '}
              <a href={CONTACT.emailHref} className="text-burgundy hover:underline break-all">{CONTACT.email}</a>.
            </p>
          </Block>

          <Block title="Cookies">
            <p>
              Ce site n'utilise pas de cookies de suivi publicitaire. Les éventuels cookies
              techniques sont strictement nécessaires à son fonctionnement.
            </p>
          </Block>
        </div>
      </article>
    </>
  )
}
