// Central content + contact constants for the Cardio Check-up site.
// French-only per the approved plan. Single source of truth for every template.
//
// All doctor profiles are real. Photo flags: `photoPlaceholder: true` (portrait
// pending from the client — silhouette renders) and `noPhoto: true` +
// `noPhotoReason` (doctor declined a photo by choice — monogram renders). The
// ambulatory cardiac exams are performed/supervised by Dr Amraoui (the practice
// cardiologue-rythmologue); the vascular and general-medicine doctors list their
// expertise via `procedures`.

export const WEBHOOK_URL = 'https://esubalewk.app.n8n.cloud/webhook/cardio-booking-request'

export const CONTACT = {
  phone: '07 55 50 52 58',
  phoneHref: 'tel:+33755505258',
  whatsapp: 'https://wa.me/33755505258',
  email: 'secretariatdramraoui@myeva.ovh',
  emailHref: 'mailto:secretariatdramraoui@myeva.ovh',
  doctolib: 'https://www.doctolib.fr/cardiologue/paris/sana-amraoui',
  review: 'https://g.page/r/CduP-ZEHa8huEAE/review',
  youtube: 'https://youtube.com/@drsanaamraoui',
  instagram: 'https://instagram.com/dr_rythmo',
  linkedin: 'https://www.linkedin.com/',
  site: 'cardio-check-up.com',
}

// Route-based navigation. `to` is a router path; a leading "/#id" means
// "go to the homepage and scroll to #id" (handled by ScrollManager).
// `dropdown: 'exams'` flags the item whose submenu lists the exam pages.
export const NAV = [
  { label: 'Accueil', to: '/' },
  { label: 'Notre Équipe', to: '/equipe' },
  { label: 'Nos Examens', to: '/#examens', dropdown: 'exams' },
  { label: 'Consultations', to: '/consultations' },
  { label: 'Pathologies', to: '/pathologies' },
  { label: 'FAQ', to: '/#faq' },
  { label: 'Actualités', to: '/actualites' },
]

export const LEGAL_NAV = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Politique de confidentialité', to: '/confidentialite' },
]

// §4.3 — Dr Amraoui's social-proof numbers (her profile page only).
export const STATS = [
  {
    value: '40+',
    isText: true,
    line: 'Publications dans des revues internationales : JACC, Europace, Heart Rhythm',
  },
]

// ── Doctors ────────────────────────────────────────────────────────────────
// Order here is display order on the team grid; the V-formation and founder
// blocks pick out Dr Amraoui explicitly via `isFounder`.
export const DOCTORS = [
  {
    slug: 'sana-amraoui',
    order: 1,
    name: 'Dr Sana Amraoui',
    specialty: 'Cardiologue rythmologue interventionnelle',
    specialtyShort: 'Cardiologue rythmologue', // compact label for the homepage team card
    credibility: 'Cheffe de service · Rythmologie (électrophysiologie)',
    isFounder: true,
    demo: false,
    photo: '/images/doctor-portrait.jpg',
    doctolib: CONTACT.doctolib,
    expertiseOrder: ['rythmologie', 'ecg', 'holter-ecg'], // chip display priority on her cards/profile
    bioShort:
      'Cardiologue rythmologue interventionnelle, le Dr Amraoui coordonne le conseil Cardio Check-up et dirige le service de rythmologie.',
    bio:
      "Diplômée de la faculté de médecine de Bordeaux et de la London School of Economics, ancienne cheffe de clinique du CHU de Bordeaux, le Dr Amraoui est cheffe du service de rythmologie (électrophysiologie) de l'Hôpital Américain de Paris. Elle a complété sa formation par des fellowships à St Thomas' Hospital (Londres) et à Columbia (New York). Elle accompagne ses patients dans le diagnostic et le traitement des troubles du rythme cardiaque. Spécialisée en cardiologie et en rythmologie, elle a recours à des outils tridimensionnels innovants pour traiter les arythmies cardiaques. Son expertise médicale, alliée à son sens de la communication et à son empathie — qui sont sa marque de fabrique — place le patient au cœur de sa prise en charge.",
    highlightLabel: 'Rythmologie interventionnelle',
    // TODO: validation médicale — affirmations à valider avant publication (brief §12)
    highlight:
      "Le Dr Amraoui est précurseur des ablations de fibrillation atriale en hospitalisation ambulatoire en France, lorsque les paramètres cliniques le permettent, ainsi que de l'ablation par électroporation 3D, technique innovante de pointe dans le traitement de cette arythmie.",
    timeline: [
      { year: '2011', text: "DIU d'échocardiographie, Université Bordeaux Segalen" },
      { year: '2012', text: 'DES de cardiologie & maladies vasculaires · Doctorat en sciences médicales' },
      { year: '2014', text: 'Master 2 sciences du vivant et de la santé, Université Paris 7' },
      { year: '2015', text: 'DIU de rythmologie & défibrillation' },
      { year: '2021', text: 'Executive MSc in Health Economics, London School of Economics' },
    ],
    stats: STATS, // rendered only on her page
  },
  {
    // Real doctor (replaced the demo "Dr Thomas Martin"). Cardiac surgeon — NOT
    // mapped to any ambulatory exam page; his procedures show as static tags.
    slug: 'fabien-doguet',
    order: 2,
    name: 'Pr. Fabien Doguet',
    specialty: 'Chirurgien Cardiaque',
    credibility: 'Chirurgien cardiaque · Hôpital Privé Jacques Cartier, Massy',
    isFounder: false,
    demo: false,
    photo: '/images/doguet.jpg',
    doctolib: CONTACT.doctolib,
    badge: 'Chirurgie Cardiaque Mini-invasive',
    bioShort:
      "Chirurgien cardiaque spécialisé en chirurgie mini-invasive, le Pr Doguet exerce à l'Hôpital Privé Jacques Cartier (Massy).",
    bio:
      "Professeur des Universités et ancien chef du service de chirurgie cardiaque au CHU de Rouen, le Pr Doguet exerce aujourd'hui à l'Hôpital Privé Jacques Cartier à Massy. Spécialisé en chirurgie mini-invasive, il est aussi connu du grand public comme co-animateur du Magazine de la Santé sur France 5 et auteur d'un livre sur le sport après 40 ans.",
    highlight:
      "Au-delà du bloc opératoire, le Pr Doguet co-anime le Magazine de la Santé sur France 5 et a publié un livre sur la pratique du sport après 40 ans. Passionné d'endurance, il a couru plus de 20 marathons et relevé certains des défis les plus exigeants au monde : l'UTMB, la Diagonale des Fous, le Marathon des Sables et l'Ironman.",
    // Authored most-recent-first (these milestones are not all dated).
    timeline: [
      { year: '2021', text: 'Chirurgien cardiaque, Hôpital Privé Jacques Cartier, Massy (depuis novembre 2021)' },
      { year: '', text: 'Directeur médical, 40e Marathon des Sables Legendary' },
      { year: '', text: 'Co-animateur du Magazine de la Santé, France 5' },
      { year: '', text: 'Chef du service de chirurgie cardiaque, CHU de Rouen' },
      { year: '', text: 'Professeur des Universités-Praticien Hospitalier, CHU de Rouen' },
      { year: '', text: 'Études de médecine en Normandie, spécialisation en chirurgie thoracique et cardiovasculaire' },
    ],
    // Surgical domains shown as static tags (no links — he is not an ambulatory
    // cardiologist). Procedures: real links to be added before go-live.
    procedures: [
      'Chirurgie mini-invasive',
      'Réparation et remplacement valvulaire (mitrale, aortique, tricuspide)',
      'Chirurgie aortique',
      'Pontages coronaires',
    ],
    stats: null,
  },
  {
    slug: 'leslie-berdah-sadaoui',
    order: 3,
    name: 'Dr Leslie Berdah Sadaoui',
    specialty: 'Médecin généraliste · Nutrition',
    credibility: 'Médecine générale & nutrition · Ancienne Cheffe de clinique (AP-HP, Cochin Port-Royal)',
    isFounder: false,
    demo: false,
    photo: '/images/leslie-berdah-sadaoui.jpg',
    doctolib: CONTACT.doctolib,
    badge: 'Nutrition & prévention',
    languages: ['Français', 'Anglais', 'Espagnol'],
    bioShort:
      'Médecin généraliste avec une expertise en nutrition et prise en charge du surpoids, le Dr Berdah Sadaoui adopte une approche globale et préventive de la santé.',
    bio:
      "Médecin généraliste avec une expertise en nutrition et prise en charge du surpoids, le Dr Berdah Sadaoui adopte une approche globale et préventive de la santé. Ancienne Cheffe de clinique assistante (AP-HP, Cochin Port-Royal) et titulaire d'un D.U. de Nutrition (Université Paris Cité, Paris 5 Descartes), elle propose un accompagnement nutritionnel personnalisé, centré sur l'amaigrissement et la prévention des facteurs de risque cardio-vasculaire.",
    timeline: [
      { year: '2013', text: 'Master de psychologie clinique, Université Paris V Descartes' },
      { year: '2022', text: 'D.E.S. de Médecine générale, Université Paris Cité, Paris V' },
      { year: '2024', text: 'D.U. de Nutrition, Université Paris Cité' },
    ],
    procedures: [
      'Médecine générale',
      'Nutrition',
      'Amaigrissement / surpoids',
      'Prévention cardio-vasculaire',
      'Bilan de santé',
    ],
    stats: null,
  },
  {
    // Placeholder profile — only the name, role and exam mapping were supplied by
    // the practice (brief §9). TODO: full name, bio, diplomas, timeline and photo
    // are pending and must be completed before go-live.
    slug: 'sofiane',
    order: 4,
    name: 'Dr Sofiane Sroutta-Paillusseau',
    specialty: 'Cardiologue',
    credibility: 'Cardiologie · Consultation, ECG et échographie cardiaque',
    isFounder: false,
    demo: false,
    photo: null,
    photoPlaceholder: true, // portrait pending from the client
    doctolib: CONTACT.doctolib,
    badge: 'Cardiologie générale',
    bioShort:
      'Cardiologue, le Dr Sroutta-Paillusseau assure les consultations de cardiologie, la prise en charge des facteurs de risque et la réalisation des ECG et échographies cardiaques.',
    bio:
      "Cardiologue au sein de Cardio Check-up, le Dr Sroutta-Paillusseau prend en charge les consultations de cardiologie, le dépistage et le suivi des facteurs de risque cardiovasculaire (notamment l'hypertension artérielle) et l'exploration de la douleur thoracique, et réalise les électrocardiogrammes et les échographies cardiaques. (Biographie complète à compléter avant la mise en ligne.)",
    timeline: [],
    procedures: [
      'Consultation de cardiologie',
      'Douleur thoracique',
      'Facteurs de risque cardiovasculaires',
      'Hypertension artérielle',
      'Électrocardiogramme',
      'Échographie cardiaque',
    ],
    stats: null,
  },
  {
    slug: 'adam-taha',
    order: 6,
    name: 'Dr Adam Taha',
    specialty: 'Chirurgien vasculaire et endovasculaire',
    credibility: 'Chirurgie vasculaire & endovasculaire · Ancien Interne des Hôpitaux de Paris',
    isFounder: false,
    demo: false,
    photo: null,
    photoPlaceholder: true, // real portrait pending from the client
    doctolib: CONTACT.doctolib,
    badge: 'Chirurgie vasculaire mini-invasive',
    bioShort:
      'Chirurgien vasculaire et endovasculaire, le Dr Taha prend en charge les pathologies artérielles et veineuses, en alliant chirurgie conventionnelle et techniques mini-invasives.',
    bio:
      "Le Dr Adam Taha est chirurgien vasculaire et endovasculaire, spécialisé dans la prise en charge des pathologies artérielles et veineuses. Son activité couvre l'ensemble de la chirurgie vasculaire, associant chirurgie conventionnelle et techniques endovasculaires mini-invasives. Cette double expertise lui permet de proposer à chaque patient une prise en charge sur mesure, fondée sur l'écoute et la confiance. Ancien Interne des Hôpitaux de Paris, il a été formé dans des centres de référence nationaux et internationaux, notamment l'Hôpital Européen Georges-Pompidou et la Pitié-Salpêtrière, et a exercé à l'Hôpital Américain de Paris ainsi qu'à la Clinique Turin.",
    highlightLabel: 'Distinctions & titres',
    highlight:
      "Titulaire du D.E.S. de Chirurgie Vasculaire et Endovasculaire, le Dr Taha est Lauréat et Médaillé de la Faculté de Médecine de l'Université Paris-Cité. Sa thèse de doctorat, consacrée aux anévrysmes aortiques, a été distinguée par une mention et les félicitations du jury.",
    timeline: [
      { year: '', text: 'Ancien Interne des Hôpitaux de Paris' },
      { year: '', text: "Formation à l'Hôpital Européen Georges-Pompidou et à la Pitié-Salpêtrière" },
      { year: '', text: "Exercice à l'Hôpital Américain de Paris et à la Clinique Turin" },
      { year: '', text: 'D.E.S. de Chirurgie Vasculaire et Endovasculaire, Lauréat et Médaillé de la Faculté de Médecine Paris-Cité' },
      { year: '', text: 'Thèse de doctorat sur les anévrysmes aortiques (mention et félicitations du jury)' },
    ],
    procedures: [
      "Anévrysmes de l'aorte et lésions occlusives aorto-iliaques",
      "Maladies artérielles périphériques (sténoses carotidiennes, artérite des membres inférieurs)",
      'Anévrysmes périphériques (poplités)',
      'Pathologies des artères digestives et rénales',
      'Insuffisance veineuse chronique et varices',
      'Syndromes de congestion pelvienne, embolisations',
      'Varicocèle',
      'Accès vasculaires pour hémodialyse',
      'Malformations vasculaires',
      "Pathologies vasculaires du sportif (artère poplitée piégée, endofibrose iliaque, syndrome de loge)",
    ],
    stats: null,
  },
  {
    slug: 'rabiaa-hakem',
    order: 5,
    name: 'Dr Rabiaa Hakem',
    specialty: 'Médecin vasculaire (Angiologue)',
    credibility: 'Médecine vasculaire & écho-Doppler · Louis-Mourier (AP-HP), CH Victor Dupouy',
    isFounder: false,
    demo: false,
    photo: null,
    noPhoto: true, // declined a photograph by personal choice
    noPhotoReason: 'choix du médecin',
    doctolib: CONTACT.doctolib,
    badge: 'Écho-Doppler vasculaire',
    bioShort:
      "Médecin vasculaire (angiologue), le Dr Hakem diagnostique et traite les maladies des vaisseaux : varices, phlébites, artérite et anévrismes, avec une expertise en écho-Doppler.",
    bio:
      "Le médecin vasculaire (angiologue) est le spécialiste des maladies des vaisseaux sanguins et lymphatiques : varices, phlébites, artérite, anévrismes et autres troubles de la circulation. Le Dr Hakem réalise les examens d'écho-Doppler nécessaires au diagnostic et au suivi de ces pathologies, et couvre la prévention, le dépistage et le traitement des affections vasculaires.",
    timeline: [
      { year: '2018', text: "Internat de médecine vasculaire, CHU d'Amiens (2018-2022)" },
      { year: '2022', text: 'Assistante des hôpitaux, Louis-Mourier (AP-HP), CH Victor Dupouy (2022-2024)' },
      { year: '2024', text: 'Praticienne contractuelle, Louis-Mourier (AP-HP), CH Victor Dupouy (2024-2026)' },
      { year: '', text: 'DIU Plaie et Cicatrisation, Sorbonne Université' },
      { year: '', text: "DIU d'Imagerie Vasculaire Non Invasive, Sorbonne Université" },
      { year: '', text: 'DIU Lasers Médicaux, Sorbonne Université' },
    ],
    procedures: [
      'Écho-Doppler vasculaire artériel (TSA, membres, rénal, transcrânien, digestif) et veineux',
      "Pathologies artérielles des membres et de l'aorte (claudication, sténoses, anévrismes)",
      'Maladie thrombo-embolique et traitements antithrombotiques',
      'Varices : sclérothérapie à la mousse, laser endoveineux',
      'Ulcères vasculaires des membres inférieurs',
    ],
    stats: null,
  },
]

