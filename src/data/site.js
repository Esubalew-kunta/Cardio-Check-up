// Central content + contact constants for the Cardio Check-up prototype.
// French-only per the approved plan. Copy lifted from the approved build plan.

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

export const NAV = [
  { label: 'Accueil', href: '#top' },
  { label: 'Dr Amraoui', href: '#dr-amraoui' },
  { label: 'Nos Examens', href: '#examens' },
  { label: 'Votre Visite', href: '#parcours' },
  { label: 'FAQ', href: '#faq' },
]

// §4.3 — Social-proof number strip (facts supplied by Dr Amraoui's team)
export const STATS = [
  {
    value: 'EHRA 2026',
    isText: true,
    line: "Chairperson de l'European Heart Rhythm Association",
  },
  {
    value: 3,
    suffix: '',
    line: 'publications dans des revues internationales : JACC, Europace, Heart Rhythm',
  },
  {
    value: 9000,
    suffix: '',
    line: 'consultations humanitaires par an au Maroc',
  },
]

// §4.4 — Services / Nos Examens
// Each entry is self-contained: name, target symptoms, description and its
// own short FAQ, so it can be lifted onto a dedicated page later without
// reshaping the data.
export const SERVICES = [
  {
    id: 'bilan',
    name: 'Bilan cardiovasculaire',
    why: 'Pour faire le point sur la santé de votre cœur.',
    symptoms: 'Bilan de prévention, suivi de routine, avant une activité sportive.',
    desc: 'Consultation complète associant un ECG de repos et une échographie cardiaque trans-thoracique (ETT).',
    faq: [
      {
        q: 'En quoi consiste le bilan cardiovasculaire ?',
        a: "Il associe une consultation avec le Dr Amraoui, un électrocardiogramme (ECG) de repos et une échographie cardiaque trans-thoracique (ETT) afin d'évaluer la structure et le fonctionnement du cœur.",
      },
      {
        q: 'Faut-il être à jeun ?',
        a: "Non, aucune préparation particulière n'est nécessaire. Vous pouvez manger et prendre vos traitements habituels avant le rendez-vous.",
      },
    ],
    placeholder: false,
  },
  {
    id: 'holter-ecg',
    name: 'Holter ECG',
    why: 'Palpitations, malaises ou troubles du rythme suspectés.',
    symptoms: 'Palpitations, sensation de cœur qui s’accélère, malaises ou perte de connaissance.',
    desc: "Enregistreur de l'ECG de 24 h jusqu'à 2 semaines. Examen indolore qui n'entrave pas vos activités quotidiennes.",
    faq: [
      {
        q: "Qu'est-ce qu'un Holter ECG ?",
        a: "Le Holter ECG est un enregistreur de l'électrocardiogramme porté de 24 h jusqu'à 2 semaines. Il met en évidence un trouble du rythme cardiaque et peut servir à contrôler l'efficacité d'un traitement. L'examen est indolore et n'entrave pas vos activités quotidiennes.",
      },
      {
        q: "Puis-je me doucher avec l'appareil ?",
        a: "Non. La douche est interdite avec l'appareil, qui n'est pas étanche. Il ne faut pas non plus l'arrêter pendant la durée de l'enregistrement.",
      },
    ],
    placeholder: false,
  },
  {
    id: 'mapa',
    name: 'MAPA (Holter tensionnel)',
    why: 'Hyper- ou hypotension, contrôle d’un traitement.',
    symptoms: 'Tension artérielle instable, vertiges, suivi d’un traitement anti-hypertenseur.',
    desc: 'Enregistrement de la tension artérielle durant 24 h : mesure toutes les 20 min le jour et toutes les heures la nuit.',
    faq: [
      {
        q: "Qu'est-ce qu'un MAPA (holter tensionnel) ?",
        a: "Le MAPA est un appareil d'enregistrement de la tension artérielle durant 24 h. Il contrôle les variations de la tension (hypo- ou hypertension) tout au long de la journée et peut vérifier l'efficacité d'un traitement. La mesure se fait automatiquement toutes les 20 minutes le jour et toutes les heures la nuit.",
      },
    ],
    placeholder: false,
  },
  {
    id: 'polygraphie',
    name: 'Polygraphie nocturne',
    why: 'Ronflements, fatigue, apnées du sommeil suspectées.',
    symptoms: 'Ronflements, somnolence en journée, fatigue persistante au réveil.',
    desc: 'Dépistage à domicile des troubles respiratoires du sommeil (apnées), avec un appareil simple à porter la nuit.',
    faq: [
      {
        q: "Qu'est-ce que la polygraphie nocturne ?",
        a: "C'est un examen qui permet de diagnostiquer à domicile les troubles respiratoires du sommeil, comme les apnées. Un appareil léger, posé le soir, enregistre votre respiration pendant la nuit. Il peut aussi servir à contrôler l'efficacité d'un traitement par PPC.",
      },
    ],
    placeholder: false,
  },
  {
    id: 'rythmologie',
    name: 'Rythmologie interventionnelle',
    where: 'Hôpital Américain de Paris',
    why: 'Prise en charge des arythmies complexes.',
    symptoms: 'Arythmies complexes nécessitant une prise en charge spécialisée.',
    desc: 'Ablation par cathéter, implantation de stimulateur (pacemaker) ou de défibrillateur, Holter implantable.',
    faq: [],
    placeholder: true,
  },
]

// §4.5 — FAQ (drawn from the patient information sheets)
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

// §4.6 — Votre parcours (4 reassurance steps)
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
