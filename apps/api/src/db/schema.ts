import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  decimal,
  primaryKey,
  index,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatar_url: text('avatar_url'),
  provider: text('provider').notNull(), // 'google' | 'github'
  provider_id: text('provider_id').notNull().unique(),
  created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
  bookmarks: many(bookmarks),
}));

// Events

export const events = pgTable(
  'events',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description'),
    category: text('category').notNull(), // 'conference' | 'meetup' | 'hackathon' | 'workshop' | 'other'
    format: text('format').notNull(), // 'in-person' | 'virtual' | 'hybrid'
    start_time: timestamp('start_time', { withTimezone: true }).notNull(),
    end_time: timestamp('end_time', { withTimezone: true }).notNull(),
    location_name: text('location_name'),
    location_city: text('location_city'),
    location_country: text('location_country'),
    latitude: decimal('latitude', { precision: 9, scale: 6 }),
    longitude: decimal('longitude', { precision: 9, scale: 6 }),
    url: text('url'),
    image_url: text('image_url'),
    organizer_id: uuid('organizer_id').references(() => users.id, {
      onDelete: 'set null',
    }),
    attendee_count: integer('attendee_count').default(0),
    is_published: boolean('is_published').default(true),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updated_at: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index('idx_events_start_time').on(table.start_time),
    index('idx_events_category').on(table.category),
    index('idx_events_location_city').on(table.location_city),
    index('idx_events_organizer_id').on(table.organizer_id),
    index('idx_events_is_published').on(table.is_published),
  ]
);

export const eventsRelations = relations(events, ({ one, many }) => ({
  organizer: one(users, {
    fields: [events.organizer_id],
    references: [users.id],
  }),
  bookmarks: many(bookmarks),
  eventTags: many(eventTags),
}));

// Bookmarks

export const bookmarks = pgTable(
  'bookmarks',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    user_id: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    event_id: uuid('event_id')
      .notNull()
      .references(() => events.id, { onDelete: 'cascade' }),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index('idx_bookmarks_user_id').on(table.user_id),
  ]
);

export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, {
    fields: [bookmarks.user_id],
    references: [users.id],
  }),
  event: one(events, {
    fields: [bookmarks.event_id],
    references: [events.id],
  }),
}));

// Tags

export const tags = pgTable('tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  eventTags: many(eventTags),
}));

// Event Tags (many-to-many)

export const eventTags = pgTable(
  'event_tags',
  {
    event_id: uuid('event_id')
      .notNull()
      .references(() => events.id, { onDelete: 'cascade' }),
    tag_id: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => [
    primaryKey({ columns: [table.event_id, table.tag_id] }),
  ]
);

export const eventTagsRelations = relations(eventTags, ({ one }) => ({
  event: one(events, {
    fields: [eventTags.event_id],
    references: [events.id],
  }),
  tag: one(tags, {
    fields: [eventTags.tag_id],
    references: [tags.id],
  }),
}));

// Sessions (express-session + connect-redis)

export const sessions = pgTable(
  'sessions',
  {
    sid: text('sid').primaryKey(),
    sess: jsonb('sess').notNull(),
    expire: timestamp('expire', { withTimezone: true }).notNull(),
  },
  (table) => [
    index('idx_sessions_expire').on(table.expire),
  ]
);