// Medical secretaries — support staff shown on /equipe (no profile pages).
// Kept separate from DOCTORS so they never appear in doctor lookups, the
// V-formation, or exam cross-links.
export const SECRETARIES = [
  { name: 'Ghita', role: 'Secrétaire médicale', photo: '/images/ghita.jpg' },
  { name: 'Maymouna', role: 'Secrétaire médicale', photo: '/images/maymouna.jpg' },
]

// §4.4 — Exams / Nos Examens. Each entry is self-contained so any exam page
// can be built from a single object. `doctorSlugs` is the DEMO exam->doctor
// mapping (single source; doctor pages derive their exams from it via
// `examsForDoctor`).
export const SERVICES = [
  {
    id: 'bilan',
    name: 'Bilan cardiovasculaire',
    indef: 'un', // indefinite article for "Prendre rendez-vous pour …"
    category: 'Consultation & dépistage',
    group: 'consultation', // listed under /consultations, not in the exams grid

    headline: 'Un bilan complet de la santé de votre cœur, en un rendez-vous',
    reassurance: 'Sans préparation · ECG et échographie sur place · Résultats commentés par votre médecin',
    why: 'Pour faire le point sur la santé de votre cœur.',
    symptoms: 'Bilan de prévention, suivi de routine, avant une activité sportive.',
    desc: 'Consultation complète associant un ECG de repos et une échographie cardiaque trans-thoracique (ETT).',
    whatIs: [
      "Le bilan cardiovasculaire réunit en un seul rendez-vous trois choses : une consultation avec le cardiologue, un enregistrement de l'activité électrique de votre cœur et une échographie du cœur.",
      "Il sert à faire le point sur la santé de votre cœur, à repérer une éventuelle anomalie et à mettre en place un suivi adapté. C'est l'examen de référence, en prévention comme avant une reprise du sport.",
    ],
    videoId: 'Uu3n8ease_c', // Bilan cardiovasculaire — explainer video
    symptomPills: ['Prévention', 'Suivi de routine', 'Avant le sport', 'Antécédents familiaux'],
    symptomContext:
      "Le bilan cardiovasculaire s'adresse aussi bien aux personnes sans symptôme, dans une démarche de prévention, qu'aux patients présentant un facteur de risque (hypertension, cholestérol, antécédents familiaux) ou souhaitant reprendre le sport en toute sécurité.",
    steps: [
      { title: 'Consultation', text: 'Le cardiologue fait le point sur vos antécédents, vos symptômes et votre mode de vie.' },
      { title: 'Électrocardiogramme', text: "Un enregistrement rapide et indolore de l'activité électrique de votre cœur." },
      { title: 'Échographie cardiaque', text: 'Une échographie (ETT) pour visualiser la structure et le fonctionnement du cœur.' },
      { title: 'Résultats commentés', text: 'Le médecin vous explique les résultats et les éventuelles suites.' },
    ],
    preparation: [
      'Aucun jeûne nécessaire : vous pouvez manger normalement.',
      'Prenez vos traitements habituels comme d’habitude.',
      'Apportez vos derniers examens cardiologiques si vous en avez.',
      'Prévoyez une tenue facile à retirer pour l’échographie.',
    ],
    prevention: [
      { title: 'Bougez régulièrement', text: 'Trente minutes d’activité modérée par jour protègent durablement votre cœur.' },
      { title: 'Mangez équilibré', text: 'Privilégiez fruits, légumes et bonnes graisses ; limitez le sel et les produits transformés.' },
      { title: 'Surveillez vos facteurs de risque', text: 'Tension, cholestérol et glycémie méritent un contrôle régulier.' },
    ],
    faq: [
      {
        q: 'En quoi consiste le bilan cardiovasculaire ?',
        a: "Il associe une consultation, un électrocardiogramme (ECG) de repos et une échographie cardiaque trans-thoracique (ETT) afin d'évaluer la structure et le fonctionnement du cœur.",
      },
      {
        q: 'Faut-il être à jeun ?',
        a: "Non, aucune préparation particulière n'est nécessaire. Vous pouvez manger et prendre vos traitements habituels avant le rendez-vous.",
      },
      {
        q: 'Quand ai-je les résultats ?',
        a: 'Les résultats sont interprétés et commentés par le médecin et vous sont transmis dès leur analyse médicale.',
      },
    ],
    doctorSlugs: ['sana-amraoui'],
    placeholder: false,
  },
  {
    id: 'ecg',
    name: 'Électrocardiogramme (ECG)',
    indef: 'un',
    category: 'Cœur · diagnostic',
    group: 'coeur',
    headline: "L'examen de référence du rythme et de l'activité électrique du cœur",
    reassurance: 'Totalement indolore · Quelques minutes · Réalisé en consultation',
    why: 'Bilan de routine, palpitations, douleurs thoraciques ou essoufflement.',
    symptoms: 'Palpitations, douleurs thoraciques, essoufflement, bilan systématique.',
    desc: "Enregistrement de l'activité électrique du cœur grâce à de petites électrodes posées sur la peau.",
    whatIs: [
      "L'électrocardiogramme enregistre l'activité électrique de votre cœur grâce à de petites électrodes posées sur la peau, au niveau de la poitrine, des bras et des jambes. Il permet d'analyser le rythme cardiaque, de détecter d'éventuels troubles de la conduction électrique ou des signes pouvant évoquer une atteinte du muscle cardiaque.",
      "C'est un examen de référence, réalisé systématiquement en consultation de cardiologie, qu'il s'agisse d'un bilan de routine ou de l'exploration de symptômes comme les palpitations, les douleurs thoraciques ou l'essoufflement. L'examen est totalement indolore et ne dure que quelques minutes : vous restez allongé(e), détendu(e), pendant que le tracé s'enregistre.",
    ],
    videoId: 'DEB-WcBdBR8',
    symptomPills: ['Palpitations', 'Douleurs thoraciques', 'Essoufflement', 'Bilan de routine'],
    symptomContext:
      "L'ECG est réalisé aussi bien dans le cadre d'un bilan systématique que pour explorer des symptômes comme des palpitations, une douleur dans la poitrine ou un essoufflement. C'est souvent le tout premier examen du cœur, simple et immédiat.",
    steps: [
      { title: 'Installation', text: "Vous êtes allongé(e) et détendu(e) ; l'assistante médicale pose quelques électrodes sur la poitrine, les bras et les jambes." },
      { title: 'Enregistrement', text: "Le tracé de l'activité électrique du cœur s'enregistre en quelques secondes, sans aucune gêne." },
      { title: 'Lecture', text: "Le cardiologue analyse le tracé à la recherche d'une anomalie du rythme ou de la conduction." },
      { title: 'Résultats', text: 'Le cardiologue vous explique les résultats et les éventuelles suites.' },
    ],
    preparation: [
      'Aucune préparation particulière : vous pouvez manger et prendre vos traitements normalement.',
      'Prévoyez un haut facile à retirer pour la pose des électrodes.',
      "Évitez crèmes et huiles sur la peau le jour de l'examen, pour une meilleure adhérence.",
      'Apportez vos précédents ECG si vous en avez.',
    ],
    prevention: [
      { title: 'Bougez régulièrement', text: "Trente minutes d'activité modérée par jour protègent durablement votre cœur." },
      { title: 'Surveillez vos facteurs de risque', text: 'Tension, cholestérol et glycémie méritent un contrôle régulier.' },
      { title: 'Limitez les excitants', text: 'Café, tabac et alcool en excès peuvent perturber le rythme cardiaque.' },
    ],
    faq: [
      { q: "L'ECG est-il douloureux ?", a: "Non, l'examen est totalement indolore. On pose simplement des électrodes sur la peau ; rien n'est injecté et vous ne ressentez rien." },
      { q: 'Combien de temps dure un ECG ?', a: "L'enregistrement ne dure que quelques secondes à quelques minutes. C'est l'un des examens les plus rapides de la cardiologie." },
      { q: 'Faut-il une préparation ?', a: "Aucune. Vous pouvez manger, boire et prendre vos traitements habituels avant l'examen." },
    ],
    doctorSlugs: ['sana-amraoui', 'sofiane'],
    placeholder: false,
  },
  {
    id: 'echographie-cardiaque',
    name: 'Échographie cardiaque (ETT)',
    indef: 'une',
    category: 'Imagerie cardiaque',
    group: 'coeur',
    headline: 'Visualiser votre cœur en mouvement, sans aucune irradiation',
    reassurance: 'Indolore · Sans irradiation · 15 à 30 minutes',
    why: 'Évaluer la structure et le fonctionnement du cœur et des valves.',
    symptoms: "Souffle au cœur, essoufflement, suivi d'une valvulopathie ou d'une insuffisance cardiaque.",
    desc: "Examen d'imagerie par ultrasons qui visualise les cavités, le muscle cardiaque et les valves.",
    whatIs: [
      "L'échographie cardiaque trans-thoracique est un examen d'imagerie qui permet de visualiser le cœur en mouvement grâce aux ultrasons, sans aucune irradiation. Une sonde est posée sur la poitrine, le plus souvent au niveau du thorax gauche, pour observer la taille et le fonctionnement des cavités cardiaques, la qualité de la contraction du muscle cardiaque, ainsi que l'état des valves.",
      "Cet examen permet de dépister ou de suivre de nombreuses pathologies cardiaques : valvulopathies, insuffisance cardiaque, anomalies congénitales. Il est totalement indolore et dure généralement entre 15 et 30 minutes ; vous serez simplement allongé(e) sur le côté gauche pendant la réalisation de l'examen.",
    ],
    videoId: 'OWkstGh5i0U',
    symptomPills: ['Souffle cardiaque', 'Essoufflement', 'Valvulopathie', 'Insuffisance cardiaque'],
    symptomContext:
      "L'échographie cardiaque est demandée pour explorer un souffle, un essoufflement, ou pour suivre une valvulopathie ou une insuffisance cardiaque connue. Elle donne une image précise du fonctionnement du cœur.",
    steps: [
      { title: 'Installation', text: 'Vous êtes allongé(e) sur le côté gauche, le thorax dégagé.' },
      { title: 'Échographie', text: 'Le cardiologue déplace une sonde sur la poitrine pour visualiser le cœur en mouvement.' },
      { title: 'Analyse', text: "La taille des cavités, la contraction du muscle et l'état des valves sont évalués en direct." },
      { title: 'Résultats', text: 'Le médecin vous explique les résultats et les éventuelles suites.' },
    ],
    preparation: [
      'Aucun jeûne nécessaire : vous pouvez manger normalement.',
      "Prenez vos traitements habituels comme d'habitude.",
      'Prévoyez une tenue facile à retirer pour le haut du corps.',
      'Apportez vos précédentes échographies cardiaques si vous en avez.',
    ],
    prevention: [
      { title: 'Mangez équilibré', text: 'Privilégiez fruits, légumes et bonnes graisses ; limitez le sel.' },
      { title: 'Bougez régulièrement', text: "L'activité physique régulière renforce le muscle cardiaque." },
      { title: 'Suivez vos contrôles', text: "Un suivi régulier permet de surveiller l'évolution d'une valvulopathie." },
    ],
    faq: [
      { q: "L'échographie cardiaque est-elle dangereuse ?", a: "Non. Elle utilise des ultrasons, sans aucune irradiation ni injection. L'examen est parfaitement indolore." },
      { q: "Combien de temps dure l'examen ?", a: 'Généralement entre 15 et 30 minutes.' },
      { q: 'Faut-il être à jeun ?', a: "Non, aucune préparation particulière n'est nécessaire." },
    ],
    doctorSlugs: ['sana-amraoui', 'sofiane'],
    placeholder: false,
  },
  {
    id: 'holter-ecg',
    name: 'Holter rythmique',
    indef: 'un',
    category: 'Enregistrement ambulatoire',
    group: 'ambulatoire',
    headline: 'Un enregistreur porté 24h qui veille sur votre rythme cardiaque',
    reassurance: 'Examen indolore · Pose en 10 minutes · Résultats commentés par votre médecin',
    why: 'Palpitations, malaises ou troubles du rythme suspectés.',
    symptoms: "Palpitations, sensation de cœur qui s'accélère, malaises ou perte de connaissance.",
    desc: "Enregistreur de l'ECG de 24 h jusqu'à 2 semaines. Examen indolore qui n'entrave pas vos activités quotidiennes.",
    whatIs: [
      "Le Holter ECG est un petit boîtier que vous portez sur vous, relié à quelques pastilles collées sur la peau. Il enregistre l'activité électrique de votre cœur en continu, de 24 heures à 2 semaines selon la prescription.",
      "Ce suivi sur la durée permet de repérer un rythme cardiaque irrégulier qui n'apparaîtrait pas lors d'un examen de quelques secondes au cabinet. L'examen est indolore et ne vous empêche pas de vaquer à vos occupations.",
    ],
    videoId: 'XusqaX3z1U8', // Holter ECG — explainer video
    symptomPills: ['Palpitations', 'Malaises', 'Perte de connaissance', "Cœur qui s'accélère"],
    symptomContext:
      "Le Holter ECG est prescrit lorsque vous ressentez des palpitations, des malaises ou des pertes de connaissance, ou pour contrôler l'efficacité d'un traitement du rythme cardiaque. Il aide à identifier des troubles du rythme intermittents, difficiles à saisir sur un examen ponctuel.",
    steps: [
      { title: "Pose de l'appareil", text: "L'assistante médicale installe les électrodes en une dizaine de minutes." },
      { title: 'Port à domicile', text: 'Vous vivez normalement pendant 24 h à 2 semaines, selon la prescription.' },
      { title: 'Restitution du Holter', text: "Vous rapportez l'appareil au cabinet à la date convenue." },
      { title: 'Résultats commentés', text: "Votre médecin analyse l'enregistrement et vous communique les résultats." },
    ],
    preparation: [
      'Présentez-vous avec une peau propre et sèche (les électrodes adhèrent mieux).',
      'Ne prenez pas de douche avec l’appareil : il n’est pas étanche.',
      'N’arrêtez jamais l’appareil pendant la durée de l’enregistrement.',
      'Notez l’heure de vos symptômes dans le carnet remis avec l’appareil.',
    ],
    prevention: [
      { title: 'Modérez les excitants', text: 'Café, thé et boissons énergisantes peuvent accentuer les palpitations.' },
      { title: 'Gérez votre stress', text: 'Sommeil régulier et respiration calme aident à apaiser le rythme cardiaque.' },
      { title: 'Dormez suffisamment', text: 'Un sommeil de qualité limite les troubles du rythme liés à la fatigue.' },
    ],
    faq: [
      {
        q: "Qu'est-ce qu'un Holter ECG ?",
        a: "Le Holter ECG est un enregistreur de l'électrocardiogramme porté de 24 h jusqu'à 2 semaines. Il met en évidence un trouble du rythme cardiaque et peut servir à contrôler l'efficacité d'un traitement. L'examen est indolore.",
      },
      {
        q: "Puis-je me doucher avec l'appareil ?",
        a: "Non. La douche est interdite avec l'appareil, qui n'est pas étanche. Il ne faut pas non plus l'arrêter pendant la durée de l'enregistrement.",
      },
      {
        q: 'Puis-je faire du sport pendant le Holter ?',
        a: "Vous pouvez poursuivre vos activités habituelles. Évitez simplement les efforts qui décolleraient les électrodes ou les feraient transpirer abondamment, sauf indication contraire de votre médecin.",
      },
      {
        q: 'Combien de temps dure l’enregistrement ?',
        a: 'De 24 heures à 2 semaines, selon la prescription de votre cardiologue.',
      },
    ],
    doctorSlugs: ['sana-amraoui'],
    placeholder: false,
  },
  {
    id: 'mapa',
    name: 'Holter tensionnel (MAPA)',
    indef: 'un',
    category: 'Mesure ambulatoire de la pression',
    group: 'ambulatoire',
    headline: 'Surveiller votre tension artérielle sur 24 heures, chez vous',
    reassurance: 'Indolore · Mesures automatiques · Vous gardez vos activités',
    why: "Hyper- ou hypotension, contrôle d'un traitement.",
    symptoms: "Tension artérielle instable, vertiges, suivi d'un traitement anti-hypertenseur.",
    desc: 'Enregistrement de la tension artérielle durant 24 h : mesure toutes les 20 min le jour et toutes les heures la nuit.',
    whatIs: [
      "La MAPA, ou Holter tensionnel, mesure automatiquement votre tension artérielle pendant 24 heures, grâce à un brassard relié à un petit boîtier que vous gardez sur vous.",
      "En suivant votre tension dans votre vie de tous les jours, elle donne une image bien plus fidèle qu'une seule mesure au cabinet et permet de vérifier qu'un traitement fonctionne bien. Le cabinet dispose de quatre tailles de brassard, adaptées au périmètre du bras, pour une mesure fiable et confortable.",
    ],
    videoId: 'NiMYmKIRHWo', // MAPA — explainer video
    symptomPills: ['Hypertension', 'Hypotension', 'Vertiges', 'Suivi de traitement'],
    symptomContext:
      "La MAPA est prescrite en cas de tension instable, de suspicion d'hypertension ou d'hypotension, de vertiges, ou pour ajuster un traitement anti-hypertenseur. Elle aide à distinguer une véritable hypertension d'une simple poussée liée au stress de la consultation.",
    steps: [
      { title: 'Pose du brassard', text: "L'assistante médicale installe le brassard et le boîtier en quelques minutes." },
      { title: 'Port sur 24 heures', text: 'Vous gardez vos activités habituelles ; le brassard se gonfle automatiquement.' },
      { title: 'Restitution', text: 'Vous rapportez l’appareil au cabinet le lendemain.' },
      { title: 'Résultats commentés', text: 'Le médecin analyse le profil de votre tension et adapte si besoin votre traitement.' },
    ],
    preparation: [
      'Gardez le bras détendu et immobile pendant chaque mesure.',
      'Notez vos activités et l’heure de votre coucher dans le carnet fourni.',
      'Ne retirez pas le brassard et ne prenez pas de douche avec l’appareil.',
      'Portez un haut ample pour passer le brassard facilement.',
    ],
    prevention: [
      { title: 'Réduisez le sel', text: 'Limiter le sel aide à maintenir une tension artérielle équilibrée.' },
      { title: 'Restez actif', text: 'L’activité physique régulière contribue à faire baisser la tension.' },
      { title: 'Surveillez votre tension', text: 'Un suivi régulier permet d’ajuster le traitement au bon moment.' },
    ],
    faq: [
      {
        q: "Qu'est-ce qu'un MAPA (holter tensionnel) ?",
        a: "Le MAPA est un appareil d'enregistrement de la tension artérielle durant 24 h. Il contrôle les variations de la tension tout au long de la journée et peut vérifier l'efficacité d'un traitement. La mesure se fait automatiquement toutes les 20 minutes le jour et toutes les heures la nuit.",
      },
      {
        q: 'Le brassard est-il gênant la nuit ?',
        a: "Le brassard se gonfle moins souvent la nuit (une fois par heure). La plupart des patients dorment normalement ; gardez simplement le bras détendu lors des mesures.",
      },
      {
        q: 'Puis-je travailler avec l’appareil ?',
        a: 'Oui, vous pouvez poursuivre une journée normale. C’est même recommandé pour obtenir un profil de tension représentatif de votre quotidien.',
      },
    ],
    doctorSlugs: ['sana-amraoui'],
    placeholder: false,
  },
  {
    id: 'polygraphie',
    name: 'Polygraphie ventilatoire nocturne',
    indef: 'une',
    category: 'Dépistage du sommeil à domicile',
    group: 'ambulatoire',
    headline: 'Dépister les apnées du sommeil depuis votre domicile',
    reassurance: 'À domicile · Appareil léger · Une seule nuit',
    why: 'Ronflements, fatigue, apnées du sommeil suspectées.',
    symptoms: 'Ronflements, somnolence en journée, fatigue persistante au réveil.',
    desc: 'Dépistage à domicile des troubles respiratoires du sommeil (apnées), avec un appareil simple à porter la nuit.',
    whatIs: [
      "La polygraphie nocturne recherche, depuis chez vous, les troubles de la respiration pendant le sommeil, comme les apnées (de courtes pauses de la respiration la nuit).",
      "Un appareil léger, que vous posez vous-même le soir, enregistre votre respiration, votre rythme cardiaque et votre oxygénation pendant la nuit. Mal repérées, les apnées fatiguent le cœur : les dépister protège votre santé.",
    ],
    videoId: 'cUzh_W7415A', // Polygraphie nocturne — explainer video
    symptomPills: ['Ronflements', 'Somnolence en journée', 'Fatigue au réveil', 'Apnées suspectées'],
    symptomContext:
      "La polygraphie est indiquée en cas de ronflements importants, de somnolence dans la journée, de fatigue au réveil ou de pauses respiratoires constatées par l'entourage. Elle permet de confirmer un syndrome d'apnées du sommeil et d'en évaluer la sévérité.",
    steps: [
      { title: "Remise de l'appareil", text: "Vous récupérez l'appareil au cabinet avec une explication détaillée de la pose." },
      { title: 'Pose le soir', text: 'Vous installez vous-même les capteurs avant de vous coucher, chez vous.' },
      { title: "Nuit d'enregistrement", text: "L'appareil enregistre votre sommeil pendant une nuit complète." },
      { title: 'Restitution & résultats', text: "Vous rapportez l'appareil ; le médecin analyse la nuit et vous explique les résultats." },
    ],
    preparation: [
      'Gardez votre routine de coucher habituelle pour une nuit représentative.',
      'Évitez l’alcool et les somnifères le soir de l’examen, sauf avis médical.',
      'Présentez-vous avec une peau propre, sans crème, pour une bonne adhérence des capteurs.',
      'Suivez précisément la notice de pose remise au cabinet.',
    ],
    prevention: [
      { title: 'Surveillez votre poids', text: 'La perte de poids réduit souvent la fréquence des apnées du sommeil.' },
      { title: 'Limitez l’alcool le soir', text: 'L’alcool relâche les voies respiratoires et aggrave les apnées.' },
      { title: 'Dormez sur le côté', text: 'La position latérale diminue les ronflements et les pauses respiratoires.' },
    ],
    faq: [
      {
        q: "Qu'est-ce que la polygraphie nocturne ?",
        a: "C'est un examen qui permet de diagnostiquer à domicile les troubles respiratoires du sommeil, comme les apnées. Un appareil léger, posé le soir, enregistre votre respiration pendant la nuit. Il peut aussi servir à contrôler l'efficacité d'un traitement par PPC.",
      },
      {
        q: 'Dois-je dormir au cabinet ?',
        a: "Non. C'est tout l'intérêt de la polygraphie : vous dormez chez vous, dans votre lit, pour un enregistrement représentatif de vos nuits.",
      },
      {
        q: 'La pose est-elle compliquée ?',
        a: 'Non. L’appareil est conçu pour être posé soi-même. Une notice claire et une explication au cabinet vous guident pas à pas.',
      },
    ],
    doctorSlugs: ['sana-amraoui'],
    placeholder: false,
  },
  {
    // TODO: validation médicale — la cliente a signalé que le texte de
    // l'épreuve d'effort était à reprendre/clarifier (note interne, brief §4.12).
    id: 'epreuve-effort',
    name: "Épreuve d'effort",
    indef: 'une',
    category: 'Cœur · effort',
    group: 'coeur',
    headline: "Évaluer votre cœur à l'effort, sous surveillance médicale",
    reassurance: 'Effort progressif · Surveillance continue · Environ 30 minutes',
    why: "Dépister une insuffisance coronarienne ou un trouble du rythme à l'effort.",
    symptoms: "Douleur thoracique à l'effort, essoufflement, bilan avant reprise du sport.",
    desc: "Effort physique progressif et contrôlé sur vélo ou tapis, avec surveillance de l'ECG et de la tension.",
    whatIs: [
      "L'épreuve d'effort évalue le comportement de votre cœur pendant un effort physique progressif et contrôlé, réalisé sur un vélo ou un tapis de marche, sous surveillance médicale continue. Votre ECG, votre tension artérielle et vos symptômes sont enregistrés tout au long de l'effort, augmenté par paliers jusqu'à un niveau adapté à vos capacités.",
      "Cet examen permet de dépister une insuffisance coronarienne (un rétrécissement des artères du cœur), d'évaluer la tolérance à l'effort, de rechercher des troubles du rythme déclenchés par l'effort, ou de contrôler l'efficacité d'un traitement. Il n'est pas douloureux, bien qu'il demande un effort physique réel ; il dure environ 30 minutes au total, préparation et récupération comprises.",
    ],
    videoId: 'SuGp0YwWZzo', // Épreuve d'effort — explainer video
    symptomPills: ["Douleur à l'effort", 'Essoufflement', 'Avant le sport', 'Suivi coronarien'],
    symptomContext:
      "L'épreuve d'effort est indiquée pour explorer une douleur ou un essoufflement survenant à l'effort, dépister une atteinte des artères coronaires, ou évaluer le cœur avant une reprise sportive. (Texte à faire relire avant publication.)",
    steps: [
      { title: 'Préparation', text: "Des électrodes et un brassard de tension sont installés ; le médecin vérifie votre état avant de commencer." },
      { title: 'Effort progressif', text: "Vous pédalez ou marchez, l'effort augmentant par paliers, sous surveillance continue." },
      { title: 'Surveillance', text: "ECG, tension et symptômes sont suivis en permanence par l'équipe médicale." },
      { title: 'Récupération & résultats', text: 'Après une phase de récupération, le médecin vous explique les résultats.' },
    ],
    preparation: [
      'Prévoyez une tenue et des chaussures de sport confortables.',
      "Évitez un repas lourd dans les deux heures précédant l'examen.",
      "Ne modifiez aucun traitement sans avis : demandez à votre médecin si une adaptation est nécessaire.",
      'Apportez vos précédents examens cardiologiques.',
    ],
    prevention: [
      { title: 'Reprenez progressivement', text: "Augmentez l'intensité du sport par étapes, sans brûler les paliers." },
      { title: 'Échauffez-vous', text: 'Un bon échauffement protège le cœur et les muscles.' },
      { title: 'Écoutez les signaux', text: "Douleur, essoufflement anormal ou malaise à l'effort imposent l'arrêt et un avis médical." },
    ],
    faq: [
      { q: "L'épreuve d'effort est-elle risquée ?", a: "Elle se déroule sous surveillance médicale continue, avec une équipe prête à intervenir. L'effort est adapté à vos capacités et interrompu au moindre signe anormal." },
      { q: 'Combien de temps dure-t-elle ?', a: 'Environ 30 minutes au total, préparation et récupération comprises.' },
      { q: 'Vais-je devoir beaucoup forcer ?', a: "L'effort est progressif et adapté à votre condition ; il augmente par paliers jusqu'à un niveau raisonnable pour vous." },
    ],
    doctorSlugs: ['sana-amraoui'],
    placeholder: false,
  },
  {
    // Vascular Doppler "hub": one page, six sub-explorations (see ExamHub.jsx).
    // Performed by the practice's médecin vasculaire (Dr Hakem).
    id: 'doppler-vasculaire',
    name: 'Échographie Doppler vasculaire',
    indef: 'une',
    category: 'Examen vasculaire',
    group: 'vasculaire',
    headline: 'Échographie Doppler vasculaire',
    reassurance:
      "Un examen indolore et précis pour explorer la circulation du sang (artères et veines) et vous expliquer chaque résultat avec clarté.",
    why: 'Explorer les artères et les veines : carotides, artères des membres inférieurs, aorte, artères rénales, etc.',
    symptoms: "Douleurs à la marche, jambes lourdes, hypertension, dépistage d'anévrisme.",
    desc: 'Six explorations Doppler en un seul rendez-vous, pour les artères et les veines, par un médecin spécialisé en pathologie vasculaire.',
    videoId: 'tc7KTED100U', // Doppler vasculaire — explainer video (homepage card; no inline slot on the hub page yet)
    doctorNote:
      "Chaque examen est réalisé personnellement par le Dr Hakem, de l'acquisition des images à l'interprétation. Le compte-rendu vous est remis et expliqué en consultation.",
    // Animated anatomy figure: base image + per-territory highlight points
    // (x/y as % of the image). Tuned to public/images/anatomy-vascular.jpg.
    anatomy: {
      image: '/images/anatomy-vascular.jpg',
      points: {
        tsa: [{ x: 50, y: 15 }],
        'ms-arteres': [{ x: 27, y: 43 }, { x: 73, y: 43 }],
        renales: [{ x: 43, y: 40 }, { x: 57, y: 40 }],
        aorte: [{ x: 50, y: 45 }],
        'mi-arteres': [{ x: 47, y: 61 }, { x: 54, y: 61 }],
        veineux: [{ x: 41, y: 79 }, { x: 59, y: 79 }],
      },
    },
    subExams: [
      {
        key: 'tsa',
        icon: 'tsa',
        region: 'Cou & cerveau',
        title: 'Doppler des troncs supra-aortiques (TSA)',
        cardTitle: 'Troncs supra-aortiques',
        cardTeaser: "Carotides, vertébrales · risque d'AVC",
        meta: ['Environ 15 min', 'Allongé(e), tête légèrement tournée', 'Aucune préparation'],
        body: [
          "Cet examen explore les artères carotides et vertébrales, qui acheminent le sang vers le cerveau. Il permet de repérer d'éventuelles plaques d'athérome ou un rétrécissement (sténose) de ces vaisseaux.",
          "Totalement indolore, il consiste à passer une sonde le long du cou. Les résultats aident à évaluer le risque d'accident vasculaire cérébral et à adapter, si besoin, votre traitement.",
        ],
        concernedIf: [
          'Facteurs de risque cardiovasculaire (tension, cholestérol, tabac)',
          "Antécédent familial d'AVC",
          'Souffle entendu au stéthoscope',
          'Bilan de routine après 50 ans',
        ],
      },
      {
        key: 'mi-arteres',
        icon: 'jambes',
        region: 'Jambes · artères',
        title: 'Doppler des artères des membres inférieurs',
        cardTitle: 'Artères des membres inférieurs',
        cardTeaser: 'Artérite, douleur à la marche',
        meta: ['20 à 30 min', 'Allongé(e) sur le dos', 'Aucune préparation'],
        body: [
          "Cet examen suit le trajet des artères des jambes, de l'aine jusqu'aux pieds, afin de détecter un rétrécissement ou une obstruction liés à l'athérosclérose.",
          "Il est particulièrement recommandé en cas de douleur à la marche, de diabète ou de tabagisme, pour évaluer la sévérité de l'atteinte et orienter la prise en charge.",
        ],
        concernedIf: [
          'Douleur au mollet à la marche (claudication)',
          'Diabète',
          'Tabagisme',
          'Pied froid ou plaie qui cicatrise mal',
        ],
      },
      {
        key: 'renales',
        icon: 'reins',
        region: 'Reins',
        title: 'Doppler des artères rénales',
        cardTitle: 'Artères rénales',
        cardTeaser: 'Tension difficile à équilibrer',
        meta: ['Environ 15 min', 'Allongé(e) sur le dos', 'Idéalement à jeun, sans tabac avant'],
        body: [
          "Cet examen étudie les artères qui alimentent les reins, à la recherche d'un rétrécissement pouvant expliquer une tension artérielle difficile à équilibrer ou une baisse de la fonction rénale.",
          "Il se déroule allongé(e), sonde posée sur l'abdomen. Pour une image optimale, il est conseillé de venir à jeun et sans avoir fumé dans les heures précédentes.",
        ],
        concernedIf: [
          'Hypertension résistante aux traitements',
          'Dégradation de la fonction rénale',
          'Bilan avant certains traitements',
        ],
      },
      {
        key: 'aorte',
        icon: 'aorte',
        region: 'Abdomen',
        title: "Doppler de l'aorte abdominale",
        cardTitle: 'Aorte abdominale',
        cardTeaser: "Dépistage d'anévrisme",
        meta: ['Environ 15 min', 'Allongé(e) sur le dos', 'Idéalement à jeun'],
        body: [
          "L'aorte abdominale est la plus grande artère de l'organisme. Cet examen mesure son diamètre afin de dépister un anévrisme, une dilatation qui doit être surveillée.",
          "Il est particulièrement recommandé après 60 ans, chez les fumeurs ou en cas d'antécédent familial. Simple et rapide, il se fait idéalement à jeun pour une meilleure visualisation.",
        ],
        concernedIf: [
          'Plus de 60 ans',
          'Tabagisme',
          "Antécédent familial d'anévrisme",
          'Dépistage de routine',
        ],
      },
      {
        key: 'ms-arteres',
        icon: 'bras',
        region: 'Bras & mains',
        title: 'Doppler des artères des membres supérieurs',
        cardTitle: 'Artères des membres supérieurs',
        cardTeaser: 'Douleur, engourdissement',
        meta: ['15 à 20 min', 'Assis(e) ou allongé(e)', 'Aucune préparation'],
        body: [
          "Cet examen explore les artères des bras, de l'épaule jusqu'à la main, pour détecter une atteinte artérielle ou un syndrome du défilé thoracique pouvant comprimer les vaisseaux.",
          "Indolore, il se réalise assis(e) ou allongé(e), parfois bras en mouvement pour reproduire la gêne ressentie. Aucune préparation particulière n'est nécessaire.",
        ],
        concernedIf: [
          'Main froide ou engourdie',
          "Douleur du bras à l'effort",
          'Fourmillements liés à la position du bras',
        ],
      },
      {
        key: 'veineux',
        icon: 'veines',
        region: 'Jambes · veines',
        title: 'Doppler veineux des membres inférieurs',
        cardTitle: 'Veines des membres inférieurs',
        cardTeaser: 'Phlébite, varices',
        meta: ['20 à 30 min', 'Debout puis allongé(e)', 'Aucune préparation'],
        body: [
          "Cet examen explore les veines des jambes, de l'aine au pied, pour rechercher une phlébite (thrombose veineuse) ou une insuffisance veineuse à l'origine de varices.",
          "Il commence debout, puis se poursuit allongé(e), pour étudier la circulation dans des conditions différentes. Il peut aussi s'inscrire dans le bilan d'un malaise ou d'une chute de tension en position debout.",
        ],
        concernedIf: [
          'Jambes lourdes ou gonflées',
          'Varices',
          'Suspicion de phlébite',
          'Malaises au lever',
        ],
      },
    ],
    faq: [
      {
        q: 'Dois-je être à jeun ?',
        a: "Cela dépend du territoire exploré : les Doppler des artères rénales et de l'aorte abdominale se font idéalement à jeun, pour limiter les gaz digestifs. Les autres explorations ne nécessitent aucune préparation.",
      },
      {
        q: "L'examen est-il douloureux ?",
        a: "Non, l'échographie Doppler est totalement indolore et sans irradiation. Une sonde est simplement déplacée sur la peau, avec un peu de gel.",
      },
      {
        q: "Ai-je besoin d'une ordonnance ?",
        a: 'Une prescription de votre médecin est généralement nécessaire pour les examens complémentaires. En cas de doute, notre secrétariat vous renseigne.',
      },
      {
        q: 'Quand aurai-je les résultats ?',
        a: 'Les résultats sont interprétés par le médecin et vous sont transmis dès leur analyse médicale.',
      },
    ],
    doctorSlugs: ['rabiaa-hakem'],
    placeholder: false,
  },
  {
    id: 'rythmologie',
    name: 'Rythmologie interventionnelle',
    indef: 'une',
    category: 'Rythmologie interventionnelle',
    group: 'vasculaire',
    headline: 'Traiter les troubles du rythme cardiaque complexes',
    reassurance: 'Prise en charge spécialisée en milieu hospitalier',
    where: 'En milieu hospitalier',
    why: 'Prise en charge des arythmies complexes.',
    symptoms: 'Arythmies complexes nécessitant une prise en charge spécialisée.',
    desc: 'Ablation par cathéter, implantation de stimulateur (pacemaker) ou de défibrillateur, Holter implantable.',
    whatIs: [
      "La rythmologie interventionnelle regroupe les traitements des troubles du rythme cardiaque les plus complexes : remettre le cœur à un rythme régulier, ou poser un stimulateur (pacemaker) ou un défibrillateur.",
      "Ces actes sont réalisés en milieu hospitalier spécialisé. (Contenu provisoire, à compléter avant la mise en ligne.)",
    ],
    videoId: 'hgBSYW9V8S8', // Rythmologie interventionnelle — explainer video
    symptomPills: ['Arythmie complexe', 'Fibrillation atriale', 'Suivi spécialisé'],
    symptomContext:
      "La rythmologie interventionnelle s'adresse aux patients présentant des troubles du rythme nécessitant un traitement spécialisé. (Contenu provisoire, à compléter.)",
    steps: [
      { title: 'Consultation spécialisée', text: 'Évaluation du trouble du rythme et discussion de la prise en charge. (Contenu provisoire.)' },
      { title: 'Intervention', text: "L'acte est réalisé en milieu hospitalier spécialisé. (Contenu provisoire.)" },
      { title: 'Surveillance', text: 'Suivi post-intervention adapté. (Contenu provisoire.)' },
      { title: 'Suivi au long cours', text: 'Contrôles réguliers du dispositif ou du résultat. (Contenu provisoire.)' },
    ],
    preparation: [
      'Les consignes de préparation vous sont communiquées lors de la consultation spécialisée. (Contenu provisoire.)',
    ],
    prevention: [
      { title: 'Suivez votre traitement', text: 'L’observance du traitement est essentielle au bon contrôle du rythme. (Contenu provisoire.)' },
      { title: 'Consultez régulièrement', text: 'Un suivi rythmologique régulier sécurise votre prise en charge. (Contenu provisoire.)' },
      { title: 'Adoptez une hygiène de vie saine', text: 'Activité, sommeil et modération des excitants soutiennent votre cœur. (Contenu provisoire.)' },
    ],
    faq: [],
    doctorSlugs: ['sana-amraoui'],
    placeholder: true,
  },
]

