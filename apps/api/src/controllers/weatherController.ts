import type { Request, Response, NextFunction } from 'express';
import { getCurrentWeather, getWeatherForecast } from '../services/weatherService.js';

// Get current weather for a city
export async function getLiveWeather(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { city } = req.query;
    
    if (!city || typeof city !== 'string') {
      res.status(400).json({ error: 'City parameter is required' });
      return;
    }

    const weather = await getCurrentWeather(city);
    res.json({ data: weather });
  } catch (error) {
    next(error);
  }
}

// Get weather forecast for a city and specific date
export async function getLiveForecast(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { city, date } = req.query;

    if (!city || typeof city !== 'string') {
      res.status(400).json({ error: 'City parameter is required' });
      return;
    }

    if (!date || typeof date !== 'string') {
      res.status(400).json({ error: 'Date parameter is required' });
      return;
    }

    const forecast = await getWeatherForecast(city, date);
    res.json({ data: forecast });
  } catch (error) {
    next(error);
  }
}
