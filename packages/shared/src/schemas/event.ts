import { z } from 'zod';

// Event Categories & Formats

export const EventCategoryEnum = z.enum([
  'conference',
  'meetup',
  'hackathon',
  'workshop',
  'other',
]);

export const EventFormatEnum = z.enum([
  'in-person',
  'virtual',
  'hybrid',
]);

// Event Schema (full DB record)

export const EventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().nullable().optional(),
  category: EventCategoryEnum,
  format: EventFormatEnum,
  start_time: z.string().datetime(),
  end_time: z.string().datetime(),
  location_name: z.string().nullable().optional(),
  location_city: z.string().nullable().optional(),
  location_country: z.string().nullable().optional(),
  latitude: z.number().min(-90).max(90).nullable().optional(),
  longitude: z.number().min(-180).max(180).nullable().optional(),
  url: z.string().url().nullable().optional(),
  image_url: z.string().url().nullable().optional(),
  organizer_id: z.string().uuid().nullable().optional(),
  attendee_count: z.number().int().min(0).default(0),
  is_published: z.boolean().default(true),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
  // Joined fields (not in DB directly)
  tags: z.array(z.string()).optional(),
  is_bookmarked: z.boolean().optional(),
  organizer: z
    .object({
      id: z.string().uuid(),
      name: z.string(),
      avatar_url: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
});

// Create Event Schema (request body)

export const CreateEventSchema = z
  .object({
    title: z.string().min(1, 'Title is required').max(200),
    description: z.string().optional(),
    category: EventCategoryEnum,
    format: EventFormatEnum,
    start_time: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid start time'),
    end_time: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid end time'),
    location_name: z.string().optional(),
    location_city: z.string().optional(),
    location_country: z.string().optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
    url: z.string().url('Invalid URL').optional().or(z.literal('')),
    image_url: z.string().url('Invalid image URL').optional().or(z.literal('')),
    tags: z.array(z.string().min(1).max(50)).max(10).optional(),
  })
  .refine((data) => new Date(data.end_time) > new Date(data.start_time), {
    message: 'End time must be after start time',
    path: ['end_time'],
  });

// Update Event Schema

export const UpdateEventSchema = CreateEventSchema.innerType().partial();

// Event Filters Schema (query params)

export const EventFiltersSchema = z.object({
  q: z.string().optional(),
  category: EventCategoryEnum.optional(),
  format: EventFormatEnum.optional(),
  city: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
