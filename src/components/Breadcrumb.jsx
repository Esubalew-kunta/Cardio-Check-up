import { Link } from 'react-router-dom'

// Accessible breadcrumb. `items` = [{ label, to? }]; the last item is the
// current page (no link). `tone` switches text colour for dark vs light bands.
export default function Breadcrumb({ items, tone = 'light' }) {
  const base = tone === 'dark' ? 'text-offwhite/60' : 'text-muted'
  const link = tone === 'dark' ? 'hover:text-gold' : 'hover:text-burgundy'
  return (
    <nav aria-label="Fil d'Ariane" className={`text-xs sm:text-sm ${base}`}>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.to && !last ? (
                <Link to={item.to} className={`${link} transition-colors`}>
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'font-medium' : ''}>
                  {item.label}
                </span>
              )}
              {!last && <span aria-hidden="true">›</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
