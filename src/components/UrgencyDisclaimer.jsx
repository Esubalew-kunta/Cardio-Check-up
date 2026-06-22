// Sits immediately above the footer on every page. Signal-red left border, calm
// but unmissable — a cardiology site must always point to emergency services.
export default function UrgencyDisclaimer() {
  return (
    <aside className="bg-cream-soft" role="note">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-5">
        <p className="border-l-4 border-signal pl-4 text-sm text-ink/80 leading-relaxed">
          <span className="font-semibold text-ink">En cas d'urgence cardiaque</span>, composez le{' '}
          <a href="tel:15" className="font-semibold text-signal hover:underline">15 (SAMU)</a> ou le{' '}
          <a href="tel:112" className="font-semibold text-signal hover:underline">112</a>.
        </p>
      </div>
    </aside>
  )
}
