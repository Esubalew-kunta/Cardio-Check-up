import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Parcours from './components/Parcours.jsx'
import Faq from './components/Faq.jsx'
import Footer from './components/Footer.jsx'
import MobileBookingBar from './components/MobileBookingBar.jsx'
import FloatingContactButtons from './components/FloatingContactButtons.jsx'
import BookingModal from './components/BookingModal.jsx'

// Funnel order: Hero (+ trust + stats) → Dr Amraoui → Nos Examens → Votre visite → FAQ → Footer
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Parcours />
        <Faq />
      </main>
      <Footer />
      <MobileBookingBar />
      <FloatingContactButtons />
      <BookingModal />
    </>
  )
}
