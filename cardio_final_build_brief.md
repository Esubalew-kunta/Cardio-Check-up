# Cardio Check-up — Final Build Brief
**To:** Claude Code  
**From:** Lead Designer  
**Date:** June 2026  
**Stack:** React 18 · Vite · Tailwind CSS v4 · Framer Motion · React Router v6  
**Deploy:** Render.com

---

## Context

You already have the full codebase. This brief supersedes all previous documents. Build exactly what is described here. The visual reference is the mockup produced in the design session — replicate it faithfully.

---

## Brand tokens — locked, never change

```
Burgundy:      #7B1C42   (primary surfaces, nav, section eyebrows)
Burgundy deep: #5C1030   (dark sections, footer, overlays)
Gold:          #C9A96E   (accents only — dots, dividers, rings, numbers)
Gold deep:     #A8854D   (decorative numerals on light backgrounds)
Cream:         #F5F0E8   (main light section background)
Cream soft:    #EFE7D8   (alternating light section background)
Off-white:     #FAF7F2   (text on dark surfaces)
Ink:           #2C1810   (body text on light)
Muted:         #8C8275   (captions, secondary text)
Signal red:    #C0392B   (CTAs and ECG line only — nowhere else)

Display font:  Cormorant Garamond (headings, doctor names, large numerals)
Body font:     Inter (all body copy, labels, nav, UI elements)
```

**Typography rules:** Never use the double hyphen (--) in any rendered text. Use an em dash (—) or rewrite the sentence. Never introduce new fonts.

---

## Site architecture

```
/                           Homepage
/equipe                     Team overview
/equipe/[slug]              Doctor profile (×5)
/examens/[slug]             Exam detail (×5)
/404                        Not found page
```

**Exam slugs:** `bilan` · `holter-ecg` · `mapa` · `polygraphie` · `rythmologie`  
**Doctor slugs:** `sana-amraoui` · `thomas-martin` · `claire-bernard` · `paul-moreau` · `isabelle-fabre`

All data lives in `src/data/site.js`. Extend it to include doctors array and per-exam steps, symptoms, video IDs, preparation notes, prevention tips, and per-exam FAQ. Single source of truth for all templates.

---

## Global elements (every page)

### Navigation
Fixed top. Transparent on load, transitions to `#5C1030/95` with backdrop blur after 24px scroll. Height 64px desktop, 56px mobile.

Logo left: "Cardio Check-up" in Cormorant Garamond + "Paris 17 · Hôpital Américain" in tiny gold tracked caps below.

Nav links centre (desktop only): Accueil · Notre Équipe · Nos Examens (with dropdown listing 5 exam names) · FAQ

CTA right: "Prendre rendez-vous" pill button in signal red.

Mobile: hamburger opens full-screen burgundy overlay with large serif nav links and the red CTA button. Escape key and backdrop tap close it.

### Footer
Four-column grid on `#5C1030`. Columns: brand tagline + social icons · Adresses (both locations with metro pills) · Contact (phone, email, Doctolib link) · Nav links + legal links. Copyright bar below. Urgency disclaimer sits immediately above the footer on every page in a signal-red left-bordered band: "En cas d'urgence cardiaque, composez le 15 (SAMU) ou le 112."

### Floating buttons
Bottom right stack. Top: phone button (burgundy circle). Bottom: AI chat button (signal red circle with a small heart + chat composite icon). On hover, AI button expands a label: "Quel examen me convient ? Parlez à notre assistant". On click: small modal with holding text "Notre assistant IA arrive bientôt. En attendant, appelez-nous au 07 55 50 52 58." The modal shell must be easy to swap for a live chat later.

### Mobile booking bar
Appears after scrolling past the hero. Cream background, gold top border. Two buttons: signal-red "Prendre rendez-vous" + phone icon. Hidden on desktop.

### Booking modal
Unchanged from current code. Triggered via `openBookingModal()`. Webhook to existing n8n endpoint. Add: RGPD consent checkbox, loading state during submit, clear success and error states.

