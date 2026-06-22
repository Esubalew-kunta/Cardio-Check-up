# Cardio Check-up — Design Review & Counter-Proposal
**From:** Collaborating Senior UX/UI Designer (medical/healthcare web)
**Re:** Designer Handoff Brief v2.0
**Date:** June 2026
**Status:** Peer review. Disagreements are marked. Proposals are marked *PROPOSE*.

---

## 0. Read this first — the one thing I'd escalate before any build

The brief asks me to pressure-test the *design*. But there is a **strategy/ethics problem sitting underneath the design** that no amount of layout work can fix, and as the person being asked to put my name on the build, I have to raise it.

You are converting a real, single-doctor practice (Dr. Amraoui — real Doctolib URL, real address, real credentials in the code today) into a **"council of five cardiologists"** where **four of the five doctors do not exist yet** ("names pending", "placeholder content", "coloured placeholder shapes"). This is a **medical** site. The audience is making a **trust and health decision under stress**. The entire design thesis is "reduce anxiety by showing five real experts."

If we ship a V-formation of five portraits and four are invented or not-yet-real people, we are manufacturing trust signals on a healthcare site. That is the one move that can turn a polished site into a liability — for the patient (false credentialing), for Dr. Amraoui (medical advertising rules; in France the CNOM and the *Code de la santé publique* regulate what a practice may claim), and for us.

**My hard recommendation:** Do not publish the council framing until the four doctors are real, named, consented, and photographed. Until then, build the *architecture* (routes, templates, components) so it's ready, but ship the homepage in a **single-doctor-truthful** state, or behind a "Notre équipe s'agrandit" honest framing. Everything below assumes we get real doctors before launch; where it matters, I flag the placeholder risk again.

This isn't a design preference. It's the highest-severity item in the brief and it isn't in Section 10's "locked" list or Section 8's "content needed" list as a *blocker*. It should be the first checkbox in Section 11.

---

## 1. Honest critique — decision by decision

I'll go in brief order. ✅ = agree, ⚠️ = agree with changes, ❌ = disagree.

### Strategy & positioning
- **⚠️ The franchise/council pivot.** Sound *as a business direction*, risky *as a launch state* (see §0). The "law firm partners" mental model is the right one — but law firms don't invent partners. Hold the framing until the people are real.
- **✅ Dr. Amraoui as thought-leader anchor, others fully present.** Correct instinct. The V-formation with her as apex achieves this without a "founder" badge. Good restraint.
- **❌ "Stats live ONLY on Amraoui's profile" as a *locked* decision.** I understand the logic (they're her stats, not the council's). But removing *all* social proof from the homepage funnel is a measurable conversion loss. The homepage is where the anxious cold visitor lands; stripping every number from it to honor an org-chart purity rule is optimizing for internal tidiness over the patient. *PROPOSE:* keep **one** council-level proof line on the homepage (e.g. "~25 ans d'expérience cumulée · 2 sites · Hôpital Américain de Paris"), and move Amraoui's *personal* stats to her profile. Don't leave the homepage proof-free.

### Hero (locked)
- **✅ Keeping the hero locked.** Fine. It's the strongest asset and it tests well as a category.
- **✅ Removing the hero CTA button.** Agree, and it's a more sophisticated call than it looks — "let them orient before asking" is correct for anxious audiences. *But* this only works if a CTA reappears within the first scroll. Make sure the sticky mobile booking bar and a visible desktop "Prendre rendez-vous" in the header cover the early-intent user who *is* ready. Don't make a ready patient scroll the whole funnel.
- **⚠️ "Diplômée LSE & Bordeaux" trust bar.** Correct to flag it — it's now incongruous with a council. Replace it (copy in §3).

### Section 2 — Notre Conseil / V-formation
- **⚠️ The V-formation itself.** Visually it's a lovely idea and I like the no-card, gradient-mask, "standing on the cream" treatment. Three real concerns:
  1. **It depends entirely on five consistent, high-quality, background-matched portraits.** The brief admits these don't exist and proposes "coloured placeholder shapes." Five colored blobs in a V is not a centerpiece — it's a wireframe shipped to prod. This section *cannot* launch on placeholders the way the exam cards can. It's all-or-nothing on photography.
  2. **Staggered V heights + masks + per-portrait hover dim via `:has()` is fragile across the photo variance you'll actually get** (different crops, lighting, head sizes). Law-firm "partner" pages use *uniform* framing precisely because variance reads as amateur. *PROPOSE:* enforce a strict portrait spec (same aspect, same eye-line, same neutral bg) and consider whether the V's height variation actively fights that consistency. A subtle V (apex slightly raised, gold ring) gets you the hierarchy without dramatic height steps that amplify photo mismatch.
  3. **Accessibility of "name/specialty always visible but low opacity."** "Low-but-legible" over a photo scrim is exactly where WCAG contrast quietly fails. Specify a real contrast target (≥4.5:1 for the name at rest, not just on hover). Don't let "elegant" mean "unreadable at rest."
