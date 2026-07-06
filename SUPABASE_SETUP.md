# Supabase setup — blog & appointment booking backend

**Status: not live.** The site currently reads every blog post from the
static `POSTS` array in `src/data/site.js`, and every "Prendre rendez-vous"
submission goes straight from `BookingModal.jsx` to the n8n webhook. Nothing
described below is wired into the running app — these are ready-to-use files
waiting for real credentials, added without touching any live page or
component.

## Files this added

Blog:
- `supabase/migrations/0001_create_posts_table.sql` — the `posts` table, indexes, RLS policy
- `supabase/storage-bucket.md` — spec for the post-images storage bucket
- `src/lib/supabaseClient.js` — Supabase client, `null` until env vars exist
- `src/lib/blogRepository.js` — `getPosts()` / `getPostBySlug()`; falls back
  to the static data automatically whenever Supabase isn't configured

Appointment booking:
- `supabase/migrations/0002_create_appointment_requests_table.sql` — the
  `appointment_requests` table (mirrors the exact fields `BookingModal.jsx`
  already sends to n8n), indexes, RLS policies
- `src/lib/appointmentRepository.js` — `submitAppointmentRequest(form)`:
  writes to Supabase first (best-effort), then calls the n8n webhook with
  the same unchanged payload `BookingModal.jsx` sends today

Shared:
- `.env.example` — required environment variables (placeholders only)

None of `Actualites.jsx`, `Article.jsx`, `BlogPreview.jsx`, or
`BookingModal.jsx` were changed. They still import directly from
`src/data/site.js` / call the webhook directly, exactly as before.

## Steps to go live, in order

1. **Create the Supabase project** at supabase.com (new project, or reuse an
   existing org/project if one already exists for this client).
2. **Install the client library** — not installed yet:
   ```
   npm install @supabase/supabase-js
   ```
3. **Run the migrations, in order** — paste the contents of each into the
   Supabase SQL editor and run it (or `supabase db push` if you're using the
   CLI with this repo linked):
   - `supabase/migrations/0001_create_posts_table.sql`
   - `supabase/migrations/0002_create_appointment_requests_table.sql`
     (depends on the `set_updated_at()` function created by 0001 — run
     0001 first)
4. **Create the storage bucket** — follow `supabase/storage-bucket.md`
   (bucket `blog-images`, public read). Appointments need no bucket.
5. **Set real environment variables**:
   - Copy `.env.example` to `.env`.
   - Fill in `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from
     Project Settings → API in the Supabase dashboard.
   - Set the same two vars in whatever hosts the deployed site (Render,
     Vercel, etc.) — `.env` is gitignored and is never deployed by itself.
6. **Migrate the existing posts (optional but recommended)** — the posts
   currently in `POSTS` (`src/data/site.js`) can be inserted into the new
   `posts` table as-is: each post's `body` array maps directly to the
   `content` jsonb column with no reshaping needed.
7. **Only then, swap the blog pages from static data to the new repository**:
   - `src/pages/Actualites.jsx` — replace the `getPosts` import from
     `../data/site.js` with `getPosts` from `../lib/blogRepository.js`.
     It's async now, so the page will need a loading state.
   - `src/components/BlogPreview.jsx` — same swap (`getRecentPosts` →
     `getPosts().then(p => p.slice(0, 3))`, or add a `getRecentPosts` helper
     to `blogRepository.js` if preferred).
   - `src/pages/Article.jsx` — replace `getPost` with `getPostBySlug`.
   Until this step is done, the site behaves exactly as it does today —
   everything before this point is inert, unused files.
8. **Only then, wire up appointment booking** — a single line change in
   `src/components/BookingModal.jsx`'s `handleSubmit`: replace the
   `fetch(WEBHOOK_URL, ...)` block (currently lines ~88–106) with
   `await submitAppointmentRequest(form)` (imported from
   `../lib/appointmentRepository.js`). Same throw-on-failure contract, so
   the existing `try`/`catch`/`setStatus(...)` logic around it needs no
   other changes. Until this step, every submission still goes only to n8n,
   exactly as today.

## Open items before step 7 will look right

The `posts` table only has the columns actually requested (title, slug,
content, excerpt, featured_image_url, published, published_at, created_at,
updated_at). The current static posts also carry `category` (filter pills on
`/actualites`), `author` (a doctor slug, resolved via `getDoctor()` for the
byline) and `readingMin`. None of those exist in the DB yet;
`blogRepository.js` defaults them to `null` so nothing throws, but the
category filter and author byline will look empty until either:
- new columns are added to `posts` (a follow-up migration), or
- those values are hardcoded/derived some other way at swap time.

## Open items before step 8 will look right

- **No admin UI yet** — reading `appointment_requests` today means using the
  Supabase table editor (or writing SQL) directly. A staff-facing view is a
  separate follow-up, not part of this prep.
- **"Authenticated" isn't the same as "admin"** — the read policy on
  `appointment_requests` allows any logged-in Supabase user to read every
  submission (PII: name, email, phone). Before giving anyone a login, decide
  whether that's acceptable or whether a stricter role/claim check is needed.
- **Status field is inert** — `status` defaults to `pending` and nothing
  ever updates it automatically; moving a request to `contacted` /
  `confirmed` / `declined` would be a manual edit (or a future admin UI
  action) until something else drives it.
