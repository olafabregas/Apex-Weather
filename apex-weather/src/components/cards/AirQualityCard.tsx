import React from 'react';
import type { AirQuality } from '../../types/weather.types';
import type { Interpretation } from '../../types/interpretation.types';

interface AirQualityCardProps {
  airQuality: AirQuality;
  interpretation?: Interpretation;
}

const AirQualityCard: React.FC<AirQualityCardProps> = ({ airQuality, interpretation }) => {
  return (
    <div className="glass p-4 md:p-5 rounded-xl sm:rounded-2xl flex flex-col gap-3 hover-lift">
      <div className="flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-xl text-cyan-300">air</span>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wide">
          Air Quality
        </span>
      </div>
      <div>
        <span className="text-2xl md:text-3xl font-bold">{airQuality.index}</span>
        <span className="text-sm font-medium text-white/65 ml-1">/{airQuality.max}</span>
      </div>
      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
        <div
          className="bg-cyan-400 h-full rounded-full"
          style={{ width: `${airQuality.percentage}%` }}
        ></div>
      </div>
      <p className="text-xs sm:text-sm leading-relaxed text-white/80">
        {interpretation?.details || airQuality.explanation}
      </p>
    </div>
  );
};

export default AirQualityCard;
