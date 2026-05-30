'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Bookmark } from 'lucide-react';
import type { Event } from '@/types/index';
import { Badge } from '@/components/ui/Badge';
import { TagPill } from '@/components/ui/TagPill';
import { formatDate } from '@/lib/utils';

interface EventCardProps {
  event: Event;
  isBookmarked?: boolean;
  onBookmarkToggle?: (e: React.MouseEvent) => void;
}

export default function EventCard({ event, isBookmarked = false, onBookmarkToggle }: EventCardProps) {
  const categoryVariant = ['conference', 'meetup', 'hackathon', 'workshop', 'other', 'live'].includes(event.category)
    ? (event.category as any)
    : 'other';

  const locationString = event.format === 'virtual'
    ? 'Virtual Session'
    : [event.location_city, event.location_country].filter(Boolean).join(', ');

  const imageUrl = event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=60';

  return (
    <article className="event-card">
      <Link href={`/events/${event.id}`} style={{ display: 'block', width: '100%' }}>
        <div className="event-card-media">
          <Image
            src={imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
        </div>
      </Link>

      <div className="event-card-content">
        <div className="event-card-header">
          <Badge variant={categoryVariant}>{event.category}</Badge>
          <button
            onClick={onBookmarkToggle}
            className={`btn-bookmark ${isBookmarked ? 'active' : ''}`}
            aria-label="Bookmark event"
            style={{ width: '30px', height: '30px' }}
          >
            <Bookmark style={{ width: '14px', height: '14px' }} />
          </button>
        </div>

        <Link href={`/events/${event.id}`}>
          <h3 className="event-card-title">{event.title}</h3>
        </Link>

        <div className="event-card-meta">
          <div className="event-card-meta-item">
            <Calendar style={{ width: '14px', height: '14px' }} />
            <span>{formatDate(event.start_time, 'MMM d, yyyy')}</span>
          </div>
          <div className="event-card-meta-item">
            <MapPin style={{ width: '14px', height: '14px' }} />
            <span>{locationString}</span>
          </div>
        </div>

        {event.description ? (
          <p className="event-card-description" dangerouslySetInnerHTML={{
            __html: event.description.replace(/<[^>]*>/g, '')
          }} />
        ) : null}

        {event.tags && event.tags.length > 0 ? (
          <div className="event-card-tags">
            {event.tags.slice(0, 3).map((tag) => (
              <TagPill key={tag}>{tag}</TagPill>
            ))}
          </div>
        ) : null}

        <div className="event-card-footer">
          {event.organizer ? (
            <div className="event-card-organizer">
              <div className="event-card-organizer-avatar">
                {event.organizer.avatar_url ? (
                  <Image src={event.organizer.avatar_url} alt={event.organizer.name} width={24} height={24} />
                ) : (
                  <div style={{
                    width: '100%', height: '100%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px',
                    backgroundColor: 'var(--color-accent-light)',
                    color: 'var(--color-accent)',
                  }}>
                    {event.organizer.name[0]}
                  </div>
                )}
              </div>
              <span className="event-card-organizer-name">{event.organizer.name}</span>
            </div>
          ) : (
            <div />
          )}

          {event.attendee_count ? (
            <span className="event-card-attendees">{event.attendee_count} attending</span>
          ) : null}
        </div>
      </div>
    </article>
  );
}
