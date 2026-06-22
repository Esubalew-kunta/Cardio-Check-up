import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { CONTACT, LOCATIONS, NAV, LEGAL_NAV } from '../data/site.js'

// Secondary "dr_rythmo" red roundel mark (Instagram / personal brand).
function RythmoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" aria-label="dr_rythmo" xmlns="http://www.w3.org/2000/svg">
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

function MetroPill({ m }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-offwhite/10 py-1 pl-1 pr-2.5 text-xs text-offwhite/80">
      <span
        className="grid place-items-center h-5 w-5 rounded-full text-[0.7rem] font-bold leading-none"
        style={{ backgroundColor: m.color, color: m.text }}
        aria-hidden="true"
      >
        {m.line}
      </span>
      <span className="font-medium">{m.station}</span>
    </span>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer id="contact" className="bg-burgundy-deep text-offwhite/80">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 pb-28 lg:pb-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Logo variant="light" className="scale-110 origin-left" />
            <p className="mt-6 text-sm leading-relaxed text-offwhite/65 max-w-xs">
              Détecter. Prévenir. Accompagner.
            </p>
            <a
              href={CONTACT.doctolib}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-xs text-offwhite/55 hover:text-gold transition-colors underline underline-offset-2"
            >
              Vous préférez réserver via Doctolib ?
            </a>
          </div>

          {/* Adresses */}
          <div>
            <h4 className="font-display text-lg font-semibold text-offwhite mb-4">Adresses</h4>
            <ul className="space-y-5 text-sm">
              {LOCATIONS.map((loc) => (
                <li key={loc.name}>
                  <p className="font-semibold text-offwhite">{loc.name}</p>
                  <p className="mt-1 text-offwhite/65">{loc.address}</p>
                  <p className="mt-1.5 text-offwhite/55 text-xs">{loc.walking}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {loc.metro.map((m) => (
                      <MetroPill key={m.station} m={m} />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
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
              <li>
                <a
                  href={CONTACT.doctolib}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold transition-colors"
                >
                  Doctolib
                </a>
              </li>
            </ul>
          </div>

          {/* Liens et réseaux */}
          <div>
            <h4 className="font-display text-lg font-semibold text-offwhite mb-4">Liens et réseaux</h4>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm hover:text-gold transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center gap-4">
              <a
                href={CONTACT.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="hover:text-gold transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M21.6 7.2s-.2-1.5-.8-2.1c-.8-.8-1.6-.8-2-.9C15.9 4 12 4 12 4s-3.9 0-6.8.2c-.4 0-1.2.1-2 .9-.6.6-.8 2.1-.8 2.1S2.2 9 2.2 10.7v1.7c0 1.7.2 3.5.2 3.5s.2 1.5.8 2.1c.8.8 1.8.7 2.3.8 1.7.2 7.5.2 7.5.2s3.9 0 6.8-.2c.4 0 1.2-.1 2-.9.6-.6.8-2.1.8-2.1s.2-1.7.2-3.5v-1.7c0-1.7-.2-3.5-.2-3.5zM9.9 14.6V8.9l5.3 2.9-5.3 2.8z" />
                </svg>
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gold transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 1.8.24 2.2.4.6.23 1 .5 1.4.9.4.4.67.8.9 1.4.16.4.34 1 .4 2.2.06 1.2.07 1.6.07 4.8s0 3.6-.07 4.8c-.06 1.2-.24 1.8-.4 2.2-.23.6-.5 1-.9 1.4-.4.4-.8.67-1.4.9-.4.16-1 .34-2.2.4-1.2.06-1.6.07-4.8.07s-3.6 0-4.8-.07c-1.2-.06-1.8-.24-2.2-.4-.6-.23-1-.5-1.4-.9-.4-.4-.67-.8-.9-1.4-.16-.4-.34-1-.4-2.2C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.8c.06-1.2.24-1.8.4-2.2.23-.6.5-1 .9-1.4.4-.4.8-.67 1.4-.9.4-.16 1-.34 2.2-.4C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.7.07-1 .05-1.5.21-1.86.35-.47.18-.8.4-1.15.75-.35.35-.57.68-.75 1.15-.14.36-.3.86-.35 1.86C3.12 8.48 3.1 8.85 3.1 12s0 3.52.07 4.7c.05 1 .21 1.5.35 1.86.18.47.4.8.75 1.15.35.35.68.57 1.15.75.36.14.86.3 1.86.35 1.18.06 1.55.07 4.7.07s3.52 0 4.7-.07c1-.05 1.5-.21 1.86-.35.47-.18.8-.4 1.15-.75.35-.35.57-.68.75-1.15.14-.36.3-.86.35-1.86.06-1.18.07-1.55.07-4.7s0-3.52-.07-4.7c-.05-1-.21-1.5-.35-1.86a3.1 3.1 0 0 0-.75-1.15 3.1 3.1 0 0 0-1.15-.75c-.36-.14-.86-.3-1.86-.35-1.18-.06-1.55-.07-4.7-.07zm0 4.1a4.9 4.9 0 1 1 0 9.8 4.9 4.9 0 0 1 0-9.8zm0 1.8a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2zm6.24-2.6a1.16 1.16 0 1 1-2.32 0 1.16 1.16 0 0 1 2.32 0z" />
                </svg>
              </a>
              <a
                href={CONTACT.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-gold transition-colors"
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current" aria-hidden="true">
                  <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
                </svg>
              </a>
              <RythmoMark />
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-offwhite/15 flex flex-col sm:flex-row justify-between gap-3 text-xs text-offwhite/50">
          <p>© {year} Cardio Check-up Paris · {CONTACT.site}</p>
          <p className="flex gap-4">
            {LEGAL_NAV.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-gold transition-colors">
                {item.label}
              </Link>
            ))}
          </p>
        </div>
      </div>
    </footer>
  )
}
