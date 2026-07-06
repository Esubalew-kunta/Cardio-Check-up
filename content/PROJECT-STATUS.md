# Project status — Cardio Check-up content overhaul

Single source of truth for progress. Read this first to continue the work.
Last updated: all 7 WPs built, **all 4 exam videos live**, CTA/scroll bugs
fixed, and a **Supabase backend prepped but NOT wired in** (blog + appointment
booking still run on static data / the direct n8n webhook). Pushed to GitHub
`main` (commit `8a6e43b`).

---

## What this is
A large content overhaul of the Cardio Check-up site (React + Vite + Tailwind v4,
French-only) driven by Dr Amraoui's Notion brief, reproduced verbatim at
`content/dr-amraoui-inputs.md`. Site grew from a 5-exam brochure to a full
medical-centre site.

## Companion docs (all in `content/`, except SUPABASE_SETUP.md)
- `dr-amraoui-inputs.md` — the client brief (source of truth for all copy)
- `IMPLEMENTATION-PLAN.md` — the original WP1–WP7 plan
- `QUESTIONS-FOR-CLIENT.md` — open questions/decisions for the manager
- `VALIDATION-CHECKLIST.md` — medical/editorial sign-off before go-live
- `gemini-video-prompts.md` — exam video prompts + status (all 4 done now)
- `IMAGE-ASSETS.md` — placeholder images to replace
- `mockups/` — my mockups + `mockups/friend/` (the friend's approved designs)
- `../SUPABASE_SETUP.md` (repo root) — exact steps to go live on Supabase for
  the blog + appointment booking; nothing in it is wired in yet, see below

## Working rules (STRICT)
1. **Design-approval gate** — never implement a new/changed UI until the design is
   approved. Process: (a) write a friend-consult prompt, (b) build my own PNG
   mockup (HTML → headless Chrome), (c) WAIT for the friend's design dropped in
   `content/mockups/friend/`, (d) compare honestly, (e) user picks, (f) build.
   Data-only edits that reuse an approved template are exempt.
2. **No em dashes** in user-facing UI copy (code comments exempt). Use ` · `,
   comma, or parentheses. Grep touched files: `grep -rnP "[\x{2013}\x{2014}]" src`.
3. All copy comes from the brief — no fabricated facts/figures.
4. Unvalidated figures/claims get `// TODO: validation médicale`.

## DONE — all 7 work packages
- **WP1 Exams (5→12)** — `SERVICES` in site.js. Renamed MAPA→Holter tensionnel,
  Holter ECG→Holter rythmique; added ECG, ETT, Épreuve d'effort; **Doppler hub**
  (`/examens/doppler-vasculaire`, `components/ExamHub.jsx`, branch in
  `pages/ExamDetail.jsx` on `exam.subExams`) with **animated anatomy figure**
  (`components/AnatomyFigure.jsx` + `public/images/anatomy-vascular.jpg`,
  scroll-synced highlight, sticky, "Sur cette page"); grouped homepage grid
  (`EXAM_GROUPS`, `components/Services.jsx`) with jump nav + themed posters.
- **WP2 Practitioners** — added **Dr Sofiane** (placeholder profile, `order:4`);
  doctor order via `order` field + `getPartners()` sort; homepage team =
  **arc-of-6** (`components/NotreConseil.jsx`, founder centred gold ring);
  Amraoui positioning added; ECG+ETT list Sofiane.
- **WP3 Homepage** — Hero text; **Pourquoi** section (`components/Pourquoi.jsx`);
  FAQ trimmed to 5 broad questions.
- **WP4 Consultations** — `/consultations` (`pages/Consultations.jsx`),
  `CONSULTATIONS` (11) + `CONSULTATION_GROUPS` (4). Bilan moved here
  (group 'consultation', excluded from exams grid; detail page kept).
- **WP5 Pathologies** — `PATHOLOGIES` (3: FA, apnée, HTA) in site.js;
  `/pathologies` (`pages/Pathologies.jsx`) + `/pathologies/:slug` via generalized
  `pages/Article.jsx` (getPost||getPathologie); **risk-factors table**
  (`components/FacteursRisque.jsx` + `RISK_FACTORS`, dynamic `highlight`) on HTA.
- **WP6 Nav** — de-crowded to a 4-item bar + **light "Nos soins" mega-menu**
  (`components/Header.jsx`): Examens/Consultations/Pathologies columns + a
  "Besoin d'aide" panel whose CTA opens the **RAG assistant** (`openAiChat`) with
  phone fallback. FAQ demoted. Footer keeps full NAV.
- **WP7** — `content/VALIDATION-CHECKLIST.md` compiled.

## Exam videos (YouTube) — ALL 4 DONE
- ECG ✅ `DEB-WcBdBR8` · ETT ✅ `OWkstGh5i0U`
- Épreuve d'effort ✅ `SuGp0YwWZzo` · Doppler vasculaire ✅ `tc7KTED100U`
- All set as `videoId` in site.js. Embed markup lives in one shared
  `components/ExamVideo.jsx` (used by `ExamDetail.jsx` and, now, `ExamHub.jsx`
  — the Doppler hub page has its own "En vidéo" section, in addition to
  autoplaying on its homepage card via `components/Services.jsx`).
- Prompts (incl. English voiceover scripts) in `gemini-video-prompts.md`.

## Also DONE (post-WP)
- All 4 exam explainer videos live (see above).
- All 8 pathology + news cover images replaced (`public/images/patho-*`, `news-*`).
- Consultations booking (cards + bottom CTA) → Dr's Doctolib, **same-tab redirect**
  (`utils/doctolibModal.js` `openDoctolib()`; Doctolib blocks iframe embedding via
  X-Frame-Options SAMEORIGIN, so no true in-site embed is possible).
- **Review QR** in the footer ("Votre avis compte") — `public/images/qr-avis.png`
  (source `content/Dr.Amraoui Review QR-4.png`).
- **CTA audit + fixes**: Hero had no booking button, and Home/Pathologies never
  closed with a conversion strip — both fixed (`components/Hero.jsx`,
  `pages/Home.jsx`, `pages/Pathologies.jsx` now use the existing `CtaStrip`/
  `openBookingModal` pattern, nothing new invented).
- **Scroll bug fix**: `components/ScrollManager.jsx` wasn't re-scrolling when
  clicking an anchor link (e.g. `/#examens`) while already on that exact URL,
  since React Router doesn't treat it as a location change unless you also
  watch `key` (now does).
- **Back-to-top button** — `components/BackToTop.jsx`, global via `Layout.jsx`,
  bottom-left (opposite the chat/phone stack), appears after ~1 viewport of scroll.
- **Supabase backend prepped, NOT wired in** — see "Supabase (prepped, not
  live)" section below. Zero effect on the live site; verified with a real
  `vite build` that succeeds without `@supabase/supabase-js` even installed.
