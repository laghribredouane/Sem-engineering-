import React, { useMemo, useState } from 'react';
import { ArrowRight, Network } from 'lucide-react';
import { Language, RoutePath } from '../types/sem';

type DisciplineId =
  | 'it'
  | 'telecom'
  | 'datacenter'
  | 'surete'
  | 'qos'
  | 'conseil';

type ViewPreset = 'all' | 'core' | 'field' | 'governance';

interface DisciplineNode {
  id: DisciplineId;
  code: string;
  poleId: 'services' | 'conseil' | 'surete' | 'qos';
  x: number;
  y: number;
  title: { fr: string; en: string };
  poleLabel: { fr: string; en: string };
  summary: { fr: string; en: string };
  deliverables: { fr: string[]; en: string[] };
}

interface DisciplineEdge {
  id: string;
  from: DisciplineId;
  to: DisciplineId;
  flowLabel: { fr: string; en: string };
  description: { fr: string; en: string };
}

const NODES: DisciplineNode[] = [
  {
    id: 'conseil',
    code: '01',
    poleId: 'conseil',
    x: 410,
    y: 66,
    title: {
      fr: 'Conseil, AMOA & Design',
      en: 'Consulting, AMOA & Design',
    },
    poleLabel: {
      fr: 'Pôle Conseil & Formation',
      en: 'Consulting & Training Pole',
    },
    summary: {
      fr: 'Schémas directeurs, Network Design, pilotage PMO/AMOA et transfert de compétences OJT en amont et tout au long des déploiements.',
      en: 'Masterplans, Network Design, PMO/AMOA governance, and OJT knowledge transfer across the infrastructure lifecycle.',
    },
    deliverables: {
      fr: ['Network Design & Planning', 'AMOA & PMO', 'Formations & Testbed'],
      en: ['Network Design & Planning', 'AMOA & PMO', 'Training & Testbed'],
    },
  },
  {
    id: 'it',
    code: '02',
    poleId: 'services',
    x: 155,
    y: 170,
    title: {
      fr: 'IT, Réseaux IP & Sécurité SI',
      en: 'IT, IP Networks & Security',
    },
    poleLabel: {
      fr: 'Pôle Services',
      en: 'Services Pole',
    },
    summary: {
      fr: 'Cœur IP, routage haute disponibilité, cybersécurité SI, IT industriel (M2M) et contrats de Managed Services orientés réduction d’OPEX.',
      en: 'Core IP routing, high-availability switching, SI cybersecurity, industrial M2M IT, and OPEX-focused Managed Services.',
    },
    deliverables: {
      fr: ['Réseaux IP & Sécurité SI', 'Managed Services', 'IT Industriel M2M'],
      en: ['IP & SI Security', 'Managed Services', 'Industrial M2M IT'],
    },
  },
  {
    id: 'telecom',
    code: '03',
    poleId: 'services',
    x: 665,
    y: 170,
    title: {
      fr: 'Télécoms, Broadcast & VSAT',
      en: 'Telecoms, Broadcast & VSAT',
    },
    poleLabel: {
      fr: 'Pôle Services & Déploiement',
      en: 'Services & Roll-out Pole',
    },
    summary: {
      fr: 'Déploiement clés en main (FTK) de réseaux fixes et mobiles, faisceaux hertziens, pylônes, stations VSAT et plateformes Ericsson TV & Media.',
      en: 'Full-turnkey roll-out of fixed/wireless networks, microwave transmission, towers, VSAT ground stations, and Ericsson TV & Media.',
    },
    deliverables: {
      fr: ['FTK Network Roll-out', 'Transmission Filaire & FH', 'Broadcast & VSAT'],
      en: ['FTK Network Roll-out', 'Fixed & Wireless Links', 'Broadcast & VSAT'],
    },
  },
  {
    id: 'datacenter',
    code: '04',
    poleId: 'services',
    x: 410,
    y: 235,
    title: {
      fr: 'Data Center & Énergie Critique',
      en: 'Data Center & Critical Power',
    },
    poleLabel: {
      fr: 'Pôle Services & Infrastructure',
      en: 'Services & Infrastructure',
    },
    summary: {
      fr: 'Salles informatiques clés en main, courant faible, climatisation de précision, shelters techniques, systèmes solaires et groupes électrogènes GENELEC.',
      en: 'Turnkey Data Center facilities, low current systems, precision cooling, technical shelters, solar arrays, and GENELEC generators.',
    },
    deliverables: {
      fr: ['Data Centers Clés en Main', 'Climatisation de Précision', 'Énergie GENELEC & Solaire'],
      en: ['Turnkey Data Centers', 'Precision Cooling', 'GENELEC Power & Solar'],
    },
  },
  {
    id: 'surete',
    code: '05',
    poleId: 'surete',
    x: 155,
    y: 365,
    title: {
      fr: 'Sûreté Électronique',
      en: 'Electronic Security',
    },
    poleLabel: {
      fr: 'Pôle Sûreté Électronique',
      en: 'Electronic Security Pole',
    },
    summary: {
      fr: 'Protection électronique de sites sensibles, vidéosurveillance analytique, radars terrestres/côtiers, sonars et centres de commandement.',
      en: 'Critical site protection, IP video analytics, coastal/ground radars, maritime sonars, and command supervision centers.',
    },
    deliverables: {
      fr: ['Vidéosurveillance IP', 'Radars & Sonars', 'Centres de Supervision'],
      en: ['IP Video Surveillance', 'Radars & Sonars', 'Command Centers'],
    },
  },
  {
    id: 'qos',
    code: '06',
    poleId: 'qos',
    x: 665,
    y: 365,
    title: {
      fr: 'Qualité de Service (QoS) & Mesures',
      en: 'Quality of Service & T&M',
    },
    poleLabel: {
      fr: 'Pôle Qualité de Service',
      en: 'Quality of Service Pole',
    },
    summary: {
      fr: 'Audits réseaux fixes/mobiles/IP, campagnes Drive Test & Benchmarking, NPO, inspection QA/QC terrain et instrumentation Keysight Technologies.',
      en: 'Fixed/mobile/IP audits, Drive Test & benchmarking, NPO optimization, field QA/QC, and Keysight Technologies instrumentation.',
    },
    deliverables: {
      fr: ['Drive Test & Benchmarking', 'Site QA / QC & NPO', 'Mesures Keysight T&M'],
      en: ['Drive Test & Benchmarking', 'Site QA / QC & NPO', 'Keysight T&M Tools'],
    },
  },
];

