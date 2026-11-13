import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SEM_CONTENT } from '../data/semContent';
import { Language, RoutePath } from '../types/sem';
import { PageHeader } from '../components/PageHeader';
import { ReadingProgressBar } from '../components/ReadingProgressBar';
import { ProjectRoadmap } from '../components/ProjectRoadmap';

interface PortfolioPageProps {
  language: Language;
  onNavigate: (path: RoutePath) => void;
  initialCategoryId?: string;
}

export const PortefeuillePage: React.FC<PortfolioPageProps> = ({
  language,
  onNavigate,
  initialCategoryId,
}) => {
  const p = SEM_CONTENT[language].portfolioPage;
  const [activeCategory, setActiveCategory] = useState<string>(
    initialCategoryId || 'all'
  );

  useEffect(() => {
    setActiveCategory(initialCategoryId || 'all');
  }, [initialCategoryId]);

  const visibleCategories =
    activeCategory === 'all'
      ? p.categories
      : p.categories.filter((cat) => cat.id === activeCategory);

  return (
    <div>
      <ReadingProgressBar label={p.title} />
      <PageHeader
        title={p.title}
        subtitle={p.subtitle}
        breadcrumbs={[{ label: p.title }]}
        language={language}
        onNavigate={onNavigate}
      />

      <section
        id="portfolio-catalog-grid"
        className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 scroll-mt-20"
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="space-y-6">
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {p.intro}
            </p>

            {/* Interactive Category Filter Controls */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900 rounded-lg">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  activeCategory === 'all'
                    ? 'bg-white dark:bg-[#3769B3] text-[#3769B3] dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {p.allLabel}
              </button>
              {p.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-white dark:bg-[#3769B3] text-[#3769B3] dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleCategories.map((cat) => (
              <article
                key={cat.id}
                className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="font-mono text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0] tabular-nums">
                      {cat.index}
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {cat.items.length} {language === 'fr' ? 'solutions' : 'solutions'}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                    {cat.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {cat.summary}
                  </p>

                  <ul className="mt-5 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-slate-800 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-[#3769B3] dark:text-[#24A9E0] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive SVG Project Delivery Roadmap */}
      <ProjectRoadmap
        language={language}
        onNavigate={onNavigate}
        onSelectCategory={setActiveCategory}
      />

      {/* Exclusive Distribution Highlight */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#070F1B] transition-colors duration-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              {p.exclusiveHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {p.exclusiveBrands.map((brand) => (
              <div
                key={brand.brand}
                className="bg-[#F8FAFC] dark:bg-[#0B192C] border border-slate-200 dark:border-slate-800 rounded-xl p-7 space-y-3"
              >
                <div className="text-xs font-semibold text-[#3769B3] dark:text-[#24A9E0]">
                  {brand.category}
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  {brand.brand}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {brand.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-[#0B192C] dark:bg-[#0B192C] border border-transparent dark:border-slate-800 text-white rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-balance">
              {p.ctaTitle}
            </h3>
            <button
              type="button"
              onClick={() => onNavigate('/nous-contacter')}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0B192C] bg-white hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>{p.ctaButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