// Homepage exam categories (display order). Each exam carries a `group` key
// matching one of these; Services.jsx renders one block per group.
export const EXAM_GROUPS = [
  { key: 'coeur', label: 'Cœur', icon: 'heart', desc: "Explorer le fonctionnement du cœur, du repos à l'effort." },
  { key: 'ambulatoire', label: 'Ambulatoire', icon: 'clock', desc: 'Mesurer sur la durée, en conditions de vie réelle.' },
  { key: 'vasculaire', label: 'Vasculaire & spécialisé', icon: 'vessel', desc: 'Des explorations ciblées pour des besoins spécifiques.' },
]

// §8 — Cardiovascular risk factors (shown via <FacteursRisque/>, e.g. on the
// Hypertension pathology page). Screening + target from the brief.
// TODO: validation médicale — objectifs chiffrés à valider avant publication (brief §12)
export const RISK_FACTORS = [
  { key: 'hypertension', name: 'Hypertension artérielle', icon: 'pulse', screening: "Mesure répétée de la tension, complétée si besoin d'un holter tensionnel de 24 h.", target: '< 135/85 mmHg' },
  { key: 'diabete', name: 'Diabète', icon: 'drop', screening: 'Glycémie à jeun et hémoglobine glyquée (HbA1c).', target: 'HbA1c < 7 %' },
  { key: 'cholesterol', name: 'Cholestérol (dyslipidémie)', icon: 'flask', screening: 'Bilan lipidique : LDL, HDL et triglycérides.', target: 'LDL selon le risque' },
  { key: 'tabac', name: 'Tabac', icon: 'smoke', screening: 'Interrogatoire, avec quantification en paquets-années.', target: 'Arrêt complet' },
  { key: 'surpoids', name: 'Surpoids', icon: 'scale', screening: 'Indice de masse corporelle (IMC) et tour de taille.', target: 'IMC < 25 · tour < 94/80 cm' },
  { key: 'sedentarite', name: 'Sédentarité', icon: 'run', screening: "Évaluation du niveau d'activité physique habituel.", target: '≥ 150 min / semaine' },
  { key: 'antecedents', name: 'Antécédents familiaux', icon: 'family', screening: 'Interrogatoire : événement cardiovasculaire précoce chez un parent proche.', target: 'Dépistage plus précoce', label: 'Repère' },
]

