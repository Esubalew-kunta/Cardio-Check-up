import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import SocialProof from './components/SocialProof.jsx'
import Services from './components/Services.jsx'
import Faq from './components/Faq.jsx'
import Parcours from './components/Parcours.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import MobileBookingBar from './components/MobileBookingBar.jsx'

// Approved funnel order:
// Hero (+ trust) → About → Social-proof numbers → Services → FAQ → Parcours → Contact
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <SocialProof />
        <Services />
        <Faq />
        <Parcours />
        <Contact />
      </main>
      <Footer />
      <MobileBookingBar />
    </>
  )
}
