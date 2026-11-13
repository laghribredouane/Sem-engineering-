import React, { useMemo, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Language, RoutePath } from '../types/sem';

interface ContactFaqAccordionProps {
  language: Language;
  onNavigate: (path: RoutePath) => void;
  onSelectDepartment?: (departmentIndex: number, subjectHint: string) => void;
}

type FaqCategory = 'all' | 'services' | 'sla' | 'onboarding';

interface FaqItem {
  id: string;
  category: Exclude<FaqCategory, 'all'>;
  categoryLabel: string;
  question: string;
  answer: string;
  actionLabel?: string;
  actionPath?: RoutePath;
  prefillDeptIndex?: number;
  prefillSubject?: string;
}

const FAQ_COPY: Record<
  Language,
  {
    eyebrow: string;
    heading: string;
    subheading: string;
    filters: { id: FaqCategory; label: string }[];
    items: FaqItem[];
    bottomPrompt: string;
    bottomCta: string;
  }
> = {
  fr: {
    eyebrow: 'Questions fréquentes',
    heading: 'Réponses rapides avant d’ouvrir une demande',
    subheading:
      'Consultez les précisions sur nos domaines d’intervention, nos délais de prise en charge et le déroulement d’un démarrage de projet avec SEM.',
    filters: [
      { id: 'all', label: 'Tous les sujets' },
      { id: 'services', label: 'Services & Pôles' },
      { id: 'sla', label: 'Délais & SLA' },
      { id: 'onboarding', label: 'Démarrage projet' },
    ],
    items: [
      {
        id: 'faq-services-scope',
        category: 'services',
        categoryLabel: 'Services & Ingénierie',
        question: 'Quels domaines techniques SEM couvre-t-elle en intégration clés en main ?',
        answer:
          'SEM intervient sur quatre pôles complémentaires : Services (réseaux IP & Télécoms, Data Centers, Broadcast & VSAT, sécurité SI, Managed Services et IT industriel), Conseil & Formation (AMOA, PMO, Network Design, transfert OJT), Sûreté Électronique (vidéosurveillance HD, radars, sonars) et Qualité de Service (audits, Drive Test, Benchmarking, QA/QC).',
        actionLabel: 'Explorer nos 4 pôles d’activités',
        actionPath: '/domaines-d-activites',
      },
      {
        id: 'faq-response-times',
        category: 'sla',
        categoryLabel: 'Délais de réponse',
        question: 'Quels sont vos délais de réponse pour une demande commerciale ou technique ?',
        answer:
          'Nos bureaux sont ouverts du lundi au vendredi de 08:30 à 17:00. Toute demande transmise via le formulaire est orientée immédiatement vers la direction concernée : les demandes commerciales reçoivent un accusé de prise en charge sous 24 heures ouvrées, et un premier échange de cadrage technique avec un ingénieur solution est planifié sous 48 heures.',
      },
      {
        id: 'faq-project-onboarding',
        category: 'onboarding',
        categoryLabel: 'Démarrage projet',
        question: 'Comment se déroule l’onboarding lors du lancement d’un nouveau projet ?',
        answer:
          'Chaque projet démarre par une phase de cadrage des exigences avec notre équipe Avant-Vente & Solution Engineering, suivie d’une réunion de lancement (Kick-off). SEM active ensuite une Customer Team dédiée (Account Manager, Project Manager, Resource Coordinator et Contrôleur Qualité & EHS) garantissant la gouvernance PMO, le contrôle QA/QC terrain et le transfert de compétences OJT.',
        actionLabel: 'Découvrir notre organisation projet',
        actionPath: '/organisation',
      },
      {
        id: 'faq-oem-quotes',
        category: 'services',
        categoryLabel: 'Distribution OEM & T&M',
        question: 'Comment demander un devis pour les équipements Keysight, Ericsson TV & Media ou GENELEC ?',
        answer:
          'En tant que distributeur exclusif et partenaire agréé, nous traitons directement les demandes de cotation, de configuration et de support technique. Sélectionnez la direction « Commerciale » dans le formulaire ci-dessus en précisant les références ou le besoin applicatif afin d’obtenir une offre chiffrée et les délais logistiques.',
        actionLabel: 'Pré-remplir pour un devis OEM',
        prefillDeptIndex: 0,
        prefillSubject: 'Demande de cotation équipements OEM / Test & Mesure',
      },
      {
        id: 'faq-africa-footprint',
        category: 'onboarding',
        categoryLabel: 'Maroc & International',
        question: 'SEM réalise-t-elle des projets d’infrastructures hors du Maroc ?',
        answer:
          'Oui. Depuis notre siège industriel de Mohammedia, nous accompagnons des opérateurs, régulateurs, administrations et groupes bancaires au Maroc ainsi que dans 17 pays d’Afrique dans le cadre de la coopération Sud-Sud, incluant le déploiement FTK sur site et la formation sur place.',
      },
      {
        id: 'faq-managed-sla',
        category: 'sla',
        categoryLabel: 'Exploitation & SLA',
        question: 'Proposez-vous des contrats Managed Services avec engagements de disponibilité (SLA) ?',
        answer:
          'Oui. Nos contrats d’infogerance et de Managed Services sont structurés sur mesure pour réduire vos OPEX tout en sécurisant vos délais d’intervention (GTI / GTR), le suivi qualité ISO 9001 et la prévention des risques EHS alignée sur OHSAS 18001.',
        actionLabel: 'Pré-remplir une demande Managed Services',
        prefillDeptIndex: 1,
        prefillSubject: 'Cadrage contrat Managed Services & SLA',
      },
    ],
    bottomPrompt: 'Vous n’avez pas trouvé la réponse à votre question technique ou contractuelle ?',
    bottomCta: 'Contacter directement nos équipes',
  },
  en: {
    eyebrow: 'Frequently Asked Questions',
    heading: 'Quick answers before submitting an inquiry',
    subheading:
      'Review key details on our engineering scopes, standard response times, and how SEM structures project onboarding from kick-off to handover.',
    filters: [
      { id: 'all', label: 'All Topics' },
      { id: 'services', label: 'Services & Units' },
      { id: 'sla', label: 'Response Times & SLAs' },
      { id: 'onboarding', label: 'Project Onboarding' },
    ],
    items: [
      {
        id: 'faq-services-scope',
        category: 'services',
        categoryLabel: 'Services & Engineering',
        question: 'Which engineering domains does SEM deliver on a turnkey basis?',
        answer:
          'SEM operates across four complementary business units: Services (IP & Telecom networks, Data Centers, Broadcast & VSAT, IT Security, Managed Services, and Industrial IT), Consulting & Training (AMOA, PMO, Network Design, OJT transfer), Electronic Security (HD video surveillance, coastal radars, sonars), and Quality of Service (audits, Drive Test, Benchmarking, Site QA/QC).',
        actionLabel: 'Explore our 4 Business Units',
        actionPath: '/domaines-d-activites',
      },
      {
        id: 'faq-response-times',
        category: 'sla',
        categoryLabel: 'Response Times',
        question: 'What are your standard response times for commercial and technical inquiries?',
        answer:
          'Our offices operate Monday through Friday from 08:30 to 17:00. Every inquiry submitted through this form is routed immediately to the relevant department: commercial inquiries receive confirmation within 1 business day, and an initial technical scoping call with a Solution Engineer is scheduled within 48 business hours.',
      },
      {
        id: 'faq-project-onboarding',
        category: 'onboarding',
        categoryLabel: 'Project Onboarding',
        question: 'How does project onboarding work once a contract or RFP is awarded?',
        answer:
          'Onboarding begins with a technical scoping review led by Solution Engineering, followed by an official Kick-off meeting. SEM then assigns a dedicated projectized Customer Team (Account Manager, Project Manager, Resource Coordinator, and Quality & EHS Controller) ensuring PMO governance, field QA/QC inspections, and structured OJT knowledge transfer.',
        actionLabel: 'See our project organization',
        actionPath: '/organisation',
      },
      {
        id: 'faq-oem-quotes',
        category: 'services',
        categoryLabel: 'OEM Distribution & T&M',
        question: 'How can we request pricing for Keysight, Ericsson TV & Media, or GENELEC systems?',
        answer:
          'As an exclusive distributor and authorized OEM partner, we handle quotations, sizing, and after-sales support directly. Select the Commercial / Sales department in the inquiry form above and share part numbers or technical specifications for an official quote and delivery schedule.',
        actionLabel: 'Prefill OEM quotation inquiry',
        prefillDeptIndex: 0,
        prefillSubject: 'OEM / Test & Measurement Equipment Quotation Request',
      },
      {
        id: 'faq-africa-footprint',
        category: 'onboarding',
        categoryLabel: 'Morocco & International',
        question: 'Does SEM deliver infrastructure projects outside Morocco?',
        answer:
          'Yes. From our industrial headquarters in Mohammedia, SEM supports telecom operators, regulators, public administrations, and financial institutions across Morocco and 17 African countries through active South-South cooperation, including full turnkey (FTK) deployment and on-site training.',
      },
      {
        id: 'faq-managed-sla',
        category: 'sla',
        categoryLabel: 'Operations & SLAs',
        question: 'Do you offer Managed Services agreements with formal uptime SLAs?',
        answer:
          'Yes. Our Managed Services agreements are tailored to reduce operating expenditure (OPEX) while guaranteeing response and resolution SLAs, backed by ISO 9001 quality tracking and EHS controls aligned with OHSAS 18001.',
        actionLabel: 'Prefill Managed Services inquiry',
        prefillDeptIndex: 1,
        prefillSubject: 'Managed Services & SLA Scoping Inquiry',
      },
    ],
    bottomPrompt: 'Didn’t find the exact technical or commercial answer you need?',
    bottomCta: 'Jump to the direct inquiry form',
  },
};