// §5 — Consultations & motifs de consultation. Listed on /consultations, grouped
// by domain. Copy is shortened from the brief (§5). Each books via the modal.
export const CONSULTATION_GROUPS = [
  { key: 'cardiologie', label: 'Cardiologie', icon: 'heart', desc: "Le suivi cardiologique courant, du contrôle de routine à l'exploration du rythme." },
  { key: 'bilans', label: 'Bilans & motifs', icon: 'doc', desc: "Une consultation ciblée, organisée autour d'un symptôme ou d'un diagnostic déjà identifié." },
  { key: 'chirurgie', label: 'Chirurgie', icon: 'scalpel', desc: "Une consultation avant ou après une intervention, en lien avec l'équipe chirurgicale." },
  { key: 'nutrition', label: 'Nutrition & prévention', icon: 'leaf', desc: "Un accompagnement pour agir sur l'hygiène de vie et les facteurs de risque modifiables." },
]

export const CONSULTATIONS = [
  { id: 'consultation-cardiologie', group: 'cardiologie', name: 'Consultation de cardiologie', teaser: "Un examen clinique complet pour faire le point sur votre cœur, vos antécédents et vos facteurs de risque." },
  { id: 'consultation-rythmologie', group: 'cardiologie', name: 'Consultation de rythmologie', teaser: "Dédiée aux troubles du rythme cardiaque : palpitations, fibrillation atriale, ou suivi d'un traitement." },
  { id: 'bilan-cardiovasculaire', group: 'cardiologie', name: 'Bilan cardiovasculaire', teaser: "Un point complet sur la santé de votre cœur en un rendez-vous : consultation, ECG et échographie cardiaque.", detailTo: '/examens/bilan' },
  { id: 'douleur-thoracique', group: 'bilans', name: 'Bilan de douleur thoracique', teaser: "Une évaluation en cas de douleur dans la poitrine, pour en identifier l'origine et écarter une cause cardiaque." },
  { id: 'dyspnee', group: 'bilans', name: "Bilan d'essoufflement (dyspnée)", teaser: "Pour explorer un essoufflement inhabituel, à l'effort ou au repos, et en comprendre la cause." },
  { id: 'valvulopathie', group: 'bilans', name: 'Bilan de valvulopathie', teaser: "Le suivi d'une atteinte des valves cardiaques, connue ou suspectée, avec adaptation du traitement si besoin." },
  { id: 'insuffisance-cardiaque', group: 'bilans', name: "Suivi d'insuffisance cardiaque", teaser: "Un accompagnement régulier pour ajuster le traitement et suivre une insuffisance cardiaque connue." },
  { id: 'chirurgie-cardiaque', group: 'chirurgie', name: 'Consultation de chirurgie cardiaque', teaser: "Évaluer l'indication d'une intervention sur le cœur : chirurgie valvulaire, pontage, chirurgie de l'aorte." },
  { id: 'chirurgie-vasculaire', group: 'chirurgie', name: 'Consultation de chirurgie vasculaire', teaser: "Prise en charge des artères et des veines, par techniques mini-invasives ou chirurgie conventionnelle." },
  { id: 'bilan-nutritionnel', group: 'nutrition', name: 'Bilan nutritionnel', teaser: "Un point sur vos habitudes alimentaires et un rééquilibrage personnalisé, adapté à votre profil cardiovasculaire." },
  { id: 'vitaminotherapie', group: 'nutrition', name: 'Vitaminothérapie', teaser: "Supplémentation en vitamines et oligo-éléments, prescrite après une carence avérée par bilan biologique." },
]

