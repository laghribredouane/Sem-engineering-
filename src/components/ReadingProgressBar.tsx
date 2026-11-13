import React, { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  label?: string;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  label = 'Progression de lecture',
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const totalScrollable = scrollHeight - clientHeight;

      if (totalScrollable <= 0) {
        setProgress(0);
      } else {
        const ratio = Math.min(1, Math.max(0, scrollTop / totalScrollable));
        setProgress(ratio);
      }
      rafId = null;
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && document.body) {
      resizeObserver = new ResizeObserver(() => {
        updateProgress();
      });
      resizeObserver.observe(document.body);
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (resizeObserver) resizeObserver.disconnect();
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const percentage = Math.round(progress * 100);
  const isVisible = progress > 0;

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percentage}
      aria-hidden={!isVisible}
      className={`print:hidden no-print fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } bg-slate-200/40 dark:bg-slate-800/60`}
    >
      <div
        className="h-full w-full bg-gradient-to-r from-[#3769B3] via-[#24A9E0] to-[#38BDF8] origin-left transition-transform duration-75 ease-out shadow-[0_0_8px_rgba(36,169,224,0.7)]"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
