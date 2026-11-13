import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { Language, RoutePath } from '../types/sem';

type PhaseId = 'discovery' | 'planning' | 'execution' | 'delivery';
type DeliveryTrackId = 'ftk' | 'datacenter' | 'qos';

interface PhaseDefinition {
  id: PhaseId;
  index: string;
  x: number;
  title: { fr: string; en: string };
  svgShortTitle: { fr: string; en: string };
  duration: { fr: string; en: string };
  gate: { fr: string; en: string };
  owner: { fr: string; en: string };
  summary: { fr: string; en: string };
  deliverablesByTrack: Record<DeliveryTrackId, { fr: string[]; en: string[] }>;
  relatedCategories: string[];
}

const TRACKS: { id: DeliveryTrackId; label: { fr: string; en: string } }[] = [
  {
    id: 'ftk',
    label: { fr: 'Réseaux & FTK Télécoms', en: 'Telecom & FTK Roll-out' },
  },
  {
    id: 'datacenter',
    label: { fr: 'Data Center & Énergie', en: 'Data Center & Power' },
  },
  {
    id: 'qos',
    label: { fr: 'QoS, Mesures & Sûreté', en: 'QoS, T&M & Security' },
  },
];

const PHASES: PhaseDefinition[] = [
  {
    id: 'discovery',
    index: '01',
    x: 115,
    title: {
      fr: 'Découverte & Cadrage',
      en: 'Discovery',
    },
    svgShortTitle: {
      fr: 'Découverte',
      en: 'Discovery',
    },
    duration: { fr: 'Sem. 1 – 2', en: 'Weeks 1 – 2' },
    gate: { fr: 'Cadrage validé', en: 'Scope Sign-Off' },
    owner: {
      fr: 'Account Manager · Solution Engineering · AMOA',
      en: 'Account Manager · Solution Engineering · AMOA',
    },
    summary: {
      fr: 'Expression précise des besoins opérationnels, visites et relevés terrain (Site Survey), audit des existants IT/RF/énergie et validation de faisabilité technique et budgétaire.',
      en: 'Structured requirements capture, physical site surveys, baseline IT/RF/power audits, and technical-commercial feasibility validation.',
    },
    deliverablesByTrack: {
      ftk: {
        fr: [
          'Cahier des charges & matrice d’exigences client',
          'Rapports Site Survey (génie civil, pylônes, visibilité FH)',
          'Audit d’interconnexion IP / Transmission & VSAT',
          'Dossier de faisabilité & pré-chiffrage CAPEX / OPEX',
        ],
        en: [
          'Client requirements specification & scope matrix',
          'Field Site Survey reports (civil works, towers, LOS)',
          'Baseline IP / Transmission & VSAT interconnection audit',
          'Feasibility study & CAPEX / OPEX budget validation',
        ],
      },
      datacenter: {
        fr: [
          'Audit de charge IT, bilans thermiques et électriques',
          'Étude d’implantation Data Center / Shelter & courants faibles',
          'Évaluation autonomie secours (GENELEC & solaire)',
          'Note de cadrage disponibilité & exigences EHS',
        ],
        en: [
          'IT load, thermal cooling & electrical capacity audit',
          'Data Center / technical shelter & low-current layout review',
          'Backup autonomy sizing (GENELEC generators & solar)',
          'Availability target brief & EHS compliance baseline',
        ],
      },
      qos: {
        fr: [
          'Cartographie des zones critiques, routes Drive Test ou périmètres',
          'Spécification des KPI réglementaires (ANRT) ou seuils de sûreté',
          'Audit des équipements de mesure ou capteurs existants',
          'Plan de campagne & protocole de mesure de référence',
        ],
        en: [
          'Mapping of target corridors, Drive Test routes, or perimeters',
          'Regulatory KPI definition (QoS) or security threat matrix',
          'Inventory of existing T&M probes, radars, or CCTV sensors',
          'Baseline campaign blueprint & measurement protocol',
        ],
      },
    },
    relatedCategories: ['conseil', 'qualite'],
  },
  {
    id: 'planning',
    index: '02',
    x: 345,
    title: {
      fr: 'Planification & Design',
      en: 'Planning',
    },
    svgShortTitle: {
      fr: 'Planification',
      en: 'Planning',
    },
    duration: { fr: 'Sem. 3 – 5', en: 'Weeks 3 – 5' },
    gate: { fr: 'Design figé · Kick-off', en: 'Design Freeze' },
    owner: {
      fr: 'Project Manager (PMO) · Architectes · Contrôleur EHS',
      en: 'Project Manager (PMO) · Architects · EHS Controller',
    },
    summary: {
      fr: 'Élaboration des dossiers d’architecture HLD/LLD, ordonnancement PMO, mobilisation de la Customer Team dédiée en mode projectized, sécurisation logistique OEM et plan de prévention EHS.',
      en: 'HLD/LLD engineering design, PMO master scheduling, mobilization of a dedicated projectized Customer Team, OEM supply coordination, and OHSAS 18001 EHS planning.',
    },
    deliverablesByTrack: {
      ftk: {
        fr: [
          'Dossiers d’ingénierie HLD / LLD & plan d’adressage IP',
          'Planning directeur PMO & jalons de déploiement multi-sites',
          'Approvisionnement constructeurs (Ericsson TV & Media, VSAT, FH)',
          'Plan Assurance Qualité (PAQ) & matrice sécurité OHSAS 18001',
        ],
        en: [
          'HLD / LLD engineering design & IP addressing blueprint',
          'PMO master schedule & multi-site roll-out milestones',
          'OEM procurement scheduling (Ericsson TV & Media, VSAT, RF)',
          'Quality Assurance Plan & OHSAS 18001 safety matrix',
        ],
      },
      datacenter: {
        fr: [
          'Plans d’exécution génie civil, climatisation de précision & racks',
          'Schémas unifilaires énergie, onduleurs et groupes GENELEC',
          'Tests de pré-configuration en laboratoire Testbed SEM',
          'Planification des bascules sans interruption de service',
        ],
        en: [
          'Detailed civil, precision cooling & containment drawings',
          'Single-line electrical, UPS & GENELEC generator schematics',
          'Pre-staging and bench validation in SEM Testbed lab',
          'Zero-downtime cutover & migration sequence plan',
        ],
      },
      qos: {
        fr: [
          'Configuration bancs Keysight & véhicules Drive Test',
          'Architecture hypervision SOC, implantation radars & sonars',
          'Calendrier d’intervention et coordination équipes terrain',
          'Grilles d’inspection QA / QC et critères d’acceptation',
        ],
        en: [
          'Calibration of Keysight instrumentation & Drive Test rigs',
          'SOC command architecture, radar & sonar coverage design',
          'Field dispatch schedule & resource coordinator allocation',
          'Site QA / QC inspection checklists & acceptance criteria',
        ],
      },
    },
    relatedCategories: ['services', 'infrastructure'],
  },
  {
    id: 'execution',
    index: '03',
    x: 575,
    title: {
      fr: 'Exécution & Intégration',
      en: 'Execution',
    },
    svgShortTitle: {
      fr: 'Exécution',
      en: 'Execution',
    },
    duration: { fr: 'Sem. 6 – 12', en: 'Weeks 6 – 12' },
    gate: { fr: 'Réception provisoire (PAT)', en: 'Provisional Acceptance' },
    owner: {
      fr: 'Équipes Roll-out · Resource Coordinator · QA / QC',
      en: 'Field Roll-out Teams · Resource Coordinator · QA / QC',
    },
    summary: {
      fr: 'Déploiement sur site Full Turnkey (FTK), raccordement des équipements, tests unitaires et mesures RF/IP, sous contrôle continu de nos contrôleurs Qualité & EHS.',
      en: 'On-site Full Turnkey (FTK) construction, equipment integration, commissioning tests, and RF/IP validation overseen continuously by embedded Quality & EHS Controllers.',
    },
    deliverablesByTrack: {
      ftk: {
        fr: [
          'Déploiement terrain FTK : pylônes, liaisons fibre/FH & stations VSAT',
          'Intégration cœur IP, sécurité SI et têtes de réseau Broadcast',
          'Tests de recette usine/site (FAT / SAT) et levée des réserves',
          'Rapports hebdomadaires d’avancement PMO & contrôles QA / QC',
        ],
        en: [
          'Field FTK deployment: towers, fiber/microwave & VSAT stations',
          'Core IP, SI security & Broadcast headend systems integration',
          'Factory & Site Acceptance Testing (FAT / SAT) & punch-list closure',
          'Weekly PMO progress reporting & embedded QA / QC audits',
        ],
      },
      datacenter: {
        fr: [
          'Montage salles informatiques, confinement, climatisation & détection incendie',
          'Installation et essais en charge groupes GENELEC & champs solaires',
          'Mise en œuvre télégestion M2M des paramètres thermiques et électriques',
          'Validation de redondance N+1 / 2N et essais de secours',
        ],
        en: [
          'Data Center fit-out, aisle containment, precision cooling & fire safety',
          'GENELEC generator sets & solar power installation and load-bank tests',
          'Industrial M2M telemetry deployment across power & cooling assets',
          'N+1 / 2N redundancy verification & failover stress testing',
        ],
      },
      qos: {
        fr: [
          'Exécution campagnes Drive Test multi-opérateurs & Benchmarking',
          'Déploiement caméras IP analytiques, radars côtiers & sonars',
          'Optimisation paramètres radio/IP (NPO) et recalage couverture',
          'Audits contradictoires de conformité terrain (Site QA / QC)',
        ],
        en: [
          'Multi-operator Drive Test campaigns & field Benchmarking',
          'Installation of analytic IP video, coastal radars & maritime sonars',
          'Radio/IP Network Performance Optimization (NPO) & tuning',
          'Independent field compliance & workmanship audits (Site QA / QC)',
        ],
      },
    },
    relatedCategories: ['deploiement', 'test-measurement'],
  },
  {
    id: 'delivery',
    index: '04',
    x: 805,
    title: {
      fr: 'Livraison & Transfert',
      en: 'Delivery',
    },
    svgShortTitle: {
      fr: 'Livraison',
      en: 'Delivery',
    },
    duration: { fr: 'Sem. 13 – 16', en: 'Weeks 13 – 16' },
    gate: { fr: 'Réception définitive (FAC)', en: 'Final Handover (FAC)' },
    owner: {
      fr: 'Formateurs OJT · Support Technique · Managed Services',
      en: 'OJT Trainers · Technical Support · Managed Services',
    },
    summary: {
      fr: 'Remise du dossier As-Built complet, transfert de compétences pratique sur le terrain (OJT) et en laboratoire Testbed, réception définitive et passage en exploitation Managed Services.',
      en: 'Handover of complete As-Built documentation, On-the-Job Training (OJT) & Testbed team certification, Final Acceptance Certificate (FAC), and transition to OPEX-optimized Managed Services.',
    },
    deliverablesByTrack: {
      ftk: {
        fr: [
          'Dossier technique As-Built complet & inventaire des actifs',
          'Sessions de formation technique & transfert de compétences OJT',
          'Procès-verbal de Réception Définitive (FAC) sans réserve',
          'Contrat Managed Services & support 24/7 orienté réduction OPEX',
        ],
        en: [
          'Complete As-Built engineering dossier & serialized asset register',
          'Hands-on technical training & On-the-Job Training (OJT) transfer',
          'Unconditional Final Acceptance Certificate (FAC)',
          'OPEX-optimized Managed Services & SLA support transition',
        ],
      },
      datacenter: {
        fr: [
          'Manuels d’exploitation, procédures de maintenance & plans récolement',
          'Formation des équipes d’exploitation sur les systèmes énergie/froid',
          'Certification de conformité sécurité & performance énergétique',
          'Contrats de maintenance préventive et astreinte GENELEC / froid',
        ],
        en: [
          'Standard Operating Procedures (SOPs) & final as-built drawings',
          'Operations team certification on power & precision cooling systems',
          'Safety compliance & energy efficiency commissioning sign-off',
          'Preventive maintenance & GENELEC / cooling SLA support contract',
        ],
      },
      qos: {
        fr: [
          'Restitution exécutive des tableaux de bord QoS & Benchmark',
          'Calibration et remise des appareils Keysight / formation opérateurs',
          'Prise en main complète des centres de commandement Sûreté',
          'Plan d’amélioration continue & campagnes périodiques de contrôle',
        ],
        en: [
          'Executive QoS & multi-operator Benchmarking scorecard handover',
          'Keysight instrument calibration delivery & operator certification',
          'Full operational handover of Security Command & Supervision centers',
          'Continuous improvement cycle & scheduled periodic audits',
        ],
      },
    },
    relatedCategories: ['formation', 'distribution'],
  },
];

