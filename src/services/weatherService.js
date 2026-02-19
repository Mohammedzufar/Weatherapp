/**
 * Weather Service - Uses Open-Meteo API (NO API KEY REQUIRED)
 * Free, no signup needed - works immediately
 */

const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Map Open-Meteo weather code (WMO) to OpenWeather icon name
 */
function weatherCodeToIcon(code) {
  if (code === 0) return '01d';
  if (code <= 3) return code === 1 ? '02d' : code === 2 ? '03d' : '04d';
  if (code === 45 || code === 48) return '50d';
  if (code >= 51 && code <= 67) return '10d';
  if (code >= 71 && code <= 77) return '13d';
  if (code >= 80 && code <= 82) return '09d';
  if (code >= 85 && code <= 86) return '13d';
  if (code >= 95) return '11d';
  return '01d';
}

function weatherCodeToDesc(code) {
  const map = {
    0: 'clear sky', 1: 'mainly clear', 2: 'partly cloudy', 3: 'overcast',
    45: 'foggy', 48: 'depositing rime fog', 51: 'light drizzle', 53: 'drizzle',
    55: 'dense drizzle', 61: 'slight rain', 63: 'moderate rain', 65: 'heavy rain',
    71: 'slight snow', 73: 'moderate snow', 75: 'heavy snow', 77: 'snow grains',
    80: 'slight rain showers', 81: 'rain showers', 82: 'violent rain showers',
    85: 'slight snow showers', 86: 'heavy snow showers',
    95: 'thunderstorm', 96: 'thunderstorm with hail', 99: 'thunderstorm with hail',
  };
  return map[code] || 'clear';
}

/**
 * Geocode city name to lat/lon
 */
async function geocode(city) {
  const url = `${GEOCODE_URL}?name=${encodeURIComponent(city)}&count=1`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.results?.length) throw new Error('City not found');
  return data.results[0];
}

async function fetchWeather(lat, lon) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lon,
    current: 'temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure,weather_code',
    daily: 'weather_code,temperature_2m_max',
    timezone: 'auto',
    forecast_days: 6,
  });
  const res = await fetch(`${WEATHER_URL}?${params}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.reason || 'Failed to fetch weather');
  return data;
}

/**
 * Transform Open-Meteo response to OpenWeather-like format for our components
 */
function toWeatherFormat(geo, data) {
  const c = data.current;
  const code = c.weather_code ?? 0;
  return {
    name: geo?.name || 'Unknown',
    main: {
      temp: c.temperature_2m ?? 0,
      humidity: c.relative_humidity_2m ?? 0,
      pressure: Math.round(c.surface_pressure ?? 0),
    },
    weather: [{ description: weatherCodeToDesc(code), icon: weatherCodeToIcon(code) }],
    wind: { speed: c.wind_speed_10m ?? 0 },
  };
}

function toForecastFormat(geo, data) {
  const daily = data.daily;
  if (!daily?.time?.length) return { list: [] };
  const list = daily.time.slice(0, 5).map((date, i) => {
    const code = daily.weather_code?.[i] ?? 0;
    const temp = daily.temperature_2m_max?.[i] ?? 0;
    return {
      dt_txt: `${date} 12:00:00`,
      main: { temp },
      weather: [{ icon: weatherCodeToIcon(code), description: weatherCodeToDesc(code) }],
    };
  });
  return { list };
}

/**
 * Get current weather for a city (geocode + fetch)
 */
export async function getCurrentWeather(city) {
  const geo = await geocode(city);
  const data = await fetchWeather(geo.latitude, geo.longitude);
  return toWeatherFormat(geo, data);
}

/**
 * Get 5-day forecast for a city (geocode once, fetch once)
 */
export async function getForecast(city) {
  const geo = await geocode(city);
  const data = await fetchWeather(geo.latitude, geo.longitude);
  return toForecastFormat(geo, data);
}

/**
 * Get both current weather and forecast for a city (single geocode + fetch)
 * Use this for search to avoid duplicate API calls
 */
export async function getWeatherAndForecast(city) {
  const geo = await geocode(city);
  const data = await fetchWeather(geo.latitude, geo.longitude);
  return {
    weather: toWeatherFormat(geo, data),
    forecast: toForecastFormat(geo, data),
  };
}

/**
 * Get current weather by coordinates (geolocation)
 */
export async function getWeatherByCoords(lat, lon) {
  const geo = { name: 'Current Location' };
  const data = await fetchWeather(lat, lon);
  // Try to get city name from reverse geocoding (Open-Meteo doesn't have it, so we keep "Current Location")
  return toWeatherFormat(geo, data);
}

/**
 * Get 5-day forecast by coordinates
 */
export async function getForecastByCoords(lat, lon) {
  const geo = { name: 'Current Location' };
  const data = await fetchWeather(lat, lon);
  return toForecastFormat(geo, data);
}
