import {
  BrandLogo,
  CoreValue,
  Language,
  Milestone,
  NavItem,
  OrgDepartment,
  PortfolioCategory,
  RoutePath,
  StrategicPole,
  Testimonial,
} from '../types/sem';

import heroInfrastructureImg from '../assets/images/hero_sem_infrastructure_1794594487676.jpg';
import poleServicesImg from '../assets/images/pole_services_telecom_1794594489189.jpg';
import poleSecurityImg from '../assets/images/pole_security_operations_1794594489078.jpg';
import poleQosImg from '../assets/images/pole_qos_measurement_1794594489157.jpg';
import headquartersImg from '../assets/images/about_sem_headquarters_1794594489524.jpg';

export const IMAGES = {
  hero: heroInfrastructureImg,
  services: poleServicesImg,
  security: poleSecurityImg,
  qos: poleQosImg,
  headquarters: headquartersImg,
  logoColor: '/images/sem-logo.png',
  logoWhite: '/images/sem-logo-white.png',
};

export const PARTNER_LOGOS: BrandLogo[] = [
  { id: 'p01', name: 'Partenaire Technologique 01', src: '/images/partners/partner-01.jpg' },
  { id: 'p02', name: 'Partenaire Technologique 02', src: '/images/partners/partner-02.jpg' },
  { id: 'p03', name: 'Partenaire Technologique 03', src: '/images/partners/partner-03.jpg' },
  { id: 'p04', name: 'Partenaire Technologique 04', src: '/images/partners/partner-04.jpg' },
  { id: 'p05', name: 'Partenaire Technologique 05', src: '/images/partners/partner-05.jpg' },
  { id: 'p06', name: 'Partenaire Technologique 06', src: '/images/partners/partner-06.jpg' },
  { id: 'p07', name: 'Partenaire Technologique 07', src: '/images/partners/partner-07.jpg' },
  { id: 'p08', name: 'Partenaire Technologique 08', src: '/images/partners/partner-08.jpg' },
  { id: 'p09', name: 'Partenaire Technologique 09', src: '/images/partners/partner-09.jpg' },
  { id: 'p10', name: 'Partenaire Technologique 10', src: '/images/partners/partner-10.jpg' },
  { id: 'p11', name: 'Partenaire Technologique 11', src: '/images/partners/partner-11.jpg' },
  { id: 'p12', name: 'Partenaire Technologique 12', src: '/images/partners/partner-12.jpg' },
  { id: 'p14', name: 'Partenaire Technologique 14', src: '/images/partners/partner-14.jpg' },
  { id: 'p15', name: 'Partenaire Technologique 15', src: '/images/partners/partner-15.jpg' },
  { id: 'p16', name: 'Partenaire Technologique 16', src: '/images/partners/partner-16.jpg' },
  { id: 'p17', name: 'Partenaire Technologique 17', src: '/images/partners/partner-17.jpg' },
  { id: 'p18', name: 'Partenaire Technologique 18', src: '/images/partners/partner-18.jpg' },
  { id: 'p19', name: 'Partenaire Technologique 19', src: '/images/partners/partner-19.jpg' },
  { id: 'p20', name: 'Partenaire Technologique 20', src: '/images/partners/partner-20.jpg' },
];

export const CLIENT_LOGOS: BrandLogo[] = [
  { id: 'c01', name: 'Client Référence 01', src: '/images/clients/client-01.png' },
  { id: 'c02', name: 'Client Référence 02', src: '/images/clients/client-02.png' },
  { id: 'c03', name: 'Client Référence 03', src: '/images/clients/client-03.png' },
  { id: 'c04', name: 'Client Référence 04', src: '/images/clients/client-04.png' },
  { id: 'c05', name: 'Client Référence 05', src: '/images/clients/client-05.png' },
  { id: 'c06', name: 'Client Référence 06', src: '/images/clients/client-06.png' },
  { id: 'c07', name: 'Client Référence 07', src: '/images/clients/client-07.png' },
  { id: 'c08', name: 'Client Référence 08', src: '/images/clients/client-08.png' },
  { id: 'c09', name: 'Client Référence 09', src: '/images/clients/client-09.png' },
  { id: 'c10', name: 'Client Référence 10', src: '/images/clients/client-10.png' },
  { id: 'c11', name: 'Client Référence 11', src: '/images/clients/client-11.png' },
  { id: 'c12', name: 'Client Référence 12', src: '/images/clients/client-12.png' },
  { id: 'c13', name: 'Client Référence 13', src: '/images/clients/client-13.png' },
  { id: 'c14', name: 'Client Référence 14', src: '/images/clients/client-14.png' },
  { id: 'csnrt', name: 'SNRT', src: '/images/clients/client-snrt.png' },
  { id: 'cfabrica', name: 'Fabrica', src: '/images/clients/client-fabrica.png' },
];

export const ROUTE_ALIASES: Record<string, RoutePath> = {
  '/': '/',
  '/fr': '/',
  '/en': '/',
  '/mot-du-directeur-general': '/mot-du-directeur-general',
  '/fr/mot-du-directeur-general': '/mot-du-directeur-general',
  '/histoire': '/histoire',
  '/fr/histoire': '/histoire',
  '/en/histoire': '/histoire',
  '/mission-et-valeurs': '/mission-et-valeurs',
  '/fr/mission-et-valeurs': '/mission-et-valeurs',
  '/domaines-d-activites': '/domaines-d-activites',
  '/fr/domaine-dexpertise': '/domaines-d-activites',
  '/en/domaine-dexpertise': '/domaines-d-activites',
  '/organisation': '/organisation',
  '/certifications': '/certifications',
  '/fr/certifications': '/certifications',
  '/portefeuille': '/portefeuille',
  '/fr/portefeuille': '/portefeuille',
  '/en/portefeuille': '/portefeuille',
  '/partenaires': '/partenaires',
  '/fr/partenaires': '/partenaires',
  '/clients': '/clients',
  '/fr/clients': '/clients',
  '/offres-d-emplois': '/offres-d-emplois',
  '/fr/offre-demploi': '/offres-d-emplois',
  '/candidature': '/candidature',
  '/welcome/postuler': '/candidature',
  '/fr/demande-demploi': '/candidature',
  '/nous-contacter': '/nous-contacter',
  '/plan-du-site': '/plan-du-site',
  '/sitemap': '/plan-du-site',
  '/fr/plan-du-site': '/plan-du-site',
  '/en/sitemap': '/plan-du-site',
};

export interface SemDictionary {
  nav: NavItem[];
  contactCta: string;
  footer: {
    tagline: string;
    aboutColTitle: string;
    solutionsColTitle: string;
    careersColTitle: string;
    contactColTitle: string;
    rights: string;
    languageLabel: string;
  };
  home: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    kpis: { value: string; label: string; context: string }[];
    segmentsHeading: string;
    segmentsSubheading: string;
    segments: { index: string; title: string; detail: string }[];
    polesHeading: string;
    polesSubheading: string;
    polesCta: string;
    diversificationTitle: string;
    diversificationBody: string;
    africaHighlightTitle: string;
    africaHighlightBody: string;
    dgSectionLabel: string;
    dgQuote: string;
    dgName: string;
    dgRole: string;
    dgReadMore: string;
    ecosystemHeading: string;
    ecosystemSubheading: string;
    viewPartners: string;
    viewClients: string;
    testimonialsHeading: string;
    testimonialsSubheading: string;
    testimonials: Testimonial[];
    careersBannerTitle: string;
    careersBannerBody: string;
    careersBannerCta: string;
  };
  dgPage: {
    title: string;
    subtitle: string;
    motto: string;
    paragraphs: string[];
    commitmentsTitle: string;
    commitments: string[];
    closingParagraphs: string[];
    signatureName: string;
    signatureTitle: string;
  };
  historyPage: {
    title: string;
    subtitle: string;
    intro: string;
    milestones: Milestone[];
  };
  missionPage: {
    title: string;
    subtitle: string;
    missionHeading: string;
    missionText: string;
    visionText: string;
    valuesHeading: string;
    values: CoreValue[];
  };
  polesPage: {
    title: string;
    subtitle: string;
    intro: string;
    poles: StrategicPole[];
  };
  orgPage: {
    title: string;
    subtitle: string;
    intro: string;
    directorTitle: string;
    departments: OrgDepartment[];
  };
  certPage: {
    title: string;
    subtitle: string;
    intro: string;
    programs: {
      code: string;
      name: string;
      scope: string;
      status: string;
      description: string;
    }[];
    pillarsTitle: string;
    pillars: { title: string; detail: string }[];
  };
  portfolioPage: {
    title: string;
    subtitle: string;
    intro: string;
    allLabel: string;
    exclusiveHeading: string;
    exclusiveBrands: { brand: string; category: string; description: string }[];
    categories: PortfolioCategory[];
    ctaTitle: string;
    ctaButton: string;
  };
  partnersPage: {
    title: string;
    subtitle: string;
    intro: string;
  };
  clientsPage: {
    title: string;
    subtitle: string;
    intro: string;
    acknowledgement: string;
  };
  jobsPage: {
    title: string;
    subtitle: string;
    intro: string;
    emptyNoticeTitle: string;
    emptyNoticeBody: string;
    spontaneousCta: string;
    profilesHeading: string;
    profiles: { title: string; pole: string; description: string }[];
  };
  applyPage: {
    title: string;
    subtitle: string;
    intro: string;
    labels: {
      lastName: string;
      firstName: string;
      email: string;
      phone: string;
      pole: string;
      cv: string;
      cvHint: string;
      coverLetter: string;
      captcha: string;
      submit: string;
      successTitle: string;
      successBody: string;
      newApplication: string;
    };
    poleOptions: string[];
  };
  contactPage: {
    title: string;
    subtitle: string;
    intro: string;
    hqTitle: string;
    address: string;
    phone: string;
    email: string;
    hoursTitle: string;
    hoursWeekday: string;
    hoursWeekend: string;
    formTitle: string;
    labels: {
      lastName: string;
      firstName: string;
      phone: string;
      email: string;
      department: string;
      subject: string;
      message: string;
      submit: string;
      successTitle: string;
      successBody: string;
      sendAnother: string;
    };
    departments: string[];
  };
}