const EDGES: DisciplineEdge[] = [
  {
    id: 'conseil-it',
    from: 'conseil',
    to: 'it',
    flowLabel: { fr: 'Architecture IP & Sécurité', en: 'IP & Security Blueprint' },
    description: {
      fr: 'Définition des schémas directeurs IT, spécifications de routage et politiques de sécurité SI.',
      en: 'Defines IT masterplans, routing architectures, and information security policies.',
    },
  },
  {
    id: 'conseil-telecom',
    from: 'conseil',
    to: 'telecom',
    flowLabel: { fr: 'Network Design & PMO', en: 'Network Design & PMO' },
    description: {
      fr: 'Dimensionnement radio/transmission, pilotage FTK et transfert de compétences OJT aux équipes d’exploitation.',
      en: 'Radio and transmission planning, FTK project governance, and OJT team handover.',
    },
  },
  {
    id: 'conseil-datacenter',
    from: 'conseil',
    to: 'datacenter',
    flowLabel: { fr: 'AMOA & Dimensionnement', en: 'AMOA & Capacity Sizing' },
    description: {
      fr: 'Ingénierie d’urbanisation Data Center, bilans thermiques, autonomie énergétique et conformité EHS.',
      en: 'Data Center layout engineering, cooling budgets, power autonomy sizing, and EHS compliance.',
    },
  },
  {
    id: 'it-datacenter',
    from: 'it',
    to: 'datacenter',
    flowLabel: { fr: 'Hébergement & Télégestion M2M', en: 'Core Hosting & M2M Telemetry' },
    description: {
      fr: 'Hébergement des cœurs de réseaux IP et supervision M2M en temps réel des équipements d’énergie et de refroidissement.',
      en: 'Hosts core IP workloads and links M2M telemetry across power and cooling infrastructure.',
    },
  },
  {
    id: 'telecom-datacenter',
    from: 'telecom',
    to: 'datacenter',
    flowLabel: { fr: 'Backbone Fibre & VSAT', en: 'Fiber & VSAT Backhaul' },
    description: {
      fr: 'Interconnexion des Data Centers via liaisons optiques redondées, faisceaux hertziens et liens satellitaires VSAT.',
      en: 'Interconnects Data Centers via redundant optical backhaul, microwave links, and VSAT uplinks.',
    },
  },
  {
    id: 'it-telecom',
    from: 'it',
    to: 'telecom',
    flowLabel: { fr: 'Convergence IP / Transport', en: 'IP / Transport Convergence' },
    description: {
      fr: 'Intégration bout en bout des couches IP/MPLS sur les infrastructures de transport télécoms et plateformes Broadcast.',
      en: 'End-to-end integration of IP/MPLS services across carrier transport and broadcast platforms.',
    },
  },
  {
    id: 'it-surete',
    from: 'it',
    to: 'surete',
    flowLabel: { fr: 'Flux Vidéo & Hypervision SOC', en: 'Secured Video & SOC Flows' },
    description: {
      fr: 'Transport sécurisé des flux vidéosurveillance HD, radars et sonars vers les centres de commandement.',
      en: 'Hardened IP transport carrying HD video analytics, radar, and sonar feeds into command centers.',
    },
  },
  {
    id: 'datacenter-surete',
    from: 'datacenter',
    to: 'surete',
    flowLabel: { fr: 'Énergie Secourue & Shelters', en: 'Backup Power & Shelters' },
    description: {
      fr: 'Alimentation continue (GENELEC, solaire) et protection physique des postes sensibles de sûreté périmétrique.',
      en: 'Continuous power (GENELEC, solar) and environmental shelters for perimeter security stations.',
    },
  },
  {
    id: 'telecom-qos',
    from: 'telecom',
    to: 'qos',
    flowLabel: { fr: 'Audits RF, Drive Test & QA/QC', en: 'RF Audits, Drive Test & QA/QC' },
    description: {
      fr: 'Contrôle qualité terrain avant réception des sites déployés et optimisation continue des performances radio/IP.',
      en: 'Field QA/QC site acceptance testing and ongoing radio/IP performance optimization (NPO).',
    },
  },
  {
    id: 'datacenter-qos',
    from: 'datacenter',
    to: 'qos',
    flowLabel: { fr: 'Tests Keysight & Conformité', en: 'Keysight Testing & QA' },
    description: {
      fr: 'Qualification des liaisons critiques, mesures optiques/RF Keysight et validation des niveaux de disponibilité.',
      en: 'Qualification of critical links with Keysight instrumentation and availability SLA verification.',
    },
  },
];

