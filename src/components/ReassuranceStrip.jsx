import { useReveal } from '../hooks/useReveal.js'

const ITEMS = [
  { big: 'Indolore', label: 'Tous nos examens sont sans douleur' },
  { big: '10 min', label: "Pose de l'appareil par l'assistante médicale" },
  { big: 'Jour J', label: 'Résultats commentés le jour même' },
]

// Slim reassurance band replacing the removed Parcours section on the homepage.
export default function ReassuranceStrip() {
  const [ref, visible] = useReveal()
  return (
    <section className="bg-burgundy-deep">
      <div
        ref={ref}
        className={`reveal ${visible ? 'is-visible' : ''} mx-auto max-w-5xl px-5 sm:px-8 py-16 sm:py-20`}
      >
        <div className="grid gap-10 sm:grid-cols-3 text-center sm:divide-x divide-gold/20">
          {ITEMS.map((item) => (
            <div key={item.big} className="px-4">
              <p className="font-display text-4xl sm:text-5xl font-semibold text-gold leading-none">
                {item.big}
              </p>
              <p className="mt-3 text-xs sm:text-sm tracking-[0.06em] uppercase text-offwhite/55 leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
