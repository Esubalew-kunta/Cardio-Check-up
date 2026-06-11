# Cardio Check-up — Site vitrine (prototype)

Site one-page pour le **Cabinet de cardiologie et rythmologie Cardio Check-up** — Dr Sana Amraoui.
React + Vite + Tailwind CSS. Aucune dépendance externe en dehors de React, Vite et Tailwind.

## Démarrage

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # build statique → dossier dist/
npm run preview  # prévisualise le build de production
```

## Structure

```
cardio-checkup-site/
├─ index.html              # point d'entrée + Google Fonts (link tag) + SEO/JSON-LD
├─ vite.config.js          # React + plugin Tailwind v4
├─ public/
│  ├─ favicon.svg
│  └─ images/              # photos du cabinet (renommées)
└─ src/
   ├─ main.jsx
   ├─ App.jsx              # assemble le tunnel (funnel) dans l'ordre validé
   ├─ index.css            # @theme : design system "Parisian clinical-luxe"
   ├─ hooks/useReveal.js   # scroll-reveal (IntersectionObserver)
   ├─ data/site.js         # contenu centralisé (FR) : services, FAQ, lieux…
   └─ components/          # un composant par section
      ├─ Header.jsx        # nav fixe + menu mobile + CTA Doctolib
      ├─ Hero.jsx          # titre + barre de confiance intégrée
      ├─ About.jsx         # La Cardiologue + parcours
      ├─ SocialProof.jsx   # bande de 3 chiffres (compteur animé)
      ├─ Services.jsx      # 5 cartes d'examens
      ├─ Faq.jsx           # accordéon (après les services)
      ├─ Parcours.jsx      # 4 étapes rassurantes
      ├─ Contact.jsx       # 2 lieux + prise de RDV
      ├─ Footer.jsx        # marque dr_rythmo + liens + légal
      ├─ MobileBookingBar  # CTA RDV persistant sur mobile
      ├─ Logo.jsx          # logo CARDIO CHECK-UP recréé en SVG
      └─ EcgLine.jsx       # motif ECG animé
```

## Ordre des sections (tunnel validé)

Hero (+ confiance) → La Cardiologue → Bande de chiffres → Examens → FAQ → Votre parcours → Contact

## Design system

| Token | Valeur |
|---|---|
| Ivoire (fond) | `#FAF6EF` |
| Or / laiton (accent) | `#B68F4E` |
| Encre (texte) | `#1C1A17` |
| Rouge signal (ECG + CTA) | `#D9342A` |
| Display | Cormorant Garamond |
| Texte / UI | Inter |

## À compléter (placeholders)

- **Rythmologie interventionnelle** — copie provisoire (signalée « Contenu provisoire » dans l'UI).
- **Lien Doctolib** — `https://www.doctolib.fr/` à remplacer par l'URL exacte du cabinet (`src/data/site.js`).
- Horaires d'ouverture, tarifs, équipe — non fournis.
- Mentions légales / politique de confidentialité — liens à brancher.
- Bilingue FR/EN — différé (prototype en français uniquement).