### Page load animation
On cold load only (sessionStorage flag to skip on return visits). Full-screen `#5C1030` overlay. ECG heartbeat path draws across the centre in signal red (SVG stroke-dashoffset, ~1.2s). Logo fades in beneath it at ~1s. Overlay fades out at ~1.8s. Non-blocking: page renders beneath it. Fully skipped if `prefers-reduced-motion` is set.

### Scroll to top on route change
Implement this. React Router does not do it automatically.

### Per-route meta
Each page gets its own `<title>` and `<meta name="description">`. Use react-helmet or equivalent.

### SEO structured data
`index.html` already has `MedicalClinic` JSON-LD for Dr. Amraoui. Extend: add `Physician` schema per doctor page, `MedicalProcedure` schema per exam page. Add `hreflang` fr tag. Generate a `sitemap.xml`.

### Scroll reveal animation
All section blocks use the existing `.reveal` CSS class (opacity 0 → 1, translateY 28px → 0, 0.7s ease). Already in `index.css`. Apply it to all new sections. Respect `prefers-reduced-motion`.

---

## Page 1 — Homepage `/`

### S1 — Hero (locked — do not change structure)
Full-screen, `min-height: 100vh`. Background image `hero-reception.jpg`, full cover. Two gradient overlays: heavy burgundy left-to-right, soft burgundy bottom-to-top. Content left-aligned, max-width container.

Content (top to bottom):
- Eyebrow: "Cardiologie & Rythmologie · Paris 17" — gold, tracked caps, small
- H1: "La santé de votre cœur est notre priorité." — Cormorant Garamond, very large, off-white
- ECG line animation (existing `EcgLine` component) — signal red, draws and redraws continuously
- Subtitle paragraph — off-white/85, readable, max-width constrained
- Trust bar (3 items with gold dots): "Conventionnée Secteur 2" · "Hôpital Américain de Paris" · "Formation internationale" — separated by a thin top border from the text above

**The booking button is removed.** No CTA in the hero.

### S2 — Notre Conseil
Background: cream `#F5F0E8`.

Top: centred heading block.
- Eyebrow: "Notre Conseil" — burgundy, tracked caps
- H2: "Cinq cardiologues. Une mission." — Cormorant Garamond, large
- Body: 2 to 3 sentences positioning the council. Plain French. No jargon.

Below the text: V-formation of 5 doctor portraits. No card frames, no white boxes. Portraits sit directly on the cream background. Each portrait uses a CSS mask fading to transparent at the bottom edge so doctors appear to stand on the section. Name and specialty text overlaid at the bottom of each portrait on a dark scrim (always visible, brightens on hover).

**V geometry (desktop):** Dr. Amraoui centred and tallest. Two doctors each side, each shorter and lower than the one before. Roughly: outer wings at 65% height, inner wings at 80% height, apex at 100% height. Dr. Amraoui has a thin gold border ring on her portrait. All other rings appear only on hover.

**Hover:** Hovered portrait lifts (translateY -14px, scale 1.06, Framer Motion). All other portraits dim (brightness 0.58, saturate 0.6). Name and specialty brighten to full opacity. Gold ring goes full opacity.

**Click:** Navigate to `/equipe/[slug]`.

**Stagger in:** Portraits animate from below on scroll reveal. Apex first, then inner, then outer. 80ms between each.

**Mobile:** V collapses to horizontal scroll strip. All portraits equal width ~110px. A partially visible sixth element at the edge signals scrollability.

Below the portraits: quiet text link centred — "Rencontrer notre équipe →" — burgundy, underlined, no button.

**No stats in this section.** Stats live only on Dr. Amraoui's profile page.

### S3 — Nos Examens
Background: cream soft `#EFE7D8`.

Left-aligned section heading. Same 5-card grid as current code. Visual design of cards is unchanged. The only change: bottom CTA on every card reads "Découvrir cet examen →" and links to `/examens/[slug]`. The booking modal is no longer triggered from cards.

Card 05 (Rythmologie interventionnelle) keeps its amber "Contenu provisoire" badge. It spans 2 columns as before.

