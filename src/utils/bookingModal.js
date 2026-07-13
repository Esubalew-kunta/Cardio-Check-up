import { CONTACT } from '../data/site.js'

// Retained for the (now unmounted) BookingModal component's import; unused.
export const BOOKING_MODAL_EVENT = 'open-booking-modal'

// Booking action for every "Prendre rendez-vous" button. The in-house
// appointment form was retired — booking now redirects straight to Dr Amraoui's
// Doctolib page (same tab; Doctolib blocks iframe embedding). The
// `openBookingModal` name is kept so existing call sites need no change; any
// prefill argument is ignored (Doctolib handles the scheduling).
export function openBookingModal() {
  window.location.href = CONTACT.doctolib
}
