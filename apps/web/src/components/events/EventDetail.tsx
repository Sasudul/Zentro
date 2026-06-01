'use client';

import React from 'react';
import Link from 'next/link';
import { Event } from '@zentro/shared';
import { Badge } from '@/components/ui/Badge';
import { TagPill } from '@/components/ui/TagPill';
import { Button } from '@/components/ui/Button';
import { Calendar, MapPin, Users, ExternalLink, Bookmark, ShieldCheck, Edit3, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { WeatherForecast } from '@/components/weather/WeatherForecast';
import { useBookmarks, useBookmarkMutation } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export function EventDetail({ event }: { event: Event }) {
  const { data: bookmarks } = useBookmarks();
  const { addBookmark, removeBookmark, isAdding, isRemoving } = useBookmarkMutation();
  const { user } = useAuth();
  const router = useRouter();

  const isBookmarked = event.is_bookmarked || bookmarks?.some(b => b.id === event.id);
  const isPending = isAdding || isRemoving;
  const isOrganizer = !!user && event.organizer?.id === user.id;

  const handleBookmarkToggle = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    if (isBookmarked) {
      removeBookmark(event.id);
    } else {
      addBookmark(event.id);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this event permanently?')) return;

    try {
      await api.events.delete(event.id);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      alert(`Failed to delete event: ${err.message || err}`);
    }
  };

  return (
    <div className="detail-layout">
      <div className="detail-main">
        <header className="detail-header">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Badge variant={event.category as any}>{event.category}</Badge>
            {event.is_published === false && <Badge variant="other">Draft</Badge>}
          </div>

          <h1 className="detail-title">{event.title}</h1>

          <div className="detail-meta">
            <div className="detail-meta-item">
              <Calendar size={16} />
              <span>{formatDate(event.start_time)}</span>
            </div>
            <div className="detail-meta-dot" />
            <div className="detail-meta-item">
              <MapPin size={16} />
              <span>{event.location_name || event.location_city || 'Online'}</span>
            </div>
            <div className="detail-meta-dot" />
            <div className="detail-meta-item">
              <Users size={16} />
              <span>{event.attendee_count || 0} attending</span>
            </div>
          </div>
        </header>

        {event.image_url && (
          <div className="detail-image">
            <img src={event.image_url} alt={event.title} />
          </div>
        )}

        <div className="detail-body">
          <h2>About this Event</h2>
          <div
            className="detail-body-content"
            dangerouslySetInnerHTML={{ __html: event.description || '' }}
          />
        </div>

        {event.tags && event.tags.length > 0 && (
          <div>
            <div className="detail-tags-label">Tags</div>
            <div className="detail-tags-list">
              {event.tags.map((tag: string) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          </div>
        )}

        <div className="detail-organizer">
          <div className="detail-organizer-info">
            <div className="detail-organizer-icon">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-secondary text-sm">Organized by</div>
              <div style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>Organizer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-sidebar">
        <div className="detail-sidebar-sticky">
          <div className="detail-info-card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-16)' }}>
              <div className="detail-info-row">
                <Calendar size={20} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="detail-info-label">{formatDate(event.start_time)}</span>
                  {event.end_time && (
                    <span className="detail-info-sub">to {formatDate(event.end_time)}</span>
                  )}
                </div>
              </div>

              <div className="detail-info-row">
                <MapPin size={20} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="detail-info-label">{event.location_name || event.location_city || 'Online Event'}</span>
                  {event.location_country && (
                    <span className="detail-info-sub">{event.location_country}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="detail-divider" />

            <div className="detail-actions">
              <Button size="lg" className="w-full">Get Tickets</Button>
              <Button
                variant={isBookmarked ? 'primary' : 'secondary'}
                size="lg"
                className="w-full"
                onClick={handleBookmarkToggle}
                disabled={isPending}
              >
                <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
                {isBookmarked ? 'Saved' : 'Save Event'}
              </Button>
            </div>

            {isOrganizer && (
              <>
                <div className="detail-divider" />
                <div className="detail-actions">
                  <Link href={`/events/${event.id}/edit`} className="btn btn-secondary btn-lg w-full">
                    <Edit3 size={18} />
                    Edit Event
                  </Link>
                  <Button variant="ghost" size="lg" className="w-full" onClick={handleDelete}>
                    <Trash2 size={18} />
                    Delete Event
                  </Button>
                </div>
              </>
            )}

            {event.url && (
              <a href={event.url} target="_blank" rel="noopener noreferrer" className="detail-external-link">
                <ExternalLink size={14} />
                <span>Visit Event Website</span>
              </a>
            )}
          </div>

          <WeatherForecast city={event.location_city || ''} date={event.start_time} />
        </div>
      </div>
    </div>
  );
}
