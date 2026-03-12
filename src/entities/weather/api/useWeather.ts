import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from './fetchWeather';
import type { WeatherData } from './fetchWeather';

import type { LocationState } from '../../location/model/store';

export const WEATHER_QUERY_KEYS = {
  weather: (location: LocationState) => ['weather', location] as const,
};

export const useWeather = (location: LocationState) => {
  return useQuery<WeatherData, Error>({
    queryKey: WEATHER_QUERY_KEYS.weather(location),
    queryFn: () => fetchWeatherData(location),
    enabled: !!location,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
