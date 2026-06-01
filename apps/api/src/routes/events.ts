import { Router } from 'express';
import { EventFiltersSchema, CreateEventSchema, UpdateEventSchema } from '@zentro/shared';
import { validateQuery, validate } from '../middleware/validate.js';
import { requireAuth } from '../middleware/requireAuth.js';
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

// Protected routes
router.post('/', requireAuth, validate(CreateEventSchema), createEvent);
router.put('/:id', requireAuth, validate(UpdateEventSchema), updateEvent);
router.delete('/:id', requireAuth, deleteEvent);

export default router;
