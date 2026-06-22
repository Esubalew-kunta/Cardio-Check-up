import Seo from '../components/Seo.jsx'
import Hero from '../components/Hero.jsx'
import NotreConseil from '../components/NotreConseil.jsx'
import Services from '../components/Services.jsx'
import ReassuranceStrip from '../components/ReassuranceStrip.jsx'
import Faq from '../components/Faq.jsx'
import BlogPreview from '../components/BlogPreview.jsx'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: 'Cabinet Cardio Check-up',
  url: 'https://cardio-check-up.com/',
  telephone: '+33755505258',
  email: 'secretariatdramraoui@myeva.ovh',
  medicalSpecialty: 'Cardiology',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '29 Rue Bayen',
    addressLocality: 'Paris',
    postalCode: '75017',
    addressCountry: 'FR',
  },
}

export default function Home() {
  return (
    <>
      <Seo
        title="Cardiologie & Rythmologie · Paris 17"
        description="Cabinet de cardiologie et rythmologie à Paris 17. Bilan cardiovasculaire, ECG, échographie, Holter, MAPA, polygraphie nocturne. Conventionné Secteur 2."
        path="/"
        jsonLd={jsonLd}
      />
      <Hero />
      <NotreConseil />
      <Services />
      <ReassuranceStrip />
      <Faq />
      <BlogPreview />
    </>
  )
}