// §4.5 — Global FAQ (homepage). Distinct from per-exam FAQ above.
// Homepage FAQ: kept short and broad on purpose — the most common questions a
// patient asks before booking. Exam-specific questions live on each exam page.
export const FAQ = [
  {
    q: 'Vos examens sont-ils douloureux ?',
    a: "Non. L'ECG, l'échographie cardiaque, les Holters, le Doppler et la polygraphie sont indolores et sans irradiation. Seule l'épreuve d'effort demande un effort physique réel, réalisé sous surveillance médicale continue.",
  },
  {
    q: 'Faut-il être à jeun ou prévoir une préparation ?',
    a: "La plupart de nos examens ne nécessitent aucune préparation. Seuls le Doppler des artères rénales et de l'aorte abdominale se font idéalement à jeun. Les consignes vous sont précisées lors de la prise de rendez-vous.",
  },
  {
    q: 'Quand vais-je recevoir mes résultats ?',
    a: 'Pour les examens réalisés au cabinet, vos résultats sont interprétés par le médecin et vous sont transmis dès leur analyse médicale.',
  },
  {
    q: 'Faut-il une ordonnance pour prendre rendez-vous ?',
    a: 'Une prescription de votre médecin est généralement nécessaire pour les examens complémentaires. En cas de doute, notre secrétariat vous renseigne.',
  },
  {
    q: "Que faire en cas d'urgence ?",
    a: "En cas d'urgence vitale (douleur thoracique intense et prolongée, malaise avec perte de connaissance, essoufflement brutal), appelez immédiatement le 15 (SAMU) ou le 112.",
  },
]

