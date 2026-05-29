import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';

export function useWeather(city: string | undefined | null) {
  return useQuery({
    queryKey: ['weather', 'current', city],
    queryFn: () => city ? api.weather.getCurrent(city) : null,
    enabled: !!city,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export function useForecast(city: string | undefined | null, date: string | undefined | null) {
  return useQuery({
    queryKey: ['weather', 'forecast', city, date],
    queryFn: () => (city && date) ? api.weather.getForecast(city, date) : null,
    enabled: !!city && !!date,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}
