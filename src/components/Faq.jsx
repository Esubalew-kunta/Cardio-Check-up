import FaqAccordion from './FaqAccordion.jsx'
import { FAQ } from '../data/site.js'

export default function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32 bg-cream scroll-mt-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <FaqAccordion items={FAQ} eyebrow="Questions fréquentes" title="Tout savoir avant votre examen" />
      </div>
    </section>
  )
}
