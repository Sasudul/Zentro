import { z } from 'zod';
import {
  EventSchema,
  CreateEventSchema,
  UpdateEventSchema,
  EventFiltersSchema,
  EventCategoryEnum,
  EventFormatEnum,
} from '../schemas/event';
import { UserSchema, PublicUserSchema } from '../schemas/user';
import { BookmarkSchema } from '../schemas/bookmark';

// Inferred Types

export type Event = z.infer<typeof EventSchema>;
export type CreateEvent = z.infer<typeof CreateEventSchema>;
export type UpdateEvent = z.infer<typeof UpdateEventSchema>;
export type EventFilters = z.infer<typeof EventFiltersSchema>;
export type EventCategory = z.infer<typeof EventCategoryEnum>;
export type EventFormat = z.infer<typeof EventFormatEnum>;

export type User = z.infer<typeof UserSchema>;
export type PublicUser = z.infer<typeof PublicUserSchema>;

export type Bookmark = z.infer<typeof BookmarkSchema>;

// API Response Types

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
}

export interface ApiResponse<T> {
  data: T;
}

export interface ApiError {
  error: string;
  details?: unknown;
}

export interface SuccessResponse {
  success: true;
}
