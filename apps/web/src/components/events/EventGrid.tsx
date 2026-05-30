'use client';

import { useFilterStore } from '@/store/filterStore';
import { useEvents } from '@/hooks/useEvents';
import EventCard from './EventCard';
import { EventCardSkeleton } from '@/components/ui/Skeleton';
import { SlidersHorizontal } from 'lucide-react';

export default function EventGrid() {
  const { filters } = useFilterStore();
  const { data, isLoading, error } = useEvents(filters);

  if (isLoading) {
    return (
      <div className="event-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-grid-error">
        <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: 'var(--space-8)' }}>Something went wrong</h3>
        <p className="text-secondary text-sm">{error instanceof Error ? error.message : 'Failed to fetch events'}</p>
      </div>
    );
  }

  const events = data?.data || [];

  if (events.length === 0) {
    return (
      <div className="event-grid-empty">
        <SlidersHorizontal style={{ width: '32px', height: '32px', color: 'var(--color-text-muted)' }} />
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: 'var(--space-8)' }}>No matching events found</h3>
          <p className="text-secondary text-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
            We couldn&apos;t find any events matching your active filters. Try clearing some options or broadening your search!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isBookmarked={false}
          onBookmarkToggle={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      ))}
    </div>
  );
}
