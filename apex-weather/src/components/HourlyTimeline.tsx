import React from 'react';
import type { HourlyForecast } from '../types/weather.types';

interface HourlyTimelineProps {
  hourly: HourlyForecast[];
}

const HourlyTimeline: React.FC<HourlyTimelineProps> = ({ hourly }) => {
  return (
    <section className="mb-8 md:mb-10 animate-fade-in-up delay-75">
      <h2 className="text-base md:text-lg font-semibold tracking-tight mb-4">Today's Timeline</h2>
      <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 no-scrollbar">
        {hourly.map((hour, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-[4.75rem] sm:w-20 py-3.5 md:py-4 rounded-2xl flex flex-col items-center gap-2 hover-lift transition-all ${
              hour.isPrimary
                ? 'glass-dark border-primary/30'
                : 'glass'
            }`}
          >
            <span className="text-[11px] sm:text-xs font-medium text-white/75 text-center leading-tight">
              {hour.day && (
                <span className="block text-[11px] font-semibold uppercase tracking-wide text-cyan-300">
                  {hour.day}
                </span>
              )}
              {hour.time}
            </span>
            <span className={`material-symbols-outlined text-xl md:text-2xl ${hour.isPrimary ? 'text-primary' : 'text-white/75'}`}>
              {hour.icon}
            </span>
            <span className="font-bold text-base md:text-lg">{hour.temp}°</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HourlyTimeline;
