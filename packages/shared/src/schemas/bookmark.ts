import { z } from 'zod';

// Bookmark Schema

export const BookmarkSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  event_id: z.string().uuid(),
  created_at: z.string().datetime().optional(),
});