### S4 — Slim reassurance strip
Background: `#5C1030` (deep burgundy). Three columns. No animation needed here, just text.

- Column 1: "Indolore" large in Cormorant Garamond gold, label below in small tracked off-white/55: "Tous nos examens sont sans douleur"
- Column 2: "10 min" — "Pose de l'appareil par l'assistante médicale"
- Column 3: "Jour J" — "Résultats commentés le jour même"

This replaces the removed Parcours section.

### S5 — FAQ
Unchanged from current code. Global questions only.

---

## Page 2 — Team overview `/equipe`

### Hero band
Short, not full screen. Background `#5C1030`. Padding top 80px to clear fixed nav.
- Breadcrumb: "Accueil › Notre Équipe" — small, muted off-white
- Eyebrow: "Notre Conseil" — gold, tracked caps
- H1: "Rencontrez notre équipe de cardiologues" — Cormorant Garamond, large, off-white

### Founder feature block
Background: cream. Two columns: portrait left (42%), credentials right (58%).

Left: portrait photo, tall, rounded corners, gold border ring.

Right (top to bottom):
- Gold badge pill: "Thought leader · EHRA 2026"
- H2: "Dr. Sana Amraoui" — Cormorant Garamond
- Specialty line: small, gold-deep, tracked caps
- Bio paragraph: 3 sentences, warm, plain French
- Exam tags as small burgundy pills
- "Voir le profil complet →" link in signal red

### Partners grid
Background: cream soft. Two columns, two rows (4 partner doctors). Each partner card: portrait thumbnail + name + specialty + exam pills + "Voir le profil →" link. Clean, consistent, no heavy borders.

### CTA strip
Background: `#7B1C42`. Text left: "Prendre rendez-vous" in large serif off-white + small subtitle with phone number. Button right: signal red pill.

---

## Page 3 — Doctor profile `/equipe/[slug]`

One template, five instances. Dr. Amraoui gets real content. Others get demo content with same structure.

### Breadcrumb
"Accueil › Notre Équipe › Dr. [Name]" — small muted text, top of page below nav.

### S1 — Doctor hero
Background: cream. Two columns: portrait left (42%), credentials right (58%).

Portrait: full-column height, rounded corners, no hard frame. Image fills the space.

Right column top to bottom:
- Specialty eyebrow — burgundy, tracked caps
- H1: full name — Cormorant Garamond, very large
- Credibility line: one sentence, muted — where they work, their role
- For Dr. Amraoui only: gold badge pill "Chairperson EHRA 2026"
- Bio: 3 to 4 sentences, warm, no jargon

### S2 — Academic timeline
Background: cream soft. Label "Parcours académique". Year on the left in Cormorant Garamond gold-deep, diploma text on the right. Collapsible on mobile (show first 2, expand on tap). Open by default on desktop.

### S3 — Stats (Dr. Amraoui only)
Background: cream. Three columns divided by gold/30 vertical lines, bordered top with gold/28.

- "EHRA 2026" in large Cormorant Garamond gold — "Chairperson de l'European Heart Rhythm Association"
- "3" — "Publications JACC, Europace, Heart Rhythm"
- "9 000" — "Consultations humanitaires par an au Maroc"

Numbers use the existing `useCountUp` hook triggered by IntersectionObserver. Generous padding. Let the numbers breathe. Do not render this block on any other doctor's page.

### S4 — Examens réalisés
Background: cream soft. Label in burgundy tracked caps. Horizontal scroll strip of small cards, one per exam this doctor performs. Each card: exam name, 1-line description, "En savoir plus →" link to `/examens/[slug]`.

### S5 — Booking CTA strip
Same CTA strip pattern. "Prendre rendez-vous avec Dr. [Name]". Signal red button opens booking modal.

---

## Page 4 — Exam detail `/examens/[slug]`

One template, five instances. Use Holter ECG as the primary example. All content comes from `site.js`.

### S1 — Exam hero band
Background: cream `#F5F0E8`. Not full screen. Calm, not dramatic.

