# Project status — Cardio Check-up content overhaul

Single source of truth for progress. Read this first to continue the work.
Last updated during the session that built WP1–WP7.

---

## What this is
A large content overhaul of the Cardio Check-up site (React + Vite + Tailwind v4,
French-only) driven by Dr Amraoui's Notion brief, reproduced verbatim at
`content/dr-amraoui-inputs.md`. Site grew from a 5-exam brochure to a full
medical-centre site.

## Companion docs (all in `content/`)
- `dr-amraoui-inputs.md` — the client brief (source of truth for all copy)
- `IMPLEMENTATION-PLAN.md` — the original WP1–WP7 plan
- `QUESTIONS-FOR-CLIENT.md` — open questions/decisions for the manager
- `VALIDATION-CHECKLIST.md` — medical/editorial sign-off before go-live
- `gemini-video-prompts.md` — exam video prompts + status
- `IMAGE-ASSETS.md` — placeholder images to replace
- `mockups/` — my mockups + `mockups/friend/` (the friend's approved designs)

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

## Exam videos (YouTube)
- ECG ✅ `DEB-WcBdBR8` · ETT ✅ `OWkstGh5i0U` — set as `videoId` in site.js.
- Épreuve d'effort ⏳ + Doppler ⏳ — prompts in `gemini-video-prompts.md`.
  Doppler is a hub page (no inline slot yet).

## PENDING (non-code)
- Client validation (see VALIDATION-CHECKLIST.md): figures, AI claim, ablation/
  électroporation, épreuve d'effort text, spelling.
- Dr Sofiane: surname, bio, diplomas, **photo** (brief gives only name + 6 areas +
  photo order #4; nothing more exists — do not fabricate).
- Remaining 2 exam videos (Épreuve d'effort, Doppler).
- ✅ DONE: all 8 pathology + news cover images replaced (public/images/patho-*, news-*).
- ✅ DONE: Consultations booking + chat assistant button → Dr's Doctolib
  (`utils/doctolibModal.js` `openDoctolib()` = same-tab redirect; Doctolib blocks
  iframe embedding via X-Frame-Options SAMEORIGIN, so no in-site embed possible).
- ✅ DONE: **Review QR** added to the footer ("Votre avis compte", brand column) —
  `public/images/qr-avis.png` (source: `content/Dr.Amraoui Review QR-4.png`).
- Chat assistant: the Doctolib booking button was added then removed per request
  (`openDoctolib` now only used by the Consultations page).
- PARKED: "Nos Spécialités" (8) — add a section or skip? (QUESTIONS-FOR-CLIENT.md #1)

## Technical notes
- **RAG chat** needs `.env` → `VITE_CHAT_API_URL=https://cardio-rag-backend.onrender.com`
  (separate backend; without it the widget errors).
- **Screenshots in headless Chrome:** the homepage hero is `min-h-screen` and
  content uses scroll-reveal (`.reveal` opacity 0). To capture lower sections,
  temporarily shrink the hero to a fixed px AND set `.reveal` opacity 1 (via a
  `node -e` replace), capture a tall viewport, then revert. Standalone routes
  (/consultations, /pathologies) don't have the min-h-screen hero.
- Verify builds with `npx vite build --logLevel error` (then `rm -rf dist`).
