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
  doctolib: 'https://www.doctolib.fr/cardiologue/neuilly-sur-seine/sana-amraoui',
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
    value: 'EHRA 2026',
    isText: true,
    line: "Chairperson de l'European Heart Rhythm Association",
  },
  {
    value: 3,
    suffix: '',
    line: 'Publications dans des revues internationales : JACC, Europace, Heart Rhythm',
  },
  {
    value: 9000,
    suffix: '',
    line: 'Consultations humanitaires par an au Maroc',
  },
]

// ── Doctors ────────────────────────────────────────────────────────────────
// Order here is display order on the team grid; the V-formation and founder
// blocks pick out Dr Amraoui explicitly via `isFounder`.
export const DOCTORS = [
  {
    slug: 'sana-amraoui',
    name: 'Dr Sana Amraoui',
    specialty: 'Cardiologue rythmologue interventionnelle',
    credibility: "Responsable d'unité · Service de rythmologie",
    isFounder: true,
    badge: 'Chairperson EHRA 2026',
    demo: false,
    photo: '/images/doctor-portrait.jpg',
    doctolib: CONTACT.doctolib,
    bioShort:
      'Cardiologue rythmologue interventionnelle, le Dr Amraoui coordonne le conseil Cardio Check-up et dirige une unité de rythmologie.',
    bio:
      "Diplômée de la faculté de médecine de Bordeaux et de la London School of Economics, ancienne cheffe de clinique du CHU de Bordeaux, le Dr Amraoui est responsable d'unité au service de rythmologie de l'Hôpital Américain de Paris. Elle a complété sa formation par des fellowships à St Thomas' Hospital (Londres) et à Columbia (New York). Elle accompagne ses patients dans le dépistage, le diagnostic et le suivi des maladies cardiovasculaires et des troubles du rythme cardiaque.",
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
    slug: 'adam-taha',
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
    headline: 'Un bilan complet de la santé de votre cœur, en un rendez-vous',
    reassurance: 'Sans préparation · ECG et échographie sur place · Résultats commentés le jour même',
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
      { title: 'Résultats commentés', text: 'Le médecin vous explique les résultats et les éventuelles suites, le jour même.' },
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
        a: 'Les résultats vous sont expliqués et commentés par le médecin le jour même de votre rendez-vous.',
      },
    ],
    doctorSlugs: ['sana-amraoui'],
    placeholder: false,
  },
  {
    id: 'holter-ecg',
    name: 'Holter ECG',
    indef: 'un',
    category: 'Enregistrement ambulatoire',
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
    name: 'MAPA (Holter tensionnel)',
    indef: 'un',
    category: 'Mesure ambulatoire de la pression',
    headline: 'Surveiller votre tension artérielle sur 24 heures, chez vous',
    reassurance: 'Indolore · Mesures automatiques · Vous gardez vos activités',
    why: "Hyper- ou hypotension, contrôle d'un traitement.",
    symptoms: "Tension artérielle instable, vertiges, suivi d'un traitement anti-hypertenseur.",
    desc: 'Enregistrement de la tension artérielle durant 24 h : mesure toutes les 20 min le jour et toutes les heures la nuit.',
    whatIs: [
      "La MAPA, ou Holter tensionnel, mesure automatiquement votre tension artérielle pendant 24 heures, grâce à un brassard relié à un petit boîtier que vous gardez sur vous.",
      "En suivant votre tension dans votre vie de tous les jours, elle donne une image bien plus fidèle qu'une seule mesure au cabinet et permet de vérifier qu'un traitement fonctionne bien.",
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
    name: 'Polygraphie nocturne',
    indef: 'une',
    category: 'Dépistage du sommeil à domicile',
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
    id: 'rythmologie',
    name: 'Rythmologie interventionnelle',
    indef: 'une',
    category: 'Rythmologie interventionnelle',
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

// §4.5 — Global FAQ (homepage). Distinct from per-exam FAQ above.
export const FAQ = [
  {
    q: "Qu'est-ce qu'un Holter ECG ?",
    a: "Le Holter ECG est un enregistreur de l'électrocardiogramme porté de 24 h jusqu'à 2 semaines. Il met en évidence un trouble du rythme cardiaque et peut servir à contrôler l'efficacité d'un traitement. L'examen est indolore et n'entrave pas vos activités quotidiennes.",
  },
  {
    q: "Puis-je me doucher avec l'appareil ?",
    a: "Non. La douche est interdite avec l'appareil, qui n'est pas étanche. Il ne faut pas non plus l'arrêter pendant la durée de l'enregistrement.",
  },
  {
    q: "Qu'est-ce qu'un MAPA (holter tensionnel) ?",
    a: "Le MAPA est un appareil d'enregistrement de la tension artérielle durant 24 h. Il contrôle les variations de la tension (hypo- ou hypertension) tout au long de la journée et peut vérifier l'efficacité d'un traitement. La mesure se fait automatiquement toutes les 20 minutes le jour et toutes les heures la nuit.",
  },
  {
    q: "Qu'est-ce que la polygraphie nocturne ?",
    a: "C'est un examen qui permet de diagnostiquer à domicile les troubles respiratoires du sommeil, comme les apnées. Un appareil léger, posé le soir, enregistre votre respiration pendant la nuit. Il peut aussi servir à contrôler l'efficacité d'un traitement par PPC.",
  },
]

// §4.6 — Generic reassurance steps (kept for reference; exam pages use their
// own per-exam `steps`).
export const PARCOURS = [
  { n: '01', title: 'Examens indolores', text: "Nos examens sont indolores et n'entravent pas vos activités quotidiennes." },
  { n: '02', title: 'Pose rapide', text: "La pose est réalisée par l'assistante médicale en une dizaine de minutes." },
  { n: '03', title: 'Rendez-vous en ligne', text: 'Réservez directement depuis le site, en quelques clics. Notre équipe vous contacte pour confirmer votre créneau.' },
  { n: '04', title: 'Résultats le jour même', text: 'Vos résultats vous sont communiqués le jour même de votre examen.' },
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
export const getPartners = () => DOCTORS.filter((d) => !d.isFounder)

// Doctors who perform a given exam (in DOCTORS display order).
export const doctorsForExam = (examSlug) => {
  const exam = getExam(examSlug)
  if (!exam) return []
  return DOCTORS.filter((d) => exam.doctorSlugs?.includes(d.slug))
}

// Exams a given doctor performs (derived from each exam's doctorSlugs).
export const examsForDoctor = (doctorSlug) =>
  SERVICES.filter((s) => s.doctorSlugs?.includes(doctorSlug))

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
    cover: '/images/consultation.jpg',
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
    cover: '/images/hero-reception.jpg',
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
    cover: '/images/doctor-bw.jpg',
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
        text: "Le rendez-vous se déroule sans surprise : un temps d'échange avec le cardiologue sur vos antécédents et votre mode de vie, puis l'électrocardiogramme (rapide et indolore) et enfin l'échographie cardiaque, qui visualise la structure et le fonctionnement de votre cœur grâce à une simple sonde posée sur la peau. Les résultats vous sont expliqués le jour même.",
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
    cover: '/images/rythmo-tee.jpg',
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
    cover: '/images/doguet.jpg',
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
