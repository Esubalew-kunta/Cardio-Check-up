# Gemini video prompts — exam explainer clips

10-second, bright/light clinic, explanatory, photorealistic, 16:9, no text/logos.
Kept in the **detailed (long)** form — they gave good results, reuse them for the
remaining videos.

## Status
| Exam | Status | YouTube id |
|------|--------|------------|
| ECG | ✅ done | `DEB-WcBdBR8` |
| Échographie cardiaque (ETT) | ✅ done | `OWkstGh5i0U` |
| Épreuve d'effort | ✅ done | `SuGp0YwWZzo` |
| Doppler vasculaire | ✅ done | `tc7KTED100U` |

> To add a new one: generate → upload to YouTube (Unlisted is fine) → give the
> link. Set `videoId` on the exam in `src/data/site.js`. The Doppler hub page
> (`ExamHub.jsx`) now has its own "En vidéo" section (shared `ExamVideo.jsx`
> component, also used by `ExamDetail.jsx`), in addition to autoplaying on
> its homepage card.

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

## 3. Épreuve d'effort — ✅ DONE (`SuGp0YwWZzo`)
> A calm, photorealistic medical explainer clip in a bright, modern cardiology
> cabinet with natural daylight and warm cream tones. A middle-aged patient
> walks steadily on a medical treadmill, small ECG electrodes on the chest and
> a blood-pressure cuff on the arm; a cardiologist stands nearby watching a
> monitor that shows heart rate and a live ECG trace. Camera: slow, smooth arc
> around the patient, then a gentle push-in to the monitor. Lighting: high-key,
> airy, clean clinical space. Mood: controlled, safe, reassuring, premium.
> Audio: a calm, warm, professional English voiceover, clearly spoken, says:
> "This is a cardiac stress test — walking under gradually increasing effort,
> while your heart rhythm and blood pressure are safely monitored throughout."
> No on-screen text, no logos, no captions, no interface overlays.
> Photorealistic, cinematic. 10 seconds, 16:9.

## 4. Échographie Doppler vasculaire — ✅ DONE (`tc7KTED100U`)
> A calm, photorealistic medical explainer clip in a bright, modern vascular
> ultrasound room with soft natural daylight and warm neutral tones. A doctor
> slowly glides an ultrasound Doppler probe with gel along a patient's neck
> (carotid area); on the screen, a colour Doppler image shows blood flow in
> red and blue moving through the vessels. Camera: smooth, gentle move from
> the probe on the skin to the colour-flow image on the monitor, shallow depth
> of field. Lighting: high-key, airy, clean clinical space. Mood: precise,
> reassuring, premium. Audio: a calm, warm, professional English voiceover,
> clearly spoken, says: "This Doppler ultrasound checks blood flow to your
> brain, painlessly detecting narrowing in the neck arteries to assess stroke
> risk." No on-screen text, no logos, no captions, no interface overlays.
> Photorealistic, cinematic. 10 seconds, 16:9.

---

### Keep them consistent
- Same room, daylight and cream palette across all 4 (so they feel like a set).
- If unwanted text/UI appears, append: *"no text, watermarks or interface overlays."*
- If faces look off, append: *"natural friendly expressions, no distortion."*