- **✅ Mobile: horizontal scroll strip with a peek hint.** Good, standard, works.
- **✅ Quiet text-link CTA instead of a button.** Agree — a button there would over-ask mid-funnel.

### Section 3 — Exam cards: CTA change only
- **✅ "Découvrir cet examen →" instead of opening the booking modal.** Correct. You shouldn't ask someone to book a Holter before they know what a Holter is. This is the single best structural decision in the brief.
- **✅ Keeping card visuals untouched, keeping the "Contenu provisoire" amber badge on card 05.** Honest and good. (This is the model for how to handle *all* placeholder content, by the way — including the four doctors.)

### Section 4 — Parcours removed, migrated into exam pages
- **✅ Conceptually right.** Generic "4 reassurance steps" is weak; per-exam steps are genuinely useful. The data is already shaped to support this.
- **⚠️ But you're removing a reassurance block from the homepage and replacing it with nothing.** The homepage funnel goes Hero → Council → Exams → FAQ. That's *people, catalogue, objections*. You've removed the "here's how easy and painless this is" beat from the main page entirely. *PROPOSE:* a slim, generic 3-step "Comment ça se passe" reassurance strip stays on the homepage (painless · 10-min fitting · results same day), and the *detailed per-exam* version lives on exam pages. Don't make the homepage rely on the user clicking into an exam page to ever feel reassured.

### Section 5 — FAQ unchanged + reused per-exam
- **✅ Reusing the accordion component with different content per exam.** Clean, the data already supports it.

### Page loader animation (5.6)
- **❌ A 2.8s blocking entrance animation on *every cold load*.** This is the decision I'd push back on hardest after the council-ethics issue. Reasons:
  - **It's an anxious medical audience.** Someone Googling "Holter ECG Paris urgent" at 11pm does not want 2.8 seconds of theatre between them and the phone number. Forced delay = friction for exactly the highest-intent, highest-anxiety users.
  - **Core Web Vitals / SEO.** A 2.8s curtain in front of content tanks LCP. For a practice that lives or dies on local search ("cardiologue Paris 17"), that's a real ranking and conversion cost.
  - **It repeats for returning users** unless you gate it. The brief says "only on true page load" but not "only once per session/visitor."
  - *PROPOSE:* Keep the ECG-draw concept but (a) **don't block** — let it play *over* already-rendered content, or as a ≤1.2s overlay; (b) **show it once per session** (sessionStorage flag), never again; (c) respect `prefers-reduced-motion` (already specified — good). The brand moment is worth ~1s, not ~3s, and never at the cost of LCP.

### Floating AI chat (5.3)
- **✅ Building a swappable Phase-1 shell.** Right call.
- **⚠️ "Quel examen me convient ? Parlez à notre assistant" → symptom triage by AI.** Be careful: an AI that "asks about symptoms and recommends a doctor/exam" is one bad prompt away from looking like **medical advice / triage**, which is regulated. For Phase 2, scope it explicitly as *navigation help* ("which page should I read?"), not *clinical* triage, and put a visible disclaimer. Worth deciding the framing *now* so the Phase-1 copy doesn't over-promise. The Phase-1 holding copy ("appelez-nous") is fine.
- **⚠️ Two stacked floating buttons (AI + phone) plus a mobile booking bar plus a header CTA.** On a small screen that's a lot of persistent floating chrome competing for the same thumb zone. Audit the mobile bottom-right: AI bubble + phone bubble + booking bar can collide. *PROPOSE:* on mobile, fold the phone action *into* the booking bar and keep only the AI bubble floating, or hide the floating stack while the booking bar is visible.

### Section 6 page structures
- **Team page (`/equipe`):** ⚠️ See §5 — I have an alternative layout.
- **Doctor profile:** ✅ Face-first split layout is correct HCI. Order is right. (Note: the timeline, stats, and count-up already exist in `About.jsx` — this is a migration, not new work.)
- **Exam pages:** ✅ The anxiety-reduction order is genuinely well thought out. One reorder + one missing block in §1 below and §6.

