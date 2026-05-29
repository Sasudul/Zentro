'use client';

import React from 'react';
import { useWeather } from '@/hooks/useWeather';
import { Cloud, Sun, CloudRain, CloudLightning, Snowflake } from 'lucide-react';
import { cn } from '@/lib/utils';

export function WeatherBadge({ city, className }: { city?: string | null; className?: string }) {
  const { data: weather, isLoading } = useWeather(city);

  if (!city || isLoading) {
    return null;
  }

  if (!weather || !weather.weather || weather.weather.length === 0) {
    return null;
  }

  const condition = weather.weather[0].main.toLowerCase();
  const temp = Math.round(weather.main.temp);
  
  let Icon = Sun;
  let tintClass = 'weather-clear';

  if (condition.includes('cloud')) {
    Icon = Cloud;
    tintClass = 'weather-clouds';
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    Icon = CloudRain;
    tintClass = 'weather-rain';
  } else if (condition.includes('thunder')) {
    Icon = CloudLightning;
    tintClass = 'weather-storm';
  } else if (condition.includes('snow')) {
    Icon = Snowflake;
    tintClass = 'weather-snow';
  }

  return (
    <div className={cn("weather-badge flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium", tintClass, className)}>
      <Icon size={14} />
      <span>{temp}°C</span>
    </div>
  );
}
