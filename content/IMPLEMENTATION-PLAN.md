# Cardio Check-up — Content Update Implementation Plan

> **Author:** Senior UX/UI design pass
> **Source content:** `content/dr-amraoui-inputs.md` (Dr Amraoui's Notion brief)
> **Goal:** Blend all new content into the existing site **without breaking the
> current structure, data flow, or visual language** — reusing existing
> templates, adding sections over new pages, and creating new routes only where
> the content is deep and standalone.
> **Status:** PLAN ONLY. Implement one work package at a time, after explicit
> approval. RAG chatbot is out of scope for now (data-fill only).

---

## 0. Design guardrails (apply to every work package)

These keep new work invisible-as-new — it should feel like it was always there.

- **Palette (locked):** burgundy `#7B1C42` (primary), gold `#C9A96E` (accent,
  decorative only), cream `#F5F0E8` / cream-soft `#EFE7D8` (section bands), ink
  `#2C1810` (body), signal red `#C0392B` (**CTA + ECG only — never decorative**).
- **Type:** Cormorant Garamond = display/headings only; Inter = everything else.
  Section eyebrow = `.eyebrow` (11px tracked caps, burgundy).
- **Section rhythm:** alternate `bg-cream` / `bg-cream-soft`; vertical padding
  `py-24 sm:py-32` (home) or `py-20 sm:py-24` (inner). Container `max-w-6xl px-5
  sm:px-8` (or `max-w-3xl` for reading width). Anchor offset `scroll-mt-20`.
- **Motion:** reuse `useReveal()` + `.reveal` (28px rise, 0.7s). Honor
  `prefers-reduced-motion` (already wired globally).
- **Components to REUSE (do not reinvent):** `Reveal`, `FaqAccordion`,
  `CtaStrip`, `Breadcrumb`, `DoctorMiniCard`, `ArticleBody`, `ExamTimeline`,
  `Seo`. New sections should compose these.
- **Single source of truth:** all copy lives in `src/data/site.js`. Templates
  stay generic; only data changes wherever possible.
- **SEO:** every new page gets a `<Seo>` with title/description/path + JSON-LD
  (MedicalProcedure for exams, MedicalWebPage/Article for pathologies).
- **Validation gate:** any figure/claim flagged in §12 of the brief gets a
  `// TODO: validation médicale` comment beside it in `site.js`. Nothing
  unvalidated ships silently.

### Asset policy (videos & images)
- Exam template already has a `videoId` slot and a graceful **placeholder** when
  empty (`ExamDetail.jsx` `VideoBlock`) — so exams can ship before videos exist.
- Each work package ends with an **ASSET SHOT-LIST**: the exact image/video
  slots needed, with suggested Gemini prompts, so generation is batched, not
  ad-hoc. Missing images use a tasteful placeholder until generated.

---

## 1. Work-package sequence (the build order)

| WP | Title | New pages | Risk | Depends on |
|----|-------|-----------|------|------------|
| **WP1** | Exams restructure (5 → 12) | 1 (Doppler hub) | Med | — |
| **WP2** | Practitioners (+ Dr Sofiane) | 0 | Med | WP1 (exam IDs) |
| **WP3** | Homepage new sections | 0 | Low | WP1, WP2 |
| **WP4** | Consultations page | 1 | Low | WP2 |
| **WP5** | Pathologies (articles) | 1 listing | Low | WP2 |
| **WP6** | Navigation + IA polish | 0 | Low | WP1–5 |
| **WP7** | QA / a11y / validation sweep | 0 | Low | all |

**Net new routes across the whole project: 3** (Doppler hub exam, Consultations,
Pathologies listing). Everything else = new sections or new data entries.

---

## WP1 — Exams restructure (5 → 12)  ⭐ START HERE

**Why first:** exams are referenced by the homepage `#examens` grid, the header
dropdown, doctor pages, and (later) the chatbot. Locking exam IDs first makes
every downstream wiring consistent.

### 1a. Data changes in `src/data/site.js` (`SERVICES`)

| Action | Exam | New `id` | Notes |
|--------|------|----------|-------|
| ✏️ Rename | MAPA → **Holter tensionnel 24h** | keep `mapa` (id stable for SEO) | Add "4 tailles de brassard" detail |
| ✏️ Rename | Holter ECG → **Holter rythmique** | keep `holter-ecg` | Update copy from brief §4.4 |
| ✏️ Refresh | Polygraphie ventilatoire nocturne | keep `polygraphie` | Light copy update §4.5 |
| ➕ New | **Électrocardiogramme (ECG)** | `ecg` | §4.1 |
| ➕ New | **Échographie cardiaque (ETT)** | `echographie-cardiaque` | §4.2 |
| ➕ New | **Épreuve d'effort** | `epreuve-effort` | §4.12 — ⚠️ flagged text, mark TODO |
| ➕ New (hub) | **Échographie Doppler vasculaire** | `doppler-vasculaire` | §4.6–4.11, 6 subsections |

> **Bilan cardiovasculaire** and **Rythmologie interventionnelle**: decision
> pending (see Open Decisions). Default plan: move *Bilan* to WP4 Consultations,
> keep *Rythmologie* as-is (placeholder) until the practice confirms.

Each exam object keeps the **existing schema** (so `ExamDetail.jsx` needs zero
changes for the standard exams): `id, name, indef, category, headline,
reassurance, why, symptoms, desc, whatIs[], videoId, symptomPills[],
symptomContext, steps[], preparation[], prevention[], faq[], doctorSlugs[],
placeholder`.

### 1b. Doppler hub — the one new template variation

The 6 Dopplers share doctor (Dr Hakem), format, and tone → **one page, six
subsections** instead of six thin pages. Two build options (consult friend):
- **Option A — anchored sections:** a left in-page nav (TSA, MI, rénales, aorte,
  MS, veineux) scrolling to 6 stacked blocks. Best for SEO + scannability.
- **Option B — accordion:** 6 collapsible rows using the existing FAQ-accordion
  mechanics. Most compact.

Implementation: add a `subExams[]` array to the `doppler-vasculaire` service and
branch `ExamDetail.jsx` once: `if (exam.subExams) renderDopplerHub()`. Standard
exams are untouched.

### 1c. Homepage `#examens` grid — group, don't dump

12 cards in a flat grid overwhelms. Add lightweight **category sub-headers** in
`Services.jsx` (data-driven via the existing `category` field), grouped as:
- **Cœur — diagnostic** : ECG, Échographie cardiaque, Épreuve d'effort
- **Holters (ambulatoire)** : Holter rythmique, Holter tensionnel
- **Vasculaire** : Doppler vasculaire (hub)
- **Sommeil** : Polygraphie

Cards, reveal, hover behavior all reuse the current `ServiceCard`.

### 1d. Header dropdown
`EXAM_LINKS` auto-derives from `SERVICES` (`Header.jsx:7`) → updates for free.
Consider grouping the dropdown by the same categories if it gets long.

### Acceptance criteria
- All 12 exams reachable; renamed exams keep working URLs.
- `#examens` grid grouped, responsive (1/2/3 cols), reveal intact.
- Doppler hub renders 6 subsections; standard exams visually unchanged.
- Unvalidated figures carry `// TODO: validation médicale`.

### ASSET SHOT-LIST (WP1)
| Slot | Type | Status | Gemini prompt seed |
|------|------|--------|--------------------|
| ECG explainer | video | needed | "Calm clinical explainer: resting ECG, electrodes on chest, French cardiology cabinet, warm burgundy/cream palette" |
| ETT explainer | video | needed | "Heart ultrasound (echocardiography) probe on chest, no irradiation, reassuring tone" |
| Épreuve d'effort | video | needed | "Stress test on treadmill/bike under medical supervision, ECG + BP monitoring" |
| Doppler vasculaire | video | needed | "Vascular Doppler ultrasound of neck/legs, probe gliding, blood-flow visualization" |
| Doppler hub hero image | image | needed-if-no-gallery | "Editorial close-up of Doppler probe on skin, soft warm light, premium medical" |

---

## WP2 — Practitioners (+ Dr Sofiane)

### 2a. Add Dr Sofiane to `DOCTORS`
New entry (cardiologue). Needs from practice: full name, title, credibility line,
bio, timeline, photo. Until photo arrives, use `photoPlaceholder: true`
(silhouette) — pattern already exists (Dr Taha).

### 2b. Dr Amraoui positioning
Append to her bio/highlight: *précurseur des ablations de FA en hospitalisation
ambulatoire en France* + *ablation par électroporation 3D* (mark both
`// TODO: validation médicale`, per §12).

### 2c. Photo order
Reorder `DOCTORS` to: Amraoui → Doguet → Berdah → **Sofiane** → Hakem.
(⚠️ Adam Taha absent from the brief's photo list but present in mapping — keep on
`/equipe`, confirm placement — see Open Decisions.)

### 2d. The 6-doctor V-formation problem (homepage `NotreConseil.jsx`)
The V is hard-coded for 5 (`V_ORDER = [p0, p1, founder, p2, p3]`). With 6 doctors
this breaks. Options (consult friend — this is the key visual call):
- **Option A:** Homepage V shows a curated **5** (founder + 4), `/equipe` shows
  all 6. Keeps the iconic V; simplest.
- **Option B:** Redesign to a balanced **6** layout (e.g. 3+3 arc, or apex + 5
  arc). More faithful, more work, risk of losing the V signature.
- **Option C:** Keep founder apex + show partners as an even row below.

Also update copy: **"Cinq spécialistes" → "Six spécialistes"** and the specialty
list sentence (`NotreConseil.jsx:124–131`).

### 2e. Re-wire exam ↔ doctor mapping
Update each exam's `doctorSlugs[]` per brief §9:
- Amraoui: ECG, ETT, Holter tensionnel, Holter rythmique, polygraphie, (cardio +
  rythmo consults later).
- Sofiane: ECG, ETT (cardio consults).
- Hakem: Doppler hub.
- Taha / Doguet / Berdah: surgical/nutrition — shown as static tags on their
  profiles (no ambulatory exam link), as today.

### Acceptance criteria
- 6 doctors on `/equipe`, correct order; Sofiane profile renders (placeholder
  photo OK).
- Homepage team section renders cleanly with 6 (per chosen option), copy says six.
- Exam "Réalisé par" sections show the right doctors.

### ASSET SHOT-LIST (WP2)
| Slot | Type | Status | Note |
|------|------|--------|------|
| Dr Sofiane portrait | image | needed | Match existing portrait crop/treatment; placeholder until real photo |

---

## WP3 — Homepage new sections (brand story + specialties + risk factors)

All sections live on `/` (Home.jsx) — **no new pages.** Insert into the existing
scroll narrative.

### 3a. Hero rewrite (`Hero.jsx`)
Keep layout; update eyebrow/headline/subtitle to the brief's welcome + value
("centre médical de cardiologie au cœur de Paris", prevention). Trust bar stays.

### 3b. "Pourquoi Cardio Check-up" — new section
Prevention mission + connected/AI cabinet + design environment (brief §1).
Composition: eyebrow + h2 + 2-col text/visual, or 3 value cards (Prévention /
Médecine personnalisée / Environnement). Reuse card styling from
`ExamDetail` prevention cards. ⚠️ AI claims → keep modest, `// TODO: validation`.

### 3c. "Nos spécialités" (8) — new section
8 compact cards (icon + title + 1-line). Each links to the most relevant exam or
the team. **Avoid redundancy** with the exams grid (specialties = the *what we
treat* lens; exams = the *how we test* lens). Consult friend on placement &
differentiation.

### 3d. "Facteurs de risque" (7) — new section
Reference band: 7 factors, each with how-it's-diagnosed + target figure. Best as
a clean responsive table or 7 mini-cards. All figures `// TODO: validation`.
Could alternately live at the foot of the HTA pathology page — default: a concise
homepage band linking to deeper pathology reads.

### 3e. FAQ expansion (`FAQ` in site.js)
Add Q&A from new exams (ECG, ETT, Doppler, stress test) to the global homepage
FAQ. Mechanics unchanged.

### Home section order (proposed narrative)
```
Hero (rewritten)
Pourquoi Cardio Check-up        ← new (mission)
Nos Spécialités (8)             ← new (what we treat)
Notre Conseil (team, "six")     ← updated
Nos Examens (12, grouped)       ← updated (how we test)
Facteurs de risque (7)          ← new (prevention reference)
Réassurance
FAQ (expanded)
Actualités (+ pathologies)
```
(Consult friend on this IA / scroll order.)

### ASSET SHOT-LIST (WP3)
| Slot | Type | Status | Gemini prompt seed |
|------|------|--------|--------------------|
| "Pourquoi" section visual | image | needed-if-no-gallery | "Architectural, light-filled modern cardiology cabinet, warm cream + burgundy accents, calm premium" |
| 8 specialty icons | SVG/icon | reuse/needed | Prefer line-icons in brand style (stroke 1.6, burgundy) |

---

## WP4 — Consultations page (1 new route)

Single page `/consultations` listing the ~10 motifs (brief §5) as an **accordion**
(reuse FAQ-accordion mechanics) or grouped cards. Each item: title + the brief's
paragraph + a "Prendre rendez-vous" CTA (`openBookingModal({ reason })`).
Add `CONSULTATIONS[]` to `site.js`. Add nav entry (WP6).

Includes: cardiologie, rythmologie, douleur thoracique, dyspnée, valvulopathie,
insuffisance cardiaque, chirurgie cardiaque, chirurgie vasculaire, bilan
nutritionnel, vitaminothérapie. (+ Bilan cardiovasculaire if moved here.)

**Acceptance:** one scannable page; each motif expandable; booking CTA prefills
reason; SEO + breadcrumb present.

---

## WP5 — Pathologies (reuse the Article engine)

Disease pages are long-form education → **reuse `ArticleBody` block schema**, no
new renderer. File them under a new **"Pathologies"** category with a dedicated
`/pathologies` listing (clone of `Actualites.jsx` filtered to that category, or a
shared listing with a category param).

- Add `'Pathologies'` to `POST_CATEGORIES` (or a separate `PATHOLOGIES[]` array
  reusing the same block schema + a `getPathologies()` helper — cleaner
  separation from news; **recommended**).
- Author 3 pages from brief §7 as block arrays: **Fibrillation atriale**,
  **Syndrome d'apnée du sommeil**, **Hypertension artérielle**.
- Fold the symptom guides (§6) into the matching disease intros + global FAQ.
- Mark all epidemiology/claims `// TODO: validation médicale` (montres
  connectées, ablation ambulatoire, électroporation 3D — explicitly flagged §12).
- Cross-link: pathology → related exam(s) + the consult + the treating doctor.

**Acceptance:** 3 pathology reads render via ArticleBody; `/pathologies` lists
them; cross-links resolve; urgent `tip tone:urgent` used for red-flag callouts.

### ASSET SHOT-LIST (WP5)
| Slot | Type | Status | Note |
|------|------|--------|------|
| FA cover | image | needed | reuse `rythmo-tee.jpg`? else generate |
| Apnée cover | image | needed | sleep/respiration motif |
| HTA cover | image | needed | blood-pressure cuff motif |
| Inline diagrams (optional) | image | nice-to-have | e.g. pulmonary-vein isolation schematic |

---

## WP6 — Navigation + information architecture

Update `NAV` in `site.js`. Current: Accueil · Notre Équipe · Nos Examens▾ · FAQ ·
Actualités. Proposed additions without crowding the bar:
- Add **Consultations** and **Pathologies** — likely by expanding/renaming the
  "Nos Examens" dropdown into a **"Soins & Examens"** mega-menu, or adding a
  second dropdown. (Consult friend — bar real-estate is tight at 6+ items.)
- Mobile menu auto-inherits (it maps `NAV`).

---

## WP7 — QA / accessibility / validation sweep

- Responsive pass (mobile/tablet/desktop) on every new section.
- `prefers-reduced-motion` respected (reuse existing patterns → free).
- Keyboard + aria on accordions, dropdowns, hubs.
- Lighthouse/perf check (lazy images, no CLS).
- **Validation report:** collect every `// TODO: validation médicale` into a
  checklist for the practice to sign off before go-live (per brief §12).
- Confirm spelling "Amraoui" + "Cardio Check-up" hyphenation site-wide.

---

## 2. Open decisions (block clean execution — resolve before/within each WP)

1. **Bilan cardiovasculaire** — move to Consultations (recommended), keep as exam,
   or drop? *(blocks WP1 final list)*
2. **Rythmologie interventionnelle** — keep placeholder exam, fold into FA
   pathology page, or drop? *(WP1)*
3. **Dr Adam Taha** — absent from brief's photo order but in mapping. Keep at
   end of `/equipe`? Confirm order. *(WP2)*
4. **Name spelling** — "Amraoui" (current site, recommended) vs "Amaraoui"
   (Notion title). *(global)*
5. **V-formation** — Option A/B/C for 6 doctors. *(WP2, consult friend)*

---

## 3. Design consultations for your friend (paste-ready prompts)

Send these to your UX/UI friend at the matching WP. Bring back text or mockups;
I'll compare against my approach and we take the stronger one.

### Consult #1 — Homepage information architecture (before WP3)
> "Medical cabinet site (cardiology, Paris). Premium warm palette: burgundy
> #7B1C42, gold #C9A96E accent, cream #F5F0E8 canvas, serif display
> (Cormorant) + Inter body. It's a single long-scroll homepage. We're adding
> 3 new sections to the existing ones. Proposed order: Hero → Pourquoi
> (mission) → Nos Spécialités (8) → Équipe → Nos Examens (12, grouped) →
> Facteurs de risque (7) → Réassurance → FAQ → Actualités. Question: is this
> the most intuitive scroll narrative for a patient deciding to book? Would you
> reorder, merge, or cut any section to reduce redundancy between 'Spécialités'
> (what we treat) and 'Examens' (how we test)? Sketch or describe."

### Consult #2 — "Spécialités vs Examens" differentiation (WP3)
> "Same site. We have 8 medical specialties AND 12 exams — they overlap
> conceptually (e.g. 'Rythmologie' specialty vs 'Holter rythmique' exam). How
> would you visually and structurally differentiate these two sections so a
> patient isn't confused, without making the homepage feel repetitive? Card
> style, iconography, linking strategy?"

### Consult #3 — 6-doctor team layout (WP2)
> "Premium cardiology site. The homepage team section is currently an elegant
> 'V-formation': 5 doctor portraits in a shallow V, founder at the apex
> (tallest, center), 2 partners stepping down on each side, masked with a soft
> bottom fade, names+specialty on a scrim. We're adding a 6th doctor and it
> breaks the symmetric V. Three options: (A) show a curated 5 on home, all 6 on
> the team page; (B) redesign for a balanced 6 (3+3 arc? apex + 5?); (C) founder
> apex + even row of 5 below. Which preserves the premium signature best?
> Mockup welcome."

### Consult #4 — Doppler hub layout (WP1)
> "One page presenting 6 near-identical vascular Doppler exams (neck, leg
> arteries, kidney, aorta, arm arteries, leg veins) — same doctor, same format,
> ~2 short paragraphs each. Anchored in-page nav with 6 stacked sections, or a
> 6-row accordion, or tabs? Optimizing for scannability + SEO on a warm,
> premium medical site. Recommendation + why."

### Consult #5 — Nav for 6+ top-level items (WP6)
> "Top nav currently: Accueil · Notre Équipe · Nos Examens (dropdown) · FAQ ·
> Actualités. We must add 'Consultations' and 'Pathologies'. Bar is getting
> crowded on desktop. Mega-menu under a renamed 'Soins & Examens'? Second
> dropdown? Reorganize how? Keep it calm and premium, not corporate."

---

## 4. How we'll work
1. You approve this plan (or adjust order/decisions).
2. We do **WP1 first**, together, in small reviewable steps.
3. At each design-decision point I'll pause and give you the friend-consult
   prompt; you bring the response; we pick the stronger direction.
4. Each WP ends with its asset shot-list so you can batch Gemini generation.
5. Nothing ships past the validation gate (§12) without practice sign-off.
