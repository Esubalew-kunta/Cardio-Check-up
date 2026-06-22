import { Outlet } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import UrgencyDisclaimer from './UrgencyDisclaimer.jsx'
import MobileBookingBar from './MobileBookingBar.jsx'
import FloatingContactButtons from './FloatingContactButtons.jsx'
import BookingModal from './BookingModal.jsx'
import AiChatModal from './AiChatModal.jsx'
import PageLoader from './PageLoader.jsx'
import ScrollManager from './ScrollManager.jsx'

// Shared chrome wrapping every route. The page content renders through
// <Outlet />. Global singletons (modals, floating buttons, loader, scroll
// manager) live here once, not per page.
export default function Layout() {
  return (
    <>
      <ScrollManager />
      <PageLoader />
      <Header />
      <main>
        <Outlet />
      </main>
      <UrgencyDisclaimer />
      <Footer />
      <MobileBookingBar />
      <FloatingContactButtons />
      <BookingModal />
      <AiChatModal />
    </>
  )
}