// §4.6 — Generic reassurance steps (kept for reference; exam pages use their
// own per-exam `steps`).
export const PARCOURS = [
  { n: '01', title: 'Examens indolores', text: "Nos examens sont indolores et n'entravent pas vos activités quotidiennes." },
  { n: '02', title: 'Pose rapide', text: "La pose est réalisée par l'assistante médicale en une dizaine de minutes." },
  { n: '03', title: 'Rendez-vous en ligne', text: 'Réservez directement depuis le site, en quelques clics. Notre équipe vous contacte pour confirmer votre créneau.' },
  { n: '04', title: 'Résultats commentés', text: 'Vos résultats vous sont expliqués et commentés par le médecin.' },
]

// Paris métro line colors (official RATP palette)
const M1 = { line: '1', color: '#FFCD00', text: '#1c1810' }
const M2 = { line: '2', color: '#0064B0', text: '#ffffff' }

// §4.7 — Practice location (cabinet). The second-site hospital reference was
// removed from general site copy; it remains only in Dr Amraoui's bio.
export const LOCATIONS = [
  {
    name: 'Cabinet Cardio Check-up',
    tag: 'Paris 17',
    address: '29 Rue Bayen, 75017 Paris',
    phone: '01 86 47 13 16',
    phoneHref: 'tel:+33186471316',
    image: '/images/plaque-cabinet.jpg',
    note: 'Consultations, bilans cardiovasculaires et examens (ECG, ETT, Holter, MAPA, polygraphie).',
    walking: '5 min à pied de Charles de Gaulle-Étoile',
    metro: [
      { ...M2, station: 'Ternes' },
      { ...M1, station: 'Charles de Gaulle-Étoile' },
    ],
  },
]

// ── Lookup helpers ───────────────────────────────────────────────────────
export const getDoctor = (slug) => DOCTORS.find((d) => d.slug === slug) || null
export const getExam = (slug) => SERVICES.find((s) => s.id === slug) || null
export const getFounder = () => DOCTORS.find((d) => d.isFounder) || DOCTORS[0]
export const getPartners = () =>
  DOCTORS.filter((d) => !d.isFounder).sort((a, b) => (a.order ?? 99) - (b.order ?? 99))

// Doctors who perform a given exam (in DOCTORS display order).
export const doctorsForExam = (examSlug) => {
  const exam = getExam(examSlug)
  if (!exam) return []
  return DOCTORS.filter((d) => exam.doctorSlugs?.includes(d.slug))
}

// Exams a given doctor performs (derived from each exam's doctorSlugs). Chip
// display order follows the doctor's optional `expertiseOrder` (exam ids listed
// there come first, in that order); the rest keep SERVICES order.
export const examsForDoctor = (doctorSlug) => {
  const exams = SERVICES.filter((s) => s.doctorSlugs?.includes(doctorSlug))
  const order = getDoctor(doctorSlug)?.expertiseOrder
  if (!order?.length) return exams
  const rank = (id) => {
    const i = order.indexOf(id)
    return i === -1 ? order.length : i
  }
  return [...exams].sort((a, b) => rank(a.id) - rank(b.id))
}

// ── Blog / Actualités ────────────────────────────────────────────────────
// SEO + GEO editorial. Each post is self-contained. `author` is a doctor slug
// (author identity, photo and profile link are derived from DOCTORS, the single
// source of truth). `body` is an ordered array of typed content blocks rendered
// by ArticleBody.jsx. Block types:
//   { type: 'p',     text }                       paragraph
//   { type: 'h2',    text }                       section heading
//   { type: 'h3',    text }                       sub-heading
//   { type: 'quote', text, cite? }               pull quote
//   { type: 'list',  items: [...] }              bullet list
//   { type: 'tip',   title, text, tone? }        highlighted box ('tone: urgent' = red)
//   { type: 'image', src, alt, caption? }        figure with caption
//   { type: 'video', videoId, caption? }         embedded YouTube
// `date` is ISO (used for sorting + JSON-LD); display formatting is French.
export const POST_CATEGORIES = [
  'Tous',
  'Prévention',
  'Examens',
  'Rythmologie',
  'Chirurgie',
  'Conseils pratiques',
]