interface ServicesMapProps {
  language: Language;
  activePoleId: string;
  onSelectPole: (poleId: string) => void;
  onNavigate: (path: RoutePath) => void;
}

export const ServicesMap: React.FC<ServicesMapProps> = ({
  language,
  activePoleId,
  onSelectPole,
  onNavigate,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<DisciplineId>('datacenter');
  const [hoveredNodeId, setHoveredNodeId] = useState<DisciplineId | null>(null);
  const [preset, setPreset] = useState<ViewPreset>('all');

  const focusedNodeId = hoveredNodeId || selectedNodeId;

  const activeNode = useMemo(
    () => NODES.find((n) => n.id === selectedNodeId) || NODES[3],
    [selectedNodeId]
  );

  const connectedEdges = useMemo(
    () =>
      EDGES.filter(
        (e) => e.from === focusedNodeId || e.to === focusedNodeId
      ),
    [focusedNodeId]
  );

  const connectedNodeIds = useMemo(() => {
    const set = new Set<DisciplineId>([focusedNodeId]);
    connectedEdges.forEach((e) => {
      set.add(e.from);
      set.add(e.to);
    });
    return set;
  }, [focusedNodeId, connectedEdges]);

  const presetNodes = useMemo<Set<DisciplineId>>(() => {
    switch (preset) {
      case 'core':
        return new Set(['it', 'datacenter', 'telecom']);
      case 'field':
        return new Set(['telecom', 'qos', 'datacenter']);
      case 'governance':
        return new Set(['conseil', 'it', 'surete']);
      default:
        return new Set(['it', 'telecom', 'datacenter', 'surete', 'qos', 'conseil']);
    }
  }, [preset]);

  const selectedConnections = useMemo(
    () =>
      EDGES.filter(
        (e) => e.from === selectedNodeId || e.to === selectedNodeId
      ).map((edge) => {
        const peerId = edge.from === selectedNodeId ? edge.to : edge.from;
        const peer = NODES.find((n) => n.id === peerId)!;
        return { edge, peer };
      }),
    [selectedNodeId]
  );

  const presets: { id: ViewPreset; label: string }[] =
    language === 'fr'
      ? [
          { id: 'all', label: 'Architecture complète' },
          { id: 'core', label: 'IT, Télécoms & Data Center' },
          { id: 'field', label: 'Déploiement & QoS' },
          { id: 'governance', label: 'Conseil & Sûreté' },
        ]
      : [
          { id: 'all', label: 'Full Architecture' },
          { id: 'core', label: 'IT, Telecom & Data Center' },
          { id: 'field', label: 'Roll-out & QoS' },
          { id: 'governance', label: 'Advisory & Security' },
        ];

  const handleNodeSelect = (node: DisciplineNode) => {
    setSelectedNodeId(node.id);
    onSelectPole(node.poleId);
  };

  return (
    <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
      {/* Header & Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] mb-1">
            <Network className="w-4 h-4 shrink-0" />
            <span>
              {language === 'fr'
                ? 'Cartographie Interactive d’Ingénierie'
                : 'Interactive Engineering Topology'}
            </span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {language === 'fr'
              ? 'Comment nos disciplines IT, Télécoms & Data Center s’interconnectent'
              : 'How our IT, Telecom & Data Center disciplines connect'}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-900/90 rounded-lg shrink-0">
          {presets.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setPreset(item.id);
                if (item.id === 'core') setSelectedNodeId('datacenter');
                if (item.id === 'field') setSelectedNodeId('telecom');
                if (item.id === 'governance') setSelectedNodeId('conseil');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                preset === item.id
                  ? 'bg-white dark:bg-[#3769B3] text-[#3769B3] dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: SVG Canvas + Discipline Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Interactive SVG Services Map */}
        <div className="lg:col-span-8 bg-white dark:bg-[#070F1B] border border-slate-200 dark:border-slate-800 rounded-xl p-3 sm:p-4 flex flex-col justify-between">
          <svg
            viewBox="0 0 820 435"
            className="w-full h-auto select-none"
            role="img"
            aria-label={
              language === 'fr'
                ? 'Diagramme interactif des interconnexions entre IT, Télécoms, Data Center, Sûreté, QoS et Conseil'
                : 'Interactive diagram showing interconnections across IT, Telecoms, Data Center, Security, QoS, and Consulting'
            }
          >
            <defs>
              <pattern
                id="sem-grid"
                width="28"
                height="28"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 28 0 L 0 0 0 28"
                  fill="none"
                  className="stroke-slate-100 dark:stroke-slate-800/45"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            <rect width="820" height="435" rx="10" fill="url(#sem-grid)" />

            {/* Connection Paths */}
            {EDGES.map((edge) => {
              const source = NODES.find((n) => n.id === edge.from)!;
              const target = NODES.find((n) => n.id === edge.to)!;
              const isHighlighted =
                (edge.from === focusedNodeId || edge.to === focusedNodeId) &&
                presetNodes.has(edge.from) &&
                presetNodes.has(edge.to);
              const inPreset =
                presetNodes.has(edge.from) && presetNodes.has(edge.to);

              const midX = (source.x + target.x) / 2;
              const midY = (source.y + target.y) / 2;
              const dx = target.x - source.x;
              const dy = target.y - source.y;
              const curveOffset = Math.abs(dy) < 20 ? -26 : 0;
              const ctrlX = midX;
              const ctrlY = midY + curveOffset;
              const pathD = `M ${source.x} ${source.y} Q ${ctrlX} ${ctrlY} ${target.x} ${target.y}`;

              const labelX = midX + (dx === 0 ? 0 : 0);
              const labelY = midY + curveOffset * 0.55 - 4;

              return (
                <g key={edge.id}>
                  <path
                    d={pathD}
                    fill="none"
                    className={
                      isHighlighted
                        ? 'stroke-[#3769B3] dark:stroke-[#24A9E0] transition-all duration-200'
                        : inPreset
                          ? 'stroke-slate-300 dark:stroke-slate-700 transition-all duration-200'
                          : 'stroke-slate-200 dark:stroke-slate-800/40 transition-all duration-200'
                    }
                    strokeWidth={isHighlighted ? 2.6 : 1.4}
                    strokeDasharray={isHighlighted ? undefined : '4 4'}
                    opacity={isHighlighted ? 1 : inPreset ? 0.75 : 0.25}
                  />
                  {isHighlighted && (
                    <g transform={`translate(${labelX}, ${labelY})`}>
                      <rect
                        x="-76"
                        y="-11"
                        width="152"
                        height="20"
                        rx="4"
                        className="fill-white/95 dark:fill-[#0F1E34]/95 stroke-[#3769B3]/40 dark:stroke-[#24A9E0]/50"
                        strokeWidth="1"
                      />
                      <text
                        textAnchor="middle"
                        dominantBaseline="central"
                        y="-1"
                        className="fill-[#1E40AF] dark:fill-[#7DD3FC] text-[10px] font-semibold"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {edge.flowLabel[language]}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Discipline Nodes */}
            {NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              const isConnected = connectedNodeIds.has(node.id);
              const inPreset = presetNodes.has(node.id);
              const isHighlighted = isSelected || isConnected;
              const w = 212;
              const h = 68;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x - w / 2}, ${node.y - h / 2})`}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSelected}
                  aria-label={`${node.title[language]} — ${node.poleLabel[language]}`}
                  onClick={() => handleNodeSelect(node)}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleNodeSelect(node);
                    }
                  }}
                  className="cursor-pointer focus:outline-none"
                  opacity={inPreset ? (isHighlighted ? 1 : 0.72) : 0.28}
                >
                  <rect
                    width={w}
                    height={h}
                    rx="10"
                    className={
                      isSelected
                        ? 'fill-[#0B192C] dark:fill-[#3769B3] stroke-[#3769B3] dark:stroke-[#24A9E0]'
                        : isConnected
                          ? 'fill-white dark:fill-[#0F1E34] stroke-[#3769B3]/65 dark:stroke-[#24A9E0]/60'
                          : 'fill-white dark:fill-[#0F1E34] stroke-slate-200 dark:stroke-slate-700'
                    }
                    strokeWidth={isSelected ? 2.2 : 1.4}
                  />
                  <text
                    x="14"
                    y="22"
                    className={
                      isSelected
                        ? 'fill-[#24A9E0] dark:fill-sky-200 text-[10px] font-semibold'
                        : 'fill-[#3769B3] dark:fill-[#24A9E0] text-[10px] font-semibold'
                    }
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {node.code} · {node.poleLabel[language]}
                  </text>
                  <text
                    x="14"
                    y="45"
                    className={
                      isSelected
                        ? 'fill-white text-[13px] font-bold'
                        : 'fill-slate-900 dark:fill-slate-100 text-[13px] font-bold'
                    }
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {node.title[language]}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-2 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>
              {language === 'fr'
                ? 'Cliquez sur une discipline du schéma pour inspecter ses interconnexions.'
                : 'Select any node in the diagram to inspect its engineering interfaces.'}
            </span>
            <span className="font-mono tabular-nums">
              {selectedConnections.length}{' '}
              {language === 'fr' ? 'liaisons actives' : 'active links'}
            </span>
          </div>
        </div>

        {/* Right Discipline & Interconnection Inspector */}
        <div className="lg:col-span-4 bg-white dark:bg-[#070F1B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                {activeNode.code} · {activeNode.poleLabel[language]}
              </span>
            </div>

            <div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white leading-snug">
                {activeNode.title[language]}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {activeNode.summary[language]}
              </p>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {activeNode.deliverables[language].join(' · ')}
            </div>

            {/* Connected Nodes List */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {language === 'fr'
                  ? 'Interconnexions techniques directes'
                  : 'Direct engineering interfaces'}
              </div>
              <div className="space-y-2 max-h-[210px] overflow-y-auto pr-1">
                {selectedConnections.map(({ edge, peer }) => (
                  <button
                    key={edge.id}
                    type="button"
                    onClick={() => handleNodeSelect(peer)}
                    className="w-full text-left p-2.5 rounded-lg bg-[#F8FAFC] dark:bg-[#0F1E34] border border-slate-200 dark:border-slate-800 hover:border-[#3769B3] dark:hover:border-[#24A9E0] transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-900 dark:text-slate-100">
                      <span className="truncate">{peer.title[language]}</span>
                      <span className="text-[#3769B3] dark:text-[#24A9E0] shrink-0">
                        {edge.flowLabel[language]}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-snug">
                      {edge.description[language]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => onSelectPole(activeNode.poleId)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline"
            >
              <span>
                {activePoleId === activeNode.poleId
                  ? language === 'fr'
                    ? 'Pôle sélectionné ci-dessous'
                    : 'Unit active below'
                  : language === 'fr'
                    ? 'Afficher ce pôle'
                    : 'Focus this unit'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('/portefeuille')}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-[#3769B3] dark:hover:text-[#24A9E0] transition-colors"
            >
              {language === 'fr' ? 'Voir le portefeuille' : 'View portfolio'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
