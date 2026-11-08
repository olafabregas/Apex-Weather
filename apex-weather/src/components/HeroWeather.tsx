import React from 'react';
import type { CurrentWeather } from '../types/weather.types';
import type { WeatherInterpretation } from '../types/interpretation.types';

interface HeroWeatherProps {
  current: CurrentWeather;
  interpretation?: WeatherInterpretation | null;
}

const HeroWeather: React.FC<HeroWeatherProps> = ({ current, interpretation }) => {
  const tempMessage = interpretation?.temperature.message || current.condition;
  const humidityMessage = interpretation?.humidity.message || current.description;
  const hook = [tempMessage, humidityMessage].filter(Boolean).join(' · ');

  return (
    <section className="py-8 sm:py-10 md:py-12 flex flex-col items-center text-center animate-fade-in">
      <h1 className="text-[72px] sm:text-[90px] md:text-[110px] lg:text-[120px] leading-none font-bold text-cyan-400 tracking-tighter text-glow">
        {current.temp}°
      </h1>
      <p className="text-base sm:text-lg md:text-xl font-light text-white/75 mt-3">
        Feels like {current.feelsLike}°C
      </p>
      {hook && (
        <p className="mt-6 max-w-xl text-base sm:text-lg md:text-xl font-medium leading-snug text-white/90 text-balance">
          {hook}
        </p>
      )}
    </section>
  );
};

export default HeroWeather;
