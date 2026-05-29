'use client';

import React from 'react';
import { Event } from '@pulse/shared';
import { Badge } from '@/components/ui/Badge';
import { TagPill } from '@/components/ui/TagPill';
import { Button } from '@/components/ui/Button';
import { Calendar, MapPin, Users, ExternalLink, Bookmark, Clock, ShieldCheck } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { WeatherForecast } from '@/components/weather/WeatherForecast';
import { useBookmarks, useBookmarkMutation } from '@/hooks/useBookmarks';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export function EventDetail({ event }: { event: Event }) {
  const { data: bookmarks } = useBookmarks();
  const { addBookmark, removeBookmark, isAdding, isRemoving } = useBookmarkMutation();
  const { user } = useAuth();
  const router = useRouter();

  const isBookmarked = event.is_bookmarked || bookmarks?.some(b => b.id === event.id);
  const isPending = isAdding || isRemoving;

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">
      <div className="lg:col-span-8 flex flex-col gap-8">
        <header className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Badge variant={event.category as any}>{event.category}</Badge>
            {event.is_published === false && <Badge variant="other">Draft</Badge>}
          </div>

          <h1 className="text-4xl md:text-5xl font-serif leading-tight tracking-tight text-foreground">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar size={16} />
              <span>{formatDate(event.start_time)}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-1.5">
              <MapPin size={16} />
              <span>{event.location_name || event.location_city || 'Online'}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-border" />
            <div className="flex items-center gap-1.5">
              <Users size={16} />
              <span>{event.attendee_count || 0} attending</span>
            </div>
          </div>
        </header>

        {event.image_url && (
          <div className="w-full aspect-video rounded-2xl overflow-hidden bg-muted relative">
            {/* Using a regular img for now, could use Next Image later */}
            <img 
              src={event.image_url} 
              alt={event.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-serif text-foreground">About this Event</h2>
          <div 
            className="prose prose-p:text-muted-foreground prose-headings:font-serif prose-headings:text-foreground prose-a:text-accent prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: event.description || '' }} 
          />
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium text-foreground uppercase tracking-widest">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {event.tags.map((tag: string) => (
                <TagPill key={tag}>{tag}</TagPill>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 border rounded-2xl bg-surface/50 mt-8 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
              <ShieldCheck size={24} />
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Organized by</div>
              <div className="font-medium text-foreground">Organizer</div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-4 relative">
        <div className="sticky top-24 flex flex-col gap-6">
          <div className="p-6 border rounded-2xl bg-surface shadow-sm flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <Calendar size={20} className="text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{formatDate(event.start_time)}</span>
                  {event.end_time && (
                    <span className="text-sm text-muted-foreground">to {formatDate(event.end_time)}</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="font-medium text-foreground">{event.location_name || event.location_city || 'Online Event'}</span>
                  {event.location_country && (
                    <span className="text-sm text-muted-foreground">{event.location_country}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-border" />

            <div className="flex flex-col gap-3">
              <Button size="lg" className="w-full">
                Get Tickets
              </Button>
              <Button 
                variant={isBookmarked ? 'primary' : 'secondary'} 
                size="lg" 
                className="w-full justify-center flex items-center gap-2"
                onClick={handleBookmarkToggle}
                disabled={isPending}
              >
                <Bookmark size={18} className={isBookmarked ? 'fill-current' : ''} />
                {isBookmarked ? 'Saved' : 'Save Event'}
              </Button>
            </div>

            {event.url && (
              <a href={event.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline flex items-center gap-1.5 justify-center">
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
