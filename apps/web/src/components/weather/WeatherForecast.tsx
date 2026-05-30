'use client';

import React from 'react';
import { useForecast } from '@/hooks/useWeather';
import { Cloud, Sun, CloudRain, Snowflake, CloudLightning } from 'lucide-react';

export function WeatherForecast({ city, date }: { city?: string | null; date?: string | null }) {
  const { data: forecast, isLoading } = useForecast(city, date);

  if (!city || !date || isLoading) {
    return <div className="weather-card animate-shimmer" style={{ height: '80px' }} />;
  }

  if (!forecast) {
    return null;
  }

  const condition = forecast.weather[0].main.toLowerCase();
  const temp = Math.round(forecast.main.temp);

  let Icon = Sun;
  if (condition.includes('cloud')) Icon = Cloud;
  else if (condition.includes('rain') || condition.includes('drizzle')) Icon = CloudRain;
  else if (condition.includes('thunder')) Icon = CloudLightning;
  else if (condition.includes('snow')) Icon = Snowflake;

  return (
    <div className="weather-card">
      <h4 className="weather-card-header">Forecast for Event Day</h4>
      <div className="weather-card-body">
        <div className="weather-card-info">
          <div className="weather-card-icon">
            <Icon size={20} />
          </div>
          <div>
            <div style={{ fontWeight: 500, color: 'var(--color-text-primary)', textTransform: 'capitalize' }}>
              {forecast.weather[0].description}
            </div>
            <div className="text-xs text-secondary">
              Precipitation: {forecast.pop ? Math.round(forecast.pop * 100) : 0}%
            </div>
          </div>
        </div>
        <div className="weather-card-temp">{temp}°C</div>
      </div>
    </div>
  );
}
