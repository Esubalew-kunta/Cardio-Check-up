# Image assets — cover prompts (Pathologies + Actualités)

> ✅ STATUS: all 8 covers below have been generated and wired in
> (`public/images/patho-*.jpg` + `news-*.jpg`; `cover:` paths updated in site.js).
> The prompts are kept here for reference / regeneration.

Prompts to replace the placeholder covers. Each is **warm, human and easy for a
non-medical reader to understand**, matching the article's topic. House style:
bright natural daylight, warm cream + soft burgundy tones, photorealistic,
approachable (never clinical or alarming), **16:9**, **no text, no logos**.

Drop each generated file in `public/images/` and update the `cover:` path in
`src/data/site.js` (pathologies → `PATHOLOGIES`, news → `POSTS`).

---

## Pathologies (priority — these are placeholders)

**Fibrillation atriale** → `public/images/patho-fibrillation.jpg`
> A warm, reassuring photograph for a general audience: a calm, healthy adult in
> their fifties sitting comfortably at home in soft natural daylight, one hand
> resting gently over the heart, with a peaceful, reassured expression. Bright,
> airy, warm cream and soft burgundy tones, clean and modern. The mood is calm
> and human, not clinical — it evokes quietly listening to your own heartbeat.
> Photorealistic, shallow depth of field, 16:9, no text, no logos.

**Apnée du sommeil** → `public/images/patho-apnee.jpg`
> A gentle, easy-to-understand photograph: a person sleeping peacefully in a
> bright, tidy bedroom at soft morning light, calm and restful, in warm neutral
> tones. On the nightstand sits a small, discreet modern sleep-monitoring device.
> The feeling is serene and restorative, never distressing. Photorealistic, soft
> focus, 16:9, no text, no logos.

**Hypertension artérielle** → `public/images/patho-hypertension.jpg`
> A simple, relatable photograph: a calm adult measuring their blood pressure at
> home with a modern arm-cuff monitor, seated at a bright kitchen or living-room
> table in soft daylight, warm cream tones, a reassured expression. Approachable
> and everyday, easy for anyone to understand. Photorealistic, shallow depth of
> field, 16:9, no text, no logos.

---

## Actualités / news covers

**Qu'est-ce qu'un Holter ECG ?** → `public/images/news-holter.jpg`
> A friendly, everyday photograph: a smiling adult going about a normal day at
> home, wearing a small, discreet portable heart monitor (a little box with a
> couple of thin wires under the shirt) and living life normally. Bright, warm
> cream tones, natural daylight, relaxed and reassuring — it shows the device is
> easy and unobtrusive. Photorealistic, 16:9, no text, no logos.

**5 signes de consulter un cardiologue** → `public/images/news-signes.jpg`
> A warm, human photograph: a thoughtful adult in their forties or fifties pausing
> at home, resting a hand lightly near the chest with a gently attentive
> expression, as if noticing how they feel. Soft natural daylight, warm cream and
> gentle burgundy tones, calm and non-alarming — it invites people to listen to
> their body. Photorealistic, shallow depth of field, 16:9, no text, no logos.

**Bien se préparer pour votre bilan** → `public/images/news-preparation.jpg`
> A reassuring, simple photograph: a relaxed patient arriving for a medical
> check-up, calmly holding a health card and a small folder of documents, in a
> bright, elegant, welcoming clinic reception with warm cream tones and soft
> daylight. Friendly and stress-free. Photorealistic, 16:9, no text, no logos.

**Qu'est-ce que l'ablation par cathéter ?** → `public/images/news-ablation.jpg`
> A clean, reassuring, non-graphic photograph: a cardiologist calmly explaining a
> heart treatment to an attentive, reassured patient, using a small anatomical
> heart model on the desk, in a bright modern consultation room with warm cream
> and burgundy tones and soft daylight. Educational and human — absolutely no
> surgery, blood or graphic content. Photorealistic, 16:9, no text, no logos.

**Sport après 40 ans et santé cardiaque** → `public/images/news-sport.jpg`
> An uplifting, healthy photograph: an active, fit adult in their forties jogging
> outdoors in a green park at warm golden-hour light, looking energetic and happy
> in casual sportswear. Bright, natural, motivating, warm tones — it conveys that
> staying active protects the heart. Photorealistic, shallow depth of field,
> 16:9, no text, no logos.

---

### After generating
- Keep a consistent look across all 8 (same warmth, daylight, cream palette).
- If unwanted text/UI appears, append: *"no text, watermarks or interface overlays."*
- If faces look off, append: *"natural friendly expressions, no distortion."*
- Then send me the files (or the filenames) and I'll update the `cover:` paths.