export const ContactFaqAccordion: React.FC<ContactFaqAccordionProps> = ({
  language,
  onNavigate,
  onSelectDepartment,
}) => {
  const copy = FAQ_COPY[language];
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all');
  const [openId, setOpenId] = useState<string | null>(copy.items[0]?.id ?? null);

  const visibleItems = useMemo(() => {
    if (activeCategory === 'all') return copy.items;
    return copy.items.filter((item) => item.category === activeCategory);
  }, [activeCategory, copy.items]);

  const handleFilterChange = (category: FaqCategory) => {
    setActiveCategory(category);
    const nextList =
      category === 'all'
        ? copy.items
        : copy.items.filter((item) => item.category === category);
    if (!nextList.some((item) => item.id === openId)) {
      setOpenId(nextList[0]?.id ?? null);
    }
  };

  const scrollToContactForm = () => {
    const formEl = document.getElementById('contact-inquiry-form');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      aria-labelledby="contact-faq-heading"
      className="py-14 lg:py-20 bg-[#F8FAFC] dark:bg-[#0B192C]/55 border-t border-slate-200 dark:border-slate-800 transition-colors duration-200"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2.5">
            <div className="text-xs font-semibold tracking-wide text-[#3769B3] dark:text-[#24A9E0]">
              {copy.eyebrow}
            </div>
            <h2
              id="contact-faq-heading"
              className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight text-balance"
            >
              {copy.heading}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {copy.subheading}
            </p>
          </div>

          {/* Interactive Category Filter Buttons */}
          <div
            role="tablist"
            aria-label={language === 'fr' ? 'Filtrer les questions fréquentes' : 'Filter FAQ topics'}
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-white dark:bg-[#070F1B] border border-slate-200 dark:border-slate-800 rounded-lg self-start lg:self-auto"
          >
            {copy.filters.map((filter) => {
              const active = activeCategory === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleFilterChange(filter.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#3769B3] text-white'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion Stack */}
        <div className="space-y-3">
          {visibleItems.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;

            return (
              <div
                key={item.id}
                className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl transition-colors duration-150"
              >
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full px-6 py-5 text-left flex items-start justify-between gap-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3769B3] rounded-xl"
                >
                  <div className="space-y-1.5 pr-2">
                    <div className="text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0]">
                      {item.categoryLabel}
                    </div>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                      {item.question}
                    </h3>
                  </div>
                  <span
                    className={`mt-1 w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 inline-flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-300 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#3769B3] dark:text-[#24A9E0]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" aria-hidden="true" />
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 pt-1 border-t border-slate-100 dark:border-slate-800/90 space-y-4"
                  >
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl pt-3">
                      {item.answer}
                    </p>

                    {item.actionLabel && (
                      <div>
                        <button
                          type="button"
                          onClick={() => {
                            if (item.actionPath) {
                              onNavigate(item.actionPath);
                            } else if (
                              typeof item.prefillDeptIndex === 'number' &&
                              item.prefillSubject &&
                              onSelectDepartment
                            ) {
                              onSelectDepartment(item.prefillDeptIndex, item.prefillSubject);
                              scrollToContactForm();
                            }
                          }}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline"
                        >
                          <span>{item.actionLabel}</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Escalation Strip */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-300">{copy.bottomPrompt}</p>
          <button
            type="button"
            onClick={scrollToContactForm}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>{copy.bottomCta}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
};
