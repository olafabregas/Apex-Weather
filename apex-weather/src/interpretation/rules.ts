// ============================================================================
// WEATHER INTERPRETATION RULES
// Rule-based weather condition interpretation
// Most specific rules first, fallback rule last
// ============================================================================

import type { InterpretationRule} from '../types/interpretation.types';

// ============================================================================
// TEMPERATURE RULES
// ============================================================================

export const temperatureRules: InterpretationRule[] = [
  {
    condition: (s) => s.temperature < -20,
    message: 'Extreme cold',
    details: 'Dangerous conditions. Frostbite risk in minutes.',
    advice: 'Avoid outdoor exposure. Multiple insulated layers essential.'
  },
  {
    condition: (s) => s.temperature < -10,
    message: 'Severe cold',
    details: 'Heavy winter gear required for any outdoor activity.',
    advice: 'Limit time outdoors. Cover all exposed skin.'
  },
  {
    condition: (s) => s.temperature < 0,
    message: 'Freezing',
    details: 'Ice formation likely. Roads may be hazardous.',
    advice: 'Wear insulated jacket, gloves, and hat. Exercise caution.'
  },
  {
    condition: (s) => s.temperature < 10 && s.windSpeed > 20,
    message: 'Cold with wind chill',
    details: 'Feels colder than actual temperature due to wind.',
    advice: 'Layer clothing and protect from wind exposure.'
  },
  {
    condition: (s) => s.temperature < 10,
    message: 'Cold',
    details: 'Cool conditions suitable for warm clothing.',
    advice: 'Wear a jacket or sweater. Comfortable for brisk activity.'
  },
  {
    condition: (s) => s.temperature >= 10 && s.temperature < 18,
    message: 'Cool',
    details: 'Mild conditions, light jacket recommended.',
    advice: 'Layer clothing for flexibility. Good for outdoor activity.'
  },
  {
    condition: (s) => s.temperature >= 18 && s.temperature < 25,
    message: 'Comfortable',
    details: 'Pleasant conditions for most activities.',
    advice: 'Ideal weather. Light clothing sufficient.'
  },
  {
    condition: (s) => s.temperature >= 25 && s.temperature < 30,
    message: 'Warm',
    details: 'Comfortable warmth. Stay hydrated outdoors.',
    advice: 'Wear light, breathable clothing. Sunscreen recommended.'
  },
  {
    condition: (s) => s.temperature >= 30 && s.temperature < 35,
    message: 'Hot',
    details: 'Elevated heat. Hydration becomes important.',
    advice: 'Seek shade during peak hours. Drink water regularly.'
  },
  {
    condition: (s) => s.temperature >= 35 && s.temperature < 40,
    message: 'Very hot',
    details: 'Excessive heat. Limit strenuous outdoor activity.',
    advice: 'Stay indoors during midday. Hydrate frequently.'
  },
  {
    condition: (s) => s.temperature >= 40,
    message: 'Extreme heat',
    details: 'Dangerous heat levels. Heat exhaustion risk.',
    advice: 'Avoid outdoor activity. Stay in air-conditioned spaces.'
  },
  {
    condition: () => true,
    message: 'Current temperature',
    details: 'Dress for how it feels outside.',
    advice: 'Layer if you will be out for a while.'
  }
];

// ============================================================================
// WIND RULES
// ============================================================================

export const windRules: InterpretationRule[] = [
  {
    condition: (s) => s.windSpeed > 60,
    message: 'Dangerous wind',
    details: 'Severe wind conditions. Structural damage possible.',
    advice: 'Stay indoors. Avoid windows. Secure loose objects.'
  },
  {
    condition: (s) => s.windSpeed > 40,
    message: 'Very strong wind',
    details: 'Difficult to walk. Tree branches may break.',
    advice: 'Avoid outdoor activity. Secure outdoor items.'
  },
  {
    condition: (s) => s.windSpeed > 25,
    message: 'Strong wind',
    details: 'Noticeable resistance when walking. Umbrellas difficult to use.',
    advice: 'Secure loose items. Walking may be challenging.'
  },
  {
    condition: (s) => s.windSpeed > 15,
    message: 'Moderate breeze',
    details: 'Steady wind movement. Leaves and small branches sway.',
    advice: 'Comfortable for most activities. Light items may blow around.'
  },
  {
    condition: (s) => s.windSpeed > 5,
    message: 'Light breeze',
    details: 'Gentle wind. Pleasant for outdoor activity.',
    advice: 'Ideal conditions for walks and outdoor recreation.'
  },
  {
    condition: (s) => s.windSpeed <= 5,
    message: 'Calm',
    details: 'Minimal air movement. Still conditions.',
    advice: 'Perfect for outdoor dining and stationary activities.'
  },
  {
    condition: () => true,
    message: 'Current wind',
    details: 'See the speed before you head out.',
    advice: 'Secure anything light if it is gusty.'
  }
];

// ============================================================================
// HUMIDITY RULES
// ============================================================================

