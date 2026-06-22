// French long-date formatter for blog posts. Parses an ISO "YYYY-MM-DD" string
// by hand (no Date() / timezone surprises) and returns e.g. "4 juin 2026".
const MONTHS_FR = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
]

export function formatFrenchDate(iso) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return `${d} ${MONTHS_FR[m - 1]} ${y}`
}
