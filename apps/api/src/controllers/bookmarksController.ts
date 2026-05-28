import type { Request, Response, NextFunction } from 'express';
import { eq, and } from 'drizzle-orm';
import { db } from '../db/index.js';
import { bookmarks, events, users } from '../db/schema.js';

// Get all bookmarks for the authenticated user
export async function getBookmarks(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req.user as any).id;

    const userBookmarks = await db
      .select({
        event: events,
        organizer: {
          id: users.id,
          name: users.name,
          avatar_url: users.avatar_url,
        },
      })
      .from(bookmarks)
      .innerJoin(events, eq(bookmarks.event_id, events.id))
      .leftJoin(users, eq(events.organizer_id, users.id))
      .where(eq(bookmarks.user_id, userId));

    const formattedEvents = userBookmarks.map((ub) => ({
      ...ub.event,
      is_bookmarked: true,
      organizer: ub.organizer,
    }));

    res.json({ data: formattedEvents });
  } catch (error) {
    next(error);
  }
}

// Add a bookmark for an event
export async function addBookmark(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req.user as any).id;
    const { eventId } = req.params as { eventId: string };

    if (!eventId) {
      res.status(400).json({ error: 'Event ID is required' });
      return;
    }

    const [eventExists] = await db
      .select()
      .from(events)
      .where(eq(events.id, eventId));

    if (!eventExists) {
      res.status(404).json({ error: 'Event not found' });
      return;
    }

    const [existingBookmark] = await db
      .select()
      .from(bookmarks)
      .where(
        and(eq(bookmarks.user_id, userId), eq(bookmarks.event_id, eventId))
      );

    if (existingBookmark) {
      res.json({ success: true, message: 'Event already bookmarked' });
      return;
    }

    await db.insert(bookmarks).values({
      user_id: userId,
      event_id: eventId,
    });

    res.status(201).json({ success: true, message: 'Event bookmarked successfully' });
  } catch (error) {
    next(error);
  }
}

// Remove a bookmark for an event
export async function removeBookmark(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = (req.user as any).id;
    const { eventId } = req.params as { eventId: string };

    if (!eventId) {
      res.status(400).json({ error: 'Event ID is required' });
      return;
    }

    const [existingBookmark] = await db
      .select()
      .from(bookmarks)
      .where(
        and(eq(bookmarks.user_id, userId), eq(bookmarks.event_id, eventId))
      );

    if (!existingBookmark) {
      res.status(404).json({ error: 'Bookmark not found' });
      return;
    }

    await db
      .delete(bookmarks)
      .where(
        and(eq(bookmarks.user_id, userId), eq(bookmarks.event_id, eventId))
      );

    res.json({ success: true, message: 'Bookmark removed successfully' });
  } catch (error) {
    next(error);
  }
}
