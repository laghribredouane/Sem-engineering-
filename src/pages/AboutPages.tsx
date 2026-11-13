import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Users } from 'lucide-react';
import { IMAGES, SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';
import { PageHeader } from '../components/PageHeader';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { ResilientImage } from '../components/ResilientImage';
import { ServicesMap } from '../components/ServicesMap';

interface AboutSubPageProps {
  currentPath: RoutePath;
  language: Language;
  onNavigate: (path: RoutePath) => void;
  initialPoleId?: string;
}

const AboutSubNav: React.FC<{
  currentPath: RoutePath;
  language: Language;
  onNavigate: (path: RoutePath) => void;
}> = ({ currentPath, language, onNavigate }) => {
  const items = SEM_CONTENT[language].nav[1]?.children || [];
  return (
    <div className="bg-[#F8FAFC] dark:bg-[#070F1B] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-3 overflow-x-auto">
        <div className="flex items-center gap-2 min-w-max">
          {items.map((item) => {
            const active = currentPath === item.path;
            return (
              <button
                key={item.path}
                type="button"
                onClick={() => onNavigate(item.path)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-[#3769B3] text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/* 1. Mot du Directeur Général */
export const MotDGPage: React.FC<AboutSubPageProps> = ({
  currentPath,
  language,
  onNavigate,
}) => {
  const d = SEM_CONTENT[language].dgPage;
  const aboutLabel = language === 'fr' ? 'À propos' : 'About Us';

  return (
    <div>
      <ReadingProgressBar label={d.title} />
      <PageHeader
        title={d.title}
        subtitle={d.subtitle}
        breadcrumbs={[{ label: aboutLabel, path: '/histoire' }, { label: d.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <AboutSubNav currentPath={currentPath} language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-8 space-y-6">
            <blockquote className="font-display text-2xl sm:text-3xl font-bold text-[#3769B3] dark:text-[#24A9E0] tracking-tight text-balance">
              {d.motto}
            </blockquote>

            <div className="space-y-5 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {d.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-8 my-6">
              <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-4">
                {d.commitmentsTitle}
              </h2>
              <ul className="space-y-3">
                {d.commitments.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 dark:text-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-[#3769B3] dark:text-[#24A9E0] shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-5 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
              {d.closingParagraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800">
              <div className="font-display text-lg font-bold text-slate-900 dark:text-white">
                {d.signatureName}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {d.signatureTitle}
              </div>
            </div>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 aspect-[4/3]">
              <ResilientImage
                src={IMAGES.headquarters}
                alt="Direction Générale SEM"
                className="w-full h-full object-cover object-left"
              />
            </div>

            <div className="bg-[#0B192C] dark:bg-[#0F1E34] border border-transparent dark:border-slate-800 text-white rounded-xl p-6 space-y-4">
              <div className="font-display text-3xl font-bold tabular-nums">17</div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {language === 'fr'
                  ? 'Pays africains ayant bénéficié de projets d’ingénierie et de déploiement pilotés par SEM.'
                  : 'African countries where SEM has successfully delivered engineering and roll-out projects.'}
              </p>
              <button
                type="button"
                onClick={() => onNavigate('/nous-contacter')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#24A9E0] hover:text-white transition-colors"
              >
                <span>{SEM_CONTENT[language].contactCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

/* 2. Histoire */
export const HistoirePage: React.FC<AboutSubPageProps> = ({
  currentPath,
  language,
  onNavigate,
}) => {
  const h = SEM_CONTENT[language].historyPage;
  const aboutLabel = language === 'fr' ? 'À propos' : 'About Us';

  return (
    <div>
      <ReadingProgressBar label={h.title} />
      <PageHeader
        title={h.title}
        subtitle={h.subtitle}
        breadcrumbs={[{ label: aboutLabel, path: '/histoire' }, { label: h.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <AboutSubNav currentPath={currentPath} language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl mb-12">
            {h.intro}
          </p>

          <div className="divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
            {h.milestones.map((m, idx) => (
              <div
                key={`${m.year}-${idx}`}
                className="py-7 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start"
              >
                <div className="md:col-span-3 flex items-baseline gap-3">
                  <span className="font-display text-2xl sm:text-3xl font-bold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                    {m.year}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {m.category}
                  </span>
                </div>
                <div className="md:col-span-9">
                  <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {m.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* 3. Mission et Valeurs */
export const MissionValeursPage: React.FC<AboutSubPageProps> = ({
  currentPath,
  language,
  onNavigate,
}) => {
  const m = SEM_CONTENT[language].missionPage;
  const aboutLabel = language === 'fr' ? 'À propos' : 'About Us';

  return (
    <div>
      <ReadingProgressBar label={m.title} />
      <PageHeader
        title={m.title}
        subtitle={m.subtitle}
        breadcrumbs={[{ label: aboutLabel, path: '/histoire' }, { label: m.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <AboutSubNav currentPath={currentPath} language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {m.missionHeading}
              </h2>
              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                {m.missionText}
              </p>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {m.visionText}
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-[4/3]">
                <ResilientImage
                  src={IMAGES.services}
                  alt="Infrastructures télécoms et satellites SEM"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
              {m.valuesHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {m.values.map((val) => (
                <div
                  key={val.index}
                  className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-7 space-y-3"
                >
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                      {val.index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{val.subtitle}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {val.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* 4. Domaines d'Activités Stratégiques */
export const DomainesPage: React.FC<AboutSubPageProps> = ({
  currentPath,
  language,
  onNavigate,
  initialPoleId,
}) => {
  const p = SEM_CONTENT[language].polesPage;
  const aboutLabel = language === 'fr' ? 'À propos' : 'About Us';
  const [selectedPoleId, setSelectedPoleId] = useState<string>(
    initialPoleId || p.poles[0].id
  );

  useEffect(() => {
    if (initialPoleId) {
      setSelectedPoleId(initialPoleId);
    }
  }, [initialPoleId]);

  const activePole = p.poles.find((item) => item.id === selectedPoleId) || p.poles[0];

  return (
    <div>
      <ReadingProgressBar label={p.title} />
      <PageHeader
        title={p.title}
        subtitle={p.subtitle}
        breadcrumbs={[{ label: aboutLabel, path: '/histoire' }, { label: p.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <AboutSubNav currentPath={currentPath} language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {p.intro}
            </p>
            {/* Interactive Pole Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg shrink-0">
              {p.poles.map((pole) => (
                <button
                  key={pole.id}
                  type="button"
                  onClick={() => setSelectedPoleId(pole.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    selectedPoleId === pole.id
                      ? 'bg-white dark:bg-[#3769B3] text-[#3769B3] dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {pole.index}. {pole.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive SVG Services Map */}
          <ServicesMap
            language={language}
            activePoleId={selectedPoleId}
            onSelectPole={setSelectedPoleId}
            onNavigate={onNavigate}
          />

          {/* Focused Active Pole Showcase */}
          <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 h-64 lg:h-auto min-h-[300px] bg-slate-200 dark:bg-slate-900">
              <ResilientImage
                src={activePole.image}
                alt={activePole.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="font-mono font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                    {activePole.index}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{activePole.deliverables.join(' · ')}</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {activePole.title}
                </h2>
                <p className="mt-4 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  {activePole.fullDesc}
                </p>

                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    {language === 'fr' ? 'Prestations & Savoir-faire clés' : 'Key Capabilities & Services'}
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePole.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('/nous-contacter')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors"
                >
                  <span>{language === 'fr' ? 'Discuter de ce pôle' : 'Discuss this unit'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/portefeuille')}
                  className="text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline"
                >
                  {SEM_CONTENT[language].portfolioPage.title}
                </button>
              </div>
            </div>
          </div>

          {/* All 4 Poles Complete Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {p.poles.map((pole) => (
              <div
                key={pole.id}
                onClick={() => setSelectedPoleId(pole.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedPoleId(pole.id);
                  }
                }}
                className={`p-6 rounded-xl border transition-colors cursor-pointer ${
                  selectedPoleId === pole.id
                    ? 'bg-white dark:bg-[#0B192C] border-[#3769B3] dark:border-[#24A9E0]'
                    : 'bg-white dark:bg-[#0B192C] border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-4 mb-2">
                  <span className="font-mono text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                    {pole.index}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {pole.capabilities.length} {language === 'fr' ? 'expertises' : 'capabilities'}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {pole.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pole.shortDesc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

/* 5. Organisation */
export const OrganisationPage: React.FC<AboutSubPageProps> = ({
  currentPath,
  language,
  onNavigate,
}) => {
  const o = SEM_CONTENT[language].orgPage;
  const aboutLabel = language === 'fr' ? 'À propos' : 'About Us';
  const [selectedDept, setSelectedDept] = useState<string>(o.departments[3].id);

  const activeDept = o.departments.find((d) => d.id === selectedDept) || o.departments[0];

  return (
    <div>
      <ReadingProgressBar label={o.title} />
      <PageHeader
        title={o.title}
        subtitle={o.subtitle}
        breadcrumbs={[{ label: aboutLabel, path: '/histoire' }, { label: o.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <AboutSubNav currentPath={currentPath} language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {o.intro}
          </p>

          {/* Interactive Org Chart Architecture */}
          <div className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-10 space-y-8">
            {/* Root Node: Direction Générale */}
            <div className="flex justify-center">
              <div className="bg-[#0B192C] dark:bg-[#0F1E34] border border-transparent dark:border-slate-700 text-white px-8 py-4 rounded-xl text-center min-w-[260px]">
                <div className="text-xs font-medium text-[#24A9E0]">SEM</div>
                <div className="font-display text-base font-bold mt-0.5">
                  {o.directorTitle}
                </div>
              </div>
            </div>

            {/* Connector Line (Desktop) */}
            <div className="hidden lg:block h-px bg-slate-300 dark:bg-slate-700 mx-10" />

            {/* 5 Executive Divisions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {o.departments.map((dept) => {
                const active = selectedDept === dept.id;
                return (
                  <button
                    key={dept.id}
                    type="button"
                    onClick={() => setSelectedDept(dept.id)}
                    className={`text-left p-5 rounded-xl border transition-all duration-150 ${
                      active
                        ? 'bg-[#3769B3] text-white border-[#3769B3]'
                        : 'bg-white dark:bg-[#070F1B] text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-800 hover:border-[#3769B3]/60 dark:hover:border-[#24A9E0]/60'
                    }`}
                  >
                    <div
                      className={`text-xs font-medium mb-1 ${
                        active ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {dept.role}
                    </div>
                    <div className="font-display text-base font-bold leading-snug">
                      {dept.name}
                    </div>
                    <div className="mt-4 pt-3 border-t border-current/15 space-y-1.5">
                      {dept.units.map((u) => (
                        <div
                          key={u}
                          className={`text-xs ${
                            active ? 'text-white/95' : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          {u}
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Division Detail Strip */}
            <div className="bg-white dark:bg-[#070F1B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#3769B3] dark:text-[#24A9E0] shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {activeDept.name} — {activeDept.role}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    {activeDept.units.join(' · ')}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('/candidature')}
                className="text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline whitespace-nowrap shrink-0"
              >
                {language === 'fr' ? 'Rejoindre nos équipes' : 'Join our teams'}
              </button>
            </div>
          </div>

          {/* Our Team / Notre Équipe Section */}
          <div className="space-y-8 pt-6">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold tracking-wide text-[#3769B3] dark:text-[#24A9E0] mb-2 uppercase">
                {language === 'fr' ? 'Gouvernance & Leadership Technique' : 'Governance & Technical Leadership'}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {language === 'fr' ? 'Notre Équipe de Direction & Experts' : 'Our Leadership & Engineering Team'}
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'fr'
                  ? 'Une équipe pluridisciplinaire d’ingénieurs, de directeurs de projets et d’experts sectoriels engagés pour la réussite de vos infrastructures critiques.'
                  : 'A multidisciplinary team of engineers, project directors, and sector experts dedicated to the success of your critical infrastructures.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  name: 'Youssef El Malali',
                  roleFr: 'Directeur Général & Fondateur',
                  roleEn: 'General Manager & Founder',
                  bioFr: 'Fondateur de SEM en 2008, pilote la vision stratégique et l’expansion des activités à l’international et en Afrique.',
                  bioEn: 'Founded SEM in 2008, driving strategic vision and international expansion across 17 African nations.',
                  initials: 'YEM',
                },
                {
                  name: 'Équipe Pôle Services IT & Télécoms',
                  roleFr: 'Direction des Opérations & Déploiements FTK',
                  roleEn: 'Operations & FTK Rollout Director',
                  bioFr: 'Pilotage des grands projets d’infrastructure, réseaux de transmission hertzienne/optique et intégration Data Centers.',
                  bioEn: 'Leading turnkey infrastructure projects, optical & wireless transmission backbones, and Data Center integration.',
                  initials: 'PS',
                },
                {
                  name: 'Équipe Pôle Conseil & AMOA',
                  roleFr: 'Direction du Conseil & Ingénierie Système',
                  roleEn: 'Consulting & Systems Engineering Lead',
                  bioFr: 'Accompagnement des opérateurs et administrations dans la conception, la planification réseau et l’assistance à maîtrise d’ouvrage.',
                  bioEn: 'Guiding operators and public administrations in network design, spectrum planning, and project management oversight.',
                  initials: 'PC',
                },
                {
                  name: 'Équipe Pôle Sûreté Électronique',
                  roleFr: 'Ingénierie des Systèmes de Sécurité Critique',
                  roleEn: 'Critical Security Systems Engineering',
                  bioFr: 'Conception et déploiement de solutions de vidéosurveillance intelligente, radars côtiers et centres de commandement unifiés.',
                  bioEn: 'Designing intelligent video surveillance, coastal radars, and unified command and control centers.',
                  initials: 'SE',
                },
                {
                  name: 'Équipe Pôle Qualité de Service (QoS)',
                  roleFr: 'Audit, Benchmarking & Mesure Radio',
                  roleEn: 'QoS Audit, Benchmarking & RF Testing',
                  bioFr: 'Audits de performance mobile, campagnes Drive Test nationales et distribution exclusive des instruments Keysight.',
                  bioEn: 'Mobile network performance audits, national Drive Test campaigns, and exclusive Keysight instrument distribution.',
                  initials: 'QoS',
                },
                {
                  name: 'Équipe Qualité, EHS & Conformité',
                  roleFr: 'Contrôle Qualité & Management EHS',
                  roleEn: 'Quality Control & EHS Governance',
                  bioFr: 'Garantie du respect des normes ISO 9001 et OHSAS 18001 sur l’ensemble des chantiers et sites opérationnels de SEM.',
                  bioEn: 'Ensuring rigorous ISO 9001 and OHSAS 18001 compliance across all SEM field execution sites.',
                  initials: 'QE',
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 hover:border-[#3769B3] dark:hover:border-[#24A9E0] transition-all duration-200 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#3769B3] text-white font-display font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                        {member.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="font-display text-base font-bold text-slate-900 dark:text-white truncate">
                          {member.name}
                        </div>
                        <div className="text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] truncate">
                          {language === 'fr' ? member.roleFr : member.roleEn}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {language === 'fr' ? member.bioFr : member.bioEn}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-200/70 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <span className="font-mono">SEM — Mohammedia</span>
                    <button
                      type="button"
                      onClick={() => onNavigate('/nous-contacter')}
                      className="font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline"
                    >
                      {language === 'fr' ? 'Contacter' : 'Contact'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/* 6. Certifications */
export const CertificationsPage: React.FC<AboutSubPageProps> = ({
  currentPath,
  language,
  onNavigate,
}) => {
  const c = SEM_CONTENT[language].certPage;
  const aboutLabel = language === 'fr' ? 'À propos' : 'About Us';

  return (
    <div>
      <ReadingProgressBar label={c.title} />
      <PageHeader
        title={c.title}
        subtitle={c.subtitle}
        breadcrumbs={[{ label: aboutLabel, path: '/histoire' }, { label: c.title }]}
        language={language}
        onNavigate={onNavigate}
      />
      <AboutSubNav currentPath={currentPath} language={language} onNavigate={onNavigate} />

      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-14">
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {c.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c.programs.map((prog) => (
              <div
                key={prog.code}
                className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-8 space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-2xl font-bold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                    {prog.code}
                  </span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {prog.status}
                  </span>
                </div>
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {prog.name}
                </h2>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {prog.scope}
                </div>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-200 dark:border-slate-800">
                  {prog.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {c.pillarsTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.pillars.map((pil) => (
                <div
                  key={pil.title}
                  className="bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-6"
                >
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {pil.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {pil.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
