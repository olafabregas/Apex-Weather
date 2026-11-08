import React from 'react';
import type { WeatherInterpretation, WeatherSnapshot } from '../types/interpretation.types';
import WindCard from './cards/WindCard';
import AirQualityCard from './cards/AirQualityCard';
import PrecipitationCard from './cards/PrecipitationCard';
import SolarCycleCard from './cards/SolarCycleCard';
import HumidityCard from './cards/HumidityCard';
import VisibilityCard from './cards/VisibilityCard';

interface MetricsGridProps {
  weatherData: WeatherSnapshot;
  interpretation?: WeatherInterpretation | null;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ weatherData, interpretation }) => {
  return (
    <section className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
      <div className="col-span-2 animate-fade-in-up delay-75">
        <WindCard
          wind={{
            speed: weatherData.windSpeed,
            gusts: weatherData.windGust,
            direction: weatherData.windDirection,
            directionLabel: getCardinalDirection(weatherData.windDirection),
            explanation: interpretation?.wind.details || ''
          }}
          interpretation={interpretation?.wind}
        />
      </div>
      <div className="animate-fade-in-up delay-150">
        <AirQualityCard
          airQuality={{
            index: weatherData.airQualityIndex,
            max: 500,
            percentage: (weatherData.airQualityIndex / 500) * 100,
            explanation: interpretation?.airQuality.details || ''
          }}
          interpretation={interpretation?.airQuality}
        />
      </div>
      <div className="animate-fade-in-up delay-225">
        <PrecipitationCard
          precipitation={{
            probability: weatherData.precipitationProbability,
            explanation: interpretation?.precipitation.details || ''
          }}
          interpretation={interpretation?.precipitation}
        />
      </div>
      <div className="col-span-2 animate-fade-in-up delay-300">
        <SolarCycleCard
          sunrise={weatherData.sunrise}
          sunset={weatherData.sunset}
        />
      </div>
      <div className="animate-fade-in-up delay-375">
        <HumidityCard
          humidity={{
            percentage: weatherData.humidity,
            explanation: interpretation?.humidity.details || ''
          }}
          interpretation={interpretation?.humidity}
        />
      </div>
      <div className="animate-fade-in-up delay-450">
        <VisibilityCard
          visibility={{
            distance: weatherData.visibility,
            unit: 'km',
            explanation: interpretation?.visibility.details || ''
          }}
          interpretation={interpretation?.visibility}
        />
      </div>
    </section>
  );
};

function getCardinalDirection(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

export default MetricsGrid;
