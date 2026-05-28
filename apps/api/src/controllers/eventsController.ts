import type { Request, Response, NextFunction } from 'express';
import { eq, and, ilike, gte, lte, sql, count, desc } from 'drizzle-orm';
import { db } from '../db/index.js';
import { events, users, tags, eventTags, bookmarks } from '../db/schema.js';
import { buildPagination, getOffset } from '../lib/utils.js';
import { ApiError } from '../middleware/errorHandler.js';

/**
 * GET /api/events
 * List events with filtering and pagination.
 */
export async function listEvents(req: Request, res: Response, next: NextFunction) {
  try {
    const query = (req as any).parsedQuery || req.query;
    const {
      q,
      category,
      format,
      city,
      from,
      to,
      page = 1,
      limit = 20,
    } = query;

    const offset = getOffset(Number(page), Number(limit));

    // Build WHERE conditions dynamically
    const conditions: any[] = [eq(events.is_published, true)];

    if (q) {
      conditions.push(
        sql`(${events.title} ILIKE ${'%' + q + '%'} OR ${events.description} ILIKE ${'%' + q + '%'})`
      );
    }
    if (category) {
      conditions.push(eq(events.category, category as string));
    }
    if (format) {
      conditions.push(eq(events.format, format as string));
    }
    if (city) {
      conditions.push(ilike(events.location_city, city as string));
    }
    if (from) {
      conditions.push(gte(events.start_time, new Date(from as string)));
    }
    if (to) {
      conditions.push(lte(events.start_time, new Date(to as string)));
    }

    const whereClause = and(...conditions);

    // Count total matching events
    const [countResult] = await db
      .select({ total: count() })
      .from(events)
      .where(whereClause);

    const total = countResult?.total ?? 0;

    // Fetch events with organizer join
    const eventRows = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
        category: events.category,
        format: events.format,
        start_time: events.start_time,
        end_time: events.end_time,
        location_name: events.location_name,
        location_city: events.location_city,
        location_country: events.location_country,
        latitude: events.latitude,
        longitude: events.longitude,
        url: events.url,
        image_url: events.image_url,
        attendee_count: events.attendee_count,
        is_published: events.is_published,
        created_at: events.created_at,
        updated_at: events.updated_at,
        organizer_id: events.organizer_id,
        organizer_name: users.name,
        organizer_avatar: users.avatar_url,
      })
      .from(events)
      .leftJoin(users, eq(events.organizer_id, users.id))
      .where(whereClause)
      .orderBy(desc(events.start_time))
      .limit(Number(limit))
      .offset(offset);

    // Fetch tags for each event
    const eventIds = eventRows.map((e) => e.id);

    let eventTagsMap: Map<string, string[]> = new Map();
    if (eventIds.length > 0) {
      const tagRows = await db
        .select({
          event_id: eventTags.event_id,
          tag_name: tags.name,
        })
        .from(eventTags)
        .innerJoin(tags, eq(eventTags.tag_id, tags.id))
        .where(sql`${eventTags.event_id} IN ${eventIds}`);

      for (const row of tagRows) {
        const existing = eventTagsMap.get(row.event_id) || [];
        existing.push(row.tag_name);
        eventTagsMap.set(row.event_id, existing);
      }
    }

    // Check bookmarks if user is authenticated
    let bookmarkedIds = new Set<string>();
    const userId = (req.user as any)?.id || (req as any).session?.userId;
    if (userId && eventIds.length > 0) {
      const bookmarkRows = await db
        .select({ event_id: bookmarks.event_id })
        .from(bookmarks)
        .where(
          and(
            eq(bookmarks.user_id, userId),
            sql`${bookmarks.event_id} IN ${eventIds}`
          )
        );
      bookmarkedIds = new Set(bookmarkRows.map((b) => b.event_id));
    }

    // Format response
    const data = eventRows.map((e) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      category: e.category,
      format: e.format,
      start_time: e.start_time?.toISOString(),
      end_time: e.end_time?.toISOString(),
      location_name: e.location_name,
      location_city: e.location_city,
      location_country: e.location_country,
      latitude: e.latitude ? parseFloat(e.latitude) : null,
      longitude: e.longitude ? parseFloat(e.longitude) : null,
      url: e.url,
      image_url: e.image_url,
      attendee_count: e.attendee_count,
      tags: eventTagsMap.get(e.id) || [],
      is_bookmarked: bookmarkedIds.has(e.id),
      organizer: e.organizer_id
        ? {
            id: e.organizer_id,
            name: e.organizer_name,
            avatar_url: e.organizer_avatar,
          }
        : null,
    }));

    res.json({
      data,
      pagination: buildPagination(Number(total), Number(page), Number(limit)),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/events/:id
 * Get a single event by ID.
 */
export async function getEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params as { id: string };

    const eventRows = await db
      .select({
        id: events.id,
        title: events.title,
        description: events.description,
        category: events.category,
        format: events.format,
        start_time: events.start_time,
        end_time: events.end_time,
        location_name: events.location_name,
        location_city: events.location_city,
        location_country: events.location_country,
        latitude: events.latitude,
        longitude: events.longitude,
        url: events.url,
        image_url: events.image_url,
        attendee_count: events.attendee_count,
        is_published: events.is_published,
        created_at: events.created_at,
        updated_at: events.updated_at,
        organizer_id: events.organizer_id,
        organizer_name: users.name,
        organizer_avatar: users.avatar_url,
      })
      .from(events)
      .leftJoin(users, eq(events.organizer_id, users.id))
      .where(eq(events.id, id))
      .limit(1);

    if (eventRows.length === 0) {
      throw new ApiError(404, 'Event not found');
    }

    const e = eventRows[0];

    // Fetch tags
    const tagRows = await db
      .select({ tag_name: tags.name })
      .from(eventTags)
      .innerJoin(tags, eq(eventTags.tag_id, tags.id))
      .where(eq(eventTags.event_id, e.id));

    // Check bookmark status
    let is_bookmarked = false;
    const userId = (req.user as any)?.id || (req as any).session?.userId;
    if (userId) {
      const bookmarkRows = await db
        .select({ id: bookmarks.id })
        .from(bookmarks)
        .where(
          and(eq(bookmarks.user_id, userId), eq(bookmarks.event_id, e.id))
        )
        .limit(1);
      is_bookmarked = bookmarkRows.length > 0;
    }

    res.json({
      data: {
        id: e.id,
        title: e.title,
        description: e.description,
        category: e.category,
        format: e.format,
        start_time: e.start_time?.toISOString(),
        end_time: e.end_time?.toISOString(),
        location_name: e.location_name,
        location_city: e.location_city,
        location_country: e.location_country,
        latitude: e.latitude ? parseFloat(e.latitude) : null,
        longitude: e.longitude ? parseFloat(e.longitude) : null,
        url: e.url,
        image_url: e.image_url,
        attendee_count: e.attendee_count,
        is_published: e.is_published,
        created_at: e.created_at?.toISOString(),
        updated_at: e.updated_at?.toISOString(),
        tags: tagRows.map((t) => t.tag_name),
        is_bookmarked,
        organizer: e.organizer_id
          ? {
              id: e.organizer_id,
              name: e.organizer_name,
              avatar_url: e.organizer_avatar,
            }
          : null,
      },
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/events
 * Create a new event.
 */
export async function createEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.user as any)?.id || (req as any).session?.userId;
    if (!userId) {
      throw new ApiError(401, 'Unauthorized. Please sign in.');
    }

    const { tags: tagNames, ...eventData } = req.body;

    // Insert the event
    const [newEvent] = await db
      .insert(events)
      .values({
        ...eventData,
        organizer_id: userId,
        start_time: new Date(eventData.start_time),
        end_time: new Date(eventData.end_time),
      })
      .returning();

    // Handle tags
    if (tagNames && tagNames.length > 0) {
      for (const tagName of tagNames) {
        // Upsert tag
        const [tag] = await db
          .insert(tags)
          .values({ name: tagName.toLowerCase().trim() })
          .onConflictDoNothing()
          .returning();

        const tagId =
          tag?.id ||
          (
            await db
              .select({ id: tags.id })
              .from(tags)
              .where(eq(tags.name, tagName.toLowerCase().trim()))
              .limit(1)
          )[0]?.id;

        if (tagId) {
          await db
            .insert(eventTags)
            .values({ event_id: newEvent.id, tag_id: tagId })
            .onConflictDoNothing();
        }
      }
    }

    res.status(201).json({ data: newEvent });
  } catch (error) {
    next(error);
  }
}

/**
 * PUT /api/events/:id
 * Update an event (own events only).
 */
export async function updateEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.user as any)?.id || (req as any).session?.userId;
    if (!userId) {
      throw new ApiError(401, 'Unauthorized. Please sign in.');
    }

    const { id } = req.params as { id: string };

    // Check ownership
    const [existing] = await db
      .select({ organizer_id: events.organizer_id })
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!existing) {
      throw new ApiError(404, 'Event not found');
    }
    if (existing.organizer_id !== userId) {
      throw new ApiError(403, 'You can only edit your own events');
    }

    const { tags: tagNames, ...updateData } = req.body;

    // Update timestamps if dates are provided
    if (updateData.start_time) {
      updateData.start_time = new Date(updateData.start_time);
    }
    if (updateData.end_time) {
      updateData.end_time = new Date(updateData.end_time);
    }

    const [updated] = await db
      .update(events)
      .set({ ...updateData, updated_at: new Date() })
      .where(eq(events.id, id))
      .returning();

    // Update tags if provided
    if (tagNames) {
      // Remove existing tags
      await db.delete(eventTags).where(eq(eventTags.event_id, id));

      // Add new tags
      for (const tagName of tagNames) {
        const [tag] = await db
          .insert(tags)
          .values({ name: tagName.toLowerCase().trim() })
          .onConflictDoNothing()
          .returning();

        const tagId =
          tag?.id ||
          (
            await db
              .select({ id: tags.id })
              .from(tags)
              .where(eq(tags.name, tagName.toLowerCase().trim()))
              .limit(1)
          )[0]?.id;

        if (tagId) {
          await db
            .insert(eventTags)
            .values({ event_id: id, tag_id: tagId })
            .onConflictDoNothing();
        }
      }
    }

    res.json({ data: updated });
  } catch (error) {
    next(error);
  }
}

/**
 * DELETE /api/events/:id
 * Delete an event (own events only).
 */
export async function deleteEvent(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = (req.user as any)?.id || (req as any).session?.userId;
    if (!userId) {
      throw new ApiError(401, 'Unauthorized. Please sign in.');
    }

    const { id } = req.params as { id: string };

    // Check ownership
    const [existing] = await db
      .select({ organizer_id: events.organizer_id })
      .from(events)
      .where(eq(events.id, id))
      .limit(1);

    if (!existing) {
      throw new ApiError(404, 'Event not found');
    }
    if (existing.organizer_id !== userId) {
      throw new ApiError(403, 'You can only delete your own events');
    }

    await db.delete(events).where(eq(events.id, id));

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
}
