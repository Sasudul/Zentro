import { Router } from 'express';
import { getLiveWeather, getLiveForecast } from '../controllers/weatherController.js';

const router = Router();

router.get('/current', getLiveWeather);
router.get('/forecast', getLiveForecast);

export default router;