export const humidityRules: InterpretationRule[] = [
  {
    condition: (s) => s.humidity > 85 && s.temperature > 25,
    message: 'Oppressively humid',
    details: 'Heavy, muggy air. Sweat evaporation inhibited.',
    advice: 'Stay in air-conditioned spaces. Limit physical exertion.'
  },
  {
    condition: (s) => s.humidity > 70 && s.temperature > 25,
    message: 'Very humid',
    details: 'Noticeably damp air. Feels warmer than actual temperature.',
    advice: 'Stay hydrated. Seek climate-controlled environments.'
  },
  {
    condition: (s) => s.humidity > 60,
    message: 'Humid',
    details: 'The air is damp. You may notice it if you are outside for a while.',
    advice: 'Comfortable for most. Light clothing recommended.'
  },
  {
    condition: (s) => s.humidity >= 40 && s.humidity <= 60,
    message: 'Comfortable humidity',
    details: 'Ideal moisture levels for comfort.',
    advice: 'Pleasant conditions for all activities.'
  },
  {
    condition: (s) => s.humidity < 30,
    message: 'Dry air',
    details: 'Low moisture. May cause dry skin and static.',
    advice: 'Use moisturizer. Stay hydrated. Humidifiers beneficial.'
  },
  {
    condition: () => true,
    message: 'Humidity',
    details: 'The moisture in the air is in an ordinary range.',
    advice: 'Dress for the temperature and you should be comfortable.'
  }
];

// ============================================================================
// AIR QUALITY RULES (AQI Scale)
// ============================================================================

export const airQualityRules: InterpretationRule[] = [
  {
    condition: (s) => s.airQualityIndex > 300,
    message: 'Hazardous air quality',
    details: 'Health warnings in effect. Everyone at risk.',
    advice: 'Stay indoors. Avoid all outdoor exertion. Use air purifiers.'
  },
  {
    condition: (s) => s.airQualityIndex > 200,
    message: 'Very unhealthy air',
    details: 'Serious health effects for all populations.',
    advice: 'Limit outdoor activity. Wear N95 mask if outside.'
  },
  {
    condition: (s) => s.airQualityIndex > 150,
    message: 'Unhealthy air',
    details: 'Sensitive groups should avoid outdoor activity.',
    advice: 'Reduce prolonged exertion. Monitor symptoms.'
  },
  {
    condition: (s) => s.airQualityIndex > 50,
    message: 'Moderate air quality',
    details: 'Acceptable for most. Sensitive individuals take caution.',
    advice: 'Generally safe. Monitor if you have respiratory conditions.'
  },
  {
    condition: (s) => s.airQualityIndex <= 50,
    message: 'Good air quality',
    details: 'Clean air. No health concerns.',
    advice: 'Excellent conditions for outdoor activities.'
  },
  {
    condition: () => true,
    message: 'Air quality',
    details: 'See the index if you are sensitive to the air.',
    advice: 'Stay in if breathing feels harder than usual.'
  }
];

// ============================================================================
// PRECIPITATION RULES
// ============================================================================

export const precipitationRules: InterpretationRule[] = [
  {
    condition: (s) => s.precipitationProbability > 80,
    message: 'Heavy rain occurring',
    details: 'Heavy rain is coming down.',
    advice: 'Stay dry with rain gear. Roads may be slippery.'
  },
  {
    condition: (s) => s.precipitationProbability > 60,
    message: 'Rain is falling',
    details: 'Steady rain outside.',
    advice: 'Use umbrella or rain jacket. Take precautions outdoors.'
  },
  {
    condition: (s) => s.precipitationProbability > 30,
    message: 'Light rain present',
    details: 'Light rain is falling.',
    advice: 'Light rain gear recommended for outdoor activities.'
  },
  {
    condition: (s) => s.precipitationProbability > 10,
    message: 'Drizzle or mist',
    details: 'A little drizzle or mist is possible.',
    advice: 'Light jacket or hoodie should be sufficient.'
  },
  {
    condition: (s) => s.precipitationProbability <= 10,
    message: 'Dry conditions',
    details: 'No rain right now.',
    advice: 'Perfect for outdoor activities. No rain gear needed.'
  },
  {
    condition: () => true,
    message: 'Rain chances',
    details: 'Keep an eye on the sky if you will be out.',
    advice: 'A light layer is enough unless rain starts.'
  }
];

// ============================================================================
// VISIBILITY RULES
// ============================================================================

export const visibilityRules: InterpretationRule[] = [
  {
    condition: (s) => s.visibility < 1,
    message: 'Very poor visibility',
    details: 'Dense fog or severe weather. Hazardous driving.',
    advice: 'Avoid travel if possible. Use fog lights and reduce speed.'
  },
  {
    condition: (s) => s.visibility < 5,
    message: 'Poor visibility',
    details: 'It is hard to see very far.',
    advice: 'Drive carefully. Increase following distance.'
  },
  {
    condition: (s) => s.visibility < 10,
    message: 'Moderate visibility',
    details: 'Some haze or light fog present.',
    advice: 'Visibility adequate but not optimal. Take standard precautions.'
  },
  {
    condition: (s) => s.visibility >= 10,
    message: 'Good visibility',
    details: 'Clear air. You can see a long way.',
    advice: 'Ideal for all outdoor activities and travel.'
  },
  {
    condition: () => true,
    message: 'Visibility',
    details: 'You can see about as far as usual.',
    advice: 'No extra caution for seeing ahead.'
  }
];
