import { z } from 'zod';

// User Schema (full DB record)

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  avatar_url: z.string().url().nullable().optional(),
  provider: z.enum(['google', 'github']),
  provider_id: z.string(),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Public User Schema (safe to expose)

export const PublicUserSchema = UserSchema.pick({
  id: true,
  name: true,
  avatar_url: true,
  email: true,
});
