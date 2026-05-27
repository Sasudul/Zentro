import { Router } from 'express';
import { EventFiltersSchema, CreateEventSchema, UpdateEventSchema } from '@pulse/shared';
import { validateQuery, validate } from '../middleware/validate.js';
import {
  listEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} from '../controllers/eventsController.js';

const router = Router();

// Public routes
router.get('/', validateQuery(EventFiltersSchema), listEvents);
router.get('/:id', getEvent);

// Protected routes (auth middleware will be added in Sprint 2)
router.post('/', validate(CreateEventSchema), createEvent);
router.put('/:id', validate(UpdateEventSchema), updateEvent);
router.delete('/:id', deleteEvent);

export default router;
