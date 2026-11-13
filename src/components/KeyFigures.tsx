import React, { useEffect, useRef, useState } from 'react';
import { Award, Building2, Globe2, Layers } from 'lucide-react';
import { Language } from '../types/sem';

interface KeyFiguresProps {
  language: Language;
}

interface CounterItem {
  id: string;
  endValue: number;
  suffix?: string;
  prefix?: string;
  labelFr: string;
  labelEn: string;
  contextFr: string;
  contextEn: string;
  icon: React.ReactNode;
}

const METRICS: CounterItem[] = [
  {
    id: 'experience',
    endValue: 18,
    suffix: '+',
    labelFr: 'Années d’expérience',
    labelEn: 'Years of Experience',
    contextFr: 'Expertise continue depuis 2008',
    contextEn: 'Continuous expertise since 2008',
    icon: <Award className="w-5 h-5 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />,
  },
  {
    id: 'projects',
    endValue: 500,
    suffix: '+',
    labelFr: 'Projets réalisés',
    labelEn: 'Projects Completed',
    contextFr: 'Réseaux critiques & Data Centers',
    contextEn: 'Critical networks & Data Centers',
    icon: <Building2 className="w-5 h-5 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />,
  },
  {
    id: 'countries',
    endValue: 17,
    suffix: '',
    labelFr: 'Pays desservis',
    labelEn: 'Countries Served',
    contextFr: 'Empreinte continentale en Afrique',
    contextEn: 'Continental footprint in Africa',
    icon: <Globe2 className="w-5 h-5 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />,
  },
  {
    id: 'poles',
    endValue: 4,
    suffix: '',
    labelFr: 'Pôles stratégiques',
    labelEn: 'Strategic Business Units',
    contextFr: 'Services, Conseil, Sûreté, QoS',
    contextEn: 'Services, Consulting, Security, QoS',
    icon: <Layers className="w-5 h-5 text-[#3769B3] dark:text-[#24A9E0]" aria-hidden="true" />,
  },
];

export const KeyFigures: React.FC<KeyFiguresProps> = ({ language }) => {
  const isFr = language === 'fr';
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1800; // ms
    const fps = 60;
    const totalFrames = Math.round((duration / 1000) * fps);
    let frame = 0;

    const timer = window.setInterval(() => {
      frame++;
      const progress = Math.min(1, frame / totalFrames);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(
        METRICS.map((m) => Math.round(m.endValue * eased))
      );

      if (frame >= totalFrames) {
        window.clearInterval(timer);
        setCounts(METRICS.map((m) => m.endValue));
      }
    }, 1000 / fps);

    return () => window.clearInterval(timer);
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className="py-12 px-6 sm:px-8 bg-white dark:bg-[#0F1E33] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm transition-colors"
    >
      <div className="max-w-3xl mb-8">
        <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {isFr ? 'Chiffres Clés & Impact' : 'Key Figures & Impact'}
        </h2>
        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {isFr
            ? 'Près de deux décennies d’excellence en ingénierie au service des infrastructures critiques et de la coopération technologique.'
            : 'Nearly two decades of engineering excellence empowering critical infrastructure and technological cooperation.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {METRICS.map((metric, index) => {
          const label = isFr ? metric.labelFr : metric.labelEn;
          const context = isFr ? metric.contextFr : metric.contextEn;

          return (
            <div
              key={metric.id}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-[#3769B3]/10 dark:bg-[#24A9E0]/15 flex items-center justify-center">
                  {metric.icon}
                </div>
                <span className="font-mono text-xs font-semibold text-slate-400 dark:text-slate-500 tabular-nums">
                  0{index + 1}
                </span>
              </div>

              <div>
                <div className="font-display text-3xl sm:text-4xl font-bold text-[#0B192C] dark:text-white tabular-nums tracking-tight">
                  {counts[index]}
                  {metric.suffix}
                </div>
                <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {label}
                </div>
                <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {context}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
