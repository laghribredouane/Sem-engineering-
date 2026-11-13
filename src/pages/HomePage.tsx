import React from 'react';
import { ArrowRight, Globe2, ShieldCheck } from 'lucide-react';
import { CLIENT_LOGOS, IMAGES, PARTNER_LOGOS, SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';
import { KeyFigures } from '../components/KeyFigures';
import { NewsletterSection } from '../components/NewsletterSection';
import { ResilientImage } from '../components/ResilientImage';
import { SocialFeedSection } from '../components/SocialFeedSection';

interface HomePageProps {
  language: Language;
  onNavigate: (path: RoutePath, poleFocus?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ language, onNavigate }) => {
  const dict = SEM_CONTENT[language];
  const h = dict.home;
  const poles = dict.polesPage.poles;

  const featuredPartners = PARTNER_LOGOS.slice(0, 6);
  const featuredClients = CLIENT_LOGOS.slice(0, 6);

  return (
    <div>
      {/* Hero Split Section */}
      <section className="bg-white dark:bg-[#0B192C] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 pb-12 lg:pt-14 lg:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Copy Column */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#3769B3] dark:text-[#24A9E0] mb-4">
                  {h.eyebrow}
                </p>
                <h1
                  className="font-display font-bold tracking-tight text-slate-900 dark:text-white text-balance leading-[1.08]"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)' }}
                >
                  {h.headline}
                </h1>
                <p className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                  {h.subheadline}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('/domaines-d-activites')}
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3769B3]"
                >
                  <span>{h.primaryCta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('/mot-du-directeur-general')}
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-[#3769B3] dark:hover:text-[#24A9E0] bg-slate-50 dark:bg-[#0F1E34] hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>{h.secondaryCta}</span>
                </button>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-6">
              <div className="relative h-64 sm:h-80 lg:h-full min-h-[340px] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900">
                <ResilientImage
                  src={IMAGES.hero}
                  alt="Data Center et infrastructures réseaux critiques déployés par SEM"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <div className="text-xs font-medium text-slate-200 mb-1">
                      {language === 'fr' ? 'Devise SEM' : 'SEM Motto'}
                    </div>
                    <div className="font-display text-base sm:text-lg font-bold tracking-tight">
                      {language === 'fr'
                        ? '« Your challenge is our progress », telle est notre devise !'
                        : '“Your challenge is our progress” is our motto!'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('/mot-du-directeur-general')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>{language === 'fr' ? 'Mot du DG' : 'GM Note'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Key Figures with Viewport Animated Counters */}
          <div className="mt-12">
            <KeyFigures language={language} />
          </div>
        </div>
      </section>

      {/* Client Segments Section */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC] dark:bg-[#070F1B] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
              {h.segmentsHeading}
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {h.segmentsSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden">
            {h.segments.map((seg) => (
              <div
                key={seg.index}
                className="bg-white dark:bg-[#0B192C] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums mb-3">
                    {seg.index}
                  </div>
                  <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white leading-snug">
                    {seg.title}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {seg.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Strategic Business Units — Asymmetric Bento Grid */}
      <section className="py-16 lg:py-24 bg-white dark:bg-[#0B192C] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                {h.polesHeading}
              </h2>
              <p className="mt-3 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {h.polesSubheading}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/portefeuille')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:text-[#2B5492] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>{dict.portfolioPage.title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Marquee Pole 01: Services (col-span-7) */}
            <article className="lg:col-span-7 bg-[#F8FAFC] dark:bg-[#070F1B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden flex flex-col">
              <div className="h-56 sm:h-64 overflow-hidden bg-slate-200 dark:bg-slate-900">
                <ResilientImage
                  src={poles[0].image}
                  alt={poles[0].imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-mono font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                      {poles[0].index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{poles[0].deliverables.slice(0, 3).join(' · ')}</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {poles[0].title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {poles[0].fullDesc}
                  </p>
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-700 dark:text-slate-300">
                    {poles[0].capabilities.slice(0, 6).map((cap) => (
                      <li key={cap} className="leading-snug">
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => onNavigate('/domaines-d-activites', poles[0].id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:text-[#2B5492] dark:hover:text-white transition-colors"
                  >
                    <span>{h.polesCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>

            {/* Right Column Stack: Pole 02 (Conseil) + Pole 03 (Sûreté) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Pole 02 */}
              <article className="bg-white dark:bg-[#0F1E34] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-mono font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                      {poles[1].index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>AMOA · PMO · OJT</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {poles[1].title}
                  </h3>
                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {poles[1].fullDesc}
                  </p>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => onNavigate('/domaines-d-activites', poles[1].id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:text-[#2B5492] dark:hover:text-white transition-colors"
                  >
                    <span>{h.polesCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>

              {/* Pole 03 */}
              <article className="bg-[#0B192C] dark:bg-[#070F1B] border border-transparent dark:border-slate-800 text-white rounded-xl overflow-hidden flex-1 flex flex-col justify-between">
                <div className="h-40 overflow-hidden bg-slate-800">
                  <ResilientImage
                    src={poles[2].image}
                    alt={poles[2].imageAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-300 mb-2">
                    <span className="font-mono font-semibold text-[#24A9E0] tabular-nums">
                      {poles[2].index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>VS · Radars · Sonars</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {poles[2].title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                    {poles[2].shortDesc}
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('/domaines-d-activites', poles[2].id)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#24A9E0] hover:text-white transition-colors"
                  >
                    <span>{h.polesCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </div>

            {/* Full-Width Bottom Row: Pole 04 QoS */}
            <article className="lg:col-span-12 bg-[#F8FAFC] dark:bg-[#070F1B] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-5 h-56 lg:h-auto min-h-[240px] bg-slate-200 dark:bg-slate-900">
                <ResilientImage
                  src={poles[3].image}
                  alt={poles[3].imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="font-mono font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                      {poles[3].index}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Drive Test · Benchmarking · Keysight T&M · Site QA/QC</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {poles[3].title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {poles[3].fullDesc}
                  </p>
                </div>
                <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {poles[3].deliverables.join(' / ')}
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigate('/domaines-d-activites', poles[3].id)}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:text-[#2B5492] dark:hover:text-white transition-colors whitespace-nowrap"
                  >
                    <span>{h.polesCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Diversification, OPEX Mastery & 17-Country African Footprint */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC] dark:bg-[#070F1B] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 bg-white dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] mb-3">
                <ShieldCheck className="w-4 h-4" />
                <span>{language === 'fr' ? 'Positionnement Différenciateur' : 'Strategic Positioning'}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white text-balance">
                {h.diversificationTitle}
              </h2>
              <p className="mt-4 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {h.diversificationBody}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-6 text-sm">
              <button
                type="button"
                onClick={() => onNavigate('/histoire')}
                className="font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline"
              >
                {language === 'fr' ? 'Découvrir notre histoire' : 'Explore our history'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/organisation')}
                className="font-semibold text-slate-700 dark:text-slate-300 hover:text-[#3769B3] dark:hover:text-[#24A9E0]"
              >
                {language === 'fr' ? 'Voir notre organisation' : 'View our organization'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/certifications')}
                className="font-semibold text-slate-700 dark:text-slate-300 hover:text-[#3769B3] dark:hover:text-[#24A9E0]"
              >
                {language === 'fr' ? 'Standards Qualité & EHS' : 'Quality & EHS Standards'}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#0B192C] dark:bg-[#0F1E34] border border-transparent dark:border-slate-800 text-white rounded-xl p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#24A9E0] mb-3">
                <Globe2 className="w-4 h-4" />
                <span>{language === 'fr' ? 'Coopération Sud-Sud' : 'South-South Cooperation'}</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-white text-balance">
                {h.africaHighlightTitle}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                {h.africaHighlightBody}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 gap-4">
              <div>
                <div className="font-display text-2xl font-bold text-white tabular-nums">17</div>
                <div className="text-xs text-slate-400">
                  {language === 'fr' ? 'Pays africains livrés' : 'African countries delivered'}
                </div>
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[#24A9E0] tabular-nums">FTK</div>
                <div className="text-xs text-slate-400">
                  {language === 'fr' ? 'Projets clés en main' : 'Full turnkey execution'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message du Directeur Général Highlight */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#0B192C] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-900">
                <ResilientImage
                  src={IMAGES.headquarters}
                  alt="Siège et direction SEM à Mohammedia"
                  className="w-full h-full object-cover object-left"
                />
              </div>
            </div>
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0]">
                {h.dgSectionLabel}
              </div>
              <blockquote className="font-display text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white leading-snug text-balance">
                {h.dgQuote}
              </blockquote>
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {h.dgName}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {h.dgRole}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('/mot-du-directeur-general')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:text-[#2B5492] dark:hover:text-white transition-colors"
                >
                  <span>{h.dgReadMore}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners & Clients Ecosystem Preview */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC] dark:bg-[#070F1B] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                {h.ecosystemHeading}
              </h2>
              <p className="mt-2.5 text-base text-slate-600 dark:text-slate-300">
                {h.ecosystemSubheading}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/partenaires')}
                className="text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline whitespace-nowrap"
              >
                {h.viewPartners}
              </button>
              <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">/</span>
              <button
                type="button"
                onClick={() => onNavigate('/clients')}
                className="text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:underline whitespace-nowrap"
              >
                {h.viewClients}
              </button>
            </div>
          </div>

          {/* Curated 6-Partner + 6-Client Grid */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredPartners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white dark:bg-white/95 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-20 flex items-center justify-center"
                >
                  <ResilientImage
                    src={partner.src}
                    alt={partner.name}
                    objectFit="contain"
                    className="max-h-11 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredClients.map((client) => (
                <div
                  key={client.id}
                  className="bg-white dark:bg-white/95 border border-slate-200 dark:border-slate-700 rounded-lg p-4 h-20 flex items-center justify-center"
                >
                  <ResilientImage
                    src={client.src}
                    alt={client.name}
                    objectFit="contain"
                    className="max-h-11 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#0B192C] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white text-balance">
                {h.testimonialsHeading}
              </h2>
              <p className="mt-2.5 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {h.testimonialsSubheading}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('/clients')}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3769B3] dark:text-[#24A9E0] hover:text-[#2B5492] dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>{h.viewClients}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {h.testimonials.map((t) => (
              <article
                key={t.id}
                className="bg-[#F8FAFC] dark:bg-[#070F1B] border border-slate-200 dark:border-slate-800 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
                    <div className="bg-white dark:bg-white/95 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 h-12 flex items-center justify-center">
                      <ResilientImage
                        src={t.logoSrc}
                        alt={t.logoAlt}
                        objectFit="contain"
                        className="max-h-7 w-auto object-contain"
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 text-right">
                      {t.pole}
                    </span>
                  </div>

                  <blockquote className="mt-5 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    « {t.quote} »
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="font-display text-sm font-bold text-slate-900 dark:text-white">
                    {t.author}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {t.role} · {t.organization}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Feed Section: Recent Professional Activity & Industry Presence */}
      <SocialFeedSection language={language} />

      {/* Careers & Contact Conversion Band */}
      <section className="py-16 bg-white dark:bg-[#0B192C] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="bg-[#0B192C] dark:bg-[#0F1E34] border border-transparent dark:border-slate-800 text-white rounded-2xl p-8 sm:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-balance">
                {h.careersBannerTitle}
              </h2>
              <p className="mt-3 text-base text-slate-300 leading-relaxed">
                {h.careersBannerBody}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <button
                type="button"
                onClick={() => onNavigate('/candidature')}
                className="px-6 py-3 text-sm font-semibold text-[#0B192C] bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
              >
                {h.careersBannerCta}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('/nous-contacter')}
                className="px-6 py-3 text-sm font-semibold text-white bg-[#3769B3] hover:bg-[#2B5492] rounded-lg transition-colors whitespace-nowrap"
              >
                {dict.contactCta}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Newsletter Subscription Section */}
      <NewsletterSection language={language} />
    </div>
  );
};