export const POSTS = [
  {
    slug: 'qu-est-ce-qu-un-holter-ecg',
    title: "Qu'est-ce qu'un Holter ECG ?",
    category: 'Examens',
    author: 'sana-amraoui',
    date: '2026-06-04',
    readingMin: 5,
    cover: '/images/news-holter.jpg',
    coverAlt: "Consultation de cardiologie au cabinet Cardio Check-up",
    excerpt:
      "Un petit boîtier qui enregistre votre cœur de 24 heures à 2 semaines. On vous explique simplement à quoi il sert, comment il se déroule et pourquoi votre cardiologue vous l'a prescrit.",
    body: [
      {
        type: 'p',
        text: "Votre cardiologue vous a prescrit un Holter ECG et ce nom un peu technique vous inquiète ? Rassurez-vous : il s'agit de l'un des examens les plus simples et les plus confortables de la cardiologie. Aucun geste douloureux, aucune préparation contraignante, et vous pouvez poursuivre votre vie quotidienne pendant toute la durée de l'enregistrement.",
      },
      {
        type: 'p',
        text: "Le Holter ECG est un enregistreur portable de l'électrocardiogramme. Concrètement, c'est un petit boîtier relié à quelques électrodes collées sur votre poitrine, qui suit l'activité électrique de votre cœur en continu, de 24 heures jusqu'à 2 semaines selon la prescription.",
      },
      {
        type: 'video',
        videoId: 'XusqaX3z1U8',
        caption: 'En vidéo : le déroulement d’un Holter ECG, expliqué pas à pas.',
      },
      { type: 'h2', text: "À quoi sert un Holter ECG ?" },
      {
        type: 'p',
        text: "Un électrocardiogramme classique, réalisé au cabinet, ne dure que quelques secondes. Or beaucoup de troubles du rythme cardiaque sont intermittents : ils vont et viennent, et ont toutes les chances d'être absents au moment précis de la consultation. Le Holter résout ce problème en enregistrant votre cœur sur la durée, dans vos conditions de vie réelles.",
      },
      {
        type: 'p',
        text: 'Votre médecin peut vous le prescrire notamment en cas de :',
      },
      {
        type: 'list',
        items: [
          "Palpitations ou sensation de cœur qui s'emballe",
          'Malaises, vertiges ou pertes de connaissance inexpliqués',
          "Suspicion de trouble du rythme comme la fibrillation atriale",
          "Contrôle de l'efficacité d'un traitement déjà en place",
        ],
      },
      { type: 'h2', text: 'Comment se déroule l’examen ?' },
      { type: 'h3', text: 'La pose' },
      {
        type: 'p',
        text: "Au cabinet, l'assistante médicale colle quelques électrodes sur votre thorax et les relie au boîtier, en une dizaine de minutes. La pose est totalement indolore. Vous repartez ensuite chez vous avec l'appareil.",
      },
      { type: 'h3', text: "Pendant l'enregistrement" },
      {
        type: 'p',
        text: "Vous vivez normalement : travail, marche, sommeil, activités habituelles. C'est même tout l'intérêt de l'examen : capturer votre cœur dans la vraie vie. On vous remet un petit carnet pour noter l'heure de vos symptômes (palpitations, malaise…), ce qui aide votre cardiologue à relier une sensation à un tracé précis.",
      },
      {
        type: 'tip',
        title: 'Bon à savoir',
        text: "L'appareil n'est pas étanche : pas de douche ni de bain pendant l'enregistrement, et on ne l'arrête jamais avant l'heure prévue. Une peau propre et sèche au moment de la pose aide les électrodes à bien adhérer.",
      },
      { type: 'h2', text: 'Que recherche votre cardiologue ?' },
      {
        type: 'p',
        text: "Une fois l'appareil rapporté, votre médecin analyse l'enregistrement à la recherche d'anomalies du rythme : battements trop rapides, trop lents, irréguliers, ou pauses. Il met ces événements en regard de votre carnet de symptômes pour poser un diagnostic précis et, si besoin, adapter votre prise en charge.",
      },
      {
        type: 'quote',
        text: "Le Holter, c'est un peu une caméra de surveillance bienveillante posée sur votre cœur : il observe sans rien changer à votre quotidien, et nous révèle ce qu'une consultation de quelques minutes ne peut pas voir.",
        cite: 'Dr Sana Amraoui',
      },
      {
        type: 'p',
        text: "Si vous avez la moindre question avant votre examen, n'hésitez pas à en parler à votre cardiologue ou à notre secrétariat : un examen bien compris est toujours mieux vécu.",
      },
    ],
  },
  {
    slug: '5-signes-consulter-cardiologue',
    title: "5 signes qui doivent vous inciter à consulter un cardiologue",
    category: 'Prévention',
    author: 'sana-amraoui',
    date: '2026-05-21',
    readingMin: 6,
    cover: '/images/news-signes.jpg',
    coverAlt: "Accueil du cabinet de cardiologie Cardio Check-up à Paris 17",
    excerpt:
      "Douleur dans la poitrine, essoufflement inhabituel, palpitations… Voici cinq signaux que votre cœur vous envoie et qu'il vaut mieux ne pas ignorer.",
    body: [
      {
        type: 'p',
        text: "Le cœur sait se faire discret, mais il envoie aussi des signaux. Savoir les reconnaître permet de consulter au bon moment, ni dans l'angoisse permanente, ni trop tard. Voici cinq symptômes qui méritent l'avis d'un cardiologue. Aucun d'eux n'est synonyme de maladie grave, mais chacun mérite d'être pris au sérieux.",
      },
      { type: 'h2', text: '1. Une douleur ou une oppression dans la poitrine' },
      {
        type: 'p',
        text: "Une sensation de serrement, de poids ou de brûlure derrière le sternum, surtout si elle survient à l'effort et cède au repos, doit toujours être évaluée. Elle peut être bénigne, mais c'est aussi le symptôme cardiaque à ne jamais banaliser.",
      },
      { type: 'h2', text: '2. Un essoufflement inhabituel' },
      {
        type: 'p',
        text: "Être essoufflé après un escalier que vous montiez sans peine il y a quelques mois, ou vous réveiller la nuit en manquant d'air, n'est pas un simple signe de fatigue ou d'âge. Un essoufflement qui s'installe ou s'aggrave mérite un bilan.",
      },
      { type: 'h2', text: '3. Des palpitations' },
      {
        type: 'p',
        text: "Sentir son cœur s'emballer, cogner, sauter un battement ou battre de façon irrégulière est une raison fréquente de consultation. Le plus souvent sans gravité, ces palpitations peuvent parfois révéler un trouble du rythme qu'un Holter ECG saura objectiver.",
      },
      { type: 'h2', text: '4. Des malaises ou pertes de connaissance' },
      {
        type: 'p',
        text: "Un malaise, une sensation de tête qui tourne juste avant de tomber, ou une vraie perte de connaissance, ne doivent jamais être mis sur le compte de la seule fatigue. Lorsqu'ils sont d'origine cardiaque, ils nécessitent un avis rapide.",
      },
      { type: 'h2', text: '5. Un gonflement des jambes ou une fatigue persistante' },
      {
        type: 'p',
        text: "Des chevilles qui gonflent en fin de journée, une fatigue inhabituelle et durable, une prise de poids rapide en quelques jours : associés, ces signes peuvent traduire un cœur qui peine à assurer son travail de pompe. Ils justifient une consultation.",
      },
      {
        type: 'tip',
        title: 'En cas d’urgence, appelez le 15',
        tone: 'urgent',
        text: "Une douleur intense dans la poitrine qui dure, qui s'accompagne d'un essoufflement, de sueurs, d'une douleur au bras ou à la mâchoire, est une urgence vitale. N'attendez pas : appelez immédiatement le SAMU (15) ou le 112.",
      },
      {
        type: 'quote',
        text: "Consulter, ce n'est pas s'alarmer : c'est reprendre le contrôle. La très grande majorité de ces symptômes ont une explication simple, encore faut-il l'entendre d'un professionnel plutôt que de l'imaginer seul.",
        cite: 'Dr Sana Amraoui',
      },
      {
        type: 'p',
        text: "Au-delà des symptômes, un bilan cardiovasculaire de prévention est recommandé en présence de facteurs de risque (hypertension, cholestérol, diabète, tabac, antécédents familiaux) ou avant une reprise sportive. Mieux vaut un examen rassurant qu'un doute qui s'éternise.",
      },
    ],
  },
  {
    slug: 'bien-se-preparer-bilan-cardiovasculaire',
    title: "Comment bien se préparer pour votre bilan cardiovasculaire",
    category: 'Conseils pratiques',
    author: 'leslie-berdah-sadaoui',
    date: '2026-05-06',
    readingMin: 4,
    cover: '/images/news-preparation.jpg',
    coverAlt: "Cardiologue préparant un bilan cardiovasculaire",
    excerpt:
      "Faut-il être à jeun ? Quels documents apporter ? Comment s'habiller ? Tout ce qu'il faut savoir pour arriver serein le jour de votre bilan.",
    body: [
      {
        type: 'p',
        text: "Le bilan cardiovasculaire réunit en un seul rendez-vous une consultation, un électrocardiogramme et une échographie cardiaque. C'est l'examen de référence pour faire le point sur la santé de votre cœur. Bonne nouvelle : il ne demande presque aucune préparation. Voici les quelques points utiles pour aborder ce rendez-vous l'esprit tranquille.",
      },
      { type: 'h2', text: 'Faut-il être à jeun ?' },
      {
        type: 'p',
        text: "Non. C'est la question la plus fréquente, et la réponse est rassurante : vous pouvez manger normalement avant votre bilan. Aucun jeûne n'est nécessaire pour la consultation, l'ECG ou l'échographie cardiaque.",
      },
      { type: 'h2', text: 'Les documents à apporter' },
      {
        type: 'p',
        text: "Pour que le cardiologue dispose de toute l'information utile, pensez à réunir :",
      },
      {
        type: 'list',
        items: [
          'Votre carte Vitale et votre éventuelle lettre du médecin traitant',
          'La liste de vos traitements en cours (ou les boîtes)',
          'Vos derniers examens cardiologiques si vous en avez (ECG, échographie, bilan sanguin)',
          'Vos résultats de tension artérielle si vous en mesurez à domicile',
        ],
      },
      { type: 'h2', text: "Comment s'habiller ?" },
      {
        type: 'p',
        text: "Privilégiez une tenue simple, facile à retirer pour le haut du corps : l'échographie cardiaque et la pose des électrodes nécessitent d'accéder au thorax. Une chemise ou un t-shirt que l'on enlève facilement est idéal. Évitez les bijoux encombrants autour du cou.",
      },
      {
        type: 'tip',
        title: 'Ne modifiez rien sans avis',
        text: "Continuez à prendre vos traitements habituels comme d'ordinaire, sauf indication contraire explicite de votre médecin. N'arrêtez jamais un médicament de vous-même avant un examen.",
      },
      { type: 'h2', text: 'Le jour J, étape par étape' },
      {
        type: 'p',
        text: "Le rendez-vous se déroule sans surprise : un temps d'échange avec le cardiologue sur vos antécédents et votre mode de vie, puis l'électrocardiogramme (rapide et indolore) et enfin l'échographie cardiaque, qui visualise la structure et le fonctionnement de votre cœur grâce à une simple sonde posée sur la peau. Les résultats vous sont ensuite expliqués par le cardiologue.",
      },
      {
        type: 'quote',
        text: "Un patient détendu, c'est un meilleur examen. Arriver en avance, sans stress, en sachant à quoi s'attendre : c'est déjà la moitié du chemin vers un bilan de qualité.",
        cite: 'Dr Leslie Berdah Sadaoui',
      },
      {
        type: 'p',
        text: "En cas de doute sur l'organisation de votre rendez-vous, notre secrétariat est là pour répondre à vos questions. Vous repartirez avec une vision claire de la santé de votre cœur et, si nécessaire, des prochaines étapes.",
      },
    ],
  },
  {
    slug: 'qu-est-ce-que-l-ablation-par-catheter',
    title: "Qu'est-ce que l'ablation par cathéter ?",
    category: 'Rythmologie',
    author: 'sana-amraoui',
    date: '2026-04-18',
    readingMin: 7,
    cover: '/images/news-ablation.jpg',
    coverAlt: "Rythmologie interventionnelle, traitement des troubles du rythme",
    excerpt:
      "Une technique de référence pour traiter durablement certains troubles du rythme cardiaque, sans chirurgie à cœur ouvert. Explications en mots simples.",
    body: [
      {
        type: 'p',
        text: "Quand un trouble du rythme cardiaque résiste aux médicaments ou retentit sur la qualité de vie, la rythmologie interventionnelle propose une solution souvent décisive : l'ablation par cathéter. Derrière ce nom impressionnant se cache une technique éprouvée, mini-invasive, qui vise à corriger l'anomalie à sa source.",
      },
      { type: 'h2', text: "Le principe de l'ablation" },
      {
        type: 'p',
        text: "Certaines arythmies naissent d'un petit foyer de cellules cardiaques qui émet des impulsions électriques anarchiques, ou d'un circuit électrique anormal au sein du cœur. L'ablation consiste à neutraliser très précisément cette zone responsable, à l'aide d'un cathéter (un fin tuyau souple) introduit jusqu'au cœur par une veine, le plus souvent au pli de l'aine.",
      },
      {
        type: 'p',
        text: "Une fois la zone repérée, on l'inactive par la chaleur (radiofréquence) ou par le froid (cryoablation). Le cœur retrouve alors, dans une majorité de cas, un rythme régulier.",
      },
      { type: 'h2', text: 'Quels troubles du rythme peut-on traiter ?' },
      {
        type: 'list',
        items: [
          'La fibrillation atriale, le trouble du rythme le plus fréquent',
          'Le flutter atrial',
          'Les tachycardies jonctionnelles (Bouveret)',
          'Certaines extrasystoles et tachycardies ventriculaires',
        ],
      },
      { type: 'h2', text: "Comment se déroule l'intervention ?" },
      { type: 'h3', text: 'Avant' },
      {
        type: 'p',
        text: "L'intervention est précédée d'un bilan complet et d'une consultation de rythmologie qui valide l'indication et répond à toutes vos questions. Elle se déroule en milieu hospitalier spécialisé.",
      },
      { type: 'h3', text: 'Pendant' },
      {
        type: 'p',
        text: "Vous êtes installé confortablement, sous anesthésie locale et sédation (parfois anesthésie générale). Le rythmologue guide les cathéters jusqu'au cœur sous contrôle d'imagerie, cartographie l'activité électrique, puis réalise l'ablation. L'intervention dure généralement entre une et trois heures.",
      },
      { type: 'h3', text: 'Après' },
      {
        type: 'p',
        text: "Une surveillance de quelques heures à une nuit est habituelle. La reprise des activités est rapide, avec quelques précautions au point de ponction. Un suivi rythmologique permet de vérifier le résultat dans les semaines qui suivent.",
      },
      {
        type: 'tip',
        title: 'Un geste très encadré',
        text: "L'ablation par cathéter est pratiquée depuis des décennies et bénéficie d'un haut niveau de sécurité. Comme tout geste médical, elle comporte des risques, rares, qui vous sont expliqués en détail lors de la consultation préalable.",
      },
      {
        type: 'quote',
        text: "Traiter l'arythmie à sa source, plutôt que d'en masquer les symptômes au long cours : c'est tout le sens de la rythmologie interventionnelle. Pour de nombreux patients, c'est un vrai retour à une vie normale.",
        cite: 'Dr Sana Amraoui',
      },
      {
        type: 'p',
        text: "Chaque situation est unique : seule une consultation spécialisée permet de dire si l'ablation est la meilleure option pour vous, et selon quelles modalités.",
      },
    ],
  },
  {
    slug: 'sport-apres-40-ans-sante-cardiaque',
    title: "Sport après 40 ans et santé cardiaque",
    category: 'Conseils pratiques',
    author: 'fabien-doguet',
    date: '2026-03-29',
    readingMin: 6,
    cover: '/images/news-sport.jpg',
    coverAlt: "Pr Fabien Doguet, chirurgien cardiaque et marathonien",
    excerpt:
      "Reprendre ou intensifier le sport après 40 ans est l'une des meilleures décisions pour votre cœur, à condition de respecter quelques règles simples. Les conseils du Pr Doguet.",
    body: [
      {
        type: 'p',
        text: "Chirurgien cardiaque le jour, coureur de fond le reste du temps, j'ai couru plus de vingt marathons et relevé quelques-uns des défis les plus exigeants au monde : l'UTMB, la Diagonale des Fous, le Marathon des Sables, l'Ironman. Je peux vous l'affirmer des deux côtés du bistouri : il n'y a pas d'âge pour prendre soin de son cœur par le mouvement.",
      },
      {
        type: 'quote',
        text: "On ne devient pas vieux parce qu'on arrête de bouger ; on arrête de bouger parce qu'on se croit devenu vieux. Après 40 ans, le sport n'est pas un risque à éviter, c'est un médicament à bien doser.",
        cite: 'Pr Fabien Doguet',
      },
      { type: 'h2', text: 'Pourquoi le sport est votre meilleur allié cardiaque' },
      {
        type: 'p',
        text: "L'activité physique régulière est l'une des interventions les plus puissantes que l'on connaisse pour le cœur, et aucune chirurgie ne la remplace. Pratiquée avec régularité, elle :",
      },
      {
        type: 'list',
        items: [
          'Abaisse la tension artérielle et améliore le profil de cholestérol',
          'Aide à prévenir et à mieux contrôler le diabète',
          "Renforce le muscle cardiaque et la capacité à l'effort",
          "Réduit le stress, améliore le sommeil et l'humeur",
        ],
      },
      { type: 'h2', text: 'Le bilan avant de (re)commencer' },
      {
        type: 'p',
        text: "Passé 40 ans, surtout après une longue interruption ou en présence de facteurs de risque, un avis cardiologique avant de reprendre est une sage précaution. Un bilan cardiovasculaire, parfois complété d'un test d'effort, permet de partir sur des bases sûres.",
      },
      {
        type: 'tip',
        title: "Au-delà de 40 ans, demandez un avis",
        text: "Si vous reprenez après des années d'arrêt, si vous avez de l'hypertension, du cholestérol, du diabète, des antécédents familiaux, ou si vous visez un objectif ambitieux (semi-marathon, trail), parlez-en à un cardiologue avant de vous lancer.",
      },
      { type: 'h2', text: 'Reprendre progressivement' },
      {
        type: 'list',
        items: [
          'Commencez par de l\'endurance douce : marche rapide, vélo, natation',
          'Augmentez la charge de 10 % par semaine, pas davantage',
          'Échauffez-vous, hydratez-vous, et accordez-vous de vrais jours de récupération',
          "Visez la régularité plutôt que l'exploit : 150 minutes par semaine suffisent déjà à transformer votre santé",
        ],
      },
      { type: 'h3', text: "Les signaux d'alerte à l'effort" },
      {
        type: 'p',
        text: "Apprenez à écouter votre corps. Arrêtez-vous et consultez si vous ressentez à l'effort une douleur dans la poitrine, un essoufflement anormal, des palpitations, un malaise ou des vertiges. Ces signaux ne doivent jamais être « poussés ».",
      },
      {
        type: 'p',
        text: "J'ai consacré un livre à ce sujet, parce que je crois profondément que le sport après 40 ans, bien encadré, ajoute des années à la vie et de la vie aux années. Faites-vous accompagner, fixez-vous des objectifs réalistes, et prenez du plaisir : c'est encore la meilleure garantie de continuer.",
      },
    ],
  },
]

