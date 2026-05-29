'use client';

import React from 'react';
import { useBookmarks } from '@/hooks/useBookmarks';
import EventCard from '@/components/events/EventCard';
import { Bookmark } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function SavedPage() {
  const { data: bookmarks, isLoading } = useBookmarks();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();

  if (!authLoading && !isAuthenticated) {
    router.push('/login');
    return null;
  }

  return (
    <div className="saved-page container mx-auto px-4 max-w-7xl">
      <div className="saved-header">
        <h1 className="text-4xl font-serif text-foreground mb-2">Saved Events</h1>
        <p className="text-muted-foreground">Your curated list of upcoming experiences.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-96 rounded-2xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : bookmarks && bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="saved-empty-state mt-12">
          <div className="w-16 h-16 rounded-full bg-surface flex items-center justify-center border mb-6 text-muted-foreground">
            <Bookmark size={32} />
          </div>
          <h3 className="text-2xl font-serif text-foreground mb-2">No saved events yet</h3>
          <p className="text-muted-foreground max-w-md mb-8">
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
