import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroWeather from './components/HeroWeather';
import WeatherSummaryCard from './components/WeatherSummaryCard';
import HourlyTimeline from './components/HourlyTimeline';
import MetricsGrid from './components/MetricsGrid';
import ForecastCard from './components/ForecastCard';
import ErrorBanner from './components/ErrorBanner';
import SearchModal from './components/SearchModal';
import AboutModal from './components/AboutModal';
import { useWeather } from './hooks/useWeather';
import type { WeatherError } from './types/interpretation.types';

function App() {
  const { interpretation, snapshot, loading, error, retry, searchCity } = useWeather();
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [dismissedError, setDismissedError] = useState(false);

  if (loading && !snapshot) {
    return (
      <div className="font-display text-white antialiased min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-base sm:text-lg text-white/75">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-display text-white antialiased min-h-screen flex flex-col">
      <Navbar
        location={snapshot?.location ?? null}
        onRefresh={retry}
        onSearchClick={() => setSearchModalOpen(true)}
        onAboutClick={() => setAboutModalOpen(true)}
      />

      {snapshot ? (
        <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
          {error && !dismissedError && (
            <ErrorBanner
              error={error}
              onRetry={retry}
              onDismiss={() => setDismissedError(true)}
              onSearch={() => setSearchModalOpen(true)}
            />
          )}

          <main className="pb-6">
            <div key={`${snapshot.location.lat}-${snapshot.location.lng}`}>
              <HeroWeather
                current={{
                  temp: snapshot.temperature,
                  feelsLike: snapshot.feelsLike,
                  condition: interpretation?.temperature.message || snapshot.condition,
                  description: interpretation?.humidity.message || '',
                  timestamp: new Date(snapshot.timestamp).toISOString()
                }}
                interpretation={interpretation}
              />

              {interpretation && (
                <WeatherSummaryCard interpretation={interpretation} />
              )}

              <HourlyTimeline hourly={snapshot.hourlyForecast} />

              <MetricsGrid
                weatherData={snapshot}
                interpretation={interpretation}
              />

              <ForecastCard forecast={snapshot.dailyForecast} />
            </div>
          </main>

          <footer className="pb-10 pt-2 text-center text-sm text-white/70">
            <p>
              Weather data from{' '}
              <a
                href="https://openweathermap.org/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-300 underline-offset-2 hover:underline"
              >
                OpenWeather
              </a>
            </p>
          </footer>
        </div>
      ) : (
        <UnavailableState
          error={error}
          onRetry={retry}
          onSearch={() => setSearchModalOpen(true)}
        />
      )}

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectCity={searchCity}
      />

      <AboutModal
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
      />
    </div>
  );
}

function UnavailableState({
  error,
  onRetry,
  onSearch
}: {
  error: WeatherError | null;
  onRetry: () => void;
  onSearch: () => void;
}) {
  const needsCity = !error || error.type === 'LOCATION_DENIED';

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center px-4 py-16 sm:px-6">
      <div className="glass-glow w-full max-w-md rounded-2xl p-6 text-center sm:p-8">
        <span className="material-symbols-outlined mb-4 text-5xl text-cyan-400" aria-hidden="true">
          {needsCity ? 'location_searching' : 'cloud_off'}
        </span>
        <h2 className="mb-2 text-xl font-bold sm:text-2xl">
          {needsCity ? 'Choose a city' : 'Live weather unavailable'}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-white/80 sm:text-base">
          {needsCity
            ? 'Search for a city to load the current conditions.'
            : error?.message || 'The weather service did not respond, and there is no saved forecast to show.'}
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          {!needsCity && (
            <button
              onClick={onRetry}
              className="px-5 py-2.5 rounded-xl bg-primary text-black text-sm font-bold hover:bg-primary/90 transition-all"
            >
              Try again
            </button>
          )}
          <button
            onClick={onSearch}
            className="px-5 py-2.5 rounded-xl border border-white/15 text-sm font-medium text-white/90 hover:bg-white/10 transition-all"
          >
            Search city
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