// ── Blog lookup helpers ──────────────────────────────────────────────────
const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)

export const getPost = (slug) => POSTS.find((p) => p.slug === slug) || null

// All posts, newest first (the index list + homepage strip rely on this order).
export const getPosts = () => [...POSTS].sort(byDateDesc)

export const getRecentPosts = (n = 3) => getPosts().slice(0, n)

// Related = same category first (newest first), back-filled with other recent
// posts so the article page always has `n` suggestions, never an awkward gap.
export const getRelatedPosts = (post, n = 3) => {
  const sameCat = getPosts().filter((p) => p.slug !== post.slug && p.category === post.category)
  if (sameCat.length >= n) return sameCat.slice(0, n)
  const others = getPosts().filter(
    (p) => p.slug !== post.slug && p.category !== post.category,
  )
  return [...sameCat, ...others].slice(0, n)
}

// ── Pathologies ───────────────────────────────────────────────────────────
// Disease pages (brief §7). Same block schema as POSTS, but a separate set so
// they are NOT mixed with the Actualités news feed; listed at /pathologies and
// read at /pathologies/:slug (rendered by the shared Article template).
// `showRiskFactors` + `riskHighlight` render the <FacteursRisque/> table.
// Covers reuse existing imagery as placeholders (to refine before go-live).
// Epidemiology figures and clinical claims are flagged for validation (§12).
export const PATHOLOGIES = [
  {
    slug: 'fibrillation-atriale',
    title: 'La fibrillation atriale',
    category: 'Pathologie',
    author: 'sana-amraoui',
    date: '2026-06-20',
    readingMin: 6,
    cover: '/images/patho-fibrillation.jpg',
    coverAlt: 'Rythmologie : prise en charge de la fibrillation atriale',
    excerpt:
      "Le trouble du rythme le plus fréquent chez l'adulte. Comprendre la fibrillation atriale, ses risques pour le cœur et le cerveau, et les traitements, dont l'ablation.",
    body: [
      { type: 'p', text: "La fibrillation atriale est le trouble du rythme cardiaque le plus fréquent chez l'adulte. Elle se caractérise par une activité électrique anarchique des oreillettes, qui perdent leur contraction coordonnée et entraînent un rythme cardiaque irrégulier, souvent rapide." },
      { type: 'h2', text: 'Une arythmie très fréquente' },
      // TODO: validation médicale — chiffres de prévalence à valider (brief §12)
      { type: 'p', text: "La fibrillation atriale touche plus de 750 000 personnes en France, avec entre 110 000 et 230 000 nouveaux cas chaque année. Sa fréquence augmente fortement avec l'âge : de 2 à 4 % après 60 ans à plus de 10 % au-delà de 80 ans." },
      { type: 'h2', text: 'Les facteurs favorisants' },
      { type: 'p', text: "Plusieurs facteurs favorisent son apparition. Les corriger, en complément du traitement de l'arythmie, permet généralement de mieux la contrôler." },
      { type: 'list', items: [
        "Facteurs modifiables : hypertension artérielle, diabète, surpoids, consommation d'alcool et syndrome d'apnée du sommeil (souvent sous-diagnostiqué)",
        'Facteurs non modifiables : âge, sexe et antécédents familiaux',
      ] },
      { type: 'h2', text: 'Les symptômes' },
      { type: 'p', text: "Elle peut se manifester par des palpitations, un essoufflement, une fatigue inhabituelle, une gêne thoracique ou des malaises. Elle peut aussi rester totalement silencieuse et n'être découverte que lors d'un examen systématique (ECG, holter rythmique), ce qui souligne l'importance d'un dépistage régulier." },
      { type: 'h2', text: 'Les nouveaux outils de dépistage' },
      // TODO: validation médicale — mentions des montres connectées à valider (brief §12)
      { type: 'p', text: "Le dépistage bénéficie aujourd'hui des objets connectés (montres, bracelets) équipés de capteurs, et parfois d'un ECG à une dérivation. Ils permettent de repérer une irrégularité du rythme au quotidien, en particulier lorsque la fibrillation atriale reste silencieuse. Toute alerte doit néanmoins être confirmée par un avis médical." },
      { type: 'h2', text: 'Pourquoi la traiter ?' },
      { type: 'p', text: "La fibrillation atriale n'est pas seulement gênante : en favorisant la formation de caillots dans les oreillettes, elle augmente le risque d'accident vasculaire cérébral, et peut à terme favoriser une insuffisance cardiaque. Sa prise en charge associe l'évaluation du risque thrombo-embolique, avec si besoin un traitement anticoagulant, et le traitement du trouble du rythme." },
      { type: 'h2', text: 'Le traitement par ablation' },
      { type: 'p', text: "Lorsque le traitement médicamenteux ne suffit pas, une ablation peut être proposée. Cette technique vise à neutraliser les zones du cœur responsables de l'arythmie, principalement par isolation des veines pulmonaires. Elle permet, chez de nombreux patients, de réduire la fréquence des épisodes, voire de retrouver un rythme régulier durable." },
      // TODO: validation médicale — affirmations ablation ambulatoire + électroporation 3D (brief §12)
      { type: 'tip', title: "L'expertise du Dr Amraoui", text: "Rythmologue interventionnelle, le Dr Amraoui est spécialisée dans le traitement de la fibrillation atriale par ablation. Elle est précurseur des ablations en hospitalisation ambulatoire en France et de l'ablation par électroporation 3D." },
    ],
  },
  {
    slug: 'syndrome-apnee-du-sommeil',
    title: "Le syndrome d'apnée du sommeil",
    category: 'Pathologie',
    author: 'sana-amraoui',
    date: '2026-06-12',
    readingMin: 5,
    cover: '/images/patho-apnee.jpg',
    coverAlt: "Dépistage du syndrome d'apnée du sommeil",
    excerpt:
      "Ronflements, fatigue, somnolence : le syndrome d'apnée du sommeil est fréquent, souvent sous-diagnostiqué, et lourd de conséquences pour le cœur.",
    body: [
      { type: 'p', text: "Le syndrome d'apnées-hypopnées obstructives du sommeil (SAOS) se caractérise par des épisodes répétés d'arrêt (apnée) ou de réduction (hypopnée) de la respiration pendant le sommeil, liés à un relâchement des muscles des voies aériennes supérieures." },
      { type: 'h2', text: 'Une affection fréquente et sous-diagnostiquée' },
      // TODO: validation médicale — chiffres de prévalence à valider (brief §12)
      { type: 'p', text: "Le SAOS concerne entre 4 et 10 % de la population adulte selon l'âge, et augmente nettement avec celui-ci. Il reste largement sous-diagnostiqué : environ 8 patients sur 10 ne sont pas encore diagnostiqués." },
      { type: 'h2', text: 'Les symptômes' },
      { type: 'p', text: "Il se manifeste surtout par des ronflements importants, des pauses respiratoires constatées par l'entourage et une somnolence excessive dans la journée. Il peut aussi entraîner des troubles de la mémoire et de la concentration, ainsi que des troubles de l'humeur. Ces symptômes résultent des micro-réveils répétés qui fragmentent le sommeil et empêchent un repos réparateur." },
      { type: 'h2', text: 'Les risques pour le cœur' },
      { type: 'p', text: "Non traité, le SAOS a un impact important sur la santé cardiovasculaire. Il est fortement associé à l'hypertension artérielle, notamment résistante, et au diabète. Il favorise les troubles du rythme, en particulier la fibrillation atriale, et peut conduire à une insuffisance cardiaque. Il augmente aussi le risque d'accident vasculaire cérébral." },
      { type: 'h2', text: 'Le dépistage' },
      { type: 'p', text: "Le dépistage repose sur la polygraphie ventilatoire nocturne, réalisée à votre domicile : un appareil léger enregistre votre respiration, votre oxygénation et votre rythme cardiaque pendant une nuit, sans contrainte particulière." },
      { type: 'h2', text: 'Le traitement' },
      { type: 'p', text: "La prise en charge repose d'abord sur les mesures hygiéno-diététiques : la perte de poids est efficace quel que soit le degré de sévérité, et la réduction de l'alcool comme l'arrêt du tabac sont recommandés. Lorsque ces mesures ne suffisent pas, le traitement de référence est la ventilation en pression positive continue (PPC). D'autres options existent selon les cas : orthèse d'avancée mandibulaire, traitement positionnel." },
    ],
  },
  {
    slug: 'hypertension-arterielle',
    title: "L'hypertension artérielle",
    category: 'Pathologie',
    author: 'sana-amraoui',
    date: '2026-06-06',
    readingMin: 5,
    cover: '/images/patho-hypertension.jpg',
    coverAlt: "Consultation et suivi de l'hypertension artérielle",
    excerpt:
      "La maladie chronique la plus fréquente, et souvent silencieuse. Comprendre l'hypertension, son diagnostic et sa prise en charge.",
    showRiskFactors: true,
    riskHighlight: 'hypertension',
    body: [
      { type: 'p', text: "L'hypertension artérielle correspond à une élévation anormale et persistante de la pression du sang dans les artères. C'est la maladie chronique la plus fréquente, et l'un des principaux facteurs de risque cardiovasculaire." },
      { type: 'h2', text: 'Le « tueur silencieux »' },
      { type: 'p', text: "Elle est souvent appelée le « tueur silencieux », car elle peut ne provoquer aucun symptôme. La seule façon de la détecter est de mesurer régulièrement sa tension. Lorsque des symptômes surviennent (maux de tête, vertiges, troubles visuels, essoufflement), la maladie est souvent déjà évoluée." },
      { type: 'h2', text: 'Une maladie très répandue' },
      // TODO: validation médicale — chiffres d'épidémiologie à valider (brief §12)
      { type: 'p', text: "L'hypertension touche environ 17 millions de personnes en France, soit près de 30 % des adultes. Une grande partie l'ignorent, et de nombreux patients traités ne sont pas équilibrés." },
      { type: 'h2', text: 'Comment fait-on le diagnostic ?' },
      { type: 'p', text: "Le diagnostic repose sur la mesure répétée de la tension, à plusieurs reprises et à des jours différents. L'automesure à domicile ou le holter tensionnel de 24 h permettent de confirmer le diagnostic dans les conditions de vie habituelles, et de démasquer une hypertension « blouse blanche » ou, à l'inverse, masquée." },
      { type: 'h2', text: 'Les risques' },
      { type: 'p', text: "Non traitée, l'hypertension expose à des complications sérieuses : infarctus du myocarde, accident vasculaire cérébral, complications rénales. Elle favorise aussi les troubles du rythme, notamment la fibrillation atriale, et l'insuffisance cardiaque." },
      { type: 'h2', text: 'La prise en charge' },
      { type: 'p', text: "Elle repose d'abord sur des mesures hygiéno-diététiques : une alimentation plus saine, l'arrêt du tabac et une activité physique régulière. Lorsqu'elles ne suffisent pas, un traitement médicamenteux est mis en place, avec un suivi régulier pour ajuster le traitement et dépister précocement les complications." },
    ],
  },
]

export const getPathologie = (slug) => PATHOLOGIES.find((p) => p.slug === slug) || null
export const getPathologies = () => [...PATHOLOGIES].sort(byDateDesc)
export const getRelatedPathologies = (current, n = 3) =>
  getPathologies().filter((p) => p.slug !== current.slug).slice(0, n)
