import { CONTACT } from '../data/site.js'

// Floating WhatsApp + phone shortcuts. Sits above the mobile sticky booking
// bar (which is ~76px tall) so the two never overlap.
export default function FloatingContactButtons() {
  return (
    <div className="fixed right-4 sm:right-6 bottom-24 lg:bottom-6 z-30 flex flex-col gap-3">
      <a
        href={CONTACT.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discuter sur WhatsApp"
        className="group relative grid place-items-center h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg transition-transform hover:scale-105"
        style={{ backgroundColor: '#25D366' }}
      >
        <svg viewBox="0 0 32 32" className="h-6 w-6 sm:h-7 sm:w-7 fill-white" aria-hidden="true">
          <path d="M16.04 3C9.4 3 4 8.36 4 14.96c0 2.36.69 4.56 1.88 6.4L4.4 27.6l6.42-1.68a12.96 12.96 0 0 0 5.22 1.08c6.64 0 12.04-5.36 12.04-11.96C28.08 8.36 22.68 3 16.04 3zm0 21.84c-1.78 0-3.46-.46-4.94-1.32l-.36-.21-3.72.97 1-3.62-.24-.37a9.86 9.86 0 0 1-1.54-5.33c0-5.46 4.46-9.9 9.94-9.9 5.48 0 9.94 4.44 9.94 9.9 0 5.46-4.46 9.88-9.92 9.88h-.16zm5.45-7.4c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.78-1.66-2.08-.17-.3-.02-.46.13-.62.15-.15.3-.4.45-.6.15-.2.2-.35.3-.57.1-.23.05-.43-.04-.6-.1-.17-.62-1.5-.85-2.04-.22-.53-.46-.46-.63-.47h-.54c-.17 0-.46.07-.7.34-.24.27-.92.9-.92 2.19 0 1.3.94 2.55 1.07 2.73.13.17 1.83 2.79 4.45 3.8 2.62.99 2.62.67 3.1.62.48-.04 1.56-.64 1.78-1.25.22-.62.22-1.15.15-1.25-.07-.1-.27-.17-.57-.32z" />
        </svg>
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-offwhite opacity-0 transition-opacity group-hover:opacity-100">
          WhatsApp
        </span>
      </a>
      <a
        href={CONTACT.phoneHref}
        aria-label="Appeler le cabinet"
        className="group relative grid place-items-center h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg transition-transform hover:scale-105 bg-burgundy"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6 fill-white" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.45 2.33.7 3.58.7a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z" />
        </svg>
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-ink px-3 py-1.5 text-xs font-medium text-offwhite opacity-0 transition-opacity group-hover:opacity-100">
          Appeler
        </span>
      </a>
    </div>
  )
}
