'use client';

import React from 'react';
import { useForecast } from '@/hooks/useWeather';
import { Cloud, Sun, CloudRain, Snowflake, CloudLightning } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function WeatherForecast({ city, date }: { city?: string | null; date?: string | null }) {
  const { data: forecast, isLoading } = useForecast(city, date);

  if (!city || !date || isLoading) {
    return <div className="h-20 animate-pulse bg-muted rounded-lg" />;
  }

  if (!forecast) {
    return null;
  }

  const condition = forecast.weather[0].main.toLowerCase();
  const temp = Math.round(forecast.main.temp);
  
  let Icon = Sun;

  if (condition.includes('cloud')) {
    Icon = Cloud;
  } else if (condition.includes('rain') || condition.includes('drizzle')) {
    Icon = CloudRain;
  } else if (condition.includes('thunder')) {
    Icon = CloudLightning;
  } else if (condition.includes('snow')) {
    Icon = Snowflake;
  }

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-xl bg-surface">
      <h4 className="text-sm font-medium text-foreground">Forecast for Event Day</h4>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-muted rounded-full text-muted-foreground">
            <Icon size={20} />
          </div>
          <div>
            <div className="font-medium text-foreground">{forecast.weather[0].description}</div>
            <div className="text-xs text-muted-foreground">Precipitation: {forecast.pop ? Math.round(forecast.pop * 100) : 0}%</div>
          </div>
        </div>
        <div className="text-2xl font-serif text-foreground">
          {temp}°C
        </div>
      </div>
    </div>
  );
}
