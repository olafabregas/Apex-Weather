import React from 'react';
import type { Precipitation } from '../../types/weather.types';
import type { Interpretation } from '../../types/interpretation.types';

interface PrecipitationCardProps {
  precipitation: Precipitation;
  interpretation?: Interpretation;
}

const PrecipitationCard: React.FC<PrecipitationCardProps> = ({ precipitation, interpretation }) => {
  return (
    <div className="glass p-4 md:p-5 rounded-xl sm:rounded-2xl flex flex-col gap-3 hover-lift">
      <div className="flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-xl text-cyan-300">rainy</span>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wide">
          Precipitation
        </span>
      </div>
      <div>
        <span className="text-2xl md:text-3xl font-bold">{precipitation.probability}%</span>
      </div>
      <p className="text-xs sm:text-sm leading-relaxed text-white/80">
        {interpretation?.details || precipitation.explanation}
      </p>
    </div>
  );
};

export default PrecipitationCard;
