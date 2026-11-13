import React, { useState } from 'react';
import { Building2 } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  objectFit?: 'cover' | 'contain';
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  objectFit = 'cover',
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 text-slate-500 dark:text-slate-400 p-6 text-center ${className}`}
      >
        <Building2 className="w-8 h-8 mb-2 text-[#3769B3]/60 dark:text-[#24A9E0]/60" strokeWidth={1.5} />
        <span className="text-xs font-medium text-slate-600 dark:text-slate-300 max-w-[180px] truncate">
          {fallbackTitle || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={`${objectFit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
    />
  );
};
