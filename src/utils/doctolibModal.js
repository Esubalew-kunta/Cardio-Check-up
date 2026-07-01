import { CONTACT } from '../data/site.js'

// Sends the patient to Dr Amraoui's Doctolib. Doctolib refuses to be embedded in
// an iframe (X-Frame-Options: SAMEORIGIN), so we navigate in the SAME TAB rather
// than opening a new one. Used by the Consultations page and the chat assistant.
export function openDoctolib() {
  window.location.href = CONTACT.doctolib
}
