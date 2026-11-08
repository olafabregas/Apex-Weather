// ============================================================================
// FORECAST DATA PROCESSOR
// Converts API forecast data into UI-ready formats
// ============================================================================

import type {
  ForecastResponse,
  HourlyForecastItem,
  DailyForecastItem
} from '../types/interpretation.types';

/**
 * Extract next 5 hours from forecast data
 */
export function processHourlyForecast(
  forecastData: ForecastResponse
): HourlyForecastItem[] {
  const now = new Date();
  const entries = forecastData.list.slice(0, 5);

  return entries.map((entry, index) => {
    const date = new Date(entry.dt * 1000);
    const isNow = index === 0;
    const label = formatHourLabel(date, now);

    return {
      time: isNow ? 'Now' : label.time,
      day: isNow ? undefined : label.day,
      icon: mapWeatherIcon(entry.weather[0].main),
      temp: Math.round(entry.main.temp),
      isPrimary: isNow
    };
  });
}

/**
 * Extract 5-day forecast with daily highs/lows
 */
export function processDailyForecast(
  forecastData: ForecastResponse
): DailyForecastItem[] {
  // Group forecast entries by day
  const dayMap = new Map<string, typeof forecastData.list>();
  
  forecastData.list.forEach(entry => {
    const date = new Date(entry.dt * 1000);
    const dayKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
    
    if (!dayMap.has(dayKey)) {
      dayMap.set(dayKey, []);
    }
    dayMap.get(dayKey)!.push(entry);
  });
  
  // Convert to daily forecast items
  const daily: DailyForecastItem[] = [];
  const days = Array.from(dayMap.entries()).slice(0, 5); // First 5 days
  
  // Calculate global min/max for temperature range bars
  let globalMin = Infinity;
  let globalMax = -Infinity;
  
  days.forEach(([, entries]) => {
    const temps = entries.map(e => e.main.temp);
    const dayMin = Math.min(...temps);
    const dayMax = Math.max(...temps);
    globalMin = Math.min(globalMin, dayMin);
    globalMax = Math.max(globalMax, dayMax);
  });
  
  const tempRange = globalMax - globalMin;
  
  days.forEach(([dayKey, entries], index) => {
    const date = new Date(dayKey);
    const dayName = index === 0 ? 'Today' : formatDayName(date);
    
    // Get temps for the day
    const temps = entries.map(e => e.main.temp);
    const high = Math.round(Math.max(...temps));
    const low = Math.round(Math.min(...temps));
    
    // Get most common weather condition
    const conditions = entries.map(e => e.weather[0].main);
    const mostCommon = getMostCommon(conditions);
    const icon = mapWeatherIcon(mostCommon);
    
    // Calculate temperature bar position
    const leftPercent = ((low - globalMin) / tempRange) * 100;
    const rightPercent = ((globalMax - high) / tempRange) * 100;
    
    daily.push({
      day: dayName,
      icon,
      high,
      low,
      tempRange: {
        left: Math.round(leftPercent),
        right: Math.round(rightPercent)
      }
    });
  });
  
  return daily;
}

/**
 * Update precipitation probability from forecast
 * Uses the maximum probability from next 3 hours
 */
export function getForecastPrecipitation(
  forecastData: ForecastResponse
): number {
  // Get next 3 forecast entries (~9 hours)
  const entries = forecastData.list.slice(0, 3);
  const probabilities = entries.map(e => e.pop * 100); // Convert 0-1 to 0-100
  return Math.round(Math.max(...probabilities));
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function formatHourLabel(date: Date, now: Date): { time: string; day?: string } {
  const time = `${date.getHours().toString().padStart(2, '0')}:00`;
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (sameDay) {
    return { time };
  }

  return { time, day: WEEKDAYS[date.getDay()] };
}

function formatDayName(date: Date): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[date.getDay()];
}

function mapWeatherIcon(condition: string): string {
  const iconMap: Record<string, string> = {
    'Clear': 'wb_sunny',
    'Clouds': 'cloud',
    'Rain': 'water_drop',
    'Drizzle': 'grain',
    'Thunderstorm': 'thunderstorm',
    'Snow': 'ac_unit',
    'Mist': 'mist',
    'Fog': 'foggy',
    'Haze': 'haze',
    'Dust': 'dust',
    'Sand': 'dust',
    'Smoke': 'smoke'
  };
  
  return iconMap[condition] || 'cloud';
}

function getMostCommon<T>(arr: T[]): T {
  const counts = new Map<T, number>();
  arr.forEach(item => {
    counts.set(item, (counts.get(item) || 0) + 1);
  });
  
  let maxCount = 0;
  let mostCommon = arr[0];
  
  counts.forEach((count, item) => {
    if (count > maxCount) {
      maxCount = count;
      mostCommon = item;
    }
  });
  
  return mostCommon;
}
