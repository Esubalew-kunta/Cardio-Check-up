# Gemini video prompts — exam explainer clips

10-second, bright/light clinic, explanatory, photorealistic, 16:9, no text/logos.
Kept in the **detailed (long)** form — they gave good results, reuse them for the
remaining videos.

## Status
| Exam | Status | YouTube id |
|------|--------|------------|
| ECG | ✅ done | `DEB-WcBdBR8` |
| Échographie cardiaque (ETT) | ✅ done | `OWkstGh5i0U` |
| Épreuve d'effort | ⏳ to generate | — |
| Doppler vasculaire | ⏳ to generate | — |

> To add a new one: generate → upload to YouTube (Unlisted is fine) → give the
> link. Set `videoId` on the exam in `src/data/site.js`. NOTE: the Doppler exam is
> a **hub page** (`ExamHub.jsx`) with no inline video slot yet — decide placement
> when its clip is ready (homepage card auto-plays it; a small "En vidéo" section
> can be added to the hub).

---

## 1. Électrocardiogramme (ECG) — ✅ DONE
> A calm, photorealistic medical explainer clip in a bright, modern French
> cardiology cabinet with soft natural daylight and warm cream tones. A relaxed
> adult patient lies comfortably on an examination table, a few small round
> electrodes with thin coloured wires placed on the bare chest. A medical
> assistant gently attaches an electrode while a monitor beside them displays a
> clean, steady green ECG heartbeat trace scrolling across the screen. Camera:
> slow, smooth push-in from a medium shot toward the ECG trace, shallow depth of
> field. Mood: reassuring, professional, premium. High-key, airy lighting.
> Photorealistic, cinematic. No text, no logos, no captions. 10 seconds, 16:9.

## 2. Échographie cardiaque (ETT) — ✅ DONE
> A calm, photorealistic medical explainer clip in a bright, modern cardiology
> cabinet with soft natural daylight. A cardiologist gently glides an ultrasound
> probe with clear gel across the left side of a patient's chest; on a nearby
> screen, a live greyscale ultrasound image of a beating heart moves in real
> time. Clean, airy, high-key lighting, warm cream and soft tones. Camera: smooth
> gentle pan from the probe on the chest to the ultrasound monitor, shallow depth
> of field. Mood: reassuring, precise, premium. Photorealistic, cinematic. No
> text, no logos, no captions, no irradiation devices. 10 seconds, 16:9.

## 3. Épreuve d'effort — ⏳ TO GENERATE
> A calm, photorealistic medical explainer clip in a bright, modern cardiology
> cabinet with natural daylight. A middle-aged patient walks steadily on a
> medical treadmill, small ECG electrodes on the chest and a blood-pressure cuff
> on the arm; a cardiologist stands nearby watching a monitor that shows heart
> rate and an ECG trace. Bright, airy, high-key lighting, clean clinical space
> with warm tones. Camera: slow smooth arc around the patient, then a gentle
> push-in to the monitor. Mood: controlled, safe, reassuring, premium.
> Photorealistic, cinematic. No text, no logos, no captions. 10 seconds, 16:9.

## 4. Échographie Doppler vasculaire — ⏳ TO GENERATE
> A calm, photorealistic medical explainer clip in a bright, modern vascular
> ultrasound room with soft natural daylight. A doctor slowly glides an ultrasound
> Doppler probe with gel along a patient's neck (carotid area); on the screen, a
> colour Doppler image shows blood flow in red and blue moving through the
> vessels. Clean, airy, high-key lighting, warm neutral tones. Camera: smooth
> gentle move from the probe on the skin to the colour-flow image on the monitor,
> shallow depth of field. Mood: precise, reassuring, premium. Photorealistic,
> cinematic. No text, no logos, no captions. 10 seconds, 16:9.

---

### Keep them consistent
- Same room, daylight and cream palette across all 4 (so they feel like a set).
- If unwanted text/UI appears, append: *"no text, watermarks or interface overlays."*
- If faces look off, append: *"natural friendly expressions, no distortion."*
