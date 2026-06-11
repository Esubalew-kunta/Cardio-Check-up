import Logo from './Logo.jsx'
import { CONTACT, NAV } from '../data/site.js'

// Secondary "dr_rythmo" red roundel mark (Instagram / personal brand).
function RythmoMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 48 48" aria-label="dr_rythmo" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill="var(--color-signal)" />
      <path
        d="M12 25h6l2.5-7 4 14 3.5-11 2 4H36"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-burgundy-deep text-offwhite/80">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-28 lg:pb-16">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Logo variant="light" />
            <p className="mt-5 text-sm leading-relaxed text-offwhite/65 max-w-xs">
              Cabinet de cardiologie et rythmologie. La santé de votre cœur est notre priorité.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <RythmoMark />
              <span className="text-sm text-offwhite/60">@dr_rythmo</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-display text-lg font-semibold text-offwhite mb-4">Navigation</h4>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-sm hover:text-gold transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + social */}
          <div>
            <h4 className="font-display text-lg font-semibold text-offwhite mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href={CONTACT.phoneHref} className="hover:text-gold transition-colors">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.emailHref} className="hover:text-gold transition-colors break-all">
                  {CONTACT.email}
                </a>
              </li>
              <li>29 Rue Bayen, 75017 Paris</li>
            </ul>
            <div className="mt-5 flex gap-4 text-sm">
              <a href={CONTACT.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                YouTube
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-offwhite/15 flex flex-col sm:flex-row justify-between gap-3 text-xs text-offwhite/50">
          <p>© {year} Cabinet Cardio Check-up · Dr Sana Amraoui. Tous droits réservés.</p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-gold transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-gold transition-colors">Politique de confidentialité</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
