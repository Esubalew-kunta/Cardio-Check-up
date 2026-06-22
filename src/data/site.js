// Central content + contact constants for the Cardio Check-up site.
// French-only per the approved plan. Single source of truth for every template.
//
// NOTE ON DEMO DATA: Dr Sana Amraoui's content is real. The four partner
// doctors (Martin, Bernard, Moreau, Fabre) and the exam<->doctor mapping are
// DEMO content derived from the specialties in the build brief. Replace before
// go-live. Demo doctors carry `demo: true` and `photo: null` (placeholder
// portrait renders automatically). See "Missing content" in the brief.

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
    credibility: "Responsable d'unité · Service de rythmologie, Hôpital Américain de Paris",
    isFounder: true,
    badge: 'Chairperson EHRA 2026',
    demo: false,
    photo: '/images/doctor-portrait.jpg',
    doctolib: CONTACT.doctolib,
    bioShort:
      "Cardiologue rythmologue, le Dr Amraoui coordonne le conseil Cardio Check-up et dirige une unité de rythmologie à l'Hôpital Américain de Paris.",
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
    slug: 'thomas-martin',
    name: 'Dr Thomas Martin',
    specialty: 'Cardiologie générale',
    credibility: 'Cardiologue · Cabinet Cardio Check-up, Paris 17',
    isFounder: false,
    demo: true,
    photo: null,
    doctolib: CONTACT.doctolib,
    bioShort:
      'Cardiologue généraliste, le Dr Martin réalise les bilans cardiovasculaires et le suivi des patients hypertendus. (Contenu de démonstration.)',
    bio:
      "Cardiologue généraliste, le Dr Martin accompagne les patients dans le bilan, la prévention et le suivi des maladies cardiovasculaires. Il accorde une place centrale à l'écoute et à la pédagogie, pour que chaque patient comprenne son examen et sa prise en charge. (Contenu de démonstration — à remplacer avant la mise en ligne.)",
    timeline: [
      { year: '2010', text: 'DES de cardiologie & maladies vasculaires (contenu de démonstration)' },
      { year: '2013', text: "DIU d'échocardiographie (contenu de démonstration)" },
    ],
    stats: null,
  },
  {
    slug: 'claire-bernard',
    name: 'Dr Claire Bernard',
    specialty: 'Échocardiographie',
    credibility: 'Cardiologue échographiste · Cabinet Cardio Check-up, Paris 17',
    isFounder: false,
    demo: true,
    photo: '/images/doctor-claire-bernard.jpg',
    doctolib: CONTACT.doctolib,
    bioShort:
      "Spécialiste de l'échographie cardiaque, le Dr Bernard réalise les bilans d'imagerie du cœur. (Contenu de démonstration.)",
    bio:
      "Spécialiste de l'imagerie cardiaque, le Dr Bernard réalise les échographies cardiaques trans-thoraciques et participe aux bilans cardiovasculaires complets. Elle met son expertise au service d'un diagnostic précis et rassurant. (Contenu de démonstration — à remplacer avant la mise en ligne.)",
    timeline: [
      { year: '2012', text: "DIU d'échocardiographie (contenu de démonstration)" },
      { year: '2014', text: 'DES de cardiologie & maladies vasculaires (contenu de démonstration)' },
    ],
    stats: null,
  },
  {
    slug: 'paul-moreau',
    name: 'Dr Paul Moreau',
    specialty: 'Holter et MAPA',
    credibility: 'Cardiologue · Cabinet Cardio Check-up, Paris 17',
    isFounder: false,
    demo: true,
    photo: '/images/doctor-paul-moreau.jpg',
    doctolib: CONTACT.doctolib,
    bioShort:
      "Spécialiste de l'enregistrement ambulatoire, le Dr Moreau interprète les Holter ECG et les MAPA. (Contenu de démonstration.)",
    bio:
      "Le Dr Moreau est spécialisé dans l'enregistrement ambulatoire du rythme cardiaque et de la pression artérielle. Il interprète les Holter ECG et les MAPA pour détecter les troubles du rythme et adapter les traitements. (Contenu de démonstration — à remplacer avant la mise en ligne.)",
    timeline: [
      { year: '2011', text: 'DES de cardiologie & maladies vasculaires (contenu de démonstration)' },
      { year: '2015', text: 'DIU de rythmologie (contenu de démonstration)' },
    ],
    stats: null,
  },
  {
    slug: 'isabelle-fabre',
    name: 'Dr Isabelle Fabre',
    specialty: 'Médecine du sommeil',
    credibility: 'Cardiologue · Médecine du sommeil, Cabinet Cardio Check-up',
    isFounder: false,
    demo: true,
    photo: null,
    doctolib: CONTACT.doctolib,
    bioShort:
      "Spécialiste des troubles du sommeil, le Dr Fabre prend en charge le dépistage des apnées. (Contenu de démonstration.)",
    bio:
      "Le Dr Fabre associe cardiologie et médecine du sommeil pour dépister et accompagner les troubles respiratoires du sommeil, comme les apnées, qui retentissent sur le cœur. (Contenu de démonstration — à remplacer avant la mise en ligne.)",
    timeline: [
      { year: '2012', text: 'DES de cardiologie & maladies vasculaires (contenu de démonstration)' },
      { year: '2016', text: 'DIU du sommeil et de sa pathologie (contenu de démonstration)' },
    ],
    stats: null,
  },
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
    videoId: 'la56HqMqMqA', // placeholder: same video on all exams until per-exam clips arrive
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
    doctorSlugs: ['sana-amraoui', 'thomas-martin', 'claire-bernard'],
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
    videoId: 'la56HqMqMqA', // placeholder: same video on all exams until per-exam clips arrive
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
    doctorSlugs: ['paul-moreau', 'sana-amraoui'],
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
    videoId: 'la56HqMqMqA', // placeholder: same video on all exams until per-exam clips arrive
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
    doctorSlugs: ['paul-moreau', 'thomas-martin'],
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
    videoId: 'la56HqMqMqA', // placeholder: same video on all exams until per-exam clips arrive
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
    doctorSlugs: ['isabelle-fabre'],
    placeholder: false,
  },
  {
    id: 'rythmologie',
    name: 'Rythmologie interventionnelle',
    indef: 'une',
    category: 'Rythmologie interventionnelle',
    headline: 'Traiter les troubles du rythme cardiaque complexes',
    reassurance: 'Hôpital Américain de Paris · Prise en charge spécialisée',
    where: 'Hôpital Américain de Paris',
    why: 'Prise en charge des arythmies complexes.',
    symptoms: 'Arythmies complexes nécessitant une prise en charge spécialisée.',
    desc: 'Ablation par cathéter, implantation de stimulateur (pacemaker) ou de défibrillateur, Holter implantable.',
    whatIs: [
      "La rythmologie interventionnelle regroupe les traitements des troubles du rythme cardiaque les plus complexes : remettre le cœur à un rythme régulier, ou poser un stimulateur (pacemaker) ou un défibrillateur.",
      "Ces actes sont réalisés à l'Hôpital Américain de Paris. (Contenu provisoire, à compléter avant la mise en ligne.)",
    ],
    videoId: 'la56HqMqMqA', // placeholder: same video on all exams until per-exam clips arrive
    symptomPills: ['Arythmie complexe', 'Fibrillation atriale', 'Suivi spécialisé'],
    symptomContext:
      "La rythmologie interventionnelle s'adresse aux patients présentant des troubles du rythme nécessitant un traitement spécialisé. (Contenu provisoire — à compléter.)",
    steps: [
      { title: 'Consultation spécialisée', text: 'Évaluation du trouble du rythme et discussion de la prise en charge. (Contenu provisoire.)' },
      { title: 'Intervention', text: "L'acte est réalisé à l'Hôpital Américain de Paris. (Contenu provisoire.)" },
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
const M3 = { line: '3', color: '#9F9825', text: '#ffffff' }

// §4.7 — Two locations
export const LOCATIONS = [
  {
    name: 'Cabinet Cardio Check-up',
    tag: 'Paris 17',
    address: '29 Rue Bayen, 75017 Paris',
    phone: '01 86 47 13 16',
    phoneHref: 'tel:+33186471316',
    image: '/images/plaque-cabinet.jpg',
    note: 'Consultations, bilans cardiovasculaires et examens (ECG, ETT, Holter, MAPA, polygraphie).',
    walking: '5 min à pied de Charles de Gaulle–Étoile',
    metro: [
      { ...M2, station: 'Ternes' },
      { ...M1, station: 'Charles de Gaulle–Étoile' },
    ],
  },
  {
    name: 'Hôpital Américain de Paris',
    tag: 'Neuilly-sur-Seine',
    address: '84 Bd de la Saussaye, 92200 Neuilly-sur-Seine, OPD 22 Bis',
    phone: '07 55 50 52 58',
    phoneHref: 'tel:+33755505258',
    image: '/images/plaque-credentials.jpg',
    note: 'Rythmologie interventionnelle.',
    walking: '8 min à pied de Les Sablons',
    metro: [
      { ...M1, station: 'Les Sablons' },
      { ...M3, station: 'Pont de Levallois–Bécon' },
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
