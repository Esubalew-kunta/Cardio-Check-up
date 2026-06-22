// Tiny pub-sub so any component (header, hero, footer, sticky bar, CTA strips)
// can open the booking modal without prop-drilling or a context provider.
export const BOOKING_MODAL_EVENT = 'open-booking-modal'

// Optional `prefill` lets a caller pre-select form fields, e.g.
// openBookingModal({ reason: 'Holter ECG' }) from an exam page.
export function openBookingModal(prefill) {
  const detail = prefill && typeof prefill === 'object' ? prefill : undefined
  window.dispatchEvent(new CustomEvent(BOOKING_MODAL_EVENT, { detail }))
}
