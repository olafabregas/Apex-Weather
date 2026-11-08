import React from 'react';
import type { Visibility } from '../../types/weather.types';
import type { Interpretation } from '../../types/interpretation.types';

interface VisibilityCardProps {
  visibility: Visibility;
  interpretation?: Interpretation;
}

const VisibilityCard: React.FC<VisibilityCardProps> = ({ visibility, interpretation }) => {
  return (
    <div className="glass p-4 md:p-5 rounded-xl sm:rounded-2xl flex flex-col gap-3 hover-lift">
      <div className="flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-xl text-cyan-300">visibility</span>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wide">
          Visibility
        </span>
      </div>
      <div>
        <span className="text-2xl md:text-3xl font-bold">{visibility.distance}</span>
        <span className="text-sm font-medium text-white/65 ml-1">{visibility.unit}</span>
      </div>
      <p className="text-xs sm:text-sm leading-relaxed text-white/80">
        {interpretation?.details || visibility.explanation}
      </p>
    </div>
  );
};

export default VisibilityCard;