- Pushed to GitHub `main` (commit `8a6e43b`); `.env` is gitignored (host must set
  `VITE_CHAT_API_URL` for the RAG chat, and eventually `VITE_SUPABASE_URL` /
  `VITE_SUPABASE_ANON_KEY` — see `SUPABASE_SETUP.md`).

## Supabase (prepped, not live)
Blog (`Actualites.jsx`/`Article.jsx`/`BlogPreview.jsx`) and appointment booking
(`BookingModal.jsx`) still run exactly as before — static `POSTS` array and
direct n8n webhook call, respectively. Nothing imports the new files below;
they exist so going live later is a small, low-risk swap instead of a build.
- `supabase/migrations/0001_create_posts_table.sql` — `posts` table
- `supabase/migrations/0002_create_appointment_requests_table.sql` —
  `appointment_requests` table (mirrors the exact fields BookingModal already
  sends to n8n)
- `supabase/storage-bucket.md` — spec for a `blog-images` bucket
- `src/lib/supabaseClient.js`, `src/lib/blogRepository.js`,
  `src/lib/appointmentRepository.js` — client + repositories, all fall back
  to current behavior automatically if Supabase env vars are missing
- `.env.example` — placeholders for the required env vars
- Full go-live sequence (create project → `npm install @supabase/supabase-js`
  → run migrations → create bucket → set env vars → **only then** swap the
  pages/modal over) is in **`SUPABASE_SETUP.md`** at the repo root. Also
  flags two open items there: `posts` has no `category`/`author`/`readingMin`
  columns yet, and the `appointment_requests` read policy grants any
  authenticated user access to all submitted PII (name/email/phone) — decide
  on stricter role scoping before handing out logins.

## PENDING (non-code / from the practice)
- **Client validation** — see `VALIDATION-CHECKLIST.md` (epidemiology figures, AI
  claim, ablation/électroporation, épreuve d'effort text, spelling).
- **Dr Sofiane** — surname, bio, diplomas, photo (brief gives only name + 6 areas +
  photo order #4; nothing more exists — do not fabricate).
- **PARKED decision** — "Nos Spécialités" (8): add a section or skip?
  (`QUESTIONS-FOR-CLIENT.md` #1).

## PENDING (needs credentials / a decision, not urgent)
- **Supabase go-live** — see "Supabase (prepped, not live)" above and
  `SUPABASE_SETUP.md`. Needs: a real Supabase project, `npm install
  @supabase/supabase-js`, running the 2 migrations, real env vars, then the
  small swap in the 3 blog files + `BookingModal.jsx`.
- **No admin UI** for appointment requests once Supabase is live — reading
  them means the Supabase table editor until something else is built.

## Technical notes
- **RAG chat** needs `.env` → `VITE_CHAT_API_URL=https://cardio-rag-backend.onrender.com`
  (separate backend; without it the widget errors).
- **Screenshots in headless Chrome:** the homepage hero is `min-h-screen` and
  content uses scroll-reveal (`.reveal` opacity 0). To capture lower sections,
  temporarily shrink the hero to a fixed px AND set `.reveal` opacity 1 (via a
  `node -e` replace), capture a tall viewport, then revert. Standalone routes
  (/consultations, /pathologies) don't have the min-h-screen hero.
- Verify builds with `npx vite build --logLevel error` (then `rm -rf dist`).