interface ProjectRoadmapProps {
  language: Language;
  onNavigate: (path: RoutePath) => void;
  onSelectCategory?: (categoryId: string) => void;
}

export const ProjectRoadmap: React.FC<ProjectRoadmapProps> = ({
  language,
  onNavigate,
  onSelectCategory,
}) => {
  const [activePhaseId, setActivePhaseId] = useState<PhaseId>('discovery');
  const [activeTrack, setActiveTrack] = useState<DeliveryTrackId>('ftk');

  const activeIndex = PHASES.findIndex((p) => p.id === activePhaseId);
  const activePhase = PHASES[activeIndex] || PHASES[0];

  const handlePhaseKeyDown = (e: React.KeyboardEvent, idx: number, id: PhaseId) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActivePhaseId(id);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = PHASES[(idx + 1) % PHASES.length];
      setActivePhaseId(next.id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = PHASES[(idx - 1 + PHASES.length) % PHASES.length];
      setActivePhaseId(prev.id);
    }
  };

  const progressEndX = activePhase.x;

  return (
    <section
      aria-labelledby="portfolio-roadmap-heading"
      className="py-14 lg:py-20 bg-[#F8FAFC] dark:bg-[#0B192C]/60 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Section Heading & Track Perspective Selector */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#3769B3] dark:text-[#24A9E0]">
              <Layers className="w-4 h-4" aria-hidden="true" />
              <span>
                {language === 'fr'
                  ? 'Méthodologie d’exécution · Cycle de vie projet'
                  : 'Delivery Methodology · Engineering Lifecycle'}
              </span>
            </div>
            <h2
              id="portfolio-roadmap-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight text-balance"
            >
              {language === 'fr'
                ? 'Feuille de route de livraison : de l’audit à la mise en service'
                : 'Engineering Delivery Roadmap: From Discovery to Handover'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'fr'
                ? 'Sélectionnez une phase sur le diagramme pour explorer nos jalons qualité, livrables techniques et responsabilités PMO.'
                : 'Select any phase on the roadmap diagram to inspect engineering deliverables, quality gates, and PMO ownership.'}
            </p>
          </div>

          {/* Delivery Track Selector */}
          <div
            role="tablist"
            aria-label={language === 'fr' ? 'Filière de livraison' : 'Project delivery track'}
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white dark:bg-[#070F1B] border border-slate-200 dark:border-slate-800 rounded-lg self-start lg:self-auto"
          >
            {TRACKS.map((track) => {
              const selected = activeTrack === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTrack(track.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    selected
                      ? 'bg-[#3769B3] text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {track.label[language]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive SVG Roadmap Container */}
        <div className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-4 sm:p-6 lg:p-8 space-y-6">
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 920 250"
              className="w-full min-w-[680px] h-auto select-none"
              role="img"
              aria-label={
                language === 'fr'
                  ? 'Feuille de route projet SEM en quatre phases : Découverte, Planification, Exécution et Livraison'
                  : 'SEM four-phase engineering delivery roadmap: Discovery, Planning, Execution, and Delivery'
              }
            >
              <defs>
                <pattern
                  id="roadmap-grid"
                  width="24"
                  height="24"
                  patternUnits="userSpaceOnUse"
                >
                  <circle
                    cx="1.5"
                    cy="1.5"
                    r="1"
                    className="fill-slate-200 dark:fill-slate-800"
                  />
                </pattern>
                <linearGradient id="roadmap-progress" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3769B3" />
                  <stop offset="100%" stopColor="#24A9E0" />
                </linearGradient>
              </defs>

              {/* Subtle technical backdrop */}
              <rect
                x="0"
                y="0"
                width="920"
                height="250"
                rx="12"
                fill="url(#roadmap-grid)"
                opacity="0.7"
              />

              {/* Timeline baseline track */}
              <line
                x1="115"
                y1="108"
                x2="805"
                y2="108"
                strokeWidth="4"
                strokeLinecap="round"
                className="stroke-slate-200 dark:stroke-slate-700"
              />

              {/* Active progress track */}
              <line
                x1="115"
                y1="108"
                x2={progressEndX}
                y2="108"
                stroke="url(#roadmap-progress)"
                strokeWidth="4"
                strokeLinecap="round"
              />

              {/* Milestone Gate Diamonds between Phases */}
              {[0, 1, 2].map((segIdx) => {
                const startX = PHASES[segIdx].x;
                const endX = PHASES[segIdx + 1].x;
                const midX = (startX + endX) / 2;
                const passed = segIdx < activeIndex;

                return (
                  <g key={`gate-${segIdx}`}>
                    {/* Directional chevron arrows */}
                    <path
                      d={`M ${midX - 4} 102 L ${midX + 4} 108 L ${midX - 4} 114`}
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={
                        passed
                          ? 'stroke-[#24A9E0]'
                          : 'stroke-slate-300 dark:stroke-slate-600'
                      }
                    />
                  </g>
                );
              })}

              {/* 4 Phase Nodes */}
              {PHASES.map((phase, idx) => {
                const isActive = phase.id === activePhaseId;
                const isCompleted = idx < activeIndex;
                const cardW = 192;
                const cardH = 128;
                const cardX = phase.x - cardW / 2;
                const cardY = 44;

                return (
                  <g
                    key={phase.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={isActive}
                    aria-label={`${phase.index}. ${phase.title[language]} (${phase.duration[language]})`}
                    onClick={() => setActivePhaseId(phase.id)}
                    onKeyDown={(e) => handlePhaseKeyDown(e, idx, phase.id)}
                    className="cursor-pointer focus:outline-none group"
                  >
                    {/* Top Timeline Duration Label */}
                    <text
                      x={phase.x}
                      y="26"
                      textAnchor="middle"
                      className={`text-[11px] font-mono font-semibold ${
                        isActive
                          ? 'fill-[#3769B3] dark:fill-[#24A9E0]'
                          : 'fill-slate-500 dark:fill-slate-400'
                      }`}
                    >
                      {phase.duration[language]}
                    </text>

                    {/* Active outer halo */}
                    {isActive && (
                      <rect
                        x={cardX - 4}
                        y={cardY - 4}
                        width={cardW + 8}
                        height={cardH + 8}
                        rx="15"
                        fill="none"
                        stroke="#24A9E0"
                        strokeWidth="2"
                        opacity="0.45"
                      />
                    )}

                    {/* Card surface */}
                    <rect
                      x={cardX}
                      y={cardY}
                      width={cardW}
                      height={cardH}
                      rx="12"
                      strokeWidth={isActive ? '2' : '1.25'}
                      className={
                        isActive
                          ? 'fill-[#0B192C] dark:fill-[#132844] stroke-[#24A9E0]'
                          : isCompleted
                            ? 'fill-[#F0F7FF] dark:fill-[#0F213B] stroke-[#3769B3]/60 dark:stroke-[#3769B3]'
                            : 'fill-white dark:fill-[#070F1B] stroke-slate-200 dark:stroke-slate-700 group-hover:stroke-[#3769B3]'
                      }
                    />

                    {/* Spine anchor node circle */}
                    <circle
                      cx={phase.x}
                      cy="108"
                      r="14"
                      strokeWidth="2"
                      className={
                        isActive
                          ? 'fill-[#24A9E0] stroke-white dark:stroke-[#0B192C]'
                          : isCompleted
                            ? 'fill-[#3769B3] stroke-white dark:stroke-[#0B192C]'
                            : 'fill-slate-100 dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600'
                      }
                    />

                    {/* Phase index inside circle */}
                    <text
                      x={phase.x}
                      y="112.5"
                      textAnchor="middle"
                      className={`text-[11px] font-mono font-bold ${
                        isActive || isCompleted
                          ? 'fill-white'
                          : 'fill-slate-700 dark:fill-slate-200'
                      }`}
                    >
                      {phase.index}
                    </text>

                    {/* Short Phase Title (top half inside card) */}
                    <text
                      x={phase.x}
                      y="76"
                      textAnchor="middle"
                      className={`text-[14px] font-display font-bold ${
                        isActive
                          ? 'fill-white'
                          : 'fill-slate-900 dark:fill-white'
                      }`}
                    >
                      {phase.svgShortTitle[language]}
                    </text>

                    {/* Gate / Exit Checkpoint label (bottom half inside card) */}
                    <text
                      x={phase.x}
                      y="148"
                      textAnchor="middle"
                      className={`text-[11px] font-medium ${
                        isActive
                          ? 'fill-[#24A9E0]'
                          : isCompleted
                            ? 'fill-[#3769B3] dark:fill-[#24A9E0]'
                            : 'fill-slate-500 dark:fill-slate-400'
                      }`}
                    >
                      {phase.gate[language]}
                    </text>

                    {/* Stepper indicator dot beneath card for active phase */}
                    {isActive && (
                      <polygon
                        points={`${phase.x - 6},184 ${phase.x + 6},184 ${phase.x},192`}
                        fill="#24A9E0"
                      />
                    )}
                  </g>
                );
              })}

              {/* Bottom Governance Legend Bar inside SVG */}
              <text
                x="460"
                y="224"
                textAnchor="middle"
                className="text-[11px] fill-slate-500 dark:fill-slate-400 font-medium"
              >
                {language === 'fr'
                  ? 'Gouvernance continue : Customer Team dédiée · Contrôle Qualité ISO 9001 & Sécurité OHSAS 18001 · Transfert OJT'
                  : 'Continuous Governance: Dedicated Customer Team · ISO 9001 Quality & OHSAS 18001 EHS Controls · OJT Handover'}
              </text>
            </svg>
          </div>

          {/* Active Phase Detail Panel */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Phase Narrative & Owner */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-mono font-bold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                  {activePhase.index}
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{activePhase.duration[language]}</span>
                <span aria-hidden="true">·</span>
                <span>{activePhase.gate[language]}</span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {activePhase.title[language]}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {activePhase.summary[language]}
              </p>

              <div className="pt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  {language === 'fr' ? 'Responsables : ' : 'Lead Roles: '}
                </span>
                {activePhase.owner[language]}
              </div>
            </div>

            {/* Phase Concrete Deliverables */}
            <div className="lg:col-span-4 space-y-3">
              <div className="text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0]">
                {language === 'fr'
                  ? 'Livrables clés de cette phase'
                  : 'Key Phase Deliverables'}
              </div>
              <ul className="space-y-2.5">
                {activePhase.deliverablesByTrack[activeTrack][language].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-800 dark:text-slate-200"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Phase Stepper & Actions */}
            <div className="lg:col-span-3 flex flex-col gap-3 bg-[#F8FAFC] dark:bg-[#070F1B] border border-slate-200 dark:border-slate-800 rounded-xl p-5">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {language === 'fr' ? 'Navigation de phase' : 'Phase Controls'}
              </div>

              <button
                type="button"
                onClick={() => {
                  const next = PHASES[(activeIndex + 1) % PHASES.length];
                  setActivePhaseId(next.id);
                }}
                className="w-full inline-flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700 hover:border-[#3769B3] dark:hover:border-[#24A9E0] rounded-lg transition-colors"
              >
                <span>
                  {language === 'fr' ? 'Phase suivante' : 'Next Phase'} (
                  {PHASES[(activeIndex + 1) % PHASES.length].index})
                </span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>

              {onSelectCategory && activePhase.relatedCategories[0] && (
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(activePhase.relatedCategories[0]);
                    const catalogEl = document.getElementById('portfolio-catalog-grid');
                    catalogEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="w-full inline-flex items-center justify-between gap-2 px-4 py-2.5 text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-700 hover:border-[#3769B3] dark:hover:border-[#24A9E0] rounded-lg transition-colors"
                >
                  <span>
                    {language === 'fr'
                      ? 'Filtrer le catalogue associé'
                      : 'Filter Related Catalog'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </button>
              )}

              <button
                type="button"
                onClick={() => onNavigate('/nous-contacter')}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors"
              >
                <span>
                  {language === 'fr' ? 'Planifier un cadrage' : 'Schedule Discovery'}
                </span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
