// Tiny pub-sub so any component (header, hero, footer, sticky bar) can open
// the booking modal without prop-drilling or a context provider.
export const BOOKING_MODAL_EVENT = 'open-booking-modal'

export function openBookingModal() {
  window.dispatchEvent(new CustomEvent(BOOKING_MODAL_EVENT))
}