- Breadcrumb: "Accueil › Nos Examens › [Exam name]"
- Eyebrow: exam category in burgundy tracked caps
- H1: plain-language headline (not the medical name). Examples:
  - Holter ECG → "Un enregistreur porté 24h qui veille sur votre rythme cardiaque"
  - MAPA → "Surveiller votre tension artérielle sur 24 heures, chez vous"
  - Bilan → "Un bilan complet de la santé de votre cœur, en un rendez-vous"
  - Polygraphie → "Dépister les apnées du sommeil depuis votre domicile"
  - Rythmologie → "Traiter les troubles du rythme cardiaque complexes"
- Subtitle: one short reassurance line. Muted ink. Example: "Examen indolore · Pose en 10 minutes · Résultats commentés par votre médecin"

### S2 — What is this exam + video
Background: cream. Two columns.

Left: heading "Qu'est-ce que c'est ?" in burgundy tracked caps. Plain-language explanation below. 3 to 5 sentences. No medical jargon. Patient-facing tone.

Right: YouTube embed, 16:9 ratio, rounded corners 12px. Until real video IDs are provided, render a placeholder: dark rounded rectangle with a gold play circle and label "Voir la vidéo explicative".

### S3 — Symptom pills + condition context
Background: cream soft. Heading "Signes évocateurs" in burgundy. Row of pill badges: rounded, `rgba(123,28,66,0.08)` fill, burgundy text, gold dot left. Below pills: one paragraph of plain French describing what conditions this exam detects.

### S4 — Your 4-step visit (exam-specific)
Background: `#5C1030` with a background image overlay at 85% opacity (use `consultation.jpg` as in the original Parcours section). This is the most visually dramatic section on the page.

Eyebrow: "Votre visite" — gold tracked caps.
H2: "Comment se déroule le [exam name] ?" — Cormorant Garamond, large, off-white.

Vertical timeline with animated gold line. Steps are exam-specific, not generic. The line draws on scroll using Framer Motion scaleY. Each step: numbered node (burgundy filled when active, transparent when not), step title in Cormorant Garamond off-white, step description in small off-white/75.

Example steps for Holter ECG:
1. "Pose de l'appareil" — "L'assistante médicale installe les électrodes en 10 minutes."
2. "Port à domicile" — "Vous vivez normalement pendant 24h à 2 semaines selon la prescription."
3. "Restitution du Holter" — "Vous rapportez l'appareil au cabinet à la date convenue."
4. "Résultats commentés" — "Votre médecin analyse l'enregistrement et vous communique les résultats."

### S5 — Comment se préparer
Background: cream soft `#EFE7D8`. Heading in ink bold. Bulleted list of preparation instructions (2 to 4 items). Signal red dot bullets. Plain instructions. Example for Holter ECG: no showering with device, note symptom timing in a diary, do not stop the device.

### S6 — Doctors who perform this exam
Background: cream. Heading "Réalisé par" in burgundy tracked caps. Row of 2 to 3 doctor mini-cards: portrait circle, name, specialty, "Voir le profil →" in signal red. Links to `/equipe/[slug]`.

### S7 — Booking CTA strip
Background: `#7B1C42`. Text: "Prendre rendez-vous pour un [exam name]" in Cormorant Garamond off-white. Subtitle: locations and hours. Signal red button: "Réserver". This CTA comes before prevention tips so a ready patient is not distracted before converting.

### S8 — Prevention tips
Background: cream soft. Heading "Conseils de prévention" in burgundy tracked caps. Three cards in a row: icon (Tabler outline), bold title, 2-line text. Warm, practical, not clinical. Positioned after the CTA deliberately.

### S9 — Exam-specific FAQ
Background: cream. Same accordion component as homepage FAQ. 3 to 4 questions specific to this exam. Not the same questions as the global FAQ. Questions come from `site.js` per-exam FAQ array.

---

## Responsiveness

Design is desktop-first but fully mobile-optimised.

Key breakpoints:
- Mobile: below 640px
- Tablet: 640px to 1024px
- Desktop: above 1024px

