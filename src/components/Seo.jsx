import { Helmet } from 'react-helmet-async'

const SITE = 'https://cardio-check-up.com'
const SUFFIX = 'Cardio Check-up'

// Per-route <title>, meta description, canonical, hreflang and optional
// JSON-LD structured data. `path` should start with "/".
export default function Seo({ title, description, path = '/', image = '/images/hero-reception.jpg', jsonLd }) {
  const fullTitle = title ? `${title} · ${SUFFIX}` : `${SUFFIX} · Cardiologie & Rythmologie Paris 17`
  const url = `${SITE}${path}`
  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="fr" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE}${image}`} />

      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
  )
}
