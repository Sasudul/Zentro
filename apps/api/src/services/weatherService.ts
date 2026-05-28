import { cache } from '../config/redis.js';

export interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
  humidity?: number;
  windSpeed?: number;
}

const CACHE_TTL_SECONDS = 30 * 60; // 30 minutes cache

// Simple string hash helper to generate consistent mock data per city
function getCityHash(city: string): number {
  let hash = 0;
  for (let i = 0; i < city.length; i++) {
    hash = city.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Generate consistent mock weather based on city and date
function getMockWeather(city: string, dateStr?: string): WeatherData {
  const hash = getCityHash(city);
  const baseTemp = (hash % 15) + 12; // 12°C to 27°C
  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Overcast'];
  const condition = conditions[hash % conditions.length];
  
  // Map conditions to OpenWeatherMap icon codes
  const icons: Record<string, string> = {
    'Sunny': '01d',
    'Partly Cloudy': '02d',
    'Cloudy': '03d',
    'Light Rain': '10d',
    'Overcast': '04d',
  };

  let tempOffset = 0;
  if (dateStr) {
    const dateHash = getCityHash(dateStr);
    tempOffset = (dateHash % 6) - 3; // -3°C to +3°C variation for date
  }

  return {
    temp: Math.round((baseTemp + tempOffset) * 10) / 10,
    condition,
    icon: icons[condition] || '02d',
    humidity: (hash % 40) + 50, // 50% to 90%
    windSpeed: Math.round(((hash % 15) + 5) * 10) / 10, // 5 to 20 km/h
  };
}

export async function getCurrentWeather(city: string): Promise<WeatherData> {
  const cacheKey = `weather:current:${city.toLowerCase().trim()}`;
  
  // Try cache first
  try {
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('⚠️ Cache read error:', error);
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  let weather: WeatherData;

  if (!apiKey) {
    // Graceful fallback to consistent mock data
    weather = getMockWeather(city);
  } else {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error(`OpenWeatherMap returned ${response.status}`);
      }

      const data = await response.json() as any;
      weather = {
        temp: data.main.temp,
        condition: data.weather[0].main,
        icon: data.weather[0].icon,
        humidity: data.main.humidity,
        windSpeed: data.wind?.speed,
      };
    } catch (error: any) {
      console.error(`❌ Failed to fetch current weather for ${city}:`, error.message);
      // Fallback to mock on API request error
      weather = getMockWeather(city);
    }
  }

  // Cache response
  try {
    await cache.set(cacheKey, JSON.stringify(weather), CACHE_TTL_SECONDS);
  } catch (error) {
    console.error('⚠️ Cache write error:', error);
  }

  return weather;
}

export async function getWeatherForecast(city: string, dateStr: string): Promise<WeatherData> {
  const cacheKey = `weather:forecast:${city.toLowerCase().trim()}:${dateStr}`;

  // Try cache first
  try {
    const cachedData = await cache.get(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  } catch (error) {
    console.error('⚠️ Cache read error:', error);
  }

  const apiKey = process.env.OPENWEATHERMAP_API_KEY;
  let weather: WeatherData;

  if (!apiKey) {
    weather = getMockWeather(city, dateStr);
  } else {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`OpenWeatherMap forecast returned ${response.status}`);
      }

      const data = await response.json() as any;
      const targetDate = new Date(dateStr).toDateString();
      
      // Find the forecast entry closest to the middle of the target day (12:00 PM)
      let bestMatch = data.list[0];
      let minDiff = Infinity;

      for (const entry of data.list) {
        const entryDate = new Date(entry.dt * 1000);
        if (entryDate.toDateString() === targetDate) {
          const diff = Math.abs(entryDate.getHours() - 12);
          if (diff < minDiff) {
            minDiff = diff;
            bestMatch = entry;
          }
        }
      }

      // If we couldn't find a direct date match (e.g. date is more than 5 days out),
      // we default to the closest entry we have.
      weather = {
        temp: bestMatch.main.temp,
        condition: bestMatch.weather[0].main,
        icon: bestMatch.weather[0].icon,
        humidity: bestMatch.main.humidity,
        windSpeed: bestMatch.wind?.speed,
      };
    } catch (error: any) {
      console.error(`❌ Failed to fetch weather forecast for ${city} on ${dateStr}:`, error.message);
      weather = getMockWeather(city, dateStr);
    }
  }

  // Cache response
  try {
    await cache.set(cacheKey, JSON.stringify(weather), CACHE_TTL_SECONDS);
  } catch (error) {
    console.error('⚠️ Cache write error:', error);
  }

  return weather;
}
