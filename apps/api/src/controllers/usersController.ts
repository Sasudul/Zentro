import type { Request, Response, NextFunction } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/index.js';
import { users } from '../db/schema.js';

// Get public user profile details
export async function getUserProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params as { id: string };

    if (!id) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        avatar_url: users.avatar_url,
      })
      .from(users)
      .where(eq(users.id, id));

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.json({ data: user });
  } catch (error) {
    next(error);
  }
}