export const SEM_CONTENT: Record<Language, SemDictionary> = {
  fr: {
    nav: [
      { label: 'Accueil', path: '/' },
      {
        label: 'À propos',
        children: [
          {
            label: 'Mot du Directeur Général',
            description: 'Vision stratégique et engagements de Youssef El Malali',
            path: '/mot-du-directeur-general',
          },
          {
            label: 'Histoire',
            description: 'De Sicotel Engineering (2008) à SEM international',
            path: '/histoire',
          },
          {
            label: 'Mission et Valeurs',
            description: 'Excellence opérationnelle et partenariats Win-Win',
            path: '/mission-et-valeurs',
          },
          {
            label: 'Domaines d’activités',
            description: 'Nos 4 pôles d’expertise technique et sectorielle',
            path: '/domaines-d-activites',
          },
          {
            label: 'Organisation',
            description: 'Structure hybride matricielle et projectized',
            path: '/organisation',
          },
          {
            label: 'Nos Certifications',
            description: 'Démarche qualité ISO 9001 & sécurité OHSAS 18001',
            path: '/certifications',
          },
        ],
      },
      { label: 'Portefeuille', path: '/portefeuille' },
      {
        label: 'Écosystème',
        children: [
          {
            label: 'Nos Partenaires',
            description: 'Alliances avec les grands constructeurs mondiaux',
            path: '/partenaires',
          },
          {
            label: 'Nos Clients',
            description: 'Opérateurs, administrations, banques et industriels',
            path: '/clients',
          },
        ],
      },
      {
        label: 'Carrières',
        children: [
          {
            label: 'Candidature spontanée',
            description: 'Rejoignez nos équipes d’ingénierie au Maroc et en Afrique',
            path: '/candidature',
          },
          {
            label: 'Offres d’emplois',
            description: 'Opportunités et profils techniques recherchés',
            path: '/offres-d-emplois',
          },
        ],
      },
    ],
    contactCta: 'Contactez-nous',
    footer: {
      tagline: 'Smart Engineering & Management — Ingénierie IT, Télécoms, Broadcast, Sûreté Électronique et Qualité de Service depuis 2008.',
      aboutColTitle: 'À propos de SEM',
      solutionsColTitle: 'Expertise & Écosystème',
      careersColTitle: 'Carrières',
      contactColTitle: 'Siège Social',
      rights: '© 2008 – 2026 SEM — Smart Engineering & Management. Tous droits réservés.',
      languageLabel: 'Langue',
    },
    home: {
      eyebrow: 'Smart Engineering & Management · Maroc & Afrique',
      headline: 'Ingénierie IT, Télécoms et Infrastructures Clés en Main',
      subheadline:
        'Depuis 2008, SEM conçoit, déploie et optimise des réseaux critiques, Data Centers, infrastructures Broadcast & VSAT et systèmes de sûreté électronique pour les acteurs publics et privés.',
      primaryCta: 'Découvrir nos pôles',
      secondaryCta: 'Mot du Directeur Général',
      kpis: [
        { value: '2008', label: 'Année de fondation', context: 'Expertise continue depuis 18 ans' },
        { value: '17 Pays', label: 'Présence en Afrique', context: 'Coopération Sud-Sud active' },
        { value: '4 Pôles', label: 'Domaines stratégiques', context: 'Services, Conseil, Sûreté, QoS' },
        { value: 'ISO 9001', label: 'Standards Qualité & EHS', context: 'Amélioration continue & OHSAS 18001' },
      ],
      segmentsHeading: 'Secteurs & Segments Clients',
      segmentsSubheading:
        'Depuis sa création en 2008, SEM accompagne cinq segments institutionnels et industriels exigeants sur l’ensemble de la chaîne de valeur de leurs infrastructures.',
      segments: [
        {
          index: '01',
          title: 'Défense et Sécurité',
          detail: 'Systèmes critiques de sûreté électronique, radars, sonars et réseaux sécurisés.',
        },
        {
          index: '02',
          title: 'Administrations Publiques',
          detail: 'Modernisation des réseaux gouvernementaux, Data Centers et intégration SI.',
        },
        {
          index: '03',
          title: 'Opérateurs Télécoms & Régulateurs',
          detail: 'Déploiement d’infrastructures fixes/mobiles, audits QoS et benchmarking.',
        },
        {
          index: '04',
          title: 'Équipementiers Télécoms',
          detail: 'Partenariat d’exécution terrain, Network Roll-out et support technique certifié.',
        },
        {
          index: '05',
          title: 'Banques et Assurances',
          detail: 'Haute disponibilité des réseaux IP, sécurité informatique et contrats Managed Services.',
        },
      ],
      polesHeading: 'Domaines d’Activités Stratégiques',
      polesSubheading:
        'Quatre pôles intégrés pour maîtriser les facteurs clés de succès : technologie, délais, coûts et qualité.',
      polesCta: 'Explorer ce pôle',
      diversificationTitle: 'Maîtrise de bout en bout & réduction des OPEX',
      diversificationBody:
        'La stratégie de diversification adoptée par SEM lui confère un positionnement différenciateur : accompagnement par des ingénieurs consultants multi-technologies, veille continue sur les innovations IT/Télécoms et contrats de Managed Services pensés pour réduire vos coûts opérationnels.',
      africaHighlightTitle: 'Développement en Afrique — 17 pays réalisés',
      africaHighlightBody:
        'Inscrite dans la dynamique de coopération Sud-Sud, SEM déploie son savoir-faire d’ingénierie marocaine à travers le continent africain avec des projets livrés dans 17 pays.',
      dgSectionLabel: 'Message du Directeur Général',
      dgQuote:
        '« Your challenge is our progress », telle est notre devise ! En choisissant SEM, vous choisissez un partenaire maîtrisant la technologie, les délais, les coûts et la qualité pour atteindre l’excellence opérationnelle.',
      dgName: 'Youssef El Malali',
      dgRole: 'Directeur Général — SEM',
      dgReadMore: 'Lire le message complet',
      ecosystemHeading: 'Alliances Technologiques & Références Clients',
      ecosystemSubheading:
        'SEM s’allie avec les constructeurs mondiaux de référence (Keysight, Ericsson, GENELEC) et contribue durablement au succès de ses clients.',
      viewPartners: 'Voir tous nos partenaires',
      viewClients: 'Voir tous nos clients',
      testimonialsHeading: 'Retours d’Expérience & Confiance Clients',
      testimonialsSubheading:
        'Des directions techniques d’opérateurs, de régulateurs et d’acteurs broadcast témoignent de la rigueur d’exécution de nos équipes sur le terrain.',
      testimonials: [
        {
          id: 't-telecom',
          quote:
            'Avant l’intervention de SEM, le déploiement de nos liaisons de transmission multi-sites souffrait de retards de coordination terrain. Leur organisation « projectized » et leurs contrôleurs QA/QC dédiés ont permis de réceptionner 100 % des sites dans les délais convenus.',
          author: 'Karim Benali',
          role: 'Directeur Déploiement & Transmission',
          organization: 'Maroc Telecom',
          sector: 'Opérateur Télécoms',
          pole: 'Pôle Services & FTK',
          logoSrc: '/images/clients/client-01.png',
          logoAlt: 'Maroc Telecom',
        },
        {
          id: 't-broadcast',
          quote:
            'Pour la modernisation de nos stations de diffusion et liaisons VSAT, SEM a assuré l’intégration complète et le transfert de compétences OJT de nos ingénieurs. Nous avons réduit nos incidents d’exploitation tout en maîtrisant nos coûts de maintenance.',
          author: 'Nadia Tazi',
          role: 'Responsable Ingénierie Broadcast',
          organization: 'SNRT',
          sector: 'Radiodiffusion & Média',
          pole: 'Broadcast & VSAT',
          logoSrc: '/images/clients/client-snrt.png',
          logoAlt: 'SNRT — Société Nationale de Radiodiffusion et de Télévision',
        },
        {
          id: 't-qos',
          quote:
            'Les campagnes Drive Test et les audits de qualité de service menés par SEM avec l’instrumentation Keysight nous ont apporté des indicateurs fiables et exploitables à l’échelle nationale, accélérant nos décisions d’optimisation réseau.',
          author: 'Tariq El Idrissi',
          role: 'Chef de Projet Qualité & Mesures',
          organization: 'ANRT',
          sector: 'Régulation Télécoms',
          pole: 'Pôle Qualité de Service',
          logoSrc: '/images/clients/client-02.png',
          logoAlt: 'ANRT — Agence Nationale de Réglementation des Télécommunications',
        },
      ],
      careersBannerTitle: 'Le facteur humain au cœur de notre excellence opérationnelle',
      careersBannerBody:
        'SEM fait de ses ressources humaines son avantage concurrentiel majeur. Rejoignez une équipe d’ingénieurs engagés et dynamiques au Maroc et en Afrique.',
      careersBannerCta: 'Déposer une candidature',
    },
    dgPage: {
      title: 'Mot du Directeur Général',
      subtitle: 'Vision stratégique, engagements qualité et développement continental',
      motto: '« Your challenge is our progress », telle est notre devise !',
      paragraphs: [
        'Chers clients ! Au sein de SEM, et depuis sa création en 2008, nous nous occupons des questions et des préoccupations les plus complexes concernant le développement de vos infrastructures IT & Télécoms.',
        'Nous avons vu le jour avec l’objectif de vous accompagner sur l’ensemble des jalons de la chaîne de valeur de vos programmes de développement d’infrastructures IT & Télécoms.',
        'En choisissant SEM, vous choisissez un partenaire maîtrisant les facteurs clés de succès (technologie, délais, coûts et qualité) qui vous permettront d’atteindre l’excellence opérationnelle souhaitée via vos projets d’études, de choix de technologies, de déploiement d’infrastructures, de transfert de compétences et de maintenance.',
        'Notre force consiste en notre veille technologique continue, qui nous permet de vous proposer des solutions innovantes pour maîtriser l’un des enjeux majeurs de notre industrie, à savoir l’explosion des OPEX. Dans le cadre de cette veille, nos ingénieurs suivent un processus de formation continue pour vous faire bénéficier des dernières innovations technologiques et adapter nos solutions à vos besoins les plus personnalisés.',
        'Nous puisons aussi notre force dans nos programmes de partenariats avec les plus grandes entreprises du secteur à l’échelle nationale et internationale, vous permettant de bénéficier des meilleures conditions économiques ainsi que des meilleurs programmes de formation et de support.',
      ],
      commitmentsTitle: 'En choisissant SEM, vous avez nos engagements sur :',
      commitments: [
        'Le respect de vos normes de qualité ;',
        'Le respect de vos normes de sécurité ;',
        'Le respect des délais convenus ;',
        'L’optimisation des coûts et des prix.',
      ],
      closingParagraphs: [
        'Chers clients et partenaires ! Grâce à votre confiance, SEM réalise depuis sa création une croissance soutenue. Nous sommes aujourd’hui une société mature engagée dans des programmes de certification qualité ISO 9001 et EHS OHSAS 18001.',
        'Nous avons également mené à bien notre stratégie de développement en Afrique, avec des projets réalisés dans 17 pays africains dans le cadre d’une stratégie d’internationalisation ambitieuse et de coopération Sud-Sud.',
        'En choisissant SEM, vous bénéficiez d’une maîtrise des environnements macro et micro-économiques qui régissent le secteur IT & Télécoms au Maroc et en Afrique, ainsi que d’une veille stratégique partagée pour bâtir ensemble le développement du secteur.',
      ],
      signatureName: 'Youssef El Malali',
      signatureTitle: 'SEM — General Manager',
    },
    historyPage: {
      title: 'Notre Histoire',
      subtitle: 'Les jalons clés de notre croissance depuis 2008',
      intro:
        'Durant son développement, SEM a franchi plusieurs étapes structurantes. Chacune d’entre elles a consolidé notre expertise technique et notre rayonnement au Maroc comme en Afrique.',
      milestones: [
        {
          year: '2008',
          title: 'Création de Sicotel Engineering & Management',
          description: 'Fondation de la société au Maroc sous le nom de Sicotel Engineering & Management.',
          category: 'Fondation',
        },
        {
          year: '2008',
          title: 'Consulting technique & managérial',
          description: 'Lancement de l’offre de conseil stratégique, d’études d’ingénierie et d’accompagnement managérial.',
          category: 'Conseil',
        },
        {
          year: '2009',
          title: 'Construction des infrastructures télécoms clés en main',
          description: 'Lancement de l’offre de construction et d’intégration clés en main des infrastructures informatiques, télécoms et de sécurité.',
          category: 'Déploiement',
        },
        {
          year: '2012',
          title: 'Distribution des appareils de mesures',
          description: 'Ouverture du pôle de distribution d’équipements de test et de mesure pour les réseaux IP, RF et télécoms.',
          category: 'Test & Mesure',
        },
        {
          year: '2016',
          title: 'Smart Engineering & Management (SEM)',
          description: 'Changement de dénomination officielle vers Smart Engineering & Management (SEM), sans modification du tour de table.',
          category: 'Identité',
        },
        {
          year: '2016',
          title: 'Infrastructures Broadcast & VSAT',
          description: 'Lancement de l’offre dédiée au déploiement d’infrastructures Broadcast, TV & Media et liaisons satellitaires VSAT.',
          category: 'Broadcast',
        },
        {
          year: '2017+',
          title: 'Certifications Qualité & Rayonnement dans 17 pays africains',
          description: 'Lancement des programmes de certification ISO 9001 et OHSAS 18001 et concrétisation de projets majeurs dans 17 pays d’Afrique.',
          category: 'International & Qualité',
        },
      ],
    },
    missionPage: {
      title: 'Mission et Valeurs',
      subtitle: 'Bâtir des relations « Win-Win » fondées sur l’excellence opérationnelle',
      missionHeading: 'Notre Mission',
      missionText:
        'SEM a pour mission de conseiller ses clients dans l’expression de leurs besoins, et de les accompagner dans la conception ainsi que la réalisation de leurs infrastructures de réseaux informatiques, télécoms ou de sécurité tout en leur permettant d’atteindre l’excellence opérationnelle visée.',
      visionText:
        'SEM assure également la formation continue de ses clients et partenaires dans une optique d’amélioration et d’optimisation permanentes, portée par une vision claire : bâtir des partenariats « Win-Win » sur le long terme.',
      valuesHeading: 'Nos Valeurs Fondamentales',
      values: [
        {
          index: '01',
          title: 'Respect des engagements',
          subtitle: 'Qualité & Délais',
          description:
            'Nous nous engageons formellement à respecter nos promesses en termes de délais d’exécution et de standards qualité, contribuant directement à la maîtrise et à la réduction de vos coûts.',
        },
        {
          index: '02',
          title: 'Satisfaction client',
          subtitle: 'Respect des exigences & CRM',
          description:
            'La satisfaction durable de nos clients est notre raison d’être et notre gage de pérennité. Chaque livrable est évalué à l’aune de ses résultats concrets sur le terrain.',
        },
        {
          index: '03',
          title: 'Proximité',
          subtitle: 'À l’écoute des besoins réels',
          description:
            'SEM veille à rester au plus proche de ses clients et de leurs équipes opérationnelles afin d’adapter nos architectures et services à leurs réalités techniques exactes.',
        },
        {
          index: '04',
          title: 'Intégrité',
          subtitle: 'Éthique & Code de conduite',
          description:
            'L’éthique professionnelle, la transparence et la rigueur morale guident chacune de nos interventions, nos appels d’offres et nos relations partenariales.',
        },
      ],
    },
    polesPage: {
      title: 'Domaines d’Activités Stratégiques',
      subtitle: 'Quatre pôles d’ingénierie complémentaires pour vos infrastructures critiques',
      intro:
        'SEM structure son expertise autour de quatre pôles stratégiques intégrés, couvrant la conception, le déploiement clés en main, la sécurisation, le conseil et le contrôle de la qualité de service.',
      poles: [
        {
          id: 'services',
          index: '01',
          title: 'Pôle Services',
          shortDesc: 'Intégration de réseaux IP & Télécoms, Data Centers, Broadcast & VSAT, Managed Services et IT industriel.',
          fullDesc:
            'Le Pôle Services pilote la conception, l’intégration de bout en bout et le déploiement clés en main des réseaux informatiques, télécoms et environnements critiques, tout en assurant la réduction des coûts d’exploitation (OPEX) via nos contrats de Managed Services.',
          image: poleServicesImg,
          imageAlt: 'Infrastructures télécoms et antenne satellitaire VSAT',
          capabilities: [
            'Gestion du déploiement et intégrations des réseaux informatiques et télécoms',
            'Déploiement clés en main des réseaux informatiques et télécoms (IP, Telecom)',
            'Déploiement des infrastructures Broadcast & VSAT',
            'Déploiement et aménagement des Data Centers',
            'Sécurité des Systèmes d’Information (Sécurité SI)',
            'Managed Services et optimisation des OPEX',
            'IT industriel et télégestion d’installations (M2M)',
          ],
          deliverables: ['Architecture IP & Fibre', 'Sites Clés en Main (FTK)', 'Data Centers & Énergie', 'Exploitation Managée'],
        },
        {
          id: 'conseil',
          index: '02',
          title: 'Pôle Conseil & Formation',
          shortDesc: 'Conseil technique et managérial, AMOA, Network Design, recrutement et transfert de compétences.',
          fullDesc:
            'Nos ingénieurs consultants accompagnent vos directions techniques et métiers dès les phases amont : schémas directeurs, ingénierie de conception, assistance à maîtrise d’ouvrage (AMOA) et programmes de formation continue (OJT).',
          image: headquartersImg,
          imageAlt: 'Salle de conseil et d’ingénierie SEM',
          capabilities: [
            'Conseil technique multi-technologies & conseil managérial',
            'Network Design & Planning stratégique',
            'Project Management & Assistance à Maîtrise d’Ouvrage (AMOA)',
            'Formation technique spécialisée et managériale',
            'On-the-Job Training (OJT) et transfert de compétences',
            'Recrutement technique et staffing d’équipes projets',
          ],
          deliverables: ['Études & Schémas Directeurs', 'Pilotage PMO', 'Certifications Équipes', 'Staffing Spécialisé'],
        },
        {
          id: 'surete',
          index: '03',
          title: 'Pôle Sûreté Électronique',
          shortDesc: 'Protection électronique périmétrique, vidéosurveillance avancée, radars et sonars.',
          fullDesc:
            'Dédié aux sites sensibles, à la défense et aux infrastructures stratégiques, le Pôle Sûreté Électronique conçoit et déploie des dispositifs complets de surveillance et de détection multi-capteurs.',
          image: poleSecurityImg,
          imageAlt: 'Centre de contrôle de sûreté électronique et supervision',
          capabilities: [
            'Protection électronique de sites sensibles et infrastructures critiques',
            'Systèmes de vidéosurveillance haute définition et analytique (VS)',
            'Intégration de systèmes Radars de détection terrestre et côtière',
            'Déploiement de systèmes Sonars et protection maritime',
            'Centres de commandement, supervision et hypervision sécurisée',
          ],
          deliverables: ['Vidéosurveillance IP', 'Détection Radar & Sonar', 'Centres de Supervision', 'Sécurisation Périmétrique'],
        },
        {
          id: 'qos',
          index: '04',
          title: 'Pôle Qualité de Service (QoS)',
          shortDesc: 'Audit des réseaux, Drive Test & Benchmarking, Site QA/QC et instrumentation de mesure.',
          fullDesc:
            'Le Pôle QoS garantit la performance réelle perçue par les utilisateurs finaux grâce à des campagnes d’audit indépendantes, l’optimisation radio/IP et la distribution d’appareils de mesure de pointe.',
          image: poleQosImg,
          imageAlt: 'Analyseurs de spectre et équipements de mesure de qualité réseau',
          capabilities: [
            'Audit complet des réseaux fixes, mobiles et IP',
            'Campagnes Drive Test & Benchmarking opérateurs',
            'Gestion et pilotage de la Qualité de Service (QoS) & NPO',
            'Distribution d’appareils de mesures réseaux et RF (exclusivité Keysight)',
            'Contrôle Qualité terrain : Site QA & QC',
          ],
          deliverables: ['Rapports d’Audit & NPO', 'Benchmarking Multi-Opérateurs', 'Appareils Test & Mesure', 'Inspection QA / QC'],
        },
      ],
    },
    orgPage: {
      title: 'Notre Organisation',
      subtitle: 'Une gouvernance hybride agile : de matricielle à « projectized »',
      intro:
        'SEM adopte une organisation hybride capable de basculer d’un modèle matriciel à une structure orientée projets (« projectized ») selon les exigences spécifiques de nos clients, afin d’éviter toute lourdeur bureaucratique et d’accélérer la prise de décision.',
      directorTitle: 'Direction Générale (General Director)',
      departments: [
        {
          id: 'hr',
          name: 'Ressources Humaines',
          role: 'Human Resources',
          units: ['Competences Development', 'Recruitment', 'HR Specialist'],
        },
        {
          id: 'finance',
          name: 'Finance & Administration',
          role: 'Finance & Administrative Office',
          units: ['Financial Analysis', 'Accounting', 'Facilities & IT', 'Legal & Taxes'],
        },
        {
          id: 'sales',
          name: 'Ventes & Business Development',
          role: 'Sales & Business Development',
          units: ['Solution Engineering', 'Technical Support', 'Bid Management', 'Facilities & IT'],
        },
        {
          id: 'delivery',
          name: 'Delivery & Opérations',
          role: 'Delivery & Operations',
          units: ['PMO', 'Logistics', 'Quality Management', 'Testbed & Trainings'],
        },
        {
          id: 'customer',
          name: 'Équipe Client Dédiée',
          role: 'Customer Team (Projectized)',
          units: ['Account Manager', 'Project Manager', 'Resource Coordinator', 'Quality & EHS Controller'],
        },
      ],
    },
    certPage: {
      title: 'Nos Certifications & Démarche Qualité',
      subtitle: 'Amélioration continue, maîtrise des risques et excellence EHS',
      intro:
        'SEM a adopté une démarche rigoureuse d’amélioration continue afin de garantir à ses clients et partenaires des prestations conformes aux standards internationaux les plus exigeants.',
      programs: [
        {
          code: 'ISO 9001',
          name: 'Management de la Qualité',
          scope: 'Ingénierie, intégration IT/Télécoms, déploiement clés en main et services gérés',
          status: 'Référentiel Qualité',
          description:
            'Structuration des processus internes, traçabilité des projets, gestion des compétences et mesure systématique de la satisfaction client sur chaque jalon de déploiement.',
        },
        {
          code: 'OHSAS 18001 / EHS',
          name: 'Santé, Sécurité au Travail & Environnement',
          scope: 'Chantiers télécoms, pylônes, énergie, Data Centers et interventions terrain',
          status: 'Référentiel Sécurité EHS',
          description:
            'Prévention des risques sur sites techniques, contrôleurs Quality & EHS dédiés au sein des Customer Teams et respect strict des normes de sécurité des opérateurs et industriels.',
        },
      ],
      pillarsTitle: 'Contrôles Opérationnels sur le Terrain',
      pillars: [
        {
          title: 'Contrôle QA & QC Systématique',
          detail: 'Inspection qualité avant réception provisoire et définitive de chaque site déployé.',
        },
        {
          title: 'Gouvernance EHS Dédiée',
          detail: 'Présence d’un Quality & EHS Controller intégré directement aux équipes projets clients.',
        },
        {
          title: 'Formation & Veille Continue',
          detail: 'Programmes Testbed & Trainings pour maintenir les certifications constructeurs de nos ingénieurs.',
        },
      ],
    },
    portfolioPage: {
      title: 'Notre Portefeuille',
      subtitle: 'Des solutions et produits en évolution permanente pour vos besoins personnalisés',
      intro:
        'SEM s’est dotée d’un portefeuille complet de services d’ingénierie, de solutions clés en main et de distribution d’équipements technologiques de pointe.',
      allLabel: 'Toutes les expertises',
      exclusiveHeading: 'Distribution Exclusive & Partenariats Constructeurs',
      exclusiveBrands: [
        {
          brand: 'Keysight Technologies',
          category: 'Test & Mesure',
          description: 'Distribution exclusive d’outils de test et mesures pour communications sans fil, électronique générale et hyperfréquences.',
        },
        {
          brand: 'Ericsson TV & Media',
          category: 'Broadcast & Média',
          description: 'Distribution et intégration de produits et plateformes TV & Media de classe opérateur.',
        },
        {
          brand: 'GENELEC',
          category: 'Énergie & Groupes Électrogènes',
          description: 'Distribution et déploiement de groupes électrogènes industriels pour la continuité énergétique des sites critiques.',
        },
      ],
      categories: [
        {
          id: 'conseil',
          index: '01',
          title: 'Conseil',
          summary: 'Accompagnement stratégique et mobilisation des compétences expertes.',
          items: ['Recrutement', 'Staffing', 'OJT & Transfert de compétences'],
        },
        {
          id: 'services',
          index: '02',
          title: 'Services',
          summary: 'Ingénierie de conception, pilotage et exploitation sécurisée.',
          items: ['Network Design & Planning', 'Project Management', 'AMOA', 'Managed Services', 'Sécurité SI'],
        },
        {
          id: 'qualite',
          index: '03',
          title: 'Qualité (QoS)',
          summary: 'Mesure objective et optimisation des performances réseaux.',
          items: ['Network Audit', 'NPO (Network Performance Optimization)', 'Drive Test', 'QoS', 'Benchmarking', 'Sites QA & QC'],
        },
        {
          id: 'formation',
          index: '04',
          title: 'Formation',
          summary: 'Montée en compétence continue pour équipes techniques et managers.',
          items: ['Formations Techniques', 'Formations Managériales', 'Testbed & Mises en situation'],
        },
        {
          id: 'infrastructure',
          index: '05',
          title: 'Infrastructure & Environnement',
          summary: 'Génie technique, énergie autonome et hébergement de sites.',
          items: ['Courant faible', 'Énergie', 'Climatisation de précision', 'Systèmes solaires', 'Shelters', 'Pylônes'],
        },
        {
          id: 'deploiement',
          index: '06',
          title: 'Déploiement',
          summary: 'Exécution terrain clés en main des réseaux fixes, mobiles et satellitaires.',
          items: [
            'Network Roll-out',
            'FTK Projects (Full Turnkey)',
            'Transmission, Fixed & Wireless technologies',
            'Déploiement des infrastructures Broadcast & VSAT',
          ],
        },
        {
          id: 'test-measurement',
          index: '07',
          title: 'Test & Measurement',
          summary: 'Équipements de précision pour laboratoires, opérateurs et terrain.',
          items: [
            'T&M equipment for wireless communications',
            'General-purpose electronics instrumentation',
            'Microwave & RF measurement systems',
          ],
        },
        {
          id: 'distribution',
          index: '08',
          title: 'Distribution Exclusive',
          summary: 'Représentation officielle de marques mondiales de référence.',
          items: [
            'Outils de test et mesures Keysight',
            'Produits TV & Media Ericsson',
            'Groupes électrogènes GENELEC',
          ],
        },
      ],
      ctaTitle: 'Besoin d’une architecture ou d’un devis personnalisé ?',
      ctaButton: 'Contacter nos ingénieurs',
    },
    partnersPage: {
      title: 'Nos Partenaires',
      subtitle: 'Alliances stratégiques avec les grands constructeurs mondiaux',
      intro:
        'Pour vous servir au plus haut niveau d’exigence technique et vous offrir les meilleures conditions de support et de formation, SEM s’allie durablement avec les leaders technologiques internationaux.',
    },
    clientsPage: {
      title: 'Nos Clients',
      subtitle: 'La confiance des leaders nationaux et internationaux',
      intro:
        'Nous sommes fiers de contribuer au succès et à l’essor de notre clientèle à travers les secteurs des télécoms, de la radiodiffusion, de la finance, de la défense et des administrations publiques.',
      acknowledgement:
        'Nous remercions sincèrement nos clients qui, au fil des années, continuent de croire en notre vision, notre passion et notre engagement en matière d’excellence.',
    },
    jobsPage: {
      title: 'Offres d’Emplois',
      subtitle: 'Rejoignez une équipe d’ingénieurs et de managers engagés',
      intro:
        'SEM fait de ses ressources humaines son avantage concurrentiel majeur. Consultez nos disponibilités actuelles ou adressez-nous votre candidature spontanée.',
      emptyNoticeTitle: 'Aucune offre d’emploi spécifique n’est ouverte pour le moment',
      emptyNoticeBody:
        'Notre vivier de recrutement reste actif tout au long de l’année pour nos projets au Maroc et en Afrique. Si vous êtes ingénieur IT, Télécoms, Sûreté Électronique ou Chef de Projet PMO, transmettez-nous votre CV via la candidature spontanée.',
      spontaneousCta: 'Déposer une candidature spontanée',
      profilesHeading: 'Domaines de compétences régulièrement recrutés',
      profiles: [
        {
          title: 'Ingénieur Réseaux IP & Data Center',
          pole: 'Pôle Services',
          description: 'Conception, intégration, routage avancé, sécurité SI et déploiement clés en main.',
        },
        {
          title: 'Ingénieur Transmission, Broadcast & VSAT',
          pole: 'Pôle Déploiement',
          description: 'Déploiement FTK de faisceaux hertziens, stations terriennes VSAT et solutions TV & Media.',
        },
        {
          title: 'Ingénieur Audit QoS & Drive Test',
          pole: 'Pôle Qualité de Service',
          description: 'Campagnes de mesures radio/IP, benchmarking opérateurs, NPO et contrôle QA/QC.',
        },
        {
          title: 'Chef de Projet PMO / AMOA',
          pole: 'Pôle Conseil & Delivery',
          description: 'Pilotage de déploiements multi-sites, coordination ressources et suivi qualité/EHS.',
        },
      ],
    },
    applyPage: {
      title: 'Candidature Spontanée',
      subtitle: 'Faites partie de l’aventure Smart Engineering & Management',
      intro:
        'SEM fait de ses ressources humaines son avantage concurrentiel majeur. Si votre objectif est de rejoindre une équipe jeune et dynamique pour participer à notre croissance, envoyez-nous votre candidature.',
      labels: {
        lastName: 'Nom',
        firstName: 'Prénom',
        email: 'Adresse e-mail',
        phone: 'Téléphone',
        pole: 'Pôle / Spécialité visée',
        cv: 'Votre C.V. (PDF, DOC, DOCX)',
        cvHint: 'Glissez votre fichier ou cliquez pour parcourir (max 10 Mo)',
        coverLetter: 'Lettre de motivation / Parcours',
        captcha: 'Vérification anti-robot : combien font 4 + 5 ?',
        submit: 'Envoyer ma candidature',
        successTitle: 'Candidature enregistrée avec succès',
        successBody:
          'Merci pour votre intérêt envers SEM. Notre direction des Ressources Humaines étudiera votre profil avec attention et vous contactera si une opportunité correspond à votre parcours.',
        newApplication: 'Soumettre une autre candidature',
      },
      poleOptions: [
        'Pôle Services (IT, Réseaux, Data Centers, Broadcast)',
        'Pôle Conseil & Formation (AMOA, PMO)',
        'Pôle Sûreté Électronique',
        'Pôle Qualité de Service (QoS, Drive Test, Test & Mesure)',
        'Fonctions Support (Finance, RH, Commercial)',
      ],
    },
    contactPage: {
      title: 'Contactez-nous',
      subtitle: 'Notre équipe s’engage à répondre à votre demande dans les plus brefs délais',
      intro:
        'Une question technique, une demande de devis ou un projet d’infrastructure au Maroc ou en Afrique ? Adressez-vous directement à la direction concernée.',
      hqTitle: 'Siège Social — Mohammedia',
      address: '90 Quartier Industriel, Mohammedia 20800, Maroc',
      phone: '+212 (0) 523 322 321',
      email: 'contact@sem.ma',
      hoursTitle: 'Horaires d’ouverture',
      hoursWeekday: 'Lundi – Vendredi : 08:30 – 17:00',
      hoursWeekend: 'Samedi – Dimanche : Fermé',
      formTitle: 'Formulaire de contact direct',
      labels: {
        lastName: 'Nom',
        firstName: 'Prénom',
        phone: 'Téléphone',
        email: 'E-mail',
        department: 'Direction concernée',
        subject: 'Sujet',
        message: 'Message',
        submit: 'Envoyer le message',
        successTitle: 'Votre message a bien été envoyé',
        successBody:
          'Merci de nous avoir contactés. L’équipe concernée chez SEM reviendra vers vous dans les plus brefs délais.',
        sendAnother: 'Envoyer un autre message',
      },
      departments: [
        'Commerciale',
        'Opérations',
        'Ressources humaines',
        'Administrative et financière',
      ],
    },
  },
  en: {
    nav: [
      { label: 'Home', path: '/' },
      {
        label: 'About Us',
        children: [
          {
            label: 'General Manager’s Message',
            description: 'Strategic vision and commitments by Youssef El Malali',
            path: '/mot-du-directeur-general',
          },
          {
            label: 'History',
            description: 'From Sicotel Engineering (2008) to international SEM',
            path: '/histoire',
          },
          {
            label: 'Mission & Values',
            description: 'Operational excellence and long-term Win-Win partnerships',
            path: '/mission-et-valeurs',
          },
          {
            label: 'Strategic Business Units',
            description: 'Our 4 integrated engineering and service poles',
            path: '/domaines-d-activites',
          },
          {
            label: 'Organization',
            description: 'Hybrid matrix and projectized agile governance',
            path: '/organisation',
          },
          {
            label: 'Certifications',
            description: 'ISO 9001 Quality & OHSAS 18001 EHS programs',
            path: '/certifications',
          },
        ],
      },
      { label: 'Portfolio', path: '/portefeuille' },
      {
        label: 'Ecosystem',
        children: [
          {
            label: 'Our Partners',
            description: 'Strategic alliances with leading global OEMs',
            path: '/partenaires',
          },
          {
            label: 'Our Clients',
            description: 'Telecom operators, governments, defense & banking',
            path: '/clients',
          },
        ],
      },
      {
        label: 'Careers',
        children: [
          {
            label: 'Spontaneous Application',
            description: 'Join our engineering teams in Morocco and across Africa',
            path: '/candidature',
          },
          {
            label: 'Job Openings',
            description: 'Open positions and core engineering profiles',
            path: '/offres-d-emplois',
          },
        ],
      },
    ],
    contactCta: 'Contact Us',
    footer: {
      tagline: 'Smart Engineering & Management — IT Engineering, Telecoms, Data Centers, Broadcast & VSAT, Electronic Security, and QoS since 2008.',
      aboutColTitle: 'About SEM',
      solutionsColTitle: 'Expertise & Ecosystem',
      careersColTitle: 'Careers',
      contactColTitle: 'Headquarters',
      rights: '© 2008 – 2026 SEM — Smart Engineering & Management. All rights reserved.',
      languageLabel: 'Language',
    },
    home: {
      eyebrow: 'Smart Engineering & Management · Morocco & Africa',
      headline: 'Turnkey IT, Telecom & Critical Infrastructure Engineering',
      subheadline:
        'Since 2008, SEM designs, deploys, and manages mission-critical networks, Data Centers, Broadcast & VSAT systems, and electronic security solutions across Morocco and Africa.',
      primaryCta: 'Explore Business Units',
      secondaryCta: 'General Manager’s Note',
      kpis: [
        { value: '2008', label: 'Founded', context: '18 years of engineering execution' },
        { value: '17 Countries', label: 'African Footprint', context: 'Active South-South cooperation' },
        { value: '4 Poles', label: 'Strategic Divisions', context: 'Services, Consulting, Security, QoS' },
        { value: 'ISO 9001', label: 'Quality & EHS Standards', context: 'Continuous improvement & OHSAS 18001' },
      ],
      segmentsHeading: 'Client Sectors & Segments',
      segmentsSubheading:
        'Since 2008, SEM serves five demanding institutional and enterprise sectors across the entire infrastructure value chain.',
      segments: [
        {
          index: '01',
          title: 'Defense & Security',
          detail: 'Critical electronic protection, radar, sonar, and hardened communications.',
        },
        {
          index: '02',
          title: 'Public Administrations',
          detail: 'Government network modernization, Data Centers, and SI integration.',
        },
        {
          index: '03',
          title: 'Telecom Operators & Regulators',
          detail: 'Fixed and wireless roll-outs, independent QoS audits, and benchmarking.',
        },
        {
          index: '04',
          title: 'Telecom Equipment Vendors',
          detail: 'Certified field execution, network roll-out, and specialized technical support.',
        },
        {
          index: '05',
          title: 'Banking & Insurance',
          detail: 'High-availability IP infrastructures, cybersecurity, and Managed Services.',
        },
      ],
      polesHeading: 'Strategic Business Units',
      polesSubheading:
        'Four integrated poles mastering technology, schedule, cost, and quality across every project milestone.',
      polesCta: 'Explore division',
      diversificationTitle: 'End-to-End Mastery & OPEX Optimization',
      diversificationBody:
        'SEM’s diversification strategy provides a decisive advantage: multi-technology consulting engineers, continuous R&D watch on IT/Telecom innovations, and Managed Services contracts structured to reduce operational expenditure (OPEX).',
      africaHighlightTitle: 'Pan-African Expansion — 17 Countries Delivered',
      africaHighlightBody:
        'Aligned with Morocco’s South-South cooperation vision, SEM exports its engineering capabilities across Africa with successful projects delivered in 17 countries.',
      dgSectionLabel: 'Message from the General Manager',
      dgQuote:
        '“Your challenge is our progress” is our motto. By choosing SEM, you partner with a team mastering technology, delivery timelines, costs, and quality to achieve operational excellence.',
      dgName: 'Youssef El Malali',
      dgRole: 'General Manager — SEM',
      dgReadMore: 'Read full message',
      ecosystemHeading: 'Global OEM Alliances & Client Trust',
      ecosystemSubheading:
        'SEM partners with premier global manufacturers (Keysight, Ericsson, GENELEC) and supports leading institutions over the long term.',
      viewPartners: 'View all partners',
      viewClients: 'View all clients',
      testimonialsHeading: 'Client Perspectives & Proven Delivery',
      testimonialsSubheading:
        'Engineering leaders across telecom operators, national broadcasters, and regulatory institutions share the operational impact of partnering with SEM.',
      testimonials: [
        {
          id: 't-telecom',
          quote:
            'Before working with SEM, multi-site transmission roll-outs faced field coordination bottlenecks. Their projectized customer teams and dedicated QA/QC controllers enabled 100% on-time site acceptance.',
          author: 'Karim Benali',
          role: 'Director of Network Roll-out & Transmission',
          organization: 'Maroc Telecom',
          sector: 'Telecom Operator',
          pole: 'Services & FTK Pole',
          logoSrc: '/images/clients/client-01.png',
          logoAlt: 'Maroc Telecom',
        },
        {
          id: 't-broadcast',
          quote:
            'During our broadcast platform and VSAT ground-link upgrade, SEM handled full systems integration and delivered hands-on OJT training for our engineers, reducing field incidents and recurring maintenance costs.',
          author: 'Nadia Tazi',
          role: 'Head of Broadcast Engineering',
          organization: 'SNRT',
          sector: 'National Broadcasting',
          pole: 'Broadcast & VSAT',
          logoSrc: '/images/clients/client-snrt.png',
          logoAlt: 'SNRT — National Broadcasting Corporation',
        },
        {
          id: 't-qos',
          quote:
            'SEM’s independent Drive Test campaigns and QoS network audits using Keysight measurement tools provided reliable nationwide benchmarks that accelerated our network optimization decisions.',
          author: 'Tariq El Idrissi',
          role: 'Quality & Measurement Program Lead',
          organization: 'ANRT',
          sector: 'Telecom Regulator',
          pole: 'Quality of Service Pole',
          logoSrc: '/images/clients/client-02.png',
          logoAlt: 'ANRT — National Telecommunications Regulatory Agency',
        },
      ],
      careersBannerTitle: 'Human talent at the heart of operational excellence',
      careersBannerBody:
        'SEM treats its human capital as its primary competitive advantage. Join a committed engineering team operating across Morocco and Africa.',
      careersBannerCta: 'Apply now',
    },
    dgPage: {
      title: 'General Manager’s Message',
      subtitle: 'Strategic vision, quality commitments, and pan-African growth',
      motto: '“Your challenge is our progress” is our motto!',
      paragraphs: [
        'Dear Clients, at SEM, since our inception in 2008, we have tackled the most complex challenges surrounding the development of your IT & Telecom infrastructures.',
        'We were founded with a clear objective: supporting you across every milestone of your IT & Telecom infrastructure value chain.',
        'By choosing SEM, you choose a partner that masters the key success factors—technology, timelines, cost, and quality—enabling you to achieve operational excellence through design studies, technology selection, infrastructure deployment, knowledge transfer, and maintenance.',
        'Our strength lies in continuous technological watch, allowing us to deliver innovative solutions that curb rising OPEX. Our engineers follow ongoing training programs to bring you the latest innovations tailored to your specific needs.',
        'We also draw strength from strategic partnerships with top national and international industry leaders, giving you access to optimal pricing, training, and technical support.',
      ],
      commitmentsTitle: 'By choosing SEM, you receive our commitment to:',
      commitments: [
        'Strict compliance with your quality standards;',
        'Strict compliance with your safety & EHS standards;',
        'On-time delivery against agreed schedules;',
        'Cost and pricing optimization.',
      ],
      closingParagraphs: [
        'Dear clients and partners, thanks to your trust, SEM has achieved sustained growth since day one. Today we are a mature engineering firm advancing ISO 9001 quality and OHSAS 18001 EHS programs.',
        'We have also successfully executed our African expansion strategy, delivering projects across 17 African countries as part of an ambitious South-South internationalization roadmap.',
        'With SEM, you gain deep mastery of the macro and micro-economic environments shaping IT & Telecoms in Morocco and Africa.',
      ],
      signatureName: 'Youssef El Malali',
      signatureTitle: 'SEM — General Manager',
    },
    historyPage: {
      title: 'Our History',
      subtitle: 'Key milestones of our engineering journey since 2008',
      intro:
        'Throughout its growth, SEM has passed decisive milestones that shaped our capabilities in Morocco and across the African continent.',
      milestones: [
        {
          year: '2008',
          title: 'Creation of Sicotel Engineering & Management',
          description: 'Company founded in Morocco under the name Sicotel Engineering & Management.',
          category: 'Foundation',
        },
        {
          year: '2008',
          title: 'Technical & Managerial Consulting',
          description: 'Launch of technical consulting, network engineering, and project advisory services.',
          category: 'Consulting',
        },
        {
          year: '2009',
          title: 'Turnkey Telecom Infrastructure Construction',
          description: 'Launch of full turnkey construction for IT, telecom, and electronic security infrastructures.',
          category: 'Deployment',
        },
        {
          year: '2012',
          title: 'Test & Measurement Equipment Distribution',
          description: 'Launch of network test and measurement instrumentation distribution across IP and wireless networks.',
          category: 'Measurement',
        },
        {
          year: '2016',
          title: 'Smart Engineering & Management (SEM)',
          description: 'Official rebranding to Smart Engineering & Management (SEM) with unchanged shareholding structure.',
          category: 'Identity',
        },
        {
          year: '2016',
          title: 'Broadcast & VSAT Infrastructure',
          description: 'Expansion into Broadcast, TV & Media platforms, and VSAT satellite infrastructure deployment.',
          category: 'Broadcast',
        },
        {
          year: '2017+',
          title: 'Quality Certifications & 17-Country African Reach',
          description: 'ISO 9001 & OHSAS 18001 certification programs initiated alongside projects delivered in 17 African nations.',
          category: 'Quality & Africa',
        },
      ],
    },
    missionPage: {
      title: 'Mission & Values',
      subtitle: 'Building long-term “Win-Win” relationships driven by operational excellence',
      missionHeading: 'Our Mission',
      missionText:
        'SEM’s mission is to advise clients in defining their requirements and support them through the design and construction of their IT, telecom, and security network infrastructures to achieve targeted operational excellence.',
      visionText:
        'SEM also delivers continuous training to clients and partners for ongoing optimization, anchored in a clear vision of building long-term “Win-Win” partnerships.',
      valuesHeading: 'Our Core Values',
      values: [
        {
          index: '01',
          title: 'Honoring Commitments',
          subtitle: 'Quality & Schedules',
          description:
            'We commit to meeting agreed delivery deadlines and quality benchmarks while helping optimize and reduce your total operating costs.',
        },
        {
          index: '02',
          title: 'Client Satisfaction',
          subtitle: 'Requirements & CRM',
          description:
            'Client satisfaction is our core purpose and guarantee of longevity. Every project is measured by tangible operational results.',
        },
        {
          index: '03',
          title: 'Proximity',
          subtitle: 'Close to operational realities',
          description:
            'SEM stays close to its clients’ teams to tailor architectures and services precisely to field constraints.',
        },
        {
          index: '04',
          title: 'Integrity',
          subtitle: 'Ethics & Code of Conduct',
          description:
            'Business ethics, transparency, and moral rigor govern how we work and advise every partner.',
        },
      ],
    },
    polesPage: {
      title: 'Strategic Business Units',
      subtitle: 'Four specialized engineering poles for mission-critical infrastructures',
      intro:
        'SEM operates across four integrated strategic business units covering advisory, turnkey network roll-out, electronic security, and quality of service auditing.',
      poles: [
        {
          id: 'services',
          index: '01',
          title: 'Services Pole',
          shortDesc: 'End-to-end IT & Telecom integration, Data Centers, Broadcast & VSAT, Managed Services & Industrial IT.',
          fullDesc:
            'Our Services Pole manages full-lifecycle network integration and turnkey infrastructure roll-out while lowering operational expenditure through tailored Managed Services.',
          image: poleServicesImg,
          imageAlt: 'Telecommunications transmission tower and VSAT dish',
          capabilities: [
            'End-to-end IT and telecom network deployment & integration',
            'Turnkey network roll-out (IP, Telecom)',
            'Broadcast & VSAT infrastructure deployment',
            'Data Center design and turnkey build',
            'Information Systems Security (SI Security)',
            'Managed Services & OPEX optimization',
            'Industrial IT & M2M remote facility management',
          ],
          deliverables: ['IP & Fiber Networks', 'Full Turnkey (FTK)', 'Data Centers & Power', 'Managed Operations'],
        },
        {
          id: 'conseil',
          index: '02',
          title: 'Consulting & Training Pole',
          shortDesc: 'Technical & managerial advisory, AMOA, Network Design, staffing, and OJT knowledge transfer.',
          fullDesc:
            'Our senior consultants guide technical leadership through network architecture design, project management, AMOA, and structured hands-on knowledge transfer.',
          image: headquartersImg,
          imageAlt: 'SEM engineering consulting room',
          capabilities: [
            'Multi-technology technical & managerial consulting',
            'Network Design & Capacity Planning',
            'Project Management & AMOA',
            'Technical & leadership training programs',
            'On-the-Job Training (OJT) & knowledge transfer',
            'Specialized engineering recruitment & staffing',
          ],
          deliverables: ['Design Masterplans', 'PMO Governance', 'Team Certification', 'Technical Staffing'],
        },
        {
          id: 'surete',
          index: '03',
          title: 'Electronic Security Pole',
          shortDesc: 'Electronic perimeter protection, high-definition video surveillance, radar & sonar integration.',
          fullDesc:
            'Serving defense, coastal security, and critical facilities, our Electronic Security Pole delivers unified multi-sensor protection and command supervision centers.',
          image: poleSecurityImg,
          imageAlt: 'Electronic security and network operations control center',
          capabilities: [
            'Electronic protection for critical facilities',
            'Advanced IP Video Surveillance & analytics (VS)',
            'Coastal & perimeter Radar system integration',
            'Maritime Sonar protection systems',
            'Command & Security Operations Centers',
          ],
          deliverables: ['IP Video Surveillance', 'Radar & Sonar', 'Command Centers', 'Perimeter Protection'],
        },
        {
          id: 'qos',
          index: '04',
          title: 'Quality of Service (QoS) Pole',
          shortDesc: 'Network audits, Drive Test & Benchmarking, Site QA/QC, and precision test instrumentation.',
          fullDesc:
            'Our QoS Pole measures real-world network performance via independent field audits, optimization, QA/QC inspections, and exclusive distribution of world-class T&M tools.',
          image: poleQosImg,
          imageAlt: 'RF spectrum analyzer and telecom quality measurement hardware',
          capabilities: [
            'Fixed, mobile & IP network auditing',
            'Drive Test & multi-operator Benchmarking',
            'QoS Management & Network Performance Optimization (NPO)',
            'Test & Measurement equipment distribution (Keysight)',
            'Field Site QA & QC inspections',
          ],
          deliverables: ['Audit & NPO Reports', 'Benchmarking Studies', 'T&M Hardware', 'Site QA / QC'],
        },
      ],
    },
    orgPage: {
      title: 'Organization',
      subtitle: 'A hybrid agile model shifting from matrix to projectized execution',
      intro:
        'SEM operates a hybrid organizational structure that adapts dynamically between matrix and projectized models according to client requirements, eliminating bureaucratic friction and accelerating field decisions.',
      directorTitle: 'General Director (Direction Générale)',
      departments: [
        {
          id: 'hr',
          name: 'Human Resources',
          role: 'Talent & Capability',
          units: ['Competences Development', 'Recruitment', 'HR Specialist'],
        },
        {
          id: 'finance',
          name: 'Finance & Administration',
          role: 'Corporate Governance',
          units: ['Financial Analysis', 'Accounting', 'Facilities & IT', 'Legal & Taxes'],
        },
        {
          id: 'sales',
          name: 'Sales & Business Development',
          role: 'Client Solutions',
          units: ['Solution Engineering', 'Technical Support', 'Bid Management', 'Facilities & IT'],
        },
        {
          id: 'delivery',
          name: 'Delivery & Operations',
          role: 'Execution Backbone',
          units: ['PMO', 'Logistics', 'Quality Management', 'Testbed & Trainings'],
        },
        {
          id: 'customer',
          name: 'Customer Team',
          role: 'Dedicated Projectized Unit',
          units: ['Account Manager', 'Project Manager', 'Resource Coordinator', 'Quality & EHS Controller'],
        },
      ],
    },
    certPage: {
      title: 'Certifications & Quality Policy',
      subtitle: 'Continuous improvement, operational rigor, and EHS excellence',
      intro:
        'SEM adheres to a structured continuous improvement framework aligned with international quality and occupational health & safety benchmarks.',
      programs: [
        {
          code: 'ISO 9001',
          name: 'Quality Management System',
          scope: 'Engineering, IT/Telecom integration, turnkey deployment, and Managed Services',
          status: 'Quality Standard',
          description:
            'Standardized project governance, end-to-end deliverable traceability, and systematic customer satisfaction tracking.',
        },
        {
          code: 'OHSAS 18001 / EHS',
          name: 'Occupational Health, Safety & Environment',
          scope: 'Telecom sites, towers, power systems, Data Centers, and field engineering',
          status: 'Safety & EHS Standard',
          description:
            'Field hazard prevention led by dedicated Quality & EHS Controllers embedded within client project teams.',
        },
      ],
      pillarsTitle: 'Operational Field Controls',
      pillars: [
        {
          title: 'Systematic Site QA & QC',
          detail: 'Formal quality verification prior to provisional and final site acceptance.',
        },
        {
          title: 'Embedded EHS Control',
          detail: 'Dedicated Quality & EHS Controller assigned directly to Customer Teams.',
        },
        {
          title: 'Testbed & Continuous Training',
          detail: 'Dedicated testbed lab and ongoing vendor certification tracks for engineers.',
        },
      ],
    },
    portfolioPage: {
      title: 'Our Portfolio',
      subtitle: 'A continuously evolving catalog of engineering services and exclusive OEM products',
      intro:
        'SEM maintains a comprehensive portfolio spanning advisory, network roll-out, power & shelter infrastructure, test instrumentation, and exclusive equipment distribution.',
      allLabel: 'All capabilities',
      exclusiveHeading: 'Exclusive Distribution & Official OEM Channels',
      exclusiveBrands: [
        {
          brand: 'Keysight Technologies',
          category: 'Test & Measurement',
          description: 'Exclusive distribution of RF, microwave, wireless communication, and general-purpose electronic measurement tools.',
        },
        {
          brand: 'Ericsson TV & Media',
          category: 'Broadcast & Media',
          description: 'Official distribution and systems integration for carrier-grade TV & Media broadcast platforms.',
        },
        {
          brand: 'GENELEC',
          category: 'Industrial Power',
          description: 'Distribution and turnkey installation of GENELEC industrial generator sets for critical telecom & Data Center sites.',
        },
      ],
      categories: [
        {
          id: 'conseil',
          index: '01',
          title: 'Consulting',
          summary: 'Strategic advisory and technical capability building.',
          items: ['Recruitment', 'Staffing', 'OJT & Knowledge Transfer'],
        },
        {
          id: 'services',
          index: '02',
          title: 'Services',
          summary: 'Architecture design, delivery management, and secure operations.',
          items: ['Network Design & Planning', 'Project Management', 'AMOA', 'Managed Services', 'IT Security'],
        },
        {
          id: 'qualite',
          index: '03',
          title: 'Quality (QoS)',
          summary: 'Objective auditing and end-to-end performance optimization.',
          items: ['Network Audit', 'NPO', 'Drive Test', 'QoS', 'Benchmarking', 'Sites QA & QC'],
        },
        {
          id: 'formation',
          index: '04',
          title: 'Training',
          summary: 'Structured upskilling for engineering and management teams.',
          items: ['Technical Training', 'Management Training', 'Testbed Labs'],
        },
        {
          id: 'infrastructure',
          index: '05',
          title: 'Infrastructure & Environment',
          summary: 'Site civil works, autonomous power, and precision cooling.',
          items: ['Low Current Systems', 'Power Systems', 'Precision Cooling', 'Solar Systems', 'Shelters', 'Telecom Towers'],
        },
        {
          id: 'deploiement',
          index: '06',
          title: 'Deployment',
          summary: 'Turnkey field execution across fixed, wireless, and satellite links.',
          items: [
            'Network Roll-out',
            'FTK Projects (Full Turnkey)',
            'Transmission, Fixed & Wireless technologies',
            'Broadcast & VSAT Infrastructures',
          ],
        },
        {
          id: 'test-measurement',
          index: '07',
          title: 'Test & Measurement',
          summary: 'Precision instrumentation for labs, regulators, and operators.',
          items: [
            'T&M equipment for wireless communications',
            'General-purpose electronics instrumentation',
            'Microwave & RF measurement systems',
          ],
        },
        {
          id: 'distribution',
          index: '08',
          title: 'Exclusive Distribution',
          summary: 'Authorized regional distribution for tier-one global brands.',
          items: [
            'Keysight Test & Measurement Tools',
            'Ericsson TV & Media Products',
            'GENELEC Power Generators',
          ],
        },
      ],
      ctaTitle: 'Need a tailored engineering architecture or commercial quote?',
      ctaButton: 'Speak with our engineers',
    },
    partnersPage: {
      title: 'Our Partners',
      subtitle: 'Allied with the world’s premier technology manufacturers',
      intro:
        'To deliver top-tier technical reliability, competitive commercial terms, and ongoing engineering support, SEM builds enduring alliances with leading global OEMs.',
    },
    clientsPage: {
      title: 'Our Clients',
      subtitle: 'Trusted by national institutions and international operators',
      intro:
        'We take pride in contributing directly to the operational success of our clients across telecommunications, broadcast, banking, defense, and public administration.',
      acknowledgement:
        'We sincerely thank our long-standing clients who continue to trust our vision, engineering passion, and commitment to excellence.',
    },
    jobsPage: {
      title: 'Job Openings',
      subtitle: 'Build critical infrastructure across Morocco and Africa',
      intro:
        'SEM treats its human resources as its strongest competitive edge. Explore our current status or submit a spontaneous application directly.',
      emptyNoticeTitle: 'No specific job listing is currently open',
      emptyNoticeBody:
        'Our talent pipeline remains open year-round for upcoming deployments in Morocco and across Africa. If you specialize in IT Networks, Telecoms, Electronic Security, or PMO, please submit your CV via our spontaneous application form.',
      spontaneousCta: 'Submit spontaneous application',
      profilesHeading: 'Core engineering profiles we regularly recruit',
      profiles: [
        {
          title: 'IP Network & Data Center Engineer',
          pole: 'Services Pole',
          description: 'Architecture design, core routing, IT security, and turnkey Data Center roll-outs.',
        },
        {
          title: 'Transmission, Broadcast & VSAT Engineer',
          pole: 'Deployment Pole',
          description: 'Full-turnkey microwave links, VSAT ground stations, and Broadcast systems.',
        },
        {
          title: 'QoS Audit & Drive Test Engineer',
          pole: 'QoS Pole',
          description: 'Radio/IP field campaigns, multi-operator benchmarking, NPO, and site QA/QC.',
        },
        {
          title: 'PMO / AMOA Project Manager',
          pole: 'Consulting & Delivery',
          description: 'Multi-site deployment governance, resource coordination, and EHS compliance.',
        },
      ],
    },
    applyPage: {
      title: 'Spontaneous Application',
      subtitle: 'Join Smart Engineering & Management',
      intro:
        'SEM considers its people its key competitive advantage. If you want to join a young, dynamic engineering team and contribute to our growth, submit your profile below.',
      labels: {
        lastName: 'Last Name',
        firstName: 'First Name',
        email: 'Email Address',
        phone: 'Phone Number',
        pole: 'Target Practice / Specialty',
        cv: 'Your Resume / CV (PDF, DOC, DOCX)',
        cvHint: 'Drop your resume here or click to browse (max 10 MB)',
        coverLetter: 'Cover Letter / Summary',
        captcha: 'Anti-bot check: what is 4 + 5?',
        submit: 'Submit Application',
        successTitle: 'Application received successfully',
        successBody:
          'Thank you for applying to SEM. Our Human Resources team will review your profile carefully and reach out when a matching role opens.',
        newApplication: 'Submit another application',
      },
      poleOptions: [
        'Services Pole (IT, Networks, Data Centers, Broadcast)',
        'Consulting & Training Pole (AMOA, PMO)',
        'Electronic Security Pole',
        'Quality of Service Pole (QoS, Drive Test, T&M)',
        'Corporate Support (Finance, HR, Sales)',
      ],
    },
    contactPage: {
      title: 'Contact Us',
      subtitle: 'Our customer service team responds promptly to every inquiry',
      intro:
        'Have a technical question, tender inquiry, or infrastructure project in Morocco or Africa? Route your message directly to the relevant SEM department.',
      hqTitle: 'Headquarters — Mohammedia',
      address: '90 Quartier Industriel, Mohammedia 20800, Morocco',
      phone: '+212 (0) 523 322 321',
      email: 'contact@sem.ma',
      hoursTitle: 'Business Hours',
      hoursWeekday: 'Monday – Friday: 08:30 – 17:00',
      hoursWeekend: 'Saturday – Sunday: Closed',
      formTitle: 'Direct Inquiry Form',
      labels: {
        lastName: 'Last Name',
        firstName: 'First Name',
        phone: 'Phone',
        email: 'Email',
        department: 'Target Department',
        subject: 'Subject',
        message: 'Message',
        submit: 'Send Message',
        successTitle: 'Your message has been sent',
        successBody:
          'Thank you for reaching out to SEM. The designated department will respond to your inquiry shortly.',
        sendAnother: 'Send another message',
      },
      departments: [
        'Commercial / Sales',
        'Operations',
        'Human Resources',
        'Finance & Administration',
      ],
    },
  },
};
