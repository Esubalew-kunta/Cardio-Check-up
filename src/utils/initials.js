// Two-letter monogram from a doctor's name, dropping the title (Dr/Pr/Dre).
// "Dr Rabiaa Hakem" -> "RH". Used for the elegant placeholder shown when a
// doctor has chosen not to share a photograph.
export function doctorInitials(name = '') {
  const words = name.replace(/^(Dr|Dre|Pr|Pre)\.?\s+/i, '').split(/\s+/).filter(Boolean)
  if (words.length === 0) return ''
  const first = words[0][0]
  const last = words.length > 1 ? words[words.length - 1][0] : ''
  return (first + last).toUpperCase()
}
