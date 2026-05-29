'use client';

import { useFilterStore } from '@/store/filterStore';
import { useEvents } from '@/hooks/useEvents';
import EventCard from './EventCard';
import { EventCardSkeleton } from '../ui/Skeleton';
import { SlidersHorizontal } from 'lucide-react';

export default function EventGrid() {
  const { filters } = useFilterStore();
  const { data, isLoading, error } = useEvents(filters);

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 'var(--space-24)',
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <EventCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        padding: 'var(--space-48) 0',
        textAlign: 'center',
        border: '1px dashed var(--border)',
        borderRadius: 'var(--radius-lg)',
      }}>
        <h3 className="font-serif text-lg mb-2">Something went wrong</h3>
        <p className="text-muted text-sm">{error instanceof Error ? error.message : 'Failed to fetch events'}</p>
      </div>
    );
  }

  const events = data?.data || [];

  // Empty state
  if (events.length === 0) {
    return (
      <div style={{
        padding: 'var(--space-64) var(--space-24)',
        textAlign: 'center',
        border: '1px dashed var(--border)',
        borderRadius: 'var(--radius-lg)',
        backgroundColor: 'var(--bg-card)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-16)',
      }}>
        <SlidersHorizontal className="w-8 h-8 text-muted" />
        <div>
          <h3 className="font-serif text-xl font-medium mb-2">No matching events found</h3>
          <p className="text-muted text-sm" style={{ maxWidth: '400px', margin: '0 auto' }}>
            We couldn&apos;t find any events matching your active filters. Try clearing some options or broadening your search!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: 'var(--space-24)',
    }}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isBookmarked={false} // optimistic UI updates will be implemented in Sprint 4
          onBookmarkToggle={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Bookmark toggled for:', event.id);
          }}
        />
      ))}
    </div>
  );
}
