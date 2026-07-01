# Validation checklist — before go-live

Everything below must be confirmed by the practice (medical + editorial) before
the site is published. Each item is also marked `// TODO: validation médicale` in
the code at the location shown. Tick each box once validated.

---

## A. Medical figures (epidemiology & therapeutic targets)

- [ ] **17,9 M** — CVD deaths worldwide / year
  *Homepage "Pourquoi Cardio Check-up"* · `src/components/Pourquoi.jsx`
- [ ] **7 risk-factor target numbers** — tension < 135/85, HbA1c < 7 %, LDL selon le risque,
  IMC < 25, tour de taille < 94 cm (H) / 80 cm (F), ≥ 150 min/semaine, arrêt du tabac
  *Hypertension page — "Sept facteurs à surveiller"* · `src/data/site.js` (RISK_FACTORS)
- [ ] **Fibrillation atriale prevalence** — 750 000 en France, 110 000–230 000 nouveaux cas/an,
  2–4 % après 60 ans, > 10 % au-delà de 80 ans
  *Pathologie FA* · `src/data/site.js` (PATHOLOGIES)
- [ ] **Apnée du sommeil prevalence** — 4–10 % des adultes, ~8 patients/10 non diagnostiqués
  *Pathologie SAOS* · `src/data/site.js`
- [ ] **Hypertension prevalence** — ~17 millions en France, ~30 % des adultes
  *Pathologie HTA* · `src/data/site.js`

## B. Clinical claims to validate

- [ ] **AI at the cabinet** — confirm the *real* uses of "intelligence artificielle"
  (dépistage / analyse / suivi); keep realistic, no over-promise
  *Homepage "Pourquoi" — pilier Innovante* · `src/components/Pourquoi.jsx`
- [ ] **Dr Amraoui positioning** — "précurseur des ablations de FA en hospitalisation
  ambulatoire en France" + "ablation par électroporation 3D"
  *Dr Amraoui profile + FA pathologie* · `src/data/site.js`
- [ ] **Montres/bracelets connectés** — the connected-watch FA-screening mention
  *Pathologie FA* · `src/data/site.js`
- [ ] **Urgent-triage wording** — the "15 (SAMU) / 112" guidance (FAQ + urgency band)
  is appropriate as written

## C. Content to re-read / rewrite

- [ ] **Épreuve d'effort** — the client flagged the source text as partially corrupted;
  re-read and confirm the exam copy
  *Exam page* · `src/data/site.js` (SERVICES, id 'epreuve-effort')

## D. Editorial / naming (brief §12)

- [ ] **Spelling** — confirm **"Dr Amraoui"** vs "Amaraoui" everywhere (site currently uses "Amraoui")
- [ ] **"Cardio Check-up"** — confirm hyphenation is consistent site-wide
- [ ] **Practitioner titles & specialties** — confirm exact wording (Dr / Pr, diplômes)
- [ ] **Vitaminothérapie** — the "carence avérée par bilan biologique" nuance is kept (it is)

## E. Pending data & assets from the practice

- [ ] **Dr Sofiane** — full name/surname, bio, diplômes, timeline, and **photo**
  (currently "Photo à venir" placeholder)
- [ ] **Exam explainer videos** — ECG, Échographie cardiaque, Épreuve d'effort, Doppler
  vasculaire (to generate; template already has a graceful poster placeholder)
- [ ] **Pathology cover images** — FA / Apnée / HTA currently reuse existing photos as placeholders
- [ ] **"Nos Spécialités" (8)** — decide whether to add a dedicated section
  (see `content/QUESTIONS-FOR-CLIENT.md`, question 1)

---

*Generated as part of WP7. To regenerate the code-flagged items, run:*
`grep -rn "TODO: validation" src/`
