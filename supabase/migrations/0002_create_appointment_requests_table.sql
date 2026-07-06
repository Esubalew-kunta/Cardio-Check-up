-- Migration: create the `appointment_requests` table.
-- NOT executed yet. Run this in the Supabase SQL editor (or `supabase db
-- push`) once a real project exists — see SUPABASE_SETUP.md. Run AFTER
-- 0001_create_posts_table.sql: this reuses the `public.set_updated_at()`
-- trigger function defined there.

create table if not exists public.appointment_requests (
  id uuid primary key default gen_random_uuid(),

  -- Exact fields BookingModal.jsx already sends to the n8n webhook today
  -- (see src/components/BookingModal.jsx handleSubmit) — this table mirrors
  -- that payload one-to-one so nothing needs reshaping to store it.
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  location text not null,
  reason text not null,
  message text,
  consent boolean not null default false,
  honeypot text, -- raw `company` field value; non-empty means a bot submitted it
  source text not null default 'website',
  submitted_at timestamptz not null default now(),

  -- Not part of the current webhook payload — added so staff can track a
  -- request's lifecycle from inside Supabase instead of relying solely on
  -- however the n8n workflow forwards it (email, sheet, etc.).
  status text not null default 'pending'
    check (status in ('pending', 'contacted', 'confirmed', 'declined')),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appointment_requests_status_idx
  on public.appointment_requests (status, submitted_at desc);

drop trigger if exists appointment_requests_set_updated_at on public.appointment_requests;
create trigger appointment_requests_set_updated_at
  before update on public.appointment_requests
  for each row execute function public.set_updated_at();

-- Row Level Security: the public (anon key, used from the browser) may only
-- create requests — never read them back, including their own. Reading
-- submissions requires an authenticated (staff) account.
alter table public.appointment_requests enable row level security;

create policy "Public can submit appointment requests"
  on public.appointment_requests for insert
  with check (true);

create policy "Authenticated staff can read appointment requests"
  on public.appointment_requests for select
  to authenticated
  using (true);
