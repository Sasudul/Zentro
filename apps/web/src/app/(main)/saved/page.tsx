'use client';

import React, { useEffect } from 'react';
import { useBookmarks, useBookmarkMutation } from '@/hooks/useBookmarks';
import EventCard from '@/components/events/EventCard';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function SavedPage() {
  const { data: bookmarks, isLoading } = useBookmarks();
  const { removeBookmark } = useBookmarkMutation();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="saved-page">
        <div className="saved-header">
          <h1>Saved Events</h1>
          <p>Sign in to view your bookmarked events.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="saved-page">
      <div className="saved-header">
        <h1>Saved Events</h1>
        <p>Your curated list of upcoming experiences.</p>
      </div>

      {isLoading ? (
        <div className="saved-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="saved-skeleton animate-shimmer" />
          ))}
        </div>
      ) : bookmarks && bookmarks.length > 0 ? (
        <div className="saved-grid">
          {bookmarks.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              isBookmarked={true}
              onBookmarkToggle={(e) => {
                e.preventDefault();
                e.stopPropagation();
                removeBookmark(event.id);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="saved-empty-state">
          <div className="saved-empty-icon">
            <Bookmark size={32} />
          </div>
          <h3>No saved events yet</h3>
          <p>
            When you see an event you like, click the bookmark icon to save it here for later.
          </p>
          <Link href="/">
            <Button size="lg">Explore Events</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
