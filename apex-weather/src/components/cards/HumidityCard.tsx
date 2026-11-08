import React from 'react';
import type { Humidity } from '../../types/weather.types';
import type { Interpretation } from '../../types/interpretation.types';

interface HumidityCardProps {
  humidity: Humidity;
  interpretation?: Interpretation;
}

const HumidityCard: React.FC<HumidityCardProps> = ({ humidity, interpretation }) => {
  return (
    <div className="glass p-4 md:p-5 rounded-xl sm:rounded-2xl flex flex-col gap-3 hover-lift">
      <div className="flex items-center gap-2 text-primary">
        <span className="material-symbols-outlined text-xl text-cyan-300">opacity</span>
        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wide">
          Humidity
        </span>
      </div>
      <div>
        <span className="text-2xl md:text-3xl font-bold">{humidity.percentage}%</span>
      </div>
      <p className="text-xs sm:text-sm leading-relaxed text-white/80">
        {interpretation?.details || humidity.explanation}
      </p>
    </div>
  );
};

export default HumidityCard;
