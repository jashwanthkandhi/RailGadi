/**
 * weatherService.ts
 * Fetches weather data using OpenWeatherMap API.
 * Falls back to mock data when key is absent.
 */
import { MOCK_WEATHER_DATA } from './mockDataService';
import type { Weather } from '../types';

const OW_BASE = import.meta.env.VITE_OPENWEATHER_BASE_URL ?? 'https://api.openweathermap.org/data/2.5';
const OW_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY ?? '';

const hasRealKey = OW_KEY && OW_KEY !== 'your_openweather_api_key_here';

interface OwCurrentResponse {
  weather: { description: string; icon: string }[];
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  clouds: { all: number };
  visibility: number;
  name: string;
}

const adaptOwResponse = (data: OwCurrentResponse): Weather => ({
  locationName: data.name,
  condition: data.weather[0]?.description ?? 'Clear',
  icon: data.weather[0]?.icon ?? '01d',
  temperature: Math.round(data.main.temp - 273.15),
  humidity: data.main.humidity,
  windKph: Math.round(data.wind.speed * 3.6),
  rainProbability: data.clouds.all,
  updatedAt: new Date().toISOString()
});

export const fetchWeatherAtCoords = async (
  lat: number,
  lng: number
): Promise<Weather> => {
  if (hasRealKey) {
    try {
      const url = `${OW_BASE}/weather?lat=${lat}&lon=${lng}&appid=${OW_KEY}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`OpenWeather failed: ${res.status}`);
      const data: OwCurrentResponse = await res.json();
      return adaptOwResponse(data);
    } catch (err) {
      console.warn('[weatherService] OpenWeather unavailable, using mock data.', err);
    }
  }
  return MOCK_WEATHER_DATA.current;
};
