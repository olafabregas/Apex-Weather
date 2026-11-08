import React from 'react';
import type { WindData } from '../../types/weather.types';
import type { Interpretation } from '../../types/interpretation.types';

interface WindCardProps {
  wind: WindData;
  interpretation?: Interpretation;
}

const WindCard: React.FC<WindCardProps> = ({ wind, interpretation }) => {
  const showGusts = wind.gusts != null && wind.gusts !== wind.speed;

  return (
    <div className="glass rounded-xl sm:rounded-2xl p-4 md:p-5 relative overflow-hidden hover-lift">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wide mb-1 text-cyan-300">
            Wind &amp; Direction
          </h4>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl md:text-3xl font-bold">{wind.speed}</span>
            <span className="text-sm text-white/70">km/h</span>
          </div>
        </div>
        <div className="w-14 h-14 md:w-16 md:h-16 relative flex items-center justify-center flex-shrink-0">
          <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-spin-slow"></div>
          <span
            className="material-icons-round text-cyan-400 text-2xl md:text-3xl"
            style={{ transform: `rotate(${wind.direction}deg)` }}
          >
            navigation
          </span>
        </div>
      </div>
      <div className={`grid gap-3 border-t border-primary/10 pt-3 ${showGusts ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {showGusts && (
          <div>
            <p className="text-[11px] sm:text-xs uppercase tracking-wide text-white/70">Gusts</p>
            <p className="text-sm font-medium text-primary">{wind.gusts} km/h</p>
          </div>
        )}
        <div>
          <p className="text-[11px] sm:text-xs uppercase tracking-wide text-white/70">Direction</p>
          <p className="text-sm font-medium text-primary">{wind.direction}° {wind.directionLabel}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-white/85 leading-relaxed italic border-l-2 border-primary/30 pl-3">
        {interpretation?.details || wind.explanation}
      </p>
    </div>
  );
};

export default WindCard;