### Exam page block order — my one substantive reorder
The brief's order: hero → what is it + video → symptoms → **steps → doctors → prevention** → FAQ → CTA.

- **❌ "Prevention tips" before the FAQ/CTA.** Prevention advice is a *post-care* / *retention* message ("how to avoid needing this again"). Placed right before the booking CTA, it subtly tells an anxious patient "maybe you can lifestyle your way out of this" at the exact moment you want them to book. That's a conversion *and* a clinical-messaging misstep. *PROPOSE:* move prevention **below the CTA** (or onto the relevant exam's tail as a calm footer-adjacent block). The pre-CTA sequence should be: understand → reassure → see who → **book**. Prevention is a gift you give *after* the ask, not an off-ramp before it.
- **✅ Doctors block after steps.** Agree — "what happens" then "who does it" is the right order. The brief's own question (before or after steps?) — keep it after.
- **⚠️ Missing block: "Comment se préparer" (preparation).** The brief asks whether this deserves its own block. **Yes, unambiguously.** "Can I shower? Can I do sport? Do I need to fast?" is *pre-visit anxiety and a no-show preventer*. Burying it in FAQ means the patient finds out *after* booking, or not at all, and shows up unprepared. *PROPOSE:* a compact "Avant votre examen" block between the steps and the doctors block (or between doctors and CTA). It's also the highest-value content for reducing wasted appointment slots — a business win, not just UX.

### Animation framework (Section 7)
- **✅ The "every animation must earn its place / calm medical site" philosophy.** This is the right north star and most of the table honors it.
- **❌ The page loader (already covered) is the one item that violates its own framework** — a 2.8s autoplay curtain is exactly the kind of theatre the philosophy says to avoid.
- **✅ No parallax, no route transitions, no skeletons, no confetti.** All correct for the context.

---

## 2. Alternative proposals (grounded)

