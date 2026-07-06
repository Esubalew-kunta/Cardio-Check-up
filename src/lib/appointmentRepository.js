import { supabase, isSupabaseConfigured } from './supabaseClient.js'
import { WEBHOOK_URL } from '../data/site.js'

// Not called from anywhere yet — src/components/BookingModal.jsx still posts
// to WEBHOOK_URL directly in its own handleSubmit and is completely
// unchanged. This is the drop-in replacement for that fetch call: once
// ready, swap the `fetch(WEBHOOK_URL, ...)` block in handleSubmit for
// `await submitAppointmentRequest(form)` — same throw-on-failure contract
// (see the `if (!res.ok) throw` below), so the existing try/catch in
// BookingModal.jsx needs no other changes. See SUPABASE_SETUP.md.

// Writes to Supabase first (best-effort: if this fails or isn't configured,
// it's logged and skipped — it never blocks or alters the webhook call
// below), then calls the n8n webhook with the exact same payload
// BookingModal.jsx sends today.
export async function submitAppointmentRequest(form) {
  const submittedAt = new Date().toISOString()

  if (isSupabaseConfigured) {
    const { error } = await supabase.from('appointment_requests').insert({
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location,
      reason: form.reason,
      message: form.message.trim(),
      consent: form.consent,
      honeypot: form.company,
      submitted_at: submittedAt,
      source: 'website',
    })
    if (error) {
      console.error('[appointmentRepository] Supabase insert failed (webhook still sent):', error)
    }
  }

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      first_name: form.firstName.trim(),
      last_name: form.lastName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      location: form.location,
      reason: form.reason,
      message: form.message.trim(),
      consent: form.consent,
      company: form.company,
      submitted_at: submittedAt,
      source: 'website',
    }),
  })
  if (!res.ok) throw new Error('Request failed')
}
