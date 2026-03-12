import { convertToEnglishCity, getCityCoordinates } from '../../location/model/mapping';
import type { LocationState } from '../../location/model/store';
import type { Coordinates } from '../../../shared/hooks/useGeolocation';

const API_KEY = '42a9cf9872a24b2f4ac1573e564806f3';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  locationName: string; // The display name
  currentTemp: number;
  minTemp: number;
  maxTemp: number;
  hourlyForecasts: { time: string; temp: number }[];
}

// Type guard
const isCoordinates = (loc: any): loc is Coordinates => {
  return loc && typeof loc === 'object' && 'lat' in loc && 'lon' in loc;
};

export const fetchWeatherData = async (location: LocationState): Promise<WeatherData> => {
  if (!location) {
    throw new Error('Location is required');
  }

  let currentRes;
  let forecastRes;
  let finalLocationName = '';

  if (isCoordinates(location)) {
    // Direct fetch by coordinates
    currentRes = await fetch(`${BASE_URL}/weather?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&lang=kr`);
    forecastRes = await fetch(`${BASE_URL}/forecast?lat=${location.lat}&lon=${location.lon}&appid=${API_KEY}&units=metric&lang=kr`);
  } else {
    // Fetch by city name (Korean -> English mapping)
    finalLocationName = location; // Keep original Korean name for display if possible
    const englishCity = convertToEnglishCity(location);
    currentRes = await fetch(`${BASE_URL}/weather?q=${englishCity}&appid=${API_KEY}&units=metric&lang=kr`);
    forecastRes = await fetch(`${BASE_URL}/forecast?q=${englishCity}&appid=${API_KEY}&units=metric&lang=kr`);

    // Fallback to coordinates if city name search fails
    if (!currentRes.ok || !forecastRes.ok) {
      const coords = getCityCoordinates(location);
      if (coords) {
        currentRes = await fetch(`${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=kr`);
        forecastRes = await fetch(`${BASE_URL}/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=kr`);
      } else {
        throw new Error(`Failed to fetch weather data for ${location}`);
      }
    }
  }

  if (!currentRes.ok || !forecastRes.ok) {
     throw new Error(`Failed to fetch weather data even with fallback.`);
  }

  const currentData = await currentRes.json();
  const forecastData = await forecastRes.json();

  // If we searched by coordinates directly (e.g. Geolocation), the local name wasn't explicitly provided.
  // OpenWeatherMap's `name` field for coordinates in Korea is often poorly transliterated (e.g., "Seolman" for Busan).
  // We can use the Reverse Geocoding API to get a proper Korean localized name.
  if (isCoordinates(location)) {
    try {
      const geoRes = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${location.lat}&lon=${location.lon}&limit=1&appid=${API_KEY}`);
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        if (geoData && geoData.length > 0 && geoData[0].local_names && geoData[0].local_names.ko) {
          finalLocationName = geoData[0].local_names.ko;
        } else if (geoData && geoData.length > 0) {
          finalLocationName = geoData[0].name;
        } else {
          finalLocationName = '현재 위치';
        }
      } else {
        finalLocationName = '현재 위치';
      }
    } catch {
      finalLocationName = '현재 위치';
    }
  } else if (!finalLocationName) {
    finalLocationName = '현재 위치';
  }

  // Parse hourly forecasts (next 6 data points, which are 3-hour intervals in OpenWeather free tier)
  // For precise hourly, OpenWeather requires One Call API, but free tier forecast is 3-hourly.
  // We'll map the next 6 items to match the Figma design pattern.
  const hourlyForecasts = forecastData.list.slice(0, 6).map((item: any) => {
    const date = new Date(item.dt * 1000);
    const hour = date.getHours();
    return {
      time: `${hour}시`,
      temp: Math.round(item.main.temp)
    };
  });

  return {
    locationName: finalLocationName,
    currentTemp: Math.round(currentData.main.temp),
    minTemp: Math.round(currentData.main.temp_min),
    maxTemp: Math.round(currentData.main.temp_max),
    hourlyForecasts
  };
};