1. **Truthful launch state (highest priority).** Ship architecture-complete, content-honest. Single-doctor truth on the homepage until the council is real; exam-page split can ship now because the data already supports it.
2. **Keep one council-level proof line on the homepage** (not Amraoui's personal stats). HCI: social proof at the point of highest uncertainty (cold landing) is where it does the most work; the profile page audience is already further down-funnel.
3. **Slim generic reassurance strip stays on the homepage** (don't fully outsource reassurance to exam pages).
4. **Loader → ≤1.2s, once per session, non-blocking.** Protects LCP and the anxious high-intent user.
5. **Portrait spec before V-formation.** The V is only as good as photo consistency; lock the spec or soften the V.
6. **Prevention moves below the CTA; add a "Comment se préparer" block above it.**
7. **Mobile floating-chrome audit** so AI + phone + booking bar don't collide.

---

## 3. Hero copy — French proposals

The current H1 — *"La santé de votre cœur est notre priorité"* — is generic ("notre priorité" is on every clinic site in France). Here are options that keep the Cormorant register and lean council-without-being-corporate. All are launch-safe *only if the council is real*; otherwise use the single-doctor variants.

### Eyebrow (small, gold, tracked caps)
- *PROPOSE (primary):* **CARDIOLOGIE & RYTHMOLOGIE · PARIS 17 · NEUILLY**
  *(adds the second real site — Hôpital Américain — which is a genuine credibility signal, not invented)*
- Alt: **CABINET DE CARDIOLOGIE & RYTHMOLOGIE · PARIS**

### H1 (Cormorant Garamond, large)
- *PROPOSE (primary):* **« Prendre soin de votre cœur, avec l'exigence de l'excellence. »**
  *(warm verb "prendre soin" + "exigence/excellence" carries the premium-medical register without the generic "priorité")*
- Council-forward: **« Une équipe de cardiologues à l'écoute de votre cœur. »**
- More clinical/elegant: **« L'expertise du rythme cardiaque, au service de votre sérénité. »**
- Single-doctor-safe (if launching truthful): **« Votre cœur mérite une expertise d'exception. »**

My pick: the primary. "Prendre soin… avec l'exigence de l'excellence" is human *and* premium, and it's true whether it's one doctor or five.

### Subtitle (keep largely as-is, lightly council-ready)
- *PROPOSE:* **« Bilan cardiovasculaire, dépistage et suivi du rythme cardiaque. Paris 17 et Hôpital Américain de Paris. »**

### Trust bar — replacing "Diplômée LSE & Bordeaux"
The bar should carry **three institution-level (not person-level) signals** so it survives the council pivot:
- *PROPOSE:* **Conventionnée Secteur 2** · **Hôpital Américain de Paris** · **Équipe formée dans les meilleurs centres européens**
- Tighter alt for the third item: **Formation internationale** (the brief's own suggestion — fine, but a touch generic)
- If you want to keep a prestige anchor without naming one person: **Expertise reconnue en rythmologie**

My pick: *Conventionnée Secteur 2 · Hôpital Américain de Paris · Formation internationale* — all three are true at the institution level and none collapse when a fifth doctor joins.

---

## 4. Navigation — recommendation for a 12-page site

**Verdict: stay flat. Do not build mega-dropdowns. Add dropdowns only for "Nos Examens."**

Reasoning (HCI + this specific audience):
- 12 pages across 4 templates is **not** a lot. Mega-dropdowns earn their cost at 30–50+ pages with deep hierarchy. Here they'd add hover-intent complexity, mobile-accordion overhead, and accessibility surface area for almost no wayfinding gain.
- **Anxious users prefer fewer, clearer choices.** A dropdown that fans out 5 doctor names forces a *premature* decision ("which doctor?") before they've been told how to choose. The homepage council section and `/equipe` are *designed* to help them choose — sending them into a name-list dropdown short-circuits that.
- **Doctors should stay a single nav item.** Five names in a dropdown also re-exposes the placeholder problem in the chrome of every page.

**Recommended final nav:**

```
Accueil   Notre Équipe   Nos Examens ▾   FAQ            [ Prendre rendez-vous ]
                                  │
                                  ├─ Bilan cardiovasculaire
                                  ├─ Holter ECG
                                  ├─ MAPA (Holter tensionnel)
                                  ├─ Polygraphie nocturne
                                  └─ Rythmologie interventionnelle
                                  ─────────────
                                  Voir tous les examens →
```

- **One** dropdown, on "Nos Examens," because exams are a *known-item* search ("my GP told me I need a Holter") — a dropdown is a genuine shortcut there.
- "Notre Équipe" stays a plain link to `/equipe` (the page *is* the chooser; don't duplicate it in a menu).
- Keep the scroll behavior (transparent → burgundy/95 blur) as coded.
- **Mobile:** full-screen overlay menu, "Nos Examens" as an inline accordion, booking CTA pinned at the bottom of the sheet.
- Keep an HTML `<footer>` sitemap with all 12 links for SEO crawl + the user who wants the full map.

---

## 5. `/equipe` layout — my preferred treatment

I'd **reject the 2+2+1 grid.** A symmetric card grid reads as "catalogue," which is the exact opposite of "council." It also forces an awkward orphan row and flattens Amraoui into "one card that happens to have a gold ring."

*PROPOSE:* **"Founder feature + partners row"** — an editorial hierarchy that says *council led by a chair*, not *five equal SKUs*.

```
┌─────────────────────────────────────────────────────────────┐
│  Accueil › Notre Équipe                                      │   ← breadcrumb
│                                                               │
│  NOTRE CONSEIL                                    (eyebrow)   │
│  Rencontrez notre équipe de cardiologues          (H1)       │
│  Cinq spécialistes complémentaires…    (1–2 line intro)      │
└─────────────────────────────────────────────────────────────┘

┌───────────────────────────┬─────────────────────────────────┐
│                           │  CHAIRPERSON EHRA 2026  (gold)   │
│      [ Dr. Amraoui ]      │  Dr. Sana Amraoui                │
│      large portrait        │  Cardiologue rythmologue         │
│      gold ring             │  3–4 line bio…                   │
│                           │  Tags: Bilan · Rythmologie       │
│                           │  Voir le profil →                │
└───────────────────────────┴─────────────────────────────────┘
        ↑ featured row: founder gets a wide split, like her profile hero in miniature

┌──────────────┬──────────────┬──────────────┬──────────────┐
│  [Dr. 2]     │  [Dr. 3]     │  [Dr. 4]     │  [Dr. 5]     │   ← partners row
│  portrait    │  portrait    │  portrait    │  portrait    │      4 equal cards
│  name        │  name        │  name        │  name        │      uniform framing
│  specialty   │  specialty   │  specialty   │  specialty   │
│  2-line bio  │  2-line bio  │  2-line bio  │  2-line bio  │
│  tags · →    │  tags · →    │  tags · →    │  tags · →    │
└──────────────┴──────────────┴──────────────┴──────────────┘

┌─────────────────────────────────────────────────────────────┐
│  cream-soft #EFE7D8                                          │
│  Notre mission — 2–3 sentences, centered editorial text     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  burgundy strip                                             │
│  Prendre rendez-vous      Voir nos examens →                │
└─────────────────────────────────────────────────────────────┘
```

Why this beats 2+2+1:
- **Hierarchy is explicit and honest** — the chair is featured, the partners are equal among themselves and fully present (not footnotes). Matches the "prestigious firm partners" model the brief itself invokes.
- **No orphan row.** 1 feature + 4 equal cards is visually resolved at any common breakpoint (4 → 2×2 on tablet → 1-col on mobile).
- **The partners row enforces uniform framing**, which is exactly the photo-consistency discipline the V-formation needs anyway — so you spec portraits once and reuse.
- Mobile: feature card full-width, partners stack 1-col (or 2-col on larger phones).

On the homepage I'd still keep the V-formation (it's locked and it's a nicer *hero moment*); `/equipe` is the *scannable* view, so editorial-feature beats decorative-V there. Two different jobs, two different layouts — that's correct, not inconsistent.

---

## 6. What the brief missed (production gaps)

The brief asks for this directly. Here's what a medical site of this calibre needs that isn't in v2.0:

**Pages / routes**
- **404 page** (brand-consistent, with nav back + phone). Mentioned as a question — answer: yes, build it. With 12 routes + slugs, mistyped/old URLs are certain.
- **`/examens` index page.** The brief leaves "page or homepage #examens — TBD." *Decide: build the index page.* The nav dropdown and "Voir nos examens →" both want a real destination, and it's an SEO landing target ("examens cardiologie Paris"). It's cheap — it's the exam cards grid on its own route.
- **Legal pages — not optional in France.** *Mentions légales*, *Politique de confidentialité (RGPD)*, and cookie consent are **legally required** for a French professional site, more so for health data. The booking form POSTs patient contact data to an n8n webhook — that's **personal data processing under RGPD** and needs a privacy notice, a lawful basis, and arguably a consent checkbox on the form. This is a launch blocker, not a nice-to-have.

**Form / states (the brief lists these as open questions — here are the answers)**
- **Booking form: loading, success, and error states — yes, design all three.** Right now submission goes to a webhook with (per the brief) "identical" handling. A medical booking that silently fails is a lost patient *and* a patient who thinks they have an appointment they don't. Need: disabled+spinner on submit, explicit success confirmation ("Nous vous recontactons sous 24–48h — pour une urgence, appelez le …"), and a graceful error with the phone number as fallback.
- **Form validation** — inline, French, accessible (aria-describedby on errors).
- **RGPD consent checkbox** on the booking form (ties to legal above).
- **Honeypot / basic spam protection** on the webhook form — public POST endpoints get abused fast.

**Content honesty / states**
- **Placeholder doctor handling** (see §0) — if any non-real doctor must appear, it needs the same honest "à venir" treatment as the "Contenu provisoire" exam badge, never a fake portrait.
- **Video placeholder state** — exam pages assume YouTube IDs that don't exist yet. Design the empty state (don't render a broken/empty 16:9 iframe).

**Trust / medical-specific**
- **Pricing / Secteur 2 transparency.** "Conventionnée Secteur 2" implies *dépassements d'honoraires* — anxious patients also worry about cost. A short, honest "Tarifs & remboursement" note (even on the FAQ) reduces a real anxiety the brief doesn't address.
- **Urgency disclaimer**, site-wide and especially near the AI chat and booking CTA: *"En cas d'urgence, composez le 15 (SAMU)."* A cardiology site **must** have this. Its absence is a safety gap.
- **Accessibility pass as a first-class requirement.** Anxious + older demographic = larger tap targets, real focus states, contrast ≥4.5:1 (the at-rest portrait labels are the obvious risk), keyboard-navigable accordion/modal/dropdown, reduced-motion honored everywhere (not just the loader). Bump base body size; Inter at small tracked-caps sizes is a contrast/legibility risk for the audience.
- **SEO/local:** the existing `index.html` has JSON-LD for one doctor — with a council and 12 pages you need `Physician`/`MedicalClinic` structured data per doctor, `MedicalProcedure`/`MedicalTest` per exam, per-page titles/meta/canonical, and an `hreflang` plan if FR/EN ever ships. This drives the *entire* acquisition channel for a local practice — it deserves a line in the brief.
- **Performance budget.** Five+ portraits, hero photo, per-exam videos → set an image budget (responsive `srcset`, lazy-load below fold, modern formats). Tie it to the LCP concern from the loader.

**SPA-specific**
- **Scroll-to-top on route change** (React Router doesn't do it for you) — easy to forget, jarring without it.
- **Per-route `<title>`/meta management** (react-helmet or manual) — needed for SEO and shareability once you're multi-page.
- **Focus management on navigation** for screen readers (move focus to `<h1>`/main on route change).

---

## 7. Prioritised build order (if I started today)

Grounded in what's already in the repo (the timeline, stats, count-up, per-exam FAQ data, and self-contained `SERVICES` objects already exist — so several "new" sections are migrations).

**Phase 0 — Decisions & blockers (before code)**
0.1 Resolve the council launch-state question (§0). This gates the homepage.
0.2 Confirm: `/examens` index = yes; legal pages = required; portrait spec locked.
0.3 Approve hero copy + nav structure.

**Phase 1 — Foundation (architecture, no new visuals)**
1.1 Install React Router; scaffold all routes incl. 404; add scroll-to-top + per-route title/focus.
1.2 Extract a shared `<Layout>` (Header, Footer, floating buttons, mobile bar, booking modal) so every page composes it.
1.3 Restructure `site.js` into `doctors[]` (with slug, real-vs-placeholder flag) + extend `services[]` with per-exam steps/symptoms/video/prevention/faq. Single source of truth for all templates.
1.4 Booking modal: add loading/success/error states + RGPD consent + honeypot. (Touches every page's primary action — do it before building pages on top of it.)

**Phase 2 — Highest-traffic conversion surfaces**
2.1 Exam detail template (`/examens/[slug]`) — biggest SEO/conversion win, data already exists, no dependency on doctor photos. Includes the reordered blocks (prevention below CTA, add "Comment se préparer").
2.2 `/examens` index page.
2.3 Homepage exam-card CTA swap (→ "Découvrir cet examen") + homepage Parcours removal + slim generic reassurance strip + one council proof line.

**Phase 3 — People (gated on real content)**
3.1 Doctor profile template (`/equipe/[slug]`) — migrate timeline/stats/count-up from `About.jsx`; Amraoui-only stats block.
3.2 `/equipe` overview (founder-feature + partners layout from §5).
3.3 Homepage "Notre Conseil" V-formation — **only when ≥ real portraits exist**; until then, ship the truthful interim per §0.

**Phase 4 — Polish & chrome**
4.1 AI chat Phase-1 shell (swappable) + mobile floating-chrome audit + urgency disclaimer.
4.2 Page loader (≤1.2s, once-per-session, non-blocking, reduced-motion).
4.3 Stagger/hover/reveal animations per Section 7 table.

**Phase 5 — Compliance & launch hardening**
5.1 Legal pages + cookie consent + RGPD review of the webhook data flow.
5.2 Accessibility audit (contrast, keyboard, focus, reduced-motion, tap targets).
5.3 SEO: structured data per doctor/exam, meta, sitemap; performance/image budget.
5.4 Form/empty/error/404 state QA; canary on the live booking webhook.

**Rationale for the ordering:** conversion-and-SEO surfaces that *can* ship truthfully (exam pages) come before people-surfaces that *can't* yet (council). Foundation (router + shared layout + booking states) comes first because every page depends on it. Compliance is its own phase because it's a hard launch gate, not polish — and it's the one most likely to be discovered late.

---

## TL;DR for the client meeting
1. **Don't ship invented doctors on a medical trust page.** Build the council architecture; launch it truthful. (Biggest risk in the brief.)
2. **Cut the loader to ~1.2s, once per session, non-blocking** — it currently fights your own "calm + fast for anxious users" thesis and your local SEO.
3. **Keep one proof line + a slim reassurance strip on the homepage** — don't strip all trust signals off the main funnel for org-chart purity.
4. **Exam pages: move prevention below the CTA, add a "Comment se préparer" block.**
5. **Nav: flat, with one dropdown on "Nos Examens" only.**
6. **`/equipe`: founder-feature + 4 equal partners, not a 2+2+1 grid.**
7. **The brief is missing legal/RGPD, form states, urgency disclaimer, 404, `/examens` index, and an a11y/SEO pass** — all required for a production medical site.

Hero copy, nav diagram, and `/equipe` sketch are in §3–5 above. Happy to mock any of these or start Phase 1 scaffolding on your word.