Specific rules:
- V-formation collapses to horizontal scroll strip on mobile with a peek-hint at the right edge
- Doctor hero (profile page) stacks vertically on mobile: portrait full width top, credentials below
- Founder feature block stacks vertically on mobile: portrait top, credentials below
- Partners grid goes 1 column on mobile
- Exam detail two-column (text + video) stacks on mobile: text top, video below
- 4-step timeline stays vertical on all breakpoints (it is already vertical)
- Prevention tips go 1 column on mobile
- Footer grid collapses to 2 columns on tablet, 1 column on mobile
- All tap targets minimum 44px height
- Nav becomes hamburger below 1024px

---

## Animation summary

| Element | Behaviour | Notes |
|---|---|---|
| Page load ECG | Draws across screen on cold load, fades out | SessionStorage flag, ≤1.8s total, non-blocking |
| Hero ECG line | Continuous draw-and-reset loop | Existing component, unchanged |
| Section reveals | Fade up on scroll enter | Existing `.reveal` CSS class, apply everywhere |
| Doctor portraits (S2) | Stagger in from below on scroll | Framer Motion, apex first |
| Portrait hover | Lift + scale, others dim | Framer Motion whileHover, CSS :has() for dimming |
| Exam timeline line | Scales Y from top as user scrolls | Framer Motion scaleY with useScroll |
| Stats count-up | Numbers count up when scrolled into view | Existing useCountUp hook, Dr. Amraoui page only |
| FAQ accordion | Grid-row expand/collapse | Existing CSS transition |
| Nothing else | — | No parallax, no auto-play loops (except hero ECG), no page transitions |

All animations must be fully disabled or skipped when `prefers-reduced-motion: reduce` is set. This is non-negotiable for an anxious medical audience.

---

## Demo data (replace before go-live)

```
Dr. Thomas Martin       — Cardiologie générale       — slug: thomas-martin
Dr. Claire Bernard      — Échocardiographie          — slug: claire-bernard
Dr. Paul Moreau         — Holter et MAPA             — slug: paul-moreau
Dr. Isabelle Fabre      — Médecine du sommeil        — slug: isabelle-fabre
```

All portrait image slots use placeholder shapes (dark burgundy gradient rectangles with silhouette SVG). The image component should accept a real `src` and render the placeholder only when `src` is absent or null. No fake photography.

---

## Missing content (client to supply before launch)

- Real portrait photographs for all 5 doctors (light neutral background, consistent framing, upper body)
- Real names, bios, timelines for 4 partner doctors
- YouTube video IDs for each of the 5 exam explanations
- Exam-specific preparation instructions and prevention tips (draft versions in this brief are placeholders)
- Exact exam-to-doctor mappings (which doctor performs which exam)
- Doctolib links for each doctor individually

---

## Legal and compliance

- Mentions légales page: required in France, build a simple static page at `/mentions-legales`
- Politique de confidentialité page: required, build at `/confidentialite`
- RGPD consent checkbox on the booking form before submission
- Basic honeypot field on the booking form (hidden, checked server-side in n8n)
- Urgency disclaimer on every page: "En cas d'urgence cardiaque, composez le 15 (SAMU) ou le 112."
- AI chat tooltip must not imply clinical triage. Label it "Assistant de navigation" not "Diagnostic" or "Symptômes"

---

## What to build first

1. React Router setup, shared Layout component wrapping Header + Footer + floating buttons + booking modal + page loader
2. Extend `site.js` with full doctors and exams data structures
3. Exam detail template and all 5 exam pages (no photo dependency)
4. Homepage changes (remove hero button, replace About with Team section, update exam card CTAs, add reassurance strip)
5. Team overview page and doctor profile template
6. Legal pages and 404 page
7. SEO pass: per-page meta, JSON-LD structured data, sitemap
8. Accessibility audit and performance pass

---

*The visual reference is the interactive mockup produced in the design session. Match it precisely. The colour tokens, font pairing, section order, and interaction patterns described here are final.*
