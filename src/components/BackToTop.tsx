import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types/sem';

interface BackToTopProps {
  language?: Language;
}

export const BackToTop: React.FC<BackToTopProps> = ({ language = 'fr' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 360);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const label = language === 'fr' ? 'Retour en haut de page' : 'Back to top';

  return (
    <aside aria-label={label} className="print:hidden no-print pointer-events-none">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={label}
        title={label}
        className={`fixed z-30 bottom-20 right-4 sm:bottom-22 sm:right-6 w-11 h-11 rounded-xl bg-white/95 dark:bg-[#0B192C]/95 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:text-[#3769B3] dark:hover:text-[#24A9E0] border border-slate-200 dark:border-slate-700 hover:border-[#3769B3] dark:hover:border-[#24A9E0] shadow-md hover:shadow-lg flex items-center justify-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3769B3] hover:-translate-y-0.5 ${
          isVisible
            ? 'opacity-100 pointer-events-auto translate-y-0'
            : 'opacity-0 pointer-events-none translate-y-3'
        }`}
      >
        <ArrowUp className="w-5 h-5" aria-hidden="true" />
      </button>
    </aside>
  );
};
