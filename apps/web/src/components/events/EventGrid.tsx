'use client';

import React from 'react';
import { useFilterStore } from '@/store/filterStore';
import { useEvents } from '@/hooks/useEvents';
import EventCard from './EventCard';
import { EventCardSkeleton } from '@/components/ui/Skeleton';
import { SlidersHorizontal } from 'lucide-react';
import { useBookmarks, useBookmarkMutation } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function EventGrid() {
  const { filters } = useFilterStore();
  const { data, isLoading, error } = useEvents(filters);
  
  // Real bookmark queries and mutation hooks
  const { data: bookmarks } = useBookmarks();
  const { addBookmark, removeBookmark } = useBookmarkMutation();
  const { user } = useAuth();
  const router = useRouter();

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

  const handleBookmarkToggle = async (e: React.MouseEvent, eventId: string, isCurrentlyBookmarked: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      router.push('/login');
      return;
    }

    try {
      if (isCurrentlyBookmarked) {
        await removeBookmark(eventId);
      } else {
        await addBookmark(eventId);
      }
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  return (
    <div className="event-grid">
      {events.map((event, index) => {
        const isBookmarked = event.is_bookmarked || bookmarks?.some((b) => b.id === event.id) || false;
        
        return (
          <EventCard
            key={event.id}
            event={event}
            variant={index === 0 ? 'featured' : 'default'}
            isBookmarked={isBookmarked}
            onBookmarkToggle={(e) => handleBookmarkToggle(e, event.id, isBookmarked)}
          />
        );
      })}
    </div>
  );
}
